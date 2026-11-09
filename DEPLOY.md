# Deploy

## Pull requests

`.github/workflows/ci.yml` runs on pull requests to `main`. It builds the Docker image and starts it, then checks the rendered site:

- the page has 8 talk titles
- 7 of those titles are links
- the page does not contain a phone number

The résumé PDF must also return HTTP 200.

## Merge to main

`.github/workflows/release.yml` builds the image and pushes it to `ghcr.io/rosecrisp/rose_cv:<sha>` (and `ghcr.io/rosecrisp/rose_cv:latest`). The deploy job waits for approval on the `production` environment.

After approval, the job SSHes with a forced command. The server runs `/usr/local/bin/roseresume-deploy.sh`, which is a copy of `scripts/roseresume-deploy.sh`, and passes the commit SHA.

That script pulls the image, starts a candidate on port 3005, and runs the health check. If the check passes, it swaps the container onto port 3000 with `--restart unless-stopped`. If the live check fails, it stops the new container and starts the previous one again.

## Secrets

The deploy job uses these secret names only:

- `DEPLOY_SSH_KEY`
- `DEPLOY_HOST`
- `DEPLOY_USER`

## Rollback

If a deploy is unhealthy, the script rolls back by itself.

To roll back by hand from an admin SSH session:

```
docker stop <live> && docker start <previous>
```

The Actions deploy key is forced-command only, so it cannot open a shell for this. A manual `workflow_dispatch` with a container name prints the admin commands and does not run them.

## Legacy

`deploy.sh` in the repo root is legacy. It installs dependencies, builds with npm, and restarts the app under PM2. New deploys use the GitHub Actions workflow and `scripts/roseresume-deploy.sh` instead. Do not delete `deploy.sh`.
