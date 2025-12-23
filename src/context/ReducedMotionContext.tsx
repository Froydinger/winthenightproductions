import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ReducedMotionContextType {
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
}

const ReducedMotionContext = createContext<ReducedMotionContextType | undefined>(undefined);

export const ReducedMotionProvider = ({ children }: { children: ReactNode }) => {
  const [reducedMotion, setReducedMotion] = useState(() => {
    // Check localStorage first, then system preference
    const stored = localStorage.getItem("reducedMotion");
    if (stored !== null) {
      return stored === "true";
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    localStorage.setItem("reducedMotion", String(reducedMotion));
  }, [reducedMotion]);

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => !prev);
  };

  return (
    <ReducedMotionContext.Provider value={{ reducedMotion, toggleReducedMotion }}>
      {children}
    </ReducedMotionContext.Provider>
  );
};

export const useReducedMotion = () => {
  const context = useContext(ReducedMotionContext);
  if (!context) {
    throw new Error("useReducedMotion must be used within a ReducedMotionProvider");
  }
  return context;
};
