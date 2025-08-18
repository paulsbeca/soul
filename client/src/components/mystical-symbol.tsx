import logoImage from "@assets/ChatGPT Image Aug 18, 2025, 12_50_00 AM_1755500285103.webp";

export default function MysticalSymbol() {
  return (
    <div className="w-32 h-32 mx-auto relative" data-testid="mystical-symbol">
      <img 
        src={logoImage} 
        alt="Jakintza Ruha Logo" 
        className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(184,134,11,0.4)]"
      />
    </div>
  );
}
