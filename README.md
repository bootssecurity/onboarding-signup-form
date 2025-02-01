# Form Builder - Docker Setup Guide

This guide explains how to set up and deploy the Form Builder application using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, for easier management)
- Git (to clone the repository)

## Quick Start

### Option 1: Using Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/your-repo/form-builder.git
cd form-builder
```

2. Build and start the container:
```bash
docker-compose up -d
```

The application will be available at `http://localhost:80`

### Option 2: Using Docker Directly

1. Build the image:
```bash
docker build -t form-builder .
```

2. Run the container:
```bash
docker run -d -p 80:80 --name form-builder form-builder
```

### Option 3: Using NPM Scripts

We've included convenient npm scripts for Docker operations:

```bash
# Build the Docker image
npm run docker:build

# Run the container
npm run docker:run

# Build and deploy (stops existing container if any)
npm run docker:deploy
```

## Docker Configuration

### Environment Variables

The application uses the following environment variables:

```env
VITE_API_URL=https://api.example.com  # Your API URL for production
```

### Ports

- The application runs on port 80 inside the container
- By default, it's mapped to port 80 on your host machine
- You can change the port mapping in docker-compose.yml or the docker run command

## Production Deployment

For production deployment, follow these steps:

1. Update environment variables:
```bash
cp .env.example .env.production
# Edit .env.production with your production values
```

2. Build the production image:
```bash
docker build -t form-builder:production --build-arg NODE_ENV=production .
```

3. Run the production container:
```bash
docker run -d \
  --name form-builder \
  -p 80:80 \
  --restart unless-stopped \
  form-builder:production
```

## Container Management

### View Logs

```bash
# View container logs
docker logs form-builder

# Follow logs in real-time
docker logs -f form-builder
```

### Container Operations

```bash
# Stop the container
docker stop form-builder

# Start the container
docker start form-builder

# Restart the container
docker restart form-builder

# Remove the container
docker rm form-builder
```

### Health Check

The container includes a health check that runs every 30 seconds. You can check the status with:

```bash
docker inspect --format='{{.State.Health.Status}}' form-builder
```

## Nginx Configuration

The application uses Nginx to serve static files. The configuration includes:

- Gzip compression for better performance
- Cache control headers for static assets
- SPA routing support
- Security headers
- Error handling

You can modify the Nginx configuration in `nginx.conf`.

## Development with Docker

For development purposes, you can use the development server:

```bash
# Build and run with development configuration
docker-compose -f docker-compose.dev.yml up --build
```

## Troubleshooting

### Common Issues

1. Port already in use:
```bash
# Check what's using port 80
sudo lsof -i :80

# Use a different port
docker run -d -p 8080:80 form-builder
```

2. Container not starting:
```bash
# Check container logs
docker logs form-builder

# Check container status
docker ps -a
```

3. Build issues:
```bash
# Clean Docker cache and rebuild
docker builder prune
docker build --no-cache -t form-builder .
```

### Health Check Failed

If the health check fails:

1. Check if Nginx is running:
```bash
docker exec form-builder nginx -t
```

2. Check logs:
```bash
docker logs form-builder
```

## Security Considerations

The Docker configuration includes several security best practices:

- Multi-stage builds to minimize image size
- Non-root Nginx user
- Security headers
- Regular security updates
- No unnecessary packages

## Updating the Application

To update the application:

1. Pull the latest code:
```bash
git pull origin main
```

2. Rebuild and restart:
```bash
npm run docker:deploy
```

Or manually:
```bash
docker build -t form-builder .
docker stop form-builder
docker rm form-builder
docker run -d -p 80:80 --name form-builder form-builder
```

## Support

For issues and support:
1. Check the logs using `docker logs form-builder`
2. Create an issue in the GitHub repository
3. Contact the development team

## License

[Your License Information]
