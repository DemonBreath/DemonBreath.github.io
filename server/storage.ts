import { transactions, sponsors, stats, type Transaction, type InsertTransaction, type Sponsor, type InsertSponsor, type Stats, type InsertStats } from "@shared/schema";

export interface IStorage {
  // Transactions
  getTransactions(limit?: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  updateTransactionStatus(id: number, status: "pending" | "confirmed" | "failed"): Promise<Transaction>;
  
  // Sponsors
  getSponsors(): Promise<Sponsor[]>;
  createSponsor(sponsor: InsertSponsor): Promise<Sponsor>;
  
  // Stats
  getStats(): Promise<Stats>;
  updateStats(stats: Partial<InsertStats>): Promise<Stats>;
}

export class MemStorage implements IStorage {
  private transactions: Map<number, Transaction>;
  private sponsors: Map<number, Sponsor>;
  private stats: Stats;
  private currentTransactionId: number;
  private currentSponsorId: number;

  constructor() {
    this.transactions = new Map();
    this.sponsors = new Map();
    this.currentTransactionId = 1;
    this.currentSponsorId = 1;
    
    // Initialize with default stats
    this.stats = {
      id: 1,
      poolBalance: "127.43",
      activeUsers: 1247,
      totalTransactions: 15892,
      lastUpdated: new Date(),
    };

    // Initialize with default sponsors
    const defaultSponsors: InsertSponsor[] = [
      {
        name: "SPONSOR SLOT A",
        description: "Premium advertising space for crypto-related services and products.",
        slot: "A",
        isActive: true,
      },
      {
        name: "SPONSOR SLOT B", 
        description: "Featured placement for blockchain technology and DeFi platforms.",
        slot: "B",
        isActive: true,
      },
      {
        name: "SPONSOR SLOT C",
        description: "Strategic partnership opportunities for fintech and crypto companies.",
        slot: "C",
        isActive: true,
      },
    ];

    defaultSponsors.forEach(sponsor => {
      const id = this.currentSponsorId++;
      this.sponsors.set(id, { ...sponsor, id, isActive: sponsor.isActive ?? true });
    });

    // Add some mock transactions
    const mockTransactions: InsertTransaction[] = [
      {
        type: "donation",
        amount: "0.05",
        address: "rXXX...XXXX",
        message: "Keep up the great work!",
        status: "confirmed",
      },
      {
        type: "withdrawal",
        amount: "0.02",
        address: "rYYY...YYYY",
        status: "confirmed",
      },
      {
        type: "donation",
        amount: "0.10",
        address: "rZZZ...ZZZZ",
        message: "For the community",
        status: "confirmed",
      },
      {
        type: "withdrawal",
        amount: "0.03",
        address: "rAAA...AAAA",
        status: "pending",
      },
    ];

    mockTransactions.forEach(tx => {
      const id = this.currentTransactionId++;
      this.transactions.set(id, { 
        ...tx, 
        id, 
        message: tx.message ?? null,
        status: tx.status ?? "pending",
        createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60) // Random time within last hour
      });
    });
  }

  async getTransactions(limit: number = 10): Promise<Transaction[]> {
    const allTransactions = Array.from(this.transactions.values());
    return allTransactions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentTransactionId++;
    const transaction: Transaction = {
      ...insertTransaction,
      id,
      message: insertTransaction.message ?? null,
      status: insertTransaction.status ?? "pending",
      createdAt: new Date(),
    };
    this.transactions.set(id, transaction);
    
    // Update stats
    this.stats.totalTransactions++;
    if (insertTransaction.type === "donation") {
      this.stats.poolBalance = (parseFloat(this.stats.poolBalance) + parseFloat(insertTransaction.amount)).toFixed(6);
    } else {
      this.stats.poolBalance = (parseFloat(this.stats.poolBalance) - parseFloat(insertTransaction.amount)).toFixed(6);
    }
    this.stats.lastUpdated = new Date();
    
    return transaction;
  }

  async updateTransactionStatus(id: number, status: "pending" | "confirmed" | "failed"): Promise<Transaction> {
    const transaction = this.transactions.get(id);
    if (!transaction) {
      throw new Error("Transaction not found");
    }
    
    const updatedTransaction = { ...transaction, status };
    this.transactions.set(id, updatedTransaction);
    return updatedTransaction;
  }

  async getSponsors(): Promise<Sponsor[]> {
    return Array.from(this.sponsors.values()).filter(s => s.isActive);
  }

  async createSponsor(insertSponsor: InsertSponsor): Promise<Sponsor> {
    const id = this.currentSponsorId++;
    const sponsor: Sponsor = { 
      ...insertSponsor, 
      id,
      isActive: insertSponsor.isActive ?? true 
    };
    this.sponsors.set(id, sponsor);
    return sponsor;
  }

  async getStats(): Promise<Stats> {
    return this.stats;
  }

  async updateStats(newStats: Partial<InsertStats>): Promise<Stats> {
    this.stats = { ...this.stats, ...newStats, lastUpdated: new Date() };
    return this.stats;
  }
}

export const storage = new MemStorage();
