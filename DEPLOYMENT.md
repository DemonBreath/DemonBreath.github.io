# Deployment Guide - Penny4Us

## Replit Deployment (Recommended)

Your application is already configured for Replit deployment:

### 1. Deploy Button
Simply click the **Deploy** button in your Replit workspace to deploy to production.

### 2. Configuration
The deployment is configured in `.replit`:
- Build command: `npm run build`
- Start command: `npm run start`
- Port mapping: 5000 → 80

### 3. Domain
Once deployed, your app will be available at:
- `https://[your-repl-name].[your-username].replit.app`
- Custom domains can be configured in Replit

## Manual Deployment Options

### Docker Deployment

1. Build the Docker image:
```bash
docker build -t penny4us .
```

2. Run the container:
```bash
docker run -p 5000:5000 -e NODE_ENV=production penny4us
```

### VPS/Server Deployment

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Build the application:
```bash
npm run build
```

4. Start in production:
```bash
NODE_ENV=production npm start
```

## Environment Variables

Optional environment variables can be set:

```bash
NODE_ENV=production          # Set to production for optimizations
PORT=5000                   # Server port (default: 5000)
```

## Health Check

Monitor your deployment with the health endpoint:
- `GET /health` - Returns application status

## Security Features Enabled

- Security headers (XSS, CSRF protection)
- Input validation
- Rate limiting ready
- Error sanitization in production
- Content security policies

## Performance Optimizations

- Static file serving in production
- Gzip compression ready
- Build optimization with Vite
- Efficient bundle splitting

## Monitoring

The application logs all API requests with timing information:
```
GET /api/stats 200 in 2ms
POST /api/transactions 201 in 15ms
```

## Scaling Considerations

For high traffic:
1. Enable database persistence (replace in-memory storage)
2. Add Redis for session management
3. Implement proper rate limiting
4. Set up CDN for static assets
5. Use load balancing for multiple instances

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure port 5000 is available
2. **Build failures**: Check TypeScript compilation with `npm run check`
3. **Memory issues**: Monitor with `npm run health`

### Logs

Application logs include:
- Request timing
- Error details
- API response summaries

### Support

For deployment issues:
- Check health endpoint: `/health`
- Review server logs
- Verify build process: `npm run build`