import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const NEWSLETTER_SEEN_KEY = "wtn_newsletter_prompt_seen_v1";

const SUBSTACK_EMBED_URL = "https://winthenight.substack.com/embed";

const SubstackEmbed = ({ height = 320 }: { height?: number }) => (
  <div className="w-full overflow-hidden rounded-2xl bg-white shadow-[0_0_20px_-4px_rgba(0,217,255,0.25)]">
    <iframe
      src={SUBSTACK_EMBED_URL}
      title="Subscribe to Win The Night on Substack"
      width="100%"
      height={height}
      frameBorder={0}
      scrolling="no"
      style={{ display: "block", width: "100%", background: "white" }}
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
  const setOpen = isControlled ? (onOpenChange ?? (() => {})) : setInternal;

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-md p-3 pt-10 bg-transparent border-none shadow-none">
        <SubstackEmbed height={360} />
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterSubscribe;
