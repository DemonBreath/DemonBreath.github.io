import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  type: text("type", { enum: ["donation", "withdrawal"] }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 6 }).notNull(),
  address: text("address").notNull(),
  message: text("message"),
  status: text("status", { enum: ["pending", "confirmed", "failed"] }).notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const sponsors = pgTable("sponsors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  slot: text("slot", { enum: ["A", "B", "C"] }).notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  poolBalance: decimal("pool_balance", { precision: 10, scale: 6 }).notNull().default("0"),
  activeUsers: integer("active_users").notNull().default(0),
  totalTransactions: integer("total_transactions").notNull().default(0),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertSponsorSchema = createInsertSchema(sponsors).omit({
  id: true,
});

export const insertStatsSchema = createInsertSchema(stats).omit({
  id: true,
});

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertSponsor = z.infer<typeof insertSponsorSchema>;
export type Sponsor = typeof sponsors.$inferSelect;
export type InsertStats = z.infer<typeof insertStatsSchema>;
export type Stats = typeof stats.$inferSelect;
