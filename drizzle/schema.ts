import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * London boroughs for property listings
 */
export const boroughs = mysqlTable("boroughs", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  averageRent: int("averageRent").notNull(), // Monthly rent in GBP
  rating: int("rating").notNull().default(40), // Rating out of 50 (4.0 = 40)
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Borough = typeof boroughs.$inferSelect;
export type InsertBorough = typeof boroughs.$inferInsert;

/**
 * Property listings
 */
export const properties = mysqlTable("properties", {
  id: int("id").autoincrement().primaryKey(),
  boroughId: int("boroughId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  bedrooms: int("bedrooms").notNull(),
  price: int("price").notNull(), // Monthly rent in GBP
  imageUrl: text("imageUrl"),
  featured: boolean("featured").default(false).notNull(),
  available: boolean("available").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Property = typeof properties.$inferSelect;
export type InsertProperty = typeof properties.$inferInsert;

/**
 * Lead capture form submissions
 */
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  interestedIn: mysqlEnum("interestedIn", ["Renting", "Buying", "Selling", "Investing"]).notNull(),
  preferredBoroughId: int("preferredBoroughId"),
  budget: int("budget"), // Monthly budget in GBP
  message: text("message"),
  status: mysqlEnum("status", ["new", "contacted", "converted", "closed"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

