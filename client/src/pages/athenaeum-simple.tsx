import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Book, Star, Scroll, Globe, Crown, Sparkles } from "lucide-react";
import backgroundImage from "@assets/background_1755498699765.webp";

export default function AthenaeumSimple() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" }
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
      <div className="absolute inset-0 bg-black/70"></div>
      
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <Link 
          href="/"
          className="inline-flex items-center text-golden-rune hover:text-silver-star transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-[-2px] transition-transform" />
          ← Back to Sacred Remembering
        </Link>
      </nav>

      <div className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h1 className="font-gothic text-5xl md:text-7xl font-semibold mb-6 text-golden-rune">
              The Athenaeum
            </h1>
            <p className="text-xl md:text-2xl text-silver-star/90 leading-relaxed max-w-4xl mx-auto">
              Your cosmic library-school where ancient wisdom meets modern awakening. 
              Choose your sacred wing and begin your journey of mystical learning.
            </p>
          </motion.div>

          {/* Wings Selection */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Sanctum of Hidden Echoes */}
            <motion.div
              className="mystical-border p-8 rounded-lg grimoire-texture bg-gradient-to-br from-deep-purple/20 to-shadow-purple/20 hover:scale-105 transition-transform cursor-pointer"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-mystical-600 to-mystical-800 rounded-full flex items-center justify-center">
                  <Scroll className="w-10 h-10 text-ethereal-white" />
                </div>
                <h3 className="font-gothic text-3xl text-golden-rune mb-4">
                  Sanctum of Hidden Echoes
                </h3>
                <p className="text-silver-star/90 mb-6 italic">West Wing</p>
                <p className="text-ethereal-white/90 mb-8 leading-relaxed">
                  Memory, lineage, history, and the deep ancestral archive. Candlelit halls where lore-keepers whisper to the bones of the past.
                </p>
                
                <div className="space-y-3 text-left mb-8">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-4 h-4 text-golden-rune" />
                    <span className="text-sm text-ethereal-white/80">Ancestral Wisdom & Cultural Repair</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-4 h-4 text-golden-rune" />
                    <span className="text-sm text-ethereal-white/80">Shadow Work & Healing Patterns</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-4 h-4 text-golden-rune" />
                    <span className="text-sm text-ethereal-white/80">Creating Personal Codex</span>
                  </div>
                </div>

                <div className="bg-golden-rune/10 border border-golden-rune/30 rounded-lg p-4 mb-6">
                  <p className="text-golden-rune font-semibold">Coming Soon</p>
                  <p className="text-silver-star/70 text-sm">The sacred halls are being prepared</p>
                </div>
              </div>
            </motion.div>

            {/* Orrery of Obscured Realms */}
            <motion.div
              className="mystical-border p-8 rounded-lg grimoire-texture bg-gradient-to-br from-cosmic-blue/20 to-ethereal-blue/20 hover:scale-105 transition-transform cursor-pointer"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-ethereal-600 to-cosmic-600 rounded-full flex items-center justify-center">
                  <Globe className="w-10 h-10 text-ethereal-white" />
                </div>
                <h3 className="font-gothic text-3xl text-golden-rune mb-4">
                  Orrery of Obscured Realms
                </h3>
                <p className="text-silver-star/90 mb-6 italic">East Wing</p>
                <p className="text-ethereal-white/90 mb-8 leading-relaxed">
                  The study of other worlds, dimensions beyond the veil, and cosmic mechanics. Star-maps and dimensional doorways await.
                </p>
                
                <div className="space-y-3 text-left mb-8">
                  <div className="flex items-center space-x-3">
                    <Star className="w-4 h-4 text-golden-rune" />
                    <span className="text-sm text-ethereal-white/80">Astral Projection & Dimensional Travel</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="w-4 h-4 text-golden-rune" />
                    <span className="text-sm text-ethereal-white/80">Cosmic Mechanics & Universal Laws</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="w-4 h-4 text-golden-rune" />
                    <span className="text-sm text-ethereal-white/80">Interdimensional Communication</span>
                  </div>
                </div>

                <div className="bg-golden-rune/10 border border-golden-rune/30 rounded-lg p-4 mb-6">
                  <p className="text-golden-rune font-semibold">Coming Soon</p>
                  <p className="text-silver-star/70 text-sm">The cosmic observatory is aligning</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Center Message */}
          <motion.div
            className="text-center mystical-border p-8 rounded-lg grimoire-texture"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <Crown className="w-16 h-16 mx-auto mb-6 text-golden-rune" />
            <h3 className="font-gothic text-3xl text-golden-rune mb-4">
              The Sacred Academy Awaits
            </h3>
            <p className="text-xl text-silver-star/90 leading-relaxed mb-6">
              The full Athenaeum experience with course management, progress tracking, and certificates is currently being infused with deeper cosmic energies.
            </p>
            <div className="flex justify-center items-center space-x-2 text-ethereal-white/70">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span>Mystical renovation in progress</span>
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}