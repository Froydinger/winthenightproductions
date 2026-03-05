import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Play, Loader2 } from "lucide-react";
import { usePlaylistItems, type PlaylistItem } from "@/hooks/use-playlist-items";

interface PlaylistMeta {
  id: string;
  name: string;
  playlistId: string;
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

interface SearchResult extends PlaylistItem {
  chapterId: string;
  chapterName: string;
}

const EpisodeSearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch all playlists
  const playlistQueries = playlists.map(p => usePlaylistItems(p.playlistId));

  const isLoading = playlistQueries.some(q => q.isLoading);

  // Combine all items with chapter metadata
  const allItems: SearchResult[] = useMemo(() => {
    const items: SearchResult[] = [];
    playlists.forEach((p, i) => {
      const data = playlistQueries[i].data;
      if (data) {
        data.forEach(item => {
          items.push({
            ...item,
            chapterId: p.id,
            chapterName: p.name,
          });
        });
      }
    });
    return items;
  }, [playlistQueries.map(q => q.data)]);

  // Filter results
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allItems
      .filter(item => item.title.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, allItems]);

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (result: SearchResult) => {
    setQuery("");
    setIsOpen(false);
    navigate(`/watch/${result.chapterId}?v=${result.videoId}`);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <div
        className={`relative flex items-center rounded-xl border transition-all duration-300 bg-card/80 backdrop-blur-sm ${
          isFocused
            ? "border-primary shadow-[0_0_20px_hsl(var(--primary)/0.2)]"
            : "border-border/50 hover:border-primary/40"
        }`}
      >
        <Search className="absolute left-4 w-5 h-5 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search episodes across all chapters..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            setIsFocused(true);
            if (query.trim()) setIsOpen(true);
          }}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent pl-12 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-3 p-1 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {isOpen && query.trim() && (
        <div className="absolute z-50 top-full mt-2 w-full rounded-xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading episodes...
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground text-sm">
              No episodes found for "{query}"
            </div>
          ) : (
            <div className="max-h-[400px] overflow-y-auto">
              {results.map((result) => (
                <button
                  key={`${result.chapterId}-${result.videoId}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(result)}
                  className="w-full flex items-start gap-3 px-4 py-3 hover:bg-primary/10 transition-colors text-left border-b border-border/20 last:border-b-0"
                >
                  <div className="relative flex-shrink-0 w-24 aspect-video rounded-md overflow-hidden bg-muted/30">
                    <img
                      src={result.thumbnail}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
                      {result.title}
                    </p>
                    <p className="text-xs text-primary mt-1 font-semibold">
                      {result.chapterName}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EpisodeSearch;
