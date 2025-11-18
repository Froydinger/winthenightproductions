import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ShortsCarousel = () => {
  const [shortIds, setShortIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchShorts = async () => {
      try {
        // Using YouTube RSS feed via rss2json API
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
            'https://www.youtube.com/feeds/videos.xml?channel_id=UCuFlxR-Ol8zzda9Z6CJkwkA'
          )}`
        );
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
          // Filter for Shorts (they typically have #shorts in title or are under 60 seconds)
          // For now, we'll take the most recent videos and display them
          const ids = data.items
            .slice(0, 6) // Get up to 6 recent videos
            .map((item: any) => {
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
          
          setShortIds(ids);
        }
      } catch (error) {
        console.error('Error fetching shorts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShorts();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, shortIds.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, shortIds.length - 2)) % Math.max(1, shortIds.length - 2));
  };

  const visibleShorts = shortIds.slice(currentIndex, currentIndex + 3);

  return (
    <section className="relative py-10 px-4">
      <div className="container mx-auto max-w-7xl">
        <Card className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 hover:border-neon-blue/60 transition-all duration-500 hover:shadow-neon">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 flex items-center justify-center group-hover:bg-neon-blue/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Play className="w-8 h-8 text-neon-blue" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-neon-blue transition-colors duration-300">
                  Recent Shorts
                </h3>
                <p className="text-muted-foreground text-sm">
                  Quick insights from Win The Night
                </p>
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading shorts...
              </div>
            ) : shortIds.length > 0 ? (
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visibleShorts.map((shortId) => (
                    <div
                      key={shortId}
                      className="relative aspect-[9/16] rounded-lg overflow-hidden border border-neon-blue/20 bg-black"
                    >
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${shortId}`}
                        title="Win The Night Short"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ))}
                </div>
                
                {shortIds.length > 3 && (
                  <div className="flex justify-center gap-4 mt-6">
                    <Button
                      onClick={prevSlide}
                      variant="outline"
                      size="icon"
                      className="border-neon-blue/40 hover:bg-neon-blue/10 hover:border-neon-blue"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button
                      onClick={nextSlide}
                      variant="outline"
                      size="icon"
                      className="border-neon-blue/40 hover:bg-neon-blue/10 hover:border-neon-blue"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <a
                  href="https://youtube.com/@winthenight"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-blue hover:underline"
                >
                  Visit our YouTube channel for shorts
                </a>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ShortsCarousel;
