import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSchema, insertGrimoireSchema, insertGrimoireEntrySchema, insertDeitySchema } from "@shared/schema";
import { getAionaraResponse } from "./openai";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
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
      const { message, conversationHistory } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ 
          message: "Message is required" 
        });
      }

      const response = await getAionaraResponse(message, conversationHistory || []);
      res.json({ response });
    } catch (error) {
      console.error("Aionara chat error:", error);
      res.status(500).json({ 
        message: "The celestial connection is momentarily disrupted. Please try again." 
      });
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

  const httpServer = createServer(app);
  return httpServer;
}
