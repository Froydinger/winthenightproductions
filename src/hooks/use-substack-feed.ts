import { useQuery } from "@tanstack/react-query";

const SUBSTACK_RSS_URL = "https://winthenight.substack.com/feed";
const RSS_API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(SUBSTACK_RSS_URL)}&count=50`;

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
      try {
        const response = await fetchWithTimeout(RSS_API_URL);
        const data = await response.json();
        console.log("Substack feed fetched:", data.items?.length || 0, "posts");
        
        if (data.status === "ok" && data.items) {
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
        return [];
      } catch (error) {
        console.error("Error fetching Substack feed:", error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });
};
