import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { defaultSiteSettings, fetchSiteSettings } from "@/lib/site-settings";

const TrailerButton = () => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(defaultSiteSettings);

  useEffect(() => {
    fetchSiteSettings().then(setSettings);
  }, []);

  if (!settings.trailer_visible) return null;

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-[60] flex justify-center pointer-events-none">
        <button
          onClick={() => setOpen(true)}
          className="pointer-events-auto mt-1 inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-[16px] font-medium bg-neon-blue/20 backdrop-blur-md border border-neon-blue/40 text-neon-blue hover:bg-neon-blue/30 hover:border-neon-blue/60 transition-all duration-300"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          {settings.trailer_button_text}
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black border-border/50 overflow-hidden">
          <div className="aspect-video w-full">
            {open && (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${settings.trailer_video_id}?autoplay=1`}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TrailerButton;
