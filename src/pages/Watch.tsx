import { useEffect, useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VideoData {
  title: string;
  link: string;
  videoId: string;
  thumbnail: string;
}

interface Playlist {
  id: string;
  name: string;
  playlistId: string;
}

const playlists: Playlist[] = [
  { id: "chapter7", name: "Chapter 7", playlistId: "PL4DJfmhGyz_7B1Qw7Y7GP1vhgtRTi48LD" },
  { id: "chapter6", name: "Chapter 6", playlistId: "PL4DJfmhGyz_6GzYrVpTZjqLxya2-BTR9O" },
  { id: "chapter5", name: "Chapter 5", playlistId: "PL4DJfmhGyz_5Yz3vdT4bpJYuuf9X8NpiS" },
  { id: "chapter4", name: "Chapter 4", playlistId: "PL4DJfmhGyz_5qzx4nt4NjuHd3P5R-zEaw" },
  { id: "chapter3", name: "Chapter 3", playlistId: "PL4DJfmhGyz_4kp9L0keEVTziGX6dLCMVS" },
  { id: "chapter2", name: "Chapter 2", playlistId: "PL4DJfmhGyz_5PVexZjnazTh1huwtGb5XX" },
  { id: "chapter1", name: "Chapter 1", playlistId: "PL4DJfmhGyz_4Te-D3I9Vgn9N5HgaxKxyl" },
  { id: "specials", name: "Specials & Clips", playlistId: "PL4DJfmhGyz_7OsMomWuLGe1XSXUYPuBUB" },
];

const Watch = () => {
  const [latestVideo, setLatestVideo] = useState<VideoData | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch latest YouTube video using JSONP
    const channelId = 'UCuFlxR-Ol8zzda9Z6CJkwkA';
    const rssUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + channelId;
    const callbackName = 'wtnLatestVideoCallback';

    // @ts-ignore - Global callback for JSONP
    window[callbackName] = function(data: any) {
      try {
        if (!data || !data.items || !data.items.length) return;

        const items = data.items;
        let chosen = null;

        // Find first non-short video
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const title = (item.title || '').toLowerCase();
          const link = item.link || '';

          // Skip shorts
          if (link.includes('/shorts/') || title.includes('shorts') || title.includes('#shorts')) {
            continue;
          }

          chosen = item;
          break;
        }

        if (!chosen) chosen = items[0];
        if (!chosen) return;

        const videoLink = chosen.link || '';
        if (!videoLink) return;

        // Extract video ID
        let videoId = null;
        const match = videoLink.match(/[?&]v=([^&]+)/);
        if (match && match[1]) {
          videoId = match[1];
        } else {
          try {
            const urlObj = new URL(videoLink);
            const paths = urlObj.pathname.split('/');
            videoId = paths.pop() || paths.pop();
          } catch (e) {
            console.warn('Could not parse video ID from link', videoLink);
          }
        }
        if (!videoId) return;

        const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

        setLatestVideo({
          title: chosen.title || 'Latest Episode',
          link: videoLink,
          videoId: videoId,
          thumbnail: thumbUrl
        });
      } catch (e) {
        console.error('Error in YouTube JSONP callback:', e);
      }
    };

    // Load JSONP script
    const script = document.createElement('script');
    script.src = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=10&callback=${callbackName}`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(script);
      // @ts-ignore
      delete window[callbackName];
    };
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
            backgroundImage: latestVideo
              ? `url('${latestVideo.thumbnail}')`
              : "url('https://i.ytimg.com/vi/-7-R4fl4ubU/maxresdefault.jpg')",
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
              {latestVideo ? latestVideo.title : "Tune in for real conversations about mental health, connection, and authentic human experiences."}
            </p>

            <a
              href={latestVideo ? latestVideo.link : "https://www.youtube.com/@winthenight"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 text-lg rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto bg-gradient-to-r from-neon-blue to-blue-600 text-white shadow-lg shadow-neon-blue/25 hover:shadow-neon-blue/40 no-underline"
            >
              Watch Now
            </a>
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
                  onClick={() => setSelectedPlaylist(playlist)}
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

              <div className="w-full group">
                <div className="relative w-full aspect-video bg-card rounded-xl overflow-hidden shadow-2xl border border-border/50 ring-1 ring-white/10">
                  <div className="absolute -inset-1 bg-neon-blue/20 blur-lg group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
                  <iframe
                    className="relative w-full h-full z-10"
                    src="https://www.youtube.com/embed?listType=playlist&list=UUuFlxR-Ol8zzda9Z6CJkwkA"
                    title="Latest Upload"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen>
                  </iframe>
                </div>
              </div>
            </div>

            {/* Editor's Pick */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground m-0">Editor's Pick</h2>
              </div>

              <div className="w-full group">
                <div className="relative w-full aspect-video bg-card rounded-xl overflow-hidden shadow-2xl border border-border/50 ring-1 ring-white/10">
                  <div className="absolute -inset-1 bg-blue-600/20 blur-lg group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
                  <iframe
                    className="relative w-full h-full z-10"
                    src="https://www.youtube.com/embed/-7-R4fl4ubU"
                    title="Editor's Pick"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen>
                  </iframe>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* Playlist Dialog */}
      <Dialog open={selectedPlaylist !== null} onOpenChange={(open) => !open && setSelectedPlaylist(null)}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 bg-card/95 backdrop-blur-xl border-2 border-neon-blue/30">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/30">
            <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="h-8 w-1 bg-neon-blue rounded-full"></div>
              {selectedPlaylist?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 h-full p-6">
            {selectedPlaylist && (
              <iframe
                className="w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/videoseries?list=${selectedPlaylist.playlistId}`}
                title={selectedPlaylist.name}
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
