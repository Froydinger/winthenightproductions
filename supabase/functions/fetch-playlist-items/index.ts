import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface PlaylistItem {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const playlistId = url.searchParams.get('playlistId');

    if (!playlistId) {
      return new Response(JSON.stringify({ error: 'playlistId is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const apiKey = Deno.env.get('VITE_YOUTUBE_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'YouTube API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const items: PlaylistItem[] = [];
    let nextPageToken: string | undefined;

    do {
      const params = new URLSearchParams({
        part: 'snippet',
        playlistId,
        maxResults: '50',
        key: apiKey,
      });
      if (nextPageToken) {
        params.set('pageToken', nextPageToken);
      }

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('YouTube API error:', errorText);
        return new Response(JSON.stringify({ error: 'Failed to fetch playlist items' }), {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const data = await response.json();

      for (const item of data.items || []) {
        const snippet = item.snippet;
        // Skip deleted/private videos
        if (snippet.title === 'Deleted video' || snippet.title === 'Private video') continue;

        const videoId = snippet.resourceId?.videoId;
        if (!videoId) continue;

        items.push({
          videoId,
          title: snippet.title,
          thumbnail:
            snippet.thumbnails?.maxres?.url ||
            snippet.thumbnails?.high?.url ||
            snippet.thumbnails?.medium?.url ||
            snippet.thumbnails?.default?.url ||
            '',
          publishedAt: snippet.publishedAt,
        });
      }

      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    return new Response(JSON.stringify({ items }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
