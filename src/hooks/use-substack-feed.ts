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
const RSS_PROXY = "https://api.allorigins.win/raw?url=";

function extractTextContent(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || html;
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

    // Check for podcast episode
    const enclosure = item.querySelector("enclosure");
    const enclosureType = enclosure?.getAttribute("type") || "";
    const enclosureUrl = enclosure?.getAttribute("url") || "";

    const isPodcast = enclosureType.includes("audio") ||
                     title.match(/\bEP\.\s*\d+|\bEpisode\s+\d+/i) !== null;

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
      try {
        console.log("Fetching Substack RSS feed directly...");

        // Try direct fetch first
        let response = await fetch(`${RSS_PROXY}${encodeURIComponent(SUBSTACK_FEED_URL)}`);

        if (!response.ok) {
          console.warn("Proxy fetch failed, trying direct...");
          response = await fetch(SUBSTACK_FEED_URL);
        }

        const xmlText = await response.text();
        console.log("RSS feed fetched, length:", xmlText.length);

        const posts = parseRSSFeed(xmlText);
        console.log("Parsed", posts.length, "posts from RSS");

        if (posts.length > 0) {
          console.log("First post sample:", {
            title: posts[0].title,
            hasContent: !!posts[0].content,
            contentLength: posts[0].content.length,
            hasAudioUrl: !!posts[0].audioUrl,
            isPodcast: posts[0].isPodcast,
            audioUrl: posts[0].audioUrl
          });
        }

        return posts;
      } catch (error) {
        console.error("Error fetching Substack feed:", error);
        return [];
      }
    },
    staleTime: 1 * 60 * 1000, // Cache for 1 minute (reduced for testing)
    refetchOnWindowFocus: true, // Refetch when window gains focus
    retry: 2,
    retryDelay: 1000,
  });
};
