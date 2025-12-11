import { useState, useRef, useEffect } from "react";
import { useSubstackPodcast } from "@/hooks/use-substack-podcast";
import { useAudio } from "@/context/AudioContext";
import { ChevronDown, ChevronUp } from "lucide-react";
import logo from "@/assets/win-the-night-productions-logo.png";

const SidebarPodcastPlayer = () => {
  const { data: episodes = [], isLoading } = useSubstackPodcast(10);
  const { isPlaying, setIsPlaying, setCurrentEpisode } = useAudio();
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Keep track of the current episode by URL to avoid re-renders from object reference changes
  const currentEpisode = episodes[selectedIndex];
  const currentAudioUrl = currentEpisode?.audioUrl;

  // Update audio src when URL changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentAudioUrl) return;

    // Update src if it changed (different episode selected)
    if (audio.src !== currentAudioUrl) {
      audio.src = currentAudioUrl;
      audio.load(); // Load the new audio source
    }
  }, [currentAudioUrl]);

  // Sync current episode to global state whenever it changes
  useEffect(() => {
    if (currentEpisode) {
      setCurrentEpisode({
        id: currentEpisode.id,
        title: currentEpisode.title,
        description: currentEpisode.description,
        audioUrl: currentEpisode.audioUrl,
        pubDate: currentEpisode.pubDate,
      });
    }
  }, [currentEpisode, setCurrentEpisode]);

  // Sync global playing state with audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [setIsPlaying]);

  const handleSelectEpisode = (index: number) => {
    setSelectedIndex(index);
    setShowEpisodes(false);
  };

  if (isLoading) {
    return (
      <div className="p-3 bg-background/50 rounded-lg animate-pulse">
        <div className="h-10 bg-neon-blue/20 rounded" />
      </div>
    );
  }

  if (!currentEpisode) {
    return (
      <div className="p-3 text-center text-muted-foreground text-sm">
        No episodes available
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Compact Player Tile */}
      <div className="bg-gradient-to-br from-neon-blue/10 to-purple-500/10 border border-neon-blue/30 rounded-lg p-3">
        <div className="flex items-center gap-3 mb-3">
          {/* Small Album Art */}
          <div className="w-12 h-12 flex-shrink-0 bg-background/50 rounded-md overflow-hidden border border-neon-blue/20">
            <img src={logo} alt="Podcast" className="w-full h-full object-contain p-1" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-neon-blue font-medium">Listen Now</p>
            <p className="text-sm font-semibold text-foreground line-clamp-2">
              {currentEpisode.title}
            </p>
          </div>
        </div>

        {/* Native Audio Player - this always works */}
        <audio
          ref={audioRef}
          controls
          controlsList="nodownload"
          preload="metadata"
          className="w-full h-10 rounded-md"
          style={{
            filter: "invert(1) hue-rotate(180deg)",
          }}
        />
      </div>

      {/* Expandable Episodes List */}
      {episodes.length > 1 && (
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
              {episodes.map((ep, index) => (
                <button
                  key={ep.id}
                  onClick={() => handleSelectEpisode(index)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
                    selectedIndex === index
                      ? "bg-neon-blue/20 border border-neon-blue/40"
                      : "hover:bg-accent/50 border border-transparent"
                  }`}
                >
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
