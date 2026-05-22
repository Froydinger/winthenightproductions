import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  icon?: LucideIcon;
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  iconColorCls?: string;
}

export const SectionHeader = ({
  icon: Icon,
  eyebrow,
  title,
  lede,
  align = "left",
  iconColorCls = "text-neon-blue",
}: SectionHeaderProps) => {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <header className={`flex flex-col gap-2 mb-6 ${alignCls}`}>
      {eyebrow && (
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-neon-blue/80">
          {eyebrow}
        </p>
      )}
      <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
        {Icon && <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${iconColorCls}`} />}
        <span>{title}</span>
      </h2>
      {lede && (
        <p className="text-sm sm:text-base text-foreground/65 leading-relaxed max-w-2xl">
          {lede}
        </p>
      )}
    </header>
  );
};
