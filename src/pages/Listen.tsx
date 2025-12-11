import { useEffect, useRef, useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSubstackPodcast } from "@/hooks/use-substack-podcast";
import { Play, Pause, Copy, Check, Music, Disc3 } from "lucide-react";
import logo from "@/assets/win-the-night-logo.webp";

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
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

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

  const handleCopyRSS = async () => {
    try {
      await navigator.clipboard.writeText(RSS_FEED_URL);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (err) {
      console.error("Failed to copy RSS URL:", err);
    }
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  const handleOpenRSSInApp = async () => {
    // Try using Web Share API if available (works on mobile and some desktop browsers)
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Win The Night Podcast",
          text: "Subscribe to Win The Night on your favorite podcast app",
          url: RSS_FEED_URL,
        });
        return;
      } catch (err) {
        // User cancelled share or other error - continue to fallback
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Share failed:", err);
        }
      }
    }

    // Fallback: Try opening with feed:// protocol for apps that support it
    // Then also try to copy to clipboard as backup
    try {
      window.location.href = `feed://${RSS_FEED_URL.replace(/^https?:\/\//, "")}`;
      // Also copy to clipboard as backup since feed:// may not work
      await navigator.clipboard.writeText(RSS_FEED_URL);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (err) {
      // If feed:// fails, at least copy to clipboard
      try {
        await navigator.clipboard.writeText(RSS_FEED_URL);
        setCopiedToClipboard(true);
        setTimeout(() => setCopiedToClipboard(false), 2000);
      } catch (clipboardErr) {
        console.error("Failed to copy or open RSS:", clipboardErr);
      }
    }
  };

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
    <main className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <Header />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-16 pb-6 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                Listen to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500">
                  Win The Night.
                </span>
              </h1>
              <p className="text-sm md:text-base text-zinc-100 max-w-2xl mx-auto leading-relaxed">
                Podcast episodes on real conversations, mental health, connection, and honest human experience.
              </p>
            </div>

            {/* Now Playing Section */}
            {currentEpisode && (
              <div className="bg-gradient-to-br from-neon-blue/10 to-purple-500/10 border border-neon-blue/30 rounded-2xl p-6 md:p-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  {/* Episode Artwork */}
                  <div className="flex justify-center md:justify-start">
                    <div className="w-40 h-40 rounded-xl overflow-hidden border border-neon-blue/30 shadow-2xl bg-background/50">
                      <img
                        src={logo}
                        alt={currentEpisode.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Player Controls */}
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <p className="text-xs font-semibold text-neon-blue uppercase tracking-wider mb-2">
                        Now Playing
                      </p>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 line-clamp-2">
                        {currentEpisode.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {currentEpisode.description}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div
                        className="h-1.5 bg-background/50 rounded-full cursor-pointer hover:bg-background transition-colors group"
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
                          className="h-full bg-gradient-to-r from-neon-blue to-purple-500 rounded-full transition-all duration-100 group-hover:shadow-[0_0_10px_rgba(93,204,255,0.5)]"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    {/* Play/Pause Controls */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handlePlayPause}
                        className="flex-shrink-0 w-14 h-14 rounded-full bg-neon-blue hover:bg-neon-blue/90 text-white flex items-center justify-center transition-all duration-200 shadow-[0_0_15px_rgba(93,204,255,0.3)] hover:shadow-[0_0_25px_rgba(93,204,255,0.5)]"
                      >
                        {isPlaying ? (
                          <Pause className="h-6 w-6" />
                        ) : (
                          <Play className="h-6 w-6 ml-0.5" />
                        )}
                      </button>
                      <div className="text-sm">
                        <p className="font-semibold text-foreground">
                          {isPlaying ? "Now Playing" : "Ready to Listen"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {isPlaying ? "Playing episode..." : "Click play to start"}
                        </p>
                      </div>
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

                {/* YouTube Music Button */}
                <div className="mt-6">
                  <a
                    href={YOUTUBE_MUSIC_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300 text-center flex items-center justify-center gap-2"
                  >
                    <Disc3 className="h-5 w-5" />
                    Listen on YouTube Music
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Episodes Grid */}
        <section className="relative py-12 px-4 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1 bg-neon-blue rounded-full"></div>
              <h2 className="text-3xl font-bold text-foreground m-0">All Episodes</h2>
            </div>

            {episodes.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No episodes available at this time.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {episodes.map((episode) => (
                  <button
                    key={episode.id}
                    onClick={() => selectEpisode(episode)}
                    className={`group text-left rounded-xl border transition-all duration-300 overflow-hidden ${
                      currentEpisode?.id === episode.id
                        ? "bg-neon-blue/10 border-neon-blue/50 shadow-[0_0_20px_rgba(93,204,255,0.2)]"
                        : "bg-card border-border/50 hover:border-neon-blue/50 hover:bg-card/80"
                    }`}
                  >
                    <div className="relative w-full aspect-square bg-background/50 overflow-hidden">
                      <img
                        src={logo}
                        alt={episode.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-12 w-12 text-white fill-white" />
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-neon-blue transition-colors">
                        {episode.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {episode.description}
                      </p>
                      <p className="text-[10px] text-muted-foreground/70 pt-1">
                        {new Date(episode.pubDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    {currentEpisode?.id === episode.id && (
                      <div className="h-1 w-full bg-gradient-to-r from-neon-blue to-purple-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Subscribe to Podcast Apps Section */}
        <section className="relative py-16 px-4 md:px-12 lg:px-24 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1 bg-neon-blue rounded-full"></div>
              <h2 className="text-3xl font-bold text-foreground m-0">Subscribe in Your Podcast App</h2>
            </div>

            <p className="text-muted-foreground text-lg mb-8 max-w-2xl">
              Add this podcast to your favorite app. Use the RSS feed URL below to subscribe and get new episodes automatically:
            </p>

            {/* RSS URL and Action Buttons */}
            <div className="bg-gradient-to-r from-neon-blue/10 to-purple-500/10 border border-neon-blue/30 rounded-xl p-6 md:p-8 space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">RSS Feed URL:</p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <code className="flex-1 px-4 py-3 bg-background/50 rounded-lg border border-border/50 text-xs text-muted-foreground overflow-auto font-mono break-all">
                    {RSS_FEED_URL}
                  </code>
                  <button
                    onClick={handleCopyRSS}
                    className="flex-shrink-0 px-4 py-3 rounded-lg bg-neon-blue hover:bg-neon-blue/90 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    {copiedToClipboard ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span className="hidden sm:inline">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span className="hidden sm:inline">Copy URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-4 space-y-3 border-t border-neon-blue/20">
                <p className="text-sm text-muted-foreground font-medium">Subscribe with your podcast app:</p>

                {/* Podcast App Buttons Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <a
                    href={`podcasts://podcasts.apple.com/podcast/win-the-night-productions/id1713936873`}
                    className="px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-xs font-semibold transition-all duration-300 text-center"
                  >
                    Apple Podcasts
                  </a>
                  <a
                    href={`https://open.spotify.com/show/3XVqPrLkFrRzjjWF6rXNgc`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-semibold transition-all duration-300 text-center"
                  >
                    Spotify
                  </a>
                  <a
                    href={`https://pca.st/subscribe?url=${encodeURIComponent(RSS_FEED_URL)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-all duration-300 text-center"
                  >
                    Pocket Casts
                  </a>
                  <a
                    href={`https://overcast.fm/subscribe?url=${encodeURIComponent(RSS_FEED_URL)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold transition-all duration-300 text-center"
                  >
                    Overcast
                  </a>
                  <a
                    href={`https://castro.fm/subscribe?url=${encodeURIComponent(RSS_FEED_URL)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all duration-300 text-center"
                  >
                    Castro
                  </a>
                  <button
                    onClick={handleOpenRSSInApp}
                    className="px-3 py-2 rounded-lg bg-neon-blue hover:bg-neon-blue/90 text-white text-xs font-semibold transition-all duration-300 text-center"
                  >
                    More Apps
                  </button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Click your favorite app above, or use the RSS URL below in any other podcast app.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
};

export default Listen;
