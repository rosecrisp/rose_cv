#!/usr/bin/env bash
# /usr/local/bin/roseresume-deploy.sh
# Forced-command entrypoint for the GitHub deploy key (and safe local ops).
set -euo pipefail

LOCK_FILE=/var/lock/roseresume-deploy.lock
IMAGE_REPO="ghcr.io/rosecrisp/rose_cv"
CANDIDATE_NAME=roseresume-candidate
CANDIDATE_PORT=3005
LIVE_PORT=3000

log() { printf '%s\n' "$*"; }

# --- health: must match CI / release post-checks ---
phone_bad() {
  local html=$1
  grep -EIq '919[[:space:].-]*360|360-1189|\(919\)' <<<"$html"
}
talk_count() {
  local html=$1
  grep -o 'class="name talk-title"' <<<"$html" | wc -l | tr -d ' '
}
check_port() {
  local port=$1 html
  html=$(curl -fsS --max-time 10 "http://127.0.0.1:${port}/") || return 1
  if phone_bad "$html"; then
    log "health fail: phone pattern on :${port}"
    return 1
  fi
  local n
  n=$(talk_count "$html")
  if [ "$n" != "8" ]; then
    log "health fail: talk-title count=${n} want=8 on :${port}"
    return 1
  fi
  return 0
}
wait_healthy() {
  local port=$1 tries=${2:-30} i
  for i in $(seq 1 "$tries"); do
    if check_port "$port"; then
      log "healthy on :${port} (attempt ${i})"
      return 0
    fi
    sleep 2
  done
  return 1
}

validate_sha() {
  local s=$1
  [[ "$s" =~ ^[0-9a-f]{40}$ ]]
}

find_prev_live() {
  docker ps --filter publish=${LIVE_PORT} --format '{{.Names}}' | head -1
}

safe_prune() {
  docker image prune -f >/dev/null 2>&1 || true
  local running rollback
  running=$(docker ps --format '{{.Names}}' | tr '\n' ' ')
  rollback=$(find_prev_live)
  mapfile -t stopped < <(docker ps -a --filter status=exited --filter name='^roseresume' --format '{{.ID}} {{.Names}} {{.FinishedAt}}' 2>/dev/null | sort -k3 -r || true)
  local keep=3 i=0 id name
  if [ "${#stopped[@]}" -eq 0 ]; then
    log "prune: no stopped roseresume containers; disk: $(df -h / | awk 'NR==2{print $4 " free of " $2}')"
    return 0
  fi
  for line in "${stopped[@]}"; do
    id=${line%% *}
    name=$(awk '{print $2}' <<<"$line")
    i=$((i + 1))
    if [ "$i" -le "$keep" ]; then
      continue
    fi
    if [[ " $running " == *" $name "* ]]; then
      continue
    fi
    if [ -n "$rollback" ] && [ "$name" = "$rollback" ]; then
      continue
    fi
    log "prune: removing old stopped $name"
    docker rm -f "$id" >/dev/null 2>&1 || true
  done
  log "prune: dangling done; disk: $(df -h / | awk 'NR==2{print $5 " used, " $4 " free"}')"
}

run_candidate() {
  local image=$1
  docker rm -f "$CANDIDATE_NAME" >/dev/null 2>&1 || true
  docker run -d --name "$CANDIDATE_NAME" -p 127.0.0.1:${CANDIDATE_PORT}:3000 --restart=no "$image" >/dev/null
  if ! wait_healthy "$CANDIDATE_PORT" 30; then
    docker rm -f "$CANDIDATE_NAME" >/dev/null 2>&1 || true
    log "candidate failed"
    return 1
  fi
  return 0
}

cleanup_candidate() {
  docker rm -f "$CANDIDATE_NAME" >/dev/null 2>&1 || true
}

do_swap() {
  local image=$1
  local new_name=$2
  local prev
  prev=$(find_prev_live)
  log "live before swap: ${prev:-none}"
  docker rm -f "$new_name" >/dev/null 2>&1 || true
  if [ -n "$prev" ]; then
    docker stop "$prev"
  fi
  if ! docker run -d --name "$new_name" -p ${LIVE_PORT}:3000 --restart unless-stopped "$image" >/dev/null; then
    log "failed to start $new_name; restarting previous"
    [ -n "$prev" ] && docker start "$prev" || true
    return 1
  fi
  if ! wait_healthy "$LIVE_PORT" 30; then
    log "live health failed; rolling back to ${prev:-none}"
    docker stop "$new_name" >/dev/null 2>&1 || true
    [ -n "$prev" ] && docker start "$prev" || true
    return 1
  fi
  log "live: $new_name (previous: ${prev:-none})"
  return 0
}

usage_reject() {
  log "usage: deploy <40-char-sha> | --candidate-only <image>"
  log "rejected: no shell access"
  exit 1
}

mkdir -p "$(dirname "$LOCK_FILE")"
exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  log "another deploy is in progress"
  exit 1
fi

ARGS="${SSH_ORIGINAL_COMMAND:-}"
if [ -z "$ARGS" ] && [ "$#" -gt 0 ]; then
  ARGS="$*"
fi
ARGS=$(echo "$ARGS" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')

if [ -z "$ARGS" ]; then
  usage_reject
fi

if [[ "$ARGS" == --candidate-only* ]]; then
  IMG=$(awk '{print $2}' <<<"$ARGS")
  if [ -z "$IMG" ]; then
    log "candidate-only needs an image"
    exit 1
  fi
  log "candidate-only: $IMG"
  if [[ "$IMG" == *'/'* ]] && [[ "$IMG" != rosebot/* ]]; then
    docker pull "$IMG"
  fi
  if ! run_candidate "$IMG"; then
    exit 1
  fi
  cleanup_candidate
  log "candidate-only OK"
  exit 0
fi

SHA=$ARGS
if ! validate_sha "$SHA"; then
  SHA=$(awk '{print $1}' <<<"$ARGS")
fi
if ! validate_sha "$SHA"; then
  log "bad sha: expected 40 lowercase hex"
  usage_reject
fi

IMAGE="${IMAGE_REPO}:${SHA}"
NEW="roseresume-${SHA:0:7}"

log "deploy $IMAGE as $NEW"
safe_prune
docker pull "$IMAGE"

if ! run_candidate "$IMAGE"; then
  exit 1
fi
cleanup_candidate

if ! do_swap "$IMAGE" "$NEW"; then
  exit 1
fi

safe_prune
log "deploy OK"
exit 0
