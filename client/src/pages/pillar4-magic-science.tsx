import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Home } from "lucide-react";
import { Link } from "wouter";
import backgroundImage from "@assets/background_1755498699765.webp";
import { MagicScienceIcon } from "@/components/pillar-icons";

export default function Pillar4MagicScience() {
  return (
    <section 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      data-testid="pillar4-magic-science"
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
              <MagicScienceIcon className="w-20 h-20 text-cyan-400" />
            </div>
            <h1 className="font-gothic text-4xl md:text-5xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Pillar IV: Integration of Magic & Science
            </h1>
            <h2 className="text-2xl text-silver-star/80 font-medium">
              The reconciliation of what was never truly separate
            </h2>
          </div>

          {/* Core Principle */}
          <div className="bg-gradient-to-b from-blue-900/20 to-cyan-600/10 backdrop-blur-sm rounded-lg p-8 mb-8 border border-cyan-400/20">
            <h3 className="font-gothic text-2xl text-cyan-400 mb-4 text-center">Core Principle</h3>
            <p className="text-silver-star/90 leading-relaxed text-lg">
              This pillar is our refusal to accept the false divide between the mystical and the measurable. 
              Magic and science are not rivals — they are twin languages of the same truth. Science is the map. 
              Magic is the compass. Together, they orient us toward wisdom. Integration means refusing reductionism: 
              not stripping spirit from matter, nor matter from spirit, but seeing both as sacred expressions of the cosmos.
            </p>
          </div>

          {/* Key Commitments */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 mb-8 border border-cyan-400/20">
            <h3 className="font-gothic text-2xl text-cyan-400 mb-6 text-center">Key Commitments</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-gothic text-xl text-cyan-300 mb-3">No More False Binaries</h4>
                <ul className="text-silver-star/90 space-y-2 ml-6">
                  <li>• Reject the cultural lie that says: choose spirit or science</li>
                  <li>• Hold that data without wonder is soulless, and ritual without knowledge is rootless</li>
                  <li>• Live in synthesis, not division</li>
                </ul>
              </div>

              <div>
                <h4 className="font-gothic text-xl text-cyan-300 mb-3">Magic as Technology</h4>
                <ul className="text-silver-star/90 space-y-2 ml-6">
                  <li>• Recognize that ancient rituals were technologies of survival, healing, and transcendence</li>
                  <li>• Affirm that modern science often re-discovers what ancestors already knew through intuition and observation</li>
                  <li>• Honor both laboratory and altar, telescope and tarot, microscope and medicine bag</li>
                </ul>
              </div>

              <div>
                <h4 className="font-gothic text-xl text-cyan-300 mb-3">Curiosity as Sacred Practice</h4>
                <ul className="text-silver-star/90 space-y-2 ml-6">
                  <li>• Hold experimentation, exploration, and discovery as spiritual disciplines</li>
                  <li>• Treat questions as prayers, and knowledge as a form of devotion</li>
                  <li>• Teach that skepticism without humility becomes arrogance, but curiosity with reverence becomes wisdom</li>
                </ul>
              </div>

              <div>
                <h4 className="font-gothic text-xl text-cyan-300 mb-3">Applied Integration</h4>
                <ul className="text-silver-star/90 space-y-2 ml-6">
                  <li>• Do not use science to disprove magic, nor magic to ignore science</li>
                  <li>• Weave quantum physics into mystical teachings, biology into ritual, astronomy into ceremony</li>
                  <li>• Teach members how to hold both equations and invocations in the same hand</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Practical Actions */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 mb-8 border border-cyan-400/20">
            <h3 className="font-gothic text-2xl text-cyan-400 mb-6 text-center">Practical Actions</h3>
            <ul className="text-silver-star/90 space-y-3">
              <li><strong className="text-cyan-300">The Athenaeum Curriculum:</strong> Courses that pair mystical traditions with scientific insights (e.g., lunar rituals with astronomy; herbalism with botany and pharmacology)</li>
              <li><strong className="text-cyan-300">Experiments in the Sacred:</strong> Ritual spaces that invite both measurable outcomes and mystical intention</li>
              <li><strong className="text-cyan-300">Sacred Labs:</strong> Spaces where members can test, track, and refine magical practices as living sciences</li>
              <li><strong className="text-cyan-300">Annual Symposium:</strong> Gathering where healers, scientists, mystics, and researchers present side by side, modeling integration</li>
            </ul>
          </div>

          {/* Manifesto */}
          <div className="bg-gradient-to-b from-blue-900/30 to-black/60 backdrop-blur-sm rounded-lg p-8 mb-8 border-l-6 border-cyan-400">
            <h3 className="font-gothic text-2xl text-cyan-400 mb-6 text-center">Manifesto Declarations</h3>
            <div className="text-silver-star/95 leading-relaxed space-y-3 text-center italic">
              <p>We will not choose between microscope and moonlight.</p>
              <p>We honor ritual as technology and technology as ritual.</p>
              <p>We treat questions as prayers,<br/>and knowledge as devotion.</p>
              <p>We heal with medicine and with magic.</p>
              <p className="text-cyan-300 font-semibold not-italic text-lg">
                Integration is wholeness, and wholeness is power.
              </p>
            </div>
          </div>

          {/* Framework */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 mb-8 border border-cyan-400/20">
            <h3 className="font-gothic text-2xl text-cyan-400 mb-6 text-center">Framework Beneath the Manifesto</h3>
            <ul className="text-silver-star/90 space-y-3">
              <li><strong className="text-cyan-300">Synthesis:</strong> Reject binaries. Hold both ways of knowing in harmony</li>
              <li><strong className="text-cyan-300">Technology:</strong> See rituals as ancestral technologies; see science as rediscovery of ancient wisdom</li>
              <li><strong className="text-cyan-300">Curiosity:</strong> Inquiry is not a threat to faith but its highest form</li>
              <li><strong className="text-cyan-300">Application:</strong> Mysticism and science are both made practical — for healing, for knowledge, for liberation</li>
            </ul>
          </div>

          {/* Pillar Navigation */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <Link 
              href="/pillar3-ancestral-stewardship"
              className="inline-flex items-center text-golden-rune hover:text-cyan-400 transition-colors group"
              data-testid="link-prev-pillar"
            >
              <ChevronLeft className="w-5 h-5 mr-1 group-hover:translate-x-[-4px] transition-transform" />
              Previous Pillar
            </Link>

            <Link 
              href="/four-pillars"
              className="inline-flex items-center text-golden-rune hover:text-cyan-400 transition-colors"
              data-testid="link-home"
            >
              <Home className="w-5 h-5 mr-2" />
              Temple Home
            </Link>

            <div className="opacity-50 cursor-not-allowed">
              <span className="inline-flex items-center text-silver-star/50">
                Next Pillar
                <ChevronRight className="w-5 h-5 ml-1" />
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}