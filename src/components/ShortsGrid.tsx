import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play } from "lucide-react";
import { usePlaylistItems } from "@/hooks/use-playlist-items";
import { Skeleton } from "@/components/ui/skeleton";
import { SHORTS_PLAYLIST_ID, ShortsPlayer } from "@/components/ShortsCarousel";

/** 2x2 grid of shorts with a "View All" button — used on the Watch hub page */
const ShortsGrid = () => {
  const { data: shorts, isLoading } = usePlaylistItems(SHORTS_PLAYLIST_ID);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const first4 = shorts?.slice(0, 4) ?? [];

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-8 w-1 bg-red-500 rounded-full" />
        <h2 className="text-2xl md:text-3xl font-bold text-foreground m-0">Shorts</h2>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[9/16] w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {first4.map((short, idx) => (
            <button
              key={short.videoId}
              onClick={() => setSelectedIndex(idx)}
              className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <img
                src={short.thumbnail}
                alt={short.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-red-600/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600 transition-all shadow-lg">
                  <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className="text-[10px] sm:text-xs text-white font-medium line-clamp-2 drop-shadow-lg leading-tight">
                  {short.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="mt-5 text-center">
        <Link
          to="/watch/specials"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm border border-red-600/60 text-red-500 hover:bg-red-600 hover:text-white transition-all no-underline"
        >
          View All Shorts & Specials
          <Play className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Player dialog */}
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

export default ShortsGrid;
