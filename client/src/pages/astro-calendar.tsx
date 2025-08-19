import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ArrowLeft, Moon, Star, ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import mysticalChamberBg from "@assets/ChatGPT Image Aug 18, 2025, 12_54_24 AM_1755531868254.webp";

interface MoonPhaseData {
  phase: string;
  illumination: string;
  phaseName: string;
  phaseIcon: string;
  guidance: string;
}

interface AstroEvent {
  id: string;
  date: string;
  title: string;
  category: 'planetary' | 'lunar' | 'ritual' | 'cosmic' | 'seasonal';
  description: string;
  time?: string;
  festivalType?: string;
  ritualFlow?: any[];
  yearlyVariables?: any;
  tags?: string[];
}

const phaseNames: { [key: string]: string } = {
  new: "New Moon",
  waxing_crescent: "Waxing Crescent", 
  first_quarter: "First Quarter",
  waxing_gibbous: "Waxing Gibbous",
  full: "Full Moon",
  waning_gibbous: "Waning Gibbous",
  last_quarter: "Last Quarter",
  waning_crescent: "Waning Crescent",
};

const phaseIcons: { [key: string]: string } = {
  new: "🌑",
  waxing_crescent: "🌒",
  first_quarter: "🌓",
  waxing_gibbous: "🌔",
  full: "🌕",
  waning_gibbous: "🌖",
  last_quarter: "🌗",
  waning_crescent: "🌘",
};

const phaseGuidance: { [key: string]: string } = {
  new: "Perfect time for new beginnings, setting intentions, and planting seeds of manifestation. The dark moon offers deep introspection.",
  waxing_crescent: "Energy builds for growth and action. Focus on taking first steps toward your spiritual goals and nurturing new practices.",
  first_quarter: "A powerful time for making decisions and overcoming obstacles. Channel the growing lunar energy into decisive action.",
  waxing_gibbous: "Refine and adjust your spiritual practices. The building energy supports persistence and fine-tuning your intentions.",
  full: "Peak spiritual energy! Perfect for manifestation, healing rituals, and releasing what no longer serves. Honor the divine feminine.",
  waning_gibbous: "Time for gratitude and sharing wisdom. Reflect on recent growth and express thankfulness for spiritual insights received.",
  last_quarter: "Release and let go. Clear away negativity, old patterns, and spiritual clutter. Forgiveness work is especially powerful now.",
  waning_crescent: "Rest, reflection, and preparation for renewal. Honor the quiet wisdom within and prepare for the next cycle of growth.",
};

export default function AstroCalendar() {
  const [, setLocation] = useLocation();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Mock moon phase data - in real implementation, this would come from an API
  const getMoonPhase = (date: string): MoonPhaseData => {
    const phases = ['new', 'waxing_crescent', 'first_quarter', 'waxing_gibbous', 'full', 'waning_gibbous', 'last_quarter', 'waning_crescent'];
    const dayOfYear = new Date(date).getDate() % 8;
    const phase = phases[dayOfYear];
    
    return {
      phase,
      illumination: Math.floor(Math.random() * 100).toString(),
      phaseName: phaseNames[phase],
      phaseIcon: phaseIcons[phase],
      guidance: phaseGuidance[phase]
    };
  };

  // Fetch Sacred Living Year events from backend
  const { data: sacredEvents, isLoading: eventsLoading } = useQuery({
    queryKey: ['/api/sacred-events'],
  });

  const { data: yearlyConfig } = useQuery({
    queryKey: ['/api/yearly-config', year.toString()],
  });

  // Convert Sacred Living Year events to calendar format
  const getAstroEvents = (): AstroEvent[] => {
    const events: AstroEvent[] = [];
    
    // Add some current celestial events
    events.push(
      {
        id: 'lunar-1',
        date: new Date().toISOString().split('T')[0],
        title: 'Full Moon in Sagittarius',
        category: 'lunar',
        description: 'A powerful time for manifestation and releasing what no longer serves.',
        time: '3:47 AM'
      },
      {
        id: 'planetary-1', 
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        title: 'Venus conjunct Jupiter',
        category: 'planetary',
        description: 'Cosmic alignment bringing love, abundance, and spiritual expansion.',
        time: '7:22 PM'
      }
    );

    // Add Sacred Living Year events if available
    if (sacredEvents && Array.isArray(sacredEvents)) {
      sacredEvents.forEach((event: any) => {
        if (event.startDate) {
          // Convert MM-DD format to current year date
          let eventDate = event.startDate;
          if (event.startDate.includes('-') && !event.startDate.includes(year.toString())) {
            const [monthDay] = event.startDate.split(' ');
            if (monthDay.includes('-') && monthDay.length <= 5) {
              eventDate = `${year}-${monthDay}`;
            }
          }

          events.push({
            id: event.id,
            date: eventDate,
            title: event.title,
            category: event.category as 'seasonal' | 'ritual' | 'lunar',
            description: event.description || 'Sacred Living Year celebration',
            festivalType: event.festivalType,
            ritualFlow: event.ritualFlow,
            yearlyVariables: event.yearlyVariables,
            tags: event.tags
          });

          // Add end date event if multi-day
          if (event.endDate && event.endDate !== event.startDate) {
            let endEventDate = event.endDate;
            if (event.endDate.includes('-') && !event.endDate.includes(year.toString())) {
              const [monthDay] = event.endDate.split(' ');
              if (monthDay.includes('-') && monthDay.length <= 5) {
                endEventDate = `${year}-${monthDay}`;
              }
            }

            events.push({
              id: `${event.id}-end`,
              date: endEventDate,
              title: `${event.title} (Final Day)`,
              category: event.category as 'seasonal' | 'ritual' | 'lunar',
              description: `Final day of ${event.description}`,
              festivalType: event.festivalType,
              tags: event.tags
            });
          }
        }
      });
    }

    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const generateCalendarDays = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];

    // Previous month days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate.toISOString().split('T')[0],
        day: prevDate.getDate(),
        isCurrentMonth: false,
        isToday: false,
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      const today = new Date().toISOString().split('T')[0];
      
      days.push({
        date: dateString,
        day,
        isCurrentMonth: true,
        isToday: dateString === today,
      });
    }

    // Next month days to fill the grid
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: nextDate.toISOString().split('T')[0],
        day: nextDate.getDate(),
        isCurrentMonth: false,
        isToday: false,
      });
    }

    return days;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'planetary':
        return 'bg-golden-rune/20 text-golden-rune';
      case 'lunar':
        return 'bg-silver-star/20 text-silver-star';
      case 'ritual':
        return 'bg-shadow-purple/30 text-ethereal-white';
      case 'cosmic':
        return 'bg-deep-purple/30 text-ethereal-white';
      default:
        return 'bg-golden-rune/20 text-golden-rune';
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const moonPhase = getMoonPhase(selectedDate);
  const astroEvents = getAstroEvents();
  const selectedEvents = astroEvents.filter(event => event.date === selectedDate);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" }
  };

  return (
    <section 
      className="min-h-screen text-ethereal-white" 
      style={{
        backgroundImage: `url(${mysticalChamberBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      data-testid="astro-calendar-section"
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            {...fadeInUp}
          >
            <Button
              variant="ghost"
              onClick={() => setLocation("/remember")}
              className="mb-6 text-silver-star hover:text-golden-rune"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sacred Space
            </Button>
            
            <h1 className="font-gothic text-4xl md:text-5xl font-semibold mb-4 text-golden-rune" data-testid="astro-calendar-title">
              AstroCal - Cosmic Calendar
            </h1>
            <p className="text-xl text-silver-star/90 leading-relaxed max-w-3xl mx-auto" data-testid="astro-calendar-description">
              Track celestial cycles, planetary alignments, and sacred cosmic timing for your spiritual practice
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Calendar */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Card className="mystical-border bg-black/60 border-golden-rune/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-gothic text-2xl text-golden-rune flex items-center">
                      <CalendarIcon className="w-6 h-6 mr-2" />
                      {monthNames[month]} {year}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                        className="border-golden-rune/50 text-golden-rune hover:bg-golden-rune/10"
                        data-testid="button-prev-month"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                        className="border-golden-rune/50 text-golden-rune hover:bg-golden-rune/10"
                        data-testid="button-next-month"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Weekday Headers */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {weekdays.map((day) => (
                      <div key={day} className="text-center text-silver-star/80 font-medium py-2 text-sm">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {generateCalendarDays().map((day, index) => {
                      const dayEvents = astroEvents.filter(event => event.date === day.date);
                      const isSelected = day.date === selectedDate;
                      
                      return (
                        <div
                          key={`${day.date}-${index}`}
                          className={`
                            group relative min-h-[80px] p-2 rounded-lg border cursor-pointer transition-all
                            ${day.isCurrentMonth 
                              ? 'border-golden-rune/30 hover:border-golden-rune/60' 
                              : 'border-silver-star/20 opacity-50'
                            }
                            ${day.isToday 
                              ? 'bg-gradient-to-br from-golden-rune/20 to-shadow-purple/20 border-golden-rune' 
                              : 'hover:bg-black/40'
                            }
                            ${isSelected 
                              ? 'bg-gradient-to-br from-shadow-purple/30 to-deep-purple/30 border-shadow-purple' 
                              : ''
                            }
                          `}
                          onClick={() => setSelectedDate(day.date)}
                          data-testid={`calendar-day-${day.date}`}
                        >
                          <div className={`text-sm font-medium mb-1 ${
                            day.isCurrentMonth ? 'text-ethereal-white' : 'text-silver-star/60'
                          }`}>
                            {day.day}
                          </div>

                          {/* Events */}
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map((event, i) => (
                              <div
                                key={event.id}
                                className={`text-xs px-1 py-0.5 rounded truncate ${getCategoryColor(event.category)}`}
                                title={event.title}
                              >
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-silver-star/60 px-1">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>

                          {/* Moon Phase Indicator */}
                          {day.isCurrentMonth && (
                            <div className="absolute bottom-1 right-1 text-xs opacity-60">
                              {getMoonPhase(day.date).phaseIcon}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-golden-rune/50 rounded"></div>
                      <span className="text-silver-star/70">Planetary Events</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-silver-star/50 rounded"></div>
                      <span className="text-silver-star/70">Lunar Phases</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-shadow-purple/50 rounded"></div>
                      <span className="text-silver-star/70">Ritual Times</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-deep-purple/50 rounded"></div>
                      <span className="text-silver-star/70">Cosmic Events</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {/* Lunar Guidance */}
              <Card className="mystical-border bg-black/60 border-golden-rune/30">
                <CardHeader>
                  <CardTitle className="font-gothic text-lg text-golden-rune flex items-center">
                    <Moon className="w-5 h-5 mr-2" />
                    Lunar Guidance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-4xl bg-gradient-to-br from-silver-star/20 to-golden-rune/20 border border-golden-rune/30">
                      {moonPhase.phaseIcon}
                    </div>
                    <p className="text-silver-star font-medium">{moonPhase.phaseName}</p>
                    <p className="text-silver-star/60 text-sm">{selectedDate}</p>
                    <p className="text-golden-rune/80 text-xs mt-1">{moonPhase.illumination}% illuminated</p>
                  </div>
                  <div className="p-3 bg-shadow-purple/20 rounded-lg border border-shadow-purple/30">
                    <p className="text-sm text-silver-star/90">
                      {moonPhase.guidance}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Celestial Insights */}
              <Card className="mystical-border bg-black/60 border-golden-rune/30">
                <CardHeader>
                  <CardTitle className="font-gothic text-lg text-golden-rune flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Celestial Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-silver-star/80">Sun Sign</span>
                      <span className="text-golden-rune font-medium">♐ Sagittarius</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-silver-star/80">Mercury</span>
                      <span className="text-silver-star font-medium">♑ Capricorn</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-silver-star/80">Venus</span>
                      <span className="text-ethereal-white font-medium">♏ Scorpio</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-silver-star/80">Mars</span>
                      <span className="text-golden-rune font-medium">♌ Leo</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-deep-purple/20 rounded-lg border border-deep-purple/30">
                    <p className="text-sm text-silver-star/90">
                      The cosmic energies align for deep mystical contemplation and spiritual growth. Jupiter's influence enhances your intuitive abilities.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Today's Events */}
              {selectedEvents.length > 0 && (
                <Card className="mystical-border bg-black/60 border-golden-rune/30">
                  <CardHeader>
                    <CardTitle className="font-gothic text-lg text-golden-rune">
                      Events for {new Date(selectedDate).toLocaleDateString()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedEvents.map((event) => (
                        <div key={event.id} className="p-3 rounded-lg bg-shadow-purple/20 border border-shadow-purple/30">
                          <div className="flex items-center justify-between mb-2">
                            <Badge className={getCategoryColor(event.category)}>
                              {event.category}
                            </Badge>
                            {event.time && (
                              <span className="text-xs text-silver-star/60">{event.time}</span>
                            )}
                          </div>
                          <h4 className="font-gothic text-ethereal-white font-medium mb-1">{event.title}</h4>
                          <p className="text-sm text-silver-star/80">{event.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}