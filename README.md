# Penny4Us - XRP Crypto Penny Jar

> Take a penny, leave a penny... but make it crypto.

Penny4Us is a community-driven XRP donation platform that brings the classic "penny jar" concept to the digital age. Users can contribute or withdraw small amounts of XRP in a transparent, blockchain-based system.

## 🚀 Features

- **Dark Matrix Theme**: Cyberpunk aesthetic with animated matrix rain effects
- **XRP Donations**: Contribute 0.01-100 XRP to the community pool
- **XRP Withdrawals**: Withdraw 0.01-10 XRP to your XRP address
- **Real-time Stats**: Live updates of pool balance, active users, and transaction count
- **Sponsor Integration**: Three advertising slots (A, B, C) for monetization
- **Transaction History**: Real-time tracking of all donations and withdrawals
- **Typewriter Animations**: Interactive text effects for enhanced user experience

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Wouter
- **Backend**: Express.js, Node.js
- **Database**: In-memory storage (easily replaceable with PostgreSQL)
- **Styling**: Tailwind CSS with custom cyberpunk theme
- **Icons**: Lucide React
- **Animations**: Framer Motion, custom CSS animations
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: TanStack Query for server state

## 🏗 Architecture

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and query client
│   │   └── pages/         # Page components
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage layer
│   └── vite.ts           # Development server setup
└── shared/               # Shared types and schemas
    └── schema.ts         # Drizzle schema definitions
```

## 🚀 Deployment

The application is configured for deployment on Replit with:

- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Port**: 5000 (mapped to 80 externally)
- **Environment**: Production optimizations enabled

### Environment Variables

No external API keys required for basic functionality. The app uses in-memory storage by default.

### Security Features

- CORS protection
- Rate limiting ready
- Input validation with Zod
- XSS protection headers
- Content type validation
- Secure headers in production

## 🎨 Customization

### Styling
- Custom CSS variables in `client/src/index.css`
- Matrix green (`#00ff41`), cyber cyan (`#00ffff`), neon pink (`#ff0080`)
- Monospace fonts (JetBrains Mono recommended)

### Sponsor Integration
Three advertising slots are available:
- **Slot A**: Premium placement (matrix green theme)
- **Slot B**: Featured placement (cyber cyan theme) 
- **Slot C**: Strategic placement (neon pink theme)

## 📱 User Experience

1. **Landing**: Animated typewriter introduction with matrix rain background
2. **Donation**: Simple form with amount and optional message
3. **Withdrawal**: Form with amount and XRP address validation
4. **Real-time Updates**: Stats refresh every 5 seconds
5. **Transaction Tracking**: Live status updates (pending → confirmed/failed)

## 🔒 Security Considerations

- Input validation on both client and server
- XRP address format validation
- Amount limits (donations: 0.01-100 XRP, withdrawals: 0.01-10 XRP)
- Pool balance checking for withdrawals
- Error handling without exposing internal details

## 🚦 API Endpoints

- `GET /api/stats` - Pool statistics
- `GET /api/transactions` - Transaction history
- `POST /api/transactions` - Create donation/withdrawal
- `GET /api/sponsors` - Active sponsors
- `GET /health` - Health check

## 💡 Future Enhancements

- Real XRP Ledger integration
- User authentication system
- Advanced sponsor management
- Analytics dashboard
- Mobile app support
- Multi-language support

---

Built with ❤️ for the crypto community. Not financial advice - use at your own risk.