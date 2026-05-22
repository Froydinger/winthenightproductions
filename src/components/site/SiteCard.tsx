import type { ReactNode } from "react";
import { siteCardCls, siteCardStrongCls, siteCardAlertCls } from "./tokens";

interface SiteCardProps {
  children: ReactNode;
  variant?: "default" | "strong" | "alert" | "bare";
  className?: string;
  as?: "div" | "article" | "section" | "aside";
  id?: string;
}

export const SiteCard = ({
  children,
  variant = "default",
  className = "",
  as: Tag = "div",
  id,
}: SiteCardProps) => {
  const base =
    variant === "strong"
      ? siteCardStrongCls
      : variant === "alert"
      ? siteCardAlertCls
      : variant === "bare"
      ? "rounded-2xl"
      : siteCardCls;
  return (
    <Tag id={id} className={`${base} ${className}`}>
      {children}
    </Tag>
  );
};
