import { drizzle } from "drizzle-orm/mysql2";
import { boroughs } from "./drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function seed() {
  console.log("Seeding database...");

  // Insert boroughs
  await db.insert(boroughs).values([
    { name: "Westminster", averageRent: 2800, rating: 48, description: "Central London's prestigious borough" },
    { name: "Camden", averageRent: 2600, rating: 45, description: "Vibrant cultural hub with great nightlife" },
    { name: "Islington", averageRent: 2400, rating: 43, description: "Trendy area with excellent restaurants" },
    { name: "Hackney", averageRent: 1800, rating: 46, description: "Creative and diverse East London borough" },
    { name: "Tower Hamlets", averageRent: 2200, rating: 42, description: "Modern development near Canary Wharf" },
  ]);

  console.log("✓ Seeding complete!");
}

seed().catch(console.error);
