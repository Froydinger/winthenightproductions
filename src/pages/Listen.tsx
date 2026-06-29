import { useEffect, useRef, useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreakNotice from "@/components/BreakNotice";
import { CyanRule } from "@/components/magazine/SectionDivider";
import { useSubstackPodcast } from "@/hooks/use-substack-podcast";
import { Play, Pause, Disc3 } from "lucide-react";
import logo from "@/assets/win-the-night-logo.png";

const RSS_FEED_URL = "https://api.substack.com/feed/podcast/3678939.rss";
const YOUTUBE_MUSIC_URL = "https://music.youtube.com/playlist?list=PL4DJfmhGyz_7MiglVq4jbJYhftobxRuFf";

interface CurrentEpisode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  pubDate: string;
}

const Listen = () => {
  const { data: episodes = [], isLoading } = useSubstackPodcast(20);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState<CurrentEpisode | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (episodes.length > 0 && !currentEpisode) {
      setCurrentEpisode(episodes[0]);
    }
  }, [episodes, currentEpisode]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const selectEpisode = (episode: typeof episodes[0]) => {
    setCurrentEpisode(episode);
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.src = episode.audioUrl;
      // Delay play to allow src to change
      setTimeout(() => {
        audioRef.current?.play();
        setIsPlaying(true);
      }, 100);
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  if (isLoading) {
    return (
      <main className="min-h-screen relative">
        <div className="fixed inset-0 z-0">
          <AnimatedBackground />
        </div>
        <Header />
        <div className="relative z-10 min-h-[calc(100vh-200px)] flex items-center justify-center">
          <div className="animate-pulse space-y-4 text-center">
            <div className="w-32 h-32 mx-auto bg-neon-blue/20 rounded-lg" />
            <div className="h-6 bg-foreground/10 rounded w-48 mx-auto" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden font-sans relative">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <Header />

      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="relative py-12 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="font-bebas text-5xl md:text-7xl tracking-wide text-white leading-none mb-4">
                Listen to <span className="text-[#00d9ff]">Win The Night</span>
              </h1>
              <p className="text-sm md:text-base text-[#555] max-w-2xl mx-auto leading-relaxed">
                Podcast episodes on real conversations, mental health, connection, and honest human experience.
              </p>
            </div>

            {/* Now Playing Section */}
            {currentEpisode && (
              <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-6 md:p-8 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-center">
                  {/* Episode Artwork */}
                  <div className="flex justify-center md:justify-start">
                    <div className="w-40 h-40 rounded border border-[#2a2a2a] overflow-hidden bg-black flex-shrink-0">
                      <img
                        src={logo}
                        alt={currentEpisode.title}
                        className="w-full h-full object-cover rounded-full drop-shadow-[0_0_8px_rgba(0,217,255,0.5)]"
                      />
                    </div>
                  </div>

                  {/* Player Controls */}
                  <div className="space-y-6 min-w-0">
                    <div>
                      <p className="text-[10px] font-bold text-[#00d9ff] uppercase tracking-wider mb-1">
                        Now Playing
                      </p>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 line-clamp-1">
                        {currentEpisode.title}
                      </h2>
                      <p className="text-xs text-[#555] line-clamp-2 leading-relaxed">
                        {currentEpisode.description}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div
                        className="h-1.5 bg-black border border-[#1a1a1a] rounded cursor-pointer hover:bg-black transition-colors"
                        onClick={(e) => {
                          if (!audioRef.current || !duration) return;
                          const rect = e.currentTarget.getBoundingClientRect();
                          const percent = (e.clientX - rect.left) / rect.width;
                          const newTime = percent * duration;
                          audioRef.current.currentTime = newTime;
                          setCurrentTime(newTime);
                        }}
                      >
                        <div
                          className="h-full bg-[#00d9ff] rounded transition-all duration-100 shadow-[0_0_8px_rgba(0,217,255,0.5)]"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-[#555]">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    {/* Play/Pause Controls */}
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={handlePlayPause}
                          className="w-12 h-12 rounded-full bg-[#00d9ff] text-black flex items-center justify-center transition-all duration-200 shadow-[0_0_12px_rgba(0,217,255,0.4)] hover:scale-105"
                        >
                          {isPlaying ? (
                            <Pause className="h-5 w-5" />
                          ) : (
                            <Play className="h-5 w-5 ml-0.5" />
                          )}
                        </button>
                        <div className="text-left">
                          <p className="text-xs font-semibold text-white uppercase tracking-wider">
                            {isPlaying ? "Now Playing" : "Ready to Listen"}
                          </p>
                          <p className="text-[10px] text-[#555] font-sans">
                            {isPlaying ? "Playing episode..." : "Click play to start"}
                          </p>
                        </div>
                      </div>

                      {/* YouTube Music Button */}
                      <a
                        href={YOUTUBE_MUSIC_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black border border-[#1a1a1a] hover:border-[#00d9ff] text-white hover:text-[#00d9ff] font-bold uppercase tracking-wider text-[10px] px-5 py-3 rounded transition-all flex items-center gap-2"
                      >
                        <Disc3 className="h-4 w-4" />
                        Listen on YouTube Music
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hidden Audio Element */}
                <audio
                  ref={audioRef}
                  src={currentEpisode.audioUrl}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onTimeUpdate={(e) => {
                    const audio = e.currentTarget;
                    setCurrentTime(audio.currentTime);
                  }}
                  onLoadedMetadata={(e) => {
                    const audio = e.currentTarget;
                    setDuration(audio.duration);
                  }}
                  onEnded={() => setIsPlaying(false)}
                  preload="auto"
                />
              </div>
            )}
          </div>
        </section>

        <CyanRule />

        {/* Episodes Grid */}
        <section className="relative py-16 px-6 sm:px-10 bg-black">
          <div className="max-w-[1400px] mx-auto space-y-10">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1 bg-[#00d9ff]"></div>
              <h2 className="font-bebas text-4xl tracking-wider text-white m-0">All Episodes</h2>
            </div>

            {episodes.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-sm">No episodes available at this time.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {episodes.map((episode) => (
                  <button
                    key={episode.id}
                    onClick={() => selectEpisode(episode)}
                    className={`group text-left border rounded transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                      currentEpisode?.id === episode.id
                        ? "bg-[#0d0d0d] border-[#00d9ff] shadow-[0_0_20px_rgba(0,217,255,0.1)]"
                        : "bg-[#0d0d0d] border-[#1a1a1a] hover:border-[#00d9ff]/50"
                    }`}
                  >
                    <div className="relative w-full aspect-square bg-[#050505] overflow-hidden">
                      <img
                        src={logo}
                        alt={episode.title}
                        className="w-full h-full object-cover rounded-full drop-shadow-[0_0_8px_rgba(0,217,255,0.4)] group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-10 w-10 text-white fill-white" />
                      </div>
                    </div>

                    <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-[#00d9ff] transition-colors leading-snug">
                          {episode.title}
                        </h3>
                        <p className="text-xs text-[#555] line-clamp-2 leading-relaxed">
                          {episode.description}
                        </p>
                      </div>
                      <p className="text-[10px] text-[#3a3a3a] pt-2 border-t border-[#111]">
                        {new Date(episode.pubDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    {currentEpisode?.id === episode.id && (
                      <div className="h-1 w-full bg-[#00d9ff]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
};

export default Listen;
