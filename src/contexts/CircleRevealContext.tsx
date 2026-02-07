import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";

type CircleRevealState = {
  active: boolean;
  centerX: number;
  centerY: number;
};

const CircleRevealContext = createContext<{
  startTransition: (centerX: number, centerY: number) => void;
  state: CircleRevealState | null;
} | null>(null);

export function useCircleReveal() {
  const ctx = useContext(CircleRevealContext);
  return ctx;
}

const REVEAL_DURATION = 0.7;
const EASE = [0.33, 1, 0.68, 1] as const; // easeOutExpo — fast start, smooth finish

function CircleRevealOverlay({
  state,
  onComplete,
}: {
  state: CircleRevealState | null;
  onComplete: () => void;
}) {
  if (!state?.active) return null;

  const { centerX, centerY } = state;

  // Mask: overlay is visible everywhere except inside a growing circle (the "hole").
  // Animate radius from 0 to ~2500px so the hole reveals the new page underneath.
  const maskStyle = `radial-gradient(circle at ${centerX}px ${centerY}px, transparent 0%, transparent calc(var(--r) * 1px), black calc(var(--r) * 1px))`;
  return (
    <motion.div
      className="fixed inset-0 z-[9999] pointer-events-auto"
      aria-hidden
      initial={false}
      style={{
        background: "var(--circle-reveal-bg, #e8e4d9)",
        WebkitMaskImage: maskStyle,
        maskImage: maskStyle,
        ['--r' as string]: 0,
      }}
      animate={{ "--r": 2500 } as Record<string, number>}
      transition={{
        duration: REVEAL_DURATION,
        ease: EASE,
      }}
      onAnimationComplete={onComplete}
    />
  );
}

export function CircleRevealProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CircleRevealState | null>(null);

  const startTransition = useCallback((centerX: number, centerY: number) => {
    setState({ active: true, centerX, centerY });
  }, []);

  const clearTransition = useCallback(() => {
    setState(null);
  }, []);

  const value = {
    startTransition,
    state,
  };

  return (
    <CircleRevealContext.Provider value={value}>
      {children}
      <CircleRevealOverlay state={state} onComplete={clearTransition} />
    </CircleRevealContext.Provider>
  );
}
