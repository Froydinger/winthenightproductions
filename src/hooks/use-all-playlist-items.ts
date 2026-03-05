import { useQueries } from "@tanstack/react-query";

interface PlaylistMeta {
  id: string;
  name: string;
  playlistId: string;
}

export interface SearchableItem {
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  chapterId: string;
  chapterName: string;
}

const playlists: PlaylistMeta[] = [
  { id: "chapter-8", name: "Chapter 8", playlistId: "PL4DJfmhGyz_5hmXN0HXLxZkktMB1i0eCS" },
  { id: "chapter-7", name: "Chapter 7", playlistId: "PL4DJfmhGyz_7B1Qw7Y7GP1vhgtRTi48LD" },
  { id: "chapter-6", name: "Chapter 6", playlistId: "PL4DJfmhGyz_6GzYrVpTZjqLxya2-BTR9O" },
  { id: "chapter-5", name: "Chapter 5", playlistId: "PL4DJfmhGyz_5Yz3vdT4bpJYuuf9X8NpiS" },
  { id: "chapter-4", name: "Chapter 4", playlistId: "PL4DJfmhGyz_5qzx4nt4NjuHd3P5R-zEaw" },
  { id: "chapter-3", name: "Chapter 3", playlistId: "PL4DJfmhGyz_4kp9L0keEVTziGX6dLCMVS" },
  { id: "chapter-2", name: "Chapter 2", playlistId: "PL4DJfmhGyz_5PVexZjnazTh1huwtGb5XX" },
  { id: "chapter-1", name: "Chapter 1", playlistId: "PL4DJfmhGyz_4Te-D3I9Vgn9N5HgaxKxyl" },
  { id: "specials", name: "Shorts & Specials", playlistId: "PL4DJfmhGyz_7OsMomWuLGe1XSXUYPuBUB" },
];

async function fetchPlaylistItems(playlistId: string) {
  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/fetch-playlist-items?playlistId=${encodeURIComponent(playlistId)}`,
    {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch playlist items");
  const data = await response.json();
  return data.items as { videoId: string; title: string; thumbnail: string; publishedAt: string }[];
}

export function useAllPlaylistItems() {
  const queries = useQueries({
    queries: playlists.map((p) => ({
      queryKey: ["playlist-items", p.playlistId],
      queryFn: () => fetchPlaylistItems(p.playlistId),
      staleTime: 10 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);

  const allItems: SearchableItem[] = [];
  playlists.forEach((p, i) => {
    const data = queries[i].data;
    if (data) {
      data.forEach((item) => {
        allItems.push({ ...item, chapterId: p.id, chapterName: p.name });
      });
    }
  });

  return { allItems, isLoading };
}
