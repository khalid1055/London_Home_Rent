import { drizzle } from "drizzle-orm/mysql2";
import { eq, and } from "drizzle-orm";
import { searchAlerts, reviews, guides, investmentAnalysis } from "../../drizzle/schema";
import { ENV } from "../_core/env";
import { v4 as uuidv4 } from "uuid";

let _db: ReturnType<typeof drizzle> | null = null;

async function getDb() {
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

/**
 * Smart Alerts Service
 */
export async function createSearchAlert(data: {
  userId: string;
  borough?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  propertyType?: string;
  keywords?: string;
  notificationEmail?: boolean;
  notificationWhatsApp?: boolean;
  whatsAppNumber?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(searchAlerts).values({
    id: uuidv4(),
    ...data,
  });
}

export async function getUserAlerts(userId: string) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(searchAlerts).where(eq(searchAlerts.userId, userId));
}

export async function deleteAlert(alertId: string) {
  const db = await getDb();
  if (!db) return false;

  await db.delete(searchAlerts).where(eq(searchAlerts.id, alertId));
  return true;
}

/**
 * Reviews Service
 */
export async function submitReview(data: {
  propertyId?: string;
  boroughName?: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  categories?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(reviews).values({
    id: uuidv4(),
    ...data,
  });
}

export async function getPropertyReviews(propertyId: string) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(reviews)
    .where(and(eq(reviews.propertyId, propertyId), eq(reviews.status, "approved")));
}

export async function getBoroughReviews(boroughName: string) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(reviews)
    .where(and(eq(reviews.boroughName, boroughName), eq(reviews.status, "approved")));
}

export async function getBoroughRating(boroughName: string) {
  const db = await getDb();
  if (!db) return 0;

  const boroughReviews = await getBoroughReviews(boroughName);
  if (boroughReviews.length === 0) return 0;

  const totalRating = boroughReviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((totalRating / boroughReviews.length) * 10) / 10;
}

export async function getPendingReviews() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(reviews).where(eq(reviews.status, "pending"));
}

export async function approveReview(reviewId: string) {
  const db = await getDb();
  if (!db) return false;

  await db.update(reviews).set({ status: "approved" }).where(eq(reviews.id, reviewId));
  return true;
}

/**
 * Guides Service
 */
export async function createGuide(data: {
  title: string;
  slug: string;
  borough?: string;
  category: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  sections?: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(guides).values({
    id: uuidv4(),
    ...data,
  });
}

export async function getGuideBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(guides).where(eq(guides.slug, slug));
  return result.length > 0 ? result[0] : null;
}

export async function getBoroughGuides(borough: string) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(guides).where(eq(guides.borough, borough));
}

export async function getPublishedGuides() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(guides).where(eq(guides.isPublished, true));
}

export async function incrementGuideViews(guideId: string) {
  const db = await getDb();
  if (!db) return false;

  const guide = await db.select().from(guides).where(eq(guides.id, guideId));
  if (guide.length === 0) return false;

  await db
    .update(guides)
    .set({ views: (guide[0].views || 0) + 1 })
    .where(eq(guides.id, guideId));
  return true;
}

/**
 * Investment Analysis Service
 */
export async function getInvestmentAnalysis(borough: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(investmentAnalysis)
    .where(eq(investmentAnalysis.borough, borough));
  return result.length > 0 ? result[0] : null;
}

export async function getAllInvestmentAnalysis() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(investmentAnalysis);
}

export async function updateInvestmentAnalysis(
  borough: string,
  data: {
    averageRent?: number;
    averagePropertyPrice?: number;
    rentYield?: number;
    capitalGrowth?: number;
    demandLevel?: "low" | "medium" | "high" | "very_high";
    priceGrowth?: number;
    investmentScore?: number;
    bestFor?: string;
    pros?: string;
    cons?: string;
    futureOutlook?: string;
  }
) {
  const db = await getDb();
  if (!db) return false;

  const existing = await getInvestmentAnalysis(borough);

  if (!existing) {
    // Create new record
    await db.insert(investmentAnalysis).values({
      id: uuidv4(),
      borough,
      ...data,
    });
  } else {
    // Update existing record
    await db
      .update(investmentAnalysis)
      .set({ ...data, lastUpdated: new Date() })
      .where(eq(investmentAnalysis.borough, borough));
  }

  return true;
}

export async function getTopInvestmentBoroughs(limit: number = 10) {
  const db = await getDb();
  if (!db) return [];

  const all = await getAllInvestmentAnalysis();
  return all
    .sort((a, b) => (b.investmentScore || 0) - (a.investmentScore || 0))
    .slice(0, limit);
}

export async function getInvestmentsByDemand(demandLevel: string) {
  const db = await getDb();
  if (!db) return [];

  const all = await getAllInvestmentAnalysis();
  return all.filter((item) => item.demandLevel === demandLevel);
}

