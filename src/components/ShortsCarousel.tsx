import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

const ShortsCarousel = () => {
  const [shortIds, setShortIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedShort, setSelectedShort] = useState<string | null>(null);

  useEffect(() => {
    const fetchShorts = async () => {
      try {
        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
        
        if (!apiKey) {
          console.error('YouTube API key not configured');
          setLoading(false);
          return;
        }

        // Fetch recent videos from channel
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=UCuFlxR-Ol8zzda9Z6CJkwkA&part=snippet&order=date&maxResults=50&type=video`
        );
        const searchData = await response.json();
        
        if (searchData.items && searchData.items.length > 0) {
          const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
          
          // Get video details including duration
          const detailsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoIds}&part=contentDetails`
          );
          const detailsData = await detailsResponse.json();
          
          // Filter for videos under 60 seconds (Shorts)
          const shortIds = detailsData.items
            .filter((video: any) => {
              const duration = video.contentDetails.duration;
              // Parse ISO 8601 duration format (PT1M30S = 1 minute 30 seconds)
              const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
              if (!match) return false;
              const minutes = parseInt(match[1] || '0');
              const seconds = parseInt(match[2] || '0');
              const totalSeconds = minutes * 60 + seconds;
              return totalSeconds < 60; // Only videos under 60 seconds
            })
            .slice(0, 8)
            .map((video: any) => video.id);
          
          console.log(`Found ${shortIds.length} shorts under 60 seconds`);
          setShortIds(shortIds);
        }
      } catch (error) {
        console.error('Error fetching shorts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShorts();
  }, []);

  return (
    <>
      <section className="relative py-10 px-4">
        <div className="container mx-auto max-w-7xl">
          <Card className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-6 hover:border-neon-blue/60 transition-all duration-500">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-neon-blue/20 flex items-center justify-center">
                  <Play className="w-6 h-6 text-neon-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Recent Shorts
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Quick insights from Win The Night
                  </p>
                </div>
              </div>
              
              {loading ? (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  Loading shorts...
                </div>
              ) : shortIds.length > 0 ? (
                <div className="relative overflow-x-auto pb-2 -mx-2 px-2">
                  <div className="flex gap-3 min-w-max">
                    {shortIds.map((shortId) => (
                      <button
                        key={shortId}
                        onClick={() => setSelectedShort(shortId)}
                        className="group/thumb relative flex-shrink-0 w-28 h-48 rounded-lg overflow-hidden border-2 border-neon-blue/20 hover:border-neon-blue transition-all duration-300 hover:scale-105"
                      >
                        <img
                          src={`https://img.youtube.com/vi/${shortId}/maxresdefault.jpg`}
                          alt="YouTube Short"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to hqdefault if maxres doesn't exist
                            e.currentTarget.src = `https://img.youtube.com/vi/${shortId}/hqdefault.jpg`;
                          }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-neon-blue/90 flex items-center justify-center">
                            <Play className="w-6 h-6 text-black fill-black ml-0.5" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <a
                    href="https://youtube.com/@winthenight"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-blue hover:underline text-sm"
                  >
                    Visit our YouTube channel for shorts
                  </a>
                </div>
              )}
            </div>
          </Card>
        </div>
      </section>

      {/* Video Modal */}
      <Dialog open={!!selectedShort} onOpenChange={() => setSelectedShort(null)}>
        <DialogContent className="max-w-md p-0 bg-black border-2 border-neon-blue/40">
          <DialogClose className="absolute top-2 right-2 z-50 rounded-full bg-black/80 p-2 hover:bg-black transition-colors">
            <X className="w-5 h-5 text-white" />
          </DialogClose>
          {selectedShort && (
            <div className="aspect-[9/16] w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedShort}?autoplay=1`}
                title="Win The Night Short"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShortsCarousel;
