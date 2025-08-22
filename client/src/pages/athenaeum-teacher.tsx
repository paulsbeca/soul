import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowLeft, BookOpen, Users, Star, Settings, Eye, Crown } from "lucide-react";
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

export default function AthenaeumTeacher() {
  const [user, setUser] = useState<User | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem("athenaeum_user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role === "teacher") {
        setUser(parsedUser);
      } else {
        // Redirect non-teachers
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
          <div className="flex items-center space-x-2">
            <Crown className="w-5 h-5 text-golden-rune" />
            <span className="text-silver-star">Professor {user.fullName}</span>
          </div>
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
            Professor Portal
          </h1>
          <p className="text-silver-star text-lg max-w-2xl mx-auto">
            Sacred keeper of wisdom, guide the seekers on their mystical journey through the cosmic teachings.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {/* Teaching Resources */}
          <Card className="mystical-border grimoire-texture border-golden-rune/30">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-golden-rune" />
                <CardTitle className="text-golden-rune">Teaching Library</CardTitle>
              </div>
              <CardDescription className="text-silver-star/80">
                Sacred texts and mystical resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/grimoires">
                <Button className="w-full bg-gradient-to-r from-golden-rune to-cosmic-blue hover:from-golden-rune/90 hover:to-cosmic-blue/90 text-void-black">
                  Access Sacred Books
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Student Management */}
          <Card className="mystical-border grimoire-texture border-golden-rune/30">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-golden-rune" />
                <CardTitle className="text-golden-rune">Student Seekers</CardTitle>
              </div>
              <CardDescription className="text-silver-star/80">
                Guide and monitor student progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-golden-rune to-cosmic-blue hover:from-golden-rune/90 hover:to-cosmic-blue/90 text-void-black">
                View Student Progress
              </Button>
            </CardContent>
          </Card>

          {/* Course Creation */}
          <Card className="mystical-border grimoire-texture border-golden-rune/30">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Star className="w-6 h-6 text-golden-rune" />
                <CardTitle className="text-golden-rune">Course Creation</CardTitle>
              </div>
              <CardDescription className="text-silver-star/80">
                Design mystical curricula and lessons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-golden-rune to-cosmic-blue hover:from-golden-rune/90 hover:to-cosmic-blue/90 text-void-black">
                Create New Course
              </Button>
            </CardContent>
          </Card>

          {/* Sacred Calendar Management */}
          <Card className="mystical-border grimoire-texture border-golden-rune/30">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Settings className="w-6 h-6 text-golden-rune" />
                <CardTitle className="text-golden-rune">Calendar Keeper</CardTitle>
              </div>
              <CardDescription className="text-silver-star/80">
                Manage sacred events and rituals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/astro-calendar">
                <Button className="w-full bg-gradient-to-r from-golden-rune to-cosmic-blue hover:from-golden-rune/90 hover:to-cosmic-blue/90 text-void-black">
                  Manage Sacred Calendar
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Deity Database */}
          <Card className="mystical-border grimoire-texture border-golden-rune/30">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Eye className="w-6 h-6 text-golden-rune" />
                <CardTitle className="text-golden-rune">Divine Knowledge</CardTitle>
              </div>
              <CardDescription className="text-silver-star/80">
                Curate the deity codex and pantheons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/deity-codex">
                <Button className="w-full bg-gradient-to-r from-golden-rune to-cosmic-blue hover:from-golden-rune/90 hover:to-cosmic-blue/90 text-void-black">
                  Manage Deity Codex
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Aionara Training */}
          <Card className="mystical-border grimoire-texture border-golden-rune/30">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Star className="w-6 h-6 text-golden-rune" />
                <CardTitle className="text-golden-rune">Spirit Guide</CardTitle>
              </div>
              <CardDescription className="text-silver-star/80">
                Consult with Aionara for guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/aionara">
                <Button className="w-full bg-gradient-to-r from-golden-rune to-cosmic-blue hover:from-golden-rune/90 hover:to-cosmic-blue/90 text-void-black">
                  Commune with Aionara
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Teaching Status */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12"
        >
          <Card className="mystical-border grimoire-texture border-golden-rune/30 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-golden-rune text-center">Your Sacred Teaching Role</CardTitle>
              <CardDescription className="text-silver-star/80 text-center">
                As a professor of the Athenaeum, you hold the sacred responsibility of guiding seekers through their mystical education.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-ethereal-white mb-4">
                Welcome, Professor {user.fullName}. Your wisdom lights the path for countless seekers.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl text-golden-rune font-bold">∞</div>
                  <div className="text-silver-star text-sm">Students Guided</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-golden-rune font-bold">7</div>
                  <div className="text-silver-star text-sm">Sacred Subjects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-golden-rune font-bold">∞</div>
                  <div className="text-silver-star text-sm">Wisdom Shared</div>
                </div>
              </div>
              <div className="text-silver-star/60 text-sm mt-4">
                Professor ID: {user.username} | Email: {user.email}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}