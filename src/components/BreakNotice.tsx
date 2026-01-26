const BreakNotice = ({ variant = "default" }: { variant?: "banner" | "section" | "card" | "default" }) => {
  const isBanner = variant === "banner";
  const isSection = variant === "section";
  const isCard = variant === "card";

  if (isBanner) {
    return (
      <div className="w-full bg-gradient-to-r from-purple-500/30 to-neon-blue/30 border-b border-neon-blue/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 py-3 md:py-4">
          <a
            href="https://youtube.com/@winthenight?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 group"
          >
            <p className="text-xs md:text-sm text-white/90 group-hover:text-white transition-colors text-center">
              <span className="font-bold text-neon-blue">We're on a short break!</span>
              <span className="hidden md:inline md:mx-2">·</span>
              <span>Back January 26th</span>
            </p>
            <p className="text-xs md:text-sm text-neon-blue font-semibold group-hover:text-neon-blue/80 transition-colors whitespace-nowrap">
              Subscribe to be notified →
            </p>
          </a>
        </div>
      </div>
    );
  }

  if (isCard) {
    return (
      <a
        href="https://youtube.com/@winthenight?sub_confirmation=1"
        target="_blank"
        rel="noopener noreferrer"
        className="block p-5 md:p-6 rounded-xl bg-gradient-to-r from-purple-500/20 to-neon-blue/20 border border-neon-blue/40 hover:border-neon-blue/70 transition-all duration-300 group shadow-lg hover:shadow-xl mb-8"
      >
        <p className="text-sm md:text-base text-center text-white mb-1">
          <span className="font-bold text-neon-blue">We're on a short break!</span>
        </p>
        <p className="text-sm md:text-base text-center text-white/90 mb-2">
          The Podcast will be back January 26th
        </p>
        <p className="text-xs md:text-sm text-center text-neon-blue font-semibold group-hover:text-neon-blue/80 transition-colors">
          Subscribe to be notified when we return →
        </p>
      </a>
    );
  }

  if (isSection) {
    return (
      <section className="relative px-4 md:px-12 lg:px-24 pb-8">
        <div className="max-w-7xl mx-auto">
          <a
            href="https://youtube.com/@winthenight?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 md:p-6 rounded-xl bg-gradient-to-r from-purple-500/20 to-neon-blue/20 border border-neon-blue/40 hover:border-neon-blue/70 transition-all duration-300 group shadow-lg hover:shadow-xl"
          >
            <p className="text-sm md:text-base text-center text-white mb-1">
              <span className="font-bold text-neon-blue">We're on a short break!</span>
            </p>
            <p className="text-sm md:text-base text-center text-white/90 mb-2">
              The Podcast will be back January 26th
            </p>
            <p className="text-xs md:text-sm text-center text-neon-blue font-semibold group-hover:text-neon-blue/80 transition-colors">
              Subscribe to be notified when we return →
            </p>
          </a>
        </div>
      </section>
    );
  }

  return null;
};

export default BreakNotice;
