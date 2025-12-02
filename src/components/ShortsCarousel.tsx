import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const ShortsCarousel = () => {
  const shortsFeedUrl = "https://www.youtube.com/@winthenight/shorts";
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section className="relative py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-7 w-1 bg-neon-blue rounded-full" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground m-0">Shorts and clips</h2>
        </div>

        <p className="text-sm md:text-base text-muted-foreground mb-10 max-w-2xl mx-auto">
          Fast moments from the show. Tap below to view our shorts feed.
        </p>

        {/* Shorts CTA - opens modal with iframe */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="inline-flex items-center gap-4 px-10 py-4 rounded-full font-semibold text-base bg-[#FF0000] text-white shadow-2xl shadow-black/40 hover:shadow-black/60 transition-transform hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" aria-hidden="true">
              <path fill="currentColor" d="M10 8.5v7l5.5-3.5L10 8.5z" />
            </svg>
            <span>Watch Shorts</span>
          </button>
        </div>
      </div>

      {/* Dialog with iframe for shorts feed */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-7xl h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center justify-between">
              <span>Win The Night Shorts</span>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="gap-2"
              >
                <a
                  href={shortsFeedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in YouTube
                </a>
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 p-6 pt-4">
            <iframe
              src={shortsFeedUrl}
              className="w-full h-full rounded-lg border-0"
              title="Win The Night Shorts Feed"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ShortsCarousel;
