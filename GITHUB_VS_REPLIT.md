# Replit vs GitHub Pages - What's Different

## Visual/Functional Differences

### Replit (Development)
- **Live API**: Real-time data updates every 5 seconds
- **Interactive**: Donations/withdrawals actually modify the pool balance
- **Real-time**: Transaction status changes from pending to confirmed
- **Dynamic**: Stats reflect actual user interactions

### GitHub Pages (Static)
- **Mock API**: Static JSON files with fixed data
- **Simulated**: Donations/withdrawals show success messages but don't persist
- **Static**: Stats remain constant (no real-time updates)
- **Demo Mode**: Perfect for showcasing but not functional transactions

## Why They Look Different

1. **Data Source**:
   - Replit: Live Express server with in-memory database
   - GitHub: Static JSON files generated at build time

2. **Interactions**:
   - Replit: Form submissions create real transactions
   - GitHub: Form submissions show success but data isn't saved

3. **Updates**:
   - Replit: Stats refresh every 5 seconds with live data
   - GitHub: Stats are fixed at build time

4. **Path Structure**:
   - Replit: Served from `/` (root)
   - GitHub: Served from `/repository-name/`

## Making Them Look the Same

To make GitHub Pages match Replit exactly:

1. **Use the same base configuration**:
   ```bash
   # Update vite.config.github.ts
   base: '/' instead of '/repository-name/'
   ```

2. **Deploy to custom domain** (makes paths identical)

3. **Add a real backend** (defeats the purpose of static hosting)

## Which to Use When

**Use Replit deployment for**:
- Full functionality with real transactions
- Live demos with actual data persistence
- Development and testing

**Use GitHub Pages for**:
- Portfolio showcase
- Static demo without backend costs
- Quick sharing of the visual design
- SEO-optimized landing page

Both versions maintain the same visual design, animations, and user interface - the core difference is live vs. static data.