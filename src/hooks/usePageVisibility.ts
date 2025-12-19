import { useEffect, useState, useCallback } from "react";

interface PageVisibilityState {
  isVisible: boolean;
  wasDiscarded: boolean;
}

/**
 * Hook to track page visibility state and detect tab discarding
 *
 * Uses the Page Visibility API to pause heavy operations when tab is hidden,
 * and tracks session state to detect when a tab was discarded/crashed.
 */
export const usePageVisibility = (): PageVisibilityState => {
  const [isVisible, setIsVisible] = useState(!document.hidden);
  const [wasDiscarded, setWasDiscarded] = useState(false);

  useEffect(() => {
    // Check if page was discarded on mount
    const sessionKey = "wtn-session-active";
    const wasActive = sessionStorage.getItem(sessionKey);

    // If session was active but page is loading fresh, it was likely discarded
    if (wasActive === "true" && performance.navigation?.type !== 1) {
      // Check if this is a reload vs fresh navigation
      const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
      if (navEntries.length > 0 && navEntries[0].type === "reload") {
        // Normal reload, not a discard
      } else if (wasActive) {
        // Session was active but we're loading fresh - tab was likely discarded
        setWasDiscarded(true);
      }
    }

    // Mark session as active
    sessionStorage.setItem(sessionKey, "true");

    // Clear the flag when page is properly unloaded (navigation away)
    const handleBeforeUnload = () => {
      // Only clear if user is intentionally navigating away
      // (not if browser is just discarding the tab)
    };

    const handleVisibilityChange = () => {
      const visible = !document.hidden;
      setIsVisible(visible);

      if (visible) {
        // Tab became visible again - reset discarded state
        setWasDiscarded(false);
        sessionStorage.setItem(sessionKey, "true");
      }
    };

    // Handle page freeze (Chrome's Page Lifecycle API)
    const handleFreeze = () => {
      // Page is being frozen, mark that we were active
      sessionStorage.setItem(sessionKey, "frozen");
    };

    const handleResume = () => {
      // Page resumed from frozen state
      const state = sessionStorage.getItem(sessionKey);
      if (state === "frozen") {
        sessionStorage.setItem(sessionKey, "true");
      }
      setIsVisible(true);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("freeze", handleFreeze);
    document.addEventListener("resume", handleResume);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("freeze", handleFreeze);
      document.removeEventListener("resume", handleResume);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return { isVisible, wasDiscarded };
};

/**
 * Simpler hook that just returns visibility state
 */
export const useIsTabVisible = (): boolean => {
  const [isVisible, setIsVisible] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isVisible;
};
