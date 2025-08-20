import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import backgroundImage from "@assets/background_1755498699765.webp";

export default function AthenaeumLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple admin credential check
    if (email === "beca@jakintzaruha.com" && password === "Raquel8388$$") {
      // Store admin session
      localStorage.setItem("athenaeum_admin", "true");
      localStorage.setItem("admin_email", email);
      
      toast({
        title: "Sacred Access Granted",
        description: "Welcome to the Athenaeum, Sacred Administrator.",
        duration: 5000,
      });
      
      // Redirect to Athenaeum
      setTimeout(() => {
        setLocation("/athenaeum");
      }, 1000);
    } else {
      toast({
        title: "Access Denied",
        description: "The cosmic guardians do not recognize these credentials.",
        variant: "destructive",
        duration: 5000,
      });
    }
    
    setIsLoading(false);
  };

  return (
    <section 
      className="min-h-screen text-ethereal-white flex items-center justify-center" 
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/80"></div>
      
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <Link 
          href="/"
          className="inline-flex items-center text-golden-rune hover:text-silver-star transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-[-2px] transition-transform" />
          ← Back to Sacred Remembering
        </Link>
      </nav>

      <div className="relative z-10 w-full max-w-md px-6">
        <motion.div
          {...fadeInUp}
          className="mystical-border p-8 rounded-lg grimoire-texture text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-golden-rune to-cosmic-blue rounded-full flex items-center justify-center">
            <Lock className="w-10 h-10 text-void-black" />
          </div>
          
          <h1 className="font-gothic text-3xl text-golden-rune mb-4">
            Sacred Gateway
          </h1>
          
          <p className="text-silver-star/90 mb-8">
            Enter your sacred credentials to access the Athenaeum's inner sanctum.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-silver-star/60" />
              <Input
                type="email"
                placeholder="Sacred email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-silver-star/60" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Sacred password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-silver-star/60 hover:text-golden-rune transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-golden-rune to-cosmic-blue hover:from-golden-rune/90 hover:to-cosmic-blue/90 text-void-black font-semibold py-3 transition-all duration-500 hover:scale-105"
            >
              {isLoading ? "Seeking Permission..." : "Enter the Athenaeum"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-golden-rune/10 border border-golden-rune/30 rounded-lg">
            <p className="text-golden-rune text-sm font-semibold">
              🔮 Admin Access Only
            </p>
            <p className="text-silver-star/70 text-xs mt-1">
              This portal is reserved for the sacred administrator to oversee the cosmic library-school.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}