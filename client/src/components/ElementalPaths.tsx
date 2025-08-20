import { Mountain, Droplet, Wind, Flame, Infinity, ArrowDown } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const elementalPaths = [
  {
    id: "earth",
    name: "Earth",
    description: "Grounding, stability, manifestation",
    icon: Mountain,
    color: "from-amber-600 to-amber-800",
    textColor: "text-amber-400",
  },
  {
    id: "water",
    name: "Water", 
    description: "Flow, emotion, intuition",
    icon: Droplet,
    color: "from-blue-600 to-blue-800",
    textColor: "text-blue-400",
  },
  {
    id: "air",
    name: "Air",
    description: "Communication, thought, inspiration", 
    icon: Wind,
    color: "from-cyan-500 to-cyan-700",
    textColor: "text-cyan-400",
  },
  {
    id: "fire",
    name: "Fire",
    description: "Transformation, will, passion",
    icon: Flame, 
    color: "from-red-600 to-red-800",
    textColor: "text-red-400",
  },
  {
    id: "aether",
    name: "Aether",
    description: "Spirit, unity, transcendence",
    icon: Infinity,
    color: "from-purple-600 to-purple-800", 
    textColor: "text-purple-400",
  },
  {
    id: "mixed",
    name: "Mixed",
    description: "Balance, integration, harmony",
    icon: ArrowDown,
    color: "from-golden-500 to-golden-700",
    textColor: "text-golden-400",
  },
];

interface ElementalPathsProps {
  currentPath?: string;
  onPathChange?: (path: string) => void;
}

export default function ElementalPaths({ currentPath, onPathChange }: ElementalPathsProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updatePathMutation = useMutation({
    mutationFn: async (elementalPath: string) => {
      await apiRequest("PATCH", "/api/users/elemental-path", { elementalPath });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      toast({
        title: "Elemental Path Updated",
        description: "Your cosmic alignment has been registered.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update elemental path. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handlePathSelect = (pathId: string) => {
    updatePathMutation.mutate(pathId);
    onPathChange?.(pathId);
  };

  return (
    <section className="relative z-10 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-serif font-bold text-ethereal-300 mb-4">Elemental Pathways</h3>
          <p className="text-cosmic-400">Choose your primary elemental affinity to unlock specialized micro-modules</p>
        </div>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {elementalPaths.map((element) => {
            const Icon = element.icon;
            const isSelected = currentPath === element.id;
            
            return (
              <div
                key={element.id}
                className={`crystal-border rounded-2xl p-6 bg-cosmic-800/50 backdrop-blur-sm text-center hover:scale-105 transition-transform duration-300 cursor-pointer ${isSelected ? 'ring-2 ring-ethereal-400' : ''}`}
                onClick={() => handlePathSelect(element.id)}
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${element.color} rounded-full flex items-center justify-center mystical-glow animate-crystal-grow`}>
                  <Icon className="text-2xl text-white" />
                </div>
                <h4 className={`text-lg font-semibold ${element.textColor} mb-2`}>
                  {element.name}
                </h4>
                <p className="text-xs text-cosmic-400">{element.description}</p>
                {isSelected && (
                  <div className="mt-2">
                    <span className="text-xs text-ethereal-400 font-semibold">✓ Selected</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
