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
      scale: 1,
      textShadow: "0 0 20px hsl(43, 74%, 49%, 0)"
    },
    animate: { 
      opacity: [0.7, 1, 0.7],
      y: [0, -2, 0],
      scale: [1, 1.02, 1],
      textShadow: [
        "0 0 20px hsl(43, 74%, 49%, 0.3)",
        "0 0 30px hsl(43, 74%, 49%, 0.6), 0 0 50px hsl(214, 32%, 81%, 0.3)",
        "0 0 20px hsl(43, 74%, 49%, 0.3)"
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -30,
      transition: { duration: 0.5 }
    }
  };

  if (!showTagline) return null;

  return (
    <div className="space-y-8 min-h-[200px] flex flex-col justify-center" data-testid="breathing-taglines">
      <AnimatePresence mode="wait">
        {taglines.slice(0, currentIndex + 1).map((tagline, index) => (
          <motion.div
            key={index}
            className="font-gothic text-2xl md:text-4xl font-medium text-center"
            variants={breathingVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              animationDelay: `${index * 0.5}s`
            }}
            data-testid={`tagline-${index}`}
          >
            "{tagline}"
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
