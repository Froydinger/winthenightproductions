import { useQuery } from "@tanstack/react-query";

export interface SubstackPodcastEpisode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  pubDate: string;
  duration?: string;
}

const SUBSTACK_PODCAST_RSS = "https://api.substack.com/feed/podcast/3678939.rss";

const fetchWithTimeout = async (url: string, timeout = 10000) => {
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

export const useSubstackPodcast = (limit: number = 5) => {
  return useQuery({
    queryKey: ["substack-podcast", limit],
    queryFn: async (): Promise<SubstackPodcastEpisode[]> => {
      try {
        console.log("Fetching Substack podcast episodes...");
        
        // Use a CORS proxy since Substack doesn't allow direct browser access
        const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(SUBSTACK_PODCAST_RSS)}&count=${limit}`;
        
        const response = await fetchWithTimeout(proxyUrl);
        const data = await response.json();

        if (data.status !== "ok" || !data.items || data.items.length === 0) {
          console.log("No items found in Substack podcast feed");
          return [];
        }

        const episodes: SubstackPodcastEpisode[] = data.items
          .filter((item: any) => item.enclosure?.link) // Only items with audio
          .slice(0, limit)
          .map((item: any, index: number) => ({
            id: item.guid || `episode-${index}`,
            title: item.title || "Untitled Episode",
            description: item.description?.replace(/<[^>]*>/g, '').substring(0, 200) || "",
            audioUrl: item.enclosure?.link || "",
            pubDate: item.pubDate || new Date().toISOString(),
            duration: item.enclosure?.duration || undefined,
          }));

        console.log(`Found ${episodes.length} Substack podcast episodes`);
        return episodes;
      } catch (error) {
        console.error("Error fetching Substack podcast:", error);
        return [];
      }
    },
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 2000,
  });
};
