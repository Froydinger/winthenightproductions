import snapshot from './public-site-context.json' with { type: 'json' };
import { fetchPlaylist, PODCAST_PLAYLIST_ID, type Episode } from './youtube.ts';
import { readSubstackPosts } from '../functions/fetch-substack.ts';
import type { SiteSettings } from '../../src/lib/site-settings.ts';

export const resourceLink = '[WTN care and crisis resources](/crisis-resources)';
export function publicPath(value: unknown) {
  if (typeof value !== 'string' || value.length > 1000 || !value.startsWith('/') || value.startsWith('//') || /[?#\\]/.test(value)) return null;
  if (snapshot.pages.some(p => p.path === value && p.path !== 'shared')) return value;
  if (/^\/watch\/(chapter-[1-9]|specials)$/.test(value)) return '/watch/:chapterId';
  if (/^\/blog\/[^/]+$/.test(value)) return '/blog/:postId';
  return null;
}

export function rankEpisodes(items: Episode[], query: string) {
  const tokens = [...new Set(query.toLowerCase().match(/[a-z0-9]+/g) || [])].filter(t => t.length > 2 && !['the', 'what', 'episode', 'episodes', 'about', 'with', 'can', 'where', 'watch', 'does', 'this', 'that'].includes(t));
  const episodeNumber = query.match(/\b(?:ep\.?|episode)\s*(\d+)\b/i)?.[1];
  return items.map((item, index) => {
    const title = item.title.toLowerCase();
    const description = item.description.toLowerCase();
    const exact = episodeNumber && new RegExp(`\\b(?:ep\\.?|episode)\\s*${episodeNumber}\\b`, 'i').test(title);
    return { item, index, score: (exact ? 1000 : 0) + tokens.reduce((sum, token) => sum + (title.includes(token) ? 10 : description.includes(token) ? 1 : 0), 0) };
  }).sort((a, b) => b.score - a.score || a.index - b.index).slice(0, 8).map(v => v.item);
}

export function needsResources(query: string) {
  return /\b(crisis|suicid\w*|self[- ]?harm|kill myself|end my life|hurt myself|unsafe|hotline|helpline|therapy|therapist|resources?|warmline|support group|mental health help)\b/i.test(query);
}
export function urgentRisk(query: string) {
  return /\b(suicid\w*|kill myself|end my life|hurt myself|self[- ]?harm|immediate danger)\b/i.test(query);
}
export function safetyFallback(query: string) {
  const urgent = urgentRisk(query) ? 'If you may act on harming yourself or someone is in immediate physical danger, contact local emergency services now. In the US, call or text [988](https://988lifeline.org/) for immediate human support; outside the US, use [Find A Helpline](https://findahelpline.com/). ' : '';
  return `${urgent}Arc cannot generate a reply right now. You can still open ${resourceLink} for crisis contacts, peer support, and ways to find care. WTN is not an emergency or clinical service.`;
}

function plainText(html: string) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
}
function publicFeedLink(link: string) {
  try { const u = new URL(link); return u.protocol === 'https:' && ['winthenight.substack.com', 'winthenight.blog', 'www.winthenight.blog'].includes(u.hostname); } catch { return false; }
}

export async function buildAnswerContext(pagePath: unknown, query: string, settings: SiteSettings & { arcSettingsSource?: 'live' | 'defaults' }, loaders = { playlist: fetchPlaylist, blog: readSubstackPosts }) {
  const path = publicPath(pagePath);
  const chapter = typeof pagePath === 'string' && path === '/watch/:chapterId' ? pagePath.split('/').pop() : query.match(/\bchapter\s*([1-9])\b/i) ? `chapter-${query.match(/\bchapter\s*([1-9])\b/i)![1]}` : null;
  const watch = snapshot.pages.find(p => p.path === '/watch');
  const chapterPlaylist = chapter ? Object.values(watch?.data || {}).flat().find(entry => entry.id === chapter)?.playlistId : undefined;
  const playlistIds = [...new Set([PODCAST_PLAYLIST_ID, ...(chapterPlaylist ? [chapterPlaylist] : [])])];
  const [catalogues, blog] = await Promise.all([
    Promise.allSettled(playlistIds.map(id => loaders.playlist(id))), loaders.blog().catch(() => null),
  ]);
  const items = [...new Map(catalogues.flatMap(result => result.status === 'fulfilled' ? result.value : []).map(item => [item.videoId, item])).values()];
  const posts = blog?.filter(p => !p.isPodcast && publicFeedLink(p.link)) || [];
  let selectedPost;
  if (path === '/blog/:postId' && typeof pagePath === 'string') {
    try { const id = decodeURIComponent(pagePath.slice('/blog/'.length)); selectedPost = posts.find(p => p.guid === id); } catch { /* Malformed public route, no post. */ }
  }
  const relevantPosts = selectedPost ? [selectedPost] : posts.filter(p => query.toLowerCase().split(/\s+/).some(word => word.length > 3 && p.title.toLowerCase().includes(word))).slice(0, 3);
  // Only values already rendered publicly. Exclude custom instructions and unknown stored fields.
  const publicSettings = Object.fromEntries(Object.entries(settings).filter(([key]) => key in settings && key !== 'chatbot_system_prompt' && PUBLIC_SETTING_KEYS.has(key)));
  return {
    version: snapshot.version, currentPage: path ? { path: pagePath, authoredContent: snapshot.pages.find(p => p.path === path), post: selectedPost ? { title: selectedPost.title, url: selectedPost.link, content: plainText(selectedPost.content), pubDate: selectedPost.pubDate } : null } : null,
    sitePages: snapshot.pages, publicSettings, settingsSource: settings.arcSettingsSource || 'defaults',
    episodes: { status: catalogues[0].status === 'fulfilled' ? 'available' : 'unavailable', chapterStatus: chapter ? catalogues[1]?.status === 'fulfilled' ? 'available' : 'unavailable' : null,
      checkedAt: new Date().toISOString(), freshness: 'API catalogue cached for at most 60 seconds; descriptions are not transcripts.',
      catalogue: items.map(({ videoId, title, url, videoPublishedAt }) => ({ videoId, title, url, videoPublishedAt })),
      matchedDescriptions: rankEpisodes(items, query).map(e => ({ title: e.title, url: e.url, description: e.description, videoPublishedAt: e.videoPublishedAt })) },
    blog: { status: blog ? 'available' : 'unavailable', catalogue: posts.map(p => ({ title: p.title, url: p.link, pubDate: p.pubDate })), matchedPosts: relevantPosts.map(p => ({ title: p.title, url: p.link, content: plainText(p.content), pubDate: p.pubDate })) },
    podcastFeed: blog?.filter(p => p.isPodcast && publicFeedLink(p.link)).map(p => ({ title: p.title, url: p.link, pubDate: p.pubDate })) || [],
  };
}
const PUBLIC_SETTING_KEYS = new Set(['trailer_visible', 'trailer_button_text', 'trailer_video_id', 'main_playlist_id', 'editors_pick_video_id', 'watch_latest_playlist_id', 'watch_latest_button_text', 'watch_latest_button_link', 'cta_featured_video_id', 'about_intro_video_id', 'about_featured_video_id', 'about_featured_title', 'about_featured_description', 'about_jake_bio', 'about_josh_bio', 'watch_latest_auto', 'watch_latest_override_id', 'event_cta_enabled', 'event_cta_pill_text', 'event_cta_pill_text_short', 'event_cta_title', 'event_cta_details', 'event_cta_location', 'event_cta_start', 'event_cta_end', 'event_cta_url', 'event_cta_button_text']);
