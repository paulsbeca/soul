import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
// import { insertCourseSchema, insertLessonSchema } from "@shared/schema";
import { 
  Crown, BookOpen, Users, TrendingUp, Plus, Edit, Tag, BarChart3, 
  Upload, Download, UserPlus, Search, Filter, Trash2, Copy,
  Settings, GraduationCap, Award, Calendar, RefreshCw
} from "lucide-react";
import { z } from "zod";

const createCourseSchema = z.object({
  code: z.string().min(1, "Course code is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  wing: z.enum(["sanctum", "orrery"]),
  level: z.number().min(100).max(400),
  xpReward: z.number().min(0),
  isElective: z.boolean().default(false),
  prerequisites: z.array(z.string()).default([]),
});

const createLessonSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  order: z.number().min(0),
  xpReward: z.number().min(0),
  courseId: z.string(),
});

const createUserSchema = z.object({
  email: z.string().email("Valid email is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  role: z.enum(["student", "instructor", "admin"]),
  elementalPath: z.enum(["earth", "water", "air", "fire", "aether", "mixed"]),
});

const createEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.enum(["ritual", "seasonal", "lunar", "planetary", "cosmic"]),
  festivalType: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  isRecurring: z.string().default("true"),
  recurrencePattern: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [showCreateLesson, setShowCreateLesson] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showBulkEnroll, setShowBulkEnroll] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showEditEvent, setShowEditEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterWing, setFilterWing] = useState("all");
  const [eventSearchTerm, setEventSearchTerm] = useState("");
  const [eventFilterCategory, setEventFilterCategory] = useState("all");

  const { data: courses = [] } = useQuery<any[]>({
    queryKey: ["/api/courses"],
  });

  const { data: analytics } = useQuery<any>({
    queryKey: ["/api/analytics"],
  });

  const { data: allUsers = [] } = useQuery<any[]>({
    queryKey: ["/api/admin/users"],
  });

  const { data: enrollments = [] } = useQuery<any[]>({
    queryKey: ["/api/admin/enrollments"],
  });

  const { data: sacredEvents = [] } = useQuery<any[]>({
    queryKey: ["/api/sacred-events"],
  });

  const createCourseForm = useForm<z.infer<typeof createCourseSchema>>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      code: "",
      title: "",
      description: "",
      wing: "sanctum",
      level: 100,
      xpReward: 200,
      isElective: false,
    },
  });

  const createLessonForm = useForm<z.infer<typeof createLessonSchema>>({
    resolver: zodResolver(createLessonSchema),
    defaultValues: {
      title: "",
      content: "",
      order: 0,
      xpReward: 25,
    },
  });

  const createUserForm = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      role: "student",
      elementalPath: "mixed",
    },
  });

  const createEventForm = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "cosmic",
      festivalType: "",
      startDate: "",
      endDate: "",
      isRecurring: "true",
      recurrencePattern: "annual",
      tags: [],
    },
  });

  const editEventForm = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "cosmic",
      festivalType: "",
      startDate: "",
      endDate: "",
      isRecurring: "true",
      recurrencePattern: "annual",
      tags: [],
    },
  });

  // Mutations
  const createCourseMutation = useMutation({
    mutationFn: async (data: z.infer<typeof createCourseSchema>) => {
      await apiRequest("POST", "/api/courses", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      toast({ title: "Course Created", description: "New course added successfully." });
      setShowCreateCourse(false);
      createCourseForm.reset();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create course.", variant: "destructive" });
    },
  });

  const createLessonMutation = useMutation({
    mutationFn: async (data: z.infer<typeof createLessonSchema>) => {
      await apiRequest("POST", `/api/courses/${selectedCourse}/lessons`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      toast({ title: "Lesson Created", description: "New lesson added successfully." });
      setShowCreateLesson(false);
      createLessonForm.reset();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create lesson.", variant: "destructive" });
    },
  });

  const createUserMutation = useMutation({
    mutationFn: async (data: z.infer<typeof createUserSchema>) => {
      await apiRequest("POST", "/api/admin/users", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({ title: "User Created", description: "New user account created successfully." });
      setShowCreateUser(false);
      createUserForm.reset();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create user.", variant: "destructive" });
    },
  });

  const bulkEnrollMutation = useMutation({
    mutationFn: async (data: { userIds: string[], courseId: string }) => {
      await apiRequest("POST", "/api/admin/bulk-enroll", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/enrollments"] });
      toast({ title: "Bulk Enrollment Complete", description: "Students enrolled successfully." });
      setShowBulkEnroll(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to enroll students.", variant: "destructive" });
    },
  });

  const cloneCourseMutation = useMutation({
    mutationFn: async (courseId: string) => {
      await apiRequest("POST", `/api/admin/courses/${courseId}/clone`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      toast({ title: "Course Cloned", description: "Course copied successfully." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to clone course.", variant: "destructive" });
    },
  });

  const createEventMutation = useMutation({
    mutationFn: async (data: z.infer<typeof createEventSchema>) => {
      await apiRequest("POST", "/api/sacred-events", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sacred-events"] });
      toast({ title: "Event Created", description: "New cosmic event added successfully." });
      setShowCreateEvent(false);
      createEventForm.reset();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create event.", variant: "destructive" });
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: z.infer<typeof createEventSchema> }) => {
      await apiRequest("PUT", `/api/sacred-events/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sacred-events"] });
      toast({ title: "Event Updated", description: "Cosmic event updated successfully." });
      setShowEditEvent(false);
      setSelectedEvent(null);
      editEventForm.reset();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update event.", variant: "destructive" });
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/sacred-events/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sacred-events"] });
      toast({ title: "Event Deleted", description: "Cosmic event removed successfully." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete event.", variant: "destructive" });
    },
  });

  // Filtered data
  const filteredCourses = (courses as any[]).filter((course: any) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === "all" || course.level.toString() === filterLevel;
    const matchesWing = filterWing === "all" || course.wing === filterWing;
    return matchesSearch && matchesLevel && matchesWing;
  });

  const filteredUsers = (allUsers as any[]).filter((user: any) => 
    user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEvents = (sacredEvents as any[]).filter((event: any) => {
    const matchesSearch = event.title?.toLowerCase().includes(eventSearchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(eventSearchTerm.toLowerCase());
    const matchesCategory = eventFilterCategory === "all" || event.category === eventFilterCategory;
    return matchesSearch && matchesCategory;
  });

  const onCreateCourse = (data: z.infer<typeof createCourseSchema>) => {
    createCourseMutation.mutate(data);
  };

  const onCreateLesson = (data: z.infer<typeof createLessonSchema>) => {
    createLessonMutation.mutate(data);
  };

  const onCreateUser = (data: z.infer<typeof createUserSchema>) => {
    createUserMutation.mutate(data);
  };

  const onCreateEvent = (data: z.infer<typeof createEventSchema>) => {
    createEventMutation.mutate(data);
  };

  const onUpdateEvent = (data: z.infer<typeof createEventSchema>) => {
    if (selectedEvent) {
      updateEventMutation.mutate({ id: selectedEvent.id, data });
    }
  };

  const handleEditEvent = (event: any) => {
    setSelectedEvent(event);
    editEventForm.reset({
      title: event.title || "",
      description: event.description || "",
      category: event.category || "cosmic",
      festivalType: event.festivalType || "",
      startDate: event.startDate || "",
      endDate: event.endDate || "",
      isRecurring: event.isRecurring || "true",
      recurrencePattern: event.recurrencePattern || "annual",
      tags: event.tags || [],
    });
    setShowEditEvent(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm("Are you sure you want to delete this cosmic event?")) {
      deleteEventMutation.mutate(eventId);
    }
  };

  const handleBulkEnroll = () => {
    // Implementation for bulk enrollment
    const selectedUsers = filteredUsers.filter((user: any) => user.selected);
    if (selectedUsers.length > 0 && selectedCourse) {
      bulkEnrollMutation.mutate({
        userIds: selectedUsers.map((user: any) => user.id),
        courseId: selectedCourse
      });
    }
  };

  const exportData = (type: string) => {
    // Implementation for data export
    toast({ title: "Export Started", description: `Exporting ${type} data...` });
  };

  const totalStudents = (analytics as any)?.totalStudents || 0;
  const activeStudents = (analytics as any)?.activeStudents || 0;
  const levelDistribution = (analytics as any)?.levelDistribution || [];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold text-golden-400 mb-4 flex items-center justify-center gap-3">
              <Crown className="w-10 h-10" />
              Athenaeum Administration
            </h1>
            <p className="text-cosmic-400">Complete platform management and curriculum control</p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-golden-400 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Total Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cosmic-50">{totalStudents}</p>
                <p className="text-sm text-cosmic-400">{activeStudents} active</p>
              </CardContent>
            </Card>

            <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-mystical-400 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Total Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cosmic-50">{(courses as any[]).length}</p>
                <p className="text-sm text-cosmic-400">across both wings</p>
              </CardContent>
            </Card>

            <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-ethereal-400 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Completion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cosmic-50">
                  {totalStudents > 0 ? Math.round(((activeStudents / totalStudents) * 100)) : 0}%
                </p>
                <p className="text-sm text-cosmic-400">student engagement</p>
              </CardContent>
            </Card>

            <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-golden-400 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Level Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cosmic-50">{levelDistribution.length}</p>
                <p className="text-sm text-cosmic-400">active levels</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Admin Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-7 lg:w-fit">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Courses
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Calendar
              </TabsTrigger>
              <TabsTrigger value="enrollments" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Enrollments
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-mystical-300">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-cosmic-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <UserPlus className="w-5 h-5 text-green-400" />
                          <span className="text-cosmic-200">New student registered</span>
                        </div>
                        <Badge variant="outline">2 hours ago</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-cosmic-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-5 h-5 text-blue-400" />
                          <span className="text-cosmic-200">Course SE-101 completed</span>
                        </div>
                        <Badge variant="outline">5 hours ago</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-cosmic-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Award className="w-5 h-5 text-golden-400" />
                          <span className="text-cosmic-200">Badge "Mystic Scholar" earned</span>
                        </div>
                        <Badge variant="outline">1 day ago</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-ethereal-300">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      onClick={() => setShowCreateCourse(true)}
                      className="w-full bg-mystical-600 hover:bg-mystical-500"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Course
                    </Button>
                    <Button 
                      onClick={() => setShowCreateUser(true)}
                      className="w-full bg-ethereal-600 hover:bg-ethereal-500"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add New User
                    </Button>
                    <Button 
                      onClick={() => setShowBulkEnroll(true)}
                      className="w-full bg-golden-600 hover:bg-golden-500"
                    >
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Bulk Enrollment
                    </Button>
                    <Button 
                      onClick={() => exportData("all")}
                      variant="outline"
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export All Data
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-400 w-4 h-4" />
                    <Input
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={filterWing} onValueChange={setFilterWing}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by wing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Wings</SelectItem>
                      <SelectItem value="sanctum">Sanctum</SelectItem>
                      <SelectItem value="orrery">Orrery</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterLevel} onValueChange={setFilterLevel}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="100">Level 100</SelectItem>
                      <SelectItem value="200">Level 200</SelectItem>
                      <SelectItem value="300">Level 300</SelectItem>
                      <SelectItem value="400">Level 400</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setShowCreateCourse(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Course
                  </Button>
                  <Button variant="outline" onClick={() => exportData("courses")}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-mystical-300">Course Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Wing</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>XP Reward</TableHead>
                        <TableHead>Enrolled</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCourses.map((course: any) => (
                        <TableRow key={course.id}>
                          <TableCell>
                            <Badge variant={course.wing === "sanctum" ? "default" : "secondary"}>
                              {course.code}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{course.title}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={course.wing === "sanctum" ? "text-mystical-400" : "text-ethereal-400"}
                            >
                              {course.wing === "sanctum" ? "Sanctum" : "Orrery"}
                            </Badge>
                          </TableCell>
                          <TableCell>{course.level}</TableCell>
                          <TableCell>{course.xpReward} XP</TableCell>
                          <TableCell>
                            {(enrollments as any[]).filter((e: any) => e.courseId === course.id).length}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setSelectedCourse(course.id);
                                  setShowCreateLesson(true);
                                }}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => cloneCourseMutation.mutate(course.id)}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar" className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-400 w-4 h-4" />
                    <Input
                      placeholder="Search events..."
                      value={eventSearchTerm}
                      onChange={(e) => setEventSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={eventFilterCategory} onValueChange={setEventFilterCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="ritual">Ritual</SelectItem>
                      <SelectItem value="seasonal">Seasonal</SelectItem>
                      <SelectItem value="lunar">Lunar</SelectItem>
                      <SelectItem value="planetary">Planetary</SelectItem>
                      <SelectItem value="cosmic">Cosmic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setShowCreateEvent(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Event
                  </Button>
                  <Button variant="outline" onClick={() => exportData("events")}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-mystical-300 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Cosmic Calendar Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Recurring</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEvents.map((event: any) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.title}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={
                                event.category === "ritual" ? "text-mystical-400" :
                                event.category === "seasonal" ? "text-ethereal-400" :
                                event.category === "lunar" ? "text-silver-star" :
                                event.category === "planetary" ? "text-golden-rune" :
                                "text-cosmic-blue"
                              }
                            >
                              {event.category}
                            </Badge>
                          </TableCell>
                          <TableCell>{event.startDate || "Not set"}</TableCell>
                          <TableCell>{event.endDate || "Same day"}</TableCell>
                          <TableCell>
                            <Badge variant={event.isRecurring === "true" ? "default" : "secondary"}>
                              {event.isRecurring === "true" ? "Yes" : "No"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEditEvent(event)}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleDeleteEvent(event.id)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cosmic-400 w-4 h-4" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setShowCreateUser(true)}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    New User
                  </Button>
                  <Button variant="outline" onClick={() => exportData("users")}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-ethereal-300">User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>XP</TableHead>
                        <TableHead>Path</TableHead>
                        <TableHead>Enrolled</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user: any) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            {user.firstName} {user.lastName}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{user.level || "Neophyte"}</Badge>
                          </TableCell>
                          <TableCell>{user.xp || 0} XP</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{user.elementalPath || "Mixed"}</Badge>
                          </TableCell>
                          <TableCell>
                            {(enrollments as any[]).filter((e: any) => e.userId === user.id).length}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <GraduationCap className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enrollments Tab */}
            <TabsContent value="enrollments" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-serif font-bold text-golden-400">Enrollment Management</h3>
                <Button onClick={() => setShowBulkEnroll(true)}>
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Bulk Enroll
                </Button>
              </div>

              <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-mystical-300">Active Enrollments</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Enrolled</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(enrollments as any[]).map((enrollment: any) => (
                        <TableRow key={enrollment.id}>
                          <TableCell className="font-medium">
                            {enrollment.user?.firstName} {enrollment.user?.lastName}
                          </TableCell>
                          <TableCell>
                            <Badge variant={enrollment.course?.wing === "sanctum" ? "default" : "secondary"}>
                              {enrollment.course?.code}
                            </Badge>
                            <span className="ml-2">{enrollment.course?.title}</span>
                          </TableCell>
                          <TableCell>{enrollment.progress || 0}%</TableCell>
                          <TableCell>
                            <Badge 
                              variant={enrollment.status === "completed" ? "default" : "outline"}
                              className={enrollment.status === "completed" ? "bg-green-600" : ""}
                            >
                              {enrollment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(enrollment.enrolledAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <RefreshCw className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-golden-400">Level Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {levelDistribution.map((level: any) => (
                        <div key={level.level} className="flex items-center justify-between">
                          <span className="text-cosmic-200">{level.level}</span>
                          <div className="flex items-center gap-3">
                            <div className="w-32 bg-cosmic-700 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-mystical-500 to-ethereal-500 h-2 rounded-full"
                                style={{ width: `${(level.count / totalStudents) * 100}%` }}
                              />
                            </div>
                            <span className="text-cosmic-400 w-8">{level.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-ethereal-400">Course Popularity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(courses as any[]).slice(0, 5).map((course: any) => {
                        const enrollmentCount = (enrollments as any[]).filter((e: any) => e.courseId === course.id).length;
                        return (
                          <div key={course.id} className="flex items-center justify-between">
                            <div>
                              <Badge variant={course.wing === "sanctum" ? "default" : "secondary"} className="mr-2">
                                {course.code}
                              </Badge>
                              <span className="text-cosmic-200 text-sm">{course.title}</span>
                            </div>
                            <span className="text-cosmic-400">{enrollmentCount} enrolled</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-golden-400">Platform Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-cosmic-200">Auto-enrollment for new courses</Label>
                      <p className="text-sm text-cosmic-400">Automatically enroll all students in new courses</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-cosmic-200">Email notifications</Label>
                      <p className="text-sm text-cosmic-400">Send email notifications for course completions</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-cosmic-200">Badge auto-awards</Label>
                      <p className="text-sm text-cosmic-400">Automatically award badges based on achievements</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Create Event Dialog */}
          <Dialog open={showCreateEvent} onOpenChange={setShowCreateEvent}>
            <DialogContent className="max-w-2xl bg-cosmic-800 border-golden-400/30">
              <DialogHeader>
                <DialogTitle className="text-golden-400 font-gothic text-xl">Create Cosmic Event</DialogTitle>
              </DialogHeader>
              <Form {...createEventForm}>
                <form onSubmit={createEventForm.handleSubmit(onCreateEvent)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={createEventForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cosmic-200">Event Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Full Moon Ritual" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createEventForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cosmic-200">Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ritual">Ritual</SelectItem>
                              <SelectItem value="seasonal">Seasonal</SelectItem>
                              <SelectItem value="lunar">Lunar</SelectItem>
                              <SelectItem value="planetary">Planetary</SelectItem>
                              <SelectItem value="cosmic">Cosmic</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={createEventForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-cosmic-200">Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="A powerful time for manifestation and spiritual awakening..."
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={createEventForm.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cosmic-200">Start Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createEventForm.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cosmic-200">End Date (Optional)</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={createEventForm.control}
                      name="festivalType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cosmic-200">Festival Type (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Samhain, Solstice, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createEventForm.control}
                      name="recurrencePattern"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cosmic-200">Recurrence Pattern</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select recurrence" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="annual">Annual</SelectItem>
                              <SelectItem value="lunar_cycle">Lunar Cycle</SelectItem>
                              <SelectItem value="seasonal">Seasonal</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="none">One-time Only</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={createEventForm.control}
                    name="isRecurring"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-cosmic-600 p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-cosmic-200 text-base">Recurring Event</FormLabel>
                          <div className="text-sm text-cosmic-400">
                            This event repeats according to the pattern above
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value === "true"}
                            onCheckedChange={(checked) => field.onChange(checked ? "true" : "false")}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowCreateEvent(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={createEventMutation.isPending}
                      className="bg-mystical-600 hover:bg-mystical-500"
                    >
                      {createEventMutation.isPending ? "Creating..." : "Create Event"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          {/* Edit Event Dialog */}
          <Dialog open={showEditEvent} onOpenChange={setShowEditEvent}>
            <DialogContent className="max-w-2xl bg-cosmic-800 border-golden-400/30">
              <DialogHeader>
                <DialogTitle className="text-golden-400 font-gothic text-xl">Edit Cosmic Event</DialogTitle>
              </DialogHeader>
              <Form {...editEventForm}>
                <form onSubmit={editEventForm.handleSubmit(onUpdateEvent)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={editEventForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cosmic-200">Event Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Full Moon Ritual" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={editEventForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cosmic-200">Category</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ritual">Ritual</SelectItem>
                              <SelectItem value="seasonal">Seasonal</SelectItem>
                              <SelectItem value="lunar">Lunar</SelectItem>
                              <SelectItem value="planetary">Planetary</SelectItem>
                              <SelectItem value="cosmic">Cosmic</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={editEventForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-cosmic-200">Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="A powerful time for manifestation and spiritual awakening..."
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={editEventForm.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cosmic-200">Start Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={editEventForm.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cosmic-200">End Date (Optional)</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={editEventForm.control}
                      name="festivalType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cosmic-200">Festival Type (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Samhain, Solstice, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={editEventForm.control}
                      name="recurrencePattern"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-cosmic-200">Recurrence Pattern</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select recurrence" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="annual">Annual</SelectItem>
                              <SelectItem value="lunar_cycle">Lunar Cycle</SelectItem>
                              <SelectItem value="seasonal">Seasonal</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="none">One-time Only</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={editEventForm.control}
                    name="isRecurring"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-cosmic-600 p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-cosmic-200 text-base">Recurring Event</FormLabel>
                          <div className="text-sm text-cosmic-400">
                            This event repeats according to the pattern above
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value === "true"}
                            onCheckedChange={(checked) => field.onChange(checked ? "true" : "false")}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowEditEvent(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={updateEventMutation.isPending}
                      className="bg-mystical-600 hover:bg-mystical-500"
                    >
                      {updateEventMutation.isPending ? "Updating..." : "Update Event"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          {/* Create Course Dialog */}
          <Dialog open={showCreateCourse} onOpenChange={setShowCreateCourse}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-mystical-300">Create New Course</DialogTitle>
              </DialogHeader>
              <Form {...createCourseForm}>
                <form onSubmit={createCourseForm.handleSubmit(onCreateCourse)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={createCourseForm.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course Code</FormLabel>
                          <FormControl>
                            <Input placeholder="SE-101" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createCourseForm.control}
                      name="wing"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Wing</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a wing" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="sanctum">Sanctum of Hidden Echoes</SelectItem>
                              <SelectItem value="orrery">Orrery of Obscured Realms</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={createCourseForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Introduction to Sacred Geometry" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={createCourseForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Explore the mystical principles of sacred geometry..." 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={createCourseForm.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Level</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="100" 
                              {...field} 
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createCourseForm.control}
                      name="xpReward"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>XP Reward</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="200" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <Button variant="outline" type="button" onClick={() => setShowCreateCourse(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={createCourseMutation.isPending}>
                      {createCourseMutation.isPending ? "Creating..." : "Create Course"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          {/* Create User Dialog */}
          <Dialog open={showCreateUser} onOpenChange={setShowCreateUser}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-ethereal-300">Create New User</DialogTitle>
              </DialogHeader>
              <Form {...createUserForm}>
                <form onSubmit={createUserForm.handleSubmit(onCreateUser)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={createUserForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createUserForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={createUserForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={createUserForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="instructor">Instructor</SelectItem>
                              <SelectItem value="admin">Administrator</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createUserForm.control}
                      name="elementalPath"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Elemental Path</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select path" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="earth">Earth</SelectItem>
                              <SelectItem value="water">Water</SelectItem>
                              <SelectItem value="air">Air</SelectItem>
                              <SelectItem value="fire">Fire</SelectItem>
                              <SelectItem value="aether">Aether</SelectItem>
                              <SelectItem value="mixed">Mixed</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <Button variant="outline" type="button" onClick={() => setShowCreateUser(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={createUserMutation.isPending}>
                      {createUserMutation.isPending ? "Creating..." : "Create User"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          {/* Create Lesson Dialog */}
          <Dialog open={showCreateLesson} onOpenChange={setShowCreateLesson}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-golden-400">Add Lesson to Course</DialogTitle>
              </DialogHeader>
              <Form {...createLessonForm}>
                <form onSubmit={createLessonForm.handleSubmit(onCreateLesson)} className="space-y-6">
                  <FormField
                    control={createLessonForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lesson Title</FormLabel>
                        <FormControl>
                          <Input placeholder="The Sacred Circle" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={createLessonForm.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="In this lesson, we explore the mystical properties of the sacred circle..." 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={createLessonForm.control}
                      name="order"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lesson Order</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="1" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={createLessonForm.control}
                      name="xpReward"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>XP Reward</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="25" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <Button variant="outline" type="button" onClick={() => setShowCreateLesson(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={createLessonMutation.isPending}>
                      {createLessonMutation.isPending ? "Creating..." : "Create Lesson"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}