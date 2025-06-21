import { useQuery } from "@tanstack/react-query";
import type { Transaction } from "@shared/schema";

export function useTransactions(limit: number = 10) {
  return useQuery<Transaction[]>({
    queryKey: ["/api/transactions", limit],
    queryFn: async () => {
      const response = await fetch(`/api/transactions?limit=${limit}`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      return response.json();
    },
  });
}
