import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MinusCircle, Download } from "lucide-react";
import type { InsertTransaction } from "@shared/schema";

export function WithdrawalPanel() {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const withdrawalMutation = useMutation({
    mutationFn: async (data: InsertTransaction) => {
      const response = await apiRequest("POST", "/api/transactions", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Withdrawal Requested!",
        description: "Your withdrawal request has been submitted and is being processed.",
      });
      setAmount("");
      setAddress("");
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
    onError: (error) => {
      toast({
        title: "Withdrawal Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0 || numAmount > 10) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount between 0.01 and 10 XRP.",
        variant: "destructive",
      });
      return;
    }

    if (!address || !address.startsWith("r") || address.length < 25) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid XRP address starting with 'r'.",
        variant: "destructive",
      });
      return;
    }

    withdrawalMutation.mutate({
      type: "withdrawal",
      amount: numAmount.toFixed(6),
      address: address,
      status: "pending",
    });
  };

  return (
    <div className="terminal-border rounded-lg p-6 bg-dark-gray/60 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-cyber-cyan mb-4 neon-glow">
        <MinusCircle className="inline mr-2" size={24} />
        WITHDRAW XRP
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="block text-sm text-light-gray mb-2">AMOUNT (XRP)</Label>
          <Input
            type="number"
            step="0.01"
            min="0.01"
            max="10"
            placeholder="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-terminal-black border border-cyber-cyan/50 rounded px-4 py-3 text-cyber-cyan font-mono focus:border-cyber-cyan focus:outline-none focus:ring-2 focus:ring-cyber-cyan/20"
            required
          />
        </div>
        
        <div>
          <Label className="block text-sm text-light-gray mb-2">YOUR XRP ADDRESS</Label>
          <Input
            type="text"
            placeholder="rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-terminal-black border border-cyber-cyan/50 rounded px-4 py-3 text-white font-mono text-sm focus:border-cyber-cyan focus:outline-none focus:ring-2 focus:ring-cyber-cyan/20"
            required
          />
        </div>
        
        <Button
          type="submit"
          disabled={withdrawalMutation.isPending}
          className="w-full bg-cyber-cyan text-terminal-black font-bold py-3 px-6 rounded hover:bg-cyber-cyan/80 transition-all duration-300 transform hover:scale-105"
        >
          <Download className="mr-2" size={16} />
          {withdrawalMutation.isPending ? "PROCESSING..." : "REQUEST WITHDRAWAL"}
        </Button>
      </form>
    </div>
  );
}
