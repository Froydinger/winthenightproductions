import { useEffect, type ReactNode } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageShellProps {
  children: ReactNode;
  scrollToTopOnMount?: boolean;
}

/**
 * Canonical page chrome for every public page (except the bespoke lander).
 * Provides fixed AnimatedBackground, sticky Header, content slot, Footer.
 */
export const PageShell = ({ children, scrollToTopOnMount = true }: PageShellProps) => {
  useEffect(() => {
    if (scrollToTopOnMount) window.scrollTo(0, 0);
  }, [scrollToTopOnMount]);

  return (
    <main className="min-h-screen relative bg-background text-foreground">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AnimatedBackground />
      </div>
      <Header />
      <div className="relative z-10 isolate">
        {children}
        <Footer />
      </div>
    </main>
  );
};
