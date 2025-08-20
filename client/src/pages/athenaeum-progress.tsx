import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import ProgressCard from "@/components/ProgressCard";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BookOpen, Award, Calendar } from "lucide-react";

export default function Progress() {
  const { user } = useAuth();

  const { data: enrollments = [] } = useQuery<any[]>({
    queryKey: ["/api/enrollments"],
  });

  const { data: journalEntries = [] } = useQuery<any[]>({
    queryKey: ["/api/journal"],
  });

  const completedEnrollments = (enrollments as any[]).filter((e: any) => e.status === "completed");
  const activeEnrollments = (enrollments as any[]).filter((e: any) => e.status === "enrolled");
  
  const sanctumEnrollments = activeEnrollments.filter((e: any) => e.course?.wing === "sanctum");
  const orreryEnrollments = activeEnrollments.filter((e: any) => e.course?.wing === "orrery");

  const totalXP = (user as any)?.xp || 0;
  const currentLevel = (user as any)?.level || "Neophyte";

  const getNextLevelXP = () => {
    if (totalXP >= 1500) return 1500;
    if (totalXP >= 750) return 1500;
    if (totalXP >= 250) return 750;
    return 250;
  };

  const getLevelProgress = () => {
    const nextXP = getNextLevelXP();
    return Math.min((totalXP / nextXP) * 100, 100);
  };

  const getRecentActivity = () => {
    const recentEntries = (journalEntries as any[])
      .slice(0, 5)
      .map((entry: any) => ({
        ...entry,
        type: "journal",
        date: new Date(entry.createdAt),
      }));

    const recentCompletions = completedEnrollments
      .filter((e: any) => e.completedAt)
      .slice(0, 3)
      .map((enrollment: any) => ({
        ...enrollment,
        type: "completion",
        date: new Date(enrollment.completedAt),
      }));

    return [...recentEntries, ...recentCompletions]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 8);
  };

  const recentActivity = getRecentActivity();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-ethereal-300 mb-4">Your Sacred Journey</h1>
            <p className="text-cosmic-400">Track your progression through the mystical curriculum</p>
          </div>

          {/* Level Progress Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm border-golden-400/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-golden-400 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Current Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cosmic-50 mb-2">{currentLevel}</p>
                <p className="text-sm text-cosmic-400 mb-3">{totalXP} / {getNextLevelXP()} XP</p>
                <ProgressBar value={getLevelProgress()} className="h-2" />
              </CardContent>
            </Card>

            <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-mystical-400 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Active Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cosmic-50">{activeEnrollments.length}</p>
                <p className="text-sm text-cosmic-400">in progress</p>
              </CardContent>
            </Card>

            <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-ethereal-400 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cosmic-50">{completedEnrollments.length}</p>
                <p className="text-sm text-cosmic-400">courses finished</p>
              </CardContent>
            </Card>

            <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-golden-400 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Journal Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cosmic-50">{journalEntries.length}</p>
                <p className="text-sm text-cosmic-400">reflections written</p>
              </CardContent>
            </Card>
          </div>

          {/* Wing Progress */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-mystical-300 text-2xl font-serif">
                  Sanctum of Hidden Echoes
                </CardTitle>
                <p className="text-cosmic-400">West Wing Progress</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {sanctumEnrollments.length > 0 ? (
                  sanctumEnrollments.map((enrollment: any) => (
                    <ProgressCard key={enrollment.id} enrollment={enrollment} />
                  ))
                ) : (
                  <p className="text-cosmic-500 text-center py-8">
                    No active courses in the Sanctum wing
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-ethereal-300 text-2xl font-serif">
                  Orrery of Obscured Realms
                </CardTitle>
                <p className="text-cosmic-400">East Wing Progress</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {orreryEnrollments.length > 0 ? (
                  orreryEnrollments.map((enrollment: any) => (
                    <ProgressCard key={enrollment.id} enrollment={enrollment} />
                  ))
                ) : (
                  <p className="text-cosmic-500 text-center py-8">
                    No active courses in the Orrery wing
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-ethereal-300 text-2xl font-serif">
                Recent Activity
              </CardTitle>
              <p className="text-cosmic-400">Your latest achievements and reflections</p>
            </CardHeader>
            <CardContent>
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity: any, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-cosmic-700/50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === "journal" 
                            ? "bg-golden-600" 
                            : "bg-green-600"
                        }`}>
                          {activity.type === "journal" ? (
                            <Calendar className="w-5 h-5 text-white" />
                          ) : (
                            <Award className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-cosmic-50">
                            {activity.type === "journal" 
                              ? "Journal Entry"
                              : `Completed ${activity.course?.title}`
                            }
                          </p>
                          <p className="text-sm text-cosmic-400">
                            {activity.date.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-cosmic-400">
                        {activity.type === "journal" ? "+10 XP" : `+${activity.course?.xpReward || 0} XP`}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-cosmic-500 text-center py-8">
                  No recent activity. Start your mystical journey!
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
