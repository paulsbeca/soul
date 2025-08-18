import { motion } from "framer-motion";
import { Moon } from "lucide-react";

export default function MysticalSymbol() {
  return (
    <div className="w-24 h-24 mx-auto relative" data-testid="mystical-symbol">
      <div className="absolute inset-0 border-2 border-golden-rune rounded-full shadow-[0_0_30px_hsl(43,74%,49%,0.4)] animate-mystical-glow" />
      <div className="absolute inset-2 border border-silver-star rounded-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Moon className="text-golden-rune w-8 h-8" />
      </div>
    </div>
  );
}
