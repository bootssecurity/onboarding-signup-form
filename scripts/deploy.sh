#!/bin/bash

# Build and deploy script
echo "Building Docker image..."
docker build -t form-builder .

echo "Stopping existing container..."
docker stop form-builder || true
docker rm form-builder || true

echo "Starting new container..."
docker run -d \
  --name form-builder \
  -p 80:80 \
  --restart unless-stopped \
  form-builder

echo "Deployment complete!"
