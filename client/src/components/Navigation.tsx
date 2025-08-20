import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { BookOpen, User } from "lucide-react";

export default function Navigation() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) return null;

  const firstName = (user as any)?.firstName || 'Anonymous';
  const level = (user as any)?.level || 'Neophyte';
  const xp = (user as any)?.xp || 0;
  const profileImageUrl = (user as any)?.profileImageUrl;

  return (
    <nav className="relative z-50 bg-cosmic-900/80 backdrop-blur-md border-b border-ethereal-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-4 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-mystical-500 to-ethereal-400 rounded-full flex items-center justify-center mystical-glow animate-pulse-glow">
                <BookOpen className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-ethereal-300">The Athenaeum</h1>
                <p className="text-sm text-cosmic-400">Jakintza Ruha Spiritual Academy</p>
              </div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-cosmic-300 hover:text-ethereal-300 transition-colors">
              Dashboard
            </Link>
            <Link href="/courses" className="text-cosmic-300 hover:text-ethereal-300 transition-colors">
              Courses
            </Link>
            <Link href="/progress" className="text-cosmic-300 hover:text-ethereal-300 transition-colors">
              Progress
            </Link>
            <Link href="/certificates" className="text-cosmic-300 hover:text-ethereal-300 transition-colors">
              Certificates
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-ethereal-300">
                Seeker {firstName}
              </p>
              <p className="text-xs text-mystical-400">
                {level} • {xp} XP
              </p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-golden-400 to-mystical-500 rounded-full flex items-center justify-center">
              {profileImageUrl ? (
                <img 
                  src={profileImageUrl} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="text-white text-sm" />
              )}
            </div>
            <button
              onClick={() => window.location.href = '/api/logout'}
              className="text-sm text-cosmic-400 hover:text-cosmic-300 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
