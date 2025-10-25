// Using RSS2JSON service to fetch RSS feeds - works in browser
const RSS_URL = "https://api.rss2json.com/v1/api.json";

export const fetchEVNews = async () => {
  try {
    // Using CleanTechnica RSS feed - good source for EV news
    const rssFeeds = [
      "https://cleantechnica.com/category/clean-transport-2/electric-vehicles/feed/",
      "https://electrek.co/feed/",
    ];

    const randomFeed = rssFeeds[Math.floor(Math.random() * rssFeeds.length)];

    const response = await fetch(
      `${RSS_URL}?rss_url=${encodeURIComponent(
        randomFeed
      )}&api_key=YOUR_API_KEY&count=10`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await response.json();

    if (data.status !== "ok") {
      throw new Error("RSS service error");
    }

    return data.items
      .filter(
        (item) =>
          item.title &&
          item.description &&
          item.pubDate &&
          !item.title.includes("Advertisement")
      )
      .slice(0, 5)
      .map((item) => ({
        id: Math.random().toString(36),
        title: item.title,
        summary: stripHtml(item.description).substring(0, 150) + "...",
        source: data.feed?.title || "Clean Tech News",
        publishedAt: item.pubDate,
        url: item.link,
        category: categorizeArticle(item.title),
      }));
  } catch (error) {
    console.error("Error fetching news:", error);
    // Return mock data as fallback
    return getMockNews();
  }
};

// Helper function to remove HTML tags
const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

// Helper function to categorize articles
const categorizeArticle = (title) => {
  const lowerTitle = title.toLowerCase();

  if (
    lowerTitle.includes("charging") ||
    lowerTitle.includes("infrastructure")
  ) {
    return "Infrastructure";
  } else if (lowerTitle.includes("tesla")) {
    return "Industry";
  } else if (
    lowerTitle.includes("battery") ||
    lowerTitle.includes("technology")
  ) {
    return "Technology";
  } else if (lowerTitle.includes("sales") || lowerTitle.includes("market")) {
    return "Market";
  } else if (lowerTitle.includes("study") || lowerTitle.includes("research")) {
    return "Research";
  }
  return "General";
};

// Fallback mock news
const getMockNews = () => [
  {
    id: 1,
    title: "Electric Vehicle Adoption Accelerates Globally",
    summary:
      "New data shows electric vehicle sales have increased by 60% year-over-year, driven by improved battery technology and expanded charging infrastructure...",
    source: "Clean Tech News",
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    url: "#",
    category: "Market",
  },
  {
    id: 2,
    title: "Tesla Opens Supercharger Network to All EVs",
    summary:
      "Tesla announces major expansion of its charging network accessibility, allowing non-Tesla vehicles to use Supercharger stations across major markets...",
    source: "EV News Daily",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    url: "#",
    category: "Infrastructure",
  },
  {
    id: 3,
    title: "Breakthrough in Solid-State Battery Technology",
    summary:
      "Researchers achieve significant milestone in solid-state battery development, promising faster charging times and increased safety for electric vehicles...",
    source: "Tech Innovation",
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    url: "#",
    category: "Technology",
  },
  {
    id: 4,
    title: "Study: EVs Reduce Carbon Footprint by 70%",
    summary:
      "New lifecycle analysis confirms electric vehicles produce significantly lower emissions than gasoline cars, even accounting for battery production...",
    source: "Environmental Research",
    publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    url: "#",
    category: "Research",
  },
  {
    id: 5,
    title: "Major Automakers Commit to Electric Future",
    summary:
      "Coalition of automotive manufacturers pledges to phase out internal combustion engines by 2035, signaling industry-wide shift to electrification...",
    source: "Auto Industry Weekly",
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    url: "#",
    category: "Industry",
  },
];
