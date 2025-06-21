import { useQuery } from "@tanstack/react-query";
import { Handshake } from "lucide-react";
import type { Sponsor } from "@shared/schema";

export function SponsorSection() {
  const { data: sponsors, isLoading } = useQuery<Sponsor[]>({
    queryKey: ["/api/sponsors"],
    queryFn: async () => {
      const { getApiUrl } = await import('../lib/api-adapter');
      const url = getApiUrl('/sponsors');
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch sponsors");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          <Handshake className="inline mr-2" size={24} />
          OUR SPONSORS
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="sponsor-slot rounded-lg p-6 text-center">
              <div className="h-16 bg-light-gray/20 rounded mb-4 animate-pulse"></div>
              <div className="h-6 bg-light-gray/20 rounded mb-2 animate-pulse"></div>
              <div className="h-4 bg-light-gray/20 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const slotColors = {
    A: "text-matrix-green hover:text-white",
    B: "text-cyber-cyan hover:text-white", 
    C: "text-neon-pink hover:text-white",
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        <Handshake className="inline mr-2" size={24} />
        OUR SPONSORS
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {sponsors?.map((sponsor) => (
          <div key={sponsor.id} className="sponsor-slot rounded-lg p-6 text-center hover:border-matrix-green/50 transition-all duration-300">
            <div className="text-light-gray mb-4">
              <Handshake size={48} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{sponsor.name}</h3>
            <p className="text-sm text-light-gray mb-4">
              {sponsor.description}
            </p>
            <button className={`text-sm transition-colors ${slotColors[sponsor.slot as keyof typeof slotColors]}`}>
              Learn More →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
