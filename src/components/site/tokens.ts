// Canonical class strings used across every redesigned page so we don't
// re-derive them. All colors flow through semantic tokens (neon-blue,
// background, foreground). No backdrop-blur (perf w/ AnimatedBackground).

export const siteLinkCls =
  "text-neon-blue underline underline-offset-4 decoration-neon-blue/40 hover:text-neon-blue/80 hover:decoration-neon-blue transition-colors";

export const siteCardCls =
  "rounded-2xl border border-neon-blue/15 bg-background/60 p-6 sm:p-8 shadow-[0_0_40px_-20px_rgba(0,217,255,0.25)]";

export const siteCardStrongCls =
  "rounded-2xl border border-neon-blue/30 bg-background/80 p-6 sm:p-8 shadow-[0_0_30px_-10px_rgba(0,217,255,0.4)]";

export const siteCardAlertCls =
  "rounded-2xl border-2 border-red-500/70 bg-background/70 p-6 sm:p-8 shadow-[0_0_40px_-15px_rgba(239,68,68,0.5)]";
