import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus, Play, Pause, ExternalLink, ChevronDown } from "lucide-react";
import { useSubstackPodcast } from "@/hooks/use-substack-podcast";
import { useSubstackFeed } from "@/hooks/use-substack-feed";
import { useAudio, AudioEpisode } from "@/context/AudioContext";
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

const Listen = () => {
  const navigate = useNavigate();
  const { data: podcastEpisodes = [], isLoading: isPodcastLoading } = useSubstackPodcast(100);
  const { data: allPosts = [], isLoading: isFeedLoading } = useSubstackFeed();
  const { currentEpisode, isPlaying, setCurrentEpisode, setIsPlaying, currentTime, duration } = useAudio();
  const [expandedEpisodeId, setExpandedEpisodeId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handlePlayEpisode = (episode: any) => {
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

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <Header />

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-neon-blue/20 to-purple-500/20 rounded-2xl p-4 border border-neon-blue/30 shadow-lg">
                <img
                  src={logo}
                  alt="Win The Night Podcast"
                  className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(93,204,255,0.4)]"
                />
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
              Listen to Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-blue-500">
                Podcast
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-zinc-100 max-w-2xl mx-auto leading-relaxed font-medium mb-8">
              Dive into real conversations about mental health, human connection, and honest experiences. Available on all your favorite podcast platforms.
            </p>

            {/* Substack CTA */}
            <div>
              <a
                href={SUBSTACK_PODCAST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-3 rounded-full font-semibold text-base bg-gradient-to-r from-neon-blue to-blue-600 text-white shadow-lg shadow-neon-blue/25 hover:shadow-neon-blue/40 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Listen on Substack</span>
              </a>
            </div>
          </div>
        </section>

        {/* NOW PLAYING SECTION */}
        {currentEpisode && (
          <section className="relative py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-neon-blue/10 to-purple-500/10 border border-neon-blue/30 rounded-2xl overflow-hidden">
                <div className="p-6 md:p-8 space-y-6">
                  {/* Header */}
                  <div>
                    <p className="text-xs font-semibold text-neon-blue uppercase tracking-wider mb-2">
                      Now Playing
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      {currentEpisode.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatDate(currentEpisode.pubDate)}
                    </p>
                  </div>

                  {/* Play Controls */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-neon-blue to-purple-500 hover:from-neon-blue/90 hover:to-purple-500/90 text-white flex items-center justify-center transition-all duration-200 shadow-[0_0_15px_rgba(93,204,255,0.3)]"
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6 ml-0.5" />
                      )}
                    </button>

                    <div className="flex-1 space-y-2">
                      <div className="h-2 bg-background/50 rounded-full overflow-hidden">
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

                  {/* Description */}
                  {currentEpisode.description && (
                    <div className="pt-4 border-t border-neon-blue/20">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {currentEpisode.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* EPISODES GRID */}
        <section className="relative py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1 bg-neon-blue rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">All Episodes</h2>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-24 bg-background/50 rounded-xl animate-pulse border border-border/30" />
                ))}
              </div>
            ) : episodes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {episodes.map((episode) => (
                  <div
                    key={episode.id}
                    className="group bg-card/40 border border-border/50 rounded-xl overflow-hidden hover:border-neon-blue/50 transition-all duration-300"
                  >
                    <div className="p-4 space-y-3">
                      {/* Header Row */}
                      <div className="flex items-start gap-3">
                        {/* Play Icon */}
                        <button
                          onClick={() => handlePlayEpisode(episode)}
                          className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 ${
                            currentEpisode?.id === episode.id
                              ? "bg-gradient-to-r from-neon-blue to-purple-500 text-white"
                              : "bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue"
                          }`}
                        >
                          {currentEpisode?.id === episode.id && isPlaying ? (
                            <Pause className="h-5 w-5" />
                          ) : (
                            <Play className="h-5 w-5 ml-0.5" />
                          )}
                        </button>

                        {/* Episode Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-neon-blue transition-colors">
                            {episode.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(episode.pubDate)}
                          </p>
                        </div>

                        {/* Expand Button */}
                        {episode.description && (
                          <button
                            onClick={() =>
                              setExpandedEpisodeId(
                                expandedEpisodeId === episode.id ? null : episode.id
                              )
                            }
                            className="flex-shrink-0 p-1.5 hover:bg-accent rounded transition-colors"
                          >
                            <ChevronDown
                              className={`h-4 w-4 text-muted-foreground transition-transform ${
                                expandedEpisodeId === episode.id ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Expanded Description */}
                      {expandedEpisodeId === episode.id && episode.description && (
                        <div className="pt-3 border-t border-border/30 space-y-3">
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {episode.description}
                          </p>
                          <a
                            href={episode.audioUrl}
                            download
                            className="inline-flex items-center gap-1 text-xs text-neon-blue hover:text-neon-blue/80 transition-colors font-medium"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Download Episode
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg">No episodes available yet</p>
                <p className="text-sm mt-2">Check back soon for new content!</p>
              </div>
            )}

            {/* View All on Substack */}
            {episodes.length > 0 && (
              <div className="mt-12 text-center">
                <a
                  href={SUBSTACK_PODCAST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-neon-blue/30 bg-neon-blue/5 hover:bg-neon-blue/10 text-neon-blue font-medium transition-all duration-200 hover:border-neon-blue/60"
                >
                  <ExternalLink className="h-4 w-4" />
                  View All Episodes on Substack
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Community Update CTA */}
        <section className="relative py-12 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neon-blue/10 via-card/60 to-charcoal/40 backdrop-blur-glass border-2 border-neon-blue/30 p-6 sm:p-12 hover:border-neon-blue/50 transition-all duration-300">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,217,255,0.1),transparent_70%)]" />
              <div className="relative z-10 space-y-4 sm:space-y-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                  Have something to share?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2">
                  Join the conversation and share your thoughts, stories, or updates with our community.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-neon-blue hover:bg-neon-blue/90 text-black shadow-neon hover:shadow-[0_0_30px_hsl(var(--neon-blue))] transition-all duration-300 hover:scale-105 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 h-auto w-full sm:w-auto"
                >
                  <a href="/updates" className="flex items-center justify-center gap-2 whitespace-nowrap">
                    <MessageSquarePlus className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span>Post an Update!</span>
                  </a>
                </Button>
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
