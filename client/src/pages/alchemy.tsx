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
      description: "grounding, nourishment, memory, the bones of the ancestors beneath our feet",
      color: "emerald"
    },
    {
      name: "Water", 
      icon: Waves,
      description: "cleansing, tides of emotion, dreaming, the womb of possibility",
      color: "blue"
    },
    {
      name: "Air",
      icon: Wind,
      description: "speech, thought, imagination, the first breath of creation",
      color: "cyan"
    },
    {
      name: "Fire",
      icon: Flame,
      description: "transformation, revolt, the will that ignites new worlds",
      color: "red"
    },
    {
      name: "Aether",
      icon: Sparkles,
      description: "spirit, ascension, the unseen fabric binding all into one",
      color: "violet"
    }
  ];

  const strands = [
    {
      title: "Inner Transmutation",
      icon: Heart,
      description: "The first crucible is the self—the laboratory of flesh and memory. Here we meet our shadows and discover that the monsters under the bed are often our own forgotten selves waiting to be held.",
      practices: [
        "Shadow Work & Healing – pain is not waste, but raw ore that can be smelted into strength",
        "Integration – weaving body, mind, spirit, and ancestral blood into one coherent self", 
        "Awakening – the golden soul beneath rust, trauma, and lies shines through once we polish it with truth"
      ]
    },
    {
      title: "Elemental Alchemy",
      icon: Flame,
      description: "The second crucible is the living world. Earth, Water, Air, Fire, Aether are not metaphors—they are kin. They are teachers who demand reciprocity, not domination.",
      practices: [
        "Earth teaches memory and endurance",
        "Water teaches release and dreaming",
        "Air teaches speech and imagination",
        "Fire teaches will and transformation",
        "Aether teaches spirit and the thread of unity"
      ]
    },
    {
      title: "Ancestral Gold",
      icon: Crown,
      description: "The third crucible is bloodline. Colonization sought to sever our inheritance, to bury our languages, to shame our rituals. Yet the gold persists, hidden in songs, recipes, dreams, and names whispered in silence.",
      practices: [
        "Remembering Lineage – our ancestors walk in our gestures, our voices, our grief",
        "Recovering Forbidden Knowledge – from herbal medicine to moon cycles, we dig up what was called 'witchcraft' and restore it as sacred science",
        "Carrying Forward – we turn survival into strength, resistance into radiant inheritance"
      ]
    },
    {
      title: "The Collective Elixir",
      icon: Users,
      description: "The final crucible is us, together. The Elixir of Life is not the immortality of one—but the persistence of a people who refuse erasure.",
      practices: [
        "Reclaim the Demonized – spellwork, ritual, astrology, magic, mysticism—these are not evil, they are memory",
        "Resist Appropriation – what was stolen and sold is reclaimed, and returned to the guardians of its bloodline",
        "Weave Science and Spirit – quantum physics and prayer, astronomy and astrology, DNA and ancestral song—none of these are contradictions. They are threads in the same tapestry"
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
          href="/"
          className="inline-flex items-center text-golden-rune hover:text-silver-star transition-colors group"
          data-testid="link-back-home"
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
              Alchemy has long been painted as the pursuit of the impossible: turning dull metal into gleaming treasure. 
              But that was always a misdirection. The truest alchemists weren't chasing coins, they were mapping the road of the soul.
            </p>
            <p className="text-silver-star/90">
              In Jakintza Ruha, alchemy is Remembrance—the art of transforming wounds into wisdom, exile into return, survival into sovereignty. 
              It is a covenant with spirit, science, and ancestry.
            </p>
            <p className="text-golden-rune font-semibold text-xl">
              True alchemy does not burn in iron furnaces—it happens in the furnace of the heart. 
              Each betrayal, each assimilation, each fragment of memory hidden in bone is the prima materia, the base matter. 
              We are the crucibles. We are the experiment. And when we awaken, we are the gold.
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
            Each element is not just a force—it is a mirror of the soul. 
            To live is to breathe with them. To die is to return to them. 
            To practice alchemy is to remember we were never separate.
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
              The old alchemists searched for a stone of power. But the Stone was never a rock. It was always a being.
            </p>
            
            <div className="space-y-4 text-golden-rune font-semibold text-lg">
              <p>The Philosopher's Stone is the Awakened Soul who remembers.</p>
              <p>It is the child who knows their ancestors still sing in their blood.</p>
              <p>It is the community who refuses assimilation and instead grows in sacred balance with Earth and cosmos.</p>
              <p>It is the people who turn exile into homecoming, forgetting into remembering, silence into song.</p>
            </div>
            
            <p className="text-xl text-silver-star mt-8 font-gothic">
              This is the gold we seek: not coins, but radiance. Not treasure, but remembrance. Not empire, but liberation.
            </p>
          </div>
          
          <div className="mt-12 space-y-4 text-center">
            <h4 className="font-gothic text-2xl text-golden-rune mb-6">
              🜔 The Golden Invocations of Jakintza Ruha
            </h4>
            <div className="space-y-3 text-golden-rune font-gothic text-xl">
              <p>✨ Jakintza Ruha: Where Alchemy is Remembrance.</p>
              <p>✨ Jakintza Ruha: Where Wisdom Becomes Magic.</p>
              <p>✨ Jakintza Ruha: Where Blood, Bone, and Spirit are transmuted into Freedom.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}