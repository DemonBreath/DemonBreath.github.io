import { useEffect } from "react";
import { MatrixRain } from "@/components/matrix-rain";
import { TypewriterText } from "@/components/typewriter-text";
import { DonationPanel } from "@/components/donation-panel";
import { WithdrawalPanel } from "@/components/withdrawal-panel";
import { StatsDisplay } from "@/components/stats-display";
import { SponsorSection } from "@/components/sponsor-section";
import { TransactionHistory } from "@/components/transaction-history";
import { Coins, UserCircle, Handshake, History, PlusCircle, MinusCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Header */}
      <header className="relative z-10 border-b border-matrix-green/30 bg-terminal-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-matrix-green neon-glow">
                <Coins className="inline mr-2" size={24} />
                PENNY4US
              </div>
              <div className="hidden md:block text-sm text-light-gray">
                &gt; CRYPTO_TERMINAL_v2.1.0
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-cyber-cyan hover:text-white transition-colors">
                <UserCircle className="inline mr-2" size={16} />
                LOGIN
              </button>
              <div className="text-sm text-light-gray">
                STATUS: <span className="text-matrix-green">ONLINE</span>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Intro Section */}
        <section className="mb-12 text-center">
          <div className="terminal-border rounded-lg p-8 bg-terminal-black/60 backdrop-blur-sm">
            <div className="mb-6">
              <img 
                src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                alt="Dark coding setup with monitors" 
                className="rounded-lg w-full h-48 object-cover opacity-50" 
              />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-matrix-green mb-4 neon-glow">
              PENNY4US.XRP
            </h1>
            
            <div className="text-lg md:text-xl text-cyber-cyan mb-6">
              <TypewriterText 
                text="&gt; Take a penny, leave a penny... but make it crypto_"
                speed={50}
                delay={1000}
              />
            </div>
            
            <p className="text-light-gray max-w-2xl mx-auto leading-relaxed">
              Welcome to the digital penny jar. A community-driven XRP pool where you can contribute 
              or withdraw small amounts. Every penny counts in the crypto revolution.
            </p>
            
            <div className="mt-4 text-sm text-matrix-green font-mono">
              <TypewriterText 
                text="Initializing crypto terminal... Connecting to XRP ledger... Loading community fund... System ready. Welcome, user."
                speed={30}
                delay={3000}
              />
            </div>
          </div>
        </section>

        {/* Action Panels */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <DonationPanel />
          <WithdrawalPanel />
        </section>

        {/* Stats Display */}
        <StatsDisplay />

        {/* Sponsor Section */}
        <SponsorSection />

        {/* Transaction History */}
        <TransactionHistory />

        {/* Educational Section */}
        <section className="mb-12">
          <div className="terminal-border rounded-lg p-8 bg-terminal-black/60 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-matrix-green mb-6 text-center neon-glow">
              THE PENNY4US PROTOCOL
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                  alt="Cryptocurrency coins and blockchain visualization" 
                  className="rounded-lg w-full h-48 object-cover mb-4" 
                />
                
                <h3 className="text-xl font-bold text-cyber-cyan mb-4">HOW IT WORKS</h3>
                <ul className="space-y-3 text-light-gray">
                  <li className="flex items-start">
                    <span className="text-matrix-green mr-2">&gt;</span>
                    Community members contribute small XRP amounts (pennies)
                  </li>
                  <li className="flex items-start">
                    <span className="text-matrix-green mr-2">&gt;</span>
                    Anyone can withdraw small amounts when needed
                  </li>
                  <li className="flex items-start">
                    <span className="text-matrix-green mr-2">&gt;</span>
                    Transparent blockchain transactions ensure trust
                  </li>
                  <li className="flex items-start">
                    <span className="text-matrix-green mr-2">&gt;</span>
                    Sponsored by crypto-friendly businesses
                  </li>
                </ul>
              </div>
              
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                  alt="Dark circuit board with neon lights" 
                  className="rounded-lg w-full h-48 object-cover mb-4" 
                />
                
                <h3 className="text-xl font-bold text-neon-pink mb-4">WHY XRP?</h3>
                <ul className="space-y-3 text-light-gray">
                  <li className="flex items-start">
                    <span className="text-matrix-green mr-2">&gt;</span>
                    Ultra-low transaction fees (fractions of a penny)
                  </li>
                  <li className="flex items-start">
                    <span className="text-matrix-green mr-2">&gt;</span>
                    3-5 second settlement times
                  </li>
                  <li className="flex items-start">
                    <span className="text-matrix-green mr-2">&gt;</span>
                    Environmentally sustainable consensus
                  </li>
                  <li className="flex items-start">
                    <span className="text-matrix-green mr-2">&gt;</span>
                    Perfect for micro-transactions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-matrix-green/30 bg-terminal-black/80 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-bold text-matrix-green mb-4">PENNY4US.XRP</h4>
              <p className="text-light-gray text-sm mb-4">
                A community-driven cryptocurrency initiative bringing the 
                "take a penny, leave a penny" concept to the digital age.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">QUICK LINKS</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-light-gray hover:text-matrix-green transition-colors">How It Works</a></li>
                <li><a href="#" className="text-light-gray hover:text-matrix-green transition-colors">Transaction History</a></li>
                <li><a href="#" className="text-light-gray hover:text-matrix-green transition-colors">Sponsor With Us</a></li>
                <li><a href="#" className="text-light-gray hover:text-matrix-green transition-colors">API Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">SYSTEM STATUS</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-light-gray">XRP Network:</span>
                  <span className="text-matrix-green">ONLINE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-light-gray">API Status:</span>
                  <span className="text-matrix-green">OPERATIONAL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-light-gray">Last Updated:</span>
                  <span className="text-light-gray">2 sec ago</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-medium-gray/30 mt-8 pt-6 text-center">
            <p className="text-light-gray text-sm">
              © 2024 Penny4Us.XRP - Built for the crypto community, by the crypto community.
              <br className="md:hidden" />
              <span className="text-xs">Not financial advice. Use at your own risk.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
