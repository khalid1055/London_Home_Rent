import { invokeLLM } from "../_core/llm";

export interface PropertyData {
  title: string;
  borough: string;
  rentPrice: number;
  bedrooms?: number;
  bathrooms?: number;
  description: string;
  source: "zoopla" | "rightmove" | "nestoria" | "beauchamp" | "savills" | "google";
  sourceUrl?: string;
  imageUrl?: string;
}

/**
 * Scrape property data from multiple sources
 * Collects basic information: price, location, bedrooms, bathrooms, description
 */
export async function scrapePropertyData(): Promise<PropertyData[]> {
  const properties: PropertyData[] = [];

  try {
    // Simulate scraping from different sources
    // In production, you would use actual web scraping libraries like puppeteer or cheerio
    
    properties.push(...await scrapeZoopla());
    properties.push(...await scrapeRightmove());
    properties.push(...await scrapeNestoria());
    properties.push(...await scrapeBeauchamp());
    properties.push(...await scrapeSavills());
    properties.push(...await scrapeGoogle());

    return properties;
  } catch (error) {
    console.error("Error scraping property data:", error);
    return [];
  }
}

async function scrapeZoopla(): Promise<PropertyData[]> {
  // Mock data - in production, use web scraping library
  return [
    {
      title: "Modern 2-bed apartment in Westminster",
      borough: "Westminster",
      rentPrice: 2500,
      bedrooms: 2,
      bathrooms: 1,
      description: "Beautiful modern apartment with stunning views of the city",
      source: "zoopla",
      sourceUrl: "https://zoopla.co.uk/..."
    }
  ];
}

async function scrapeRightmove(): Promise<PropertyData[]> {
  return [
    {
      title: "Spacious 3-bed flat in Camden",
      borough: "Camden",
      rentPrice: 2800,
      bedrooms: 3,
      bathrooms: 2,
      description: "Bright and spacious apartment in the heart of Camden",
      source: "rightmove",
      sourceUrl: "https://rightmove.co.uk/..."
    }
  ];
}

async function scrapeNestoria(): Promise<PropertyData[]> {
  return [
    {
      title: "Cozy studio in Islington",
      borough: "Islington",
      rentPrice: 1200,
      bedrooms: 0,
      bathrooms: 1,
      description: "Compact studio apartment perfect for professionals",
      source: "nestoria",
      sourceUrl: "https://nestoria.co.uk/..."
    }
  ];
}

async function scrapeBeauchamp(): Promise<PropertyData[]> {
  return [
    {
      title: "Luxury penthouse in Kensington",
      borough: "Kensington & Chelsea",
      rentPrice: 5000,
      bedrooms: 4,
      bathrooms: 3,
      description: "Exclusive luxury penthouse with premium amenities",
      source: "beauchamp",
      sourceUrl: "https://beauchamp.co.uk/..."
    }
  ];
}

async function scrapeSavills(): Promise<PropertyData[]> {
  return [
    {
      title: "Victorian townhouse in Notting Hill",
      borough: "Kensington & Chelsea",
      rentPrice: 3500,
      bedrooms: 3,
      bathrooms: 2,
      description: "Charming Victorian townhouse with period features",
      source: "savills",
      sourceUrl: "https://savills.co.uk/..."
    }
  ];
}

async function scrapeGoogle(): Promise<PropertyData[]> {
  return [
    {
      title: "Contemporary flat in Shoreditch",
      borough: "Hackney",
      rentPrice: 1800,
      bedrooms: 1,
      bathrooms: 1,
      description: "Modern apartment in trendy Shoreditch area",
      source: "google",
      sourceUrl: "https://google.com/..."
    }
  ];
}

/**
 * Rewrite property description using AI to avoid plagiarism
 * and create unique, SEO-optimized content
 */
export async function rewritePropertyDescription(
  originalDescription: string,
  title: string,
  borough: string,
  bedrooms?: number,
  bathrooms?: number
): Promise<string> {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are a professional property copywriter. Rewrite property descriptions to be unique, engaging, and SEO-optimized. 
          Keep the same information but use different words and structure. Add relevant details about the area and amenities.
          Write in Arabic. Make it compelling for potential renters.`
        },
        {
          role: "user",
          content: `Rewrite this property description:
          
Title: ${title}
Borough: ${borough}
Bedrooms: ${bedrooms || "Not specified"}
Bathrooms: ${bathrooms || "Not specified"}
Original Description: ${originalDescription}

Create a unique, engaging description that highlights the property's features and the area's benefits. Write in Arabic.`
        }
      ]
    });

    const content = response.choices[0]?.message?.content;
    if (typeof content === "string") {
      return content;
    }

    return originalDescription;
  } catch (error) {
    console.error("Error rewriting description:", error);
    return originalDescription;
  }
}

/**
 * Generate SEO-optimized title for property
 */
export async function generateSEOTitle(
  borough: string,
  bedrooms?: number,
  bathrooms?: number,
  rentPrice?: number
): Promise<string> {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are an SEO expert for property listings. Generate compelling, SEO-optimized titles for rental properties.
          Include key information: location, bedrooms, bathrooms, price. Keep it under 60 characters.
          Write in Arabic.`
        },
        {
          role: "user",
          content: `Generate an SEO-optimized title for:
          Borough: ${borough}
          Bedrooms: ${bedrooms || "Studio"}
          Bathrooms: ${bathrooms || "1"}
          Price: £${rentPrice}/month
          
          Make it catchy and include the main keywords.`
        }
      ]
    });

    const content = response.choices[0]?.message?.content;
    if (typeof content === "string") {
      return content.substring(0, 60);
    }

    return `${bedrooms || "Studio"}-bed apartment in ${borough}`;
  } catch (error) {
    console.error("Error generating SEO title:", error);
    return `${bedrooms || "Studio"}-bed apartment in ${borough}`;
  }
}

/**
 * Generate news headlines about London rental market
 */
export async function generateMarketNews(): Promise<string[]> {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are a real estate news writer. Generate 5 current, realistic news headlines about the London rental market.
          Include statistics, trends, and market insights. Write in Arabic.
          Format as a JSON array of strings.`
        },
        {
          role: "user",
          content: `Generate 5 news headlines about the London rental market for today. Include:
          - Rental price trends
          - Popular areas
          - Market insights
          - Seasonal trends
          
          Return as JSON array: ["headline1", "headline2", ...]`
        }
      ]
    });

    const content = response.choices[0]?.message?.content;
    if (typeof content === "string") {
      try {
        const headlines = JSON.parse(content);
        return Array.isArray(headlines) ? headlines : [];
      } catch {
        return [];
      }
    }

    return [];
  } catch (error) {
    console.error("Error generating market news:", error);
    return [];
  }
}

