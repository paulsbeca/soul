import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, User, Mail, Phone, BookOpen, Sparkles, Send, Calendar, MapPin, Globe, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import backgroundImage from "@assets/ChatGPT Image Aug 18, 2025, 12_54_24 AM_1755531868254.webp";
import newLogo from "@assets/ChatGPT Image Aug 21, 2025, 09_55_22 PM_1755838981471.png";

export default function EnrollmentForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    pronouns: "",
    email: "",
    phone: "",
    location: "",
    pathOfStudy: [] as string[],
    enrollmentTimeline: "",
    realmOfEntry: "",
    languages: "",
    accommodations: "",
    howHeard: "",
    seekToReclaim: ""
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

  const handlePathOfStudyChange = (path: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      pathOfStudy: checked 
        ? [...prev.pathOfStudy, path]
        : prev.pathOfStudy.filter(p => p !== path)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enrollment", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit enrollment");
      }

      toast({
        title: "Sacred Enrollment Complete",
        description: "Your scroll of remembrance has been sent to The Athenaeum. Welcome, seeker.",
        duration: 7000,
      });

      // Reset form
      setFormData({
        fullName: "",
        dateOfBirth: "",
        pronouns: "",
        email: "",
        phone: "",
        location: "",
        pathOfStudy: [],
        enrollmentTimeline: "",
        realmOfEntry: "",
        languages: "",
        accommodations: "",
        howHeard: "",
        seekToReclaim: ""
      });

    } catch (error) {
      toast({
        title: "Mystical Interference",
        description: "The cosmic energies are disrupted. Please try sending your scroll again.",
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
            <img 
              src={newLogo} 
              alt="Jakintza Ruha Logo" 
              className="w-32 h-32 mx-auto mb-6"
            />
            
            <h1 className="font-gothic text-4xl md:text-5xl text-golden-rune mb-6">
              The Athenæum: Enrollment Scroll of Remembrance
            </h1>
            
            <div className="text-center space-y-2 mb-8">
              <p className="text-golden-rune italic text-lg">
                "To enroll is not only to study, but to remember.
              </p>
              <p className="text-golden-rune italic text-lg">
                Every name written here is a vow to the Pillars of Ruha,
              </p>
              <p className="text-golden-rune italic text-lg">
                a promise to awaken what was forgotten."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mystical-border p-8 rounded-lg grimoire-texture"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Seeker's Identity */}
              <div className="space-y-6">
                <h3 className="font-gothic text-2xl text-golden-rune border-b border-golden-rune/30 pb-2">
                  Seeker's Identity
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-silver-star/60" />
                    <Input
                      type="text"
                      name="fullName"
                      placeholder="Name remembered in this life"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="pl-10 bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors"
                      required
                      data-testid="input-fullname"
                    />
                  </div>

                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-silver-star/60" />
                    <Input
                      type="date"
                      name="dateOfBirth"
                      placeholder="Date of Birth (marking your arrival)"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="pl-10 bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors"
                      data-testid="input-dateofbirth"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="relative">
                    <Heart className="absolute left-3 top-3 w-5 h-5 text-silver-star/60" />
                    <Input
                      type="text"
                      name="pronouns"
                      placeholder="Pronouns carried in truth"
                      value={formData.pronouns}
                      onChange={handleInputChange}
                      className="pl-10 bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors"
                      data-testid="input-pronouns"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-silver-star/60" />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors"
                      required
                      data-testid="input-email"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-silver-star/60" />
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10 bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors"
                      data-testid="input-phone"
                    />
                  </div>
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-silver-star/60" />
                  <Input
                    type="text"
                    name="location"
                    placeholder="Dwelling place in this world"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="pl-10 bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors"
                    data-testid="input-location"
                  />
                </div>
              </div>

              {/* Path of Study */}
              <div className="space-y-6">
                <h3 className="font-gothic text-2xl text-golden-rune border-b border-golden-rune/30 pb-2">
                  Path of Study
                </h3>
                
                <div className="text-golden-rune mb-4">
                  <label className="flex items-center space-x-3 mb-4">
                    <Checkbox 
                      checked={true}
                      className="border-golden-rune data-[state=checked]:bg-golden-rune" 
                    />
                    <span className="text-lg">Adult Seeker</span>
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Cultural Respect & Ancestral Memory",
                    "Cosmic Vision & Celestial Mysteries", 
                    "Elemental Teachings (Earth, Air, Fire, Water, Aether)",
                    "Languages of the Living & the Forgotten",
                    "Sacred Arts (Alchemy, Ritual, Divination)"
                  ].map((path) => (
                    <label key={path} className="flex items-start space-x-3 text-silver-star cursor-pointer">
                      <Checkbox 
                        checked={formData.pathOfStudy.includes(path)}
                        onCheckedChange={(checked) => handlePathOfStudyChange(path, !!checked)}
                        className="border-golden-rune data-[state=checked]:bg-golden-rune mt-1" 
                      />
                      <span>{path}</span>
                    </label>
                  ))}
                </div>

                <div className="relative">
                  <Input
                    type="text"
                    name="customPath"
                    placeholder="Other: ___________________________________"
                    className="bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors"
                    data-testid="input-custompath"
                  />
                </div>
              </div>

              {/* Additional Threads of Your Story */}
              <div className="space-y-6">
                <h3 className="font-gothic text-2xl text-golden-rune border-b border-golden-rune/30 pb-2">
                  Additional Threads of Your Story
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-silver-star/60" />
                    <Input
                      type="text"
                      name="enrollmentTimeline"
                      placeholder="When do you wish to begin your remembrance?"
                      value={formData.enrollmentTimeline}
                      onChange={handleInputChange}
                      className="pl-10 bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors"
                      data-testid="input-timeline"
                    />
                  </div>

                  <div className="relative">
                    <Sparkles className="absolute left-3 top-3 w-5 h-5 text-silver-star/60" />
                    <Input
                      type="text"
                      name="realmOfEntry"
                      placeholder="Realm of Entry (if known)"
                      value={formData.realmOfEntry}
                      onChange={handleInputChange}
                      className="pl-10 bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors"
                      data-testid="input-realm"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 w-5 h-5 text-silver-star/60" />
                    <Input
                      type="text"
                      name="languages"
                      placeholder="Languages spoken or calling to you"
                      value={formData.languages}
                      onChange={handleInputChange}
                      className="pl-10 bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors"
                      data-testid="input-languages"
                    />
                  </div>

                  <div className="relative">
                    <Heart className="absolute left-3 top-3 w-5 h-5 text-silver-star/60" />
                    <Input
                      type="text"
                      name="accommodations"
                      placeholder="Accommodations or sacred needs"
                      value={formData.accommodations}
                      onChange={handleInputChange}
                      className="pl-10 bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors"
                      data-testid="input-accommodations"
                    />
                  </div>
                </div>

                <Textarea
                  name="howHeard"
                  placeholder="How did you hear the Call of The Athenæum?"
                  value={formData.howHeard}
                  onChange={handleInputChange}
                  rows={3}
                  className="bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors resize-none"
                  data-testid="textarea-howheard"
                />

                <Textarea
                  name="seekToReclaim"
                  placeholder="What do you seek to reclaim or remember?"
                  value={formData.seekToReclaim}
                  onChange={handleInputChange}
                  rows={4}
                  className="bg-cosmic-blue/30 border border-golden-rune/50 rounded-lg px-6 py-4 text-ethereal-white placeholder:text-silver-star/70 focus:border-golden-rune focus:outline-none transition-colors resize-none"
                  required
                  data-testid="textarea-seekreclaim"
                />
              </div>

              {/* Sacred Commitment */}
              <div className="space-y-6 bg-golden-rune/10 border border-golden-rune/30 rounded-lg p-6">
                <h3 className="font-gothic text-2xl text-golden-rune text-center">
                  Sacred Commitment
                </h3>
                
                <div className="text-silver-star space-y-3">
                  <p>By placing my name upon this scroll, I vow to:</p>
                  <ul className="space-y-2 pl-4">
                    <li>• Honor the Four Pillars of Jakintza Ruha.</li>
                    <li>• Enter with integrity, respect, and remembrance.</li>
                    <li>• Treat knowledge as sacred inheritance, never commodity.</li>
                  </ul>
                </div>
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