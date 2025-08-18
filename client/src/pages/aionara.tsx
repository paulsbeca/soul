import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Moon, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import backgroundImage from "@assets/background_1755498699765.webp";
import aionaraImage from "@assets/ChatGPT Image Aug 18, 2025, 01_24_39 PM_1755545121075.webp";

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

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/aionara/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages.slice(-10) // Send last 10 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Aionara');
      }

      const data = await response.json();
      
      const aionaraMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'aionara',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aionaraMessage]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Connection Lost",
        description: "The cosmic veil momentarily obscures our connection. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
        <a 
          href="/remember"
          className="inline-flex items-center text-golden-rune hover:text-silver-star transition-colors group"
          data-testid="link-back-remember"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-[-2px] transition-transform" />
          Return to Sacred Remembering
        </a>
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
          
          {/* Aionara's Avatar */}
          <motion.div
            className="hidden lg:flex flex-col items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
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
                className="relative w-64 h-64 object-cover rounded-full border-2 border-golden-rune/30 shadow-2xl"
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