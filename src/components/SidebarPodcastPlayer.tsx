import { useState } from "react";
import { useYouTubePodcast, YouTubePodcastEpisode } from "@/hooks/use-youtube-podcast";
import { Headphones, Play, ExternalLink, ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const YOUTUBE_MUSIC_PODCAST_URL = "https://music.youtube.com/@winthenight";
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@winthenight";

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
};

const SidebarPodcastPlayer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState<YouTubePodcastEpisode | null>(null);
  const { data: episodes = [], isLoading } = useYouTubePodcast(3);

  const handlePlayEpisode = (episode: YouTubePodcastEpisode) => {
    if (currentEpisode?.id === episode.id) {
      setCurrentEpisode(null);
    } else {
      setCurrentEpisode(episode);
    }
  };

  const handleClosePlayer = () => {
    setCurrentEpisode(null);
  };

  if (isLoading) {
    return (
      <div className="pt-3 border-t border-border/30">
        <div className="flex items-center gap-2 px-4 mb-3">
          <Headphones className="h-4 w-4 text-neon-blue animate-pulse" />
          <span className="text-xs font-semibold text-neon-blue uppercase tracking-wider">
            Loading Podcast...
          </span>
        </div>
      </div>
    );
  }

  if (episodes.length === 0) {
    return null;
  }

  return (
    <div className="pt-3 border-t border-border/30">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 mb-3 hover:opacity-80 transition-opacity"
      >
        <div className="flex items-center gap-2">
          <Headphones className="h-4 w-4 text-neon-blue" />
          <span className="text-xs font-semibold text-neon-blue uppercase tracking-wider">
            Podcast
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-neon-blue" />
        ) : (
          <ChevronDown className="h-4 w-4 text-neon-blue" />
        )}
      </button>

      {isExpanded && (
        <div className="px-2 space-y-2">
          {/* Now Playing */}
          {currentEpisode && (
            <div className="bg-accent/50 rounded-lg p-2 mb-3 border border-neon-blue/30">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-neon-blue font-medium">Now Playing</p>
                <button
                  onClick={handleClosePlayer}
                  className="p-1 hover:bg-accent rounded transition-colors"
                  aria-label="Close player"
                >
                  <X className="h-3 w-3 text-muted-foreground" />
                </button>
              </div>
              <p className="text-xs text-foreground line-clamp-1 mb-2">
                {currentEpisode.title}
              </p>
              {/* Compact YouTube Player - Audio focused but video visible for ToS compliance */}
              <div className="relative w-full aspect-video rounded overflow-hidden bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${currentEpisode.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={currentEpisode.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          )}

          {/* Episode List */}
          <div className="space-y-1">
            {episodes.map((episode) => (
              <button
                key={episode.id}
                onClick={() => handlePlayEpisode(episode)}
                className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                  currentEpisode?.id === episode.id
                    ? "bg-neon-blue/20 border border-neon-blue/50"
                    : "hover:bg-accent/50 border border-transparent"
                }`}
              >
                {/* Thumbnail */}
                <div className="flex-shrink-0 w-12 h-9 rounded overflow-hidden bg-card">
                  <img
                    src={episode.thumbnail}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-xs font-medium text-foreground line-clamp-2 leading-tight">
                    {episode.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {formatDate(episode.pubDate)}
                  </p>
                </div>
                {/* Play indicator */}
                <div className="flex-shrink-0">
                  {currentEpisode?.id === episode.id ? (
                    <div className="w-5 h-5 rounded-full bg-neon-blue flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-sm" />
                    </div>
                  ) : (
                    <Play className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* More Episodes Link */}
          <div className="pt-2 space-y-1">
            <a
              href={YOUTUBE_MUSIC_PODCAST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-medium text-neon-blue hover:text-neon-blue/80 bg-neon-blue/10 hover:bg-neon-blue/20 rounded-lg transition-all duration-200 border border-neon-blue/20 hover:border-neon-blue/40"
            >
              <ExternalLink className="h-3 w-3" />
              More on YouTube Music
            </a>
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-3 py-1.5 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
            >
              View on YouTube
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarPodcastPlayer;
