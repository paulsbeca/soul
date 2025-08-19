import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation, useRoute } from "wouter";
import { ArrowLeft, Save, Moon, Sun, Sparkles, Eye, Calendar, Tags, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import mysticalChamberBg from "@assets/ChatGPT Image Aug 18, 2025, 12_54_24 AM_1755531868254.webp";
import { insertGrimoireEntrySchema, type Grimoire } from "@shared/schema";

const entryTypeConfig = {
  spell: { label: "Spell", icon: Sparkles, description: "Magical workings and enchantments" },
  ritual: { label: "Ritual", icon: Sun, description: "Ceremonial practices and rites" },
  meditation: { label: "Meditation", icon: Eye, description: "Inner contemplation and mindfulness" },
  reflection: { label: "Reflection", icon: BookOpen, description: "Personal insights and thoughts" },
  dream: { label: "Dream", icon: Moon, description: "Dream journals and interpretation" },
  divination: { label: "Divination", icon: Calendar, description: "Oracle readings and prophecy" },
  herbal: { label: "Herbal", icon: Sun, description: "Plant medicine and herbalism" },
  crystal: { label: "Crystal", icon: Sparkles, description: "Crystal healing and energy work" },
  astrology: { label: "Astrology", icon: Moon, description: "Celestial wisdom and star knowledge" }
};

const moonPhases = [
  "New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous",
  "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"
];

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const moods = [
  "Peaceful", "Energetic", "Contemplative", "Joyful", "Mystical", 
  "Focused", "Emotional", "Spiritual", "Curious", "Transformative"
];

const createEntrySchema = insertGrimoireEntrySchema.extend({
  tags: z.array(z.string()).optional(),
});

export default function CreateEntry() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/grimoires/:grimoireId/create-entry");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [tagInput, setTagInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const grimoireId = params?.grimoireId;

  const { data: grimoire } = useQuery<Grimoire>({
    queryKey: ["/api/grimoires", grimoireId],
    enabled: !!grimoireId
  });

  const form = useForm<z.infer<typeof createEntrySchema>>({
    resolver: zodResolver(createEntrySchema),
    defaultValues: {
      grimoireId: grimoireId || "",
      title: "",
      content: "",
      entryType: "reflection",
      tags: [],
      mood: "",
      moonPhase: "",
      astrologicalSign: ""
    }
  });

  useEffect(() => {
    if (grimoireId) {
      form.setValue("grimoireId", grimoireId);
    }
  }, [grimoireId, form]);

  const createEntryMutation = useMutation({
    mutationFn: async (data: z.infer<typeof createEntrySchema>) => {
      return apiRequest("/api/grimoire-entries", {
        method: "POST",
        body: JSON.stringify({ ...data, tags: selectedTags })
      });
    },
    onSuccess: () => {
      toast({
        title: "Entry Created",
        description: "Your grimoire entry has been successfully saved."
      });
      queryClient.invalidateQueries({ queryKey: ["/api/grimoire-entries", grimoireId] });
      setLocation(`/grimoires/${grimoireId}`);
    },
    onError: () => {
      toast({
        title: "Save Failed",
        description: "Failed to save entry. Please try again.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = async (data: z.infer<typeof createEntrySchema>) => {
    createEntryMutation.mutate(data);
  };

  const addTag = () => {
    if (tagInput.trim() && !selectedTags.includes(tagInput.trim())) {
      setSelectedTags([...selectedTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" }
  };

  if (!match || !grimoireId) {
    return <div>Invalid grimoire</div>;
  }

  return (
    <section 
      className="min-h-screen text-ethereal-white" 
      style={{
        backgroundImage: `url(${mysticalChamberBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      data-testid="create-entry-section"
    >
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <motion.div {...fadeInUp} className="mb-8">
            <Link href={`/grimoires/${grimoireId}`}>
              <Button 
                variant="ghost" 
                className="text-golden-rune hover:text-silver-star transition-colors"
                data-testid="button-back"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to {grimoire?.title || "Grimoire"}
              </Button>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            {...fadeInUp}
          >
            <h1 className="font-gothic text-4xl md:text-5xl font-semibold mb-4 text-golden-rune" data-testid="create-entry-title">
              Create New Entry
            </h1>
            <p className="text-lg text-silver-star/90 leading-relaxed max-w-2xl mx-auto" data-testid="create-entry-description">
              Document your spiritual journey, magical workings, and mystical insights
            </p>
          </motion.div>

          {/* Creation Form */}
          <motion.div
            {...fadeInUp}
            className="mystical-border rounded-xl p-8 grimoire-texture"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Entry Type Selection */}
                <FormField
                  control={form.control}
                  name="entryType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-golden-rune text-lg font-semibold">
                        Entry Type
                      </FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                          {Object.entries(entryTypeConfig).map(([type, config]) => {
                            const IconComponent = config.icon;
                            const isSelected = field.value === type;
                            return (
                              <Card 
                                key={type}
                                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                                  isSelected 
                                    ? 'ring-2 ring-golden-rune bg-gradient-to-br from-deep-purple/30 to-shadow-purple/20' 
                                    : 'hover:ring-1 hover:ring-silver-star/50 bg-black/40'
                                } mystical-border`}
                                onClick={() => field.onChange(type)}
                                data-testid={`card-entry-type-${type}`}
                              >
                                <CardContent className="text-center p-4">
                                  <IconComponent className="w-6 h-6 text-golden-rune mx-auto mb-2" />
                                  <p className="text-ethereal-white text-sm font-medium">
                                    {config.label}
                                  </p>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-golden-rune text-base font-semibold">
                        Entry Title
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          placeholder="Give your entry a meaningful title..."
                          className="bg-black/50 border-silver-star/30 text-ethereal-white placeholder:text-silver-star/60 focus:ring-golden-rune focus:border-golden-rune"
                          data-testid="input-entry-title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Content */}
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-golden-rune text-base font-semibold">
                        Entry Content
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field}
                          placeholder="Write your entry here... Document your experiences, insights, rituals, or magical workings..."
                          rows={12}
                          className="bg-black/50 border-silver-star/30 text-ethereal-white placeholder:text-silver-star/60 focus:ring-golden-rune focus:border-golden-rune resize-none font-mono"
                          data-testid="textarea-entry-content"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Metadata Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Mood */}
                  <FormField
                    control={form.control}
                    name="mood"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-golden-rune text-sm font-semibold">
                          Current Mood
                        </FormLabel>
                        <FormControl>
                          <Select value={field.value || ""} onValueChange={field.onChange}>
                            <SelectTrigger 
                              className="bg-black/50 border-silver-star/30 text-ethereal-white focus:ring-golden-rune focus:border-golden-rune"
                              data-testid="select-mood"
                            >
                              <SelectValue placeholder="Select mood" />
                            </SelectTrigger>
                            <SelectContent className="bg-void-black border-silver-star/50">
                              {moods.map((mood) => (
                                <SelectItem 
                                  key={mood} 
                                  value={mood}
                                  className="text-ethereal-white hover:bg-deep-purple/30"
                                >
                                  {mood}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Moon Phase */}
                  <FormField
                    control={form.control}
                    name="moonPhase"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-golden-rune text-sm font-semibold">
                          Moon Phase
                        </FormLabel>
                        <FormControl>
                          <Select value={field.value || ""} onValueChange={field.onChange}>
                            <SelectTrigger 
                              className="bg-black/50 border-silver-star/30 text-ethereal-white focus:ring-golden-rune focus:border-golden-rune"
                              data-testid="select-moon-phase"
                            >
                              <SelectValue placeholder="Select phase" />
                            </SelectTrigger>
                            <SelectContent className="bg-void-black border-silver-star/50">
                              {moonPhases.map((phase) => (
                                <SelectItem 
                                  key={phase} 
                                  value={phase}
                                  className="text-ethereal-white hover:bg-deep-purple/30"
                                >
                                  {phase}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Astrological Sign */}
                  <FormField
                    control={form.control}
                    name="astrologicalSign"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-golden-rune text-sm font-semibold">
                          Current Sign
                        </FormLabel>
                        <FormControl>
                          <Select value={field.value || ""} onValueChange={field.onChange}>
                            <SelectTrigger 
                              className="bg-black/50 border-silver-star/30 text-ethereal-white focus:ring-golden-rune focus:border-golden-rune"
                              data-testid="select-astrological-sign"
                            >
                              <SelectValue placeholder="Select sign" />
                            </SelectTrigger>
                            <SelectContent className="bg-void-black border-silver-star/50">
                              {zodiacSigns.map((sign) => (
                                <SelectItem 
                                  key={sign} 
                                  value={sign}
                                  className="text-ethereal-white hover:bg-deep-purple/30"
                                >
                                  {sign}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Tags */}
                <div className="space-y-3">
                  <label className="text-golden-rune text-base font-semibold">
                    Tags
                  </label>
                  <div className="flex gap-2">
                    <Input 
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add tags to organize your entry..."
                      className="bg-black/50 border-silver-star/30 text-ethereal-white placeholder:text-silver-star/60 focus:ring-golden-rune focus:border-golden-rune"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      data-testid="input-tag"
                    />
                    <Button 
                      type="button" 
                      onClick={addTag}
                      variant="outline"
                      className="border-silver-star/50 text-silver-star hover:bg-silver-star/10"
                      data-testid="button-add-tag"
                    >
                      <Tags className="w-4 h-4" />
                    </Button>
                  </div>
                  {selectedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary"
                          className="bg-deep-purple/30 text-silver-star hover:bg-deep-purple/50 cursor-pointer"
                          onClick={() => removeTag(tag)}
                          data-testid={`tag-${tag}`}
                        >
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6">
                  <Button
                    type="submit"
                    disabled={createEntryMutation.isPending}
                    className="bg-gradient-to-r from-golden-rune to-cosmic-blue hover:from-golden-rune/90 hover:to-cosmic-blue/90 text-void-black font-semibold px-8 py-2"
                    data-testid="button-save-entry"
                  >
                    <Save className="mr-2 w-4 h-4" />
                    {createEntryMutation.isPending ? "Saving..." : "Save Entry"}
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}