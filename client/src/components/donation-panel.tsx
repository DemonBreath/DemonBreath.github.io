import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { PlusCircle, Send } from "lucide-react";
import type { InsertTransaction } from "@shared/schema";

export function DonationPanel() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const donationMutation = useMutation({
    mutationFn: async (data: InsertTransaction) => {
      const response = await apiRequest("POST", "/api/transactions", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Donation Successful!",
        description: "Your donation has been processed and added to the community pool.",
      });
      setAmount("");
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
    onError: (error) => {
      toast({
        title: "Donation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0 || numAmount > 100) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount between 0.01 and 100 XRP.",
        variant: "destructive",
      });
      return;
    }

    donationMutation.mutate({
      type: "donation",
      amount: numAmount.toFixed(6),
      address: "rDonation...Wallet", // Mock address for donations
      message: message || undefined,
      status: "pending",
    });
  };

  return (
    <div className="terminal-border rounded-lg p-6 bg-dark-gray/60 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-matrix-green mb-4 neon-glow">
        <PlusCircle className="inline mr-2" size={24} />
        DONATE XRP
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="block text-sm text-light-gray mb-2">AMOUNT (XRP)</Label>
          <Input
            type="number"
            step="0.01"
            min="0.01"
            max="100"
            placeholder="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-terminal-black border border-matrix-green/50 rounded px-4 py-3 text-matrix-green font-mono focus:border-matrix-green focus:outline-none focus:ring-2 focus:ring-matrix-green/20"
            required
          />
        </div>
        
        <div>
          <Label className="block text-sm text-light-gray mb-2">MESSAGE (OPTIONAL)</Label>
          <Input
            type="text"
            placeholder="Your message to the community..."
            maxLength={100}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-terminal-black border border-matrix-green/50 rounded px-4 py-3 text-white font-mono focus:border-matrix-green focus:outline-none focus:ring-2 focus:ring-matrix-green/20"
          />
        </div>
        
        <Button
          type="submit"
          disabled={donationMutation.isPending}
          className="w-full bg-matrix-green text-terminal-black font-bold py-3 px-6 rounded hover:bg-matrix-green/80 transition-all duration-300 transform hover:scale-105"
        >
          <Send className="mr-2" size={16} />
          {donationMutation.isPending ? "PROCESSING..." : "SEND DONATION"}
        </Button>
      </form>
    </div>
  );
}
