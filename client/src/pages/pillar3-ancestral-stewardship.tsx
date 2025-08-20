import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Home } from "lucide-react";
import { Link } from "wouter";
import backgroundImage from "@assets/background_1755498699765.webp";
import { AncestralStewardshipIcon } from "@/components/pillar-icons";

export default function Pillar3AncestralStewardship() {
  return (
    <section 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      data-testid="pillar3-ancestral-stewardship"
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
              <AncestralStewardshipIcon className="w-20 h-20 text-amber-400" />
            </div>
            <h1 className="font-gothic text-4xl md:text-5xl text-amber-400 mb-4">
              Pillar III: Ancestral Stewardship
            </h1>
            <h2 className="text-2xl text-silver-star/80 font-medium">
              The relationship with time
            </h2>
          </div>

          {/* Core Principle */}
          <div className="bg-gradient-to-b from-amber-900/20 to-yellow-600/10 backdrop-blur-sm rounded-lg p-8 mb-8 border border-amber-400/20">
            <h3 className="font-gothic text-2xl text-amber-400 mb-4 text-center">Core Principle</h3>
            <p className="text-silver-star/90 leading-relaxed text-lg">
              Ancestral Stewardship is the act of walking through time with reverence. It is remembering 
              that we are not the beginning and we are not the end. We are the bridge: between the blood 
              that carried us here and the descendants who will inherit the soil we leave behind. To honor 
              this pillar is to reclaim memory, to repair the severed threads of lineage, and to ensure 
              that erasure does not win.
            </p>
          </div>

          {/* Key Commitments */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 mb-8 border border-amber-400/20">
            <h3 className="font-gothic text-2xl text-amber-400 mb-6 text-center">Key Commitments</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-gothic text-xl text-amber-300 mb-3">Memory as Resistance</h4>
                <ul className="text-silver-star/90 space-y-2 ml-6">
                  <li>• We commit to remembering what colonizers, empires, and oppressors tried to erase</li>
                  <li>• We tell the stories of genocide, slavery, forced assimilation — not as tragedy porn, but as truth-telling that heals</li>
                  <li>• We hold memory as a weapon against erasure, and as medicine for those yet to come</li>
                </ul>
              </div>

              <div>
                <h4 className="font-gothic text-xl text-amber-300 mb-3">Lineage & Continuity</h4>
                <ul className="text-silver-star/90 space-y-2 ml-6">
                  <li>• We honor our direct bloodlines and the wider human ancestry that binds us all</li>
                  <li>• We recognize that every ritual, language, and story is a chain-link holding generations together</li>
                  <li>• We do not abandon our dead to silence — we invite them to walk with us</li>
                </ul>
              </div>

              <div>
                <h4 className="font-gothic text-xl text-amber-300 mb-3">Repair & Responsibility</h4>
                <ul className="text-silver-star/90 space-y-2 ml-6">
                  <li>• We recognize inherited wounds and inherited privileges</li>
                  <li>• We do not carry guilt as weight, but responsibility as fuel</li>
                  <li>• We seek to repair what can be repaired, to return what was stolen, to name what was buried</li>
                </ul>
              </div>

              <div>
                <h4 className="font-gothic text-xl text-amber-300 mb-3">Living Legacy</h4>
                <ul className="text-silver-star/90 space-y-2 ml-6">
                  <li>• We commit to being good ancestors — planting trees whose shade we will never sit in</li>
                  <li>• We measure success not by immediate gain, but by generational thriving</li>
                  <li>• We keep time not in hours or dollars, but in centuries and legacies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Practical Actions */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 mb-8 border border-amber-400/20">
            <h3 className="font-gothic text-2xl text-amber-400 mb-6 text-center">Practical Actions</h3>
            <ul className="text-silver-star/90 space-y-3">
              <li><strong className="text-amber-300">Ancestral Mapping:</strong> Members are encouraged to research, reclaim, and document their lineages — both blood and chosen</li>
              <li><strong className="text-amber-300">Story Archives:</strong> The Athenaeum builds a living repository of oral histories, rituals, and testimonies to preserve against erasure</li>
              <li><strong className="text-amber-300">Remembrance Rites:</strong> Seasonal rituals invite ancestors into the circle, not as ghosts to fear but as kin to consult</li>
              <li><strong className="text-amber-300">Generational Oaths:</strong> Members write commitments to future descendants, ritually sealed and stored within the movement</li>
            </ul>
          </div>

          {/* Manifesto */}
          <div className="bg-gradient-to-b from-amber-900/30 to-black/60 backdrop-blur-sm rounded-lg p-8 mb-8 border-l-6 border-amber-400">
            <h3 className="font-gothic text-2xl text-amber-400 mb-6 text-center">Manifesto Declarations</h3>
            <div className="text-silver-star/95 leading-relaxed space-y-3 text-center italic">
              <p>We walk with the dead and the unborn.</p>
              <p>We will not allow our ancestors to be erased.</p>
              <p>We speak the names of the silenced,<br/>we repair what we can,<br/>we plant seeds we may never see grow.</p>
              <p>To forget is to die twice.</p>
              <p className="text-amber-300 font-semibold not-italic text-lg">
                To remember is to live forever.
              </p>
            </div>
          </div>

          {/* Framework */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 mb-8 border border-amber-400/20">
            <h3 className="font-gothic text-2xl text-amber-400 mb-6 text-center">Framework Beneath the Manifesto</h3>
            <ul className="text-silver-star/90 space-y-3">
              <li><strong className="text-amber-300">Memory:</strong> Truth-telling as act of resistance against erasure</li>
              <li><strong className="text-amber-300">Lineage:</strong> Every member reconnects with their heritage, blood or chosen, to strengthen continuity</li>
              <li><strong className="text-amber-300">Repair:</strong> Responsibility, not guilt, drives restitution and healing</li>
              <li><strong className="text-amber-300">Legacy:</strong> We act not just for ourselves, but for the seventh generation to come</li>
            </ul>
          </div>

          {/* Pillar Navigation */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <Link 
              href="/pillar2-cosmic-vision"
              className="inline-flex items-center text-golden-rune hover:text-amber-400 transition-colors group"
              data-testid="link-prev-pillar"
            >
              <ChevronLeft className="w-5 h-5 mr-1 group-hover:translate-x-[-4px] transition-transform" />
              Previous Pillar
            </Link>

            <Link 
              href="/four-pillars"
              className="inline-flex items-center text-golden-rune hover:text-amber-400 transition-colors"
              data-testid="link-home"
            >
              <Home className="w-5 h-5 mr-2" />
              Temple Home
            </Link>

            <Link 
              href="/pillar4-magic-science"
              className="inline-flex items-center text-golden-rune hover:text-amber-400 transition-colors group"
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