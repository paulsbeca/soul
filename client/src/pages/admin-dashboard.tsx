import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { 
  Users, BookOpen, Calendar, Settings, Database, BarChart3, 
  FileText, Crown, LogOut, Shield, Globe, Edit3, Trash2,
  Plus, Eye, Star, Moon, Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import backgroundImage from "@assets/background_1755498699765.webp";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem("athenaeum_admin");
    const email = localStorage.getItem("admin_email");
    
    if (!isAdmin || isAdmin !== "true") {
      setLocation("/");
      return;
    }
    
    setAdminEmail(email || "");
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("athenaeum_admin");
    localStorage.removeItem("admin_email");
    toast({
      title: "Sacred Session Ended",
      description: "You have been safely logged out.",
    });
    setLocation("/");
  };

  const stats = {
    users: 247,
    grimoires: 89,
    courses: 12,
    events: 34
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "content", label: "Content", icon: BookOpen },
    { id: "courses", label: "Courses", icon: FileText },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "database", label: "Database", icon: Database },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

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
      <div className="absolute inset-0 bg-black/90"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-golden-rune/30 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Crown className="w-8 h-8 text-golden-rune" />
                <div>
                  <h1 className="font-gothic text-2xl text-golden-rune">Sacred Administration</h1>
                  <p className="text-silver-star/70 text-sm">Jakintza Ruha Command Center</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-golden-rune font-medium">{adminEmail}</p>
                  <p className="text-xs text-silver-star/60">Sacred Administrator</p>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-golden-rune/50 text-golden-rune hover:bg-golden-rune/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 min-h-screen bg-black/60 border-r border-golden-rune/30">
            <nav className="p-6 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      activeTab === tab.id
                        ? 'bg-golden-rune/20 text-golden-rune border border-golden-rune/40'
                        : 'text-silver-star/70 hover:bg-silver-star/10 hover:text-golden-rune'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8">
            <motion.div {...fadeInUp}>
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="font-gothic text-3xl text-golden-rune mb-2">Dashboard Overview</h2>
                    <p className="text-silver-star/80">Welcome to your sacred command center</p>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="mystical-border bg-black/60 border-golden-rune/30">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-silver-star/70 text-sm">Total Users</p>
                            <p className="text-2xl font-bold text-golden-rune">{stats.users}</p>
                          </div>
                          <Users className="w-8 h-8 text-golden-rune/60" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="mystical-border bg-black/60 border-golden-rune/30">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-silver-star/70 text-sm">Grimoires</p>
                            <p className="text-2xl font-bold text-golden-rune">{stats.grimoires}</p>
                          </div>
                          <BookOpen className="w-8 h-8 text-golden-rune/60" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="mystical-border bg-black/60 border-golden-rune/30">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-silver-star/70 text-sm">Courses</p>
                            <p className="text-2xl font-bold text-golden-rune">{stats.courses}</p>
                          </div>
                          <FileText className="w-8 h-8 text-golden-rune/60" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="mystical-border bg-black/60 border-golden-rune/30">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-silver-star/70 text-sm">Events</p>
                            <p className="text-2xl font-bold text-golden-rune">{stats.events}</p>
                          </div>
                          <Calendar className="w-8 h-8 text-golden-rune/60" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Quick Actions */}
                  <Card className="mystical-border bg-black/60 border-golden-rune/30">
                    <CardHeader>
                      <CardTitle className="font-gothic text-golden-rune">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href="/athenaeum">
                          <Button className="w-full bg-gradient-to-r from-golden-rune to-cosmic-blue hover:from-golden-rune/90 hover:to-cosmic-blue/90 text-void-black">
                            <Globe className="w-4 h-4 mr-2" />
                            Visit Athenaeum
                          </Button>
                        </Link>
                        <Button 
                          className="w-full border-golden-rune/50 text-golden-rune hover:bg-golden-rune/10"
                          variant="outline"
                          onClick={() => setActiveTab("content")}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Content
                        </Button>
                        <Button 
                          className="w-full border-silver-star/50 text-silver-star hover:bg-silver-star/10"
                          variant="outline"
                          onClick={() => setActiveTab("settings")}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Site Settings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "users" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-gothic text-3xl text-golden-rune">User Management</h2>
                    <Button className="bg-golden-rune text-void-black hover:bg-golden-rune/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                  </div>

                  <Card className="mystical-border bg-black/60 border-golden-rune/30">
                    <CardHeader>
                      <CardTitle className="text-golden-rune">Recent Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { name: "Sarah Moon", email: "sarah@example.com", status: "Active", joined: "2 days ago" },
                          { name: "Michael Star", email: "michael@example.com", status: "Pending", joined: "1 week ago" },
                          { name: "Luna Crystal", email: "luna@example.com", status: "Active", joined: "3 days ago" },
                        ].map((user, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-shadow-purple/20 rounded-lg">
                            <div>
                              <p className="text-ethereal-white font-medium">{user.name}</p>
                              <p className="text-silver-star/70 text-sm">{user.email}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                                {user.status}
                              </Badge>
                              <p className="text-xs text-silver-star/60">{user.joined}</p>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Edit3 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "content" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-gothic text-3xl text-golden-rune">Content Management</h2>
                    <Button className="bg-golden-rune text-void-black hover:bg-golden-rune/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Content
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="mystical-border bg-black/60 border-golden-rune/30">
                      <CardHeader>
                        <CardTitle className="text-golden-rune flex items-center">
                          <BookOpen className="w-5 h-5 mr-2" />
                          Grimoires
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {["Book of Shadows - Advanced", "Lunar Mysteries", "Crystal Healing Guide"].map((title, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-deep-purple/20 rounded">
                              <span className="text-ethereal-white">{title}</span>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline"><Edit3 className="w-3 h-3" /></Button>
                                <Button size="sm" variant="outline"><Trash2 className="w-3 h-3" /></Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="mystical-border bg-black/60 border-golden-rune/30">
                      <CardHeader>
                        <CardTitle className="text-golden-rune flex items-center">
                          <Star className="w-5 h-5 mr-2" />
                          Sacred Events
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {["Full Moon Ceremony", "Solstice Celebration", "Mercury Retrograde"].map((title, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-cosmic-blue/20 rounded">
                              <span className="text-ethereal-white">{title}</span>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline"><Edit3 className="w-3 h-3" /></Button>
                                <Button size="sm" variant="outline"><Trash2 className="w-3 h-3" /></Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6">
                  <h2 className="font-gothic text-3xl text-golden-rune">System Settings</h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="mystical-border bg-black/60 border-golden-rune/30">
                      <CardHeader>
                        <CardTitle className="text-golden-rune flex items-center">
                          <Shield className="w-5 h-5 mr-2" />
                          Security Settings
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-silver-star">Two-Factor Authentication</span>
                          <Badge variant="secondary">Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-silver-star">Admin Email Notifications</span>
                          <Badge variant="default">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-silver-star">Session Timeout</span>
                          <span className="text-golden-rune text-sm">24 hours</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="mystical-border bg-black/60 border-golden-rune/30">
                      <CardHeader>
                        <CardTitle className="text-golden-rune flex items-center">
                          <Globe className="w-5 h-5 mr-2" />
                          Site Configuration
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-silver-star">Site Status</span>
                          <Badge variant="default">Live</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-silver-star">Maintenance Mode</span>
                          <Badge variant="secondary">Disabled</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-silver-star">Debug Mode</span>
                          <Badge variant="secondary">Off</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </motion.div>
          </main>
        </div>
      </div>
    </section>
  );
}