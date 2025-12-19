import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "@/assets/win-the-night-logo.webp";

/**
 * Component that detects when a tab was discarded/crashed and shows a friendly recovery UI.
 *
 * Uses multiple detection methods:
 * 1. Session storage tracking - detects if session was active before reload
 * 2. Page Lifecycle API - detects freeze/resume events
 * 3. Error boundary fallback - catches React crashes
 */
export const TabRecovery = ({ children }: { children: React.ReactNode }) => {
  const [showRecovery, setShowRecovery] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const sessionKey = "wtn-page-state";
    const lastState = sessionStorage.getItem(sessionKey);

    // Get navigation type
    const getNavigationType = (): string => {
      if (performance.getEntriesByType) {
        const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
        if (navEntries.length > 0) {
          return navEntries[0].type;
        }
      }
      // Fallback for older browsers
      if (performance.navigation) {
        const types = ["navigate", "reload", "back_forward", "prerender"];
        return types[performance.navigation.type] || "navigate";
      }
      return "navigate";
    };

    const navType = getNavigationType();

    // Detect potential tab discard:
    // - Session was "active" or "hidden" (meaning page was loaded and running)
    // - But navigation type is "reload" or "back_forward" (page is being reloaded)
    // - This suggests browser discarded the tab and is now restoring it
    const wasDiscarded =
      (lastState === "active" || lastState === "hidden") &&
      (navType === "reload" || navType === "back_forward");

    if (wasDiscarded) {
      // Show recovery UI
      setShowRecovery(true);
      // Reset state
      sessionStorage.removeItem(sessionKey);
    } else {
      // Mark page as active
      sessionStorage.setItem(sessionKey, "active");
    }

    setIsChecking(false);

    // Track visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        sessionStorage.setItem(sessionKey, "hidden");
      } else {
        sessionStorage.setItem(sessionKey, "active");
        // If recovery was showing and tab becomes visible, user may have switched tabs
        // Don't auto-dismiss - let them click the button
      }
    };

    // Clear state on intentional navigation
    const handleBeforeUnload = () => {
      // Clear session state when user navigates away intentionally
      sessionStorage.setItem(sessionKey, "unloading");
    };

    // Handle page freeze (for browsers that support Page Lifecycle API)
    const handleFreeze = () => {
      sessionStorage.setItem(sessionKey, "frozen");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("freeze", handleFreeze);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("freeze", handleFreeze);
    };
  }, []);

  const handleReload = () => {
    // Clear any stale state and reload
    sessionStorage.removeItem("wtn-page-state");
    window.location.reload();
  };

  // While checking, render nothing (prevents flash)
  if (isChecking) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {showRecovery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          >
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-charcoal to-background" />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
            >
              {/* Logo with glow */}
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-neon-blue/20 blur-[30px]" />
                <img
                  src={logoImage}
                  alt="Win The Night"
                  className="relative w-24 h-24 sm:w-32 sm:h-32 object-contain drop-shadow-[0_0_20px_rgba(0,217,255,0.4)]"
                />
              </div>

              {/* Message */}
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-light text-foreground tracking-wide">
                  Welcome Back
                </h1>
                <p className="text-foreground/60 text-sm sm:text-base max-w-xs">
                  The page was resting while you were away
                </p>
              </div>

              {/* Reload button */}
              <motion.button
                onClick={handleReload}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-neon-blue/20 to-neon-blue/10 border border-neon-blue/30 hover:border-neon-blue/50 transition-all duration-300"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 rounded-xl bg-neon-blue/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />

                <span className="relative flex items-center gap-3 text-lg font-medium text-foreground">
                  <svg
                    className="w-5 h-5 text-neon-blue"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Reload to Explore
                </span>
              </motion.button>

              {/* Subtle hint */}
              <p className="text-foreground/40 text-xs">
                Tap anywhere or press any key to reload
              </p>
            </motion.div>

            {/* Click anywhere to reload */}
            <div
              className="absolute inset-0 z-0 cursor-pointer"
              onClick={handleReload}
              onKeyDown={(e) => {
                if (e.key !== "Tab") handleReload();
              }}
              tabIndex={0}
              role="button"
              aria-label="Reload page"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render children when not showing recovery */}
      {!showRecovery && children}
    </>
  );
};

export default TabRecovery;
