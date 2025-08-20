import { type User, type InsertUser, type Newsletter, type InsertNewsletter, type Grimoire, type InsertGrimoire, type GrimoireEntry, type InsertGrimoireEntry, type Deity, type InsertDeity, type SacredEvent, type InsertSacredEvent, type YearlyConfiguration, type InsertYearlyConfiguration, type AionaraConversation, type InsertAionaraConversation } from "@shared/schema";
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

  // Sacred Living Year methods
  getAllSacredEvents(): Promise<SacredEvent[]>;
  getSacredEvent(id: string): Promise<SacredEvent | undefined>;
  createSacredEvent(event: InsertSacredEvent): Promise<SacredEvent>;
  updateSacredEvent(id: string, event: Partial<InsertSacredEvent>): Promise<SacredEvent | undefined>;
  deleteSacredEvent(id: string): Promise<boolean>;
  getSacredEventsByCategory(category: string): Promise<SacredEvent[]>;
  getSacredEventsByDateRange(startDate: string, endDate: string): Promise<SacredEvent[]>;
  
  // Yearly Configuration methods
  getYearlyConfiguration(year: string): Promise<YearlyConfiguration | undefined>;
  createYearlyConfiguration(config: InsertYearlyConfiguration): Promise<YearlyConfiguration>;
  updateYearlyConfiguration(year: string, config: Partial<InsertYearlyConfiguration>): Promise<YearlyConfiguration | undefined>;
  getAllYearlyConfigurations(): Promise<YearlyConfiguration[]>;
  
  // Aionara Conversation methods
  getAllAionaraConversations(): Promise<AionaraConversation[]>;
  getAionaraConversation(id: string): Promise<AionaraConversation | undefined>;
  createAionaraConversation(conversation: InsertAionaraConversation): Promise<AionaraConversation>;
  updateAionaraConversation(id: string, conversation: Partial<InsertAionaraConversation>): Promise<AionaraConversation | undefined>;
  deleteAionaraConversation(id: string): Promise<boolean>;
  getAionaraConversationsBySession(sessionId: string): Promise<AionaraConversation[]>;
  searchAionaraConversations(query: string): Promise<AionaraConversation[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private newsletters: Map<string, Newsletter>;
  private grimoires: Map<string, Grimoire>;
  private grimoireEntries: Map<string, GrimoireEntry>;
  private deities: Map<string, Deity>;
  private sacredEvents: Map<string, SacredEvent>;
  private yearlyConfigurations: Map<string, YearlyConfiguration>;
  private aionaraConversations: Map<string, AionaraConversation>;

  constructor() {
    this.users = new Map();
    this.newsletters = new Map();
    this.grimoires = new Map();
    this.grimoireEntries = new Map();
    this.deities = new Map();
    this.sacredEvents = new Map();
    this.yearlyConfigurations = new Map();
    this.aionaraConversations = new Map();
    this.initializeDeities();
    this.initializeSacredLivingYear();
  }

  private initializeSacredLivingYear() {
    // Initialize Sacred Living Year events based on the provided ritual almanac
    const sacredEventsData = this.createSacredLivingYearEvents();
    sacredEventsData.forEach(event => {
      const id = randomUUID();
      this.sacredEvents.set(id, { ...event, id, createdAt: new Date() });
    });
    
    // Initialize current year configuration
    const currentYear = new Date().getFullYear().toString();
    const config: YearlyConfiguration = {
      id: randomUUID(),
      year: currentYear,
      zodiacAnimal: "Dragon", // 2024 - Wood Dragon year
      zodiacElement: "Wood",
      intentionWord: "Transformation",
      lunarNewYear: "2024-02-10",
      winterSolstice: "2024-12-21T09:21:00Z",
      springEquinox: "2024-03-20T03:06:00Z",
      summerSolstice: "2024-06-20T20:51:00Z",
      fallEquinox: "2024-09-22T12:44:00Z",
      majorFullMoons: [
        { date: "2024-01-25", name: "Wolf Moon", ritual: "Intentions and new beginnings" },
        { date: "2024-06-22", name: "Strawberry Moon", ritual: "Summer solstice celebration" },
        { date: "2024-10-17", name: "Hunter's Moon", ritual: "Harvest gratitude" }
      ],
      createdAt: new Date()
    };
    this.yearlyConfigurations.set(currentYear, config);
    
    console.log(`Initialized ${this.sacredEvents.size} sacred events and yearly configuration for ${currentYear}`);
  }

  private createSacredLivingYearEvents(): Omit<SacredEvent, 'id' | 'createdAt'>[] {
    return [
      // Yule - 12 Nights of the Sun's Return
      {
        title: "Yule - 12 Nights of the Sun's Return",
        description: "12-night celebration from December 20-31, marking the sun's return with nightly rituals.",
        category: "seasonal",
        festivalType: "yule",
        startDate: "12-20",
        endDate: "12-31",
        isRecurring: "true",
        recurrencePattern: "annual",
        ritualFlow: [
          { night: 1, title: "The Longest Night", ritual: "cleanse, set sacred space" },
          { night: 2, title: "Solstice", ritual: "Sun Candle, fire ritual, feast" },
          { night: 3, title: "Ancestors", ritual: "storytelling, offerings" },
          { night: 4, title: "Nature Night", ritual: "evergreens, outdoor offerings" },
          { night: 5, title: "Joy Night", ritual: "games, music, playful gifts" },
          { night: 6, title: "Wonder Night", ritual: "big feast, gratitude stories" },
          { night: 7, title: "Service Night", ritual: "acts of kindness" },
          { night: 8, title: "Magic Night", ritual: "divination, spellwork, crafts" },
          { night: 9, title: "Healing Night", ritual: "herbs, baths, quiet reflection" },
          { night: 10, title: "Vision Night", ritual: "journaling, intention-setting" },
          { night: 11, title: "Letting Go Night", ritual: "burning old habits/papers" },
          { night: 12, title: "New Year's Fire", ritual: "bonfire, Yule Log, celebration" }
        ],
        yearlyVariables: { adjustForSolsticeDate: true, addFullMoonBlessing: true },
        tags: ["yule", "winter", "solstice", "fire"]
      },
      // Lunar New Year
      {
        title: "Lunar New Year",
        description: "Sacred new year celebration with red envelopes, spirit boxes, and zodiac animal honors.",
        category: "lunar",
        festivalType: "lunar_new_year",
        startDate: "varies",
        endDate: "varies",
        isRecurring: "true",
        recurrencePattern: "lunar_cycle",
        ritualFlow: [
          { step: 1, title: "House Cleansing", ritual: "Cleanse house, reset altars with red cloths" },
          { step: 2, title: "Red Envelopes", ritual: "Red envelopes with coins, crystals, affirmations" },
          { step: 3, title: "Spirit Box", ritual: "Spirit Box for the zodiac year" }
        ],
        yearlyVariables: { zodiacAnimal: "varies", zodiacElement: "varies" },
        tags: ["lunar", "new_year", "zodiac", "renewal"]
      },
      // Sacred Heart Night
      {
        title: "Sacred Heart Night",
        description: "February 14 celebration of love, gratitude, and devotion to home and relationships.",
        category: "ritual",
        festivalType: "sacred_heart",
        startDate: "02-14",
        endDate: "02-14",
        isRecurring: "true",
        recurrencePattern: "annual",
        ritualFlow: [
          { step: 1, title: "Candle Blessing", ritual: "Light red/pink/gold candle with home blessing" },
          { step: 2, title: "Card Exchange", ritual: "Homemade card exchange with gratitude, memory, hope" },
          { step: 3, title: "Sweet Feast", ritual: "chocolate, honey, fruits" },
          { step: 4, title: "Devotion Jar", ritual: "promises of love & service" },
          { step: 5, title: "Self-love Blessing", ritual: "mirror and rose oil blessing" }
        ],
        yearlyVariables: {},
        tags: ["love", "devotion", "gratitude", "relationships"]
      },
      // Ostara / Spring Equinox
      {
        title: "Ostara - Festival of Rebirth",
        description: "Spring Equinox celebration of renewal, painted eggs, and earth's awakening.",
        category: "seasonal",
        festivalType: "ostara",
        startDate: "03-20",
        endDate: "03-21",
        isRecurring: "true",
        recurrencePattern: "annual",
        ritualFlow: [
          { step: 1, title: "Sunrise Greeting", ritual: "Thank the Earth for waking up" },
          { step: 2, title: "Painted Eggs", ritual: "eggs with sun/moon/spirals" },
          { step: 3, title: "Egg Hunt", ritual: "with affirmations, seeds, crystals" },
          { step: 4, title: "Green Feast", ritual: "greens, grains, citrus, chocolate" },
          { step: 5, title: "Evening Reflection", ritual: "What is reborn in me this spring?" }
        ],
        yearlyVariables: { equinoxDate: "exact", fullMoonAlignment: "check" },
        tags: ["spring", "equinox", "rebirth", "eggs", "renewal"]
      },
      // Beltane
      {
        title: "Beltane",
        description: "May 1 celebration of fertility, flowers, fire, and joyful abundance.",
        category: "seasonal",
        festivalType: "beltane",
        startDate: "05-01",
        endDate: "05-01",
        isRecurring: "true",
        recurrencePattern: "annual",
        ritualFlow: [
          { step: 1, title: "Flower Crowns", ritual: "Create and wear flower crowns" },
          { step: 2, title: "Bonfire Dancing", ritual: "Dance around sacred fire" },
          { step: 3, title: "Playful Feasting", ritual: "Celebration feast with joy" },
          { step: 4, title: "Land Offerings", ritual: "milk, honey, flowers to the land" }
        ],
        yearlyVariables: {},
        tags: ["beltane", "fertility", "flowers", "fire", "dancing"]
      },
      // Summer Solstice - 12 Days of Solstice Fire
      {
        title: "12 Days of Solstice Fire",
        description: "June 15-26 celebration centered on Summer Solstice with daily fire rituals.",
        category: "seasonal",
        festivalType: "summer_solstice",
        startDate: "06-15",
        endDate: "06-26",
        isRecurring: "true",
        recurrencePattern: "annual",
        ritualFlow: [
          { day: 1, title: "Opening Fire", ritual: "light candles, call in 12 days of joy" },
          { day: 2, title: "Nature's Blessing", ritual: "outdoor play, garden offerings" },
          { day: 3, title: "Faerie Night", ritual: "flower crowns, faerie jars, altar" },
          { day: 4, title: "Feast of Flame", ritual: "BBQ or shared meal" },
          { day: 5, title: "Water & Fire Day", ritual: "water play + fire ritual" },
          { day: 6, title: "Sun Spellcraft", ritual: "solar tea, crystal charging" },
          { day: 7, title: "Solstice", ritual: "sunrise ritual, solar crowns, feast" },
          { day: 8, title: "Ancestor Joy", ritual: "music, storytelling" },
          { day: 9, title: "Creativity Day", ritual: "painting, candle-making" },
          { day: 10, title: "Faerie Festival", ritual: "costumes, scavenger hunt" },
          { day: 11, title: "Longest Light Eve", ritual: "fire + gratitude offerings" },
          { day: 12, title: "Solstice Night", ritual: "bonfire, intention burning, feast" }
        ],
        yearlyVariables: { solsticeDate: "exact", fullMoonOverlap: "check" },
        tags: ["summer", "solstice", "fire", "faeries", "creativity"]
      },
      // Fall Equinox
      {
        title: "Fall Equinox",
        description: "September 22-24 balance celebration of light and dark, harvest gratitude.",
        category: "seasonal",
        festivalType: "fall_equinox",
        startDate: "09-22",
        endDate: "09-24",
        isRecurring: "true",
        recurrencePattern: "annual",
        ritualFlow: [
          { step: 1, title: "Balance Altar", ritual: "Create light vs. dark altar" },
          { step: 2, title: "Harvest Reflection", ritual: "Family reflection on year's harvest" },
          { step: 3, title: "Autumn Feast", ritual: "apples, corn, grains" },
          { step: 4, title: "Nature Walk", ritual: "gather autumn items for altar" }
        ],
        yearlyVariables: { equinoxDate: "exact" },
        tags: ["autumn", "equinox", "balance", "harvest", "gratitude"]
      },
      // The Veil Festival
      {
        title: "The Veil Festival",
        description: "October 30 - November 2 ancestor celebration spanning Halloween, Samhain, and Día de los Muertos.",
        category: "ritual",
        festivalType: "veil_festival",
        startDate: "10-30",
        endDate: "11-02",
        isRecurring: "true",
        recurrencePattern: "annual",
        ritualFlow: [
          { day: "Oct 30", title: "Spirit Night", ritual: "Pumpkin carving with sigils, Spirit Box letters" },
          { day: "Oct 31", title: "Samhain Night", ritual: "Trick-or-Treat + ancestor altar" },
          { day: "Nov 1", title: "Día de los Muertos", ritual: "Marigolds, pan de muerto, music, dance" },
          { day: "Nov 2", title: "Farewell Feast", ritual: "burn Spirit Box letters, scatter ashes, closing blessing" }
        ],
        yearlyVariables: { fullMoonCrossing: "check nearest full moon" },
        tags: ["ancestors", "veil", "samhain", "dia_de_los_muertos", "spirits"]
      },
      // Gratitude Day
      {
        title: "Family Gratitude Day",
        description: "4th Thursday November - Thanksgiving with land acknowledgment and ancestor honoring.",
        category: "ritual",
        festivalType: "gratitude",
        startDate: "11-thanksgiving",
        endDate: "11-thanksgiving",
        isRecurring: "true",
        recurrencePattern: "annual",
        ritualFlow: [
          { step: 1, title: "Land Acknowledgment", ritual: "Honor the land and indigenous peoples" },
          { step: 2, title: "Gratitude Altar", ritual: "Three Sisters, cornucopia, ancestor photos" },
          { step: 3, title: "Named Turkey Ceremony", ritual: "honor life given" },
          { step: 4, title: "Gratitude Circle", ritual: "Feast + sharing gratitude" },
          { step: 5, title: "Sunset Candles", ritual: "for ancestors, land, future" }
        ],
        yearlyVariables: { thanksgivingDate: "4th Thursday" },
        tags: ["gratitude", "thanksgiving", "ancestors", "land", "harvest"]
      }
    ];
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
      id,
      name: insertDeity.name,
      culture: insertDeity.culture,
      domains: insertDeity.domains,
      elements: insertDeity.elements,
      symbols: insertDeity.symbols,
      epithets: insertDeity.epithets,
      offerings: insertDeity.offerings,
      cautions: insertDeity.cautions,
      stories: insertDeity.stories,
      whyMatters: insertDeity.whyMatters || null,
      image: insertDeity.image || null
    };
    this.deities.set(id, deity);
    return deity;
  }

  async updateDeity(id: string, updateData: Partial<InsertDeity>): Promise<Deity | undefined> {
    const existingDeity = this.deities.get(id);
    if (!existingDeity) return undefined;
    
    const updatedDeity: Deity = { 
      id: existingDeity.id,
      name: updateData.name ?? existingDeity.name,
      culture: updateData.culture ?? existingDeity.culture,
      domains: updateData.domains ?? existingDeity.domains,
      elements: updateData.elements ?? existingDeity.elements,
      symbols: updateData.symbols ?? existingDeity.symbols,
      epithets: updateData.epithets ?? existingDeity.epithets,
      offerings: updateData.offerings ?? existingDeity.offerings,
      cautions: updateData.cautions ?? existingDeity.cautions,
      stories: updateData.stories ?? existingDeity.stories,
      whyMatters: updateData.whyMatters ?? existingDeity.whyMatters,
      image: updateData.image ?? existingDeity.image
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

  // Sacred Living Year methods implementation
  async getAllSacredEvents(): Promise<SacredEvent[]> {
    return Array.from(this.sacredEvents.values()).sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  async getSacredEvent(id: string): Promise<SacredEvent | undefined> {
    return this.sacredEvents.get(id);
  }

  async createSacredEvent(insertEvent: InsertSacredEvent): Promise<SacredEvent> {
    const id = randomUUID();
    const event: SacredEvent = {
      ...insertEvent,
      id,
      createdAt: new Date()
    };
    this.sacredEvents.set(id, event);
    return event;
  }

  async updateSacredEvent(id: string, updateData: Partial<InsertSacredEvent>): Promise<SacredEvent | undefined> {
    const existing = this.sacredEvents.get(id);
    if (!existing) return undefined;

    const updated: SacredEvent = {
      ...existing,
      ...updateData,
    };
    this.sacredEvents.set(id, updated);
    return updated;
  }

  async deleteSacredEvent(id: string): Promise<boolean> {
    return this.sacredEvents.delete(id);
  }

  async getSacredEventsByCategory(category: string): Promise<SacredEvent[]> {
    return Array.from(this.sacredEvents.values()).filter(event => event.category === category);
  }

  async getSacredEventsByDateRange(startDate: string, endDate: string): Promise<SacredEvent[]> {
    return Array.from(this.sacredEvents.values()).filter(event => {
      if (!event.startDate) return false;
      return event.startDate >= startDate && (event.endDate || event.startDate) <= endDate;
    });
  }

  // Yearly Configuration methods implementation
  async getYearlyConfiguration(year: string): Promise<YearlyConfiguration | undefined> {
    return this.yearlyConfigurations.get(year);
  }

  async createYearlyConfiguration(insertConfig: InsertYearlyConfiguration): Promise<YearlyConfiguration> {
    const id = randomUUID();
    const config: YearlyConfiguration = {
      ...insertConfig,
      id,
      createdAt: new Date()
    };
    this.yearlyConfigurations.set(insertConfig.year, config);
    return config;
  }

  async updateYearlyConfiguration(year: string, updateData: Partial<InsertYearlyConfiguration>): Promise<YearlyConfiguration | undefined> {
    const existing = this.yearlyConfigurations.get(year);
    if (!existing) return undefined;

    const updated: YearlyConfiguration = {
      ...existing,
      ...updateData,
    };
    this.yearlyConfigurations.set(year, updated);
    return updated;
  }

  async getAllYearlyConfigurations(): Promise<YearlyConfiguration[]> {
    return Array.from(this.yearlyConfigurations.values());
  }

  // Aionara Conversation methods
  async getAllAionaraConversations(): Promise<AionaraConversation[]> {
    return Array.from(this.aionaraConversations.values());
  }

  async getAionaraConversation(id: string): Promise<AionaraConversation | undefined> {
    return this.aionaraConversations.get(id);
  }

  async createAionaraConversation(conversation: InsertAionaraConversation): Promise<AionaraConversation> {
    const newConversation: AionaraConversation = {
      id: randomUUID(),
      ...conversation,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.aionaraConversations.set(newConversation.id, newConversation);
    return newConversation;
  }

  async updateAionaraConversation(id: string, updateData: Partial<InsertAionaraConversation>): Promise<AionaraConversation | undefined> {
    const existing = this.aionaraConversations.get(id);
    if (!existing) return undefined;

    const updated: AionaraConversation = {
      ...existing,
      ...updateData,
      updatedAt: new Date(),
    };
    this.aionaraConversations.set(id, updated);
    return updated;
  }

  async deleteAionaraConversation(id: string): Promise<boolean> {
    return this.aionaraConversations.delete(id);
  }

  async getAionaraConversationsBySession(sessionId: string): Promise<AionaraConversation[]> {
    return Array.from(this.aionaraConversations.values())
      .filter(conv => conv.sessionId === sessionId);
  }

  async searchAionaraConversations(query: string): Promise<AionaraConversation[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.aionaraConversations.values())
      .filter(conv => 
        conv.userMessage?.toLowerCase().includes(searchTerm) ||
        conv.aionaraResponse?.toLowerCase().includes(searchTerm) ||
        conv.topics?.some(topic => topic.toLowerCase().includes(searchTerm))
      );
  }
}

export const storage = new MemStorage();
