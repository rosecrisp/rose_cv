#!/bin/bash
# Exit on any failure
set -e

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

# Use npm version 16.0.0
nvm use 16.0.0

# Install dependencies
npm install

# Build the project
echo "Building the project..."
npm run build

#start or restart the application using PM2
echo "Starting the application..."

# Check if the app is already running with PM2
APP_NAME="roseresume"
if pm2 list | grep -q $APP_NAME; then
    echo "Restarting the application with PM2..."
    pm2 restart $APP_NAME
else
    echo "Starting the application with PM2..."
    pm2 start npm --name "$APP_NAME" -- start
fi

