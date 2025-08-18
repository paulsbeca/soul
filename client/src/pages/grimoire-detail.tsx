import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { ArrowLeft, Plus, Edit, Trash2, Book, Circle, Star, Eye, EyeOff, Calendar, Moon, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import mysticalChamberBg from "@assets/ChatGPT Image Aug 18, 2025, 12_54_24 AM_1755531868254.webp";
import type { Grimoire, GrimoireEntry } from "@shared/schema";

const grimoireTypeConfig = {
  shadows: {
    icon: Book,
    label: "Book of Shadows",
    color: "from-deep-purple to-shadow-purple",
  },
  mirrors: {
    icon: Circle,
    label: "Book of Mirrors", 
    color: "from-silver-star/20 to-ethereal-white/10",
  },
  stars: {
    icon: Star,
    label: "Book of Stars",
    color: "from-golden-rune/30 to-cosmic-blue/20",
  },
};

const entryTypeConfig = {
  spell: { label: "Spell", icon: Sparkles, color: "bg-purple-500/20 text-purple-300" },
  ritual: { label: "Ritual", icon: Moon, color: "bg-blue-500/20 text-blue-300" },
  meditation: { label: "Meditation", icon: Circle, color: "bg-green-500/20 text-green-300" },
  reflection: { label: "Reflection", icon: Eye, color: "bg-teal-500/20 text-teal-300" },
  dream: { label: "Dream", icon: Moon, color: "bg-indigo-500/20 text-indigo-300" },
  divination: { label: "Divination", icon: Star, color: "bg-yellow-500/20 text-yellow-300" },
  herbal: { label: "Herbal", icon: Sparkles, color: "bg-emerald-500/20 text-emerald-300" },
  crystal: { label: "Crystal", icon: Sparkles, color: "bg-pink-500/20 text-pink-300" },
  astrology: { label: "Astrology", icon: Star, color: "bg-orange-500/20 text-orange-300" },
};

export default function GrimoireDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showCreateEntry, setShowCreateEntry] = useState(false);

  const { data: grimoire, isLoading: grimoireLoading } = useQuery<Grimoire>({
    queryKey: ["/api/grimoires", params.id],
  });

  const { data: entries, isLoading: entriesLoading } = useQuery<GrimoireEntry[]>({
    queryKey: ["/api/grimoires", params.id, "entries"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/grimoires/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/grimoires"] });
      toast({
        title: "Grimoire Deleted",
        description: "Your sacred book has been removed",
      });
      setLocation("/grimoires");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete grimoire",
        variant: "destructive",
      });
    },
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" }
  };

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
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-golden-rune border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-silver-star">Loading sacred book...</p>
        </div>
      </section>
    );
  }

  if (!grimoire) {
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
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center">
          <h1 className="font-gothic text-4xl text-golden-rune mb-4">Sacred Book Not Found</h1>
          <Button
            onClick={() => setLocation("/grimoires")}
            variant="outline"
            className="border-golden-rune/50 text-silver-star hover:bg-golden-rune/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Grimoires
          </Button>
        </div>
      </section>
    );
  }

  const config = grimoireTypeConfig[grimoire.type as keyof typeof grimoireTypeConfig];
  const IconComponent = config?.icon || Book;

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
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div 
            className="mb-12"
            {...fadeInUp}
          >
            <Button
              variant="ghost"
              onClick={() => setLocation("/grimoires")}
              className="mb-6 text-silver-star hover:text-golden-rune"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Grimoires
            </Button>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-lg bg-gradient-to-r ${config?.color} mystical-border`}>
                  <IconComponent className="w-8 h-8 text-golden-rune" />
                </div>
                <div>
                  <h1 className="font-gothic text-4xl md:text-5xl font-semibold text-golden-rune" data-testid="grimoire-title">
                    {grimoire.title}
                  </h1>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge variant="outline" className="text-silver-star border-silver-star/30">
                      {config?.label}
                    </Badge>
                    <div className="flex items-center text-silver-star/60 text-sm">
                      {grimoire.isPublic === "true" ? (
                        <>
                          <Eye className="w-4 h-4 mr-1" />
                          Public
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-4 h-4 mr-1" />
                          Private
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={() => setLocation(`/grimoires/${grimoire.id}/entries/create`)}
                  className="bg-gradient-to-r from-shadow-purple to-deep-purple hover:scale-105 transition-transform"
                  data-testid="button-create-entry"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Entry
                </Button>
                <Button
                  variant="outline"
                  className="border-golden-rune/50 text-golden-rune hover:bg-golden-rune/10"
                  data-testid="button-edit-grimoire"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                      data-testid="button-delete-grimoire"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-black/90 border-golden-rune/50">
                    <DialogHeader>
                      <DialogTitle className="text-golden-rune">Delete Sacred Grimoire</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-silver-star mb-6">
                        Are you sure you want to delete "{grimoire.title}"? This action cannot be undone and will remove all entries.
                      </p>
                      <div className="flex justify-end gap-3">
                        <Button variant="outline" className="border-silver-star/30 text-silver-star">
                          Cancel
                        </Button>
                        <Button
                          onClick={() => deleteMutation.mutate(grimoire.id)}
                          disabled={deleteMutation.isPending}
                          variant="destructive"
                        >
                          {deleteMutation.isPending ? "Deleting..." : "Delete Forever"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {grimoire.description && (
              <p className="text-xl text-silver-star/90 mt-6 max-w-3xl" data-testid="grimoire-description">
                {grimoire.description}
              </p>
            )}
          </motion.div>

          {/* Entries */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-gothic text-3xl text-golden-rune">Sacred Entries</h2>
              <div className="text-silver-star/60">
                {entries?.length || 0} entries
              </div>
            </div>

            {entriesLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-golden-rune border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-silver-star">Loading entries...</p>
              </div>
            ) : entries?.length === 0 ? (
              <Card className="mystical-border bg-black/60 border-golden-rune/30 text-center py-16">
                <CardContent>
                  <IconComponent className="w-16 h-16 mx-auto mb-4 text-golden-rune/50" />
                  <h3 className="font-gothic text-2xl text-silver-star mb-2">No entries yet</h3>
                  <p className="text-silver-star/70 mb-6">Begin documenting your sacred practice</p>
                  <Button
                    onClick={() => setLocation(`/grimoires/${grimoire.id}/entries/create`)}
                    className="bg-gradient-to-r from-shadow-purple to-deep-purple hover:scale-105 transition-transform"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Entry
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {entries?.map((entry, index) => {
                  const entryConfig = entryTypeConfig[entry.entryType as keyof typeof entryTypeConfig];
                  const EntryIcon = entryConfig?.icon || Book;
                  
                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Card 
                        className="mystical-border bg-black/60 border-golden-rune/30 hover:border-golden-rune/60 cursor-pointer transition-all h-full"
                        onClick={() => setLocation(`/grimoires/${grimoire.id}/entries/${entry.id}`)}
                        data-testid={`entry-${entry.id}`}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <EntryIcon className="w-5 h-5 text-golden-rune" />
                              <Badge className={entryConfig?.color || "bg-golden-rune/20 text-golden-rune"}>
                                {entryConfig?.label || entry.entryType}
                              </Badge>
                            </div>
                            {entry.moonPhase && (
                              <div className="flex items-center text-silver-star/60 text-xs">
                                <Moon className="w-3 h-3 mr-1" />
                                {entry.moonPhase}
                              </div>
                            )}
                          </div>
                          <CardTitle className="font-gothic text-xl text-ethereal-white line-clamp-2">
                            {entry.title}
                          </CardTitle>
                          <CardDescription className="text-silver-star/80 line-clamp-3">
                            {entry.content.substring(0, 150)}...
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center text-sm text-silver-star/60">
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(entry.createdAt).toLocaleDateString()}
                            </div>
                            {entry.tags && entry.tags.length > 0 && (
                              <div className="flex gap-1">
                                {entry.tags.slice(0, 2).map((tag, i) => (
                                  <span key={i} className="px-2 py-1 bg-golden-rune/20 text-golden-rune text-xs rounded">
                                    {tag}
                                  </span>
                                ))}
                                {entry.tags.length > 2 && (
                                  <span className="px-2 py-1 bg-silver-star/20 text-silver-star text-xs rounded">
                                    +{entry.tags.length - 2}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>


    </section>
  );
}