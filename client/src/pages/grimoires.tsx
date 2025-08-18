import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Plus, Book, BookOpen, Star, Circle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import mysticalChamberBg from "@assets/ChatGPT Image Aug 18, 2025, 12_54_24 AM_1755531868254.webp";
import type { Grimoire } from "@shared/schema";

const grimoireTypeConfig = {
  shadows: {
    icon: Book,
    label: "Book of Shadows",
    description: "Spells, rituals, and magical workings",
    color: "from-deep-purple to-shadow-purple",
  },
  mirrors: {
    icon: Circle,
    label: "Book of Mirrors", 
    description: "Self-reflection, dreams, and inner work",
    color: "from-silver-star/20 to-ethereal-white/10",
  },
  stars: {
    icon: Star,
    label: "Book of Stars",
    description: "Astrology, divination, and cosmic wisdom",
    color: "from-golden-rune/30 to-cosmic-blue/20",
  },
};

export default function Grimoires() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { data: grimoires, isLoading } = useQuery<Grimoire[]>({
    queryKey: ["/api/grimoires"],
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" }
  };

  const filteredGrimoires = selectedType 
    ? grimoires?.filter(g => g.type === selectedType)
    : grimoires;

  return (
    <section 
      className="min-h-screen text-ethereal-white" 
      style={{
        backgroundImage: `url(${mysticalChamberBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      data-testid="grimoires-section"
    >
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Header */}
      <div className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h1 className="font-gothic text-4xl md:text-6xl font-semibold mb-6 text-golden-rune" data-testid="grimoires-title">
              Sacred Grimoires
            </h1>
            <p className="text-xl md:text-2xl text-silver-star/90 leading-relaxed max-w-3xl mx-auto" data-testid="grimoires-description">
              Create your personal digital books of wisdom, magic, and spiritual exploration
            </p>
          </motion.div>

          {/* Type Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Button
              variant={selectedType === null ? "default" : "outline"}
              onClick={() => setSelectedType(null)}
              className="bg-gradient-to-r from-shadow-purple to-deep-purple hover:scale-105 transition-transform"
              data-testid="filter-all"
            >
              All Grimoires
            </Button>
            {Object.entries(grimoireTypeConfig).map(([type, config]) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
                className="bg-gradient-to-r from-shadow-purple to-deep-purple hover:scale-105 transition-transform"
                data-testid={`filter-${type}`}
              >
                <config.icon className="w-4 h-4 mr-2" />
                {config.label}
              </Button>
            ))}
          </motion.div>

          {/* Create New Grimoire */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Card className="mystical-border bg-black/60 border-golden-rune/50">
              <CardHeader className="text-center">
                <CardTitle className="font-gothic text-2xl text-golden-rune flex items-center justify-center">
                  <Plus className="w-6 h-6 mr-2" />
                  Begin a New Sacred Journey
                </CardTitle>
                <CardDescription className="text-silver-star/90">
                  Choose your path and create your first grimoire
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {Object.entries(grimoireTypeConfig).map(([type, config]) => {
                    const IconComponent = config.icon;
                    return (
                      <motion.div
                        key={type}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Card 
                          className={`mystical-border bg-gradient-to-br ${config.color} cursor-pointer hover:shadow-lg hover:shadow-golden-rune/20 transition-all`}
                          onClick={() => window.location.href = `/grimoires/create?type=${type}`}
                          data-testid={`create-${type}`}
                        >
                          <CardContent className="p-6 text-center">
                            <IconComponent className="w-12 h-12 mx-auto mb-4 text-golden-rune" />
                            <h3 className="font-gothic text-xl font-semibold mb-2 text-ethereal-white">
                              {config.label}
                            </h3>
                            <p className="text-sm text-silver-star/90">
                              {config.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Grimoires List */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-golden-rune border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-silver-star">Loading your sacred books...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGrimoires?.map((grimoire, index) => {
                const config = grimoireTypeConfig[grimoire.type as keyof typeof grimoireTypeConfig];
                const IconComponent = config?.icon || BookOpen;
                
                return (
                  <motion.div
                    key={grimoire.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card 
                      className="mystical-border bg-black/60 border-golden-rune/30 hover:border-golden-rune/60 cursor-pointer transition-all h-full"
                      onClick={() => window.location.href = `/grimoires/${grimoire.id}`}
                      data-testid={`grimoire-${grimoire.id}`}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <IconComponent className="w-6 h-6 text-golden-rune" />
                          <Badge variant="outline" className="text-silver-star border-silver-star/30">
                            {config?.label || grimoire.type}
                          </Badge>
                        </div>
                        <CardTitle className="font-gothic text-xl text-ethereal-white">
                          {grimoire.title}
                        </CardTitle>
                        {grimoire.description && (
                          <CardDescription className="text-silver-star/80">
                            {grimoire.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center text-sm text-silver-star/60">
                          <span>Created {new Date(grimoire.createdAt).toLocaleDateString()}</span>
                          <span>{grimoire.isPublic === "true" ? "Public" : "Private"}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}

              {filteredGrimoires?.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-golden-rune/50" />
                  <h3 className="font-gothic text-2xl text-silver-star mb-2">No grimoires yet</h3>
                  <p className="text-silver-star/70 mb-6">Begin your sacred practice by creating your first grimoire</p>
                  <Button
                    onClick={() => window.location.href = '/grimoires/create'}
                    className="bg-gradient-to-r from-shadow-purple to-deep-purple hover:scale-105 transition-transform"
                    data-testid="button-create-first"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Grimoire
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}