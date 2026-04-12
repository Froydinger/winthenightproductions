import { Button } from "@/components/ui/button";
import { Youtube, ExternalLink, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import { supabase } from "@/integrations/supabase/client";

const CTASection = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [ctaVideoId, setCtaVideoId] = useState("765UBZfeylw");

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("watch_settings")
        .select("cta_featured_video_id")
        .eq("id", 1)
        .maybeSingle();
      if (data?.cta_featured_video_id) setCtaVideoId(data.cta_featured_video_id);
    };
    load();
  }, []);

  const featuredVideos = [{ id: ctaVideoId, title: "Featured Episode" }];

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
            <div
              className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-neon-dim/20 blur-3xl animate-float"
              style={{ animationDelay: "2s" }}
            />

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
              <div className="flex justify-center gap-4 max-w-3xl mx-auto">
                {featuredVideos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => setSelectedVideo(video.id)}
                    className="group/video relative aspect-video rounded-xl overflow-hidden border-2 border-neon-blue/30 hover:border-neon-blue transition-all duration-300 hover:scale-105 w-full sm:w-auto sm:max-w-md"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
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
                  <a href="/about" className="flex items-center gap-3">
                    A Little More About Us
                    <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </Button>
              </div>

              {/* Newsletter Subscribe */}
              <div className="flex flex-col items-center gap-3 pt-4">
                <p className="text-sm text-muted-foreground">Get updates straight to your inbox</p>
                <NewsletterSubscribe />
              </div>

              <motion.div
                className="flex flex-col items-center gap-4 pt-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-sm text-muted-foreground">Join 1k+ others finding connection and healing</p>
                <div className="flex items-center gap-2 text-muted-foreground"></div>
              </motion.div>
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
