import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";

const WatchLatestSection = () => {
  return (
    <section className="relative py-10 px-4">
      <div className="container mx-auto max-w-7xl">
        <Card
          className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-charcoal/40 backdrop-blur-glass border border-neon-blue/20 p-8 hover:border-neon-blue/60 transition-all duration-500 hover:shadow-neon animate-fade-in-up"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-neon-blue/20 flex items-center justify-center group-hover:bg-neon-blue/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Play className="w-8 h-8 text-neon-blue" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-neon-blue transition-colors duration-300">
                  Watch The Latest
                </h3>
                <p className="text-muted-foreground text-sm">
                  Recent episodes from Win The Night
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative aspect-video rounded-lg overflow-hidden border border-neon-blue/20">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/videoseries?list=UULFyZF5-HzIq7HqFWaHlH7iVQ"
                  title="Latest Win The Night Video 1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden border border-neon-blue/20">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/videoseries?list=UULFyZF5-HzIq7HqFWaHlH7iVQ&index=1"
                  title="Latest Win The Night Video 2"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Card>
      </div>
    </section>
  );
};

export default WatchLatestSection;
