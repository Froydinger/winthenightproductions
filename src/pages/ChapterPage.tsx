import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EpisodeCard from "@/components/EpisodeCard";
import EpisodeGridSkeleton from "@/components/EpisodeGridSkeleton";
import ShortsCarousel from "@/components/ShortsCarousel";
import { ArrowLeft, List, Youtube } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePlaylistItems } from "@/hooks/use-playlist-items";
import { Rule, CyanRule } from "@/components/magazine/SectionDivider";
import ScrollReveal from "@/components/ScrollReveal";

interface Playlist {
  id: string;
  name: string;
  playlistId: string;
  description: string;
}

const playlists: Playlist[] = [
  { id: "chapter-8", name: "Chapter 8", playlistId: "PL4DJfmhGyz_5hmXN0HXLxZkktMB1i0eCS", description: "The latest chapter of Win The Night" },
  { id: "chapter-7", name: "Chapter 7", playlistId: "PL4DJfmhGyz_7B1Qw7Y7GP1vhgtRTi48LD", description: "Chapter 7 of Win The Night" },
  { id: "chapter-6", name: "Chapter 6", playlistId: "PL4DJfmhGyz_6GzYrVpTZjqLxya2-BTR9O", description: "Chapter 6 episodes" },
  { id: "chapter-5", name: "Chapter 5", playlistId: "PL4DJfmhGyz_5Yz3vdT4bpJYuuf9X8NpiS", description: "Chapter 5 episodes" },
  { id: "chapter-4", name: "Chapter 4", playlistId: "PL4DJfmhGyz_5qzx4nt4NjuHd3P5R-zEaw", description: "Chapter 4 episodes" },
  { id: "chapter-3", name: "Chapter 3", playlistId: "PL4DJfmhGyz_4kp9L0keEVTziGX6dLCMVS", description: "Chapter 3 episodes" },
  { id: "chapter-2", name: "Chapter 2", playlistId: "PL4DJfmhGyz_5PVexZjnazTh1huwtGb5XX", description: "Chapter 2 episodes" },
  { id: "chapter-1", name: "Chapter 1", playlistId: "PL4DJfmhGyz_4Te-D3I9Vgn9N5HgaxKxyl", description: "Chapter 1 episodes" },
  { id: "specials", name: "Shorts & Specials", playlistId: "PL4DJfmhGyz_7OsMomWuLGe1XSXUYPuBUB", description: "Fast moments from the show and special short films" },
];

const ChapterPage = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [chaptersDialogOpen, setChaptersDialogOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(
    searchParams.get("v") || null
  );

  const playlist = playlists.find(p => p.id === chapterId);
  const { data: items, isLoading, error } = usePlaylistItems(playlist?.playlistId);

  useEffect(() => {
    if (items && items.length > 0 && !selectedVideoId) {
      setSelectedVideoId(items[0].videoId);
    }
  }, [items, selectedVideoId]);

  useEffect(() => {
    const videoFromUrl = searchParams.get("v");
    setSelectedVideoId(videoFromUrl || null);
    if (videoFromUrl) {
      setSearchParams({}, { replace: true });
    }
  }, [chapterId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [chapterId]);

  useEffect(() => {
    if (chapterId && !playlist) {
      navigate('/404', { replace: true });
    }
  }, [chapterId, playlist, navigate]);

  if (!playlist) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white overflow-x-hidden font-sans relative pt-20">
        <div className="fixed inset-0 z-0">
          <AnimatedBackground />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-12 space-y-10">
          
          {/* Header Actions */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => navigate('/watch')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#555] hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4 text-[#00d9ff]" />
              Back to Watch
            </button>

            <button
              onClick={() => setChaptersDialogOpen(true)}
              className="inline-flex items-center gap-2 bg-black border border-[#1a1a1a] hover:border-[#00d9ff] text-white hover:text-[#00d9ff] font-bold uppercase tracking-wider text-[10px] px-4 py-2 rounded transition-all"
            >
              <List className="h-4.5 w-4.5" />
              Chapters List
            </button>
          </div>

          {/* Chapter Header Title */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-[#111] pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-1 bg-[#00d9ff]"></div>
                <h1 className="font-bebas text-4xl sm:text-5xl tracking-wide text-white m-0">
                  {playlist.name}
                </h1>
              </div>
              <p className="text-xs text-[#555] leading-relaxed max-w-xl">
                {playlist.id === "specials" ? "Fast moments from the show and special short films" : playlist.description}
              </p>
            </div>

            <a
              href={`https://www.youtube.com/playlist?list=${playlist.playlistId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#00d9ff] hover:opacity-90 text-black font-bold uppercase tracking-wider text-xs px-5 py-3 rounded shadow-[0_0_12px_rgba(0,217,255,0.3)] transition-all flex items-center gap-2 whitespace-nowrap self-start sm:self-center"
            >
              <Youtube className="w-4 h-4" />
              Open Playlist
            </a>
          </div>

          {/* Shorts Carousel - Specials Only */}
          {playlist.id === "specials" && (
            <section className="space-y-6">
              <div className="space-y-1">
                <h2 className="font-bebas text-2xl tracking-wider text-white">Short Highlights</h2>
                <p className="text-xs text-[#555]">Quick clips from the show. Scroll to watch.</p>
              </div>
              <ShortsCarousel />
              <Rule />
            </section>
          )}

          {/* Featured Video Player & Grid */}
          {playlist.playlistId && (
            <section className="space-y-8">
              {/* Featured Player Frame */}
              <div className="w-full aspect-video rounded border border-[#1a1a1a] overflow-hidden bg-black shadow-2xl">
                {selectedVideoId ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=0&rel=0`}
                    title={items?.find(i => i.videoId === selectedVideoId)?.title || playlist.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/videoseries?list=${playlist.playlistId}`}
                    title={playlist.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                )}
              </div>

              {/* Episodes Grid Title */}
              <div className="flex items-center gap-2 border-b border-[#111] pb-3">
                <div className="h-4 w-1 bg-[#00d9ff]"></div>
                <h2 className="font-bebas text-2xl tracking-wider text-white m-0">
                  Episodes {items && <span className="text-[#555] font-normal text-sm ml-2">({items.length})</span>}
                </h2>
              </div>

              {isLoading && <EpisodeGridSkeleton />}

              {error && (
                <div className="text-center py-12 text-[#555] text-xs">
                  <p>Failed to load episodes. Try reloading this page.</p>
                </div>
              )}

              {/* Episodes Grid */}
              {items && items.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items.map((item) => (
                    <button
                      key={item.videoId}
                      onClick={() => {
                        setSelectedVideoId(item.videoId);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`group text-left border rounded overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                        item.videoId === selectedVideoId
                          ? "bg-[#0d0d0d] border-[#00d9ff] shadow-[0_0_15px_rgba(0,217,255,0.1)]"
                          : "bg-[#0d0d0d] border-[#1a1a1a] hover:border-[#00d9ff]/30"
                      }`}
                    >
                      <div className="relative aspect-video bg-black overflow-hidden border-b border-[#111]">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                        <h3 className="text-xs font-bold text-white group-hover:text-[#00d9ff] transition-colors leading-snug line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-[9px] uppercase tracking-wider text-[#555] pt-1.5 border-t border-[#111]">
                          Click to play
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </section>
          )}

        </div>

        <Footer />
      </main>

      {/* Chapters Overlay Dialog */}
      <Dialog open={chaptersDialogOpen} onOpenChange={setChaptersDialogOpen}>
        <DialogContent className="max-w-md bg-black border border-[#1a1a1a] p-6 text-white">
          <DialogHeader className="border-b border-[#111] pb-3 mb-4">
            <DialogTitle className="font-bebas text-2xl tracking-wider text-white flex items-center gap-2">
              <div className="h-5 w-1 bg-[#00d9ff]" />
              Select Chapter
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-2.5">
            {playlists.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  navigate(`/watch/${p.id}`);
                  setChaptersDialogOpen(false);
                }}
                className={`px-4 py-3 border text-xs font-bold uppercase tracking-wider transition-all rounded ${
                  p.id === chapterId
                    ? "bg-[#0d0d0d] border-[#00d9ff] text-[#00d9ff]"
                    : "bg-black border-[#1a1a1a] text-[#555] hover:border-[#00d9ff]/50 hover:text-white"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChapterPage;
