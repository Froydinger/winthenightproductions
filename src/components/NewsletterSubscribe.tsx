import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Mail, ExternalLink } from "lucide-react";

const SUBSTACK_EMBED_URL = "https://winthenight.substack.com/embed";
const SUBSTACK_SUBSCRIBE_URL = "https://winthenight.substack.com/subscribe";

const NewsletterSubscribe = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md items-stretch sm:items-center">
        <Button
          onClick={() => setOpen(true)}
          className="bg-neon-blue text-black hover:bg-neon-blue/90 font-semibold flex items-center gap-2"
        >
          <Mail className="w-4 h-4" />
          Subscribe on Substack
        </Button>
        <a
          href={SUBSTACK_SUBSCRIBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-neon-blue inline-flex items-center gap-1 transition-colors"
        >
          Open in new tab <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-background border-neon-blue/30">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle>Join the Win The Night™ Newsletter</DialogTitle>
            <DialogDescription>
              Subscribe via Substack to get new essays, episodes, and reflections in your inbox.
            </DialogDescription>
          </DialogHeader>
          <div className="px-4 pb-4">
            <iframe
              src={SUBSTACK_EMBED_URL}
              title="Subscribe to Win The Night on Substack"
              width="100%"
              height="320"
              style={{ border: "1px solid hsl(var(--border))", background: "white", borderRadius: 8 }}
              frameBorder={0}
              scrolling="no"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewsletterSubscribe;
