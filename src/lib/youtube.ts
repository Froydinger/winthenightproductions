// YouTube Data API v3 integration for fetching shorts
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || 'AIzaSyDummy'; // You'll need to set this
const CHANNEL_ID = 'UCyourChannelId'; // Replace with actual channel ID
const API_BASE = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeShort {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  publishedAt: string;
}

/**
 * Fetch recent shorts from the Win The Night channel
 * @param maxResults Number of shorts to fetch (default: 6)
 */
export async function fetchRecentShorts(maxResults: number = 6): Promise<YouTubeShort[]> {
  try {
    // Step 1: Get recent uploads from the channel
    const searchUrl = `${API_BASE}/search?` + new URLSearchParams({
      part: 'snippet',
      channelId: CHANNEL_ID,
      maxResults: String(maxResults * 3), // Fetch more to filter for shorts
      order: 'date',
      type: 'video',
      key: YOUTUBE_API_KEY,
    });

    const searchResponse = await fetch(searchUrl);
    if (!searchResponse.ok) {
      throw new Error('Failed to fetch videos');
    }

    const searchData = await searchResponse.json();
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

    // Step 2: Get video details to check duration
    const videosUrl = `${API_BASE}/videos?` + new URLSearchParams({
      part: 'contentDetails,snippet',
      id: videoIds,
      key: YOUTUBE_API_KEY,
    });

    const videosResponse = await fetch(videosUrl);
    if (!videosResponse.ok) {
      throw new Error('Failed to fetch video details');
    }

    const videosData = await videosResponse.json();

    // Step 3: Filter for shorts (videos under 61 seconds)
    const shorts: YouTubeShort[] = videosData.items
      .filter((video: any) => {
        const duration = video.contentDetails.duration;
        // Parse ISO 8601 duration (e.g., "PT45S" = 45 seconds)
        const match = duration.match(/PT(?:(\d+)M)?(\d+)S/);
        if (!match) return false;
        const minutes = parseInt(match[1] || '0');
        const seconds = parseInt(match[2] || '0');
        const totalSeconds = minutes * 60 + seconds;
        return totalSeconds <= 60; // Shorts are 60 seconds or less
      })
      .slice(0, maxResults)
      .map((video: any) => ({
        id: video.id,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium.url,
        url: `https://www.youtube.com/shorts/${video.id}`,
        publishedAt: video.snippet.publishedAt,
      }));

    return shorts;
  } catch (error) {
    console.error('Error fetching YouTube shorts:', error);
    // Return empty array on error - component will handle gracefully
    return [];
  }
}

/**
 * Fallback: Hardcoded shorts if API fails or no API key
 */
export function getFallbackShorts(): YouTubeShort[] {
  return [
    {
      id: 'fallback1',
      title: 'Watch our latest shorts',
      thumbnail: 'https://i.ytimg.com/vi/placeholder/hqdefault.jpg',
      url: 'https://www.youtube.com/@winthenight/shorts',
      publishedAt: new Date().toISOString(),
    },
  ];
}
