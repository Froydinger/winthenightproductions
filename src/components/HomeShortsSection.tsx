import ShortsCarousel from "@/components/ShortsCarousel";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

const HomeShortsSection = () => {
  return (
    <section className="relative py-16 md:py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-8 w-1 bg-red-500 rounded-full" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Shorts</h2>
        </div>
        <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-2xl">
          Quick clips and highlights from the show. Tap to watch.
        </p>

        <ShortsCarousel />

        <div className="flex justify-center mt-8">
          <Link
            to="/watch/specials"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border-2 border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition-all no-underline"
          >
            View All Shorts & Specials
            <Play className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeShortsSection;
