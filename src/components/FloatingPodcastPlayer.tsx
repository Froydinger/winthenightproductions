import { useState, useRef, useEffect } from "react";
import { useSubstackFeed } from "@/hooks/use-substack-feed";
import { Headphones, X, Play, Pause, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

export const FloatingPodcastPlayer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { data: posts = [] } = useSubstackFeed();

  // Filter only podcast episodes with audio URLs
  const podcastEpisodes = posts.filter(post => post.isPodcast && post.audioUrl);

  useEffect(() => {
    console.log("FloatingPodcastPlayer - Total posts:", posts.length);
    console.log("FloatingPodcastPlayer - Podcast episodes with audio:", podcastEpisodes.length);
    if (posts.length > 0) {
      console.log("FloatingPodcastPlayer - Sample posts:", posts.slice(0, 2).map(p => ({
        title: p.title,
        isPodcast: p.isPodcast,
        hasAudioUrl: !!p.audioUrl,
        audioUrl: p.audioUrl
      })));
    }
  }, [posts, podcastEpisodes.length]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handlePlayEpisode = (episode: any) => {
    if (currentEpisode?.guid === episode.guid) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentEpisode(episode);
      setIsPlaying(true);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  if (podcastEpisodes.length === 0) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="h-14 w-14 rounded-full bg-neon-blue hover:bg-neon-blue/90 text-white shadow-[0_0_30px_rgba(93,204,255,0.5)] hover:shadow-[0_0_40px_rgba(93,204,255,0.7)] transition-all duration-300"
        >
          {isOpen ? (
            <ChevronUp className="h-6 w-6" />
          ) : (
            <Headphones className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Podcast Player Panel */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-96 max-h-[600px] bg-card/95 backdrop-blur-lg border border-border/50 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-neon-blue/20 to-purple-500/20">
            <div className="flex items-center gap-2">
              <Headphones className="h-5 w-5 text-neon-blue" />
              <h3 className="font-semibold text-foreground">Podcast Episodes</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Current Playing */}
          {currentEpisode && (
            <div className="p-4 bg-accent/50 border-b border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Now Playing</p>
              <p className="text-sm font-medium text-foreground line-clamp-2 mb-3">
                {currentEpisode.title}
              </p>
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-neon-blue hover:bg-neon-blue/90 text-white"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <audio
                  ref={audioRef}
                  src={currentEpisode.audioUrl}
                  onEnded={handleAudioEnded}
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  className="flex-1"
                  controls
                />
              </div>
            </div>
          )}

          {/* Episode List */}
          <ScrollArea className="h-[400px]">
            <div className="p-2">
              {podcastEpisodes.map((episode) => (
                <button
                  key={episode.guid}
                  onClick={() => handlePlayEpisode(episode)}
                  className={`w-full text-left p-3 rounded-lg hover:bg-accent/50 transition-colors mb-1 ${
                    currentEpisode?.guid === episode.guid
                      ? "bg-accent border border-neon-blue/50"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {currentEpisode?.guid === episode.guid && isPlaying ? (
                        <Pause className="h-4 w-4 text-neon-blue" />
                      ) : (
                        <Play className="h-4 w-4 text-muted-foreground group-hover:text-neon-blue" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-2 mb-1">
                        {episode.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatDate(episode.pubDate)}</span>
                        <span>•</span>
                        <span>{episode.author}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-3 border-t border-border/50 bg-card/50">
            <p className="text-xs text-muted-foreground text-center">
              {podcastEpisodes.length} episode{podcastEpisodes.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </div>
      )}
    </>
  );
};
