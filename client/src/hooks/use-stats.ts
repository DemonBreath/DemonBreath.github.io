import { useQuery } from "@tanstack/react-query";
import type { Stats } from "@shared/schema";

export function useStats() {
  return useQuery<Stats>({
    queryKey: ["/api/stats"],
    queryFn: async () => {
      const { getApiUrl } = await import('../lib/api-adapter');
      const url = getApiUrl('/stats');
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }
      return response.json();
    },
    refetchInterval: 5000, // Refresh every 5 seconds for real-time feel
  });
}
