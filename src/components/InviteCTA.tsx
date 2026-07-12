import { useEffect, useState } from "react";
import { CalendarHeart, ExternalLink, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const INVITE_URL = "https://invite.social/251st-marine-corps-birthday-chicago";
// Port & Park, Chicago — Nov 8, 2026, 6pm–midnight Central
const EVENT_START = new Date("2026-11-08T18:00:00-06:00").getTime();
const EVENT_END = new Date("2026-11-09T00:00:00-06:00").getTime();
const DISMISS_KEY = "invite-cta-dismissed-mc-ball-2026";

const getCountdown = (now: number) => {
  const diff = EVENT_START - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
};

const InviteCTA = () => {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(DISMISS_KEY) === "true";
    } catch {
      return false;
    }
  });
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (dismissed || now >= EVENT_END) return null;

  const countdown = getCountdown(now);
  const isLive = !countdown;

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // ignore storage errors (private mode)
    }
  };

  return (
    <>
      <div className="fixed top-[4.75rem] left-0 right-0 z-[60] flex justify-center px-3 pointer-events-none">
        <div className="pointer-events-auto mt-1 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-red-600/25 to-amber-500/25 backdrop-blur-md border border-amber-400/40 hover:border-amber-400/70 transition-all duration-300 shadow-lg">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 pl-4 pr-1 py-1 text-xs md:text-sm font-medium text-amber-200 hover:text-amber-100 transition-colors"
          >
            <CalendarHeart className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">
              <span className="hidden md:inline">RSVP for our annual Marine Corps event</span>
              <span className="md:hidden">RSVP · Marine Corps event</span>
            </span>
            <span className="font-semibold text-amber-400 tabular-nums whitespace-nowrap">
              {isLive ? (
                "· Happening now!"
              ) : (
                <>
                  {`· ${countdown.days}d ${countdown.hours}h ${countdown.minutes}m`}
                  <span className="hidden md:inline">{` ${countdown.seconds}s`}</span>
                </>
              )}
            </span>
          </button>
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className="p-1.5 mr-1 rounded-full text-amber-200/60 hover:text-amber-100 hover:bg-white/10 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl p-0 bg-black border-amber-400/30 overflow-hidden">
          <div className="p-4 pb-3 text-center border-b border-amber-400/20 bg-gradient-to-r from-red-600/15 to-amber-500/15">
            <h2 className="text-lg md:text-xl font-bold text-amber-300">
              251st Marine Corps Birthday — Chicago
            </h2>
            <p className="text-xs md:text-sm text-white/80 mt-1">
              Sunday, November 8, 2026 · 6:00 PM – Midnight · Port &amp; Park
            </p>
            <p className="text-sm md:text-base font-semibold text-amber-400 tabular-nums mt-1">
              {isLive
                ? "Happening now — see you there!"
                : `${countdown.days} days ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s to go`}
            </p>
          </div>
          {open && (
            <iframe
              className="w-full h-[60vh] bg-white"
              src={INVITE_URL}
              title="Event invite"
            />
          )}
          <div className="p-3 text-center border-t border-amber-400/20">
            <a
              href={INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold bg-amber-500/20 border border-amber-400/50 text-amber-300 hover:bg-amber-500/30 hover:border-amber-400/80 transition-all duration-300"
            >
              RSVP on the full invite
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <p className="text-[11px] text-white/50 mt-2">
              Invite not loading above? Use the button — it opens the invite in a new tab.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InviteCTA;
