import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const NEWSLETTER_SEEN_KEY = "wtn_newsletter_prompt_seen_v1";

const SUBSTACK_EMBED_URL = "https://winthenight.substack.com/embed";

const SubstackEmbed = ({ height = 380 }: { height?: number }) => (
  <div className="w-full overflow-hidden rounded-2xl bg-transparent shadow-[0_0_20px_-4px_rgba(0,217,255,0.25)]">
    <iframe
      src={SUBSTACK_EMBED_URL}
      title="Subscribe to Win The Night on Substack"
      width="100%"
      height={height}
      frameBorder={0}
      scrolling="no"
      style={{ display: "block", width: "100%", background: "transparent" }}
    />
  </div>
);

/** Inline embed in a slightly rounded rectangle — no title, no button. */
const NewsletterSubscribe = () => (
  <div className="w-full max-w-md">
    <SubstackEmbed />
  </div>
);

/** Dialog wrapper for header buttons. Renders only the embed inside the modal. */
export const NewsletterDialog = ({
  children,
  open,
  onOpenChange,
}: {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (o: boolean) => void;
}) => {
  const [internal, setInternal] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internal;
  const setOpen = (next: boolean) => {
    if (next) {
      try { localStorage.setItem(NEWSLETTER_SEEN_KEY, "1"); } catch { /* ignore */ }
    }
    if (isControlled) onOpenChange?.(next);
    else setInternal(next);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-md p-3 pt-10 bg-transparent border-none shadow-none">
        <SubstackEmbed height={360} />
      </DialogContent>
    </Dialog>
  );
};

/**
 * Auto-opens the newsletter dialog once per browser for new visitors.
 * Once the user opens or dismisses it, we set a localStorage flag and never show again.
 */
export const NewsletterAutoPrompt = ({ delayMs = 8000 }: { delayMs?: number }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem(NEWSLETTER_SEEN_KEY)) return;
    } catch {
      return;
    }
    const t = window.setTimeout(() => setOpen(true), delayMs);
    return () => window.clearTimeout(t);
  }, [delayMs]);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      try {
        localStorage.setItem(NEWSLETTER_SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
    }
  };

  return <NewsletterDialog open={open} onOpenChange={handleOpenChange} />;
};

export default NewsletterSubscribe;
