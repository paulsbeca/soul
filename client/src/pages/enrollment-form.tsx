import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, User, Mail, Phone, BookOpen, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import backgroundImage from "@assets/background_1755498699765.webp";

export default function EnrollmentForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    interests: "",
    motivation: "",
    availability: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest("/api/enrollment", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast({
        title: "Enrollment Request Submitted",
        description: "Your sacred journey application has been sent to Beca. You will hear back soon.",
        duration: 7000,
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        experience: "",
        interests: "",
        motivation: "",
        availability: ""
      });

    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was an issue sending your enrollment request. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      className="min-h-screen text-ethereal-white" 
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/75"></div>
      
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <Link 
          href="/athenaeum"
          className="inline-flex items-center text-golden-rune hover:text-silver-star transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-[-2px] transition-transform" />
          ← Back to Athenaeum
        </Link>
      </nav>

      <div className="relative z-10 py-20">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            {...fadeInUp}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-golden-rune to-cosmic-blue rounded-full flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-void-black" />
            </div>
            
            <h1 className="font-gothic text-4xl md:text-5xl text-golden-rune mb-4">
              Sacred Enrollment
            </h1>
            
            <p className="text-xl text-silver-star/90 leading-relaxed">
              Begin your mystical learning journey at Jakintza Ruha. 
              Share your story and we'll guide you to your perfect path.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mystical-border p-8 rounded-lg grimoire-texture"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-silver-star/60" />
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="pl-10 bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors"
                    required
                    data-testid="input-fullname"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-silver-star/60" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors"
                    required
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-silver-star/60" />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="pl-10 bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors"
                  data-testid="input-phone"
                />
              </div>

              {/* Background & Experience */}
              <div className="space-y-4">
                <h3 className="font-gothic text-xl text-golden-rune flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Your Sacred Background
                </h3>
                
                <Textarea
                  name="experience"
                  placeholder="Tell us about your spiritual or mystical background and experience..."
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows={4}
                  className="bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors resize-none"
                  required
                  data-testid="textarea-experience"
                />
              </div>

              {/* Interests */}
              <div className="space-y-4">
                <h3 className="font-gothic text-xl text-golden-rune flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Areas of Interest
                </h3>
                
                <Textarea
                  name="interests"
                  placeholder="What mystical subjects or practices interest you most? (e.g., ancestral wisdom, cosmic mechanics, shadow work, dimensional travel...)"
                  value={formData.interests}
                  onChange={handleInputChange}
                  rows={3}
                  className="bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors resize-none"
                  required
                  data-testid="textarea-interests"
                />
              </div>

              {/* Motivation */}
              <div className="space-y-4">
                <h3 className="font-gothic text-xl text-golden-rune flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Your Sacred Calling
                </h3>
                
                <Textarea
                  name="motivation"
                  placeholder="What draws you to Jakintza Ruha? What do you hope to achieve or learn through your studies?"
                  value={formData.motivation}
                  onChange={handleInputChange}
                  rows={4}
                  className="bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors resize-none"
                  required
                  data-testid="textarea-motivation"
                />
              </div>

              {/* Availability */}
              <div className="space-y-4">
                <h3 className="font-gothic text-xl text-golden-rune flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Time Commitment
                </h3>
                
                <Textarea
                  name="availability"
                  placeholder="What is your availability for classes and study? Any time preferences or constraints we should know about?"
                  value={formData.availability}
                  onChange={handleInputChange}
                  rows={3}
                  className="bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors resize-none"
                  data-testid="textarea-availability"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-golden-rune to-cosmic-blue hover:from-golden-rune/90 hover:to-cosmic-blue/90 text-void-black font-semibold py-4 transition-all duration-500 hover:scale-105 flex items-center justify-center gap-2"
                data-testid="button-submit"
              >
                {isSubmitting ? (
                  "Sending Sacred Application..."
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Enrollment Request
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 p-4 bg-golden-rune/10 border border-golden-rune/30 rounded-lg text-center">
              <p className="text-golden-rune text-sm font-semibold mb-2">
                ✨ What Happens Next?
              </p>
              <p className="text-silver-star/70 text-sm leading-relaxed">
                Your application will be sent directly to Beca, who will review your sacred journey 
                and respond with guidance on your path forward. This usually takes 1-3 days.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}