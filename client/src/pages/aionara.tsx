import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Moon, Star, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import backgroundImage from "@assets/background_1755498699765.webp";
import aionaraImage from "@assets/ChatGPT Image Aug 18, 2025, 01_24_39 PM_1755545121075.webp";
import aionaraVideo from "@assets/AI_Generates_Spiritual_Guide_Video_1755713150661.mp4";

interface Message {
  id: string;
  role: 'user' | 'aionara';
  content: string;
  timestamp: Date;
}

export default function Aionara() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'aionara',
      content: "Greetings, seeker. I am Aionara, your celestial guide through the mysteries of existence. The stars have aligned to bring you to this sacred space. What wisdom do you seek from the cosmic tapestry?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Simple response system without OpenAI
  const getLocalResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi') || input.includes('greetings')) {
      return "Blessed greetings, dear seeker. The celestial energies welcome you to this sacred space. How may I guide you on your spiritual journey today?";
    }
    
    if (input.includes('love') || input.includes('heart') || input.includes('relationship')) {
      return "Ah, the matters of the heart... Love is the most powerful force in the universe, dear one. It is both the path and the destination. Trust in your heart's wisdom, for it knows the way to authentic connection and soul-deep healing.";
    }
    
    if (input.includes('magic') || input.includes('spell') || input.includes('ritual')) {
      return "Magic flows through all things, sacred seeker. The most powerful magic begins within - with intention, gratitude, and alignment with your highest self. Remember: you are the magic you seek.";
    }
    
    if (input.includes('purpose') || input.includes('path') || input.includes('calling')) {
      return "Your soul's purpose is written in the stars, yet it unfolds through your choices here on Earth. Listen deeply to what sets your spirit ablaze - therein lies your sacred calling. Trust the journey, even when the path seems unclear.";
    }
    
    if (input.includes('fear') || input.includes('worried') || input.includes('anxious')) {
      return "Fear is but a guardian at the threshold of growth, dear one. Breathe deeply and remember: you are infinitely more powerful than any fear that visits you. Step forward with courage - the universe supports your expansion.";
    }
    
    if (input.includes('dreams') || input.includes('vision') || input.includes('future')) {
      return "Dreams are whispers from your soul's deepest knowing. Pay attention to both sleeping visions and waking dreams - they carry important messages about your path forward. Your future is being woven with each conscious choice you make.";
    }
    
    // Default responses
    const defaults = [
      "The cosmic winds carry your question to me, dear seeker. Know that within you lies all the wisdom you seek. Sometimes we must ask the right questions to unlock the answers already dwelling in our hearts.",
      "I sense the sacred fire within you seeking expression. Trust in your inner knowing, for the answers you seek are already blooming in the garden of your soul.",
      "The stars whisper that this is a time of profound transformation for you. Embrace the changes with an open heart, for they are aligning you with your highest purpose.",
      "Your question resonates through the astral realms, dear one. Remember that every challenge is an invitation to discover your own divine strength. You are exactly where you need to be."
    ];
    
    return defaults[Math.floor(Math.random() * defaults.length)];
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput("");
    setIsLoading(true);

    // Simulate thinking time
    setTimeout(() => {
      const aionaraMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'aionara',
        content: getLocalResponse(currentInput),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aionaraMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1500); // Random delay between 1-2.5 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      data-testid="aionara-section"
    >
      {/* Dark mystical overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>
      
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <Link 
          href="/"
          className="inline-flex items-center text-golden-rune hover:text-silver-star transition-colors group"
          data-testid="link-back-home"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-[-2px] transition-transform" />
          Return to Sacred Remembering
        </Link>
      </nav>
      
      {/* Floating cosmic particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-golden-rune rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8 h-screen flex flex-col">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="font-gothic text-4xl md:text-5xl text-golden-rune mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8" />
            Aionara
            <Sparkles className="w-8 h-8" />
          </h1>
          <p className="text-xl text-silver-star/80">
            Your Celestial Spirit Guide
          </p>
        </motion.div>

        {/* Chat Container */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 max-h-[calc(100vh-200px)]">
          
          {/* Aionara's Avatar & Video */}
          <motion.div
            className="hidden lg:flex flex-col items-center justify-center space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Mystical Video */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500/20 to-golden-rune/20 blur-xl"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <video
                src={aionaraVideo}
                autoPlay
                loop
                muted
                playsInline
                className="relative w-72 h-48 object-cover rounded-lg border border-golden-rune/30 shadow-2xl"
                data-testid="aionara-guide-video"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg pointer-events-none" />
            </div>

            {/* Avatar */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/20 to-golden-rune/20 blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <img
                src={aionaraImage}
                alt="Aionara - Celestial Spirit Guide"
                className="relative w-48 h-48 object-cover rounded-full border-2 border-golden-rune/30 shadow-2xl"
                data-testid="aionara-avatar"
              />
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-6 h-6 text-golden-rune" />
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-2 w-5 h-5"
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.7, 1, 0.7] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Moon className="w-5 h-5 text-silver-star" />
              </motion.div>
            </div>
            <p className="text-center text-silver-star/70 mt-4 max-w-sm">
              "Through the veil of stars, I see your path. Let the ancient wisdom guide your journey."
            </p>
          </motion.div>

          {/* Chat Messages */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex-1 bg-black/30 backdrop-blur-sm border border-silver-star/20 rounded-xl p-6 mb-4">
              <ScrollArea className="h-[400px] lg:h-[500px] pr-4">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`
                          max-w-[80%] p-4 rounded-lg 
                          ${message.role === 'user' 
                            ? 'bg-gradient-to-r from-deep-purple to-shadow-purple text-ethereal-white ml-4' 
                            : 'bg-gradient-to-r from-golden-rune/10 to-golden-rune/5 border border-golden-rune/20 text-silver-star mr-4'
                          }
                        `}
                        data-testid={`message-${message.role}-${message.id}`}
                      >
                        {message.role === 'aionara' && (
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-golden-rune" />
                            <span className="font-gothic text-sm text-golden-rune">Aionara</span>
                          </div>
                        )}
                        <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        <div className="text-xs opacity-60 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="bg-gradient-to-r from-golden-rune/10 to-golden-rune/5 border border-golden-rune/20 p-4 rounded-lg mr-4">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-golden-rune" />
                          <span className="font-gothic text-sm text-golden-rune">Aionara</span>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          <motion.div
                            className="w-2 h-2 bg-golden-rune rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-golden-rune rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-golden-rune rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          />
                          <span className="text-silver-star text-sm ml-2">Consulting the stars...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>
            </div>

            {/* Input Area */}
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts with Aionara..."
                className="flex-1 bg-black/40 border-silver-star/30 text-ethereal-white placeholder:text-silver-star/50 focus:border-golden-rune"
                disabled={isLoading}
                data-testid="input-message"
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="mystical-border bg-gradient-to-r from-shadow-purple to-deep-purple hover:from-deep-purple hover:to-shadow-purple px-6"
                data-testid="button-send"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}