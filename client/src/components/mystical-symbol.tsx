import { motion } from "framer-motion";
import { Moon } from "lucide-react";

export default function MysticalSymbol() {
  return (
    <div className="w-24 h-24 mx-auto relative" data-testid="mystical-symbol">
      <motion.div
        className="absolute inset-0 border-2 border-golden-rune rounded-full"
        animate={{
          boxShadow: [
            "0 0 20px hsl(43, 74%, 49%, 0.3), inset 0 0 20px hsl(259, 46%, 22%, 0.5)",
            "0 0 40px hsl(43, 74%, 49%, 0.6), inset 0 0 30px hsl(259, 46%, 22%, 0.7)",
            "0 0 20px hsl(43, 74%, 49%, 0.3), inset 0 0 20px hsl(259, 46%, 22%, 0.5)"
          ]
        }}
        transition={{
          duration: 3,
          repeat: 9999,
          ease: "easeInOut"
        }}
      />
      <div className="absolute inset-2 border border-silver-star rounded-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: 9999,
            ease: "linear"
          }}
        >
          <Moon className="text-golden-rune w-8 h-8" />
        </motion.div>
      </div>
    </div>
  );
}
