import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTransactionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get recent transactions
  app.get("/api/transactions", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const transactions = await storage.getTransactions(limit);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  // Create new transaction
  app.post("/api/transactions", async (req, res) => {
    try {
      const validatedData = insertTransactionSchema.parse(req.body);
      
      // Basic validation
      const amount = parseFloat(validatedData.amount);
      if (amount <= 0 || amount > 100) {
        return res.status(400).json({ message: "Amount must be between 0.01 and 100 XRP" });
      }

      if (validatedData.type === "withdrawal") {
        const stats = await storage.getStats();
        const poolBalance = parseFloat(stats.poolBalance);
        if (amount > poolBalance) {
          return res.status(400).json({ message: "Insufficient pool balance" });
        }
        if (amount > 10) {
          return res.status(400).json({ message: "Maximum withdrawal is 10 XRP" });
        }
      }

      const transaction = await storage.createTransaction(validatedData);
      
      // Simulate processing delay
      setTimeout(async () => {
        await storage.updateTransactionStatus(transaction.id, "confirmed");
      }, 2000);

      res.json(transaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid transaction data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create transaction" });
      }
    }
  });

  // Get sponsors
  app.get("/api/sponsors", async (req, res) => {
    try {
      const sponsors = await storage.getSponsors();
      res.json(sponsors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sponsors" });
    }
  });

  // Get stats
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
