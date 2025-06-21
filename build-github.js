#!/usr/bin/env node
// GitHub Pages build script
const { execSync } = require('child_process');

console.log('Building for GitHub Pages...');

try {
  // Build using GitHub config
  execSync('npx vite build --config vite.config.github.ts', { stdio: 'inherit' });
  
  // Generate mock API files
  execSync('node static-server.js', { stdio: 'inherit' });
  
  console.log('✓ GitHub Pages build complete');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}