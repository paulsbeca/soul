import { Certificate, Badge } from "@shared/schema";
import { Medal, Calendar } from "lucide-react";

interface CertificateCardProps {
  certificate: Certificate & {
    badge?: Badge;
    course?: {
      title: string;
      code: string;
      wing: string;
    };
  };
}

export default function CertificateCard({ certificate }: CertificateCardProps) {
  const issuedDate = new Date(certificate.issuedAt || new Date()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const getBadgeColor = () => {
    if (certificate.badge?.wing === "sanctum") {
      return "from-mystical-400 to-mystical-600";
    }
    if (certificate.badge?.wing === "orrery") {
      return "from-ethereal-500 to-ethereal-700";
    }
    return "from-golden-400 to-golden-600";
  };

  const getWingText = () => {
    if (certificate.badge?.wing === "sanctum") {
      return "Sanctum of Hidden Echoes";
    }
    if (certificate.badge?.wing === "orrery") {
      return "Orrery of Obscured Realms";
    }
    return "Cross-Wing Achievement";
  };

  return (
    <div className="crystal-border rounded-2xl p-6 bg-cosmic-800/50 backdrop-blur-sm">
      <div className="text-center">
        <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${getBadgeColor()} rounded-full flex items-center justify-center mystical-glow`}>
          <Medal className="text-3xl text-white" />
        </div>
        
        <h4 className={`text-xl font-serif font-bold mb-2 ${certificate.badge?.wing === 'sanctum' ? 'text-mystical-400' : certificate.badge?.wing === 'orrery' ? 'text-ethereal-400' : 'text-golden-400'}`}>
          {certificate.type === "course" 
            ? `${certificate.course?.code} Certificate`
            : certificate.badge?.name || "Achievement Certificate"
          }
        </h4>
        
        <p className="text-cosmic-400 text-sm mb-4">
          {getWingText()}
        </p>
        
        <p className="text-xs text-cosmic-500 mb-4">
          {certificate.type === "course" 
            ? `Completed ${certificate.course?.title || "course"}`
            : certificate.badge?.description || "Special achievement unlocked"
          }
        </p>
        
        <div className="flex items-center justify-center space-x-2 text-xs text-cosmic-400">
          <Calendar className="w-4 h-4" />
          <span>Earned {issuedDate}</span>
        </div>
      </div>
    </div>
  );
}
