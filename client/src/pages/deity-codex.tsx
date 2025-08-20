import { motion } from "framer-motion";
import { Crown, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import backgroundImage from "@assets/background_1755498699765.webp";

export default function DeityCodex() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" }
  };

  return (
    <section 
      className="min-h-screen text-ethereal-white flex items-center justify-center" 
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
          ← Back to Athenaeum
        </Link>
      </nav>

      <div className="relative z-10 text-center px-6">
        <motion.div {...fadeInUp} className="max-w-2xl mx-auto">
          <div className="mystical-border p-12 rounded-lg grimoire-texture text-center">
            {/* Magical Caution Symbol */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 border-4 border-golden-rune rounded-full flex items-center justify-center text-golden-rune text-4xl animate-pulse">
                ⚠️
              </div>
            </div>
            
            <Crown className="w-16 h-16 mx-auto mb-6 text-golden-rune" />
            
            <h1 className="font-gothic text-4xl md:text-6xl text-golden-rune mb-6">
              Sacred Deity Codex
            </h1>
            
            <div className="bg-golden-rune/10 border border-golden-rune/30 rounded-lg p-6 mb-6">
              <h2 className="font-gothic text-2xl text-golden-rune mb-4">
                🔮 Under Magical Renovation 🔮
              </h2>
              <p className="text-xl text-silver-star/90 leading-relaxed">
                The cosmic connection is being realigned with new sacred energies. 
                The repository of divine beings and pantheons will return more powerful than ever.
              </p>
            </div>
            
            <div className="text-ethereal-white/70">
              <p>The ancient codex is being infused with deeper wisdom...</p>
              <div className="flex justify-center mt-4 space-x-2">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <Sparkles className="w-5 h-5 animate-pulse" style={{animationDelay: '0.2s'}} />
                <Sparkles className="w-5 h-5 animate-pulse" style={{animationDelay: '0.4s'}} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}