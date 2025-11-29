import { Button } from "@/components/ui/button";
import { Youtube, ExternalLink, Play } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const CTASection = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Featured videos to showcase
  const featuredVideos = [
    { id: "-Cx1WhiVbPE", title: "Featured Episode" }
  ];

  return (
    <>
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neon-blue/20 via-card/60 to-charcoal/40 backdrop-blur-glass border-2 border-neon-blue/40 p-8 sm:p-14 lg:p-20 shadow-neon animate-fade-in-up">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,217,255,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,217,255,0.1),transparent_50%)]" />

            {/* Floating orbs */}
            <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-neon-blue/20 blur-3xl animate-float" />
            <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-neon-dim/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

            <div className="relative z-10 text-center space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Ready to Join the Conversation?
                </h2>
                <p className="text-base sm:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Subscribe now and become part of a community that values real talk over perfect appearances.
                </p>
              </div>

              {/* Featured Videos */}
              <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {featuredVideos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => setSelectedVideo(video.id)}
                    className="group/video relative aspect-video rounded-xl overflow-hidden border-2 border-neon-blue/30 hover:border-neon-blue transition-all duration-300 hover:scale-105"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-neon-blue/90 flex items-center justify-center transform group-hover/video:scale-110 transition-transform duration-300">
                        <Play className="w-7 h-7 text-black fill-black ml-1" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button
                  asChild
                  size="lg"
                  className="group bg-neon-blue text-black hover:bg-neon-blue/90 shadow-neon hover:shadow-[0_0_40px_hsl(var(--neon-blue))] transition-all duration-500 hover:scale-110 animate-glow-pulse text-base sm:text-lg font-bold px-6 py-6 sm:px-8 sm:py-7 rounded-2xl"
                >
                  <a
                    href="https://youtube.com/@winthenight?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <Youtube className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                    Subscribe on YouTube
                  </a>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="group border-2 border-foreground text-foreground hover:bg-foreground/10 hover:border-foreground transition-all duration-500 hover:scale-105 text-sm sm:text-base px-6 py-5 sm:px-8 sm:py-6 rounded-2xl backdrop-blur-sm"
                >
                  <a
                    href="/about"
                    className="flex items-center gap-3"
                  >
                    A Little More About Us
                    <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </Button>
              </div>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="group border-2 border-neon-blue/60 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue transition-all duration-500 hover:scale-105 text-base sm:text-lg px-6 py-5 sm:px-8 sm:py-6 rounded-2xl backdrop-blur-sm font-semibold"
              >
                <a href="/guest" className="flex items-center gap-3">
                  Be Our Guest!
                </a>
              </Button>

              <p className="text-sm text-muted-foreground pt-4">
                Join 1k+ others finding connection and healing
              </p>
            </div>
          </div>
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

export default CTASection;
