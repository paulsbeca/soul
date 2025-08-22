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
import Pillar1CulturalRespect from "@/pages/pillar1-cultural-respect";
import Pillar2CosmicVision from "@/pages/pillar2-cosmic-vision";
import Pillar3AncestralStewardship from "@/pages/pillar3-ancestral-stewardship";
import Pillar4MagicScience from "@/pages/pillar4-magic-science";
import Aionara from "@/pages/aionara";
import Alchemy from "@/pages/alchemy";
import DeityCodex from "@/pages/deity-codex";
import AthenaeumEnrollmentGate from "@/pages/athenaeum-enrollment-gate";
import AthenaeumSimple from "@/pages/athenaeum-simple";
import AthenaeumLogin from "@/pages/athenaeum-login";
import AthenaeumAdmin from "@/pages/athenaeum-admin";
import AthenaeumStudentLogin from "@/pages/athenaeum-student-login";
import AthenaeumStudent from "@/pages/athenaeum-student";
import AthenaeumTeacher from "@/pages/athenaeum-teacher";
// Athenaeum course imports temporarily removed for simplicity
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
      <Route path="/pillar1-cultural-respect" component={Pillar1CulturalRespect} />
      <Route path="/pillar2-cosmic-vision" component={Pillar2CosmicVision} />
      <Route path="/pillar3-ancestral-stewardship" component={Pillar3AncestralStewardship} />
      <Route path="/pillar4-magic-science" component={Pillar4MagicScience} />
      <Route path="/aionara" component={Aionara} />
      <Route path="/alchemy" component={Alchemy} />
      <Route path="/deity-codex" component={DeityCodex} />
      <Route path="/athenaeum/enrollment" component={AthenaeumEnrollmentGate} />
      <Route path="/athenaeum/login" component={AthenaeumLogin} />
      <Route path="/athenaeum/login-portal" component={AthenaeumStudentLogin} />
      <Route path="/athenaeum/student" component={AthenaeumStudent} />
      <Route path="/athenaeum/teacher" component={AthenaeumTeacher} />
      <Route path="/admin" component={AthenaeumAdmin} />
      <Route path="/athenaeum" component={AthenaeumSimple} />
      {/* Athenaeum course routes temporarily removed for simplicity */}
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
