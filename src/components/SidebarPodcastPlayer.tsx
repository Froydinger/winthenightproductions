import { useState, useEffect } from "react";
import { useSubstackPodcast, SubstackPodcastEpisode } from "@/hooks/use-substack-podcast";
import { useSubstackFeed } from "@/hooks/use-substack-feed";
import { useAudio, AudioEpisode } from "@/context/AudioContext";
import { Play, Pause, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import logo from "@/assets/win-the-night-productions-logo.png";

const SUBSTACK_PODCAST_URL = "https://winthenight.substack.com/podcast";

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const ListenNowSection = () => {
  const { data: podcastEpisodes = [], isLoading: isPodcastLoading } = useSubstackPodcast(10);
  const { data: allPosts = [], isLoading: isFeedLoading } = useSubstackFeed();
  const { currentEpisode, isPlaying, setCurrentEpisode, setIsPlaying, currentTime, duration } = useAudio();
  const [expandedEpisodeId, setExpandedEpisodeId] = useState<string | null>(null);

  // Fallback to blog feed's podcast posts if dedicated endpoint is empty
  const blogPodcasts = allPosts
    .filter(post => post.isPodcast && post.audioUrl)
    .map((post) => ({
      id: post.guid,
      title: post.title,
      description: post.description,
      audioUrl: post.audioUrl || "",
      pubDate: post.pubDate,
    }));

  const episodes = podcastEpisodes.length > 0 ? podcastEpisodes : blogPodcasts;
  const isLoading = isPodcastLoading || (isFeedLoading && podcastEpisodes.length === 0);

  // Auto-load latest episode on first load
  useEffect(() => {
    if (episodes.length > 0 && !currentEpisode && !isLoading) {
      const latestEpisode: AudioEpisode = {
        id: episodes[0].id,
        title: episodes[0].title,
        description: episodes[0].description,
        audioUrl: episodes[0].audioUrl,
        pubDate: episodes[0].pubDate,
      };
      setCurrentEpisode(latestEpisode);
    }
  }, [episodes, currentEpisode, isLoading, setCurrentEpisode]);

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
      <div className="space-y-2">
        <div className="h-6 bg-neon-blue/20 rounded animate-pulse" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-background/50 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Now Playing Section */}
      {currentEpisode && (
        <div className="bg-gradient-to-br from-neon-blue/10 to-purple-500/10 border border-neon-blue/30 rounded-xl overflow-hidden">
          {/* Album Art and Info */}
          <div className="p-4 space-y-3">
            {/* Album Art */}
            <div className="w-full aspect-square bg-background/50 rounded-lg overflow-hidden border border-neon-blue/20">
              <img
                src={logo}
                alt={currentEpisode.title}
                className="w-full h-full object-contain p-4"
              />
            </div>

            {/* Episode Title */}
            <div className="space-y-1">
              <p className="text-xs font-semibold text-neon-blue uppercase tracking-wider">Now Playing</p>
              <p className="text-sm font-bold text-foreground line-clamp-2">
                {currentEpisode.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDate(currentEpisode.pubDate)}
              </p>
            </div>

            {/* Play Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-full py-2.5 bg-gradient-to-r from-neon-blue to-purple-500 hover:from-neon-blue/90 hover:to-purple-500/90 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_0_15px_rgba(93,204,255,0.3)]"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 ml-0.5" />
                  Play
                </>
              )}
            </button>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="h-1.5 bg-background/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-neon-blue to-purple-500 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Episodes Accordion */}
      {episodes.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-neon-blue uppercase tracking-wider px-1">All Episodes</p>
          <div className="space-y-1">
            {episodes.map((episode) => (
              <div key={episode.id}>
                {/* Episode Item */}
                <button
                  onClick={() => handlePlayEpisode(episode)}
                  className={`w-full flex items-center gap-2 p-2.5 rounded-lg transition-all duration-200 ${
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

                  {/* Episode Info */}
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-xs font-medium text-foreground line-clamp-1">
                      {episode.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {formatDate(episode.pubDate)}
                    </p>
                  </div>

                  {/* Expand Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedEpisodeId(
                        expandedEpisodeId === episode.id ? null : episode.id
                      );
                    }}
                    className="flex-shrink-0 p-1 hover:bg-accent rounded transition-colors"
                  >
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
                        expandedEpisodeId === episode.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </button>

                {/* Expanded Description */}
                {expandedEpisodeId === episode.id && (
                  <div className="px-3 py-2 bg-background/30 text-xs text-muted-foreground border-l-2 border-neon-blue/30 space-y-2">
                    <p className="line-clamp-4">
                      {episode.description || "No description available"}
                    </p>
                    <a
                      href={episode.audioUrl}
                      download
                      className="inline-flex items-center gap-1 text-neon-blue hover:text-neon-blue/80 transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Open Audio
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {episodes.length === 0 && !isLoading && (
        <div className="text-center py-6 text-muted-foreground">
          <p className="text-sm">No episodes available yet</p>
        </div>
      )}

      {/* View All on Substack */}
      {episodes.length > 0 && (
        <a
          href={SUBSTACK_PODCAST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-medium text-neon-blue hover:text-neon-blue/80 bg-neon-blue/10 hover:bg-neon-blue/20 rounded-lg transition-all duration-200 border border-neon-blue/20 hover:border-neon-blue/40"
        >
          <ExternalLink className="h-3 w-3" />
          View More on Substack
        </a>
      )}
    </div>
  );
};

export default ListenNowSection;
