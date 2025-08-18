import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BreathingTaglinesProps {
  onComplete: () => void;
}

const taglines = [
  "Where Wisdom Becomes Magic.",
  "Remember what your soul already knows.",
  "Reclaim the power within your blood."
];

export default function BreathingTaglines({ onComplete }: BreathingTaglinesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTagline(true);
    }, 1000); // Start after 1 second

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showTagline) return;

    const interval = setInterval(() => {
      if (currentIndex < taglines.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 2000); // Call onComplete 2 seconds after last tagline
      }
    }, 4000); // Show each tagline for 4 seconds

    return () => clearInterval(interval);
  }, [currentIndex, showTagline, onComplete]);

  const breathingVariants = {
    initial: { 
      opacity: 0, 
      y: 30,
      scale: 1
    },
    animate: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -30,
      transition: { duration: 0.8 }
    }
  };

  if (!showTagline) return null;

  return (
    <div className="space-y-8 min-h-[200px] flex flex-col justify-center" data-testid="breathing-taglines">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          className="font-gothic text-2xl md:text-4xl font-medium text-center animate-cosmic-breath"
          variants={breathingVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          data-testid={`tagline-${currentIndex}`}
        >
          "{taglines[currentIndex]}"
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
