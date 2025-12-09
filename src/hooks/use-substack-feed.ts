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

// Request more posts from Substack RSS feed
// Testing different URL patterns to fetch maximum posts
const SUBSTACK_FEED_URLS = [
  "https://winthenight.substack.com/feed?limit=100",  // Try with limit parameter
  "https://winthenight.substack.com/feed?count=100",  // Try with count parameter
  "https://winthenight.substack.com/feed",            // Standard feed as fallback
];

// Try multiple CORS proxies as fallbacks
const CORS_PROXIES = [
  "https://corsproxy.io/?",
  "https://api.allorigins.win/raw?url=",
  "https://api.codetabs.com/v1/proxy?quest=",
];

// Sanitize HTML content - remove subscribe boxes, forms, and other unwanted elements
function sanitizeContent(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Remove unwanted elements
  const unwantedSelectors = [
    'form',                          // All forms (subscribe forms)
    'input',                         // All input fields
    'button[type="submit"]',         // Submit buttons
    '.subscription-widget',          // Substack subscription widgets
    '.subscribe',                    // Subscribe sections
    '[class*="subscribe"]',          // Any class containing "subscribe"
    '[id*="subscribe"]',             // Any ID containing "subscribe"
    'iframe',                        // Embedded iframes
    '.paywall',                      // Paywall content
    '[data-component="SubscribeWidget"]', // Substack subscribe widget
    'script',                        // Script tags
    'style',                         // Style tags (inline styles)
  ];

  unwantedSelectors.forEach(selector => {
    doc.querySelectorAll(selector).forEach(el => el.remove());
  });

  return doc.body.innerHTML;
}

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
        content: sanitizeContent(content), // Sanitize content to remove subscribe boxes and forms
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
      console.log("Starting Substack RSS feed fetch with multiple URL strategies...");

      let bestResult: SubstackPost[] = [];
      let maxPostsFound = 0;

      // Try each feed URL variant to find which returns the most posts
      for (let feedIndex = 0; feedIndex < SUBSTACK_FEED_URLS.length; feedIndex++) {
        const feedUrl = SUBSTACK_FEED_URLS[feedIndex];
        console.log(`\n🔍 Testing feed URL ${feedIndex + 1}/${SUBSTACK_FEED_URLS.length}:`, feedUrl);

        // Try each CORS proxy for this feed URL
        for (let proxyIndex = 0; proxyIndex < CORS_PROXIES.length; proxyIndex++) {
          const proxy = CORS_PROXIES[proxyIndex];
          try {
            console.log(`  Attempting with proxy ${proxyIndex + 1}/${CORS_PROXIES.length}`);

            const proxyUrl = `${proxy}${encodeURIComponent(feedUrl)}`;
            const response = await fetch(proxyUrl, {
              signal: AbortSignal.timeout(10000), // 10 second timeout
            });

            if (!response.ok) {
              console.warn(`  ✗ Proxy ${proxyIndex + 1} failed with status:`, response.status);
              continue; // Try next proxy
            }

            const xmlText = await response.text();
            const allPosts = parseRSSFeed(xmlText);

            if (allPosts.length === 0) {
              console.warn(`  ✗ No posts parsed from this URL+proxy combination`);
              continue;
            }

            // Filter out podcast posts - only show blog articles
            const blogPosts = allPosts.filter(post => !post.isPodcast);

            console.log(`  ✓ Found ${allPosts.length} total posts, ${blogPosts.length} blog posts (filtered ${allPosts.length - blogPosts.length} podcasts)`);

            // Keep track of the best result (most blog posts found)
            if (blogPosts.length > maxPostsFound) {
              maxPostsFound = blogPosts.length;
              bestResult = blogPosts;
              console.log(`  🎯 NEW BEST: ${blogPosts.length} blog posts from this feed URL!`);

              // If we got a good amount, show date range
              if (blogPosts.length > 0) {
                const oldestPost = blogPosts[blogPosts.length - 1];
                const newestPost = blogPosts[0];
                console.log(`  📅 Date range: ${new Date(oldestPost.pubDate).toLocaleDateString()} to ${new Date(newestPost.pubDate).toLocaleDateString()}`);
              }
            }

            // Successfully fetched - break out of proxy loop for this feed URL
            break;
          } catch (error) {
            console.error(`  ✗ Proxy ${proxyIndex + 1} error:`, error);
            // Continue to next proxy
          }
        }

        // If we found posts with this feed URL, we can move on
        if (maxPostsFound > 0) {
          // Continue trying other feed URLs to see if any return more posts
          continue;
        }
      }

      // If we found posts from any URL strategy, return the best result
      if (maxPostsFound > 0) {
        console.log(`\n✅ FINAL RESULT: Returning ${maxPostsFound} blog posts`);
        return bestResult;
      }

      // All feed URLs and proxies failed, try direct fetch as last resort
      console.log("\n⚠️ All feed URLs and proxies failed, attempting direct fetch...");
      for (const feedUrl of SUBSTACK_FEED_URLS) {
        try {
          const response = await fetch(feedUrl);
          if (response.ok) {
            const xmlText = await response.text();
            const allPosts = parseRSSFeed(xmlText);
            const blogPosts = allPosts.filter(post => !post.isPodcast);
            if (blogPosts.length > 0) {
              console.log(`✓ Direct fetch succeeded with ${feedUrl}, got ${blogPosts.length} blog posts`);
              return blogPosts;
            }
          }
        } catch (error) {
          console.error(`Direct fetch failed for ${feedUrl}:`, error);
        }
      }

      console.error("❌ All fetch attempts failed");
      return [];
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: true,
    retry: 1, // Reduce retries since we already try multiple strategies
    retryDelay: 2000,
  });
};
