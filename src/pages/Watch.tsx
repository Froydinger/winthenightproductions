import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShortsGrid from "@/components/ShortsGrid";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus, Youtube } from "lucide-react";
import EpisodeSearch from "@/components/EpisodeSearch";
import { CyanRule } from "@/components/magazine/SectionDivider";
import { useYouTubeVideos } from "@/hooks/use-youtube-feed";
import { defaultSiteSettings, fetchSiteSettings } from "@/lib/site-settings";

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
  { id: "specials", name: "Shorts & Specials", playlistId: "PL4DJfmhGyz_7OsMomWuLGe1XSXUYPuBUB" },
];

const Watch = () => {
  const navigate = useNavigate();
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoModalId, setVideoModalId] = useState<string | null>(null);
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);
  const [settings, setSettings] = useState(defaultSiteSettings);
  const { videoIds = [] } = useYouTubeVideos();
  const latestVideoId = videoIds[0] || settings.editors_pick_video_id;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSiteSettings().then(setSettings);
  }, []);

  // Modal is still here if you ever want to trigger it again
  const openVideoModal = (videoId: string) => {
    setVideoModalId(videoId);
    setVideoModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden font-sans relative">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <Header />

      <div className="relative z-10 pt-20">
        {/* FULL-WIDTH PLAYLIST HERO */}
        <section className="relative py-12 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl border border-[#1a1a1a]">
              <iframe
                className="relative w-full h-full z-10"
                src={`https://www.youtube.com/embed/${latestVideoId}`}
                title="Win The Night – Latest Chapter"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            {/* Headline */}
            <div className="text-center mt-10">
              <h1 className="font-bebas text-5xl md:text-7xl tracking-wide text-white leading-none mb-4">
                Watch the latest from <span className="text-[#00d9ff]">Win The Night</span>
              </h1>
              <p className="text-sm md:text-base text-[#555] max-w-2xl mx-auto leading-relaxed font-sans">
                Real conversations on mental health, connection, and honest human experience.
              </p>
            </div>

            {/* SUBSCRIBE CTA */}
            <div className="text-center mt-6">
              <button
                onClick={() => setSubscribeModalOpen(true)}
                className="inline-flex items-center justify-center gap-3 bg-[#00d9ff] text-black font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded shadow-[0_0_16px_rgba(0,217,255,0.4)] hover:opacity-90 transition-all"
              >
                <Youtube className="w-4 h-4" />
                <span>Subscribe on YouTube</span>
              </button>
            </div>
          </div>
        </section>

        <CyanRule />

        {/* Pick a Chapter */}
        <section className="relative py-16 px-6 sm:px-10 bg-[#0d0d0d] border-b border-[#1a1a1a]">
          <div className="max-w-[1400px] mx-auto text-center space-y-8">
            <h2 className="font-bebas text-4xl sm:text-5xl tracking-wider text-white">Pick a Chapter</h2>

            {/* Episode Search */}
            <div className="max-w-xl mx-auto">
              <EpisodeSearch />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  onClick={() => navigate(`/watch/${playlist.id}`)}
                  className={`block px-4 py-4 border text-xs font-bold uppercase tracking-wider transition-all h-full ${
                    playlist.id === "chapter-8" || playlist.id === "specials"
                      ? "bg-black border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff]/10"
                      : "bg-black border-[#1a1a1a] text-[#555] hover:border-[#00d9ff]/50 hover:text-white"
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
          <section className="relative py-16 px-6 overflow-hidden bg-black">
            <div className="max-w-7xl mx-auto">
              <ShortsGrid />
            </div>
          </section>

          {/* Video Content Grid - Mobile */}
          <section className="relative py-16 px-6 overflow-hidden border-t border-[#1a1a1a] bg-[#0d0d0d]">
            <div className="max-w-7xl mx-auto space-y-12">
              {/* Latest Episode */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-1 bg-[#00d9ff]"></div>
                  <h2 className="font-bebas text-3xl tracking-wider text-white m-0">Latest Episode</h2>
                </div>

                <div className="w-full border border-[#1a1a1a] rounded overflow-hidden aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${latestVideoId}`}
                    title="Latest Episode"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Editor's Pick */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-1 bg-[#00d9ff]"></div>
                  <h2 className="font-bebas text-3xl tracking-wider text-white m-0">Editor&apos;s Pick</h2>
                </div>

                <div className="w-full border border-[#1a1a1a] rounded overflow-hidden aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${settings.editors_pick_video_id}`}
                    title="Editor's Pick - Win The Night"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Desktop: Shorts on left, Videos on right */}
        <div className="hidden lg:block">
          <section className="relative py-16 px-6 md:px-12 lg:px-24 overflow-hidden bg-black">
            <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-12">
              {/* Left Column: Shorts */}
              <div className="col-span-5 xl:col-span-4 border-r border-[#1a1a1a] pr-8">
                <ShortsGrid />
              </div>

              {/* Right Column: Videos */}
              <div className="col-span-7 xl:col-span-8 space-y-12">
                {/* Latest Episode */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-1 bg-[#00d9ff]" />
                    <h2 className="font-bebas text-3xl tracking-wider text-white m-0">Latest Episode</h2>
                  </div>

                  <div className="w-full border border-[#1a1a1a] rounded overflow-hidden aspect-video bg-[#0d0d0d]">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${latestVideoId}`}
                      title="Latest Episode"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>

                {/* Editor's Pick */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-1 bg-[#00d9ff]" />
                    <h2 className="font-bebas text-3xl tracking-wider text-white m-0">Editor&apos;s Pick</h2>
                  </div>

                  <div className="w-full border border-[#1a1a1a] rounded overflow-hidden aspect-video bg-[#0d0d0d]">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${settings.editors_pick_video_id}`}
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

        {/* Community Update CTA */}
        <section className="relative py-16 px-4 bg-[#0d0d0d]">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="relative overflow-hidden rounded-lg bg-black border border-[#1a1a1a] p-8 sm:p-14">
              <div className="relative z-10 space-y-6">
                <h3 className="font-bebas text-3xl sm:text-4xl tracking-wider text-white">
                  Have something to share?
                </h3>
                <p className="text-xs text-[#555] font-sans max-w-md mx-auto">
                  Join the conversation and share your thoughts, stories, or updates with our community.
                </p>
                <a
                  href="/updates"
                  className="inline-flex items-center justify-center gap-2 bg-[#00d9ff] hover:opacity-90 text-black font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded shadow-[0_0_16px_rgba(0,217,255,0.4)] transition-all"
                >
                  <MessageSquarePlus className="w-4 h-4 flex-shrink-0" />
                  <span>Post an Update!</span>
                </a>
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
