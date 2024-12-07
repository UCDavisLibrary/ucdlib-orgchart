#!/bin/bash

if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo ".env file not found. Exiting..."
  exit 1
fi


# Check if ORGCHART_USE_SFTP is set and equals "true"
if [ "$ORGCHART_USE_SFTP" == "true" ]; then
  echo "SFTP is enabled. Proceeding with SFTP operations..."

  # Bundle and Run Server
  npm run dist
  node server.js

else
  echo "SFTP is disabled. Change .env variable ORGCHART_USE_SFTP to true. Starting server..."
  node server.js

fi


