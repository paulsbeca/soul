import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import CertificateCard from "@/components/CertificateCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Certificates() {
  const { data: certificates = [] } = useQuery<any[]>({
    queryKey: ["/api/certificates"],
  });

  const { data: userBadges = [] } = useQuery<any[]>({
    queryKey: ["/api/users/badges"],
  });

  // Combine certificates with badge/course information
  const enrichedCertificates = (certificates as any[]).map((cert: any) => {
    if (cert.type === "badge" && cert.badgeId) {
      const userBadge = userBadges.find((ub: any) => ub.badgeId === cert.badgeId);
      return {
        ...cert,
        badge: userBadge?.badge,
      };
    }
    return cert;
  });

  const courseCertificates = enrichedCertificates.filter((cert: any) => cert.type === "course");
  const badgeCertificates = enrichedCertificates.filter((cert: any) => cert.type === "badge");
  const levelCertificates = enrichedCertificates.filter((cert: any) => cert.type === "level");

  const handleDownload = (certificateId: string) => {
    // TODO: Implement PDF certificate generation
    console.log("Downloading certificate:", certificateId);
  };

  const handleShare = (certificateId: string) => {
    // TODO: Implement certificate sharing
    console.log("Sharing certificate:", certificateId);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-ethereal-300 mb-4">Sacred Certificates</h1>
            <p className="text-cosmic-400">Your mystical achievements and mastery credentials</p>
          </div>

          {/* Certificate Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm text-center">
              <CardHeader>
                <CardTitle className="text-golden-400 flex items-center justify-center gap-2">
                  <Award className="w-5 h-5" />
                  Course Certificates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cosmic-50">{courseCertificates.length}</p>
                <p className="text-sm text-cosmic-400">courses completed</p>
              </CardContent>
            </Card>

            <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm text-center">
              <CardHeader>
                <CardTitle className="text-mystical-400 flex items-center justify-center gap-2">
                  <Award className="w-5 h-5" />
                  Badge Certificates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cosmic-50">{badgeCertificates.length}</p>
                <p className="text-sm text-cosmic-400">special achievements</p>
              </CardContent>
            </Card>

            <Card className="crystal-border bg-cosmic-800/50 backdrop-blur-sm text-center">
              <CardHeader>
                <CardTitle className="text-ethereal-400 flex items-center justify-center gap-2">
                  <Award className="w-5 h-5" />
                  Level Certificates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-cosmic-50">{levelCertificates.length}</p>
                <p className="text-sm text-cosmic-400">rank advancements</p>
              </CardContent>
            </Card>
          </div>

          {/* Course Certificates */}
          {courseCertificates.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-serif font-bold text-mystical-300 mb-8 text-center">
                Course Mastery Certificates
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courseCertificates.map((certificate: any) => (
                  <div key={certificate.id} className="relative group">
                    <CertificateCard certificate={certificate} />
                    <div className="absolute inset-0 bg-cosmic-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center space-x-4">
                      <Button
                        size="sm"
                        onClick={() => handleDownload(certificate.id)}
                        className="bg-mystical-600 hover:bg-mystical-500"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare(certificate.id)}
                        className="border-ethereal-400 text-ethereal-400 hover:bg-ethereal-400/10"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Badge Certificates */}
          {badgeCertificates.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-serif font-bold text-ethereal-300 mb-8 text-center">
                Achievement Badges
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {badgeCertificates.map((certificate: any) => (
                  <div key={certificate.id} className="relative group">
                    <CertificateCard certificate={certificate} />
                    <div className="absolute inset-0 bg-cosmic-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center space-x-4">
                      <Button
                        size="sm"
                        onClick={() => handleDownload(certificate.id)}
                        className="bg-ethereal-600 hover:bg-ethereal-500"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare(certificate.id)}
                        className="border-mystical-400 text-mystical-400 hover:bg-mystical-400/10"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Level Certificates */}
          {levelCertificates.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-serif font-bold text-golden-400 mb-8 text-center">
                Rank Advancement Certificates
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {levelCertificates.map((certificate: any) => (
                  <div key={certificate.id} className="relative group">
                    <CertificateCard certificate={certificate} />
                    <div className="absolute inset-0 bg-cosmic-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center space-x-4">
                      <Button
                        size="sm"
                        onClick={() => handleDownload(certificate.id)}
                        className="bg-golden-600 hover:bg-golden-500"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShare(certificate.id)}
                        className="border-golden-400 text-golden-400 hover:bg-golden-400/10"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {(certificates as any[]).length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cosmic-600 to-cosmic-700 rounded-full flex items-center justify-center">
                <Award className="text-4xl text-cosmic-400" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-cosmic-400 mb-4">
                No Certificates Yet
              </h3>
              <p className="text-cosmic-500 mb-8 max-w-md mx-auto">
                Complete courses and earn badges to receive your sacred certificates of mastery.
              </p>
              <Button
                onClick={() => window.location.href = "/courses"}
                className="bg-gradient-to-r from-mystical-600 to-ethereal-600 hover:from-mystical-500 hover:to-ethereal-500"
              >
                Explore Courses
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
