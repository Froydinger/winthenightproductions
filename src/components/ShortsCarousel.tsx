import { useCallback } from "react";

type ShortItem = {
  id: string;
  title: string;
  description?: string;
};

const shorts: ShortItem[] = [
  {
    id: "dQw4w9WgXcQ", // placeholder, swap to your short id
    title: "When the night finally makes sense",
    description: "A quick moment about actually feeling seen.",
  },
  {
    id: "-7-R4fl4ubU", // you can replace with a true short
    title: "The conversation that changed everything",
    description: "A clip about honest friendship and showing up.",
  },
  {
    id: "Zi_XLOBDo_Y", // placeholder
    title: "You are not falling behind",
    description: "Micro pep talk for late bloomers and night owls.",
  },
];

const ShortsCarousel = () => {
  const openShort = useCallback((id: string) => {
    window.open(`https://www.youtube.com/shorts/${id}`, "_blank");
  }, []);

  return (
    <section className="relative py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-7 w-1 bg-neon-blue rounded-full" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground m-0">Shorts and clips</h2>
        </div>

        <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-2xl">
          Tiny episodes for people scrolling between everything else. Tap a tile to open the short on YouTube.
        </p>

        <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-thin scrollbar-thumb-zinc-700/70 scrollbar-track-transparent">
          {shorts.map((item) => (
            <button
              key={item.id}
              onClick={() => openShort(item.id)}
              className="group relative flex-shrink-0 w-[260px] md:w-[300px] aspect-[9/16] rounded-2xl overflow-hidden bg-card border border-border/60 shadow-2xl ring-1 ring-white/5 text-left"
            >
              {/* Thumbnail */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://img.youtube.com/vi/${item.id}/hqdefault.jpg)`,
                }}
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/60 transition-colors" />

              {/* Red play button */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-[#FF0000] shadow-lg shadow-black/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-white ml-1" aria-hidden="true">
                    <path fill="currentColor" d="M10 8.5v7l5.5-3.5L10 8.5z" />
                  </svg>
                </div>
              </div>

              {/* Text content */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-xs uppercase tracking-wide text-zinc-300 mb-1">Win The Night short</p>
                <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">{item.title}</h3>
                {item.description && <p className="text-xs text-zinc-300 line-clamp-2">{item.description}</p>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShortsCarousel;
