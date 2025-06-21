# GitHub Pages Deployment Guide

## Quick Setup

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Penny4Us XRP Platform"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/penny4us.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** tab
   - Scroll to **Pages** section
   - Under **Source**, select **GitHub Actions**

3. **Update Repository Name**
   - Edit `vite.config.github.ts`
   - Change `base: '/penny4us/'` to match your repository name
   - If your repo is named differently, update accordingly

## Automatic Deployment

The GitHub Actions workflow will automatically:
- Build your application on every push to `main`
- Deploy to GitHub Pages
- Your site will be available at: `https://YOUR_USERNAME.github.io/REPO_NAME/`

## Manual Deployment

For testing locally before pushing:

```bash
npm run build:github
```

This creates a static build optimized for GitHub Pages with:
- Mock API endpoints as JSON files
- Proper base path configuration
- Optimized asset bundling

## Features for GitHub Pages

Your deployment includes:
- **Static API**: Mock endpoints that work without a backend
- **Responsive Design**: Works on all devices
- **SEO Optimized**: Meta tags for search engines and social media
- **Fast Loading**: Optimized bundles and lazy loading
- **Offline Ready**: Static assets cached by GitHub's CDN

## Limitations on GitHub Pages

Since GitHub Pages only hosts static files:
- Transactions are simulated (not persisted)
- Real-time updates are mocked
- No actual XRP integration (demo only)

## Custom Domain (Optional)

1. Add a `CNAME` file to your repository root:
   ```
   your-domain.com
   ```

2. Configure DNS with your domain provider:
   - Create a CNAME record pointing to `YOUR_USERNAME.github.io`

3. Enable HTTPS in repository settings

## Troubleshooting

**Build Fails:**
- Check that all dependencies are in `package.json`
- Verify Node.js version compatibility

**Site Not Loading:**
- Ensure repository name matches base path in config
- Check GitHub Actions logs for deployment errors

**API Errors:**
- Verify mock API files are generated in `/api/` directory
- Check browser console for CORS or path issues

Your Penny4Us platform is now ready for GitHub Pages deployment!