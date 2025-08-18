import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import BreathingTaglines from "@/components/breathing-taglines";
import MysticalSymbol from "@/components/mystical-symbol";
import backgroundImage from "@assets/background_1755498699765.webp";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [showCTA, setShowCTA] = useState(false);

  const handleRemember = () => {
    setLocation("/remember");
  };

  const handleTaglinesComplete = () => {
    setShowCTA(true);
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      data-testid="landing-section"
    >
      <div className="overlay-dark absolute inset-0"></div>
      <div className="starfield absolute inset-0"></div>
      
      {/* Static mystical particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-golden-rune rounded-full opacity-70" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-silver-star rounded-full opacity-60" />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-golden-rune rounded-full opacity-80" />
        <div className="absolute top-1/6 right-1/4 w-1 h-1 bg-silver-star rounded-full opacity-50" />
        <div className="absolute top-2/3 left-1/6 w-1 h-1 bg-golden-rune rounded-full opacity-60" />
        <div className="absolute top-1/3 right-2/3 w-0.5 h-0.5 bg-silver-star rounded-full opacity-70" />
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Mystical Logo/Symbol */}
        <div className="mb-12">
          <MysticalSymbol />
        </div>
        
        {/* Main Title */}
        <motion.h1
          className="font-gothic text-5xl md:text-7xl font-semibold mb-16 tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          data-testid="main-title"
        >
          <span className="text-golden-rune">Jakintza</span>{" "}
          <span className="text-silver-star">Ruha</span>
        </motion.h1>
        
        {/* Breathing Taglines */}
        <BreathingTaglines onComplete={handleTaglinesComplete} />
        
        {/* CTA Button */}
        <AnimatePresence>
          {showCTA && (
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              data-testid="cta-container"
            >
              <motion.button
                onClick={handleRemember}
                className="mystical-border bg-gradient-to-r from-shadow-purple to-deep-purple hover:from-deep-purple hover:to-shadow-purple px-12 py-4 rounded-lg font-gothic text-xl font-medium transition-all duration-500"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px hsl(43, 74%, 49%, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                data-testid="button-remember"
              >
                <span className="text-golden-rune">Are you ready to remember?</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
