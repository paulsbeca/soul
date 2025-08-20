import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import ProgressCard from "@/components/ProgressCard";
import ElementalPaths from "@/components/ElementalPaths";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Star, BookOpen, Tag, Scroll, Globe } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  const { data: enrollments = [] } = useQuery<any[]>({
    queryKey: ["/api/enrollments"],
    enabled: isAuthenticated,
  });

  const { data: userBadges = [] } = useQuery<any[]>({
    queryKey: ["/api/users/badges"],
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-mystical-500 to-ethereal-400 rounded-full flex items-center justify-center animate-pulse-glow">
            <BookOpen className="text-white text-2xl" />
          </div>
          <p className="text-cosmic-300">Loading the Athenaeum...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const currentEnrollments = (enrollments as any[]).filter((e: any) => e.status === "enrolled");
  const sanctumEnrollments = currentEnrollments.filter((e: any) => e.course?.wing === "sanctum");
  const orreryEnrollments = currentEnrollments.filter((e: any) => e.course?.wing === "orrery");
  const completedCount = (enrollments as any[]).filter((e: any) => e.status === "completed").length;

  const userXp = (user as any)?.xp || 0;
  const userLevel = (user as any)?.level || 'Neophyte';
  const userElementalPath = (user as any)?.elementalPath || 'mixed';

  const getNextLevel = () => {
    if (userXp >= 1500) return "Archon (Max)";
    if (userXp >= 750) return "Archon";
    if (userXp >= 250) return "Acolyte";
    return "Prophyte";
  };

  const getNextLevelXP = () => {
    if (userXp >= 1500) return 1500;
    if (userXp >= 750) return 1500;
    if (userXp >= 250) return 750;
    return 250;
  };

  const progressToNext = Math.min((userXp / getNextLevelXP()) * 100, 100);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-12">
            <h2 className="text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-ethereal-300 via-mystical-400 to-golden-400 bg-clip-text text-transparent">
              Choose Your Wing
            </h2>
            <p className="text-xl text-cosmic-300 max-w-3xl mx-auto leading-relaxed">
              The Athenaeum awaits you with two sacred paths of learning. Continue your journey through the cosmic library-school.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Link href="/courses?wing=sanctum">
              <div className="group cursor-pointer">
                <div className="crystal-border rounded-3xl p-8 h-full transition-all duration-500 hover:scale-105 hover:mystical-glow bg-cosmic-800/50 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-mystical-600 to-mystical-800 rounded-full flex items-center justify-center mystical-glow animate-float">
                      <Scroll className="text-3xl text-cosmic-50" />
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-mystical-300 mb-4">Sanctum of Hidden Echoes</h3>
                    <p className="text-cosmic-400 mb-6 italic">West Wing</p>
                    <p className="text-cosmic-300 mb-8 leading-relaxed">
                      Memory, lineage, history, and the deep ancestral archive. Candlelit halls where lore-keepers whisper to the bones of the past.
                    </p>
                    
                    <div className="space-y-3 text-left mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-mystical-400 rounded-full" />
                        <span className="text-sm text-cosmic-300">Ancestral Wisdom & Cultural Repair</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-mystical-400 rounded-full" />
                        <span className="text-sm text-cosmic-300">Shadow Work & Healing Patterns</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-mystical-400 rounded-full" />
                        <span className="text-sm text-cosmic-300">Creating Personal Codex</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link href="/courses?wing=orrery">
              <div className="group cursor-pointer">
                <div className="crystal-border rounded-3xl p-8 h-full transition-all duration-500 hover:scale-105 hover:mystical-glow bg-cosmic-800/50 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-ethereal-500 to-ethereal-700 rounded-full flex items-center justify-center mystical-glow animate-float">
                      <Globe className="text-3xl text-cosmic-50" />
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-ethereal-300 mb-4">Orrery of Obscured Realms</h3>
                    <p className="text-cosmic-400 mb-6 italic">East Wing</p>
                    <p className="text-cosmic-300 mb-8 leading-relaxed">
                      The cosmic, the future, mapping unseen worlds. Starlit observatories where arcane cartographers chart realms beyond perception.
                    </p>
                    
                    <div className="space-y-3 text-left mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-ethereal-400 rounded-full" />
                        <span className="text-sm text-cosmic-300">Cosmic Navigation & Astrology</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-ethereal-400 rounded-full" />
                        <span className="text-sm text-cosmic-300">Elemental Sciences & Magic</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-ethereal-400 rounded-full" />
                        <span className="text-sm text-cosmic-300">Astral Operations & Journeys</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-serif font-bold text-ethereal-300 mb-4">Your Journey Progress</h3>
            <p className="text-cosmic-400">Track your advancement through the sacred curriculum</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="crystal-border rounded-2xl p-6 bg-cosmic-800/50 backdrop-blur-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-golden-400 to-golden-600 rounded-full flex items-center justify-center mystical-glow">
                <Star className="text-2xl text-white" />
              </div>
              <h4 className="text-xl font-semibold text-golden-400 mb-2">Current Level</h4>
              <p className="text-3xl font-bold text-cosmic-50">{userLevel}</p>
              <p className="text-sm text-cosmic-400">{userXp} / {getNextLevelXP()} XP</p>
              <div className="mt-4 bg-cosmic-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-golden-400 to-golden-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
            </div>
            
            <div className="crystal-border rounded-2xl p-6 bg-cosmic-800/50 backdrop-blur-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-mystical-500 to-mystical-700 rounded-full flex items-center justify-center mystical-glow">
                <BookOpen className="text-2xl text-white" />
              </div>
              <h4 className="text-xl font-semibold text-mystical-400 mb-2">Courses Completed</h4>
              <p className="text-3xl font-bold text-cosmic-50">{completedCount}</p>
              <p className="text-sm text-cosmic-400">across both wings</p>
            </div>
            
            <div className="crystal-border rounded-2xl p-6 bg-cosmic-800/50 backdrop-blur-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-ethereal-500 to-ethereal-700 rounded-full flex items-center justify-center mystical-glow">
                <Tag className="text-2xl text-white" />
              </div>
              <h4 className="text-xl font-semibold text-ethereal-400 mb-2">Badges Earned</h4>
              <p className="text-3xl font-bold text-cosmic-50">{(userBadges as any[]).length}</p>
              <p className="text-sm text-cosmic-400">sacred achievements</p>
            </div>
          </div>
          
          {/* Current Courses */}
          {currentEnrollments.length > 0 && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="crystal-border rounded-2xl p-6 bg-cosmic-800/50 backdrop-blur-sm">
                <h4 className="text-2xl font-serif font-bold text-mystical-300 mb-6 flex items-center">
                  <Scroll className="mr-3" />
                  Sanctum Progress
                </h4>
                
                <div className="space-y-4">
                  {sanctumEnrollments.length > 0 ? (
                    sanctumEnrollments.map((enrollment: any) => (
                      <ProgressCard key={enrollment.id} enrollment={enrollment} />
                    ))
                  ) : (
                    <p className="text-cosmic-400 text-center py-4">No active Sanctum courses</p>
                  )}
                </div>
              </div>
              
              <div className="crystal-border rounded-2xl p-6 bg-cosmic-800/50 backdrop-blur-sm">
                <h4 className="text-2xl font-serif font-bold text-ethereal-300 mb-6 flex items-center">
                  <Globe className="mr-3" />
                  Orrery Progress
                </h4>
                
                <div className="space-y-4">
                  {orreryEnrollments.length > 0 ? (
                    orreryEnrollments.map((enrollment: any) => (
                      <ProgressCard key={enrollment.id} enrollment={enrollment} />
                    ))
                  ) : (
                    <p className="text-cosmic-400 text-center py-4">No active Orrery courses</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Elemental Paths */}
      <ElementalPaths currentPath={userElementalPath} />
    </div>
  );
}
