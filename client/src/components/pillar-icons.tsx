interface PillarIconProps {
  className?: string;
}

export function CulturalRespectIcon({ className = "w-16 h-16" }: PillarIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Earth/Grounding Symbol */}
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8"/>
      <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4"/>
      
      {/* Sacred geometry - hexagon */}
      <path d="M32 20 L42 26 L42 38 L32 44 L22 38 L22 26 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      
      {/* Center dot */}
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      
      {/* Connection lines */}
      <line x1="32" y1="8" x2="32" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
      <line x1="32" y1="44" x2="32" y2="56" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
      <line x1="8" y1="32" x2="20" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
      <line x1="44" y1="32" x2="56" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
    </svg>
  );
}

export function CosmicVisionIcon({ className = "w-16 h-16" }: PillarIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cosmic spiral */}
      <path d="M32 8 Q48 16 48 32 Q48 48 32 48 Q16 48 16 32 Q16 20 24 16 Q36 12 36 24 Q36 36 28 36 Q24 36 24 32 Q24 30 26 30" 
            stroke="currentColor" strokeWidth="2" fill="none"/>
      
      {/* Stars around */}
      <path d="M16 12 L18 16 L22 16 L19 19 L20 23 L16 21 L12 23 L13 19 L10 16 L14 16 Z" fill="currentColor" opacity="0.8"/>
      <path d="M48 8 L49 11 L52 11 L50 13 L51 16 L48 14 L45 16 L46 13 L44 11 L47 11 Z" fill="currentColor" opacity="0.6"/>
      <path d="M52 44 L53 47 L56 47 L54 49 L55 52 L52 50 L49 52 L50 49 L48 47 L51 47 Z" fill="currentColor" opacity="0.7"/>
      <path d="M12 48 L13 51 L16 51 L14 53 L15 56 L12 54 L9 56 L10 53 L8 51 L11 51 Z" fill="currentColor" opacity="0.5"/>
      
      {/* Center cosmic eye */}
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
      <circle cx="32" cy="32" r="1.5" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5"/>
    </svg>
  );
}

export function AncestralStewardshipIcon({ className = "w-16 h-16" }: PillarIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Flame shape */}
      <path d="M32 56 Q20 50 20 38 Q20 32 24 28 Q28 24 32 28 Q30 20 34 16 Q38 12 42 16 Q44 20 42 24 Q44 28 44 38 Q44 50 32 56" 
            fill="currentColor" opacity="0.8"/>
      
      {/* Inner flame */}
      <path d="M32 48 Q24 44 24 36 Q24 32 28 30 Q32 28 32 32 Q30 26 34 24 Q38 22 40 26 Q40 30 38 32 Q40 34 40 36 Q40 44 32 48" 
            fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5"/>
      
      {/* Sacred flame core */}
      <path d="M32 40 Q28 38 28 34 Q28 32 30 32 Q32 30 32 32 Q34 34 34 34 Q34 38 32 40" 
            fill="rgba(0,0,0,0.2)"/>
      
      {/* Time spiral around flame */}
      <path d="M12 32 Q16 28 20 32 Q16 36 12 32" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6"/>
      <path d="M52 32 Q48 28 44 32 Q48 36 52 32" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6"/>
      
      {/* Ancestral symbols */}
      <circle cx="16" cy="20" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="48" cy="20" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="16" cy="44" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="48" cy="44" r="2" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

export function MagicScienceIcon({ className = "w-16 h-16" }: PillarIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* DNA/Sacred geometry helix */}
      <path d="M16 8 Q24 16 32 8 Q40 16 48 8 M16 24 Q24 32 32 24 Q40 32 48 24 M16 40 Q24 48 32 40 Q40 48 48 40 M16 56 Q24 48 32 56 Q40 48 48 56" 
            stroke="currentColor" strokeWidth="2" fill="none"/>
      
      {/* Connection nodes */}
      <circle cx="16" cy="8" r="2" fill="currentColor"/>
      <circle cx="32" cy="8" r="2" fill="currentColor"/>
      <circle cx="48" cy="8" r="2" fill="currentColor"/>
      <circle cx="16" cy="24" r="2" fill="currentColor"/>
      <circle cx="32" cy="24" r="2" fill="currentColor"/>
      <circle cx="48" cy="24" r="2" fill="currentColor"/>
      <circle cx="16" cy="40" r="2" fill="currentColor"/>
      <circle cx="32" cy="40" r="2" fill="currentColor"/>
      <circle cx="48" cy="40" r="2" fill="currentColor"/>
      <circle cx="16" cy="56" r="2" fill="currentColor"/>
      <circle cx="32" cy="56" r="2" fill="currentColor"/>
      <circle cx="48" cy="56" r="2" fill="currentColor"/>
      
      {/* Central fusion symbol */}
      <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="32" cy="32" r="4" stroke="currentColor" strokeWidth="1" fill="none"/>
      <line x1="28" y1="28" x2="36" y2="36" stroke="currentColor" strokeWidth="1"/>
      <line x1="36" y1="28" x2="28" y2="36" stroke="currentColor" strokeWidth="1"/>
      
      {/* Energy particles */}
      <circle cx="8" cy="16" r="1" fill="currentColor" opacity="0.7"/>
      <circle cx="56" cy="16" r="1" fill="currentColor" opacity="0.7"/>
      <circle cx="8" cy="48" r="1" fill="currentColor" opacity="0.7"/>
      <circle cx="56" cy="48" r="1" fill="currentColor" opacity="0.7"/>
    </svg>
  );
}