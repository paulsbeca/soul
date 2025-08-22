import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import backgroundImage from "@assets/background_1755498699765.webp";
import athenaeumCrest from "@assets/athenaeum_crest_transparent_1755842285928.webp";

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

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        
        // Store user session
        localStorage.setItem("athenaeum_user", JSON.stringify(user));
        
        let redirectPath = "/athenaeum";
        let welcomeMessage = "Welcome to the Athenaeum";
        
        if (user.role === "admin") {
          redirectPath = "/admin";
          welcomeMessage = "Welcome to the Athenaeum, Sacred Administrator";
        } else if (user.role === "teacher") {
          redirectPath = "/athenaeum/teacher";
          welcomeMessage = `Welcome, Professor ${user.fullName}`;
        } else if (user.role === "student") {
          redirectPath = "/athenaeum/student";
          welcomeMessage = `Welcome, seeker ${user.fullName}`;
        }
        
        toast({
          title: "Sacred Access Granted",
          description: welcomeMessage,
          duration: 5000,
        });
        
        // Redirect based on role
        setTimeout(() => {
          setLocation(redirectPath);
        }, 1000);
      } else {
        const error = await response.text();
        toast({
          title: "Access Denied",
          description: "The cosmic guardians do not recognize these credentials.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Mystical Interference",
        description: "The cosmic connection was interrupted. Please try again.",
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
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <img 
              src={athenaeumCrest} 
              alt="Athenaeum Sacred Crest"
              className="w-full h-full object-contain"
            />
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
              className="w-full bg-gradient-to-r from-golden-rune to-cosmic-blue hover:from-golden-rune/90 hover:to-cosmic-blue/90 text-void-black font-semibold py-3 transition-all duration-500 hover:scale-105 relative z-50"
              style={{ pointerEvents: 'auto' }}
            >
              {isLoading ? "Seeking Permission..." : "Enter the Athenaeum"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-golden-rune/10 border border-golden-rune/30 rounded-lg">
            <p className="text-golden-rune text-sm font-semibold">
              🌟 Test Accounts Available
            </p>
            <div className="text-silver-star/70 text-xs mt-1 space-y-1">
              <div><strong>Student:</strong> luna@mysticalstudent.com / StarSeeker2024</div>
              <div><strong>Teacher:</strong> sage@athenaeumteacher.com / WisdomKeeper2024</div>
              <div><strong>Admin:</strong> beca@jakintzaruha.com / Raquel8388$$</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}