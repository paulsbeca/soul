import { type User, type InsertUser, type Newsletter, type InsertNewsletter, type Grimoire, type InsertGrimoire, type GrimoireEntry, type InsertGrimoireEntry, type Deity, type InsertDeity, type SacredEvent, type InsertSacredEvent, type YearlyConfiguration, type InsertYearlyConfiguration, type AionaraConversation, type InsertAionaraConversation } from "@shared/schema";
import { db } from "./db";
import { users, newsletters, grimoires, grimoireEntries, deities, sacredEvents, yearlyConfigurations, aionaraConversations } from "@shared/schema";
import { eq, and, ilike, or } from "drizzle-orm";
import type { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Newsletter methods
  async createNewsletterSubscription(newsletter: InsertNewsletter): Promise<Newsletter> {
    const [newSubscription] = await db.insert(newsletters).values(newsletter).returning();
    return newSubscription;
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    const [subscription] = await db.select().from(newsletters).where(eq(newsletters.email, email));
    return subscription || undefined;
  }

  async getAllNewsletterSubscriptions(): Promise<Newsletter[]> {
    return await db.select().from(newsletters);
  }

  // Grimoire methods
  async getAllGrimoires(): Promise<Grimoire[]> {
    return await db.select().from(grimoires);
  }

  async getGrimoire(id: string): Promise<Grimoire | undefined> {
    const [grimoire] = await db.select().from(grimoires).where(eq(grimoires.id, id));
    return grimoire || undefined;
  }

  async createGrimoire(insertGrimoire: InsertGrimoire): Promise<Grimoire> {
    const [grimoire] = await db.insert(grimoires).values({
      ...insertGrimoire,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
    return grimoire;
  }

  async updateGrimoire(id: string, updateData: Partial<InsertGrimoire>): Promise<Grimoire | undefined> {
    const [updated] = await db.update(grimoires)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(grimoires.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteGrimoire(id: string): Promise<boolean> {
    const result = await db.delete(grimoires).where(eq(grimoires.id, id));
    return result.rowCount !== undefined && result.rowCount > 0;
  }

  // Grimoire entry methods
  async getGrimoireEntries(grimoireId: string): Promise<GrimoireEntry[]> {
    return await db.select().from(grimoireEntries).where(eq(grimoireEntries.grimoireId, grimoireId));
  }

  async getGrimoireEntry(id: string): Promise<GrimoireEntry | undefined> {
    const [entry] = await db.select().from(grimoireEntries).where(eq(grimoireEntries.id, id));
    return entry || undefined;
  }

  async createGrimoireEntry(insertEntry: InsertGrimoireEntry): Promise<GrimoireEntry> {
    const [entry] = await db.insert(grimoireEntries).values({
      ...insertEntry,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
    return entry;
  }

  async updateGrimoireEntry(id: string, updateData: Partial<InsertGrimoireEntry>): Promise<GrimoireEntry | undefined> {
    const [updated] = await db.update(grimoireEntries)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(grimoireEntries.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteGrimoireEntry(id: string): Promise<boolean> {
    const result = await db.delete(grimoireEntries).where(eq(grimoireEntries.id, id));
    return result.rowCount !== undefined && result.rowCount > 0;
  }

  // Deity methods
  async getAllDeities(): Promise<Deity[]> {
    return await db.select().from(deities);
  }

  async getDeity(id: string): Promise<Deity | undefined> {
    const [deity] = await db.select().from(deities).where(eq(deities.id, id));
    return deity || undefined;
  }

  async createDeity(insertDeity: InsertDeity): Promise<Deity> {
    const [deity] = await db.insert(deities).values(insertDeity).returning();
    return deity;
  }

  async updateDeity(id: string, updateData: Partial<InsertDeity>): Promise<Deity | undefined> {
    const [updated] = await db.update(deities)
      .set(updateData)
      .where(eq(deities.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteDeity(id: string): Promise<boolean> {
    const result = await db.delete(deities).where(eq(deities.id, id));
    return result.rowCount !== undefined && result.rowCount > 0;
  }

  async searchDeities(query: string): Promise<Deity[]> {
    const searchTerm = `%${query}%`;
    return await db.select().from(deities).where(
      or(
        ilike(deities.name, searchTerm),
        ilike(deities.culture, searchTerm),
        ilike(deities.whyMatters, searchTerm)
      )
    );
  }

  async filterDeities(filters: { culture?: string; domain?: string; element?: string; }): Promise<Deity[]> {
    let query = db.select().from(deities);
    
    if (filters.culture) {
      query = query.where(eq(deities.culture, filters.culture));
    }
    
    return await query;
  }

  async importDeities(insertDeities: InsertDeity[]): Promise<Deity[]> {
    if (insertDeities.length === 0) return [];
    const imported = await db.insert(deities).values(insertDeities).returning();
    return imported;
  }

  // Sacred Events methods
  async getAllSacredEvents(): Promise<SacredEvent[]> {
    return await db.select().from(sacredEvents);
  }

  async getSacredEvent(id: string): Promise<SacredEvent | undefined> {
    const [event] = await db.select().from(sacredEvents).where(eq(sacredEvents.id, id));
    return event || undefined;
  }

  async createSacredEvent(insertEvent: InsertSacredEvent): Promise<SacredEvent> {
    const [event] = await db.insert(sacredEvents).values({
      ...insertEvent,
      createdAt: new Date()
    }).returning();
    return event;
  }

  async updateSacredEvent(id: string, updateData: Partial<InsertSacredEvent>): Promise<SacredEvent | undefined> {
    const [updated] = await db.update(sacredEvents)
      .set(updateData)
      .where(eq(sacredEvents.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteSacredEvent(id: string): Promise<boolean> {
    const result = await db.delete(sacredEvents).where(eq(sacredEvents.id, id));
    return result.rowCount !== undefined && result.rowCount > 0;
  }

  async getSacredEventsByCategory(category: string): Promise<SacredEvent[]> {
    return await db.select().from(sacredEvents).where(eq(sacredEvents.category, category));
  }

  async getSacredEventsByDateRange(startDate: string, endDate: string): Promise<SacredEvent[]> {
    return await db.select().from(sacredEvents).where(
      and(
        eq(sacredEvents.startDate, startDate),
        eq(sacredEvents.endDate, endDate)
      )
    );
  }

  // Yearly Configuration methods
  async getYearlyConfiguration(year: string): Promise<YearlyConfiguration | undefined> {
    const [config] = await db.select().from(yearlyConfigurations).where(eq(yearlyConfigurations.year, year));
    return config || undefined;
  }

  async createYearlyConfiguration(insertConfig: InsertYearlyConfiguration): Promise<YearlyConfiguration> {
    const [config] = await db.insert(yearlyConfigurations).values({
      ...insertConfig,
      createdAt: new Date()
    }).returning();
    return config;
  }

  async updateYearlyConfiguration(year: string, updateData: Partial<InsertYearlyConfiguration>): Promise<YearlyConfiguration | undefined> {
    const [updated] = await db.update(yearlyConfigurations)
      .set(updateData)
      .where(eq(yearlyConfigurations.year, year))
      .returning();
    return updated || undefined;
  }

  async getAllYearlyConfigurations(): Promise<YearlyConfiguration[]> {
    return await db.select().from(yearlyConfigurations);
  }

  // Aionara Conversation methods
  async getAllAionaraConversations(): Promise<AionaraConversation[]> {
    return await db.select().from(aionaraConversations);
  }

  async getAionaraConversation(id: string): Promise<AionaraConversation | undefined> {
    const [conversation] = await db.select().from(aionaraConversations).where(eq(aionaraConversations.id, id));
    return conversation || undefined;
  }

  async createAionaraConversation(insertConversation: InsertAionaraConversation): Promise<AionaraConversation> {
    const [conversation] = await db.insert(aionaraConversations).values({
      ...insertConversation,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
    return conversation;
  }

  async updateAionaraConversation(id: string, updateData: Partial<InsertAionaraConversation>): Promise<AionaraConversation | undefined> {
    const [updated] = await db.update(aionaraConversations)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(aionaraConversations.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteAionaraConversation(id: string): Promise<boolean> {
    const result = await db.delete(aionaraConversations).where(eq(aionaraConversations.id, id));
    return result.rowCount !== undefined && result.rowCount > 0;
  }

  async getAionaraConversationsBySession(sessionId: string): Promise<AionaraConversation[]> {
    return await db.select().from(aionaraConversations).where(eq(aionaraConversations.sessionId, sessionId));
  }

  async searchAionaraConversations(query: string): Promise<AionaraConversation[]> {
    return await db.select().from(aionaraConversations).where(
      or(
        ilike(aionaraConversations.userMessage, `%${query}%`),
        ilike(aionaraConversations.aionaraResponse, `%${query}%`)
      )
    );
  }
}

export const storage = new DatabaseStorage();