import { useQuery } from "@tanstack/react-query";
import type { Stats } from "@shared/schema";

export function useStats() {
  return useQuery<Stats>({
    queryKey: ["/api/stats"],
    refetchInterval: 5000, // Refresh every 5 seconds for real-time feel
  });
}
