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
import FourPillars from "@/pages/four-pillars";
import Aionara from "@/pages/aionara";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/remember" component={MainContent} />
      <Route path="/grimoires" component={Grimoires} />
      <Route path="/grimoires/create" component={CreateGrimoire} />
      <Route path="/grimoires/:id" component={GrimoireDetail} />
      <Route path="/grimoires/:id/entries/create" component={CreateEntry} />
      <Route path="/grimoires/:id/entries/:entryId" component={EntryDetail} />
      <Route path="/astro-calendar" component={AstroCalendar} />
      <Route path="/four-pillars" component={FourPillars} />
      <Route path="/aionara" component={Aionara} />
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
