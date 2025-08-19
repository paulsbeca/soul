import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Crown, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import backgroundImage from "@assets/background_1755498699765.webp";

interface Deity {
  id: string;
  name: string;
  culture: string;
  domains: string[];
  elements: string[];
  symbols: string[];
  epithets: string[];
  offerings: string[];
  cautions: string[];
  stories: string[];
  whyMatters?: string | null;
  image?: string | null;
}

export default function DeityCodex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeity, setSelectedDeity] = useState<Deity | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" }
  };

  const { data: deities = [], isLoading, error } = useQuery<Deity[]>({
    queryKey: ['/api/deities'],
    enabled: true
  });

  const filteredDeities = deities.filter((deity: Deity) =>
    deity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deity.culture.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deity.domains.some(domain => domain.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (selectedDeity) {
    return (
      <section 
        className="min-h-screen text-ethereal-white" 
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeInUp}>
              <Button 
                onClick={() => setSelectedDeity(null)}
                variant="ghost" 
                className="mb-6 text-golden-rune hover:text-silver-star"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Codex
              </Button>
            </motion.div>

            <motion.div 
              className="mystical-border p-8 rounded-lg grimoire-texture"
              {...fadeInUp}
            >
              <div className="flex items-center mb-6">
                <Crown className="mr-3 w-8 h-8 text-golden-rune" />
                <div>
                  <h1 className="font-gothic text-4xl md:text-5xl text-golden-rune">
                    {selectedDeity.name}
                  </h1>
                  <p className="text-xl text-silver-star">{selectedDeity.culture}</p>
                </div>
              </div>

              {selectedDeity.epithets.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-gothic text-xl text-golden-rune mb-2">Sacred Names</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDeity.epithets.map((epithet, index) => (
                      <span key={index} className="px-3 py-1 bg-shadow-purple/30 rounded-full text-sm">
                        {epithet}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-gothic text-xl text-golden-rune mb-3">Domains</h3>
                  <div className="space-y-2">
                    {selectedDeity.domains.map((domain, index) => (
                      <div key={index} className="flex items-center">
                        <Sparkles className="mr-2 w-4 h-4 text-silver-star" />
                        <span>{domain}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-gothic text-xl text-golden-rune mb-3">Elements</h3>
                  <div className="space-y-2">
                    {selectedDeity.elements.map((element, index) => (
                      <div key={index} className="flex items-center">
                        <Sparkles className="mr-2 w-4 h-4 text-silver-star" />
                        <span>{element}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {selectedDeity.symbols.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-gothic text-xl text-golden-rune mb-3">Sacred Symbols</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDeity.symbols.map((symbol, index) => (
                      <span key={index} className="px-3 py-1 bg-deep-purple/30 rounded-full text-sm">
                        {symbol}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedDeity.offerings.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-gothic text-xl text-golden-rune mb-3">Sacred Offerings</h3>
                  <div className="space-y-2">
                    {selectedDeity.offerings.map((offering, index) => (
                      <p key={index} className="text-ethereal-white/90">• {offering}</p>
                    ))}
                  </div>
                </div>
              )}

              {selectedDeity.whyMatters && (
                <div className="mb-6">
                  <h3 className="font-gothic text-xl text-golden-rune mb-3">Why This Deity Matters</h3>
                  <p className="text-ethereal-white/90 leading-relaxed">
                    {selectedDeity.whyMatters}
                  </p>
                </div>
              )}

              {selectedDeity.stories.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-gothic text-xl text-golden-rune mb-3">Sacred Stories</h3>
                  <div className="space-y-3">
                    {selectedDeity.stories.map((story, index) => (
                      <p key={index} className="text-ethereal-white/90 italic">
                        "{story}"
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {selectedDeity.cautions.length > 0 && (
                <div>
                  <h3 className="font-gothic text-xl text-golden-rune mb-3">Sacred Cautions</h3>
                  <div className="space-y-2">
                    {selectedDeity.cautions.map((caution, index) => (
                      <p key={index} className="text-amber-300 text-sm">⚠ {caution}</p>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="min-h-screen text-ethereal-white" 
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <Link href="/remember" className="inline-flex items-center text-golden-rune hover:text-silver-star mb-6">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Athenaeum
            </Link>
            <h1 className="font-gothic text-5xl md:text-6xl text-golden-rune mb-6">
              <Crown className="inline mr-4" />
              Sacred Deity Codex
            </h1>
            <p className="text-xl text-silver-star/90 max-w-3xl mx-auto">
              A sacred repository of divine beings and pantheons from across cultures and traditions. 
              Explore the wisdom of deities who have guided humanity through the ages.
            </p>
          </motion.div>

          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-3 w-5 h-5 text-silver-star/60" />
              <Input
                type="text"
                placeholder="Search deities by name, culture, or domain..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-shadow-purple/20 border-golden-rune/30 text-ethereal-white placeholder-silver-star/60"
              />
            </div>
          </motion.div>

          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-golden-rune"></div>
              <p className="mt-4 text-silver-star">Loading sacred knowledge...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-amber-300">The cosmic connection is disrupted. Please try again.</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeities.map((deity: Deity, index: number) => (
              <motion.div
                key={deity.id}
                className="mystical-border p-6 rounded-lg grimoire-texture cursor-pointer hover:bg-shadow-purple/10 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.1 }}
                onClick={() => setSelectedDeity(deity)}
              >
                <div className="flex items-center mb-4">
                  <Crown className="mr-3 w-6 h-6 text-golden-rune" />
                  <div>
                    <h3 className="font-gothic text-xl text-golden-rune">{deity.name}</h3>
                    <p className="text-silver-star text-sm">{deity.culture}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-silver-star mb-2">Domains</h4>
                  <div className="flex flex-wrap gap-1">
                    {deity.domains.slice(0, 3).map((domain, idx) => (
                      <span key={idx} className="px-2 py-1 bg-deep-purple/30 rounded text-xs">
                        {domain}
                      </span>
                    ))}
                    {deity.domains.length > 3 && (
                      <span className="px-2 py-1 bg-deep-purple/30 rounded text-xs">
                        +{deity.domains.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {deity.epithets.length > 0 && (
                  <div className="text-xs text-ethereal-white/70 italic">
                    "{deity.epithets[0]}"
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {filteredDeities.length === 0 && !isLoading && !error && (
            <div className="text-center py-12">
              <p className="text-silver-star">No deities found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}