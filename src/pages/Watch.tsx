import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShortsCarousel from "@/components/ShortsCarousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Playlist {
  id: string;
  name: string;
  playlistId: string;
}

const playlists: Playlist[] = [
  { id: "chapter-8", name: "Chapter 8", playlistId: "PL4DJfmhGyz_5hmXN0HXLxZkktMB1i0eCS" },
  { id: "chapter-7", name: "Chapter 7", playlistId: "PL4DJfmhGyz_7B1Qw7Y7GP1vhgtRTi48LD" },
  { id: "chapter-6", name: "Chapter 6", playlistId: "PL4DJfmhGyz_6GzYrVpTZjqLxya2-BTR9O" },
  { id: "chapter-5", name: "Chapter 5", playlistId: "PL4DJfmhGyz_5Yz3vdT4bpJYuuf9X8NpiS" },
  { id: "chapter-4", name: "Chapter 4", playlistId: "PL4DJfmhGyz_5qzx4nt4NjuHd3P5R-zEaw" },
  { id: "chapter-3", name: "Chapter 3", playlistId: "PL4DJfmhGyz_4kp9L0keEVTziGX6dLCMVS" },
  { id: "chapter-2", name: "Chapter 2", playlistId: "PL4DJfmhGyz_5PVexZjnazTh1huwtGb5XX" },
  { id: "chapter-1", name: "Chapter 1", playlistId: "PL4DJfmhGyz_4Te-D3I9Vgn9N5HgaxKxyl" },
  { id: "specials", name: "Shorts & Short Films", playlistId: "PL4DJfmhGyz_7OsMomWuLGe1XSXUYPuBUB" },
];

const Watch = () => {
  const navigate = useNavigate();
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoModalId, setVideoModalId] = useState<string | null>(null);
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);
  const [editorsPickVideoId, setEditorsPickVideoId] = useState<string | null>(null);
  const [mainPlaylistId, setMainPlaylistId] = useState<string | null>(null);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("watch_settings")
        .select("editors_pick_video_id, main_playlist_id")
        .eq("id", 1)
        .maybeSingle();

      if (error) {
        console.error("Failed to load watch settings:", error);
      }

      setEditorsPickVideoId(data?.editors_pick_video_id || "TXzfkLNW4e4");
      setMainPlaylistId(data?.main_playlist_id || "PL4DJfmhGyz_7B1Qw7Y7GP1vhgtRTi48LD");
    } catch (error) {
      console.error("Failed to load watch settings:", error);
      setEditorsPickVideoId("TXzfkLNW4e4");
      setMainPlaylistId("PL4DJfmhGyz_7B1Qw7Y7GP1vhgtRTi48LD");
    } finally {
      setSettingsLoaded(true);
    }
  };

  // Modal is still here if you ever want to trigger it again
  const openVideoModal = (videoId: string) => {
    setVideoModalId(videoId);
    setVideoModalOpen(true);
  };

  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <Header />

      <div className="relative z-10">
        {/* FULL-WIDTH PLAYLIST HERO */}
        <section className="relative pt-20 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border/50 ring-1 ring-white/10">
              <div className="absolute -inset-1 bg-neon-blue/20 blur-xl opacity-40 pointer-events-none"></div>
              <iframe
                className="relative w-full h-full z-10"
                src={`https://www.youtube.com/embed/videoseries?list=${mainPlaylistId}`}
                title="Win The Night – Latest Chapter"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            {/* Headline */}
            <div className="text-center mt-8 px-4">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
                Watch the latest from{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500">
                  Win The Night.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-100 max-w-2xl mx-auto leading-relaxed font-medium">
                Real conversations on mental health, connection, and honest human experience.
              </p>
            </div>

            {/* SUBSCRIBE CTA */}
            <div className="text-center mt-6">
              <button
                onClick={() => setSubscribeModalOpen(true)}
                className="inline-flex items-center justify-center gap-3 px-10 py-3 rounded-full font-semibold text-base bg-gradient-to-r from-neon-blue to-blue-600 text-white shadow-lg shadow-neon-blue/25 hover:shadow-neon-blue/40 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                  <path
                    fill="#FF0000"
                    d="M21.8 8.001a2.75 2.75 0 0 0-1.937-1.948C18.262 5.5 12 5.5 12 5.5s-6.262 0-7.863.553A2.75 2.75 0 0 0 2.2 8.001C1.75 9.62 1.75 12 1.75 12s0 2.38.45 3.999a2.75 2.75 0 0 0 1.937 1.948C5.738 18.5 12 18.5 12 18.5s6.262 0 7.863-.553a2.75 2.75 0 0 0 1.937-1.948c.45-1.619.45-3.999.45-3.999s0-2.38-.45-3.999Z"
                  />
                  <path fill="#FFFFFF" d="M10 15.5V8.5L15.5 12 10 15.5Z" />
                </svg>
                <span>Subscribe on YouTube</span>
              </button>
            </div>
          </div>
        </section>

        {/* Pick a Chapter */}
        <section className="relative py-12 px-6 md:px-12 lg:px-24 border-b border-border/30">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">Pick a Chapter</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  onClick={() => navigate(`/watch/${playlist.id}`)}
                  className={`block px-4 py-4 rounded-xl border transition-all duration-300 font-bold ${
                    playlist.id === "specials"
                      ? "bg-gradient-to-r from-card to-card/80 border-neon-blue/50 hover:border-neon-blue hover:text-neon-blue text-foreground"
                      : "bg-card border-border/50 hover:border-neon-blue/50 hover:bg-card/80 hover:text-neon-blue text-muted-foreground"
                  }`}
                >
                  {playlist.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile: Shorts then Videos stacked vertically */}
        <div className="lg:hidden">
          {/* Shorts Section */}
          <section className="relative py-16 px-6 md:px-12 overflow-hidden">
            <ShortsCarousel />
          </section>

          {/* Video Content Grid - Mobile */}
          <section className="relative py-16 px-6 md:px-12 overflow-hidden border-t border-border/30">
            <div className="max-w-7xl mx-auto space-y-12">
              {/* Latest Episode */}
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-1 bg-neon-blue rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground m-0">Latest Episode</h2>
                </div>

                <div className="w-full group">
                  <div className="relative w-full aspect-video bg-card rounded-xl overflow-hidden shadow-2xl border border-border/50 ring-1 ring-white/10">
                    <div className="absolute -inset-1 bg-neon-blue/20 blur-lg group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
                    <iframe
                      className="relative w-full h-full z-10"
                      src={`https://www.youtube.com/embed/videoseries?list=${mainPlaylistId}`}
                      title="Latest Episode"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>

              {/* Editor's Pick */}
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground m-0">Editor&apos;s Pick</h2>
                </div>

                <div className="w-full group">
                  <div className="relative w-full aspect-video bg-card rounded-xl overflow-hidden shadow-2xl border border-border/50 ring-1 ring-white/10">
                    <div className="absolute -inset-1 bg-blue-600/20 blur-lg group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
                    <iframe
                      className="relative w-full h-full z-10"
                      src={`https://www.youtube.com/embed/${editorsPickVideoId}`}
                      title="Editor's Pick - Win The Night"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Desktop: Shorts on left, Videos on right */}
        <div className="hidden lg:block">
          <section className="relative py-16 px-6 md:px-12 lg:px-24 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 xl:gap-12">
              {/* Left Column: Shorts - responsive sizing */}
              <div className="col-span-5 xl:col-span-4">
                <ShortsCarousel />
              </div>

              {/* Right Column: Videos */}
              <div className="col-span-7 xl:col-span-8 space-y-12">
                {/* Latest Episode */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-1 bg-neon-blue rounded-full"></div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground m-0">Latest Episode</h2>
                  </div>

                  <div className="w-full group">
                    <div className="relative w-full aspect-video bg-card rounded-xl overflow-hidden shadow-2xl border border-border/50 ring-1 ring-white/10">
                      <div className="absolute -inset-1 bg-neon-blue/20 blur-lg group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
                      <iframe
                        className="relative w-full h-full z-10"
                        src={`https://www.youtube.com/embed/videoseries?list=${mainPlaylistId}`}
                        title="Latest Episode"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>

                {/* Editor's Pick */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground m-0">Editor&apos;s Pick</h2>
                  </div>

                  <div className="w-full group">
                    <div className="relative w-full aspect-video bg-card rounded-xl overflow-hidden shadow-2xl border border-border/50 ring-1 ring-white/10">
                      <div className="absolute -inset-1 bg-blue-600/20 blur-lg group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
                      <iframe
                        className="relative w-full h-full z-10"
                        src={`https://www.youtube.com/embed/${editorsPickVideoId}`}
                        title="Editor's Pick - Win The Night"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Community Update CTA */}
        <section className="relative py-12 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neon-blue/10 via-card/60 to-charcoal/40 backdrop-blur-glass border-2 border-neon-blue/30 p-6 sm:p-12 hover:border-neon-blue/50 transition-all duration-300">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,217,255,0.1),transparent_70%)]" />
              <div className="relative z-10 space-y-4 sm:space-y-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                  Have something to share?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2">
                  Join the conversation and share your thoughts, stories, or updates with our community.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-neon-blue hover:bg-neon-blue/90 text-black shadow-neon hover:shadow-[0_0_30px_hsl(var(--neon-blue))] transition-all duration-300 hover:scale-105 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 h-auto w-full sm:w-auto"
                >
                  <a href="/updates" className="flex items-center justify-center gap-2 whitespace-nowrap">
                    <MessageSquarePlus className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>Post an Update!</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>

      {/* Video Modal (currently unused but kept around) */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 bg-card/95 backdrop-blur-xl border-2 border-neon-blue/30 flex flex-col">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/30 relative flex-shrink-0">
            <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="h-8 w-1 bg-neon-blue rounded-full"></div>
              Watch Episode
            </DialogTitle>
            {videoModalId && (
              <a
                href={`https://www.youtube.com/watch?v=${videoModalId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-6 right-6 px-4 py-2 rounded-lg bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue font-semibold text-sm transition-all duration-300 border border-neon-blue/40 hover:border-neon-blue/60"
              >
                Watch on YouTube
              </a>
            )}
          </DialogHeader>
          <div className="flex-1 p-6 overflow-hidden">
            {videoModalId && (
              <iframe
                className="w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${videoModalId}?autoplay=1`}
                title="Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* SUBSCRIBE MODAL */}
      <Dialog open={subscribeModalOpen} onOpenChange={setSubscribeModalOpen}>
        <DialogContent className="max-w-md w-[95vw] p-0 bg-card/95 backdrop-blur-xl border-2 border-neon-blue/30">
          <DialogHeader className="px-6 pt-6 pb-3 border-b border-border/30">
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-3">
              <div className="h-7 w-1 bg-neon-blue rounded-full"></div>
              Subscribe to Win The Night
            </DialogTitle>
          </DialogHeader>
          <div className="px-6 py-6 flex flex-col items-center gap-4 text-center">
            <p className="text-muted-foreground">
              Hit subscribe on YouTube so new chapters land in your feed the moment they drop.
            </p>
            <a
              href="https://youtube.com/@winthenight?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full font-semibold text-base bg-gradient-to-r from-neon-blue to-blue-600 text-white shadow-lg shadow-neon-blue/25 hover:shadow-neon-blue/40 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                <path
                  fill="#FF0000"
                  d="M21.8 8.001a2.75 2.75 0 0 0-1.937-1.948C18.262 5.5 12 5.5 12 5.5s-6.262 0-7.863.553A2.75 2.75 0 0 0 2.2 8.001C1.75 9.62 1.75 12 1.75 12s0 2.38.45 3.999a2.75 2.75 0 0 0 1.937 1.948C5.738 18.5 12 18.5 12 18.5s6.262 0 7.863-.553a2.75 2.75 0 0 0 1.937-1.948c.45-1.619.45-3.999.45-3.999s0-2.38-.45-3.999Z"
                />
                <path fill="#FFFFFF" d="M10 15.5V8.5L15.5 12 10 15.5Z" />
              </svg>
              <span>Go to YouTube</span>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Watch;
