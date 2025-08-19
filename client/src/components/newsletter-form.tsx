import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter/subscribe", { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Sacred! ✨",
        description: "You've joined the remembering. Check your email for cosmic wisdom.",
        duration: 5000,
      });
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Mystical Interference",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your sacred email address.",
        variant: "destructive",
      });
      return;
    }
    subscribeMutation.mutate(email);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="mystical-border p-8 rounded-lg grimoire-texture space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      data-testid="newsletter-form"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          type="email"
          placeholder="Your sacred email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-cosmic-dark/50 border border-golden-rune/30 rounded-lg px-6 py-4 text-ethereal-white placeholder-silver-star/60 focus:border-golden-rune focus:outline-none transition-colors"
          required
          data-testid="input-email"
        />
        <Button
          type="submit"
          disabled={subscribeMutation.isPending}
          className="bg-gradient-to-r from-shadow-purple to-deep-purple hover:from-deep-purple hover:to-shadow-purple px-8 py-4 rounded-lg font-gothic font-medium transition-all duration-500 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="button-subscribe"
        >
          {subscribeMutation.isPending ? "Sending..." : "Begin Remembering"}
        </Button>
      </div>
      <p className="text-sm text-silver-star/70" data-testid="email-info">
        Your energy will be sent to <span className="text-golden-rune">info@jakintzaruha.com</span>
      </p>
    </motion.form>
  );
}
