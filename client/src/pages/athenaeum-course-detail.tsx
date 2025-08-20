import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { BookOpen, CheckCircle, Lock, Star, ArrowLeft } from "lucide-react";

export default function CourseDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const courseId = params.id;

  const { data: courseData } = useQuery({
    queryKey: ["/api/courses", courseId],
    enabled: !!courseId,
  });

  const { data: enrollments = [] } = useQuery<any[]>({
    queryKey: ["/api/enrollments"],
  });

  const enrollment = (enrollments as any[]).find((e: any) => e.courseId === courseId);
  const course = (courseData as any)?.course;
  const lessons = (courseData as any)?.lessons || [];

  const enrollMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/enrollments", { courseId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/enrollments"] });
      toast({
        title: "Enrolled Successfully",
        description: "Welcome to your new course!",
      });
    },
    onError: () => {
      toast({
        title: "Enrollment Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const completeCourseMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", `/api/enrollments/${courseId}/complete`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/enrollments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      toast({
        title: "Course Completed!",
        description: "Certificate issued. Congratulations!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to complete course.",
        variant: "destructive",
      });
    },
  });

  if (!course) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center py-32">
          <p className="text-cosmic-400">Loading course details...</p>
        </div>
      </div>
    );
  }

  const isEnrolled = !!enrollment;
  const isCompleted = enrollment?.status === "completed";
  const progress = enrollment?.progress || 0;

  const wingColor = course.wing === "sanctum" 
    ? "from-mystical-500 to-mystical-700" 
    : "from-ethereal-500 to-ethereal-700";

  const wingTextColor = course.wing === "sanctum" ? "text-mystical-300" : "text-ethereal-300";

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Button
            variant="ghost"
            onClick={() => setLocation("/courses")}
            className="mb-8 text-cosmic-400 hover:text-cosmic-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>

          <div className="crystal-border rounded-3xl p-8 bg-cosmic-800/50 backdrop-blur-sm mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <Badge className={`${course.wing === 'sanctum' ? 'bg-mystical-900/50 text-mystical-400' : 'bg-ethereal-900/50 text-ethereal-400'} mb-4`}>
                  {course.code}
                </Badge>
                <h1 className="text-4xl font-serif font-bold text-cosmic-50 mb-4">
                  {course.title}
                </h1>
                <p className="text-cosmic-400 mb-6 leading-relaxed">
                  {course.description}
                </p>
                
                <div className="flex items-center gap-6 text-sm text-cosmic-500">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{lessons.length} Lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span>{course.xpReward} XP</span>
                  </div>
                  <Badge variant="outline" className={wingTextColor}>
                    {course.wing === "sanctum" ? "Sanctum" : "Orrery"}
                  </Badge>
                </div>
              </div>
              
              <div className={`w-24 h-24 bg-gradient-to-br ${wingColor} rounded-full flex items-center justify-center mystical-glow`}>
                {isCompleted ? (
                  <CheckCircle className="text-4xl text-white" />
                ) : isEnrolled ? (
                  <BookOpen className="text-4xl text-white" />
                ) : (
                  <Lock className="text-4xl text-white" />
                )}
              </div>
            </div>

            {isEnrolled && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-cosmic-300">Progress</span>
                  <span className="text-sm text-cosmic-400">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            <div className="flex gap-4">
              {!isEnrolled ? (
                <Button
                  onClick={() => enrollMutation.mutate()}
                  disabled={enrollMutation.isPending}
                  className={`bg-gradient-to-r ${wingColor} hover:opacity-90 text-white`}
                >
                  {enrollMutation.isPending ? "Enrolling..." : "Enroll in Course"}
                </Button>
              ) : isCompleted ? (
                <Badge className="bg-green-600 text-white px-4 py-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Completed
                </Badge>
              ) : (
                <Button
                  onClick={() => completeCourseMutation.mutate()}
                  disabled={completeCourseMutation.isPending || progress < 100}
                  className={`bg-gradient-to-r ${wingColor} hover:opacity-90 text-white`}
                >
                  {completeCourseMutation.isPending ? "Completing..." : "Complete Course"}
                </Button>
              )}
            </div>
          </div>

          {/* Lessons */}
          {lessons.length > 0 && (
            <div className="crystal-border rounded-2xl p-6 bg-cosmic-800/50 backdrop-blur-sm">
              <h2 className="text-2xl font-serif font-bold text-cosmic-50 mb-6">Course Lessons</h2>
              
              <div className="space-y-4">
                {lessons.map((lesson: any, index: number) => (
                  <Card key={lesson.id} className="bg-cosmic-700/50 border-cosmic-600">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-cosmic-50 flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${wingColor} flex items-center justify-center text-white text-sm font-bold`}>
                          {index + 1}
                        </div>
                        {lesson.title}
                        <Badge variant="outline" className="ml-auto text-cosmic-400">
                          +{lesson.xpReward} XP
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    {lesson.content && (
                      <CardContent>
                        <p className="text-cosmic-400 text-sm">{lesson.content}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
