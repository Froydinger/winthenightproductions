import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const WatchLatestSection = () => {
  const [videoIds, setVideoIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestVideos = async () => {
      try {
        // Using YouTube RSS feed via rss2json API with correct channel ID
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
            'https://www.youtube.com/feeds/videos.xml?channel_id=UCuFlxR-Ol8zzda9Z6CJkwkA'
          )}`
        );
        const data = await response.json();
        
        console.log('YouTube RSS Response:', data); // Debug log
        
        if (data.items && data.items.length > 0) {
          // Filter out shorts and get regular videos only
          const regularVideos = data.items.filter((item: any) => {
            const link = item.link || '';
            const title = (item.title || '').toLowerCase();
            // Skip shorts
            return !link.includes('/shorts/') && !title.includes('#shorts');
          });
          
          const ids = regularVideos
            .slice(0, 2)
            .map((item: any) => {
              // Try multiple formats to extract video ID
              if (item.link) {
                const linkMatch = item.link.match(/watch\?v=([^&]+)/);
                if (linkMatch) return linkMatch[1];
              }
              if (item.guid) {
                const guidMatch = item.guid.match(/yt:video:(.*)/);
                if (guidMatch) return guidMatch[1];
              }
              return null;
            })
            .filter(Boolean);
          
          console.log('Extracted video IDs:', ids); // Debug log
          setVideoIds(ids);
        } else {
          console.log('No items found in feed'); // Debug log
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestVideos();
  }, []);

  return (
    <>
    <section className="relative py-6 md:py-10 pb-2 md:pb-4">
      <div className="container mx-auto max-w-7xl px-2 sm:px-4">
        <Card
          className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-4 md:p-8 hover:border-neon-blue/60 transition-all duration-500 hover:shadow-neon animate-fade-in-up"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-neon-blue/20 flex items-center justify-center group-hover:bg-neon-blue/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Play className="w-6 h-6 sm:w-8 sm:h-8 text-neon-blue" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-neon-blue transition-colors duration-300">
                  Watch The Latest
                </h3>
                <p className="text-muted-foreground text-sm">
                  Recent episodes from Win The Night
                </p>
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading latest videos...
              </div>
            ) : videoIds.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {videoIds.map((videoId, index) => (
                  <button
                    key={videoId}
                    onClick={() => setSelectedVideo(videoId)}
                    className="group/video relative aspect-video rounded-lg overflow-hidden border-2 border-neon-blue/20 hover:border-neon-blue transition-all duration-300"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                      alt={`Latest Win The Night Video ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-neon-blue/90 flex items-center justify-center transform group-hover/video:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-black fill-black ml-1" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <a
                  href="https://youtube.com/@winthenight"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-blue hover:underline"
                >
                  Visit our YouTube channel to watch the latest episodes
                </a>
              </div>
            )}
          </div>

          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Card>
      </div>
    </section>

    {/* Video Modal */}
    <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
      <DialogContent className="max-w-4xl p-0 bg-transparent border-0 shadow-2xl">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
          {selectedVideo && (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  </>
  );
};

export default WatchLatestSection;
