import { Enrollment, Course } from "@shared/schema";

interface ProgressCardProps {
  enrollment: Enrollment & { course: Course };
}

export default function ProgressCard({ enrollment }: ProgressCardProps) {
  const { course } = enrollment;
  const wingColor = course.wing === "sanctum" 
    ? "from-mystical-400 to-mystical-600" 
    : "from-ethereal-400 to-ethereal-600";

  const statusColor = enrollment.status === "completed" 
    ? "bg-green-400" 
    : enrollment.status === "enrolled" && enrollment.progress > 0
    ? "bg-blue-400"
    : "bg-yellow-400";

  return (
    <div className="flex items-center justify-between p-4 bg-cosmic-700/50 rounded-xl">
      <div className="flex items-center space-x-4">
        <div className={`w-3 h-3 ${statusColor} rounded-full animate-pulse-glow`} />
        <div>
          <h5 className="font-semibold text-cosmic-50">
            {course.code} — {course.title}
          </h5>
          <p className="text-sm text-cosmic-400">
            {enrollment.status === "completed" 
              ? "Completed" 
              : `Progress: ${enrollment.progress || 0}%`
            }
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-semibold ${course.wing === 'sanctum' ? 'text-mystical-300' : 'text-ethereal-300'}`}>
          +{course.xpReward} XP
        </p>
        <div className="w-20 bg-cosmic-600 rounded-full h-1 mt-1">
          <div 
            className={`bg-gradient-to-r ${wingColor} h-1 rounded-full transition-all duration-300`}
            style={{ width: `${enrollment.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
