"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { MushroomBubble, MushroomSVG, useMushroomVoice } from "@/components/ui/MushroomMascot";

const DWELL_MS = 60_000; // pop up after a minute on the same page
const VISIBLE_MS = 6_000; // stay for 6s, then tuck back down

/**
 * A gentle, non-intrusive cameo on repeat: after each minute spent on the same
 * page, the mushroom peeks up from the bottom-left corner, offers one word,
 * slides away after 6 seconds — then the cycle re-arms, so he returns a minute
 * later with the next line. Resets on navigation, and stays quiet if the footer
 * mushroom is already on screen, so he never doubles up or interrupts.
 */
export function MushroomPeek() {
  const pathname = usePathname();
  const nextPhrase = useMushroomVoice();
  const reduceMotion = useReducedMotion();
  const [phrase, setPhrase] = useState<string | null>(null);
  const [blink, setBlink] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  // Re-arm the dwell timer whenever the route changes.
  useEffect(() => {
    clearTimers();
    setPhrase(null);

    const footerMascotInView = () => {
      const el = document.querySelector("[data-mushroom-home]");
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    const show = () => {
      // Don't interrupt if the tab is hidden or the footer mushroom is already visible.
      if (document.visibilityState !== "visible" || footerMascotInView()) {
        timers.current.push(window.setTimeout(show, 20_000)); // try again a bit later
        return;
      }
      const pick = nextPhrase();
      if (!pick) return;
      setPhrase(pick);
      timers.current.push(
        window.setTimeout(() => {
          setPhrase(null);
          // …and back down he goes — re-arm so he returns after the next dwell.
          timers.current.push(window.setTimeout(show, DWELL_MS));
        }, VISIBLE_MS),
      );
    };

    timers.current.push(window.setTimeout(show, DWELL_MS));
    return clearTimers;
  }, [pathname, nextPhrase]);

  // A soft blink while he's visible.
  useEffect(() => {
    if (!phrase) return;
    const id = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 150);
    }, 2500);
    return () => window.clearInterval(id);
  }, [phrase]);

  const hidden = { opacity: 0, y: reduceMotion ? 0 : 54 };
  const shown = { opacity: 1, y: 0 };

  return (
    <div className="pointer-events-none fixed bottom-0 left-4 z-40 md:left-6">
      <AnimatePresence>
        {phrase && (
          <motion.div
            initial={hidden}
            animate={shown}
            exit={hidden}
            transition={{ duration: reduceMotion ? 0.25 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute bottom-full left-0 mb-2 w-max max-w-[min(70vw,15rem)]">
              <MushroomBubble text={phrase} align="left" />
            </div>
            <button
              type="button"
              aria-label="Thank the mushroom"
              onClick={() => setPhrase(null)}
              className="pointer-events-auto block cursor-pointer"
              style={{ opacity: 0.97, transformOrigin: "bottom center" }}
            >
              <MushroomSVG blink={blink} gaze={1} smiling />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
