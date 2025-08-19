import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Moon, Sun, Star, Flame, Leaf, Snowflake, Crown, Clock, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import backgroundImage from "@assets/background_1755498699765.webp";
import type { SacredEvent, YearlyConfiguration } from "@shared/schema";

const seasonColors = {
  winter: "from-blue-900/50 to-indigo-800/50",
  spring: "from-green-700/50 to-emerald-600/50", 
  summer: "from-yellow-600/50 to-orange-500/50",
  fall: "from-orange-700/50 to-red-600/50"
};

const festivalIcons = {
  yule: Snowflake,
  ostara: Leaf,
  beltane: Flame,
  solstice: Sun,
  lunar: Moon,
  seasonal: Star
};

export default function SacredCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<SacredEvent | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const { data: sacredEvents = [], isLoading: eventsLoading } = useQuery<SacredEvent[]>({
    queryKey: ['/api/sacred-events']
  });

  const { data: yearlyConfig } = useQuery<YearlyConfiguration>({
    queryKey: ['/api/yearly-configurations', new Date().getFullYear().toString()]
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" }
  };

  const categorizedEvents = {
    seasonal: sacredEvents.filter(event => event.category === 'seasonal'),
    lunar: sacredEvents.filter(event => event.category === 'lunar'),
    cosmic: sacredEvents.filter(event => event.category === 'cosmic'),
    ritual: sacredEvents.filter(event => event.category === 'ritual')
  };

  const renderEventCard = (event: SacredEvent) => {
    const IconComponent = festivalIcons[event.festivalType as keyof typeof festivalIcons] || Star;
    
    return (
      <motion.div
        key={event.id}
        className="mystical-border rounded-lg grimoire-texture p-4 cursor-pointer hover:scale-105 transition-all duration-300"
        onClick={() => setSelectedEvent(event)}
        whileHover={{ y: -3 }}
        data-testid={`card-event-${event.id}`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <IconComponent className="w-6 h-6 text-golden-rune mr-3" />
            <div>
              <h3 className="text-lg font-bold text-ethereal-white">{event.title}</h3>
              <p className="text-sm text-silver-star/80">{event.startDate} - {event.endDate}</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-deep-purple/30 text-silver-star">
            {event.category}
          </Badge>
        </div>
        
        <p className="text-silver-star/90 text-sm mb-3 line-clamp-2">
          {event.description}
        </p>
        
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {event.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs border-silver-star/30 text-silver-star/70">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  if (selectedEvent) {
    const IconComponent = festivalIcons[selectedEvent.festivalType as keyof typeof festivalIcons] || Star;
    
    return (
      <section 
        className="min-h-screen text-ethereal-white"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
        data-testid="event-detail-section"
      >
        <div className="absolute inset-0 bg-black/70"></div>
        
        <div className="relative z-10 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div {...fadeInUp} className="mb-8">
              <Button 
                onClick={() => setSelectedEvent(null)}
                variant="ghost" 
                className="text-golden-rune hover:text-silver-star"
                data-testid="button-back-to-calendar"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Sacred Calendar
              </Button>
            </motion.div>

            <motion.div 
              className="mystical-border p-8 rounded-lg grimoire-texture"
              {...fadeInUp}
            >
              <div className="flex items-center mb-6">
                <IconComponent className="w-8 h-8 text-golden-rune mr-4" />
                <div>
                  <h1 className="font-gothic text-3xl font-bold text-golden-rune mb-2">
                    {selectedEvent.title}
                  </h1>
                  <p className="text-silver-star/80 text-lg">
                    {selectedEvent.startDate} - {selectedEvent.endDate}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-black/40 mystical-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-golden-rune text-sm">Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-ethereal-white capitalize">{selectedEvent.category}</p>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 mystical-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-golden-rune text-sm">Recurrence</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-ethereal-white">
                      {selectedEvent.isRecurring === "true" ? "Annual" : "One-time"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 mystical-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-golden-rune text-sm">Festival Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-ethereal-white capitalize">
                      {selectedEvent.festivalType || "General"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-golden-rune mb-3">Description</h3>
                  <p className="text-silver-star/90 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {selectedEvent.ritualFlow && (
                  <div>
                    <h3 className="text-xl font-semibold text-golden-rune mb-3">Ritual Flow</h3>
                    <div className="bg-black/30 rounded-lg p-4 mystical-border">
                      <pre className="text-silver-star/90 whitespace-pre-wrap font-mono text-sm">
                        {JSON.stringify(selectedEvent.ritualFlow, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                {selectedEvent.yearlyVariables && (
                  <div>
                    <h3 className="text-xl font-semibold text-golden-rune mb-3">Yearly Variables</h3>
                    <div className="bg-black/30 rounded-lg p-4 mystical-border">
                      <pre className="text-silver-star/90 whitespace-pre-wrap font-mono text-sm">
                        {JSON.stringify(selectedEvent.yearlyVariables, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-golden-rune mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-deep-purple/30 text-silver-star">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="min-h-screen text-ethereal-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      data-testid="sacred-calendar-section"
    >
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h1 className="font-gothic text-4xl md:text-6xl font-semibold mb-6 text-golden-rune" data-testid="calendar-title">
              Sacred Living Year
            </h1>
            <p className="text-xl md:text-2xl text-silver-star/90 leading-relaxed max-w-3xl mx-auto" data-testid="calendar-description">
              A perpetual ritual almanac of remembrance and becoming
            </p>
          </motion.div>

          {/* Year Configuration */}
          {yearlyConfig && (
            <motion.div 
              className="mb-12 mystical-border rounded-xl p-6 grimoire-texture"
              {...fadeInUp}
            >
              <h2 className="text-2xl font-semibold text-golden-rune mb-4 flex items-center">
                <Crown className="mr-3 w-6 h-6" />
                {yearlyConfig.year} - Year Configuration
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="text-golden-rune font-semibold mb-2">Zodiac Animal</h3>
                  <p className="text-ethereal-white text-lg">{yearlyConfig.zodiacAnimal}</p>
                  <p className="text-silver-star/80">{yearlyConfig.zodiacElement} Element</p>
                </div>
                <div className="text-center">
                  <h3 className="text-golden-rune font-semibold mb-2">Intention Word</h3>
                  <p className="text-ethereal-white text-xl font-semibold">{yearlyConfig.intentionWord}</p>
                </div>
                <div className="text-center">
                  <h3 className="text-golden-rune font-semibold mb-2">Lunar New Year</h3>
                  <p className="text-ethereal-white text-lg">{yearlyConfig.lunarNewYear}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Sacred Events Tabs */}
          <motion.div {...fadeInUp}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-black/50 mystical-border">
                <TabsTrigger 
                  value="overview" 
                  className="text-silver-star data-[state=active]:text-golden-rune data-[state=active]:bg-deep-purple/30"
                  data-testid="tab-overview"
                >
                  <Calendar className="mr-2 w-4 h-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="seasonal" 
                  className="text-silver-star data-[state=active]:text-golden-rune data-[state=active]:bg-deep-purple/30"
                  data-testid="tab-seasonal"
                >
                  <Leaf className="mr-2 w-4 h-4" />
                  Seasonal
                </TabsTrigger>
                <TabsTrigger 
                  value="lunar" 
                  className="text-silver-star data-[state=active]:text-golden-rune data-[state=active]:bg-deep-purple/30"
                  data-testid="tab-lunar"
                >
                  <Moon className="mr-2 w-4 h-4" />
                  Lunar
                </TabsTrigger>
                <TabsTrigger 
                  value="cosmic" 
                  className="text-silver-star data-[state=active]:text-golden-rune data-[state=active]:bg-deep-purple/30"
                  data-testid="tab-cosmic"
                >
                  <Star className="mr-2 w-4 h-4" />
                  Cosmic
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sacredEvents.slice(0, 9).map(renderEventCard)}
                </div>
              </TabsContent>

              <TabsContent value="seasonal" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categorizedEvents.seasonal.map(renderEventCard)}
                </div>
              </TabsContent>

              <TabsContent value="lunar" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categorizedEvents.lunar.map(renderEventCard)}
                </div>
              </TabsContent>

              <TabsContent value="cosmic" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categorizedEvents.cosmic.map(renderEventCard)}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            className="text-center mt-16"
            {...fadeInUp}
          >
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/astro-calendar">
                <Button 
                  variant="outline" 
                  className="border-silver-star/50 text-silver-star hover:bg-silver-star/10"
                  data-testid="button-astro-calendar"
                >
                  <Clock className="mr-2 w-4 h-4" />
                  View AstroCal
                </Button>
              </Link>
              <Link href="/grimoires">
                <Button 
                  variant="outline" 
                  className="border-silver-star/50 text-silver-star hover:bg-silver-star/10"
                  data-testid="button-grimoires"
                >
                  <Calendar className="mr-2 w-4 h-4" />
                  Document in Grimoire
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}