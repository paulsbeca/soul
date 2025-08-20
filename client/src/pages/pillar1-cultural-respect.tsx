import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Home } from "lucide-react";
import { Link } from "wouter";
import backgroundImage from "@assets/background_1755498699765.webp";
import { CulturalRespectIcon } from "@/components/pillar-icons";

export default function Pillar1CulturalRespect() {
  return (
    <section 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      data-testid="pillar1-cultural-respect"
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
              <CulturalRespectIcon className="w-20 h-20 text-emerald-400" />
            </div>
            <h1 className="font-gothic text-4xl md:text-5xl text-emerald-400 mb-4">
              Pillar I: Cultural Respect
            </h1>
            <h2 className="text-2xl text-silver-star/80 font-medium">
              Honoring what was erased
            </h2>
          </div>

          {/* Core Principle */}
          <div className="bg-gradient-to-b from-emerald-900/20 to-emerald-600/10 backdrop-blur-sm rounded-lg p-8 mb-8 border border-emerald-400/20">
            <h3 className="font-gothic text-2xl text-emerald-400 mb-4 text-center">Core Principle</h3>
            <p className="text-silver-star/90 leading-relaxed text-lg">
              Cultural Respect is the unwavering commitment to honor, protect, and defend the sacred traditions, 
              wisdom, and practices of all peoples. We stand against appropriation, assimilation, and erasure. 
              We recognize that culture is not costume, tradition is not trend, and spirituality is not commodity. 
              To practice cultural respect is to be a guardian of memory, a protector of lineage, and a defender 
              of the sacred right of all peoples to maintain their identity without theft or distortion.
            </p>
          </div>

          {/* Key Commitments */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 mb-8 border border-emerald-400/20">
            <h3 className="font-gothic text-2xl text-emerald-400 mb-6 text-center">Key Commitments</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-gothic text-xl text-emerald-300 mb-3">Against Appropriation</h4>
                <ul className="text-silver-star/90 space-y-2 ml-6">
                  <li>• We will not wear sacred symbols as fashion accessories</li>
                  <li>• We will not practice closed traditions without proper initiation and permission</li>
                  <li>• We distinguish between appreciation (which honors) and appropriation (which exploits)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-gothic text-xl text-emerald-300 mb-3">Protecting Sacred Knowledge</h4>
                <ul className="text-silver-star/90 space-y-2 ml-6">
                  <li>• We honor elders as living libraries of wisdom</li>
                  <li>• We guard traditions from theft, commercialization, and distortion</li>
                  <li>• We seek permission, not forgiveness, when engaging with cultural practices</li>
                </ul>
              </div>

              <div>
                <h4 className="font-gothic text-xl text-emerald-300 mb-3">Reciprocity & Responsibility</h4>
                <ul className="text-silver-star/90 space-y-2 ml-6">
                  <li>• What we receive, we give back through support and advocacy</li>
                  <li>• What we inherit, we protect for future generations</li>
                  <li>• We amplify Indigenous voices rather than speaking over them</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Practical Actions */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 mb-8 border border-emerald-400/20">
            <h3 className="font-gothic text-2xl text-emerald-400 mb-6 text-center">Practical Actions</h3>
            <ul className="text-silver-star/90 space-y-3">
              <li><strong className="text-emerald-300">Cultural Education:</strong> Members study the histories and contexts of practices they wish to engage with</li>
              <li><strong className="text-emerald-300">Elder Councils:</strong> Direct relationships with cultural keepers and traditional practitioners</li>
              <li><strong className="text-emerald-300">Reparative Support:</strong> Financial and advocacy support for Indigenous communities and cultural preservation</li>
              <li><strong className="text-emerald-300">Decolonizing Practices:</strong> Examining and removing colonial influences from spiritual work</li>
            </ul>
          </div>

          {/* Manifesto */}
          <div className="bg-gradient-to-b from-emerald-900/30 to-black/60 backdrop-blur-sm rounded-lg p-8 mb-8 border-l-6 border-emerald-400">
            <h3 className="font-gothic text-2xl text-emerald-400 mb-6 text-center">Manifesto Declarations</h3>
            <div className="text-silver-star/95 leading-relaxed space-y-3 text-center italic">
              <p>We will not wear culture as costume.</p>
              <p>We will not erase the blood, the struggle, or the memory.</p>
              <p>We honor elders as living libraries,<br/>and we guard traditions from theft.</p>
              <p>What we take, we give back.<br/>What we inherit, we protect.</p>
              <p className="text-emerald-300 font-semibold not-italic text-lg">
                Cultural respect is not accessory — it is justice.
              </p>
            </div>
          </div>

          {/* Pillar Navigation */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <div className="opacity-50 cursor-not-allowed">
              <span className="inline-flex items-center text-silver-star/50">
                <ChevronLeft className="w-5 h-5 mr-1" />
                Previous Pillar
              </span>
            </div>

            <Link 
              href="/four-pillars"
              className="inline-flex items-center text-golden-rune hover:text-emerald-400 transition-colors"
              data-testid="link-home"
            >
              <Home className="w-5 h-5 mr-2" />
              Temple Home
            </Link>

            <Link 
              href="/pillar2-cosmic-vision"
              className="inline-flex items-center text-golden-rune hover:text-emerald-400 transition-colors group"
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