import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WatchLatestSection = () => {
  const navigate = useNavigate();

  // Chapter 7 playlist embed. This is stable and does not depend on any API hooks.
  const chapter7PlaylistSrc = "https://www.youtube.com/embed/videoseries?list=PL4DJfmhGyz_7B1Qw7Y7GP1vhgtRTi48LD";

  return (
    <section className="relative py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[2fr,1fr] gap-10 items-stretch">
        {/* Latest Episode card */}
        <div className="bg-card/80 border border-border/50 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10">
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
              src={chapter7PlaylistSrc}
              title="Win The Night – Latest Chapter 7 Playlist"
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
              Go to Watch page
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/watch/chapter-7")}
              className="text-xs md:text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
            >
              Jump straight to Chapter 7
            </button>
          </div>
        </div>

        {/* Small side card for context or CTA */}
        <div className="flex flex-col justify-between gap-4 bg-card/80 border border-border/50 rounded-2xl p-6 shadow-xl">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">New here?</h3>
            <p className="text-sm text-muted-foreground">
              The watch hub pulls together full episodes, chapters, and highlights in one place so you can drop in where
              it feels right.
            </p>
          </div>
          <button
            onClick={() => window.open("https://www.youtube.com/@winthenight?sub_confirmation=1", "_blank")}
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold bg-gradient-to-r from-neon-blue to-blue-600 text-white shadow-lg shadow-neon-blue/25 hover:shadow-neon-blue/40 transition-transform hover:-translate-y-0.5"
          >
            Open channel on YouTube
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WatchLatestSection;
