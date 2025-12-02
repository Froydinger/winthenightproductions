// YouTube RSS feed integration for fetching shorts
const CHANNEL_ID = '@winthenight'; // Your channel handle
const RSS_FEED_URL = `https://www.youtube.com/feeds/videos.xml?user=${CHANNEL_ID.replace('@', '')}`;

export interface YouTubeShort {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  publishedAt: string;
}

/**
 * Parse YouTube RSS feed XML
 */
async function parseRSSFeed(): Promise<YouTubeShort[]> {
  try {
    const response = await fetch(RSS_FEED_URL);
    if (!response.ok) throw new Error('Failed to fetch RSS feed');

    const xmlText = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, 'text/xml');

    const entries = xml.querySelectorAll('entry');
    const videos: YouTubeShort[] = [];

    entries.forEach((entry) => {
      const id = entry.querySelector('videoId')?.textContent || '';
      const title = entry.querySelector('title')?.textContent || '';
      const published = entry.querySelector('published')?.textContent || '';
      const thumbnail = entry.querySelector('thumbnail')?.getAttribute('url') ||
                       `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

      if (id) {
        videos.push({
          id,
          title,
          thumbnail,
          url: `https://www.youtube.com/shorts/${id}`,
          publishedAt: published,
        });
      }
    });

    return videos;
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    return [];
  }
}

/**
 * Fetch recent shorts from RSS feed
 * Note: RSS doesn't distinguish shorts from regular videos,
 * so this returns recent videos formatted as /shorts URLs
 * @param maxResults Number of videos to fetch (default: 6)
 */
export async function fetchRecentShorts(maxResults: number = 6): Promise<YouTubeShort[]> {
  try {
    const videos = await parseRSSFeed();
    // Return the most recent videos (assuming they're shorts)
    return videos.slice(0, maxResults);
  } catch (error) {
    console.error('Error fetching YouTube shorts:', error);
    return [];
  }
}

/**
 * Fallback: Show button to YouTube shorts page if RSS fails
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
