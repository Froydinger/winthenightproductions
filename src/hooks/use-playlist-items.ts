import { useQuery } from "@tanstack/react-query";

export interface PlaylistItem {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

async function fetchPlaylistItems(playlistId: string): Promise<PlaylistItem[]> {
  const response = await fetch(
    `/.netlify/functions/fetch-playlist-items?playlistId=${encodeURIComponent(playlistId)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch playlist items");
  }

  const data = await response.json();
  return data.items;
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
