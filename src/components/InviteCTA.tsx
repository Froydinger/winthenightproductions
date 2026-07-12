import { useEffect, useMemo, useState } from "react";
import { CalendarHeart, CalendarPlus, ExternalLink, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { fetchSiteSettings, type SiteSettings } from "@/lib/site-settings";

const getCountdown = (now: number, target: number) => {
  const diff = target - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
};

const InviteCTA = () => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  // Re-shows automatically for a new event: the key changes with the event config
  const dismissKey = settings
    ? `invite-cta-dismissed:${settings.event_cta_start}:${settings.event_cta_url}`
    : "";

  useEffect(() => {
    fetchSiteSettings().then(setSettings);
  }, []);

  useEffect(() => {
    if (!dismissKey) return;
    try {
      setDismissed(localStorage.getItem(dismissKey) === "true");
    } catch {
      setDismissed(false);
    }
  }, [dismissKey]);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const times = useMemo(() => {
    if (!settings) return null;
    const start = Date.parse(settings.event_cta_start);
    const parsedEnd = Date.parse(settings.event_cta_end);
    const end = !Number.isNaN(parsedEnd)
      ? parsedEnd
      : !Number.isNaN(start)
        ? start + 6 * 3600000
        : NaN;
    return { start, end };
  }, [settings]);

  if (!settings || !settings.event_cta_enabled || dismissed) return null;
  if (times && !Number.isNaN(times.end) && now >= times.end) return null;

  const hasStart = times && !Number.isNaN(times.start);
  const countdown = hasStart ? getCountdown(now, times.start) : null;
  const isLive = hasStart && !countdown;

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(dismissKey, "true");
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
              <span className="hidden md:inline">{settings.event_cta_pill_text}</span>
              <span className="md:hidden">{settings.event_cta_pill_text_short}</span>
            </span>
            {hasStart && (
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
            )}
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
        <DialogContent className="max-w-lg p-0 bg-gradient-to-b from-[#1a0a0a] to-black border-amber-400/30 overflow-hidden">
          <div className="px-6 pt-8 pb-7 text-center bg-gradient-to-r from-red-600/15 via-amber-500/10 to-red-600/15">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-red-400/90">
              You're invited
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-amber-300 mt-2 drop-shadow-[0_0_18px_rgba(251,191,36,0.35)]">
              {settings.event_cta_title}
            </h2>
            <p className="text-sm md:text-base text-white/80 mt-2">{settings.event_cta_details}</p>

            {isLive ? (
              <p className="text-xl font-bold text-amber-400 mt-6 animate-pulse">
                Happening now — see you there!
              </p>
            ) : (
              countdown && (
                <div className="grid grid-cols-4 gap-2 md:gap-3 mt-6 max-w-sm mx-auto">
                  {[
                    { value: countdown.days, label: "Days" },
                    { value: countdown.hours, label: "Hours" },
                    { value: countdown.minutes, label: "Min" },
                    { value: countdown.seconds, label: "Sec" },
                  ].map(({ value, label }) => (
                    <div
                      key={label}
                      className="rounded-xl border border-amber-400/30 bg-black/50 py-3 md:py-4"
                    >
                      <div className="text-2xl md:text-3xl font-bold text-amber-300 tabular-nums drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]">
                        {value}
                      </div>
                      <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 mt-1">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-7">
              <a
                href={settings.event_cta_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-[0_0_24px_rgba(251,191,36,0.35)] hover:shadow-[0_0_36px_rgba(251,191,36,0.55)] hover:brightness-110 transition-all duration-300"
              >
                {settings.event_cta_button_text}
                <ExternalLink className="w-4 h-4" />
              </a>
              {/* Served with text/calendar so iOS opens the native Add to Calendar
                  sheet instead of trapping the file in the download manager */}
              <a
                href="/.netlify/functions/event-ics"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full text-sm font-semibold border border-amber-400/50 text-amber-300 hover:bg-amber-500/15 hover:border-amber-400/80 transition-all duration-300"
              >
                <CalendarPlus className="w-4 h-4" />
                Add to my calendar
              </a>
            </div>
            <p className="text-[11px] text-white/45 mt-4">
              All the details, dress code, and RSVP live on the invite.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InviteCTA;
