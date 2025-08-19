import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Plus, BookOpen, Calendar, Eye, Moon, Sparkles, Edit, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import mysticalChamberBg from "@assets/ChatGPT Image Aug 18, 2025, 12_54_24 AM_1755531868254.webp";
import type { Grimoire, GrimoireEntry } from "@shared/schema";

const entryTypeIcons = {
  spell: Sparkles,
  ritual: Calendar,
  meditation: Eye,
  reflection: BookOpen,
  dream: Moon,
  divination: Calendar,
  herbal: Sparkles,
  crystal: Sparkles,
  astrology: Moon
};

export default function GrimoireDetail() {
  const [match, params] = useRoute("/grimoires/:id");
  const [selectedTab, setSelectedTab] = useState("entries");
  
  const grimoireId = params?.id;

  const { data: grimoire, isLoading: grimoireLoading } = useQuery<Grimoire>({
    queryKey: ["/api/grimoires", grimoireId],
    enabled: !!grimoireId
  });

  const { data: entries = [], isLoading: entriesLoading } = useQuery<GrimoireEntry[]>({
    queryKey: ["/api/grimoire-entries", grimoireId],
    enabled: !!grimoireId
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" }
  };

  if (!match || !grimoireId) {
    return <div>Grimoire not found</div>;
  }

  if (grimoireLoading) {
    return (
      <section 
        className="min-h-screen text-ethereal-white flex items-center justify-center" 
        style={{
          backgroundImage: `url(${mysticalChamberBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-golden-rune mx-auto mb-4"></div>
          <p className="text-silver-star">Loading grimoire...</p>
        </div>
      </section>
    );
  }

  const entriesByType = entries.reduce((acc, entry) => {
    const type = entry.entryType || 'reflection';
    if (!acc[type]) acc[type] = [];
    acc[type].push(entry);
    return acc;
  }, {} as Record<string, GrimoireEntry[]>);

  const renderEntryCard = (entry: GrimoireEntry) => {
    const IconComponent = entryTypeIcons[entry.entryType as keyof typeof entryTypeIcons] || BookOpen;
    
    return (
      <motion.div
        key={entry.id}
        className="mystical-border rounded-lg grimoire-texture p-4 hover:scale-105 transition-all duration-300"
        whileHover={{ y: -3 }}
        data-testid={`card-entry-${entry.id}`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <IconComponent className="w-5 h-5 text-golden-rune mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-ethereal-white">{entry.title}</h3>
              <p className="text-sm text-silver-star/80 capitalize">{entry.entryType}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" className="text-silver-star hover:text-golden-rune p-1">
              <Edit className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-silver-star hover:text-red-400 p-1">
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <p className="text-silver-star/90 text-sm mb-3 line-clamp-3">
          {entry.content}
        </p>

        <div className="space-y-2 text-xs text-silver-star/70">
          {entry.mood && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Mood:</span>
              <Badge variant="outline" className="text-xs border-silver-star/30">
                {entry.mood}
              </Badge>
            </div>
          )}
          {entry.moonPhase && (
            <div className="flex items-center gap-2">
              <Moon className="w-3 h-3" />
              <span>{entry.moonPhase}</span>
            </div>
          )}
          {entry.astrologicalSign && (
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              <span>{entry.astrologicalSign}</span>
            </div>
          )}
        </div>

        {entry.tags && entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {entry.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-deep-purple/30 text-silver-star/80">
                {tag}
              </Badge>
            ))}
            {entry.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-deep-purple/30 text-silver-star/80">
                +{entry.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="text-xs text-silver-star/60 mt-3 text-right">
          {new Date(entry.createdAt).toLocaleDateString()}
        </div>
      </motion.div>
    );
  };

  return (
    <section 
      className="min-h-screen text-ethereal-white" 
      style={{
        backgroundImage: `url(${mysticalChamberBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      data-testid="grimoire-detail-section"
    >
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Back Button */}
          <motion.div {...fadeInUp} className="mb-8">
            <Link href="/grimoires">
              <Button 
                variant="ghost" 
                className="text-golden-rune hover:text-silver-star transition-colors"
                data-testid="button-back-to-grimoires"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Grimoires
              </Button>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            {...fadeInUp}
          >
            <div className="flex items-center justify-center mb-6">
              {grimoire?.coverImage && (
                <img 
                  src={grimoire.coverImage} 
                  alt={grimoire.title}
                  className="w-24 h-32 object-cover rounded-lg border border-silver-star/30 mr-6"
                  data-testid="grimoire-cover-image"
                />
              )}
              <div>
                <h1 className="font-gothic text-4xl md:text-5xl font-semibold mb-4 text-golden-rune" data-testid="grimoire-title">
                  {grimoire?.title}
                </h1>
                <p className="text-lg text-silver-star/90 leading-relaxed max-w-2xl">
                  {grimoire?.description}
                </p>
                <Badge 
                  variant="secondary" 
                  className="mt-3 bg-deep-purple/30 text-silver-star capitalize"
                  data-testid="grimoire-type-badge"
                >
                  {grimoire?.type} grimoire
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex justify-center gap-4 mb-12"
            {...fadeInUp}
          >
            <Link href={`/grimoires/${grimoireId}/create-entry`}>
              <Button
                className="bg-gradient-to-r from-golden-rune to-cosmic-blue hover:from-golden-rune/90 hover:to-cosmic-blue/90 text-void-black font-semibold px-6 py-2"
                data-testid="button-create-entry"
              >
                <Plus className="mr-2 w-4 h-4" />
                Add New Entry
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-silver-star/50 text-silver-star hover:bg-silver-star/10"
              data-testid="button-edit-grimoire"
            >
              <Edit className="mr-2 w-4 h-4" />
              Edit Grimoire
            </Button>
          </motion.div>

          {/* Content Tabs */}
          <motion.div {...fadeInUp}>
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-black/50 mystical-border max-w-2xl mx-auto">
                <TabsTrigger 
                  value="entries" 
                  className="text-silver-star data-[state=active]:text-golden-rune data-[state=active]:bg-deep-purple/30"
                  data-testid="tab-entries"
                >
                  <BookOpen className="mr-2 w-4 h-4" />
                  All Entries
                </TabsTrigger>
                <TabsTrigger 
                  value="recent" 
                  className="text-silver-star data-[state=active]:text-golden-rune data-[state=active]:bg-deep-purple/30"
                  data-testid="tab-recent"
                >
                  <Calendar className="mr-2 w-4 h-4" />
                  Recent
                </TabsTrigger>
                <TabsTrigger 
                  value="by-type" 
                  className="text-silver-star data-[state=active]:text-golden-rune data-[state=active]:bg-deep-purple/30"
                  data-testid="tab-by-type"
                >
                  <Sparkles className="mr-2 w-4 h-4" />
                  By Type
                </TabsTrigger>
                <TabsTrigger 
                  value="search" 
                  className="text-silver-star data-[state=active]:text-golden-rune data-[state=active]:bg-deep-purple/30"
                  data-testid="tab-search"
                >
                  <Eye className="mr-2 w-4 h-4" />
                  Search
                </TabsTrigger>
              </TabsList>

              <TabsContent value="entries" className="space-y-6">
                {entries.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {entries.map(renderEntryCard)}
                  </div>
                ) : (
                  <motion.div 
                    {...fadeInUp}
                    className="text-center py-20 mystical-border rounded-xl grimoire-texture"
                  >
                    <BookOpen className="w-16 h-16 text-silver-star/50 mx-auto mb-4" />
                    <h3 className="text-2xl text-silver-star mb-4">Your grimoire awaits...</h3>
                    <p className="text-silver-star/70 mb-6 max-w-md mx-auto">
                      Begin your mystical journey by creating your first entry. Document spells, reflections, dreams, and wisdom.
                    </p>
                    <Link href={`/grimoires/${grimoireId}/create-entry`}>
                      <Button
                        className="bg-gradient-to-r from-golden-rune to-cosmic-blue hover:from-golden-rune/90 hover:to-cosmic-blue/90 text-void-black font-semibold px-6 py-2"
                        data-testid="button-first-entry"
                      >
                        <Plus className="mr-2 w-4 h-4" />
                        Create First Entry
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent value="recent" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {entries
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 9)
                    .map(renderEntryCard)}
                </div>
              </TabsContent>

              <TabsContent value="by-type" className="space-y-8">
                {Object.entries(entriesByType).map(([type, typeEntries]) => {
                  const IconComponent = entryTypeIcons[type as keyof typeof entryTypeIcons] || BookOpen;
                  return (
                    <div key={type} className="space-y-4">
                      <div className="flex items-center mb-4">
                        <IconComponent className="w-6 h-6 text-golden-rune mr-3" />
                        <h3 className="text-xl font-semibold text-golden-rune capitalize">
                          {type} ({typeEntries.length})
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {typeEntries.map(renderEntryCard)}
                      </div>
                    </div>
                  );
                })}
              </TabsContent>

              <TabsContent value="search" className="space-y-6">
                <div className="max-w-2xl mx-auto">
                  <div className="text-center py-12">
                    <Eye className="w-16 h-16 text-silver-star/50 mx-auto mb-4" />
                    <h3 className="text-xl text-silver-star mb-2">Search Your Entries</h3>
                    <p className="text-silver-star/70">Search functionality coming soon...</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  );
}