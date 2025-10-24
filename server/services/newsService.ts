/**
 * Market News Service
 * Provides real estate market news and statistics for the ticker
 */

export interface MarketNews {
  id: string;
  title: string;
  category: "price" | "trend" | "market" | "development" | "news";
  borough?: string;
  timestamp: Date;
  source: string;
}

// Cache for news items
let newsCache: MarketNews[] = [];
let lastUpdated: Date = new Date();

/**
 * Get current market news for the ticker
 */
export function getMarketNews(): MarketNews[] {
  // Return cached news if it's less than 1 hour old
  if (new Date().getTime() - lastUpdated.getTime() < 60 * 60 * 1000) {
    return newsCache;
  }

  // Otherwise, refresh the cache
  refreshNewsCache();
  return newsCache;
}

/**
 * Refresh the news cache with latest data
 */
function refreshNewsCache(): void {
  const now = new Date();
  
  newsCache = [
    {
      id: "news-1",
      title: "متوسط الإيجار في لندن: £2,252/شهر (↑7.3% سنوياً)",
      category: "price",
      timestamp: now,
      source: "London Rental Market Report 2025"
    },
    {
      id: "news-2",
      title: "أغلى الأحياء: كنسينجتون وتشيلسي - £3,616/شهر",
      category: "market",
      borough: "Kensington & Chelsea",
      timestamp: now,
      source: "Borough Analysis"
    },
    {
      id: "news-3",
      title: "أرخص الأحياء: بيكسلي - £1,485/شهر",
      category: "market",
      borough: "Bexley",
      timestamp: now,
      source: "Borough Analysis"
    },
    {
      id: "news-4",
      title: "أكثر الأحياء طلباً: وستمنستر وكاندن",
      category: "trend",
      timestamp: now,
      source: "Demand Analysis"
    },
    {
      id: "news-5",
      title: "الطلب على الإيجار يزداد 15% هذا العام",
      category: "trend",
      timestamp: now,
      source: "Market Analysis"
    },
    {
      id: "news-6",
      title: "مشاريع تطوير جديدة في وايت سيتي",
      category: "development",
      borough: "Hackney",
      timestamp: now,
      source: "Development News"
    },
    {
      id: "news-7",
      title: "تحسن البنية التحتية في جنوب لندن",
      category: "development",
      timestamp: now,
      source: "Infrastructure Update"
    },
    {
      id: "news-8",
      title: "أسعار الإيجار في شرق لندن ترتفع بسرعة",
      category: "trend",
      timestamp: now,
      source: "Market Report"
    }
  ];

  lastUpdated = now;
}

/**
 * Get news by category
 */
export function getNewsByCategory(category: MarketNews["category"]): MarketNews[] {
  return getMarketNews().filter(news => news.category === category);
}

/**
 * Get news by borough
 */
export function getNewsByBorough(borough: string): MarketNews[] {
  return getMarketNews().filter(news => news.borough === borough);
}

/**
 * Add custom news item
 */
export function addNewsItem(news: Omit<MarketNews, "id" | "timestamp">): MarketNews {
  const newItem: MarketNews = {
    ...news,
    id: `news-${Date.now()}`,
    timestamp: new Date()
  };

  newsCache.push(newItem);
  return newItem;
}

/**
 * Get borough statistics
 */
export function getBoroughStats() {
  return {
    boroughs: [
      { name: "Westminster", avgRent: 2800, demand: "Very High", trend: "↑ 8%" },
      { name: "Camden", avgRent: 2600, demand: "Very High", trend: "↑ 7%" },
      { name: "Kensington & Chelsea", avgRent: 3616, demand: "High", trend: "↑ 5%" },
      { name: "Islington", avgRent: 2400, demand: "High", trend: "↑ 9%" },
      { name: "Hackney", avgRent: 1800, demand: "High", trend: "↑ 12%" },
      { name: "Tower Hamlets", avgRent: 2100, demand: "High", trend: "↑ 10%" },
      { name: "Southwark", avgRent: 2200, demand: "Medium", trend: "↑ 8%" },
      { name: "Lambeth", avgRent: 2000, demand: "Medium", trend: "↑ 7%" },
      { name: "Wandsworth", avgRent: 2300, demand: "Medium", trend: "↑ 6%" },
      { name: "Bexley", avgRent: 1485, demand: "Low", trend: "↑ 4%" },
    ]
  };
}

/**
 * Get market statistics
 */
export function getMarketStats() {
  return {
    averageRent: 2252,
    yearOnYearGrowth: 7.3,
    totalListings: 15420,
    newListingsThisMonth: 1240,
    averageTimeToRent: 18, // days
    mostPopularPropertyType: "2bed",
    topBoroughs: ["Westminster", "Camden", "Islington"],
    lowestRentBoroughs: ["Bexley", "Havering", "Harrow"]
  };
}

