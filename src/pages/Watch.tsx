import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useYouTubeVideos } from "@/hooks/use-youtube-feed";

interface Playlist {
  id: string;
  name: string;
  playlistId: string;
}

const playlists: Playlist[] = [
  { id: "chapter-7", name: "Chapter 7", playlistId: "PL4DJfmhGyz_7B1Qw7Y7GP1vhgtRTi48LD" },
  { id: "chapter-6", name: "Chapter 6", playlistId: "PL4DJfmhGyz_6GzYrVpTZjqLxya2-BTR9O" },
  { id: "chapter-5", name: "Chapter 5", playlistId: "PL4DJfmhGyz_5Yz3vdT4bpJYuuf9X8NpiS" },
  { id: "chapter-4", name: "Chapter 4", playlistId: "PL4DJfmhGyz_5qzx4nt4NjuHd3P5R-zEaw" },
  { id: "chapter-3", name: "Chapter 3", playlistId: "PL4DJfmhGyz_4kp9L0keEVTziGX6dLCMVS" },
  { id: "chapter-2", name: "Chapter 2", playlistId: "PL4DJfmhGyz_5PVexZjnazTh1huwtGb5XX" },
  { id: "chapter-1", name: "Chapter 1", playlistId: "PL4DJfmhGyz_4Te-D3I9Vgn9N5HgaxKxyl" },
  { id: "specials", name: "Specials & Clips", playlistId: "PL4DJfmhGyz_7OsMomWuLGe1XSXUYPuBUB" },
];

const Watch = () => {
  const navigate = useNavigate();
  const [fallbackTimeout, setFallbackTimeout] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoModalId, setVideoModalId] = useState<string | null>(null);

  // Use YouTube videos hook to get latest non-short videos
  const { videoIds, isLoading } = useYouTubeVideos();
  const latestVideoId = videoIds[0]; // First non-short video

  const openVideoModal = (videoId: string) => {
    setVideoModalId(videoId);
    setVideoModalOpen(true);
  };

  // Add a timeout to detect if the API is failing
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!latestVideoId && !isLoading) {
        console.error('YouTube feed failed to load - API may be down or rate-limited');
        setFallbackTimeout(true);
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeout);
  }, [latestVideoId, isLoading]);

  // Log when we have a video ID
  useEffect(() => {
    if (latestVideoId) {
      console.log('Latest video ID loaded:', latestVideoId);
      setFallbackTimeout(false);
    }
  }, [latestVideoId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen relative">
      {/* Global Animated Background */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      {/* Sticky Header */}
      <Header />

      {/* Content */}
      <div className="relative z-10">

        {/* Hero Section */}
        <div
          className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: latestVideoId
              ? `url('https://img.youtube.com/vi/${latestVideoId}/maxresdefault.jpg')`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#000000"
          }}
        >
          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black"></div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-center px-6 pt-20">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight drop-shadow-2xl">
              Watch our latest{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500">
                full episode.
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-zinc-100 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-lg font-medium">
              Tune in for real conversations about mental health, connection, and authentic human experiences.
            </p>

            {latestVideoId ? (
              <button
                onClick={() => openVideoModal(latestVideoId)}
                className="inline-flex items-center justify-center px-10 py-4 text-lg rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto bg-gradient-to-r from-neon-blue to-blue-600 text-white shadow-lg shadow-neon-blue/25 hover:shadow-neon-blue/40 cursor-pointer"
              >
                Watch Now
              </button>
            ) : fallbackTimeout ? (
              <a
                href="https://www.youtube.com/@WinTheNight?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-4 text-lg rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto bg-gradient-to-r from-neon-blue to-blue-600 text-white shadow-lg shadow-neon-blue/25 hover:shadow-neon-blue/40 no-underline"
              >
                Visit Our Channel
              </a>
            ) : (
              <div className="inline-flex items-center justify-center px-10 py-4 text-lg rounded-full font-bold w-full sm:w-auto bg-gradient-to-r from-neon-blue to-blue-600 text-white shadow-lg shadow-neon-blue/25 opacity-50">
                Loading...
              </div>
            )}
          </div>
        </div>

        {/* Pick a Chapter Section */}
        <section className="relative py-16 px-6 md:px-12 lg:px-24 border-b border-border/30">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-10">Pick a Chapter</h2>

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

        {/* Video Content Grid */}
        <section id="latest-episode" className="relative py-16 px-6 md:px-12 lg:px-24 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Latest Upload */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 bg-neon-blue rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground m-0">Latest Upload</h2>
              </div>

              <div className="w-full group cursor-pointer" onClick={() => latestVideoId && openVideoModal(latestVideoId)}>
                <div className="relative w-full aspect-video bg-card rounded-xl overflow-hidden shadow-2xl border border-border/50 ring-1 ring-white/10">
                  <div className="absolute -inset-1 bg-neon-blue/20 blur-lg group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
                  {latestVideoId ? (
                    <div
                      className="relative w-full h-full z-10 bg-cover bg-center"
                      style={{ backgroundImage: `url(https://img.youtube.com/vi/${latestVideoId}/maxresdefault.jpg)` }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all">
                        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-neon-blue/90 group-hover:bg-neon-blue transform group-hover:scale-110 transition-all">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full z-10 flex items-center justify-center bg-card/50">
                      <p className="text-muted-foreground">Loading latest video...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Editor's Pick */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground m-0">Editor's Pick</h2>
              </div>

              <div className="w-full group cursor-pointer" onClick={() => openVideoModal('-7-R4fl4ubU')}>
                <div className="relative w-full aspect-video bg-card rounded-xl overflow-hidden shadow-2xl border border-border/50 ring-1 ring-white/10">
                  <div className="absolute -inset-1 bg-blue-600/20 blur-lg group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
                  <div
                    className="relative w-full h-full z-10 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://img.youtube.com/vi/-7-R4fl4ubU/maxresdefault.jpg)' }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all">
                      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-600/90 group-hover:bg-blue-600 transform group-hover:scale-110 transition-all">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* Video Modal */}
      <Dialog
        open={videoModalOpen}
        onOpenChange={setVideoModalOpen}
      >
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
    </main>
  );
};

export default Watch;
