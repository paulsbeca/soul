import { motion } from "framer-motion";
import { Flame, Mountain, Waves, Wind, Sparkles, Heart, Users, Crown, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import backgroundImage from "@assets/background_1755498699765.webp";

export default function Alchemy() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" }
  };

  const elements = [
    {
      name: "Earth",
      icon: Mountain,
      description: "grounding, memory, and the bones of our ancestors",
      color: "emerald"
    },
    {
      name: "Water", 
      icon: Waves,
      description: "cleansing, dreaming, and the deep tides of the subconscious",
      color: "blue"
    },
    {
      name: "Air",
      icon: Wind,
      description: "vision, language, and the breath of creation",
      color: "cyan"
    },
    {
      name: "Fire",
      icon: Flame,
      description: "transformation, willpower, and the spark of revolt",
      color: "red"
    },
    {
      name: "Aether",
      icon: Sparkles,
      description: "spirit, ascension, and the unseen thread that unites all",
      color: "violet"
    }
  ];

  const strands = [
    {
      title: "Inner Transmutation",
      icon: Heart,
      description: "The first crucible is the self. Alchemy begins within, where we confront our shadows, name our wounds, and learn to transform them into medicine.",
      practices: [
        "Shadow Work & Healing – turning pain into strength",
        "Integration – uniting body, mind, spirit, and ancestry", 
        "Awakening – remembering the golden soul beneath the rust of trauma and assimilation"
      ]
    },
    {
      title: "Elemental Alchemy",
      icon: Flame,
      description: "The second crucible is the world around us. We return to the ancient pact with Earth, Water, Air, Fire, and Aether, not as symbols only, but as living allies.",
      practices: [
        "Re-entering the covenant of balance with nature",
        "Working with elemental forces as mirrors and teachers",
        "Remembering that to live is to exchange breath with the cosmos"
      ]
    },
    {
      title: "Ancestral Gold",
      icon: Crown,
      description: "The third crucible is our bloodline. Colonization, forced assimilation, and cultural erasure scattered our stories—but they did not destroy them.",
      practices: [
        "Remembering Lineage – honoring ancestors both named and unnamed",
        "Recovering Forbidden Knowledge – from plant medicine to ritual cycles",
        "Carrying Forward – transforming survival into legacy, resistance into inheritance"
      ]
    },
    {
      title: "The Collective Elixir",
      icon: Users,
      description: "The final crucible is the movement itself. The Elixir of Life is not an individual's immortality, but the living memory of a people who refuse to be erased.",
      practices: [
        "Reclaim what was demonized – spellwork, ritual, magic, and mysticism",
        "Condemn cultural appropriation and forced erasure",
        "Weave the Cosmic and the Earthly – integrating science, spirituality, and culture"
      ]
    }
  ];

  return (
    <section 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      data-testid="alchemy-section"
    >
      {/* Dark mystical overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>
      
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <Link 
          href="/remember"
          className="inline-flex items-center text-golden-rune hover:text-silver-star transition-colors group"
          data-testid="link-back-remember"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-[-2px] transition-transform" />
          Return to Sacred Remembering
        </Link>
      </nav>
      
      {/* Floating alchemical symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-golden-rune rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
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
            The Alchemy of Jakintza Ruha
          </h1>
          <h2 className="font-gothic text-2xl md:text-3xl text-silver-star mb-8">
            Beyond Lead and Gold
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-ethereal-white/90 leading-relaxed">
            <p>
              Alchemy is often remembered as the ancient pursuit of turning base metals into treasure. 
              But in Jakintza Ruha, alchemy is the sacred science of transformation at every level of existence. 
              It is the practice of remembering who we are, reclaiming what was stolen, and refining the raw matter of our lives into radiant spirit.
            </p>
            <p className="text-golden-rune font-semibold">
              True alchemy does not happen in a furnace of iron, but in the forge of the soul. 
              Every heartbreak, every exile, every shadow becomes the prima materia—the base substance that we transmute into wisdom and power.
            </p>
          </div>
        </motion.div>

        {/* The Four Strands */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h3 className="font-gothic text-4xl text-golden-rune text-center mb-12">
            The Four Strands of Alchemy
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {strands.map((strand, index) => (
              <motion.div
                key={strand.title}
                className="mystical-border p-8 rounded-lg grimoire-texture"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                data-testid={`strand-${strand.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center mb-6">
                  <strand.icon className="w-8 h-8 text-golden-rune mr-4" />
                  <h4 className="font-gothic text-2xl text-silver-star">{strand.title}</h4>
                </div>
                
                <p className="text-ethereal-white/90 mb-6 leading-relaxed">
                  {strand.description}
                </p>
                
                <div className="space-y-3">
                  {strand.practices.map((practice, i) => (
                    <div key={i} className="flex items-start">
                      <div className="w-2 h-2 bg-golden-rune rounded-full mt-2 mr-3 flex-shrink-0" />
                      <p className="text-ethereal-white/80 text-sm leading-relaxed">{practice}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Elemental Alchemy Expanded */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="font-gothic text-3xl text-golden-rune text-center mb-8">
            The Five Sacred Elements
          </h3>
          <p className="text-center text-ethereal-white/80 mb-12 max-w-3xl mx-auto">
            Each element is a mirror and a teacher. Through these forces, we do not "master nature." 
            We re-enter the covenant of balance, remembering that to live is to exchange breath with the cosmos.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {elements.map((element, index) => (
              <motion.div
                key={element.name}
                className="text-center p-6 mystical-border rounded-lg grimoire-texture"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                data-testid={`element-${element.name.toLowerCase()}`}
              >
                <element.icon className={`w-12 h-12 mx-auto mb-4 text-${element.color}-400`} />
                <h4 className="font-gothic text-xl text-silver-star mb-3">{element.name}</h4>
                <p className="text-ethereal-white/70 text-sm leading-relaxed">{element.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* The Philosopher's Stone */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="font-gothic text-4xl text-golden-rune mb-8">
            The Philosopher's Stone of Jakintza Ruha
          </h3>
          
          <div className="max-w-4xl mx-auto mystical-border p-8 rounded-lg grimoire-texture">
            <p className="text-lg text-ethereal-white/90 mb-6 leading-relaxed">
              The alchemists once sought a single object of ultimate power—the Philosopher's Stone. 
              In Jakintza Ruha, we name it for what it truly is: a state of being.
            </p>
            
            <div className="space-y-4 text-golden-rune font-semibold text-lg">
              <p>The Philosopher's Stone is the Awakened Soul who remembers.</p>
              <p>It is the child who knows their ancestors still sing through them.</p>
              <p>It is the community who refuses assimilation and instead lives in sacred balance with the Earth and stars.</p>
            </div>
            
            <p className="text-xl text-silver-star mt-8 font-gothic">
              This is the gold we seek—not the metal, but the radiance of a people who remember what their souls already know.
            </p>
          </div>
          
          <div className="mt-12 space-y-3 text-golden-rune font-gothic text-xl">
            <p>✨ Jakintza Ruha: Where Alchemy is Remembrance.</p>
            <p>✨ Where Wisdom Becomes Magic.</p>
            <p>✨ Where Blood, Bone, and Spirit are transmuted into freedom.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}