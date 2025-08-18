import { motion } from "framer-motion";
import { ExternalLink, Calendar, BookOpen, Star, Sprout, Infinity, Gem, Flame } from "lucide-react";
import NewsletterForm from "@/components/newsletter-form";
import logoImage from "@assets/ChatGPT Image Aug 18, 2025, 12_50_00 AM_1755500285103.webp";
import mysticalChamberBg from "@assets/ChatGPT Image Aug 18, 2025, 12_54_24 AM_1755531868254.webp";

export default function MainContent() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" }
  };

  return (
    <section 
      className="min-h-screen text-ethereal-white" 
      style={{
        backgroundImage: `url(${mysticalChamberBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      data-testid="main-content-section"
    >
      <div className="absolute inset-0 bg-black/40"></div>
      {/* Navigation */}
      <nav className="relative sticky top-0 z-50 grimoire-texture border-b border-golden-rune/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center"
              {...fadeInUp}
            >
              <img 
                src={logoImage} 
                alt="Jakintza Ruha Logo" 
                className="h-10 w-auto object-contain drop-shadow-[0_0_15px_rgba(184,134,11,0.3)]"
              />
            </motion.div>
            <div className="hidden md:flex space-x-8">
              <a href="#story" className="hover:text-golden-rune transition-colors" data-testid="link-story">The Story</a>
              <a href="#movement" className="hover:text-golden-rune transition-colors" data-testid="link-movement">The Movement</a>
              <a href="/four-pillars" className="hover:text-golden-rune transition-colors" data-testid="link-four-pillars">Four Pillars</a>
              <a href="/aionara" className="hover:text-golden-rune transition-colors" data-testid="link-aionara">Aionara</a>
              <a href="#athenaeum" className="hover:text-golden-rune transition-colors" data-testid="link-athenaeum">Athenaeum</a>
              <a href="#contact" className="hover:text-golden-rune transition-colors" data-testid="link-contact">Connect</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            className="font-gothic text-4xl md:text-6xl font-semibold mb-8"
            {...fadeInUp}
            data-testid="hero-title"
          >
            The <span className="text-golden-rune">Sacred</span> Remembering
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl text-silver-star/90 leading-relaxed"
            {...fadeInUp}
            style={{ animationDelay: "0.3s" }}
            data-testid="hero-description"
          >
            Where ancient wisdom meets modern awakening, and every soul finds its way back home.
          </motion.p>
        </div>
      </div>

      {/* The Meaning Section */}
      <div id="meaning" className="py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h3 className="font-gothic text-3xl md:text-4xl font-semibold text-golden-rune" data-testid="meaning-title">
                The Sacred Names
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="mystical-border p-6 rounded-lg grimoire-texture" data-testid="card-jakintza">
                  <h4 className="font-gothic text-2xl text-silver-star mb-3">Jakintza</h4>
                  <p className="text-ethereal-white/80">"Wisdom" in Basque — the ancient knowing that flows through bloodlines and whispers in the wind.</p>
                </div>
                <div className="mystical-border p-6 rounded-lg grimoire-texture" data-testid="card-ruha">
                  <h4 className="font-gothic text-2xl text-silver-star mb-3">Ruha</h4>
                  <p className="text-ethereal-white/80">"Spirit" or "breath" — the sacred life force that was nearly stolen, now reclaimed and shared.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* The Story Section */}
      <div id="story" className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h3
            className="font-gothic text-4xl md:text-5xl font-semibold text-center mb-16 text-golden-rune"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            data-testid="story-title"
          >
            A Soul's Testimony
          </motion.h3>
          
          <motion.div 
            className="space-y-8 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="mystical-border p-8 rounded-lg grimoire-texture" data-testid="story-content">
              <p className="mb-6 font-gothic text-xl text-silver-star italic">
                "I was born into Catholicism — baptized, blessed, and handed a Bible before I ever had the language to say no. I was raised to kneel, to obey, to fear. But even as a child, something ancient stirred in me — something wild and unscripted."
              </p>
              
              <p className="mb-6">
                At fourteen, I bought my first oracle deck and hid it under my bed like it was contraband and sacred all at once. I printed spells off a dusty old website like they were scripture for girls like me — girls who heard whispers in the wind and knew the moon was more than a rock in the sky.
              </p>
              
              <p className="mb-6">
                They called me the "witchy girl" in school. I wore that like armor.
              </p>
              
              <p className="mb-6">
                But then I fell in love. And love, when you don't know yourself yet, can be a dangerous thing. My ex-husband looked at my altar like it was a battlefield. My crystals, my cards, my spells — he called it all evil. And when you're young and trying to belong, you believe love means sacrifice.
              </p>
              
              <p className="mb-6 text-golden-rune font-semibold">
                So I threw it all away.
              </p>
              
              <p className="mb-6">
                From 19 to 23, I was deep in church — not just Sunday services, but full-on revival hours, twice a week. Hands raised. Voices crying out. And me, trying to smother the fire inside of me with gospel and good-girl guilt.
              </p>
              
              <p className="mb-6 font-gothic text-xl text-silver-star italic">
                "But the truth? I didn't feel saved. I felt erased. Their God was too small for my spirit. Their heaven too far removed from the earth I loved. I didn't want salvation — I wanted sovereignty."
              </p>
              
              <p className="mb-6">
                And that's when I started remembering. Piece by piece, breath by breath — I reclaimed her. The witchy girl. The one who danced under the stars and called it prayer. The one who whispered to fire and felt her ancestors whisper back.
              </p>
              
              <p className="text-golden-rune font-gothic text-xl font-semibold">
                And that is when Jakintza Ruha was born.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* The Movement Section */}
<div id="movement" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h3
            className="font-gothic text-4xl md:text-5xl font-semibold text-center mb-16 text-golden-rune"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            data-testid="movement-title"
          >
            The Sacred Movement
          </motion.h3>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mystical-border p-6 rounded-lg grimoire-texture" data-testid="card-remembering">
                <h4 className="font-gothic text-2xl text-golden-rune mb-4 flex items-center">
                  <Sprout className="mr-3" />
                  Remembering & Reclaiming
                </h4>
                <p className="text-ethereal-white/90">
                  We stand against cultural appropriation, forced assimilation, cultural imperialism, and erasure. We reclaim our ancestral wisdom and sacred practices.
                </p>
              </div>
              
              <div className="mystical-border p-6 rounded-lg grimoire-texture" data-testid="card-integration">
                <h4 className="font-gothic text-2xl text-golden-rune mb-4 flex items-center">
                  <Infinity className="mr-3" />
                  Sacred Integration
                </h4>
                <p className="text-ethereal-white/90">
                  Spell work, witchcraft, and rituals walk hand in hand with ascension and Christ consciousness. All paths lead to the divine within.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="mystical-border p-6 rounded-lg grimoire-texture" data-testid="card-wisdom">
                <h4 className="font-gothic text-2xl text-golden-rune mb-4 flex items-center">
                  <Gem className="mr-3" />
                  Ancient Wisdom
                </h4>
                <p className="text-ethereal-white/90">
                  Crystals, herbs, astrology, and sacred rituals — the tools our ancestors used to commune with the divine and heal the world.
                </p>
              </div>
              
              <div className="mystical-border p-6 rounded-lg grimoire-texture" data-testid="card-persecution">
                <h4 className="font-gothic text-2xl text-golden-rune mb-4 flex items-center">
                  <Flame className="mr-3" />
                  Ending Persecution
                </h4>
                <p className="text-ethereal-white/90">
                  No more burning at the altar of someone else's god. We create safe spaces for magic, wisdom, and spiritual sovereignty.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* The Athenaeum Section */}
      <div id="athenaeum" className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h3
            className="font-gothic text-4xl md:text-5xl font-semibold mb-8 text-golden-rune"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            data-testid="athenaeum-title"
          >
            The Athenaeum
          </motion.h3>
          <motion.p
            className="text-xl text-silver-star/90 mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            data-testid="athenaeum-description"
          >
            A sacred repository of wisdom, where ancient knowledge meets modern practice.
          </motion.p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div 
              className="mystical-border p-8 rounded-lg grimoire-texture"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              data-testid="card-calendar"
            >
              <h4 className="font-gothic text-2xl text-golden-rune mb-4">
                <Calendar className="inline mr-3" />
                Living Calendar
              </h4>
              <p className="text-ethereal-white/90 mb-6">
                Track lunar cycles, planetary alignments, and sacred seasons with our cosmic calendar.
              </p>
              <a 
                href="/astro-calendar"
                className="inline-flex items-center bg-gradient-to-r from-shadow-purple to-deep-purple px-6 py-3 rounded-lg hover:scale-105 transition-transform relative z-10 cursor-pointer"
                data-testid="link-calendar"
                style={{ pointerEvents: 'auto' }}
              >
                Explore Calendar
              </a>
            </motion.div>
            
            <motion.div 
              className="mystical-border p-8 rounded-lg grimoire-texture"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              data-testid="card-grimoire"
            >
              <h4 className="font-gothic text-2xl text-golden-rune mb-4">
                <BookOpen className="inline mr-3" />
                Virtual Grimoire
              </h4>
              <p className="text-ethereal-white/90 mb-6">
                Create your digital Book of Shadows, Book of Mirrors, or Book of Stars.
              </p>
              <a 
                href="/grimoires"
                className="inline-block bg-gradient-to-r from-shadow-purple to-deep-purple px-6 py-3 rounded-lg hover:scale-105 transition-transform relative z-10 cursor-pointer"
                data-testid="button-grimoire"
                style={{ pointerEvents: 'auto' }}
              >
                Enter Sacred Space
              </a>
            </motion.div>
          </div>
          
          <motion.div 
            className="mystical-border p-8 rounded-lg grimoire-texture bg-gradient-to-br from-shadow-purple/20 to-deep-purple/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            viewport={{ once: true }}
            data-testid="card-full-athenaeum"
          >
            <h4 className="font-gothic text-3xl text-golden-rune mb-4">
              <Star className="inline mr-3" />
              Full Athenaeum
            </h4>
            <p className="text-xl text-silver-star/90">
              The complete library of sacred wisdom is coming soon...
            </p>
          </motion.div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div id="contact" className="py-20 relative z-10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.h3
            className="font-gothic text-4xl md:text-5xl font-semibold mb-8 text-golden-rune"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            data-testid="newsletter-title"
          >
            Join the Remembering
          </motion.h3>
          <motion.p
            className="text-xl text-silver-star/90 mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            data-testid="newsletter-description"
          >
            Receive sacred wisdom, lunar updates, and magical insights directly in your inbox.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <NewsletterForm />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-golden-rune/30 py-12 grimoire-texture relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="font-gothic text-3xl font-semibold mb-4" data-testid="footer-title">
              <span className="text-golden-rune">Jakintza</span>{" "}
              <span className="text-silver-star">Ruha</span>
            </div>
            <p className="text-silver-star/80 italic" data-testid="footer-quote">
              "This is my legacy. My rebellion. My remembering. And I am never throwing it away again."
            </p>
          </div>
          
          <div className="flex justify-center space-x-8 text-sm text-silver-star/70" data-testid="footer-copyright">
            <span>© 2024 Jakintza Ruha</span>
            <span>•</span>
            <span>Where Wisdom Becomes Magic</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
