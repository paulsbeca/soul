import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const newsletters = pgTable("newsletters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
});

export const grimoires = pgTable("grimoires", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  type: text("type").notNull(), // 'shadows', 'mirrors', 'stars'
  description: text("description"),
  coverImage: text("cover_image"),
  isPublic: text("is_public").default("false"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const grimoireEntries = pgTable("grimoire_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  grimoireId: varchar("grimoire_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  entryType: text("entry_type").notNull(), // 'spell', 'ritual', 'meditation', 'reflection', 'dream', 'divination', 'herbal', 'crystal', 'astrology'
  tags: text("tags").array(),
  mood: text("mood"), // emotional state when writing
  moonPhase: text("moon_phase"), // moon phase during entry
  astrologicalSign: text("astrological_sign"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const deities = pgTable("deities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  culture: text("culture").notNull(),
  domains: json("domains").$type<string[]>().notNull(),
  elements: json("elements").$type<string[]>().notNull(),
  symbols: json("symbols").$type<string[]>().notNull(),
  epithets: json("epithets").$type<string[]>().notNull(),
  offerings: json("offerings").$type<string[]>().notNull(),
  cautions: json("cautions").$type<string[]>().notNull(),
  stories: json("stories").$type<string[]>().notNull(),
  whyMatters: text("why_matters"),
  image: text("image"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertNewsletterSchema = createInsertSchema(newsletters).pick({
  email: true,
});

export const insertGrimoireSchema = createInsertSchema(grimoires).pick({
  title: true,
  type: true,
  description: true,
  coverImage: true,
  isPublic: true,
});

export const insertGrimoireEntrySchema = createInsertSchema(grimoireEntries).pick({
  grimoireId: true,
  title: true,
  content: true,
  entryType: true,
  tags: true,
  mood: true,
  moonPhase: true,
  astrologicalSign: true,
});

export const insertDeitySchema = createInsertSchema(deities).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletters.$inferSelect;
export type InsertGrimoire = z.infer<typeof insertGrimoireSchema>;
export type Grimoire = typeof grimoires.$inferSelect;
export type InsertGrimoireEntry = z.infer<typeof insertGrimoireEntrySchema>;
export type GrimoireEntry = typeof grimoireEntries.$inferSelect;
export type InsertDeity = z.infer<typeof insertDeitySchema>;
export type Deity = typeof deities.$inferSelect;
