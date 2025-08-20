import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/landing";
import MainContent from "@/pages/main-content";
import Grimoires from "@/pages/grimoires";
import CreateGrimoire from "@/pages/create-grimoire";
import GrimoireDetail from "@/pages/grimoire-detail";
import CreateEntry from "@/pages/create-entry";
import EntryDetail from "@/pages/entry-detail";
import AstroCalendar from "@/pages/astro-calendar";
import SacredCalendar from "@/pages/sacred-calendar";
import FourPillars from "@/pages/four-pillars";
import Aionara from "@/pages/aionara";
import Alchemy from "@/pages/alchemy";
import DeityCodex from "@/pages/deity-codex";
import AthenaeumHome from "@/pages/athenaeum-home";
import AthenaeumCourses from "@/pages/athenaeum-courses";
import AthenaeumCourseDetail from "@/pages/athenaeum-course-detail";
import AthenaeumProgress from "@/pages/athenaeum-progress";
import AthenaeumCertificates from "@/pages/athenaeum-certificates";
import AthenaeumAdmin from "@/pages/athenaeum-admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/remember" component={MainContent} />
      <Route path="/grimoires" component={Grimoires} />
      <Route path="/grimoires/create" component={CreateGrimoire} />
      <Route path="/grimoires/:id" component={GrimoireDetail} />
      <Route path="/grimoires/:grimoireId/create-entry" component={CreateEntry} />
      <Route path="/grimoires/:id/entries/:entryId" component={EntryDetail} />
      <Route path="/astro-calendar" component={AstroCalendar} />
      <Route path="/sacred-calendar" component={SacredCalendar} />
      <Route path="/four-pillars" component={FourPillars} />
      <Route path="/aionara" component={Aionara} />
      <Route path="/alchemy" component={Alchemy} />
      <Route path="/deity-codex" component={DeityCodex} />
      <Route path="/athenaeum" component={AthenaeumHome} />
      <Route path="/athenaeum/courses" component={AthenaeumCourses} />
      <Route path="/athenaeum/courses/:id" component={AthenaeumCourseDetail} />
      <Route path="/athenaeum/progress" component={AthenaeumProgress} />
      <Route path="/athenaeum/certificates" component={AthenaeumCertificates} />
      <Route path="/athenaeum/admin" component={AthenaeumAdmin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
