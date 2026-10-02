export const PODCAST_PLAYLIST_ID = 'PL4DJfmhGyz_7MiglVq4jbJYhftobxRuFf';
export type Episode = { videoId: string; title: string; description: string; thumbnail: string; publishedAt: string; videoPublishedAt: string; url: string };
type Item = { snippet?: { title?: string; description?: string; publishedAt?: string; resourceId?: { videoId?: string }; thumbnails?: Record<string, { url?: string }> }; contentDetails?: { videoPublishedAt?: string } };
const cache = new Map<string, { expires: number; items: Episode[] }>();

export async function fetchPlaylist(playlistId: string, fetcher: typeof fetch = fetch, apiKey = process.env.YOUTUBE_API_KEY, now = Date.now()) {
  if (!/^[A-Za-z0-9_-]{10,100}$/.test(playlistId)) throw new Error('Invalid playlist');
  if (!apiKey) throw new Error('YouTube unavailable');
  const hit = cache.get(playlistId);
  if (fetcher === fetch && hit && hit.expires > now) return hit.items;
  const items: Episode[] = [];
  let token = '';
  const deadline = AbortSignal.timeout(7000);
  // 1,000 entries maximum, within one shared deadline; never follow arbitrary URLs.
  for (let page = 0; page < 20; page++) {
    const params = new URLSearchParams({ part: 'snippet,contentDetails', playlistId, maxResults: '50', key: apiKey });
    if (token) params.set('pageToken', token);
    const response = await fetcher(`https://www.googleapis.com/youtube/v3/playlistItems?${params}`, { signal: deadline });
    if (!response.ok) throw new Error('YouTube unavailable');
    const data = await response.json();
    for (const item of (data.items || []) as Item[]) {
      const s = item.snippet;
      const videoId = s?.resourceId?.videoId;
      if (!s || !videoId || !/^[\w-]{11}$/.test(videoId) || ['Private video', 'Deleted video'].includes(s.title || '')) continue;
      items.push({ videoId, title: s.title || 'Untitled video', description: s.description || '',
        thumbnail: s.thumbnails?.maxres?.url || s.thumbnails?.high?.url || s.thumbnails?.medium?.url || s.thumbnails?.default?.url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        publishedAt: s.publishedAt || '', videoPublishedAt: item.contentDetails?.videoPublishedAt || '', url: `https://www.youtube.com/watch?v=${videoId}` });
    }
    token = typeof data.nextPageToken === 'string' ? data.nextPageToken : '';
    if (!token) break;
    if (page === 19) throw new Error('Playlist exceeds retrieval limit');
  }
  if (fetcher === fetch) {
    if (cache.size >= 30) cache.delete(cache.keys().next().value!);
    cache.set(playlistId, { expires: now + 60_000, items });
  }
  return items;
}
