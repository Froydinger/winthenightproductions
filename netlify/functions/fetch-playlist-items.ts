import type { Handler } from "@netlify/functions";

type YouTubePlaylistItem = {
  snippet?: {
    title?: string;
    publishedAt?: string;
    resourceId?: { videoId?: string };
    thumbnails?: Record<string, { url?: string }>;
  };
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  const playlistId = event.queryStringParameters?.playlistId;
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!playlistId) {
    return {
      statusCode: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "playlistId is required" }),
    };
  }

  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "YOUTUBE_API_KEY is not configured" }),
    };
  }

  try {
    const items = [];
    let nextPageToken: string | undefined;

    do {
      const params = new URLSearchParams({
        part: "snippet",
        playlistId,
        maxResults: "50",
        key: apiKey,
      });
      if (nextPageToken) params.set("pageToken", nextPageToken);

      const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?${params}`);
      if (!response.ok) {
        return {
          statusCode: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          body: JSON.stringify({ error: "Failed to fetch playlist items" }),
        };
      }

      const data = await response.json();
      for (const item of (data.items || []) as YouTubePlaylistItem[]) {
        const snippet = item.snippet;
        if (!snippet || snippet.title === "Deleted video" || snippet.title === "Private video") continue;

        const videoId = snippet.resourceId?.videoId;
        if (!videoId) continue;

        items.push({
          videoId,
          title: snippet.title || "Untitled video",
          thumbnail:
            snippet.thumbnails?.maxres?.url ||
            snippet.thumbnails?.high?.url ||
            snippet.thumbnails?.medium?.url ||
            snippet.thumbnails?.default?.url ||
            `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          publishedAt: snippet.publishedAt || "",
        });
      }

      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    };
  } catch {
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
