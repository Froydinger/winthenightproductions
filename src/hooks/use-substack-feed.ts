import { useQuery } from "@tanstack/react-query";

export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  guid: string;
  isPodcast: boolean;
  audioUrl?: string;
}

const SUBSTACK_FEED_URL = "https://winthenight.substack.com/feed";
// Try multiple CORS proxies as fallbacks
const CORS_PROXIES = [
  "https://corsproxy.io/?",
  "https://api.allorigins.win/raw?url=",
  "https://api.codetabs.com/v1/proxy?quest=",
];

function parseRSSFeed(xmlText: string): SubstackPost[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");

  const items = xmlDoc.querySelectorAll("item");
  const posts: SubstackPost[] = [];

  items.forEach((item) => {
    const title = item.querySelector("title")?.textContent || "";
    const link = item.querySelector("link")?.textContent || "";
    const pubDate = item.querySelector("pubDate")?.textContent || "";
    const author = item.querySelector("creator")?.textContent ||
                   item.querySelector("author")?.textContent || "Win The Night";

    // Get description and content
    const descriptionElement = item.querySelector("description");
    const contentElement = item.querySelector("encoded") ||
                          item.querySelector("content\\:encoded") ||
                          item.querySelector("content");

    const description = descriptionElement?.textContent || "";
    const content = contentElement?.textContent || description;

    const guid = item.querySelector("guid")?.textContent || link;

    // Check for podcast episode - look for audio enclosure OR episode pattern in title
    const enclosure = item.querySelector("enclosure");
    const enclosureType = enclosure?.getAttribute("type") || "";
    const enclosureUrl = enclosure?.getAttribute("url") || "";

    const isPodcast = enclosureType.includes("audio") ||
                     title.match(/\bEP\.\s*\d+|\bEpisode\s+\d+|Check-in\s+EP\./i) !== null;

    const audioUrl = isPodcast && enclosureType.includes("audio") ? enclosureUrl : undefined;

    // Get thumbnail - try multiple sources
    let thumbnail = "";

    // Check if enclosure is an image
    if (enclosureType.includes("image")) {
      thumbnail = enclosureUrl;
    }

    // Try media:content
    if (!thumbnail) {
      const mediaContent = item.querySelector("content[url]");
      thumbnail = mediaContent?.getAttribute("url") || "";
    }

    // Try to extract image from description or content
    if (!thumbnail) {
      const imgMatch = (content || description).match(/<img[^>]+src="([^">]+)"/i);
      if (imgMatch) {
        thumbnail = imgMatch[1];
      }
    }

    if (title && link) {
      posts.push({
        title,
        link,
        pubDate,
        author,
        thumbnail,
        description,
        content,
        guid,
        isPodcast,
        audioUrl,
      });
    }
  });

  return posts;
}

export const useSubstackFeed = () => {
  return useQuery({
    queryKey: ["substack-feed"],
    queryFn: async (): Promise<SubstackPost[]> => {
      console.log("Starting Substack RSS feed fetch...");

      // Try each CORS proxy in sequence
      for (let i = 0; i < CORS_PROXIES.length; i++) {
        const proxy = CORS_PROXIES[i];
        try {
          console.log(`Attempting fetch with proxy ${i + 1}/${CORS_PROXIES.length}:`, proxy);

          const proxyUrl = `${proxy}${encodeURIComponent(SUBSTACK_FEED_URL)}`;
          const response = await fetch(proxyUrl, {
            signal: AbortSignal.timeout(10000), // 10 second timeout
          });

          if (!response.ok) {
            console.warn(`Proxy ${i + 1} failed with status:`, response.status);
            continue; // Try next proxy
          }

          const xmlText = await response.text();
          console.log(`✓ RSS feed fetched via proxy ${i + 1}, length:`, xmlText.length);

          const allPosts = parseRSSFeed(xmlText);
          console.log("Parsed", allPosts.length, "total posts from RSS");

          if (allPosts.length === 0) {
            console.warn("No posts parsed, trying next proxy...");
            continue;
          }

          // Filter out podcast posts - only show blog articles
          const blogPosts = allPosts.filter(post => !post.isPodcast);

          console.log("✓ Filtered to", blogPosts.length, "blog posts (removed", allPosts.length - blogPosts.length, "podcast episodes)");

          if (blogPosts.length > 0) {
            console.log("First blog post:", {
              title: blogPosts[0].title,
              hasContent: !!blogPosts[0].content,
              contentLength: blogPosts[0].content.length,
            });
          }

          return blogPosts;
        } catch (error) {
          console.error(`Proxy ${i + 1} error:`, error);
          // Continue to next proxy
        }
      }

      // All proxies failed, try direct fetch as last resort
      console.log("All proxies failed, attempting direct fetch...");
      try {
        const response = await fetch(SUBSTACK_FEED_URL);
        if (response.ok) {
          const xmlText = await response.text();
          const allPosts = parseRSSFeed(xmlText);
          const blogPosts = allPosts.filter(post => !post.isPodcast);
          console.log("✓ Direct fetch succeeded, got", blogPosts.length, "blog posts");
          return blogPosts;
        }
      } catch (error) {
        console.error("Direct fetch also failed:", error);
      }

      console.error("❌ All fetch attempts failed");
      return [];
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: true,
    retry: 1, // Reduce retries since we already try multiple proxies
    retryDelay: 2000,
  });
};
