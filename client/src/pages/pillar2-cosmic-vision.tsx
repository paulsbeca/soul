import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Home } from "lucide-react";
import { Link } from "wouter";
import backgroundImage from "@assets/background_1755498699765.webp";
import { CosmicVisionIcon } from "@/components/pillar-icons";

export default function Pillar2CosmicVision() {
  return (
    <section 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      data-testid="pillar2-cosmic-vision"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
      
      {/* Navigation */}
      <nav className="relative z-50 p-6">
        <Link 
          href="/four-pillars"
          className="inline-flex items-center text-golden-rune hover:text-silver-star transition-colors group"
          data-testid="link-back-pillars"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-[-2px] transition-transform" />
          Return to Four Pillars
        </Link>
      </nav>
      
      <div className="relative z-10 container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <CosmicVisionIcon className="w-20 h-20 text-violet-400" />
            </div>
            <h1 className="font-gothic text-4xl md:text-5xl text-violet-400 mb-4">
              Pillar II: Cosmic Vision
            </h1>
            <h2 className="text-2xl text-silver-star/80 font-medium">
              Remembering our place in the universe
            </h2>
          </div>

          {/* Core Principle */}
          <div className="bg-gradient-to-b from-violet-900/20 to-purple-600/10 backdrop-blur-sm rounded-lg p-8 mb-8 border border-violet-400/20">
            <h3 className="font-gothic text-2xl text-violet-400 mb-4 text-center">Core Principle</h3>
            <p className="text-silver-star/90 leading-relaxed text-lg">
              Cosmic Vision is the practice of remembering that we are not separate from the universe — 
              we are the universe becoming conscious of itself. It is the refusal to live small when we 
              are made of starlight. This pillar calls us to lift our eyes from the grindstone to the 
              galaxies, to remember our cosmic inheritance, and to live as luminous threads in the great 
              web of existence.
            </p>
          </div>

          {/* Key Commitments */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 mb-8 border border-violet-400/20">
            <h3 className="font-gothic text-2xl text-violet-400 mb-6 text-center">Key Commitments</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-gothic text-xl text-violet-300 mb-3">Cosmic Consciousness</h4>
                <ul className="text-silver-star/90 space-y-2 ml-6">
                  <li>• We remember that we are stardust made flesh, cosmic dust dreaming itself awake</li>
                  <li>• We practice seeing ourselves as part of an interconnected cosmic web</li>
                  <li>• We honor the sacred marriage between matter and consciousness</li>
                </ul>
              </div>

              <div>
                <h4 className="font-gothic text-xl text-violet-300 mb-3">Celestial Wisdom</h4>
                <ul className="text-silver-star/90 space-y-2 ml-6">
                  <li>• We study the movements of planets, stars, and cosmic cycles as sources of guidance</li>
                  <li>• We recognize astrology as both art and science, myth and mathematics</li>
                  <li>• We listen to the sky as scripture, reading cosmic signs and seasonal wisdom</li>
                </ul>
              </div>

              <div>
                <h4 className="font-gothic text-xl text-violet-300 mb-3">Future Visioning</h4>
                <ul className="text-silver-star/90 space-y-2 ml-6">
                  <li>• We dream futures worthy of our cosmic heritage</li>
                  <li>• We refuse to accept limitation when we are children of infinite space</li>
                  <li>• We envision humanity's role in the larger cosmic story</li>
                </ul>
              </div>

              <div>
                <h4 className="font-gothic text-xl text-violet-300 mb-3">Wonder & Responsibility</h4>
                <ul className="text-silver-star/90 space-y-2 ml-6">
                  <li>• We balance cosmic wonder with earthly responsibility</li>
                  <li>• We do not use spirituality to bypass social justice work</li>
                  <li>• We remember: as above, so below — cosmic vision must translate into earthly action</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Practical Actions */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 mb-8 border border-violet-400/20">
            <h3 className="font-gothic text-2xl text-violet-400 mb-6 text-center">Practical Actions</h3>
            <ul className="text-silver-star/90 space-y-3">
              <li><strong className="text-violet-300">Astrological Education:</strong> Comprehensive study of planetary cycles, natal charts, and cosmic timing</li>
              <li><strong className="text-violet-300">Cosmic Ceremonies:</strong> Rituals aligned with lunar phases, solar seasons, and planetary transits</li>
              <li><strong className="text-violet-300">Visioning Councils:</strong> Collective dreaming sessions for humanity's cosmic future</li>
              <li><strong className="text-violet-300">Stellar Observations:</strong> Regular gatherings for stargazing, cosmic meditation, and celestial study</li>
            </ul>
          </div>

          {/* Manifesto */}
          <div className="bg-gradient-to-b from-violet-900/30 to-black/60 backdrop-blur-sm rounded-lg p-8 mb-8 border-l-6 border-violet-400">
            <h3 className="font-gothic text-2xl text-violet-400 mb-6 text-center">Manifesto Declarations</h3>
            <div className="text-silver-star/95 leading-relaxed space-y-3 text-center italic">
              <p>We lift our eyes from the grindstone to the stars.</p>
              <p>We remember that we are stardust made flesh.</p>
              <p>We will not sever science from spirit,<br/>nor wonder from responsibility.</p>
              <p>We dream futures worthy of our descendants,<br/>listening to the sky as scripture.</p>
              <p className="text-violet-300 font-semibold not-italic text-lg">
                We live as luminous threads in a cosmic web.
              </p>
            </div>
          </div>

          {/* Pillar Navigation */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <Link 
              href="/pillar1-cultural-respect"
              className="inline-flex items-center text-golden-rune hover:text-violet-400 transition-colors group"
              data-testid="link-prev-pillar"
            >
              <ChevronLeft className="w-5 h-5 mr-1 group-hover:translate-x-[-4px] transition-transform" />
              Previous Pillar
            </Link>

            <Link 
              href="/four-pillars"
              className="inline-flex items-center text-golden-rune hover:text-violet-400 transition-colors"
              data-testid="link-home"
            >
              <Home className="w-5 h-5 mr-2" />
              Temple Home
            </Link>

            <Link 
              href="/pillar3-ancestral-stewardship"
              className="inline-flex items-center text-golden-rune hover:text-violet-400 transition-colors group"
              data-testid="link-next-pillar"
            >
              Next Pillar
              <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}