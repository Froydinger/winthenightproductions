export type YouTubeVideo = {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  durationSeconds?: number;
};

const CHANNEL_ID = "UCuFlxR-Ol8zzda9Z6CJkwkA";
export const PODCAST_PLAYLIST_ID = "PL4DJfmhGyz_7MiglVq4jbJYhftobxRuFf";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || "AIzaSyDRMJ1Ztq_pZMA8sW2cOJT-Et6ytLWVjyY";
const YOUTUBE_API = "https://www.googleapis.com/youtube/v3";

type YouTubeSearchItem = {
  id?: { videoId?: string };
};

type YouTubeVideoItem = {
  id?: string;
  snippet?: {
    title?: string;
    publishedAt?: string;
    thumbnails?: Record<string, { url?: string }>;
  };
  contentDetails?: {
    duration?: string;
  };
};

type YouTubePlaylistItem = {
  snippet?: {
    title?: string;
    publishedAt?: string;
    resourceId?: { videoId?: string };
    thumbnails?: Record<string, { url?: string }>;
  };
};

function bestThumbnail(thumbnails?: Record<string, { url?: string }>, videoId?: string) {
  return (
    thumbnails?.maxres?.url ||
    thumbnails?.standard?.url ||
    thumbnails?.high?.url ||
    thumbnails?.medium?.url ||
    thumbnails?.default?.url ||
    (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : "")
  );
}

function parseIsoDuration(duration = "PT0S") {
  const match = duration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return 0;
  const [, hours = "0", minutes = "0", seconds = "0"] = match;
  return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
}

function isShortLike(video: YouTubeVideo) {
  const title = video.title.toLowerCase();
  return title.includes("#short") || title.includes(" short ") || title.includes("short film") || (video.durationSeconds ?? 0) < 180;
}

async function youtubeFetch(path: string, params: Record<string, string>) {
  const url = new URL(`${YOUTUBE_API}/${path}`);
  url.search = new URLSearchParams({ ...params, key: API_KEY }).toString();
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`YouTube API failed: ${response.status}`);
  }
  return response.json();
}

async function fetchVideoDetails(videoIds: string[]) {
  if (videoIds.length === 0) return [];
  const data = await youtubeFetch("videos", {
    part: "snippet,contentDetails",
    id: videoIds.join(","),
    maxResults: "50",
  });

  return ((data.items || []) as YouTubeVideoItem[])
    .map((item) => {
      const videoId = item.id;
      if (!videoId || !item.snippet) return null;
      return {
        videoId,
        title: item.snippet.title || "Win The Night",
        thumbnail: bestThumbnail(item.snippet.thumbnails, videoId),
        publishedAt: item.snippet.publishedAt || "",
        durationSeconds: parseIsoDuration(item.contentDetails?.duration),
      };
    })
    .filter((item): item is YouTubeVideo => Boolean(item));
}

export async function fetchLatestLongFormVideos(limit = 3) {
  const searchData = await youtubeFetch("search", {
    part: "id",
    channelId: CHANNEL_ID,
    order: "date",
    type: "video",
    maxResults: "25",
  });
  const ids = ((searchData.items || []) as YouTubeSearchItem[])
    .map((item) => item.id?.videoId)
    .filter((id): id is string => Boolean(id));

  const videos = await fetchVideoDetails(ids);
  return videos.filter((video) => !isShortLike(video)).slice(0, limit);
}

export async function fetchLatestPodcastVideos(limit = 3) {
  const videos = await fetchYouTubePlaylistItems(PODCAST_PLAYLIST_ID);
  return videos.slice(0, limit);
}

export async function fetchYouTubePlaylistItems(playlistId: string) {
  const items: YouTubeVideo[] = [];
  let pageToken = "";

  do {
    const data = await youtubeFetch("playlistItems", {
      part: "snippet",
      playlistId,
      maxResults: "50",
      ...(pageToken ? { pageToken } : {}),
    });

    for (const item of (data.items || []) as YouTubePlaylistItem[]) {
      const snippet = item.snippet;
      const videoId = snippet?.resourceId?.videoId;
      if (!snippet || !videoId || snippet.title === "Deleted video" || snippet.title === "Private video") continue;
      items.push({
        videoId,
        title: snippet.title || "Untitled video",
        thumbnail: bestThumbnail(snippet.thumbnails, videoId),
        publishedAt: snippet.publishedAt || "",
      });
    }

    pageToken = data.nextPageToken || "";
  } while (pageToken);

  return items;
}
