import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { defaultSiteSettings, fetchSiteSettings } from "@/lib/site-settings";

const WatchLatestSection = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(defaultSiteSettings);

  useEffect(() => {
    fetchSiteSettings().then(setSettings);
  }, []);

  return (
    <section className="relative py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[2fr,1fr] gap-10 items-stretch">
        {/* Latest Episode card */}
        <div className="bg-card/40 backdrop-blur-sm border border-border/30 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/5">
          <div className="px-6 pt-6 flex items-center gap-3">
            <div className="h-7 w-1 rounded-full bg-neon-blue" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground m-0">Watch the latest</h2>
          </div>

          <p className="px-6 mt-2 mb-4 text-sm md:text-base text-muted-foreground max-w-xl">
            Start with our current chapter for fresh conversations on mental health, connection, and real life.
          </p>

          <div className="relative w-full aspect-video bg-black">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/videoseries?list=${settings.watch_latest_playlist_id}`}
              title="Win The Night – Latest Chapter"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/40">
            <button
              onClick={() => navigate("/watch")}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold bg-neon-blue text-white hover:bg-neon-blue/90 transition-colors"
            >
              Go to Watch Hub
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate(settings.watch_latest_button_link)}
              className="text-xs md:text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
            >
              {settings.watch_latest_button_text}
            </button>
          </div>
        </div>

        {/* Side support + CTA card */}
        <div className="flex flex-col justify-between gap-4 bg-card/40 backdrop-blur-sm border border-border/30 rounded-2xl p-6 shadow-xl">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">New here?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The watch hub pulls together full episodes, chapters, and highlights in one place so you can drop in where
              it feels right.
            </p>

            <p className="text-sm text-foreground font-medium mb-5">
              If you want to support us for free, and make sure you see ALL of our updates, subscribe to us on YouTube!
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/watch")}
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold bg-neon-blue text-white hover:bg-neon-blue/90 transition-colors"
            >
              <Play className="w-4 h-4" />
              Open the Watch Hub
            </button>

            <button
              onClick={() => window.open("https://www.youtube.com/@winthenight?sub_confirmation=1", "_blank")}
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold bg-gradient-to-r from-neon-blue to-blue-600 text-white shadow-lg shadow-neon-blue/25 hover:shadow-neon-blue/40 transition-transform hover:-translate-y-0.5"
            >
              Open channel on YouTube
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WatchLatestSection;
