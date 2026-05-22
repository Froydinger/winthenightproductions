import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface PageHeroProps {
  icon?: LucideIcon;
  eyebrow?: string;
  title: ReactNode;
  /** Word inside `title` to wrap in neon-blue accent. If you pass full JSX as title, ignore. */
  lede?: ReactNode;
  actions?: ReactNode;
}

/**
 * Canonical page hero: icon-in-glow-ring + eyebrow + H1 + lede + optional CTAs.
 * H1 is always the only H1 on the page.
 */
export const PageHero = ({ icon: Icon, eyebrow, title, lede, actions }: PageHeroProps) => {
  return (
    <section className="relative px-4 pt-20 pb-12 sm:pt-28 sm:pb-16">
      <div className="container mx-auto max-w-4xl text-center space-y-6">
        {Icon && (
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-neon-blue/20 blur-2xl" aria-hidden />
              <div className="relative p-4 rounded-2xl border border-neon-blue/30 bg-background/60">
                <Icon className="w-9 h-9 sm:w-10 sm:h-10 text-neon-blue drop-shadow-[0_0_12px_rgba(0,217,255,0.6)]" />
              </div>
            </div>
          </div>
        )}

        {eyebrow && (
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-neon-blue/80">
            {eyebrow}
          </p>
        )}

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-foreground">
          {title}
        </h1>

        {lede && (
          <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {lede}
          </p>
        )}

        {actions && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
            {actions}
          </div>
        )}
      </div>
    </section>
  );
};
