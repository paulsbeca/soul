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
  const [showTaglines, setShowTaglines] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTaglines(true);
      // Show CTA after taglines are visible
      setTimeout(() => {
        onComplete();
      }, 3000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!showTaglines) return null;

  return (
    <div className="space-y-8 min-h-[200px] flex flex-col justify-center" data-testid="breathing-taglines">
      {taglines.map((tagline, index) => (
        <motion.div
          key={index}
          className="font-gothic text-2xl md:text-4xl font-medium text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            ease: "easeOut",
            delay: index * 0.5
          }}
          data-testid={`tagline-${index}`}
        >
          "{tagline}"
        </motion.div>
      ))}
    </div>
  );
}
