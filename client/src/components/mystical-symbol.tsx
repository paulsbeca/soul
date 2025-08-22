import logoImage from "@assets/ChatGPT Image Aug 21, 2025, 09_55_22 PM_1755838981471.png";

export default function MysticalSymbol() {
  return (
    <div className="w-48 h-48 mx-auto relative" data-testid="mystical-symbol">
      <img 
        src={logoImage} 
        alt="Jakintza Ruha Logo" 
        className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(184,134,11,0.5)]"
      />
    </div>
  );
}
