import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { ArrowLeft, Edit, Trash2, Calendar, Moon, Star, Tags, Heart, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import mysticalChamberBg from "@assets/ChatGPT Image Aug 18, 2025, 12_54_24 AM_1755531868254.webp";
import type { GrimoireEntry, Grimoire } from "@shared/schema";

const entryTypeConfig = {
  spell: { label: "Spell", color: "bg-purple-500/20 text-purple-300" },
  ritual: { label: "Ritual", color: "bg-blue-500/20 text-blue-300" },
  meditation: { label: "Meditation", color: "bg-green-500/20 text-green-300" },
  reflection: { label: "Reflection", color: "bg-teal-500/20 text-teal-300" },
  dream: { label: "Dream", color: "bg-indigo-500/20 text-indigo-300" },
  divination: { label: "Divination", color: "bg-yellow-500/20 text-yellow-300" },
  herbal: { label: "Herbal", color: "bg-emerald-500/20 text-emerald-300" },
  crystal: { label: "Crystal", color: "bg-pink-500/20 text-pink-300" },
  astrology: { label: "Astrology", color: "bg-orange-500/20 text-orange-300" },
};

export default function EntryDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: entry, isLoading: entryLoading } = useQuery<GrimoireEntry>({
    queryKey: ["/api/grimoire-entries", params.entryId],
  });

  const { data: grimoire } = useQuery<Grimoire>({
    queryKey: ["/api/grimoires", params.id],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/grimoire-entries/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/grimoires", params.id, "entries"] });
      toast({
        title: "Entry Deleted",
        description: "Your sacred entry has been removed",
      });
      setLocation(`/grimoires/${params.id}`);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete entry",
        variant: "destructive",
      });
    },
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" }
  };

  if (entryLoading) {
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
          <p className="text-silver-star">Loading sacred entry...</p>
        </div>
      </section>
    );
  }

  if (!entry) {
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
          <h1 className="font-gothic text-4xl text-golden-rune mb-4">Entry Not Found</h1>
          <Button
            onClick={() => setLocation(`/grimoires/${params.id}`)}
            variant="outline"
            className="border-golden-rune/50 text-silver-star hover:bg-golden-rune/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Grimoire
          </Button>
        </div>
      </section>
    );
  }

  const entryConfig = entryTypeConfig[entry.entryType as keyof typeof entryTypeConfig];

  return (
    <section 
      className="min-h-screen text-ethereal-white" 
      style={{
        backgroundImage: `url(${mysticalChamberBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      data-testid="entry-detail-section"
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <motion.div 
            className="mb-12"
            {...fadeInUp}
          >
            <Button
              variant="ghost"
              onClick={() => setLocation(`/grimoires/${params.id}`)}
              className="mb-6 text-silver-star hover:text-golden-rune"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {grimoire?.title}
            </Button>
            
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={entryConfig?.color || "bg-golden-rune/20 text-golden-rune"}>
                    {entryConfig?.label || entry.entryType}
                  </Badge>
                  <div className="flex items-center text-silver-star/60 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <h1 className="font-gothic text-4xl md:text-5xl font-semibold text-golden-rune mb-4" data-testid="entry-title">
                  {entry.title}
                </h1>

                {/* Metadata */}
                <div className="flex flex-wrap gap-4 text-sm text-silver-star/80">
                  {entry.moonPhase && (
                    <div className="flex items-center">
                      <Moon className="w-4 h-4 mr-1" />
                      {entry.moonPhase.replace('_', ' ')}
                    </div>
                  )}
                  {entry.astrologicalSign && (
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      {entry.astrologicalSign}
                    </div>
                  )}
                  {entry.mood && (
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {entry.mood}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-golden-rune/50 text-golden-rune hover:bg-golden-rune/10"
                  data-testid="button-edit-entry"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                      data-testid="button-delete-entry"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-black/90 border-golden-rune/50">
                    <DialogHeader>
                      <DialogTitle className="text-golden-rune">Delete Sacred Entry</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-silver-star mb-6">
                        Are you sure you want to delete "{entry.title}"? This action cannot be undone.
                      </p>
                      <div className="flex justify-end gap-3">
                        <Button variant="outline" className="border-silver-star/30 text-silver-star">
                          Cancel
                        </Button>
                        <Button
                          onClick={() => deleteMutation.mutate(entry.id)}
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
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Card className="mystical-border bg-black/60 border-golden-rune/30 mb-8">
              <CardHeader>
                <CardTitle className="font-gothic text-2xl text-golden-rune">Sacred Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <div className="text-ethereal-white/90 leading-relaxed whitespace-pre-wrap text-lg" data-testid="entry-content">
                    {entry.content}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            {entry.tags && entry.tags.length > 0 && (
              <Card className="mystical-border bg-black/60 border-golden-rune/30">
                <CardHeader>
                  <CardTitle className="font-gothic text-xl text-golden-rune flex items-center">
                    <Tags className="w-5 h-5 mr-2" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="bg-golden-rune/20 text-golden-rune border-golden-rune/50"
                        data-testid={`tag-${index}`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}