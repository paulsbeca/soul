import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import mysticalChamberBg from "@assets/ChatGPT Image Aug 18, 2025, 12_54_24 AM_1755531868254.webp";

export default function NotFound() {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${mysticalChamberBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <Card className="w-full max-w-md mx-4 relative z-10 bg-black/80 border-golden-rune/50">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-golden-rune" />
            <h1 className="text-2xl font-bold text-ethereal-white font-gothic">404 - Path Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-silver-star/90">
            The sacred path you seek does not exist in this realm. Return to the light of remembering.
          </p>
          
          <div className="mt-6">
            <a 
              href="/" 
              className="bg-gradient-to-r from-shadow-purple to-deep-purple px-6 py-3 rounded-lg hover:scale-105 transition-transform text-ethereal-white"
              data-testid="button-return-home"
            >
              Return to the Sacred Circle
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
