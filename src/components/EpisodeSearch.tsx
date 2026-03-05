import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Play, Loader2 } from "lucide-react";
import { useAllPlaylistItems } from "@/hooks/use-all-playlist-items";

const EpisodeSearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { allItems, isLoading } = useAllPlaylistItems();

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

  const handleSelect = (result: { chapterId: string; videoId: string }) => {
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
