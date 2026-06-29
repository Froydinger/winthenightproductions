import { useQuery } from "@tanstack/react-query";
import { fetchYouTubePlaylistItems } from "@/lib/youtube-api";

export interface PlaylistItem {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

async function fetchPlaylistItems(playlistId: string): Promise<PlaylistItem[]> {
  try {
    const response = await fetch(
      `/.netlify/functions/fetch-playlist-items?playlistId=${encodeURIComponent(playlistId)}`
    );

    if (response.ok) {
      const data = await response.json();
      return data.items;
    }
  } catch {
    // Plain Vite local dev does not serve Netlify functions.
  }

  return fetchYouTubePlaylistItems(playlistId);
}

export function usePlaylistItems(playlistId: string | undefined) {
  return useQuery({
    queryKey: ["playlist-items", playlistId],
    queryFn: () => fetchPlaylistItems(playlistId!),
    enabled: !!playlistId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000,
  });
}
