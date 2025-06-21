// Simple static server for GitHub Pages deployment
// This creates a mock API for the frontend to work with static hosting

const mockStats = {
  id: 1,
  poolBalance: "127.43",
  activeUsers: 1247,
  totalTransactions: 15892,
  lastUpdated: new Date().toISOString()
};

const mockSponsors = [
  {
    id: 1,
    name: "SPONSOR SLOT A",
    description: "Premium advertising space for crypto-related services and products.",
    slot: "A",
    isActive: true
  },
  {
    id: 2,
    name: "SPONSOR SLOT B", 
    description: "Featured placement for blockchain technology and DeFi platforms.",
    slot: "B",
    isActive: true
  },
  {
    id: 3,
    name: "SPONSOR SLOT C",
    description: "Strategic partnership opportunities for fintech and crypto companies.",
    slot: "C",
    isActive: true
  }
];

const mockTransactions = [
  {
    id: 1,
    type: "donation",
    amount: "0.05",
    address: "rXXX...XXXX",
    message: "Keep up the great work!",
    status: "confirmed",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  },
  {
    id: 2,
    type: "withdrawal",
    amount: "0.02",
    address: "rYYY...YYYY",
    message: null,
    status: "confirmed",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
  },
  {
    id: 3,
    type: "donation",
    amount: "0.10",
    address: "rZZZ...ZZZZ",
    message: "For the community",
    status: "confirmed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString()
  },
  {
    id: 4,
    type: "withdrawal",
    amount: "0.03",
    address: "rAAA...AAAA",
    message: null,
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString()
  }
];

// Create mock API endpoints as JSON files
import fs from 'fs';
import path from 'path';

const apiDir = './dist/public/api';

// Create API directory structure
fs.mkdirSync(path.join(apiDir, 'transactions'), { recursive: true });
fs.mkdirSync(path.join(apiDir, 'sponsors'), { recursive: true });
fs.mkdirSync(path.join(apiDir, 'stats'), { recursive: true });

// Write mock data files
fs.writeFileSync(path.join(apiDir, 'stats', 'index.json'), JSON.stringify(mockStats, null, 2));
fs.writeFileSync(path.join(apiDir, 'sponsors', 'index.json'), JSON.stringify(mockSponsors, null, 2));
fs.writeFileSync(path.join(apiDir, 'transactions', 'index.json'), JSON.stringify(mockTransactions, null, 2));

console.log('✓ Mock API files created for GitHub Pages deployment');