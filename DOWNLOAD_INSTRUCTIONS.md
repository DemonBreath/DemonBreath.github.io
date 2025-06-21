# How to Download Your Penny4Us Project

Since the download button isn't visible in your Replit interface, here are alternative methods:

## Method 1: Copy Key Files Manually

Copy these essential files to recreate your project locally:

### Required Files:
1. `package.json` - Dependencies and scripts
2. `package-lock.json` - Exact dependency versions
3. `tsconfig.json` - TypeScript configuration
4. `vite.config.ts` - Build configuration
5. `tailwind.config.ts` - Styling configuration
6. `postcss.config.js` - CSS processing
7. `components.json` - UI components config

### Source Code:
- `client/` folder - All React frontend code
- `server/` folder - Express backend code  
- `shared/` folder - Shared TypeScript schemas

### Documentation:
- `README.md` - Project overview
- `DEPLOYMENT.md` - Deployment instructions
- `Dockerfile` - Container configuration
- `.env.example` - Environment variables template

## Method 2: Use Replit's Git Integration

1. Go to the "Version control" tab (git icon) in Replit
2. Click "Create a Git Repo" if not already done
3. Push to GitHub from there
4. Clone from GitHub to your local machine

## Method 3: Manual Recreation

If all else fails, you can recreate the project:

1. Create new Node.js project locally
2. Copy the `package.json` content
3. Run `npm install`
4. Copy all source files from the file explorer

## After Download:

```bash
npm install          # Install dependencies
npm run dev         # Start development
npm run build       # Build for production
npm start           # Run production
```

Your complete Penny4Us XRP donation platform will be ready to run locally!