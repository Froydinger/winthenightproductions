import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface IconTileProps {
  icon: LucideIcon;
  title: string;
  desc?: string;
  href: string;
  external?: boolean;
  /** Accent color class for icon + hover border. Defaults to neon-blue. */
  accent?: "blue" | "red";
}

const ACCENTS = {
  blue: {
    icon: "text-neon-blue",
    border: "border-neon-blue/15 hover:border-neon-blue/50",
    glow: "hover:shadow-[0_0_30px_-12px_rgba(0,217,255,0.5)]",
    arrow: "group-hover:text-neon-blue",
  },
  red: {
    icon: "text-red-400",
    border: "border-red-500/30 hover:border-red-400/70",
    glow: "hover:shadow-[0_0_30px_-12px_rgba(239,68,68,0.5)]",
    arrow: "group-hover:text-red-400",
  },
} as const;

export const IconTile = ({
  icon: Icon,
  title,
  desc,
  href,
  external = false,
  accent = "blue",
}: IconTileProps) => {
  const a = ACCENTS[accent];
  const cls = `group relative rounded-2xl border ${a.border} bg-background/60 p-4 sm:p-5 transition-all hover:-translate-y-0.5 hover:bg-background/80 ${a.glow}`;
  const inner = (
    <>
      {external && (
        <ArrowUpRight
          className={`absolute top-2.5 right-2.5 w-3.5 h-3.5 text-foreground/40 transition-colors ${a.arrow}`}
        />
      )}
      <Icon className={`w-6 h-6 ${a.icon} mb-3 group-hover:scale-110 transition-transform`} />
      <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1 leading-tight">
        {title}
      </h3>
      {desc && (
        <p className="text-xs sm:text-sm text-foreground/65 leading-snug">{desc}</p>
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("sms:")) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={href} className={cls}>
      {inner}
    </Link>
  );
};
