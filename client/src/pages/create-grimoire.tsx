import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Book, BookOpen, Star, Circle, ArrowLeft, Wand2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import mysticalChamberBg from "@assets/ChatGPT Image Aug 18, 2025, 12_54_24 AM_1755531868254.webp";
import { insertGrimoireSchema, type InsertGrimoire } from "@shared/schema";
import { z } from "zod";

const createGrimoireSchema = insertGrimoireSchema.extend({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  type: z.enum(["shadows", "mirrors", "stars"], { required_error: "Please select a grimoire type" }),
  description: z.string().optional(),
  isPublic: z.string().optional(),
});

const grimoireTypeConfig = {
  shadows: {
    icon: Book,
    label: "Book of Shadows",
    description: "Record spells, rituals, magical workings, and sacred practices",
    color: "from-deep-purple to-shadow-purple",
    example: "Document your moon rituals, herb correspondences, and spell results",
  },
  mirrors: {
    icon: Circle,
    label: "Book of Mirrors", 
    description: "Explore self-reflection, dreams, shadow work, and inner transformation",
    color: "from-silver-star/20 to-ethereal-white/10",
    example: "Journal your dreams, meditation insights, and personal growth",
  },
  stars: {
    icon: Star,
    label: "Book of Stars",
    description: "Track astrology, divination, cosmic cycles, and celestial wisdom",
    color: "from-golden-rune/30 to-cosmic-blue/20",
    example: "Record tarot readings, birth chart insights, and planetary transits",
  },
};

export default function CreateGrimoire() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get type from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const typeFromUrl = urlParams.get('type') as keyof typeof grimoireTypeConfig | null;

  const form = useForm<z.infer<typeof createGrimoireSchema>>({
    resolver: zodResolver(createGrimoireSchema),
    defaultValues: {
      title: "",
      type: typeFromUrl || undefined,
      description: "",
      isPublic: "false",
    },
  });

  const selectedType = form.watch('type');
  const selectedConfig = selectedType ? grimoireTypeConfig[selectedType] : null;

  const createMutation = useMutation({
    mutationFn: async (data: InsertGrimoire) => {
      const response = await apiRequest("POST", "/api/grimoires", data);
      return response.json();
    },
    onSuccess: (result: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/grimoires"] });
      toast({
        title: "Grimoire Created",
        description: "Your sacred book has been created successfully",
      });
      setLocation(`/grimoires/${result.id}`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create grimoire. Please try again.",
        variant: "destructive",
      });
      console.error("Create grimoire error:", error);
    },
  });

  const onSubmit = (data: z.infer<typeof createGrimoireSchema>) => {
    createMutation.mutate(data);
  };

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
      data-testid="create-grimoire-section"
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
              onClick={() => setLocation("/grimoires")}
              className="mb-6 text-silver-star hover:text-golden-rune"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Grimoires
            </Button>
            
            <h1 className="font-gothic text-4xl md:text-5xl font-semibold mb-4 text-golden-rune" data-testid="create-title">
              Create Sacred Grimoire
            </h1>
            <p className="text-xl text-silver-star/90 leading-relaxed" data-testid="create-description">
              Begin your journey of mystical documentation and spiritual practice
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
                  Choose your path and personalize your mystical practice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Grimoire Type Selection */}
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-golden-rune font-gothic text-lg">Grimoire Type</FormLabel>
                          <FormDescription className="text-silver-star/80">
                            Choose the nature of your sacred practice
                          </FormDescription>
                          <div className="grid md:grid-cols-3 gap-4 mt-4">
                            {Object.entries(grimoireTypeConfig).map(([type, config]) => {
                              const IconComponent = config.icon;
                              const isSelected = field.value === type;
                              
                              return (
                                <motion.div
                                  key={type}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Card 
                                    className={`cursor-pointer transition-all ${
                                      isSelected 
                                        ? 'mystical-border bg-gradient-to-br from-golden-rune/10 to-shadow-purple/20 border-golden-rune' 
                                        : 'border-silver-star/30 hover:border-golden-rune/50'
                                    }`}
                                    onClick={() => field.onChange(type)}
                                    data-testid={`select-type-${type}`}
                                  >
                                    <CardContent className="p-6 text-center">
                                      <IconComponent className={`w-8 h-8 mx-auto mb-3 ${isSelected ? 'text-golden-rune' : 'text-silver-star'}`} />
                                      <h3 className={`font-gothic text-lg font-semibold mb-2 ${isSelected ? 'text-golden-rune' : 'text-ethereal-white'}`}>
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Selected Type Details */}
                    {selectedConfig && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.5 }}
                        className="p-4 rounded-lg mystical-border bg-gradient-to-r from-shadow-purple/20 to-deep-purple/20"
                      >
                        <div className="flex items-center mb-2">
                          <selectedConfig.icon className="w-5 h-5 mr-2 text-golden-rune" />
                          <h4 className="font-gothic text-golden-rune">You've chosen: {selectedConfig.label}</h4>
                        </div>
                        <p className="text-silver-star/90 text-sm">{selectedConfig.example}</p>
                      </motion.div>
                    )}

                    {/* Title */}
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-golden-rune font-gothic text-lg">Sacred Title</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="My Book of Shadows"
                              className="bg-black/40 border-silver-star/30 text-ethereal-white"
                              data-testid="input-title"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className="text-silver-star/80">
                            Give your grimoire a meaningful name
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-golden-rune font-gothic text-lg">Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="A sacred space for my magical practices and spiritual journey..."
                              className="bg-black/40 border-silver-star/30 text-ethereal-white min-h-[100px]"
                              data-testid="input-description"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className="text-silver-star/80">
                            Describe the purpose and intention of this grimoire
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Privacy Setting */}
                    <FormField
                      control={form.control}
                      name="isPublic"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between p-4 rounded-lg mystical-border bg-gradient-to-r from-shadow-purple/10 to-deep-purple/10">
                          <div>
                            <FormLabel className="text-golden-rune font-gothic text-lg">Make Public</FormLabel>
                            <FormDescription className="text-silver-star/80 mt-1">
                              Allow others to discover and read your grimoire
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value === "true"}
                              onCheckedChange={(checked) => field.onChange(checked ? "true" : "false")}
                              data-testid="switch-public"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <div className="pt-6">
                      <Button
                        type="submit"
                        disabled={createMutation.isPending}
                        className="w-full bg-gradient-to-r from-shadow-purple to-deep-purple hover:scale-105 transition-transform font-gothic text-lg py-6"
                        data-testid="button-create"
                      >
                        {createMutation.isPending ? (
                          <>
                            <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                            Creating Sacred Space...
                          </>
                        ) : (
                          <>
                            <Wand2 className="w-5 h-5 mr-2" />
                            Create My Grimoire
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