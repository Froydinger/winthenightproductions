import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EpisodeCard from "@/components/EpisodeCard";
import EpisodeGridSkeleton from "@/components/EpisodeGridSkeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, List } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePlaylistItems } from "@/hooks/use-playlist-items";

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

  // Set default selected video to first item
  useEffect(() => {
    if (items && items.length > 0 && !selectedVideoId) {
      setSelectedVideoId(items[0].videoId);
    }
  }, [items, selectedVideoId]);

  // Reset selected video when chapter changes
  useEffect(() => {
    setSelectedVideoId(null);
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
    <main className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <Header />

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative pt-24 pb-8 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-6">
              <Button
                variant="outline"
                onClick={() => navigate('/watch')}
                className="border-primary/30 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Watch
              </Button>

              <Button
                variant="outline"
                onClick={() => setChaptersDialogOpen(true)}
                className="border-primary/30 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary transition-colors"
              >
                <List className="mr-2 h-4 w-4" />
                Chapters
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-1.5 bg-primary rounded-full"></div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-foreground">
                  {playlist.name}
                </h1>
              </div>

              <a
                href={`https://www.youtube.com/playlist?list=${playlist.playlistId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary font-semibold transition-all duration-300 border border-primary/40 hover:border-primary/60 no-underline text-sm whitespace-nowrap"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Open in YouTube
              </a>
            </div>

            <p className="text-base text-muted-foreground max-w-3xl">
              {playlist.description}
            </p>
          </div>
        </div>

        {/* Shorts Playlist Section - Only for Specials Page */}
        {playlist.id === "specials" && (
          <section className="relative pb-8 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-8 w-1 bg-primary rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Shorts</h2>
              </div>
              <p className="text-muted-foreground mb-6 max-w-3xl">
                Quick clips and highlights from the show in vertical format.
              </p>
              <div className="w-full max-w-md mx-auto aspect-[9/16] rounded-xl overflow-hidden shadow-2xl border border-border/50 ring-1 ring-ring/10 bg-card">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/videoseries?list=PL4DJfmhGyz_5Fa4iQSpQuOTSH4XXCFL1J"
                  title="Shorts Playlist"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </section>
        )}

        {/* Featured Player + Episode Grid */}
        {playlist.playlistId && (
          <section className="relative pb-12 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
              {playlist.id === "specials" && (
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Short Films & Specials</h2>
                  </div>
                  <p className="text-muted-foreground mb-6 max-w-3xl">
                    Special episodes, short films, and extended clips.
                  </p>
                </div>
              )}

              {/* Featured Player */}
              <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-border/50 ring-1 ring-ring/10 bg-card mb-8">
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

              {/* Episode Grid */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-8 w-1 bg-primary rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Episodes
                  {items && <span className="text-muted-foreground font-normal text-lg ml-2">({items.length})</span>}
                </h2>
              </div>

              {isLoading && <EpisodeGridSkeleton />}

              {error && (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Failed to load episodes. Try refreshing the page.</p>
                </div>
              )}

              {items && items.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items.map((item) => (
                    <EpisodeCard
                      key={item.videoId}
                      item={item}
                      isActive={item.videoId === selectedVideoId}
                      onClick={() => {
                        setSelectedVideoId(item.videoId);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <Footer />
      </div>

      {/* Chapters Dialog */}
      <Dialog open={chaptersDialogOpen} onOpenChange={setChaptersDialogOpen}>
        <DialogContent className="max-w-md bg-card/95 backdrop-blur-xl border-2 border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-3">
              <div className="h-7 w-1 bg-primary rounded-full"></div>
              All Chapters
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {playlists.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  navigate(`/watch/${p.id}`);
                  setChaptersDialogOpen(false);
                }}
                className={`px-4 py-3 rounded-lg border transition-all duration-300 font-semibold text-sm ${
                  p.id === chapterId
                    ? "bg-primary/20 border-primary text-primary"
                    : p.id === "specials"
                    ? "bg-card border-primary/50 hover:border-primary hover:bg-primary/10 text-foreground hover:text-primary"
                    : "bg-card border-border/50 hover:border-primary/50 hover:bg-card/80 text-muted-foreground hover:text-primary"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default ChapterPage;
