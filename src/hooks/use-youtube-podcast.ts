import { useQuery } from "@tanstack/react-query";

export interface YouTubePodcastEpisode {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  pubDate: string;
  link: string;
}

const YOUTUBE_CHANNEL_ID = "UCuFlxR-Ol8zzda9Z6CJkwkA";

// RSS API URL to fetch channel videos
const RSS_API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
  `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`
)}&count=50`;

// Patterns to identify podcast episodes
const PODCAST_PATTERNS = [
  /\bEP\.?\s*\d+/i,           // EP. 1, EP 1, etc.
  /\bEpisode\s+\d+/i,         // Episode 1, Episode 2, etc.
  /\bPodcast\b/i,             // Contains "Podcast"
  /\bCheck-in\b/i,            // Check-in episodes
  /\bInterview\b/i,           // Interview episodes
  /\bConversation\b/i,        // Conversation episodes
  /\bWin The Night\s+EP/i,    // Win The Night EP format
];

const isPodcastEpisode = (title: string): boolean => {
  return PODCAST_PATTERNS.some(pattern => pattern.test(title));
};

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

export const useYouTubePodcast = (limit: number = 3) => {
  return useQuery({
    queryKey: ["youtube-podcast", limit],
    queryFn: async (): Promise<YouTubePodcastEpisode[]> => {
      try {
        console.log("Fetching YouTube podcast episodes...");
        const response = await fetchWithTimeout(RSS_API_URL);
        const data = await response.json();

        if (!data.items || data.items.length === 0) {
          console.log("No items found in YouTube feed");
          return [];
        }

        // Filter for podcast episodes and map to our format
        const podcastEpisodes: YouTubePodcastEpisode[] = data.items
          .filter((item: any) => {
            const title = item.title || "";
            // Exclude shorts
            if (item.link?.includes("/shorts/")) return false;
            // Include if matches podcast patterns
            return isPodcastEpisode(title);
          })
          .slice(0, limit)
          .map((item: any) => {
            // Extract video ID from link
            const linkMatch = item.link?.match(/watch\?v=([^&]+)/);
            const videoId = linkMatch ? linkMatch[1] : "";

            return {
              id: videoId,
              title: item.title || "Untitled Episode",
              description: item.description || "",
              thumbnail: item.thumbnail || `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
              pubDate: item.pubDate || new Date().toISOString(),
              link: item.link || `https://www.youtube.com/watch?v=${videoId}`,
            };
          })
          .filter((ep: YouTubePodcastEpisode) => ep.id); // Only keep episodes with valid IDs

        console.log(`Found ${podcastEpisodes.length} podcast episodes`);
        return podcastEpisodes;
      } catch (error) {
        console.error("Error fetching YouTube podcast:", error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: true,
    retry: 2,
    retryDelay: 1000,
  });
};
