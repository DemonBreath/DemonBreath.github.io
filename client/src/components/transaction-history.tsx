import { useState } from "react";
import { useTransactions } from "@/hooks/use-transactions";
import { History, PlusCircle, MinusCircle, Clock, ChevronDown } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function TransactionHistory() {
  const [limit, setLimit] = useState(10);
  const { data: transactions, isLoading } = useTransactions(limit);

  const getTypeIcon = (type: string) => {
    return type === "donation" ? (
      <PlusCircle className="inline mr-2" size={16} />
    ) : (
      <MinusCircle className="inline mr-2" size={16} />
    );
  };

  const getTypeColor = (type: string) => {
    return type === "donation" ? "text-matrix-green" : "text-cyber-cyan";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-matrix-green bg-matrix-green/20";
      case "pending":
        return "text-neon-pink bg-neon-pink/20 animate-pulse";
      case "failed":
        return "text-red-500 bg-red-500/20";
      default:
        return "text-light-gray bg-light-gray/20";
    }
  };

  const formatAddress = (address: string) => {
    if (address.length <= 10) return address;
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const loadMore = () => {
    setLimit(prev => prev + 10);
  };

  if (isLoading) {
    return (
      <section className="mb-12">
        <div className="terminal-border rounded-lg p-6 bg-dark-gray/60 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-6">
            <History className="inline mr-2" size={24} />
            RECENT TRANSACTIONS
          </h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-matrix-green/20 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="terminal-border rounded-lg p-6 bg-dark-gray/60 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-6">
          <History className="inline mr-2" size={24} />
          RECENT TRANSACTIONS
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full font-mono text-sm">
            <thead>
              <tr className="border-b border-matrix-green/30">
                <th className="text-left py-3 text-matrix-green">TYPE</th>
                <th className="text-left py-3 text-matrix-green">AMOUNT</th>
                <th className="text-left py-3 text-matrix-green">ADDRESS</th>
                <th className="text-left py-3 text-matrix-green">TIME</th>
                <th className="text-left py-3 text-matrix-green">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((tx) => (
                <tr 
                  key={tx.id} 
                  className="transaction-row border-b border-medium-gray/30 hover:bg-matrix-green/10 transition-all duration-200"
                >
                  <td className="py-3">
                    <span className={getTypeColor(tx.type)}>
                      {getTypeIcon(tx.type)}
                      {tx.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 text-white">
                    {tx.type === "donation" ? "+" : "-"}{parseFloat(tx.amount).toFixed(2)} XRP
                  </td>
                  <td className="py-3 text-light-gray">{formatAddress(tx.address)}</td>
                  <td className="py-3 text-light-gray">
                    {formatDistanceToNow(new Date(tx.createdAt), { addSuffix: true })}
                  </td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(tx.status)}`}>
                      {tx.status === "pending" && <Clock className="inline mr-1" size={12} />}
                      {tx.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {transactions && transactions.length >= limit && (
          <div className="text-center mt-6">
            <button 
              onClick={loadMore}
              className="text-matrix-green hover:text-white transition-colors"
            >
              <ChevronDown className="inline mr-2" size={16} />
              LOAD MORE TRANSACTIONS
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
