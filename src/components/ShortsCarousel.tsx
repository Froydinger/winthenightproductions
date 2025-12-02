const ShortsCarousel = () => {
  const shortsFeedUrl = "https://www.youtube.com/@winthenight/shorts";
  const channelShortsEmbed = "https://www.youtube.com/embed?listType=user_uploads&list=UCuFlxR-Ol8zzda9Z6CJkwkA";

  return (
    <section className="relative py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-7 w-1 bg-neon-blue rounded-full" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground m-0">Shorts and clips</h2>
        </div>

        <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-2xl">
          Fast moments from the show. Tap to jump straight into the live shorts feed.
        </p>

        <div className="relative w-full aspect-video bg-card rounded-2xl overflow-hidden border border-border/50 shadow-2xl ring-1 ring-white/10">
          <iframe
            className="w-full h-full"
            src={channelShortsEmbed}
            title="Win The Night Shorts"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        {/* Red Shorts Button */}
        <div className="mt-6 flex justify-center">
          <a
            href={shortsFeedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full font-semibold text-base bg-[#FF0000] text-white shadow-lg shadow-black/40 hover:shadow-black/60 transition-transform hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" aria-hidden="true">
              <path fill="currentColor" d="M10 8.5v7l5.5-3.5L10 8.5z" />
            </svg>
            <span>Watch Shorts on YouTube</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ShortsCarousel;
