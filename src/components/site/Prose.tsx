import type { ReactNode } from "react";

interface ProseProps {
  children: ReactNode;
  className?: string;
}

/**
 * Long-form prose container with site-matching typography.
 * Tuned for Legal / Privacy / Terms style pages.
 */
export const Prose = ({ children, className = "" }: ProseProps) => {
  return (
    <div
      className={`prose-site max-w-none text-foreground/85 leading-relaxed
        [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-10 [&>h2]:mb-4
        [&>h3]:text-lg [&>h3]:sm:text-xl [&>h3]:font-semibold [&>h3]:text-foreground [&>h3]:mt-6 [&>h3]:mb-3
        [&>p]:my-4 [&>p]:text-base [&>p]:sm:text-lg [&>p]:leading-relaxed
        [&>ul]:my-4 [&>ul]:pl-6 [&>ul]:list-disc [&>ul>li]:my-2
        [&>ol]:my-4 [&>ol]:pl-6 [&>ol]:list-decimal [&>ol>li]:my-2
        [&_a]:text-neon-blue [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-neon-blue/40 hover:[&_a]:text-neon-blue/80
        [&>blockquote]:border-l-2 [&>blockquote]:border-neon-blue/50 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-foreground/70 [&>blockquote]:my-6
        ${className}`}
    >
      {children}
    </div>
  );
};
