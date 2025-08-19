import { type User, type InsertUser, type Newsletter, type InsertNewsletter, type Grimoire, type InsertGrimoire, type GrimoireEntry, type InsertGrimoireEntry, type Deity, type InsertDeity } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createNewsletterSubscription(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterByEmail(email: string): Promise<Newsletter | undefined>;
  getAllNewsletterSubscriptions(): Promise<Newsletter[]>;
  
  // Grimoire methods
  getAllGrimoires(): Promise<Grimoire[]>;
  getGrimoire(id: string): Promise<Grimoire | undefined>;
  createGrimoire(grimoire: InsertGrimoire): Promise<Grimoire>;
  updateGrimoire(id: string, grimoire: Partial<InsertGrimoire>): Promise<Grimoire | undefined>;
  deleteGrimoire(id: string): Promise<boolean>;
  
  // Grimoire entry methods
  getGrimoireEntries(grimoireId: string): Promise<GrimoireEntry[]>;
  getGrimoireEntry(id: string): Promise<GrimoireEntry | undefined>;
  createGrimoireEntry(entry: InsertGrimoireEntry): Promise<GrimoireEntry>;
  updateGrimoireEntry(id: string, entry: Partial<InsertGrimoireEntry>): Promise<GrimoireEntry | undefined>;
  deleteGrimoireEntry(id: string): Promise<boolean>;

  // Deity methods
  getAllDeities(): Promise<Deity[]>;
  getDeity(id: string): Promise<Deity | undefined>;
  createDeity(deity: InsertDeity): Promise<Deity>;
  updateDeity(id: string, deity: Partial<InsertDeity>): Promise<Deity | undefined>;
  deleteDeity(id: string): Promise<boolean>;
  searchDeities(query: string): Promise<Deity[]>;
  filterDeities(filters: { culture?: string; domain?: string; element?: string; }): Promise<Deity[]>;
  importDeities(deities: InsertDeity[]): Promise<Deity[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private newsletters: Map<string, Newsletter>;
  private grimoires: Map<string, Grimoire>;
  private grimoireEntries: Map<string, GrimoireEntry>;
  private deities: Map<string, Deity>;

  constructor() {
    this.users = new Map();
    this.newsletters = new Map();
    this.grimoires = new Map();
    this.grimoireEntries = new Map();
    this.deities = new Map();
    this.initializeDeities();
  }

  private async initializeDeities() {
    // Load deity data from the imported JSON file
    try {
      const fs = await import('fs');
      const path = await import('path');
      const deityDataPath = path.join(process.cwd(), 'deity-data.json');
      
      if (fs.existsSync(deityDataPath)) {
        const deityData = JSON.parse(fs.readFileSync(deityDataPath, 'utf-8'));
        for (const deity of deityData) {
          const id = deity.id || randomUUID();
          this.deities.set(id, { ...deity, id });
        }
        console.log(`Loaded ${this.deities.size} deities from database`);
      }
    } catch (error) {
      console.log('No deity data found, starting with empty deity collection');
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createNewsletterSubscription(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = randomUUID();
    const newsletter: Newsletter = { 
      ...insertNewsletter, 
      id, 
      subscribedAt: new Date() 
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    return Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === email,
    );
  }

  async getAllNewsletterSubscriptions(): Promise<Newsletter[]> {
    return Array.from(this.newsletters.values());
  }

  // Grimoire methods
  async getAllGrimoires(): Promise<Grimoire[]> {
    return Array.from(this.grimoires.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getGrimoire(id: string): Promise<Grimoire | undefined> {
    return this.grimoires.get(id);
  }

  async createGrimoire(insertGrimoire: InsertGrimoire): Promise<Grimoire> {
    const id = randomUUID();
    const now = new Date();
    const grimoire: Grimoire = { 
      ...insertGrimoire,
      description: insertGrimoire.description || null,
      coverImage: insertGrimoire.coverImage || null,
      isPublic: insertGrimoire.isPublic || null,
      id, 
      createdAt: now,
      updatedAt: now
    };
    this.grimoires.set(id, grimoire);
    return grimoire;
  }

  async updateGrimoire(id: string, updateData: Partial<InsertGrimoire>): Promise<Grimoire | undefined> {
    const existing = this.grimoires.get(id);
    if (!existing) return undefined;

    const updated: Grimoire = {
      ...existing,
      ...updateData,
      updatedAt: new Date()
    };
    this.grimoires.set(id, updated);
    return updated;
  }

  async deleteGrimoire(id: string): Promise<boolean> {
    // Also delete all entries for this grimoire
    const entries = Array.from(this.grimoireEntries.values())
      .filter(entry => entry.grimoireId === id);
    
    entries.forEach(entry => this.grimoireEntries.delete(entry.id));
    
    return this.grimoires.delete(id);
  }

  // Grimoire entry methods
  async getGrimoireEntries(grimoireId: string): Promise<GrimoireEntry[]> {
    return Array.from(this.grimoireEntries.values())
      .filter(entry => entry.grimoireId === grimoireId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getGrimoireEntry(id: string): Promise<GrimoireEntry | undefined> {
    return this.grimoireEntries.get(id);
  }

  async createGrimoireEntry(insertEntry: InsertGrimoireEntry): Promise<GrimoireEntry> {
    const id = randomUUID();
    const now = new Date();
    const entry: GrimoireEntry = { 
      ...insertEntry,
      tags: insertEntry.tags || null,
      mood: insertEntry.mood || null,
      moonPhase: insertEntry.moonPhase || null,
      astrologicalSign: insertEntry.astrologicalSign || null,
      id, 
      createdAt: now,
      updatedAt: now
    };
    this.grimoireEntries.set(id, entry);
    return entry;
  }

  async updateGrimoireEntry(id: string, updateData: Partial<InsertGrimoireEntry>): Promise<GrimoireEntry | undefined> {
    const existing = this.grimoireEntries.get(id);
    if (!existing) return undefined;

    const updated: GrimoireEntry = {
      ...existing,
      ...updateData,
      updatedAt: new Date()
    };
    this.grimoireEntries.set(id, updated);
    return updated;
  }

  async deleteGrimoireEntry(id: string): Promise<boolean> {
    return this.grimoireEntries.delete(id);
  }

  // Deity methods implementation
  async getAllDeities(): Promise<Deity[]> {
    return Array.from(this.deities.values());
  }

  async getDeity(id: string): Promise<Deity | undefined> {
    return this.deities.get(id);
  }

  async createDeity(insertDeity: InsertDeity): Promise<Deity> {
    const id = randomUUID();
    const deity: Deity = { 
      ...insertDeity,
      id
    };
    this.deities.set(id, deity);
    return deity;
  }

  async updateDeity(id: string, updateData: Partial<InsertDeity>): Promise<Deity | undefined> {
    const existingDeity = this.deities.get(id);
    if (!existingDeity) return undefined;
    
    const updatedDeity: Deity = { 
      ...existingDeity, 
      ...updateData
    };
    this.deities.set(id, updatedDeity);
    return updatedDeity;
  }

  async deleteDeity(id: string): Promise<boolean> {
    if (!this.deities.has(id)) return false;
    this.deities.delete(id);
    return true;
  }

  async searchDeities(query: string): Promise<Deity[]> {
    const q = query.toLowerCase().trim();
    if (!q) return this.getAllDeities();

    return Array.from(this.deities.values()).filter(deity => {
      const searchText = [
        deity.name,
        deity.culture,
        ...deity.domains,
        ...deity.elements,
        ...deity.symbols,
        ...deity.epithets,
        deity.whyMatters || "",
        ...deity.stories,
      ].join(" ").toLowerCase();
      
      return searchText.includes(q);
    });
  }

  async filterDeities(filters: {
    culture?: string;
    domain?: string;
    element?: string;
  }): Promise<Deity[]> {
    return Array.from(this.deities.values()).filter(deity => {
      if (filters.culture && filters.culture !== "All" && deity.culture !== filters.culture) {
        return false;
      }
      if (filters.domain && filters.domain !== "All" && !deity.domains.includes(filters.domain)) {
        return false;
      }
      if (filters.element && filters.element !== "All" && !deity.elements.includes(filters.element)) {
        return false;
      }
      return true;
    });
  }

  async importDeities(deities: InsertDeity[]): Promise<Deity[]> {
    const imported: Deity[] = [];
    for (const deity of deities) {
      const created = await this.createDeity(deity);
      imported.push(created);
    }
    return imported;
  }
}

export const storage = new MemStorage();
