import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import Navigation from "@/components/Navigation";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";

export default function Courses() {
  const [, setLocation] = useLocation();
  const [filter, setFilter] = useState("all");

  const { data: courses = [] } = useQuery<any[]>({
    queryKey: ["/api/courses"],
  });

  const { data: enrollments = [] } = useQuery<any[]>({
    queryKey: ["/api/enrollments"],
  });

  // Create enrollment lookup map
  const enrollmentMap = (enrollments as any[]).reduce((acc: any, enrollment: any) => {
    acc[enrollment.courseId] = enrollment;
    return acc;
  }, {});

  const filteredCourses = (courses as any[]).filter((course: any) => {
    if (filter === "all") return true;
    if (filter === "sanctum") return course.wing === "sanctum";
    if (filter === "orrery") return course.wing === "orrery";
    if (filter === "electives") return course.isElective;
    return true;
  });

  const handleCourseClick = (courseId: string) => {
    setLocation(`/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-serif font-bold text-ethereal-300 mb-4">Sacred Curriculum</h3>
            <p className="text-cosmic-400">Explore the complete course offerings across both wings</p>
          </div>
          
          {/* Course Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-mystical-600 hover:bg-mystical-500" : ""}
            >
              All Courses
            </Button>
            <Button
              variant={filter === "sanctum" ? "default" : "outline"}
              onClick={() => setFilter("sanctum")}
              className={filter === "sanctum" ? "bg-mystical-600 hover:bg-mystical-500" : ""}
            >
              Sanctum (SE)
            </Button>
            <Button
              variant={filter === "orrery" ? "default" : "outline"}
              onClick={() => setFilter("orrery")}
              className={filter === "orrery" ? "bg-ethereal-600 hover:bg-ethereal-500" : ""}
            >
              Orrery (OR)
            </Button>
            <Button
              variant={filter === "electives" ? "default" : "outline"}
              onClick={() => setFilter("electives")}
              className={filter === "electives" ? "bg-golden-600 hover:bg-golden-500" : ""}
            >
              Electives
            </Button>
          </div>
          
          {/* Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course: any) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  enrollment={enrollmentMap[course.id]}
                  onClick={() => handleCourseClick(course.id)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-cosmic-400 text-xl">No courses found for the selected filter.</p>
                <p className="text-cosmic-500 mt-2">Try adjusting your search criteria.</p>
              </div>
            )}
          </div>

          {/* Admin Quick Add Button (if needed) */}
          <div className="text-center mt-16">
            <Link href="/admin">
              <Button variant="outline" className="text-cosmic-400 border-cosmic-400 hover:bg-cosmic-800">
                Course Management (Admin)
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
