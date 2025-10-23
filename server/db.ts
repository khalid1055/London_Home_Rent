import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, properties, InsertProperty, leads, InsertLead, premiumListings, InsertPremiumListing, analytics, InsertAnalytic } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.id) {
    throw new Error("User ID is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      id: user.id,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role === undefined) {
      if (user.id === ENV.ownerId) {
        user.role = 'admin';
        values.role = 'admin';
        updateSet.role = 'admin';
      }
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUser(id: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Properties queries
export async function getProperties(filters?: {
  borough?: string;
  propertyType?: string;
  maxPrice?: number;
  minPrice?: number;
}) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select().from(properties).where(eq(properties.status, 'active'));
  return result;
}

export async function getPropertyById(id: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(properties).where(eq(properties.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createProperty(data: InsertProperty) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');

  await db.insert(properties).values(data);
}

// Leads queries
export async function createLead(data: InsertLead) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');

  await db.insert(leads).values(data);
}

export async function getLeads(status?: string) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select().from(leads);
  return result;
}

export async function updateLeadStatus(id: string, status: "new" | "contacted" | "qualified" | "converted") {
  const db = await getDb();
  if (!db) throw new Error('Database not available');

  await db.update(leads).set({ status }).where(eq(leads.id, id));
}

// Premium listings queries
export async function createPremiumListing(data: InsertPremiumListing) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');

  await db.insert(premiumListings).values(data);
}

// Analytics queries
export async function logAnalyticEvent(data: InsertAnalytic) {
  const db = await getDb();
  if (!db) return;

  try {
    await db.insert(analytics).values(data);
  } catch (error) {
    console.error('[Analytics] Failed to log event:', error);
  }
}

