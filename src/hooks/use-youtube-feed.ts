import { useQuery } from "@tanstack/react-query";

const YOUTUBE_CHANNEL_ID = "UCuFlxR-Ol8zzda9Z6CJkwkA";
const LATEST_SEASON_PLAYLIST_ID = "PL4DJfmhGyz_7B1Qw7Y7GP1vhgtRTi48LD"; // Chapter 7

// Add count parameter to get more videos and cache busting
const getRSSApiUrl = () => {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
  const cacheBuster = `&_=${Date.now()}`;
  return `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=50${cacheBuster}`;
};

// Fetch with timeout to prevent hanging
const fetchWithTimeout = async (url: string, timeout = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { 
      signal: controller.signal,
      cache: 'no-store', // Force fresh data
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export const useYouTubeFeed = () => {
  return useQuery({
    queryKey: ["youtube-feed", Date.now()], // Force new query each time
    queryFn: async () => {
      try {
        const url = getRSSApiUrl();
        const response = await fetchWithTimeout(url, 8000);
        const data = await response.json();
        console.log("YouTube feed fetched:", data.items?.length || 0, "items");
        return data.items || [];
      } catch (error) {
        console.error("Error fetching YouTube feed:", error);
        return [];
      }
    },
    staleTime: 0, // Always consider stale
    gcTime: 0, // Don't cache in memory
    refetchInterval: 30 * 1000, // Auto-refetch every 30 seconds
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 2,
    retryDelay: 1000,
  });
};

export const useYouTubeVideos = () => {
  const { data: items = [], isLoading, error } = useYouTubeFeed();

  console.log('useYouTubeVideos - Items:', items.length, 'Loading:', isLoading, 'Error:', error);

  const videoIds = items
    .filter((item: any) => {
      const link = item.link || "";
      const title = (item.title || "").toLowerCase();
      const isShort = link.includes("/shorts/") || title.includes("#shorts");
      return !isShort;
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

  console.log('useYouTubeVideos - Video IDs:', videoIds);

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

// Hook to get the latest video from the Chapter 7 playlist
export const useLatestPlaylistVideo = () => {
  return useQuery({
    queryKey: ["latest-playlist-video"],
    queryFn: async () => {
      try {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${LATEST_SEASON_PLAYLIST_ID}`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=1`;

        console.log('Fetching latest playlist video from:', apiUrl);

        const response = await fetchWithTimeout(apiUrl, 8000);
        const data = await response.json();

        console.log('Playlist feed response:', data);

        if (!data.items || data.items.length === 0) {
          console.error('No items in playlist feed');
          return null;
        }

        const firstItem = data.items[0];
        let videoId = null;

        // Try to extract video ID from link
        if (firstItem.link) {
          const linkMatch = firstItem.link.match(/watch\?v=([^&]+)/);
          if (linkMatch) {
            videoId = linkMatch[1];
          }
        }

        // Try to extract from guid
        if (!videoId && firstItem.guid) {
          const guidMatch = firstItem.guid.match(/yt:video:(.*)/);
          if (guidMatch) {
            videoId = guidMatch[1];
          }
        }

        console.log('Extracted video ID:', videoId);
        return videoId;
      } catch (error) {
        console.error("Error fetching latest playlist video:", error);
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 3,
    retryDelay: 2000,
  });
};
