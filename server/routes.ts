import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage-database";
import { insertNewsletterSchema, insertGrimoireSchema, insertGrimoireEntrySchema, insertDeitySchema, insertSacredEventSchema, insertYearlyConfigurationSchema, insertAionaraConversationSchema } from "@shared/schema";
import { getAionaraResponse } from "./openai";
import { notifyNewsletterSubscription } from "./email";
import { notifyEnrollmentSubmission } from "./emailoctopus";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ 
          message: "Email and password are required" 
        });
      }

      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ 
          message: "Invalid credentials" 
        });
      }

      // Simple password check (in production, use hashed passwords)
      if (user.password !== password) {
        return res.status(401).json({ 
          message: "Invalid credentials" 
        });
      }

      // Return user info without password
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // Get current user info (if we add session management later)
  app.get("/api/auth/me", async (req, res) => {
    // This would check session/token in a real app
    res.status(401).json({ message: "Not authenticated" });
  });

  // Newsletter subscription endpoint
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscription = await storage.getNewsletterByEmail(validatedData.email);
      if (existingSubscription) {
        return res.status(400).json({ 
          message: "This email is already subscribed to our newsletter" 
        });
      }

      const newsletter = await storage.createNewsletterSubscription(validatedData);
      
      // Send notification to info@jakintzaruha.com
      await notifyNewsletterSubscription(validatedData.email);
      
      res.status(201).json({ 
        message: "Successfully subscribed to newsletter",
        id: newsletter.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid email format",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          message: "Internal server error" 
        });
      }
    }
  });

  // Enrollment submission endpoint
  app.post("/api/enrollment", async (req, res) => {
    try {
      const enrollmentData = req.body;
      
      // Basic validation
      if (!enrollmentData.fullName || !enrollmentData.email) {
        return res.status(400).json({ 
          message: "Name and email are required for enrollment" 
        });
      }

      // Send enrollment notification to athenaeum@jakintzaruha.com
      await notifyEnrollmentSubmission(enrollmentData);
      
      res.status(201).json({ 
        message: "Enrollment submission received. The Athenaeum will be in touch soon.",
        status: "success"
      });
    } catch (error) {
      console.error("Enrollment submission error:", error);
      res.status(500).json({ 
        message: "There was an issue processing your enrollment. Please try again." 
      });
    }
  });

  // Get all newsletter subscriptions (for admin purposes)
  app.get("/api/newsletter/subscriptions", async (req, res) => {
    try {
      const subscriptions = await storage.getAllNewsletterSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  // Grimoire routes
  // Get all grimoires
  app.get("/api/grimoires", async (req, res) => {
    try {
      const grimoires = await storage.getAllGrimoires();
      res.json(grimoires);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get specific grimoire
  app.get("/api/grimoires/:id", async (req, res) => {
    try {
      const grimoire = await storage.getGrimoire(req.params.id);
      if (!grimoire) {
        return res.status(404).json({ message: "Grimoire not found" });
      }
      res.json(grimoire);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create grimoire
  app.post("/api/grimoires", async (req, res) => {
    try {
      const validatedData = insertGrimoireSchema.parse(req.body);
      const grimoire = await storage.createGrimoire(validatedData);
      res.status(201).json(grimoire);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid grimoire data",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Update grimoire
  app.patch("/api/grimoires/:id", async (req, res) => {
    try {
      const validatedData = insertGrimoireSchema.partial().parse(req.body);
      const grimoire = await storage.updateGrimoire(req.params.id, validatedData);
      if (!grimoire) {
        return res.status(404).json({ message: "Grimoire not found" });
      }
      res.json(grimoire);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid grimoire data",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Delete grimoire
  app.delete("/api/grimoires/:id", async (req, res) => {
    try {
      const success = await storage.deleteGrimoire(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Grimoire not found" });
      }
      res.json({ message: "Grimoire deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get grimoire entries
  app.get("/api/grimoires/:id/entries", async (req, res) => {
    try {
      const entries = await storage.getGrimoireEntries(req.params.id);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create grimoire entry
  app.post("/api/grimoires/:id/entries", async (req, res) => {
    try {
      const validatedData = insertGrimoireEntrySchema.parse({
        ...req.body,
        grimoireId: req.params.id
      });
      const entry = await storage.createGrimoireEntry(validatedData);
      res.status(201).json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid entry data",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Get specific grimoire entry
  app.get("/api/grimoire-entries/:id", async (req, res) => {
    try {
      const entry = await storage.getGrimoireEntry(req.params.id);
      if (!entry) {
        return res.status(404).json({ message: "Entry not found" });
      }
      res.json(entry);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update grimoire entry
  app.patch("/api/grimoire-entries/:id", async (req, res) => {
    try {
      const validatedData = insertGrimoireEntrySchema.partial().parse(req.body);
      const entry = await storage.updateGrimoireEntry(req.params.id, validatedData);
      if (!entry) {
        return res.status(404).json({ message: "Entry not found" });
      }
      res.json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid entry data",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Delete grimoire entry
  app.delete("/api/grimoire-entries/:id", async (req, res) => {
    try {
      const success = await storage.deleteGrimoireEntry(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Entry not found" });
      }
      res.json({ message: "Entry deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Aionara AI chat endpoint
  app.post("/api/aionara/chat", async (req, res) => {
    try {
      const { message, conversationHistory, sessionId, userContext } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ 
          message: "Message is required" 
        });
      }

      const startTime = Date.now();
      const response = await getAionaraResponse(message, conversationHistory || []);
      const responseTime = `${Date.now() - startTime}ms`;

      // Store the conversation
      try {
        await storage.createAionaraConversation({
          sessionId: sessionId || `session-${Date.now()}`,
          userMessage: message,
          aionaraResponse: response,
          userContext: userContext || null,
          conversationHistory: conversationHistory || null,
          responseTime,
          topics: [],
          mood: null,
          isArchived: "false",
          isFlagged: "false"
        });
      } catch (storageError) {
        console.error("Failed to store conversation:", storageError);
        // Don't fail the chat response if storage fails
      }

      res.json({ response });
    } catch (error) {
      console.error("Aionara chat error:", error);
      res.status(500).json({ 
        message: "The celestial connection is momentarily disrupted. Please try again." 
      });
    }
  });

  // Aionara conversation management endpoints
  app.get("/api/aionara/conversations", async (req, res) => {
    try {
      const { sessionId, search } = req.query;
      
      let conversations;
      if (sessionId && typeof sessionId === 'string') {
        conversations = await storage.getAionaraConversationsBySession(sessionId);
      } else if (search && typeof search === 'string') {
        conversations = await storage.searchAionaraConversations(search);
      } else {
        conversations = await storage.getAllAionaraConversations();
      }
      
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch conversations" });
    }
  });

  app.get("/api/aionara/conversations/:id", async (req, res) => {
    try {
      const conversation = await storage.getAionaraConversation(req.params.id);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }
      res.json(conversation);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch conversation" });
    }
  });

  app.patch("/api/aionara/conversations/:id", async (req, res) => {
    try {
      const validatedData = insertAionaraConversationSchema.partial().parse(req.body);
      const conversation = await storage.updateAionaraConversation(req.params.id, validatedData);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }
      res.json(conversation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid conversation data",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Failed to update conversation" });
      }
    }
  });

  app.delete("/api/aionara/conversations/:id", async (req, res) => {
    try {
      const success = await storage.deleteAionaraConversation(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Conversation not found" });
      }
      res.json({ message: "Conversation deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete conversation" });
    }
  });

  // Deity routes
  app.get("/api/deities", async (req, res) => {
    try {
      const deities = await storage.getAllDeities();
      res.json(deities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch deities" });
    }
  });

  app.get("/api/deities/:id", async (req, res) => {
    try {
      const deity = await storage.getDeity(req.params.id);
      if (!deity) {
        return res.status(404).json({ message: "Deity not found" });
      }
      res.json(deity);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch deity" });
    }
  });

  app.get("/api/deities/search/:query", async (req, res) => {
    try {
      const deities = await storage.searchDeities(req.params.query);
      res.json(deities);
    } catch (error) {
      res.status(500).json({ message: "Failed to search deities" });
    }
  });

  app.post("/api/deities/filter", async (req, res) => {
    try {
      const filters = req.body;
      const deities = await storage.filterDeities(filters);
      res.json(deities);
    } catch (error) {
      res.status(500).json({ message: "Failed to filter deities" });
    }
  });

  // Sacred Living Year routes
  app.get("/api/sacred-events", async (req, res) => {
    try {
      const { category, startDate, endDate } = req.query;
      
      let events;
      if (category && typeof category === 'string') {
        events = await storage.getSacredEventsByCategory(category);
      } else if (startDate && endDate && typeof startDate === 'string' && typeof endDate === 'string') {
        events = await storage.getSacredEventsByDateRange(startDate, endDate);
      } else {
        events = await storage.getAllSacredEvents();
      }
      
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sacred events" });
    }
  });

  app.get("/api/sacred-events/:id", async (req, res) => {
    try {
      const event = await storage.getSacredEvent(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Sacred event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sacred event" });
    }
  });

  app.post("/api/sacred-events", async (req, res) => {
    try {
      const validatedData = insertSacredEventSchema.parse(req.body);
      const event = await storage.createSacredEvent(validatedData);
      res.status(201).json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid sacred event data",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Failed to create sacred event" });
      }
    }
  });

  // Yearly Configuration routes
  app.get("/api/yearly-config/:year", async (req, res) => {
    try {
      const config = await storage.getYearlyConfiguration(req.params.year);
      if (!config) {
        return res.status(404).json({ message: "Yearly configuration not found" });
      }
      res.json(config);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch yearly configuration" });
    }
  });

  app.get("/api/yearly-config", async (req, res) => {
    try {
      const configs = await storage.getAllYearlyConfigurations();
      res.json(configs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch yearly configurations" });
    }
  });

  app.post("/api/yearly-config", async (req, res) => {
    try {
      const validatedData = insertYearlyConfigurationSchema.parse(req.body);
      const config = await storage.createYearlyConfiguration(validatedData);
      res.status(201).json(config);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid yearly configuration data",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Failed to create yearly configuration" });
      }
    }
  });

  app.put("/api/yearly-config/:year", async (req, res) => {
    try {
      const config = await storage.updateYearlyConfiguration(req.params.year, req.body);
      if (!config) {
        return res.status(404).json({ message: "Yearly configuration not found" });
      }
      res.json(config);
    } catch (error) {
      res.status(500).json({ message: "Failed to update yearly configuration" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
