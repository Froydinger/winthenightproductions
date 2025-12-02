import { useQuery } from "@tanstack/react-query";

const YOUTUBE_CHANNEL_ID = "UCuFlxR-Ol8zzda9Z6CJkwkA";
const RSS_API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
  `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`
)}`;

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
        const response = await fetchWithTimeout(RSS_API_URL, 5000);
        const data = await response.json();
        return data.items || [];
      } catch (error) {
        console.error("Error fetching YouTube feed:", error);
        return [];
      }
    },
    staleTime: 1 * 60 * 1000, // Cache for 1 minute
    refetchInterval: 1 * 60 * 1000, // Auto-refetch every 1 minute
    refetchOnWindowFocus: true, // Refetch when user returns to tab
    refetchOnMount: true, // Always refetch on component mount
    retry: 1,
    retryDelay: 1000,
  });
};

export const useYouTubeVideos = () => {
  const { data: items = [], isLoading } = useYouTubeFeed();

  const videoIds = items
    .filter((item: any) => {
      const link = item.link || "";
      const title = (item.title || "").toLowerCase();
      return !link.includes("/shorts/") && !title.includes("#shorts");
    })
    .slice(0, 2)
    .map((item: any) => {
      if (item.link) {
        const linkMatch = item.link.match(/watch\?v=([^&]+)/);
        if (linkMatch) return linkMatch[1];
      }
      if (item.guid) {
        const guidMatch = item.guid.match(/yt:video:(.*)/);
        if (guidMatch) return guidMatch[1];
      }
      return null;
    })
    .filter(Boolean);

  return { videoIds, isLoading };
};

export const useYouTubeShorts = () => {
  const { data: items = [], isLoading } = useYouTubeFeed();

  const shortIds = items
    .filter((item: any) => item.link && item.link.includes("/shorts/"))
    .slice(0, 50)
    .map((item: any) => {
      if (item.link && item.link.includes("/shorts/")) {
        const linkMatch = item.link.match(/shorts\/([^?]+)/);
        if (linkMatch) return linkMatch[1];
      }
      return null;
    })
    .filter(Boolean);

  return { shortIds, isLoading };
};
