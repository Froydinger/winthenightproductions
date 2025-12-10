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
        console.log("Fetching Substack podcast episodes from:", SUBSTACK_PODCAST_RSS);

        // Use a CORS proxy since Substack doesn't allow direct browser access
        const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(SUBSTACK_PODCAST_RSS)}&count=${limit}`;
        console.log("Using proxy URL:", proxyUrl);

        const response = await fetchWithTimeout(proxyUrl);
        const data = await response.json();

        console.log("Proxy response:", data);

        if (data.status !== "ok") {
          console.error("Proxy returned non-ok status:", data.status, data.message || "");
          return [];
        }

        if (!data.items || data.items.length === 0) {
          console.log("No items found in Substack podcast feed");
          return [];
        }

        console.log(`Processing ${data.items.length} items from feed...`);

        const episodes: SubstackPodcastEpisode[] = data.items
          .map((item: any, index: number) => {
            // Log each item's structure for debugging
            console.log(`Item ${index}:`, {
              title: item.title,
              hasEnclosure: !!item.enclosure,
              enclosureKeys: item.enclosure ? Object.keys(item.enclosure) : [],
              enclosure: item.enclosure,
              hasMedia: !!item.media,
            });

            // Check multiple possible enclosure properties that rss2json might use
            const hasAudio = item.enclosure?.link || item.enclosure?.url || item.media?.content?.[0]?.url;
            return { item, hasAudio };
          })
          .filter(({ hasAudio }) => hasAudio)
          .slice(0, limit)
          .map(({ item }, index: number) => {
            // Handle multiple enclosure property variations from rss2json
            const audioUrl = item.enclosure?.link || item.enclosure?.url || item.media?.content?.[0]?.url || "";

            const episode: SubstackPodcastEpisode = {
              id: item.guid || item.link || `episode-${index}`,
              title: item.title || "Untitled Episode",
              description: item.description?.replace(/<[^>]*>/g, '').substring(0, 200) || item.summary?.replace(/<[^>]*>/g, '').substring(0, 200) || "",
              audioUrl,
              pubDate: item.pubDate || item.published || new Date().toISOString(),
              duration: item.enclosure?.duration || item.media?.content?.[0]?.duration || undefined,
            };

            console.log("Created episode:", episode);
            return episode;
          });

        console.log(`Found ${episodes.length} Substack podcast episodes with audio`);
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
