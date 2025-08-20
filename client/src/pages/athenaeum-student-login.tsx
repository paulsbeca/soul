import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Lock, Mail, Eye, EyeOff, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import backgroundImage from "@assets/background_1755498699765.webp";

export default function AthenaeumStudentLogin() {
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
      // Call the auth API for students/teachers
      const response = await apiRequest("POST", "/api/auth/login", {
        email,
        password
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store user session
        localStorage.setItem("athenaeum_user", "true");
        localStorage.setItem("user_email", email);
        localStorage.setItem("user_role", data.role || "student");
        localStorage.setItem("user_name", data.name || "");
        
        toast({
          title: "Sacred Portal Opened",
          description: `Welcome to the Athenaeum, ${data.role === 'instructor' ? 'Esteemed Teacher' : 'Dear Student'}.`,
          duration: 5000,
        });
        
        // Redirect to full Athenaeum based on role
        setTimeout(() => {
          if (data.role === 'instructor') {
            setLocation("/athenaeum/instructor");
          } else {
            setLocation("/athenaeum/student");
          }
        }, 1000);
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      toast({
        title: "Access Denied",
        description: "The mystical guardians do not recognize these credentials. Please check your email and password.",
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
          href="/athenaeum"
          className="inline-flex items-center text-golden-rune hover:text-silver-star transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-[-2px] transition-transform" />
          ← Back to Athenaeum
        </Link>
      </nav>

      <div className="relative z-10 w-full max-w-md px-6">
        <motion.div
          {...fadeInUp}
          className="mystical-border p-8 rounded-lg grimoire-texture text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-mystical-400 to-ethereal-400 rounded-full flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-void-black" />
          </div>
          
          <h1 className="font-gothic text-3xl text-golden-rune mb-4">
            Athenaeum Portal
          </h1>
          
          <p className="text-silver-star/90 mb-8">
            Enter your sacred credentials to access your mystical learning journey.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-silver-star/60" />
              <Input
                type="email"
                placeholder="Student or teacher email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-mystical-600/30 border border-ethereal-400/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-ethereal-400 focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-silver-star/60" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-mystical-600/30 border border-ethereal-400/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-ethereal-400 focus:outline-none transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-silver-star/60 hover:text-ethereal-400 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-mystical-500 to-ethereal-500 hover:from-mystical-400 hover:to-ethereal-400 text-void-black font-semibold py-3 transition-all duration-500 hover:scale-105 relative z-50"
              style={{ pointerEvents: 'auto' }}
            >
              {isLoading ? "Seeking Permission..." : "Enter the Athenaeum"}
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="p-4 bg-mystical-500/10 border border-mystical-400/30 rounded-lg">
              <p className="text-mystical-400 text-sm font-semibold flex items-center justify-center">
                <GraduationCap className="w-4 h-4 mr-2" />
                Students & Teachers
              </p>
              <p className="text-silver-star/70 text-xs mt-1">
                Access your courses, progress, and mystical learning materials.
              </p>
            </div>
            
            <div className="text-center">
              <Link
                href="/athenaeum/register"
                className="text-ethereal-400 hover:text-golden-rune text-sm transition-colors"
              >
                Don't have an account? Request enrollment →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}