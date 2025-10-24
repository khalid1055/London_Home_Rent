import { scrapePropertyData, rewritePropertyDescription, generateSEOTitle, generateMarketNews } from "./scraperService";
import { createProperty } from "../db";
import { v4 as uuidv4 } from "uuid";

/**
 * Scheduled job to run daily at a specific time
 * Collects property data, rewrites descriptions, and publishes new listings
 */
export async function runDailyPublishingJob(): Promise<{
  success: boolean;
  published: number;
  error?: string;
}> {
  try {
    console.log("[Publisher] Starting daily publishing job...");

    // Step 1: Scrape property data from multiple sources
    console.log("[Publisher] Scraping property data...");
    const scrapedProperties = await scrapePropertyData();
    console.log(`[Publisher] Found ${scrapedProperties.length} properties`);

    if (scrapedProperties.length === 0) {
      return { success: false, published: 0, error: "No properties found" };
    }

    // Step 2: Process and rewrite each property
    let publishedCount = 0;
    for (const property of scrapedProperties) {
      try {
        // Generate SEO-optimized title
        const seoTitle = await generateSEOTitle(
          property.borough,
          property.bedrooms,
          property.bathrooms,
          property.rentPrice
        );

        // Rewrite description to avoid plagiarism
        const rewrittenDescription = await rewritePropertyDescription(
          property.description,
          property.title,
          property.borough,
          property.bedrooms,
          property.bathrooms
        );

        // Determine property type based on bedrooms
        const propertyType = property.bedrooms === 0 ? "studio" : 
                           property.bedrooms === 1 ? "1bed" :
                           property.bedrooms === 2 ? "2bed" :
                           property.bedrooms === 3 ? "3bed" :
                           property.bedrooms === 4 ? "4bed" : "5bed+";

        // Create property in database
        await createProperty({
          id: uuidv4(),
          title: seoTitle,
          description: rewrittenDescription,
          borough: property.borough,
          address: property.borough, // Use borough as address for now
          propertyType: propertyType,
          rentPrice: property.rentPrice,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          imageUrl: property.imageUrl,
          source: property.source,
          sourceUrl: property.sourceUrl,
          isPremiumListing: false,
        });

        publishedCount++;
        console.log(`[Publisher] Published: ${seoTitle}`);
      } catch (error) {
        console.error(`[Publisher] Error processing property:`, error);
        continue;
      }
    }

    // Step 3: Generate and cache market news
    console.log("[Publisher] Generating market news...");
    const marketNews = await generateMarketNews();
    // TODO: Cache news in database or Redis

    console.log(`[Publisher] Daily publishing job completed. Published ${publishedCount} properties`);

    return {
      success: true,
      published: publishedCount,
    };
  } catch (error) {
    console.error("[Publisher] Error in daily publishing job:", error);
    return {
      success: false,
      published: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Initialize scheduled jobs
 * Run this once when the server starts
 */
export function initializeScheduledJobs() {
  // Run daily at 2 AM UTC
  const scheduleTime = "0 2 * * *"; // Cron format: minute hour day month dayOfWeek

  console.log("[Scheduler] Initializing scheduled jobs...");

  // For development, run every hour
  const isDevelopment = process.env.NODE_ENV === "development";

  if (isDevelopment) {
    // Run every hour in development
    setInterval(async () => {
      await runDailyPublishingJob();
    }, 60 * 60 * 1000); // 1 hour
    console.log("[Scheduler] Scheduled job set to run every hour (development mode)");
  } else {
    // Run daily at 2 AM in production
    // You would typically use a library like node-cron for this
    // For now, we'll use a simple interval
    const now = new Date();
    const target = new Date();
    target.setUTCHours(2, 0, 0, 0);

    if (now > target) {
      target.setDate(target.getDate() + 1);
    }

    const timeUntilNext = target.getTime() - now.getTime();

    setTimeout(async () => {
      await runDailyPublishingJob();
      // Run every 24 hours after the first run
      setInterval(async () => {
        await runDailyPublishingJob();
      }, 24 * 60 * 60 * 1000);
    }, timeUntilNext);

    console.log(
      `[Scheduler] Scheduled job set to run daily at 2 AM UTC (production mode)`
    );
  }
}

/**
 * Manual trigger for testing
 */
export async function triggerPublishingJobManually() {
  return await runDailyPublishingJob();
}

