import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

const WatchLatestSection = () => {
  const [videoIds, setVideoIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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
          const ids = data.items
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
    <section className="relative py-6 md:py-10 px-4">
      <div className="container mx-auto max-w-7xl">
        <Card
          className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-6 md:p-8 hover:border-neon-blue/60 transition-all duration-500 hover:shadow-neon animate-fade-in-up"
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
                  <div
                    key={videoId}
                    className="relative aspect-video rounded-lg overflow-hidden border border-neon-blue/20"
                  >
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`Latest Win The Night Video ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
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
  );
};

export default WatchLatestSection;
