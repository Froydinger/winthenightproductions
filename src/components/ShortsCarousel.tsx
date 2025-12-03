import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play } from "lucide-react";
import { fetchRecentShorts, getFallbackShorts, type YouTubeShort } from "@/lib/youtube";

const ShortsCarousel = () => {
  const shortsPlaylistUrl = "https://www.youtube.com/playlist?list=PL4DJfmhGyz_5Fa4iQSpQuOTSH4XXCFL1J";
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedShort, setSelectedShort] = useState<string | null>(null);
  const [shorts, setShorts] = useState<YouTubeShort[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadShorts = async () => {
      try {
        const data = await fetchRecentShorts(6);
        if (data.length > 0) {
          setShorts(data);
        } else {
          setShorts(getFallbackShorts());
        }
      } catch (error) {
        console.error('Failed to load shorts:', error);
        setShorts(getFallbackShorts());
      } finally {
        setLoading(false);
      }
    };

    loadShorts();
  }, []);

  const openShort = (shortId: string) => {
    setSelectedShort(shortId);
    setIsDialogOpen(true);
  };

  return (
    <section className="relative py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-7 w-1 bg-neon-blue rounded-full" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground m-0">Shorts and clips</h2>
        </div>

        <p className="text-sm md:text-base text-muted-foreground mb-10 max-w-2xl mx-auto text-center">
          Fast moments from the show. Watch our latest shorts below.
        </p>

{loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[9/16] bg-card/50 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : shorts.length === 1 && shorts[0].id === 'fallback1' ? (
          // Fallback: Just show the playlist embed
          null
        ) : (
          // Show shorts grid
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {shorts.map((short) => (
              <button
                key={short.id}
                onClick={() => openShort(short.id)}
                className="group relative aspect-[9/16] rounded-lg overflow-hidden bg-card border border-border/50 hover:border-neon-blue/50 transition-all duration-300 hover:scale-105"
              >
                <img
                  src={short.thumbnail}
                  alt={short.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-xs text-white font-medium line-clamp-2 drop-shadow-lg">
                    {short.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Shorts Playlist Embed - Always show */}
        {!loading && (
          <div className="mt-10 mb-8">
            <div className="w-full max-w-xs mx-auto aspect-[9/16] rounded-xl overflow-hidden shadow-2xl border border-border/50 ring-1 ring-white/10 bg-card">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/videoseries?list=PL4DJfmhGyz_5Fa4iQSpQuOTSH4XXCFL1J"
                title="Shorts Playlist"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* View All Shorts Button */}
        {!loading && (
          <div className="flex justify-center">
            <a
              href="/watch/specials"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all"
            >
              View All Shorts & Short Films
              <Play className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>

      {/* Dialog for playing individual short */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md aspect-[9/16] p-0">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="flex items-center justify-between text-base">
              <span>Win The Night Short</span>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="gap-2 text-xs h-8"
              >
                <a
                  href={selectedShort ? `https://www.youtube.com/shorts/${selectedShort}` : shortsPlaylistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-3 h-3" />
                  Open in YouTube
                </a>
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 px-4 pb-4">
            {selectedShort && (
              <iframe
                src={`https://www.youtube.com/embed/${selectedShort}?autoplay=1`}
                className="w-full h-full rounded-lg border-0"
                title="YouTube Short"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ShortsCarousel;
