import { useQuery } from "@tanstack/react-query";
import { useStats } from "@/hooks/use-stats";
import type { Stats } from "@shared/schema";

export function StatsDisplay() {
  const { data: stats, isLoading } = useStats();

  if (isLoading) {
    return (
      <section className="grid md:grid-cols-3 gap-6 mb-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="terminal-border rounded-lg p-6 bg-terminal-black/60 backdrop-blur-sm text-center">
            <div className="h-4 bg-matrix-green/20 rounded mb-2 animate-pulse"></div>
            <div className="h-8 bg-matrix-green/20 rounded mb-2 animate-pulse"></div>
            <div className="h-3 bg-matrix-green/20 rounded animate-pulse"></div>
          </div>
        ))}
      </section>
    );
  }

  const usdValue = stats ? (parseFloat(stats.poolBalance) * 0.50).toFixed(2) : "0.00";

  return (
    <section className="grid md:grid-cols-3 gap-6 mb-12">
      <div className="terminal-border rounded-lg p-6 bg-terminal-black/60 backdrop-blur-sm text-center">
        <h3 className="text-sm text-light-gray mb-2">TOTAL POOL BALANCE</h3>
        <div className="text-3xl font-bold text-matrix-green neon-glow">
          {stats?.poolBalance} XRP
        </div>
        <div className="text-xs text-light-gray mt-2">≈ ${usdValue} USD</div>
      </div>
      
      <div className="terminal-border rounded-lg p-6 bg-terminal-black/60 backdrop-blur-sm text-center">
        <h3 className="text-sm text-light-gray mb-2">ACTIVE USERS</h3>
        <div className="text-3xl font-bold text-cyber-cyan neon-glow">
          {stats?.activeUsers.toLocaleString()}
        </div>
        <div className="text-xs text-light-gray mt-2">Last 24h</div>
      </div>
      
      <div className="terminal-border rounded-lg p-6 bg-terminal-black/60 backdrop-blur-sm text-center">
        <h3 className="text-sm text-light-gray mb-2">TOTAL TRANSACTIONS</h3>
        <div className="text-3xl font-bold text-neon-pink neon-glow">
          {stats?.totalTransactions.toLocaleString()}
        </div>
        <div className="text-xs text-light-gray mt-2">All time</div>
      </div>
    </section>
  );
}
