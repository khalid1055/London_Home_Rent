import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Property Listings Table
export const properties = mysqlTable("properties", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  borough: varchar("borough", { length: 100 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  propertyType: mysqlEnum("propertyType", ["studio", "1bed", "2bed", "3bed", "4bed", "5bed+"]).notNull(),
  rentPrice: int("rentPrice").notNull(), // Monthly rent in GBP
  bedrooms: int("bedrooms"),
  bathrooms: int("bathrooms"),
  squareFeet: int("squareFeet"),
  imageUrl: varchar("imageUrl", { length: 500 }),
  source: varchar("source", { length: 100 }), // zoopla, rightmove, nestoria, etc.
  sourceUrl: varchar("sourceUrl", { length: 500 }), // Link to original listing
  agentId: varchar("agentId", { length: 64 }),
  agentName: varchar("agentName", { length: 255 }),
  agentEmail: varchar("agentEmail", { length: 320 }),
  agentPhone: varchar("agentPhone", { length: 20 }),
  isPremiumListing: boolean("isPremiumListing").default(false),
  premiumExpiresAt: timestamp("premiumExpiresAt"),
  status: mysqlEnum("status", ["active", "rented", "expired"]).default("active"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Property = typeof properties.$inferSelect;
export type InsertProperty = typeof properties.$inferInsert;

// Leads Table - for capturing interested renters
export const leads = mysqlTable("leads", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  interestedIn: mysqlEnum("interestedIn", ["buy", "sell", "rent"]).notNull(),
  borough: varchar("borough", { length: 100 }),
  budget: int("budget"), // Monthly budget in GBP
  message: text("message"),
  source: varchar("source", { length: 100 }), // Where they came from
  status: mysqlEnum("status", ["new", "contacted", "qualified", "converted"]).default("new"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

// Premium Listings - for monetization
export const premiumListings = mysqlTable("premiumListings", {
  id: varchar("id", { length: 64 }).primaryKey(),
  propertyId: varchar("propertyId", { length: 64 }).notNull(),
  agentId: varchar("agentId", { length: 64 }).notNull(),
  packageType: mysqlEnum("packageType", ["basic", "featured", "premium"]).notNull(),
  price: int("price").notNull(), // Price in GBP pence
  durationDays: int("durationDays").notNull(),
  startDate: timestamp("startDate").defaultNow(),
  endDate: timestamp("endDate"),
  status: mysqlEnum("status", ["active", "expired", "cancelled"]).default("active"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type PremiumListing = typeof premiumListings.$inferSelect;
export type InsertPremiumListing = typeof premiumListings.$inferInsert;

// Affiliate Partners - for affiliate marketing
export const affiliatePartners = mysqlTable("affiliatePartners", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // e.g., "insurance", "moving", "utilities"
  affiliateUrl: varchar("affiliateUrl", { length: 500 }).notNull(),
  commissionRate: int("commissionRate").notNull(), // Commission percentage (e.g., 5 for 5%)
  description: text("description"),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type AffiliatePartner = typeof affiliatePartners.$inferSelect;
export type InsertAffiliatePartner = typeof affiliatePartners.$inferInsert;

// Smart Alerts - user search preferences
export const searchAlerts = mysqlTable("searchAlerts", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  borough: varchar("borough", { length: 100 }),
  minPrice: int("minPrice"),
  maxPrice: int("maxPrice"),
  bedrooms: int("bedrooms"),
  propertyType: varchar("propertyType", { length: 50 }),
  keywords: text("keywords"),
  notificationEmail: boolean("notificationEmail").default(true),
  notificationWhatsApp: boolean("notificationWhatsApp").default(false),
  whatsAppNumber: varchar("whatsAppNumber", { length: 20 }),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type SearchAlert = typeof searchAlerts.$inferSelect;
export type InsertSearchAlert = typeof searchAlerts.$inferInsert;

// Reviews & Ratings
export const reviews = mysqlTable("reviews", {
  id: varchar("id", { length: 64 }).primaryKey(),
  propertyId: varchar("propertyId", { length: 64 }),
  boroughName: varchar("boroughName", { length: 100 }),
  userId: varchar("userId", { length: 64 }),
  userName: varchar("userName", { length: 255 }).notNull(),
  rating: int("rating").notNull(), // 1-5 stars
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  categories: text("categories"), // JSON: safety, amenities, transport, etc.
  helpful: int("helpful").default(0),
  unhelpful: int("unhelpful").default(0),
  isVerified: boolean("isVerified").default(false),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

// Comprehensive Guides
export const guides = mysqlTable("guides", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  borough: varchar("borough", { length: 100 }),
  category: varchar("category", { length: 100 }).notNull(), // "borough-guide", "neighborhood", "tips", etc.
  content: text("content").notNull(),
  excerpt: varchar("excerpt", { length: 500 }),
  imageUrl: varchar("imageUrl", { length: 500 }),
  sections: text("sections"), // JSON: {title, content}
  seoTitle: varchar("seoTitle", { length: 255 }),
  seoDescription: varchar("seoDescription", { length: 500 }),
  keywords: text("keywords"),
  views: int("views").default(0),
  isPublished: boolean("isPublished").default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Guide = typeof guides.$inferSelect;
export type InsertGuide = typeof guides.$inferInsert;

// Investment Analysis
export const investmentAnalysis = mysqlTable("investmentAnalysis", {
  id: varchar("id", { length: 64 }).primaryKey(),
  borough: varchar("borough", { length: 100 }).notNull(),
  averageRent: int("averageRent"),
  averagePropertyPrice: int("averagePropertyPrice"),
  rentYield: int("rentYield"), // percentage * 100
  capitalGrowth: int("capitalGrowth"), // percentage * 100
  demandLevel: mysqlEnum("demandLevel", ["low", "medium", "high", "very_high"]),
  priceGrowth: int("priceGrowth"), // YoY percentage * 100
  investmentScore: int("investmentScore"), // 1-100
  bestFor: text("bestFor"), // JSON: ["first_time_buyers", "investors", etc.]
  pros: text("pros"), // JSON array
  cons: text("cons"), // JSON array
  futureOutlook: varchar("futureOutlook", { length: 255 }),
  lastUpdated: timestamp("lastUpdated").defaultNow(),
});

export type InvestmentAnalysis = typeof investmentAnalysis.$inferSelect;
export type InsertInvestmentAnalysis = typeof investmentAnalysis.$inferInsert;

// Analytics - track page views and conversions
export const analytics = mysqlTable("analytics", {
  id: varchar("id", { length: 64 }).primaryKey(),
  eventType: varchar("eventType", { length: 50 }).notNull(), // e.g., "page_view", "lead_submit", "listing_click"
  propertyId: varchar("propertyId", { length: 64 }),
  userId: varchar("userId", { length: 64 }),
  source: varchar("source", { length: 100 }), // Referrer or source
  metadata: text("metadata"), // JSON string for additional data
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Analytic = typeof analytics.$inferSelect;
export type InsertAnalytic = typeof analytics.$inferInsert;
