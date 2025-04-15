#!/bin/bash

# Set your container name and dump folder
CONTAINER_NAME=mongodb-local
DUMP_FOLDER=mongo-dump

echo "📦 Starting MongoDB data import..."

# Check if Mongo container is running
echo "🔍 Checking if MongoDB container is running..."
docker ps | grep $CONTAINER_NAME > /dev/null

if [ $? -ne 0 ]; then
  echo "❌ Error: Container $CONTAINER_NAME is not running."
  echo "Please run 'docker compose up -d' first."
  exit 1
fi

# Copy dump folder into the container
echo "📂 Copying dump folder into container..."
docker cp $DUMP_FOLDER $CONTAINER_NAME:/data/dump

# Run mongorestore inside the container
echo "🧙 Restoring MongoDB data..."
docker exec -it $CONTAINER_NAME mongorestore /data/dump

echo "✅ MongoDB import complete! You can now access users and product data 🎉"
