const ShortsCarousel = () => {
  const shortsFeedUrl = "https://www.youtube.com/@winthenight/shorts";

  return (
    <section className="relative py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-7 w-1 bg-neon-blue rounded-full" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground m-0">Shorts and clips</h2>
        </div>

        <p className="text-sm md:text-base text-muted-foreground mb-10 max-w-2xl mx-auto">
          Fast moments from the show. Tap below to jump straight into the live shorts feed.
        </p>

        {/* ✅ CLEAN, RELIABLE SHORTS CTA */}
        <div className="flex justify-center">
          <a
            href={shortsFeedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-10 py-4 rounded-full font-semibold text-base bg-[#FF0000] text-white shadow-2xl shadow-black/40 hover:shadow-black/60 transition-transform hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" aria-hidden="true">
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
