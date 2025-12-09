import { useQuery } from "@tanstack/react-query";

// Try both substack domains - the .substack.com one is more reliable
const SUBSTACK_URLS = [
  "https://winthenight.substack.com/feed",
  "https://winthenight.blog/feed"
];

const getRssApiUrl = (feedUrl: string) => 
  `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&count=50`;

export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  guid: string;
}

const fetchWithTimeout = async (url: string, timeout = 8000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export const useSubstackFeed = () => {
  return useQuery({
    queryKey: ["substack-feed"],
    queryFn: async (): Promise<SubstackPost[]> => {
      // Try each URL until one works
      for (const feedUrl of SUBSTACK_URLS) {
        try {
          const rssApiUrl = getRssApiUrl(feedUrl);
          console.log("Trying Substack feed:", feedUrl);
          const response = await fetchWithTimeout(rssApiUrl);
          const data = await response.json();
          
          if (data.status === "ok" && data.items && data.items.length > 0) {
            console.log("Substack feed fetched from", feedUrl, ":", data.items.length, "posts");
            return data.items.map((item: any) => ({
              title: item.title || "",
              link: item.link || "",
              pubDate: item.pubDate || "",
              author: item.author || "Win The Night",
              thumbnail: item.thumbnail || item.enclosure?.link || "",
              description: item.description || "",
              content: item.content || "",
              guid: item.guid || item.link || "",
            }));
          }
        } catch (error) {
          console.warn("Failed to fetch from", feedUrl, error);
          continue;
        }
      }
      
      console.error("All Substack feed URLs failed");
      return [];
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });
};
