import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Book, Circle, Star, Save, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import mysticalChamberBg from "@assets/ChatGPT Image Aug 18, 2025, 12_54_24 AM_1755531868254.webp";
import { insertGrimoireSchema } from "@shared/schema";

const createGrimoireSchema = insertGrimoireSchema.extend({
  type: z.enum(["shadows", "mirrors", "stars"], {
    required_error: "Please select a grimoire type"
  })
});

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

export default function CreateGrimoire() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedType, setSelectedType] = useState<string>("");
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");

  const form = useForm<z.infer<typeof createGrimoireSchema>>({
    resolver: zodResolver(createGrimoireSchema),
    defaultValues: {
      title: "",
      type: "shadows" as const,
      description: "",
      coverImage: "",
      isPublic: "false" as const
    }
  });

  const createGrimoireMutation = useMutation({
    mutationFn: async (data: z.infer<typeof createGrimoireSchema>) => {
      const response = await apiRequest("POST", "/api/grimoires", { ...data, coverImage: coverImageUrl });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Grimoire Created",
        description: "Your sacred grimoire has been successfully created."
      });
      queryClient.invalidateQueries({ queryKey: ["/api/grimoires"] });
      setLocation("/grimoires");
    },
    onError: () => {
      toast({
        title: "Creation Failed",
        description: "Failed to create grimoire. Please try again.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = async (data: z.infer<typeof createGrimoireSchema>) => {
    createGrimoireMutation.mutate(data);
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
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 py-20" style={{ pointerEvents: 'auto' }}>
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <motion.div {...fadeInUp} className="mb-8">
            <Link href="/grimoires">
              <Button 
                variant="ghost" 
                className="text-golden-rune hover:text-silver-star transition-colors"
                data-testid="button-back"
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
            <h1 className="font-gothic text-4xl md:text-5xl font-semibold mb-4 text-golden-rune" data-testid="create-grimoire-title">
              Create Sacred Grimoire
            </h1>
            <p className="text-lg text-silver-star/90 leading-relaxed max-w-2xl mx-auto" data-testid="create-grimoire-description">
              Begin your journey of mystical documentation. Choose your path and create your first sacred book.
            </p>
          </motion.div>

          {/* Creation Form */}
          <motion.div
            {...fadeInUp}
            className="mystical-border rounded-xl p-8 grimoire-texture relative z-20"
            style={{ pointerEvents: 'auto' }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Grimoire Type Selection */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-golden-rune text-lg font-semibold">
                        Choose Your Path
                      </FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          {Object.entries(grimoireTypeConfig).map(([type, config]) => {
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
                                onClick={() => {
                                  field.onChange(type);
                                  setSelectedType(type);
                                }}
                                data-testid={`card-grimoire-type-${type}`}
                              >
                                <CardHeader className="text-center pb-2">
                                  <div className="flex justify-center mb-2">
                                    <IconComponent className="w-8 h-8 text-golden-rune" />
                                  </div>
                                  <CardTitle className="text-ethereal-white text-lg">
                                    {config.label}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                  <p className="text-silver-star/90 text-sm">
                                    {config.description}
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
                        Grimoire Title
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          placeholder="Enter the name of your sacred grimoire..."
                          className="bg-black/50 border-silver-star/30 text-ethereal-white placeholder:text-silver-star/60 focus:ring-golden-rune focus:border-golden-rune relative z-30"
                          style={{ pointerEvents: 'auto' }}
                          data-testid="input-grimoire-title"
                        />
                      </FormControl>
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
                      <FormLabel className="text-golden-rune text-base font-semibold">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field}
                          value={field.value || ""}
                          placeholder="Describe the purpose and focus of this grimoire..."
                          rows={4}
                          className="bg-black/50 border-silver-star/30 text-ethereal-white placeholder:text-silver-star/60 focus:ring-golden-rune focus:border-golden-rune resize-none relative z-30"
                          style={{ pointerEvents: 'auto' }}
                          data-testid="textarea-grimoire-description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Cover Image URL */}
                <div className="space-y-3">
                  <label className="text-golden-rune text-base font-semibold">
                    Cover Image (Optional)
                  </label>
                  <div className="flex gap-3">
                    <Input 
                      value={coverImageUrl}
                      onChange={(e) => setCoverImageUrl(e.target.value)}
                      placeholder="Enter image URL or upload..."
                      className="bg-black/50 border-silver-star/30 text-ethereal-white placeholder:text-silver-star/60 focus:ring-golden-rune focus:border-golden-rune relative z-30"
                      style={{ pointerEvents: 'auto' }}
                      data-testid="input-cover-image"
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      className="border-silver-star/50 text-silver-star hover:bg-silver-star/10"
                      data-testid="button-upload-cover"
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                  {coverImageUrl && (
                    <div className="mt-3">
                      <img 
                        src={coverImageUrl} 
                        alt="Cover preview" 
                        className="w-32 h-48 object-cover rounded-lg border border-silver-star/30"
                        data-testid="img-cover-preview"
                      />
                    </div>
                  )}
                </div>

                {/* Privacy Settings */}
                <FormField
                  control={form.control}
                  name="isPublic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-golden-rune text-base font-semibold">
                        Visibility
                      </FormLabel>
                      <FormControl>
                        <Select value={field.value || "false"} onValueChange={field.onChange}>
                          <SelectTrigger 
                            className="bg-black/50 border-silver-star/30 text-ethereal-white focus:ring-golden-rune focus:border-golden-rune"
                            data-testid="select-visibility"
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-void-black border-silver-star/50">
                            <SelectItem value="false" className="text-ethereal-white hover:bg-deep-purple/30">
                              Private - Only visible to you
                            </SelectItem>
                            <SelectItem value="true" className="text-ethereal-white hover:bg-deep-purple/30">
                              Public - Visible to the community
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="flex justify-end pt-6">
                  <Button
                    type="submit"
                    disabled={createGrimoireMutation.isPending}
                    className="bg-gradient-to-r from-golden-rune to-cosmic-blue hover:from-golden-rune/90 hover:to-cosmic-blue/90 text-void-black font-semibold px-8 py-2"
                    data-testid="button-create-grimoire"
                  >
                    <Save className="mr-2 w-4 h-4" />
                    {createGrimoireMutation.isPending ? "Creating..." : "Create Grimoire"}
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