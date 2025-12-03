import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";

const Shorts = () => {
  const navigate = useNavigate();
  const shortsPlaylistUrl = "https://www.youtube.com/playlist?list=PL4DJfmhGyz_5Fa4iQSpQuOTSH4XXCFL1J";

  return (
    <div className="min-h-screen relative">
      {/* Global Animated Background */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 text-foreground hover:text-neon-blue"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Shorts & Clips
            </h1>
            <p className="text-muted-foreground text-lg">
              Fast moments from the show. Watch our latest shorts below.
            </p>
          </div>

          {/* Embedded YouTube Playlist in 9:16 aspect ratio */}
          <div className="w-full max-w-md mx-auto aspect-[9/16] rounded-lg overflow-hidden border-2 border-border/50 shadow-2xl mb-6">
            <iframe
              src="https://www.youtube.com/embed/videoseries?list=PL4DJfmhGyz_5Fa4iQSpQuOTSH4XXCFL1J"
              className="w-full h-full"
              title="Shorts & Clips Playlist"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Open on YouTube Button */}
          <div className="flex justify-center mb-12">
            <Button
              variant="outline"
              asChild
              className="gap-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            >
              <a
                href={shortsPlaylistUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4" />
                Watch on YouTube
              </a>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Shorts;
