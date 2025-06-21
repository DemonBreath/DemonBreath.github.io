import { useQuery } from "@tanstack/react-query";
import type { Transaction } from "@shared/schema";

export function useTransactions(limit: number = 10) {
  return useQuery<Transaction[]>({
    queryKey: ["/api/transactions", limit],
    queryFn: async () => {
      const { getApiUrl } = await import('../lib/api-adapter');
      const url = getApiUrl('/transactions');
      const response = await fetch(url, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      return response.json();
    },
  });
}
