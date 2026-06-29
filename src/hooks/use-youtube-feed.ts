import { useQuery } from "@tanstack/react-query";
import { fetchLatestPodcastVideos, type YouTubeVideo } from "@/lib/youtube-api";

const YOUTUBE_CHANNEL_ID = "UCuFlxR-Ol8zzda9Z6CJkwkA";
const RSS_API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
  `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`
)}&count=50`;

export type YouTubeFeedItem = {
  title?: string;
  link?: string;
  guid?: string;
  thumbnail?: string;
  pubDate?: string;
};

// Fetch with timeout to prevent hanging
const fetchWithTimeout = async (url: string, timeout = 5000) => {
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

export const useYouTubeFeed = () => {
  return useQuery({
    queryKey: ["youtube-feed"],
    queryFn: async () => {
      try {
        const response = await fetchWithTimeout(RSS_API_URL, 8000);
        const data = await response.json();
        console.log("YouTube feed fetched:", data.items?.length || 0, "items");
        return (data.items || []) as YouTubeFeedItem[];
      } catch (error) {
        console.error("Error fetching YouTube feed:", error);
        return [];
      }
    },
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
    refetchInterval: 2 * 60 * 1000, // Auto-refetch every 2 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 2,
    retryDelay: 1000,
  });
};

const getVideoId = (item: YouTubeFeedItem) => {
  if (item.link) {
    const linkMatch = item.link.match(/watch\?v=([^&]+)/);
    if (linkMatch) return linkMatch[1];
  }
  if (item.guid) {
    const guidMatch = item.guid.match(/yt:video:(.*)/);
    if (guidMatch) return guidMatch[1];
  }
  return null;
};

const isShort = (item: YouTubeFeedItem) => {
  const link = item.link || "";
  const title = (item.title || "").toLowerCase();
  return link.includes("/shorts/") || title.includes("#shorts") || title.includes("#short");
};

export const useYouTubeVideos = (limit = 6) => {
  const query = useQuery({
    queryKey: ["youtube-latest-long-form", limit],
    queryFn: () => fetchLatestPodcastVideos(limit),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
  });

  const videos = (query.data || []) as YouTubeVideo[];
  const videoIds = videos.map((video) => video.videoId);

  return { videos, videoIds, isLoading: query.isLoading };
};

export const useYouTubeShorts = () => {
  const { data: items = [], isLoading } = useYouTubeFeed();

  const shortIds = items
    .filter((item) => item.link && item.link.includes("/shorts/"))
    .slice(0, 50)
    .map((item) => {
      if (item.link && item.link.includes("/shorts/")) {
        const linkMatch = item.link.match(/shorts\/([^?]+)/);
        if (linkMatch) return linkMatch[1];
      }
      return null;
    })
    .filter(Boolean);

  return { shortIds, isLoading };
};
