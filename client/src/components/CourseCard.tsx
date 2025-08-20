import { Course } from "@shared/schema";
import { BookOpen, Lock, CheckCircle, Clock } from "lucide-react";

interface CourseCardProps {
  course: Course;
  enrollment?: {
    status: string;
    progress: number;
  };
  onClick: () => void;
}

export default function CourseCard({ course, enrollment, onClick }: CourseCardProps) {
  const isCompleted = enrollment?.status === "completed";
  const isEnrolled = !!enrollment;
  const isLocked = !isEnrolled && (course.level || 100) > 100; // Simple prerequisite check

  const getStatusColor = () => {
    if (isCompleted) return "text-green-400";
    if (isEnrolled) return "text-blue-400";
    if (isLocked) return "text-cosmic-500";
    return "text-yellow-400";
  };

  const getStatusIcon = () => {
    if (isCompleted) return <CheckCircle className="w-4 h-4" />;
    if (isEnrolled) return <Clock className="w-4 h-4" />;
    if (isLocked) return <Lock className="w-4 h-4" />;
    return <BookOpen className="w-4 h-4" />;
  };

  const getStatusText = () => {
    if (isCompleted) return "✓ Completed";
    if (isEnrolled) return "◉ In Progress";
    if (isLocked) return "🔒 Locked";
    return "● Available";
  };

  const wingColor = course.wing === "sanctum" 
    ? "from-mystical-500 to-mystical-700" 
    : "from-ethereal-500 to-ethereal-700";

  return (
    <div 
      className={`crystal-border rounded-2xl p-6 bg-cosmic-800/50 backdrop-blur-sm hover:scale-105 transition-transform duration-300 cursor-pointer ${isLocked ? 'opacity-60' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <span className={`text-sm font-semibold ${course.wing === 'sanctum' ? 'text-mystical-400 bg-mystical-900/50' : 'text-ethereal-400 bg-ethereal-900/50'} px-3 py-1 rounded-full`}>
          {course.code}
        </span>
        <div className={`w-8 h-8 bg-gradient-to-br ${wingColor} rounded-full flex items-center justify-center`}>
          {isLocked ? (
            <Lock className="text-cosmic-400 text-sm" />
          ) : (
            <BookOpen className="text-white text-sm" />
          )}
        </div>
      </div>
      
      <h4 className={`text-xl font-serif font-bold mb-3 ${isLocked ? 'text-cosmic-400' : 'text-cosmic-50'}`}>
        {course.title}
      </h4>
      
      <p className={`text-sm mb-4 ${isLocked ? 'text-cosmic-500' : 'text-cosmic-400'}`}>
        {course.description}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-cosmic-500">
          {course.xpReward} XP
        </span>
        <span className={`text-xs font-semibold flex items-center gap-1 ${getStatusColor()}`}>
          {getStatusIcon()}
          {getStatusText()}
        </span>
      </div>
      
      {enrollment && enrollment.progress > 0 && (
        <div className="mt-4">
          <div className="w-full bg-cosmic-600 rounded-full h-1">
            <div 
              className={`bg-gradient-to-r ${course.wing === 'sanctum' ? 'from-mystical-400 to-mystical-600' : 'from-ethereal-400 to-ethereal-600'} h-1 rounded-full transition-all duration-300`}
              style={{ width: `${enrollment.progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
