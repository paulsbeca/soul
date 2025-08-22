import { motion } from "framer-motion";
import { Link } from "wouter";
import { Scroll, BookOpen, Star, Sparkles } from "lucide-react";
import backgroundImage from "@assets/ChatGPT Image Aug 18, 2025, 12_54_24 AM_1755531868254.webp";
import logoImage from "@assets/ChatGPT Image Aug 21, 2025, 11_07_23 PM_1755839288776.webp";

export default function AthenaeumEnrollmentGate() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" }
  };

  return (
    <section 
      className="min-h-screen text-ethereal-white flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      data-testid="enrollment-gate-section"
    >
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Back to Main */}
      <Link href="/remember" className="absolute top-6 left-6 z-20">
        <button className="text-golden-rune hover:text-silver-star transition-colors" data-testid="button-back">
          ← Back to Sacred Teachings
        </button>
      </Link>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Logo */}
        <motion.div 
          className="mb-12"
          {...fadeInUp}
        >
          <img 
            src={logoImage} 
            alt="Jakintza Ruha Logo" 
            className="h-24 w-auto mx-auto object-contain drop-shadow-[0_0_30px_rgba(184,134,11,0.5)]"
          />
        </motion.div>

        {/* Main Content */}
        <motion.div
          {...fadeInUp}
          style={{ animationDelay: "0.3s" }}
        >
          <h1 className="font-gothic text-4xl md:text-5xl font-bold mb-8 text-golden-rune">
            The Athenaeum Awaits
          </h1>
          
          <div className="mb-12">
            <motion.div 
              className="mystical-border bg-gradient-to-br from-shadow-purple/30 to-deep-purple/30 backdrop-blur-sm p-8 rounded-lg mb-8"
              {...fadeInUp}
              style={{ animationDelay: "0.6s" }}
            >
              <div className="flex justify-center mb-6">
                <BookOpen className="text-golden-rune text-4xl" />
              </div>
              
              <p className="text-xl text-silver-star/90 leading-relaxed mb-6">
                The sacred halls of The Athenaeum hold ancient wisdom, mystical teachings, 
                and transformative knowledge that has been preserved across millennia.
              </p>
              
              <p className="text-lg text-ethereal-white/80">
                To enter these hallowed grounds of learning, seekers must first complete 
                their <span className="text-golden-rune font-semibold">Enrollment Scroll of Remembrance</span> 
                – a sacred commitment to their spiritual journey.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div 
              className="grid md:grid-cols-3 gap-6 mb-12"
              {...fadeInUp}
              style={{ animationDelay: "0.9s" }}
            >
              <div className="mystical-border bg-gradient-to-br from-mystical-500/20 to-ethereal-400/20 backdrop-blur-sm p-6 rounded-lg">
                <Star className="text-golden-rune text-2xl mb-4 mx-auto" />
                <h3 className="font-gothic text-lg font-bold mb-2 text-golden-rune">Sacred Curriculum</h3>
                <p className="text-sm text-silver-star/80">Four pillars of mystical wisdom and spiritual transformation</p>
              </div>
              
              <div className="mystical-border bg-gradient-to-br from-mystical-500/20 to-ethereal-400/20 backdrop-blur-sm p-6 rounded-lg">
                <Sparkles className="text-golden-rune text-2xl mb-4 mx-auto" />
                <h3 className="font-gothic text-lg font-bold mb-2 text-golden-rune">Personal Guidance</h3>
                <p className="text-sm text-silver-star/80">Direct mentorship from Beca and the mystical council</p>
              </div>
              
              <div className="mystical-border bg-gradient-to-br from-mystical-500/20 to-ethereal-400/20 backdrop-blur-sm p-6 rounded-lg">
                <Scroll className="text-golden-rune text-2xl mb-4 mx-auto" />
                <h3 className="font-gothic text-lg font-bold mb-2 text-golden-rune">Ancient Texts</h3>
                <p className="text-sm text-silver-star/80">Access to restricted grimoires and sacred manuscripts</p>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              {...fadeInUp}
              style={{ animationDelay: "1.2s" }}
            >
              <Link href="/enrollment-form">
                <motion.button
                  className="mystical-border bg-gradient-to-r from-golden-rune to-mystical-500 hover:from-mystical-500 hover:to-golden-rune px-8 py-4 rounded-lg font-gothic text-lg font-bold text-black transition-all duration-500 shadow-lg"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 30px hsl(43, 74%, 49%, 0.4)"
                  }}
                  data-testid="button-enroll"
                >
                  <Scroll className="inline mr-2" size={20} />
                  Complete Sacred Enrollment
                </motion.button>
              </Link>
              
              <Link href="/athenaeum/simple">
                <motion.button
                  className="mystical-border bg-gradient-to-r from-shadow-purple/50 to-deep-purple/50 hover:from-deep-purple/70 hover:to-shadow-purple/70 px-8 py-4 rounded-lg font-gothic text-lg font-medium transition-all duration-500"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px hsl(259, 83%, 57%, 0.3)"
                  }}
                  data-testid="button-continue"
                >
                  <BookOpen className="inline mr-2" size={20} />
                  Continue to Athenaeum
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Disclaimer */}
          <motion.p 
            className="text-sm text-silver-star/60 italic"
            {...fadeInUp}
            style={{ animationDelay: "1.5s" }}
          >
            "When the student is ready, the teacher appears" - Ancient Wisdom
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}