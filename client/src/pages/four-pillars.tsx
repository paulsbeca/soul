import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";
import backgroundImage from "@assets/background_1755498699765.webp";
import { CulturalRespectIcon, CosmicVisionIcon, AncestralStewardshipIcon, MagicScienceIcon } from "@/components/pillar-icons";

interface Pillar {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  glowColor: string;
  bgGradient: string;
}

const pillars: Pillar[] = [
  {
    id: "cultural-respect",
    icon: CulturalRespectIcon,
    title: "Cultural Respect",
    subtitle: "Honoring what was erased.",
    description: "We stand against appropriation, assimilation, and erasure. We protect Indigenous wisdom, sacred practices, and ancestral languages.",
    glowColor: "rgba(16, 185, 129, 0.6)", // emerald green
    bgGradient: "from-emerald-900/20 to-emerald-600/10"
  },
  {
    id: "cosmic-vision",
    icon: CosmicVisionIcon,
    title: "Cosmic Vision",
    subtitle: "Remembering our place in the universe.",
    description: "The cosmos is within us. Astrology, Christ Consciousness, and celestial cycles guide us to soul remembrance.",
    glowColor: "rgba(139, 69, 199, 0.6)", // violet
    bgGradient: "from-violet-900/20 to-purple-600/10"
  },
  {
    id: "ancestral-stewardship",
    icon: AncestralStewardshipIcon,
    title: "Ancestral Stewardship",
    subtitle: "Time is a sacred inheritance.",
    description: "We honor our ancestors, heal the past, and protect the future. Remembering is resistance.",
    glowColor: "rgba(245, 158, 11, 0.6)", // amber/gold
    bgGradient: "from-amber-900/20 to-yellow-600/10"
  },
  {
    id: "magic-science",
    icon: MagicScienceIcon,
    title: "Integration of Magic & Science",
    subtitle: "The false divide ends here.",
    description: "We bridge spellwork and science, crystals and physics, ritual and psychology—building a new renaissance.",
    glowColor: "rgba(59, 130, 246, 0.6)", // electric blue
    bgGradient: "from-blue-900/20 to-cyan-600/10"
  }
];

export default function FourPillars() {
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const [visitedPillars, setVisitedPillars] = useState<Set<string>>(new Set());
  const [, setLocation] = useLocation();

  const handlePillarClick = (pillarId: string, index: number) => {
    // Navigate directly to the pillar page
    const routes = [
      '/pillar1-cultural-respect',
      '/pillar2-cosmic-vision', 
      '/pillar3-ancestral-stewardship',
      '/pillar4-magic-science'
    ];
    setLocation(routes[index]);
  };

  return (
    <section 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      data-testid="four-pillars-section"
    >
      {/* Dark overlay for mystical atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
      
      {/* Navigation */}
      <nav className="relative z-50 p-6">
        <Link 
          href="/"
          className="inline-flex items-center text-golden-rune hover:text-silver-star transition-colors group"
          data-testid="link-back-home"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-[-2px] transition-transform" />
          Return to Sacred Remembering
        </Link>
      </nav>
      
      {/* Starfield effect */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-silver-star rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="font-gothic text-5xl md:text-6xl text-golden-rune mb-6">
            The Four Pillars
          </h1>
          <p className="text-xl text-silver-star/80 max-w-3xl mx-auto">
            Welcome to the cosmic temple. Four massive pillars rise from the starry depths, 
            each inscribed with sacred truths that guide our mystical journey.
          </p>
        </motion.div>

        {/* Temple Invocation */}
        <motion.div
          className="text-center mb-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="relative p-8 rounded-lg border border-golden-rune/30 bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-sm">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-golden-rune/5 to-transparent"></div>
            
            <div className="relative z-10">
              <h2 className="font-gothic text-3xl md:text-4xl text-golden-rune mb-8">
                The Temple Invocation of Jakintza Ruha
              </h2>
              
              <div className="text-silver-star/90 leading-relaxed space-y-6 text-left max-w-3xl mx-auto">
                <p className="text-center italic text-lg mb-8">
                  We gather beneath the four pillars,<br/>
                  where earth, sky, time, and spirit meet.<br/>
                  We stand in remembrance, in resistance, in wonder.<br/>
                  We stand in the temple of wisdom becoming magic.
                </p>

                <div className="grid md:grid-cols-2 gap-8 text-sm leading-7">
                  <div>
                    <h3 className="font-gothic text-xl text-golden-rune mb-3">I. Cultural Respect</h3>
                    <p className="mb-4">
                      We will not wear culture as costume.<br/>
                      We will not erase the blood, the struggle, or the memory.<br/>
                      We honor elders as living libraries,<br/>
                      and we guard traditions from theft.<br/>
                      What we take, we give back.<br/>
                      What we inherit, we protect.<br/>
                      <em>Cultural respect is not accessory — it is justice.</em>
                    </p>

                    <h3 className="font-gothic text-xl text-golden-rune mb-3">III. Ancestral Stewardship</h3>
                    <p>
                      We walk with the dead and the unborn.<br/>
                      We will not allow our ancestors to be erased.<br/>
                      We speak the names of the silenced,<br/>
                      we repair what we can,<br/>
                      we plant seeds we may never see grow.<br/>
                      To forget is to die twice.<br/>
                      <em>To remember is to live forever.</em>
                    </p>
                  </div>

                  <div>
                    <h3 className="font-gothic text-xl text-golden-rune mb-3">II. Cosmic Vision</h3>
                    <p className="mb-4">
                      We lift our eyes from the grindstone to the stars.<br/>
                      We remember that we are stardust made flesh.<br/>
                      We will not sever science from spirit,<br/>
                      nor wonder from responsibility.<br/>
                      We dream futures worthy of our descendants,<br/>
                      listening to the sky as scripture,<br/>
                      <em>living as luminous threads in a cosmic web.</em>
                    </p>

                    <h3 className="font-gothic text-xl text-golden-rune mb-3">IV. Integration of Magic & Science</h3>
                    <p>
                      We will not choose between microscope and moonlight.<br/>
                      We honor ritual as technology and technology as ritual.<br/>
                      We treat questions as prayers,<br/>
                      and knowledge as devotion.<br/>
                      We heal with medicine and with magic.<br/>
                      We remember: integration is wholeness,<br/>
                      <em>and wholeness is power.</em>
                    </p>
                  </div>
                </div>

                <div className="text-center mt-8 pt-6 border-t border-golden-rune/20">
                  <h3 className="font-gothic text-xl text-golden-rune mb-4">Together</h3>
                  <p className="italic text-base">
                    We build the temple.<br/>
                    We live the pillars.<br/>
                    We remember what the empire tried to erase.<br/>
                    We reclaim what was stolen.<br/>
                    We rise as ancestors in training,<br/>
                    threads of a cosmos that sings through us.
                  </p>
                  
                  <div className="mt-6 text-golden-rune font-gothic text-lg">
                    <p>This is Jakintza Ruha.</p>
                    <p>This is remembrance.</p>
                    <p>This is the path home.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Temple Floor */}
        <div className="relative">
          {/* Cosmic temple outline */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-2 bg-gradient-to-r from-transparent via-golden-rune to-transparent mb-8"></div>
            <div className="flex justify-between">
              <div className="w-2 h-96 bg-gradient-to-b from-golden-rune to-transparent"></div>
              <div className="w-2 h-96 bg-gradient-to-b from-golden-rune to-transparent"></div>
            </div>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                className="relative"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
              >
                {/* Pillar */}
                <motion.div
                  className={`
                    relative cursor-pointer p-6 rounded-lg border border-silver-star/20
                    bg-gradient-to-b ${pillar.bgGradient} backdrop-blur-sm
                    transition-all duration-500 hover:border-silver-star/40
                    ${activePillar === pillar.id ? 'scale-105' : ''}
                    ${visitedPillars.has(pillar.id) ? 'border-golden-rune/30' : ''}
                  `}
                  onClick={() => handlePillarClick(pillar.id, index)}
                  whileHover={{ 
                    y: -10,
                    boxShadow: `0 20px 40px ${pillar.glowColor}`
                  }}
                  whileTap={{ scale: 0.98 }}
                  data-testid={`pillar-${pillar.id}`}
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <pillar.icon className="w-16 h-16 text-golden-rune" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-gothic text-2xl text-golden-rune mb-2 text-center hover:text-silver-star transition-colors">
                    {pillar.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-silver-star/80 text-center font-medium">
                    {pillar.subtitle}
                  </p>
                  
                  {/* Click indicator */}
                  <div className="text-center mt-4">
                    <span className="text-silver-star/60 text-sm">
                      Tap to reveal
                    </span>
                  </div>
                </motion.div>

              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h2 className="font-gothic text-3xl text-golden-rune mb-6">
            These are our foundations.
          </h2>
          <p className="text-xl text-silver-star/80 mb-8">
            Are you ready to remember?
          </p>
          <motion.button
            onClick={() => setLocation('/remember')}
            className="mystical-border bg-gradient-to-r from-shadow-purple to-deep-purple hover:from-deep-purple hover:to-shadow-purple px-8 py-3 rounded-lg font-gothic text-lg font-medium transition-all duration-500 cursor-pointer"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px hsl(43, 74%, 49%, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            data-testid="button-remember-cta"
          >
            <span className="text-golden-rune">Begin Your Journey</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}