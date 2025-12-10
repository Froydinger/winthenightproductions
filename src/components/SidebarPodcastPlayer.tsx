import { useState } from "react";
import { useSubstackPodcast, SubstackPodcastEpisode } from "@/hooks/use-substack-podcast";
import { useSubstackFeed } from "@/hooks/use-substack-feed";
import { useAudio, AudioEpisode } from "@/context/AudioContext";
import { Headphones, Play, Pause, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

const SUBSTACK_PODCAST_URL = "https://winthenight.substack.com/podcast";

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

const ListenNowSection = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { data: podcastEpisodes = [], isLoading: isPodcastLoading } = useSubstackPodcast(5);
  const { data: allPosts = [], isLoading: isFeedLoading } = useSubstackFeed();
  const { currentEpisode, isPlaying, setCurrentEpisode, setIsPlaying } = useAudio();

  // Fallback to blog feed's podcast posts if dedicated endpoint is empty
  const blogPodcasts = allPosts
    .filter(post => post.isPodcast && post.audioUrl)
    .slice(0, 5)
    .map((post) => ({
      id: post.guid,
      title: post.title,
      description: post.description,
      audioUrl: post.audioUrl || "",
      pubDate: post.pubDate,
    }));

  const episodes = podcastEpisodes.length > 0 ? podcastEpisodes : blogPodcasts;
  const isLoading = isPodcastLoading || (isFeedLoading && podcastEpisodes.length === 0);

  const handlePlayEpisode = (episode: SubstackPodcastEpisode | AudioEpisode) => {
    const audioEpisode: AudioEpisode = {
      id: episode.id,
      title: episode.title,
      description: episode.description,
      audioUrl: episode.audioUrl,
      pubDate: episode.pubDate,
    };

    if (currentEpisode?.id === episode.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentEpisode(audioEpisode);
      setIsPlaying(true);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-3 border-t border-border/30">
        <div className="flex items-center gap-2 px-4 mb-3">
          <Headphones className="h-4 w-4 text-neon-blue animate-pulse" />
          <span className="text-xs font-semibold text-neon-blue uppercase tracking-wider">
            Loading Episodes...
          </span>
        </div>
      </div>
    );
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
            Listen Now
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
          {episodes.length === 0 ? (
            <div className="py-4 text-center">
              <p className="text-xs text-muted-foreground">
                No audio episodes available yet. Check back soon!
              </p>
            </div>
          ) : (
            <>
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
                    {/* Play Icon */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center">
                      {currentEpisode?.id === episode.id && isPlaying ? (
                        <Pause className="h-3 w-3 text-neon-blue" />
                      ) : (
                        <Play className="h-3 w-3 text-neon-blue ml-0.5" />
                      )}
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
                  </button>
                ))}
              </div>

              {/* More Episodes Link */}
              <div className="pt-2">
                <a
                  href={SUBSTACK_PODCAST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-medium text-neon-blue hover:text-neon-blue/80 bg-neon-blue/10 hover:bg-neon-blue/20 rounded-lg transition-all duration-200 border border-neon-blue/20 hover:border-neon-blue/40"
                >
                  <ExternalLink className="h-3 w-3" />
                  More on Substack
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ListenNowSection;
