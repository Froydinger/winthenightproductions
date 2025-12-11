import { useState } from "react";
import { useSubstackPodcast } from "@/hooks/use-substack-podcast";
import { useAudio, AudioEpisode } from "@/context/AudioContext";
import { Play, Pause, ChevronDown, ChevronUp } from "lucide-react";
import logo from "@/assets/win-the-night-productions-logo.png";

const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const SidebarPodcastPlayer = () => {
  const { data: episodes = [], isLoading } = useSubstackPodcast(10);
  const { currentEpisode, isPlaying, setCurrentEpisode, setIsPlaying, currentTime, duration, audioRef } = useAudio();
  const [showEpisodes, setShowEpisodes] = useState(false);

  const handlePlayPause = () => {
    if (!currentEpisode && episodes.length > 0) {
      // Auto-select first episode if none selected
      const ep = episodes[0];
      setCurrentEpisode({
        id: ep.id,
        title: ep.title,
        description: ep.description,
        audioUrl: ep.audioUrl,
        pubDate: ep.pubDate,
      });
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleSelectEpisode = (episode: AudioEpisode) => {
    if (currentEpisode?.id === episode.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentEpisode(episode);
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  if (isLoading) {
    return (
      <div className="p-3 bg-background/50 rounded-lg animate-pulse">
        <div className="h-10 bg-neon-blue/20 rounded" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Compact Player */}
      <div className="bg-gradient-to-br from-neon-blue/10 to-purple-500/10 border border-neon-blue/30 rounded-lg p-3">
        <div className="flex items-center gap-3">
          {/* Small Album Art */}
          <div className="w-12 h-12 flex-shrink-0 bg-background/50 rounded-md overflow-hidden border border-neon-blue/20">
            <img src={logo} alt="Podcast" className="w-full h-full object-contain p-1" />
          </div>

          {/* Info & Controls */}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-neon-blue font-medium">Listen Now</p>
            <p className="text-sm font-semibold text-foreground truncate">
              {currentEpisode?.title || (episodes[0]?.title || "No episodes")}
            </p>
          </div>

          {/* Play Button */}
          <button
            onClick={handlePlayPause}
            className="w-10 h-10 flex-shrink-0 bg-neon-blue hover:bg-neon-blue/80 text-white rounded-full flex items-center justify-center transition-colors shadow-[0_0_10px_rgba(93,204,255,0.4)]"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 ml-0.5" />
            )}
          </button>
        </div>

        {/* Progress Bar */}
        {currentEpisode && (
          <div className="mt-3 space-y-1">
            <div
              className="h-1 bg-background/50 rounded-full overflow-hidden cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-neon-blue transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Expandable Episodes List */}
      {episodes.length > 0 && (
        <div>
          <button
            onClick={() => setShowEpisodes(!showEpisodes)}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors"
          >
            <span>More Episodes ({episodes.length})</span>
            {showEpisodes ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>

          {showEpisodes && (
            <div className="mt-1 space-y-1 max-h-48 overflow-y-auto">
              {episodes.map((ep) => (
                <button
                  key={ep.id}
                  onClick={() => handleSelectEpisode({
                    id: ep.id,
                    title: ep.title,
                    description: ep.description,
                    audioUrl: ep.audioUrl,
                    pubDate: ep.pubDate,
                  })}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
                    currentEpisode?.id === ep.id
                      ? "bg-neon-blue/20 border border-neon-blue/40"
                      : "hover:bg-accent/50 border border-transparent"
                  }`}
                >
                  <div className="w-6 h-6 flex-shrink-0 rounded-full bg-neon-blue/20 flex items-center justify-center">
                    {currentEpisode?.id === ep.id && isPlaying ? (
                      <Pause className="h-2.5 w-2.5 text-neon-blue" />
                    ) : (
                      <Play className="h-2.5 w-2.5 text-neon-blue ml-0.5" />
                    )}
                  </div>
                  <span className="text-xs text-foreground truncate">{ep.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SidebarPodcastPlayer;
