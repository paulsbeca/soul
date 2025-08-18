import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Wand2, Moon, Star, Sparkles, Eye, Calendar, Tags, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import mysticalChamberBg from "@assets/ChatGPT Image Aug 18, 2025, 12_54_24 AM_1755531868254.webp";
import { insertGrimoireEntrySchema, type InsertGrimoireEntry, type Grimoire } from "@shared/schema";
import { z } from "zod";

const createEntrySchema = insertGrimoireEntrySchema.extend({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  content: z.string().min(1, "Content is required"),
  entryType: z.enum(["spell", "ritual", "meditation", "reflection", "dream", "divination", "herbal", "crystal", "astrology"], 
    { required_error: "Please select an entry type" }),
  tags: z.string().optional(),
  mood: z.string().optional(),
  moonPhase: z.enum(["new", "waxing_crescent", "first_quarter", "waxing_gibbous", "full", "waning_gibbous", "third_quarter", "waning_crescent"]).optional(),
  astrologicalSign: z.enum(["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"]).optional(),
});

const entryTypes = [
  { value: "spell", label: "Spell", description: "Magical workings and spellcraft", icon: Sparkles },
  { value: "ritual", label: "Ritual", description: "Sacred ceremonies and rites", icon: Moon },
  { value: "meditation", label: "Meditation", description: "Mindfulness and spiritual practice", icon: Eye },
  { value: "reflection", label: "Reflection", description: "Personal insights and thoughts", icon: Heart },
  { value: "dream", label: "Dream", description: "Dream work and interpretations", icon: Moon },
  { value: "divination", label: "Divination", description: "Tarot, oracle, and other readings", icon: Star },
  { value: "herbal", label: "Herbal", description: "Plant medicine and herbalism", icon: Sparkles },
  { value: "crystal", label: "Crystal", description: "Crystal healing and properties", icon: Sparkles },
  { value: "astrology", label: "Astrology", description: "Planetary influences and charts", icon: Star },
];

const moonPhases = [
  { value: "new", label: "New Moon" },
  { value: "waxing_crescent", label: "Waxing Crescent" },
  { value: "first_quarter", label: "First Quarter" },
  { value: "waxing_gibbous", label: "Waxing Gibbous" },
  { value: "full", label: "Full Moon" },
  { value: "waning_gibbous", label: "Waning Gibbous" },
  { value: "third_quarter", label: "Third Quarter" },
  { value: "waning_crescent", label: "Waning Crescent" },
];

const astrologicalSigns = [
  { value: "aries", label: "Aries" },
  { value: "taurus", label: "Taurus" },
  { value: "gemini", label: "Gemini" },
  { value: "cancer", label: "Cancer" },
  { value: "leo", label: "Leo" },
  { value: "virgo", label: "Virgo" },
  { value: "libra", label: "Libra" },
  { value: "scorpio", label: "Scorpio" },
  { value: "sagittarius", label: "Sagittarius" },
  { value: "capricorn", label: "Capricorn" },
  { value: "aquarius", label: "Aquarius" },
  { value: "pisces", label: "Pisces" },
];

export default function CreateEntry() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: grimoire } = useQuery<Grimoire>({
    queryKey: ["/api/grimoires", params.id],
  });

  const form = useForm<z.infer<typeof createEntrySchema>>({
    resolver: zodResolver(createEntrySchema),
    defaultValues: {
      title: "",
      content: "",
      entryType: undefined,
      tags: "",
      mood: "",
      moonPhase: undefined,
      astrologicalSign: undefined,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertGrimoireEntry) => {
      const response = await apiRequest("POST", `/api/grimoires/${params.id}/entries`, data);
      return response.json();
    },
    onSuccess: (result: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/grimoires", params.id, "entries"] });
      toast({
        title: "Entry Created",
        description: "Your sacred entry has been added to the grimoire",
      });
      setLocation(`/grimoires/${params.id}/entries/${result.id}`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create entry. Please try again.",
        variant: "destructive",
      });
      console.error("Create entry error:", error);
    },
  });

  const onSubmit = (data: z.infer<typeof createEntrySchema>) => {
    const entryData: InsertGrimoireEntry = {
      grimoireId: params.id!,
      title: data.title,
      content: data.content,
      entryType: data.entryType,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : null,
      mood: data.mood || null,
      moonPhase: data.moonPhase || null,
      astrologicalSign: data.astrologicalSign || null,
    };

    createMutation.mutate(entryData);
  };

  const selectedType = form.watch('entryType');
  const selectedTypeConfig = entryTypes.find(type => type.value === selectedType);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" }
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
      data-testid="create-entry-section"
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
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
            
            <h1 className="font-gothic text-4xl md:text-5xl font-semibold mb-4 text-golden-rune" data-testid="create-entry-title">
              Create Sacred Entry
            </h1>
            <p className="text-xl text-silver-star/90 leading-relaxed" data-testid="create-entry-description">
              Document your spiritual practice and mystical experiences
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Card className="mystical-border bg-black/60 border-golden-rune/50">
              <CardHeader>
                <CardTitle className="font-gothic text-2xl text-golden-rune flex items-center">
                  <Wand2 className="w-6 h-6 mr-2" />
                  Sacred Details
                </CardTitle>
                <CardDescription className="text-silver-star/90">
                  Choose your entry type and document your spiritual experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Entry Type Selection */}
                    <FormField
                      control={form.control}
                      name="entryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-golden-rune font-gothic text-lg">Entry Type</FormLabel>
                          <FormDescription className="text-silver-star/80">
                            What kind of spiritual practice are you documenting?
                          </FormDescription>
                          <div className="grid md:grid-cols-3 gap-3 mt-4">
                            {entryTypes.map((type) => {
                              const IconComponent = type.icon;
                              const isSelected = field.value === type.value;
                              
                              return (
                                <motion.div
                                  key={type.value}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Card 
                                    className={`cursor-pointer transition-all p-4 ${
                                      isSelected 
                                        ? 'mystical-border bg-gradient-to-br from-golden-rune/10 to-shadow-purple/20 border-golden-rune' 
                                        : 'border-silver-star/30 hover:border-golden-rune/50'
                                    }`}
                                    onClick={() => field.onChange(type.value)}
                                    data-testid={`select-type-${type.value}`}
                                  >
                                    <div className="text-center">
                                      <IconComponent className={`w-6 h-6 mx-auto mb-2 ${isSelected ? 'text-golden-rune' : 'text-silver-star'}`} />
                                      <h4 className={`font-gothic text-sm font-semibold mb-1 ${isSelected ? 'text-golden-rune' : 'text-ethereal-white'}`}>
                                        {type.label}
                                      </h4>
                                      <p className="text-xs text-silver-star/80 leading-tight">
                                        {type.description}
                                      </p>
                                    </div>
                                  </Card>
                                </motion.div>
                              );
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Selected Type Details */}
                    {selectedTypeConfig && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.5 }}
                        className="p-4 rounded-lg mystical-border bg-gradient-to-r from-shadow-purple/20 to-deep-purple/20"
                      >
                        <div className="flex items-center mb-2">
                          <selectedTypeConfig.icon className="w-5 h-5 mr-2 text-golden-rune" />
                          <h4 className="font-gothic text-golden-rune">You're creating: {selectedTypeConfig.label}</h4>
                        </div>
                        <p className="text-silver-star/90 text-sm">{selectedTypeConfig.description}</p>
                      </motion.div>
                    )}

                    {/* Title */}
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-golden-rune font-gothic text-lg">Entry Title</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Full Moon Manifestation Ritual"
                              className="bg-black/40 border-silver-star/30 text-ethereal-white"
                              data-testid="input-title"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className="text-silver-star/80">
                            Give your entry a meaningful title
                          </FormDescription>
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
                          <FormLabel className="text-golden-rune font-gothic text-lg">Sacred Content</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Document your spiritual experience, insights, ritual steps, or magical workings..."
                              className="bg-black/40 border-silver-star/30 text-ethereal-white min-h-[200px]"
                              data-testid="input-content"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className="text-silver-star/80">
                            Share your spiritual practice, insights, and experiences
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Metadata Section */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Tags */}
                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-golden-rune font-gothic flex items-center">
                              <Tags className="w-4 h-4 mr-2" />
                              Tags (Optional)
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="manifestation, full moon, crystals"
                                className="bg-black/40 border-silver-star/30 text-ethereal-white"
                                data-testid="input-tags"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription className="text-silver-star/80">
                              Separate tags with commas
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Mood */}
                      <FormField
                        control={form.control}
                        name="mood"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-golden-rune font-gothic flex items-center">
                              <Heart className="w-4 h-4 mr-2" />
                              Mood (Optional)
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="peaceful, energized, reflective"
                                className="bg-black/40 border-silver-star/30 text-ethereal-white"
                                data-testid="input-mood"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription className="text-silver-star/80">
                              How were you feeling during this practice?
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Moon Phase */}
                      <FormField
                        control={form.control}
                        name="moonPhase"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-golden-rune font-gothic flex items-center">
                              <Moon className="w-4 h-4 mr-2" />
                              Moon Phase (Optional)
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-black/40 border-silver-star/30 text-ethereal-white" data-testid="select-moon-phase">
                                  <SelectValue placeholder="Select moon phase" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-black/90 border-golden-rune/50">
                                {moonPhases.map((phase) => (
                                  <SelectItem key={phase.value} value={phase.value} className="text-ethereal-white">
                                    {phase.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-silver-star/80">
                              The lunar energy during your practice
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Astrological Sign */}
                      <FormField
                        control={form.control}
                        name="astrologicalSign"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-golden-rune font-gothic flex items-center">
                              <Star className="w-4 h-4 mr-2" />
                              Astrological Influence (Optional)
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-black/40 border-silver-star/30 text-ethereal-white" data-testid="select-astro-sign">
                                  <SelectValue placeholder="Select astrological sign" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-black/90 border-golden-rune/50">
                                {astrologicalSigns.map((sign) => (
                                  <SelectItem key={sign.value} value={sign.value} className="text-ethereal-white">
                                    {sign.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-silver-star/80">
                              Current astrological influence or your sign
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <Button
                        type="submit"
                        disabled={createMutation.isPending}
                        className="w-full bg-gradient-to-r from-shadow-purple to-deep-purple hover:scale-105 transition-transform font-gothic text-lg py-6"
                        data-testid="button-create-entry"
                      >
                        {createMutation.isPending ? (
                          <>
                            <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                            Creating Sacred Entry...
                          </>
                        ) : (
                          <>
                            <Wand2 className="w-5 h-5 mr-2" />
                            Create Entry
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}