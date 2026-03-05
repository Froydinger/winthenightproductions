import { useState, useRef, useEffect, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ExternalLink, Play, X } from "lucide-react";
import { usePlaylistItems, type PlaylistItem } from "@/hooks/use-playlist-items";
import { Skeleton } from "@/components/ui/skeleton";

export const SHORTS_PLAYLIST_ID = "PL4DJfmhGyz_5Fa4iQSpQuOTSH4XXCFL1J";

interface ShortsPlayerProps {
  shorts: PlaylistItem[];
  selectedIndex: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

/** TikTok-style vertical shorts player — glassy UI, YouTube controls enabled */
export const ShortsPlayer = ({ shorts, selectedIndex, onClose, onChangeIndex }: ShortsPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchDeltaY = useRef(0);
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const accumulatedDelta = useRef(0);
  const isTransitioning = useRef(false);

  const goNext = useCallback(() => {
    if (selectedIndex < shorts.length - 1 && !isTransitioning.current) {
      isTransitioning.current = true;
      onChangeIndex(selectedIndex + 1);
      setTimeout(() => { isTransitioning.current = false; }, 400);
    }
  }, [selectedIndex, shorts.length, onChangeIndex]);

  const goPrev = useCallback(() => {
    if (selectedIndex > 0 && !isTransitioning.current) {
      isTransitioning.current = true;
      onChangeIndex(selectedIndex - 1);
      setTimeout(() => { isTransitioning.current = false; }, 400);
    }
  }, [selectedIndex, onChangeIndex]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchDeltaY.current = 0;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchDeltaY.current = touchStartY.current - e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback(() => {
    const threshold = 50;
    if (touchDeltaY.current > threshold) goNext();
    else if (touchDeltaY.current < -threshold) goPrev();
    touchDeltaY.current = 0;
  }, [goNext, goPrev]);

  // Wheel handler for the container (catches scrolls on non-iframe areas)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let scrollTimer: ReturnType<typeof setTimeout>;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      accumulatedDelta.current += e.deltaY;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (accumulatedDelta.current > 20) goNext();
        else if (accumulatedDelta.current < -20) goPrev();
        accumulatedDelta.current = 0;
      }, 80);
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => {
      el.removeEventListener("wheel", handler);
      clearTimeout(scrollTimer);
    };
  }, [goNext, goPrev]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") goNext();
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, onClose]);

  const current = shorts[selectedIndex];

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col h-full"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Glassy top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 backdrop-blur-xl border-b border-white/10 shrink-0">
        <p className="text-xs sm:text-sm text-white/90 font-medium truncate flex-1 mr-2">
          {current.title}
        </p>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-white/60 hover:text-white hover:bg-white/10" asChild>
            <a
              href={`https://www.youtube.com/shorts/${current.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in YouTube"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-white/60 hover:text-white hover:bg-white/10" onClick={onClose}>
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Video area — no overlay so YouTube like/share/controls are accessible */}
      <div className="relative flex-1 bg-black min-h-0">
        <iframe
          key={current.videoId}
          src={`https://www.youtube.com/embed/${current.videoId}?autoplay=1&rel=0&modestbranding=1`}
          className="absolute inset-0 w-full h-full"
          title={current.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        {/* Vertical nav arrows — right side */}
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
          {selectedIndex > 0 && (
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all"
              aria-label="Previous short"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          )}
          {selectedIndex < shorts.length - 1 && (
            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all"
              aria-label="Next short"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Mobile swipe hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 md:hidden pointer-events-none">
          <div className="flex flex-col items-center gap-0.5 animate-bounce">
            <ChevronUp className="w-4 h-4 text-white/50" />
            <span className="text-[10px] text-white/40 font-medium">Swipe</span>
          </div>
        </div>
      </div>

      {/* Glassy bottom bar */}
      <div className="px-4 py-2.5 bg-black/40 backdrop-blur-xl border-t border-white/10 shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/50">
            {selectedIndex + 1} / {shorts.length}
          </span>
          <span className="text-[10px] text-white/40 hidden sm:block">
            Use arrows or swipe to browse
          </span>
        </div>
        <div className="mt-1.5 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${((selectedIndex + 1) / shorts.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

/** Thumbnail card used in both carousel and grid layouts */
const ShortThumbnail = ({ short, onClick }: { short: PlaylistItem; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full"
  >
    <img
      src={short.thumbnail}
      alt={short.title}
      className="absolute inset-0 w-full h-full object-cover"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-11 h-11 rounded-full bg-red-600/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600 transition-all shadow-lg">
        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-2.5">
      <p className="text-[11px] sm:text-xs text-white font-medium line-clamp-2 drop-shadow-lg leading-tight">
        {short.title}
      </p>
    </div>
  </button>
);

const ShortsCarousel = () => {
  const { data: shorts, isLoading } = usePlaylistItems(SHORTS_PLAYLIST_ID);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [shorts]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("[data-short-card]")?.clientWidth ?? 200;
    const gap = 16;
    const distance = (cardWidth + gap) * 2;
    el.scrollBy({ left: dir === "left" ? -distance : distance, behavior: "smooth" });
  };

  return (
    <div>
      <div className="relative group/carousel">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-primary/20 hover:border-primary/50 transition-all shadow-lg -ml-3 md:-ml-4 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-primary/20 hover:border-primary/50 transition-all shadow-lg -mr-3 md:-mr-4 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        )}

        <div
          ref={scrollRef}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} data-short-card className="flex-none w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] snap-start">
                  <Skeleton className="aspect-[9/16] w-full rounded-xl" />
                </div>
              ))
            : shorts?.map((short, idx) => (
                <div key={short.videoId} data-short-card className="flex-none w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] snap-start">
                  <ShortThumbnail short={short} onClick={() => setSelectedIndex(idx)} />
                </div>
              ))}
        </div>
      </div>

      {/* Glassy player dialog */}
      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent className="max-w-sm sm:max-w-[380px] p-0 gap-0 bg-black/80 backdrop-blur-2xl border border-white/10 overflow-hidden [&>button]:hidden h-[85vh] max-h-[700px] flex flex-col rounded-2xl shadow-2xl shadow-black/60">
          {selectedIndex !== null && shorts && (
            <ShortsPlayer
              shorts={shorts}
              selectedIndex={selectedIndex}
              onClose={() => setSelectedIndex(null)}
              onChangeIndex={setSelectedIndex}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShortsCarousel;
