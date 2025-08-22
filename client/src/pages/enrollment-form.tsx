import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Scroll, Feather, Star, Flame, Heart, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import backgroundImage from "@assets/ChatGPT Image Aug 18, 2025, 12_54_24 AM_1755531868254.webp";
import newLogo from "@assets/ChatGPT Image Aug 21, 2025, 11_07_23 PM_1755839288776.webp";

export default function EnrollmentForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    previousExperience: "",
    spiritualPath: "",
    motivation: "",
    commitment: "",
    preferredStartDate: "",
    timeZone: "",
    accessibility: "",
    emergencyContact: "",
    emergencyPhone: "",
    sacredIntent: "",
    healingFocus: "",
    elementalAffinity: "",
    moonPhasePreference: "",
    investmentLevel: "",
    termsAccepted: false,
    privacyAccepted: false,
    sacredOath: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
        variant: "default",
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        previousExperience: "",
        spiritualPath: "",
        motivation: "",
        commitment: "",
        preferredStartDate: "",
        timeZone: "",
        accessibility: "",
        emergencyContact: "",
        emergencyPhone: "",
        sacredIntent: "",
        healingFocus: "",
        elementalAffinity: "",
        moonPhasePreference: "",
        investmentLevel: "",
        termsAccepted: false,
        privacyAccepted: false,
        sacredOath: false,
      });

    } catch (error) {
      console.error("Enrollment error:", error);
      toast({
        title: "Sacred Communication Error",
        description: "The cosmic forces encountered interference. Please try again, seeker.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" }
  };

  return (
    <section 
      className="min-h-screen text-ethereal-white py-12"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      data-testid="enrollment-form-section"
    >
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          {...fadeInUp}
        >
          <img 
            src={newLogo} 
            alt="Jakintza Ruha Logo" 
            className="h-20 w-auto mx-auto mb-8 object-contain drop-shadow-[0_0_30px_rgba(184,134,11,0.5)]"
          />
          <h1 className="font-gothic text-4xl md:text-5xl font-bold mb-4 text-golden-rune">
            Enrollment Scroll of Remembrance
          </h1>
          <p className="text-xl text-silver-star/90 leading-relaxed max-w-3xl mx-auto">
            Sacred seeker, as you prepare to enter The Athenaeum's hallowed halls, 
            we must first understand your soul's calling and spiritual readiness.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="mystical-border bg-gradient-to-br from-shadow-purple/20 to-deep-purple/20 backdrop-blur-sm rounded-lg p-8"
          {...fadeInUp}
          style={{ animationDelay: "0.3s" }}
        >
          <form onSubmit={handleSubmit} className="space-y-8" data-testid="enrollment-form">
            {/* Personal Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Star className="text-golden-rune text-2xl" />
                <h2 className="font-gothic text-2xl font-bold text-golden-rune">Personal Sacred Details</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" className="text-silver-star font-medium">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="mystical-input"
                    placeholder="Your earthly name"
                    required
                    data-testid="input-full-name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-silver-star font-medium">Sacred Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mystical-input"
                    placeholder="your.name@domain.com"
                    required
                    data-testid="input-email"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-silver-star font-medium">Contact Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mystical-input"
                    placeholder="Your telephone"
                    data-testid="input-phone"
                  />
                </div>
                
                <div>
                  <Label htmlFor="dateOfBirth" className="text-silver-star font-medium">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="mystical-input"
                    data-testid="input-date-of-birth"
                  />
                </div>
              </div>
            </div>

            {/* Spiritual Background */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Moon className="text-golden-rune text-2xl" />
                <h2 className="font-gothic text-2xl font-bold text-golden-rune">Spiritual Background</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="spiritualPath" className="text-silver-star font-medium">Current Spiritual Path</Label>
                  <Select onValueChange={(value) => handleSelectChange("spiritualPath", value)}>
                    <SelectTrigger className="mystical-input" data-testid="select-spiritual-path">
                      <SelectValue placeholder="Choose your path..." />
                    </SelectTrigger>
                    <SelectContent className="mystical-dropdown">
                      <SelectItem value="beginner">Beginner - New to spiritual practices</SelectItem>
                      <SelectItem value="eclectic">Eclectic - Drawing from multiple traditions</SelectItem>
                      <SelectItem value="wiccan">Wiccan/Pagan</SelectItem>
                      <SelectItem value="shamanic">Shamanic Practices</SelectItem>
                      <SelectItem value="ceremonial">Ceremonial Magic</SelectItem>
                      <SelectItem value="intuitive">Intuitive/Self-Taught</SelectItem>
                      <SelectItem value="other">Other Path</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="previousExperience" className="text-silver-star font-medium">Previous Mystical Experience</Label>
                  <Textarea
                    id="previousExperience"
                    name="previousExperience"
                    value={formData.previousExperience}
                    onChange={handleInputChange}
                    className="mystical-input min-h-[100px]"
                    placeholder="Share your journey with the sacred arts..."
                    data-testid="textarea-previous-experience"
                  />
                </div>
                
                <div>
                  <Label htmlFor="elementalAffinity" className="text-silver-star font-medium">Elemental Affinity</Label>
                  <Select onValueChange={(value) => handleSelectChange("elementalAffinity", value)}>
                    <SelectTrigger className="mystical-input" data-testid="select-elemental-affinity">
                      <SelectValue placeholder="Which element calls to you?" />
                    </SelectTrigger>
                    <SelectContent className="mystical-dropdown">
                      <SelectItem value="earth">Earth - Grounding, Nature, Stability</SelectItem>
                      <SelectItem value="water">Water - Emotions, Intuition, Flow</SelectItem>
                      <SelectItem value="fire">Fire - Passion, Transformation, Energy</SelectItem>
                      <SelectItem value="air">Air - Wisdom, Communication, Clarity</SelectItem>
                      <SelectItem value="spirit">Spirit - Divine Connection, Unity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Sacred Intent */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Flame className="text-golden-rune text-2xl" />
                <h2 className="font-gothic text-2xl font-bold text-golden-rune">Sacred Intent</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="motivation" className="text-silver-star font-medium">What draws you to The Athenaeum? *</Label>
                  <Textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    className="mystical-input min-h-[120px]"
                    placeholder="Speak from your heart about your calling..."
                    required
                    data-testid="textarea-motivation"
                  />
                </div>
                
                <div>
                  <Label htmlFor="sacredIntent" className="text-silver-star font-medium">Sacred Intent for Learning</Label>
                  <Select onValueChange={(value) => handleSelectChange("sacredIntent", value)}>
                    <SelectTrigger className="mystical-input" data-testid="select-sacred-intent">
                      <SelectValue placeholder="What do you seek?" />
                    </SelectTrigger>
                    <SelectContent className="mystical-dropdown">
                      <SelectItem value="personal-growth">Personal Spiritual Growth</SelectItem>
                      <SelectItem value="healing">Healing & Wellness Practice</SelectItem>
                      <SelectItem value="divination">Divination & Oracle Work</SelectItem>
                      <SelectItem value="energy-work">Energy Work & Chakras</SelectItem>
                      <SelectItem value="ritual-magic">Ritual & Ceremonial Magic</SelectItem>
                      <SelectItem value="ancestral">Ancestral Connection</SelectItem>
                      <SelectItem value="teaching">Teaching & Sharing Wisdom</SelectItem>
                      <SelectItem value="all">All Aspects of the Sacred Path</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="healingFocus" className="text-silver-star font-medium">Areas of Healing Interest</Label>
                  <Select onValueChange={(value) => handleSelectChange("healingFocus", value)}>
                    <SelectTrigger className="mystical-input" data-testid="select-healing-focus">
                      <SelectValue placeholder="What healing calls to you?" />
                    </SelectTrigger>
                    <SelectContent className="mystical-dropdown">
                      <SelectItem value="self-healing">Self-Healing & Inner Work</SelectItem>
                      <SelectItem value="energy-healing">Energy Healing for Others</SelectItem>
                      <SelectItem value="plant-medicine">Plant Medicine & Herbalism</SelectItem>
                      <SelectItem value="crystal-healing">Crystal & Stone Healing</SelectItem>
                      <SelectItem value="sound-healing">Sound & Vibrational Healing</SelectItem>
                      <SelectItem value="ancestral-healing">Ancestral & Generational Healing</SelectItem>
                      <SelectItem value="trauma-healing">Sacred Trauma Healing</SelectItem>
                      <SelectItem value="not-interested">Not Currently Interested</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Practical Details */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Heart className="text-golden-rune text-2xl" />
                <h2 className="font-gothic text-2xl font-bold text-golden-rune">Sacred Commitment</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="commitment" className="text-silver-star font-medium">Time Commitment Available *</Label>
                  <Select onValueChange={(value) => handleSelectChange("commitment", value)}>
                    <SelectTrigger className="mystical-input" data-testid="select-commitment">
                      <SelectValue placeholder="How much time can you dedicate?" />
                    </SelectTrigger>
                    <SelectContent className="mystical-dropdown">
                      <SelectItem value="1-2-hours">1-2 hours per week</SelectItem>
                      <SelectItem value="3-5-hours">3-5 hours per week</SelectItem>
                      <SelectItem value="6-10-hours">6-10 hours per week</SelectItem>
                      <SelectItem value="11-plus-hours">11+ hours per week</SelectItem>
                      <SelectItem value="intensive">Intensive Study (15+ hours)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="preferredStartDate" className="text-silver-star font-medium">Preferred Start Date</Label>
                  <Input
                    id="preferredStartDate"
                    name="preferredStartDate"
                    type="date"
                    value={formData.preferredStartDate}
                    onChange={handleInputChange}
                    className="mystical-input"
                    data-testid="input-start-date"
                  />
                </div>
                
                <div>
                  <Label htmlFor="timeZone" className="text-silver-star font-medium">Time Zone</Label>
                  <Input
                    id="timeZone"
                    name="timeZone"
                    type="text"
                    value={formData.timeZone}
                    onChange={handleInputChange}
                    className="mystical-input"
                    placeholder="e.g., EST, PST, GMT+1"
                    data-testid="input-time-zone"
                  />
                </div>
                
                <div>
                  <Label htmlFor="moonPhasePreference" className="text-silver-star font-medium">Preferred Moon Phase for Learning</Label>
                  <Select onValueChange={(value) => handleSelectChange("moonPhasePreference", value)}>
                    <SelectTrigger className="mystical-input" data-testid="select-moon-phase">
                      <SelectValue placeholder="When do you feel most receptive?" />
                    </SelectTrigger>
                    <SelectContent className="mystical-dropdown">
                      <SelectItem value="new-moon">New Moon - New Beginnings</SelectItem>
                      <SelectItem value="waxing-moon">Waxing Moon - Growth & Learning</SelectItem>
                      <SelectItem value="full-moon">Full Moon - Peak Energy & Insight</SelectItem>
                      <SelectItem value="waning-moon">Waning Moon - Release & Reflection</SelectItem>
                      <SelectItem value="no-preference">No Preference</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Investment Level */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Feather className="text-golden-rune text-2xl" />
                <h2 className="font-gothic text-2xl font-bold text-golden-rune">Sacred Exchange</h2>
              </div>
              
              <div>
                <Label htmlFor="investmentLevel" className="text-silver-star font-medium">Investment Level Interest *</Label>
                <Select onValueChange={(value) => handleSelectChange("investmentLevel", value)}>
                  <SelectTrigger className="mystical-input" data-testid="select-investment-level">
                    <SelectValue placeholder="What investment feels aligned?" />
                  </SelectTrigger>
                  <SelectContent className="mystical-dropdown">
                    <SelectItem value="seeker">Seeker Level - $97/month</SelectItem>
                    <SelectItem value="adept">Adept Level - $197/month</SelectItem>
                    <SelectItem value="mystic">Mystic Level - $297/month</SelectItem>
                    <SelectItem value="sage">Sage Level - $497/month</SelectItem>
                    <SelectItem value="consultation">Need Guidance on Best Fit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Scroll className="text-golden-rune text-2xl" />
                <h2 className="font-gothic text-2xl font-bold text-golden-rune">Safety & Accessibility</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="emergencyContact" className="text-silver-star font-medium">Emergency Contact Name</Label>
                  <Input
                    id="emergencyContact"
                    name="emergencyContact"
                    type="text"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="mystical-input"
                    placeholder="Name of trusted person"
                    data-testid="input-emergency-contact"
                  />
                </div>
                
                <div>
                  <Label htmlFor="emergencyPhone" className="text-silver-star font-medium">Emergency Contact Phone</Label>
                  <Input
                    id="emergencyPhone"
                    name="emergencyPhone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    className="mystical-input"
                    placeholder="Emergency phone number"
                    data-testid="input-emergency-phone"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="accessibility" className="text-silver-star font-medium">Accessibility Needs</Label>
                <Textarea
                  id="accessibility"
                  name="accessibility"
                  value={formData.accessibility}
                  onChange={handleInputChange}
                  className="mystical-input min-h-[80px]"
                  placeholder="Any accommodations needed for your learning journey..."
                  data-testid="textarea-accessibility"
                />
              </div>
            </div>

            {/* Sacred Agreements */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Star className="text-golden-rune text-2xl" />
                <h2 className="font-gothic text-2xl font-bold text-golden-rune">Sacred Agreements</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="termsAccepted"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, termsAccepted: checked as boolean }))
                    }
                    className="mystical-checkbox mt-1"
                    data-testid="checkbox-terms"
                  />
                  <Label htmlFor="termsAccepted" className="text-silver-star leading-relaxed">
                    I agree to the Terms of Sacred Study and understand this is a spiritual education program
                  </Label>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="privacyAccepted"
                    checked={formData.privacyAccepted}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, privacyAccepted: checked as boolean }))
                    }
                    className="mystical-checkbox mt-1"
                    data-testid="checkbox-privacy"
                  />
                  <Label htmlFor="privacyAccepted" className="text-silver-star leading-relaxed">
                    I consent to my information being used for program enrollment and communication
                  </Label>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="sacredOath"
                    checked={formData.sacredOath}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, sacredOath: checked as boolean }))
                    }
                    className="mystical-checkbox mt-1"
                    data-testid="checkbox-sacred-oath"
                  />
                  <Label htmlFor="sacredOath" className="text-silver-star leading-relaxed">
                    I take a sacred oath to approach this learning with respect, openness, and integrity
                  </Label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.termsAccepted || !formData.privacyAccepted || !formData.sacredOath}
                  className="mystical-border bg-gradient-to-r from-golden-rune to-mystical-500 hover:from-mystical-500 hover:to-golden-rune px-12 py-4 rounded-lg font-gothic text-lg font-bold text-black transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="button-submit-enrollment"
                >
                  {isSubmitting ? (
                    <>
                      <Scroll className="animate-spin mr-2" size={20} />
                      Sending Sacred Scroll...
                    </>
                  ) : (
                    <>
                      <Scroll className="mr-2" size={20} />
                      Submit Sacred Enrollment
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}