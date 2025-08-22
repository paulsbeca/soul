import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowLeft, BookOpen, Calendar, Star, Moon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import backgroundImage from "@assets/background_1755498699765.webp";
import athenaeumCrest from "@assets/athenaeum_crest_transparent_1755842285928.webp";

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
}

export default function AthenaeumStudent() {
  const [user, setUser] = useState<User | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem("athenaeum_user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role === "student") {
        setUser(parsedUser);
      } else {
        // Redirect non-students
        setLocation("/athenaeum/login");
      }
    } else {
      setLocation("/athenaeum/login");
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("athenaeum_user");
    setLocation("/");
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-golden-rune">Loading sacred knowledge...</div>
      </div>
    );
  }

  return (
    <section 
      className="min-h-screen text-ethereal-white" 
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/80"></div>
      
      {/* Navigation */}
      <nav className="relative z-50 p-6 flex justify-between items-center">
        <Link 
          href="/"
          className="inline-flex items-center text-golden-rune hover:text-silver-star transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-[-2px] transition-transform" />
          ← Sacred Remembering
        </Link>
        
        <div className="flex items-center space-x-4">
          <span className="text-silver-star">Welcome, {user.fullName}</span>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-golden-rune text-golden-rune hover:bg-golden-rune hover:text-void-black"
          >
            Leave Sanctuary
          </Button>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          {...fadeInUp}
          className="text-center mb-12"
        >
          <div className="w-24 h-24 mx-auto mb-6">
            <img 
              src={athenaeumCrest} 
              alt="Athenaeum Sacred Crest"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="font-gothic text-4xl text-golden-rune mb-4">
            Student Portal
          </h1>
          <p className="text-silver-star text-lg max-w-2xl mx-auto">
            Your journey into the mysteries begins here, dear seeker. Explore your cosmic coursework and mystical studies.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {/* My Grimoires */}
          <Card className="mystical-border grimoire-texture border-golden-rune/30">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-golden-rune" />
                <CardTitle className="text-golden-rune">My Grimoires</CardTitle>
              </div>
              <CardDescription className="text-silver-star/80">
                Your personal collection of mystical knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/grimoires">
                <Button className="w-full bg-gradient-to-r from-golden-rune to-cosmic-blue hover:from-golden-rune/90 hover:to-cosmic-blue/90 text-void-black">
                  Open Sacred Books
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Sacred Calendar */}
          <Card className="mystical-border grimoire-texture border-golden-rune/30">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-golden-rune" />
                <CardTitle className="text-golden-rune">Sacred Calendar</CardTitle>
              </div>
              <CardDescription className="text-silver-star/80">
                Cosmic events and ritual observances
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/astro-calendar">
                <Button className="w-full bg-gradient-to-r from-golden-rune to-cosmic-blue hover:from-golden-rune/90 hover:to-cosmic-blue/90 text-void-black">
                  View Celestial Guide
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Spirit Guide */}
          <Card className="mystical-border grimoire-texture border-golden-rune/30">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Star className="w-6 h-6 text-golden-rune" />
                <CardTitle className="text-golden-rune">Aionara</CardTitle>
              </div>
              <CardDescription className="text-silver-star/80">
                Your celestial spirit guide awaits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/aionara">
                <Button className="w-full bg-gradient-to-r from-golden-rune to-cosmic-blue hover:from-golden-rune/90 hover:to-cosmic-blue/90 text-void-black">
                  Seek Wisdom
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Four Pillars */}
          <Card className="mystical-border grimoire-texture border-golden-rune/30">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Sparkles className="w-6 h-6 text-golden-rune" />
                <CardTitle className="text-golden-rune">Four Pillars</CardTitle>
              </div>
              <CardDescription className="text-silver-star/80">
                Foundation teachings of the Athenaeum
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/four-pillars">
                <Button className="w-full bg-gradient-to-r from-golden-rune to-cosmic-blue hover:from-golden-rune/90 hover:to-cosmic-blue/90 text-void-black">
                  Enter Temple
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Alchemy Studies */}
          <Card className="mystical-border grimoire-texture border-golden-rune/30">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Moon className="w-6 h-6 text-golden-rune" />
                <CardTitle className="text-golden-rune">Alchemy</CardTitle>
              </div>
              <CardDescription className="text-silver-star/80">
                Transformation and sacred sciences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/alchemy">
                <Button className="w-full bg-gradient-to-r from-golden-rune to-cosmic-blue hover:from-golden-rune/90 hover:to-cosmic-blue/90 text-void-black">
                  Study Transmutation
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Deity Codex */}
          <Card className="mystical-border grimoire-texture border-golden-rune/30">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Star className="w-6 h-6 text-golden-rune" />
                <CardTitle className="text-golden-rune">Deity Codex</CardTitle>
              </div>
              <CardDescription className="text-silver-star/80">
                Divine beings and sacred pantheons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/deity-codex">
                <Button className="w-full bg-gradient-to-r from-golden-rune to-cosmic-blue hover:from-golden-rune/90 hover:to-cosmic-blue/90 text-void-black">
                  Explore Deities
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Student Progress */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12"
        >
          <Card className="mystical-border grimoire-texture border-golden-rune/30 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-golden-rune text-center">Your Mystical Journey</CardTitle>
              <CardDescription className="text-silver-star/80 text-center">
                As a seeker in the Athenaeum, you have access to all the sacred teachings and mystical resources to guide your spiritual transformation.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-ethereal-white mb-4">
                Welcome to your student portal, {user.fullName}. Your path of wisdom awaits.
              </p>
              <div className="text-silver-star/60 text-sm">
                Student ID: {user.username} | Email: {user.email}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}