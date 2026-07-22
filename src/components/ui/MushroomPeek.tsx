"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { MushroomBubble, MushroomSVG, useMushroomVoice } from "@/components/ui/MushroomMascot";

const DWELL_MS = 60_000; // he peeks up after a minute on the page
const VISIBLE_MS = 6_000; // stays up ~6s (silent) then tucks back down
const SPEAK_MS = 7_000; // once clicked, how long his words linger before he goes

/**
 * A gentle, non-intrusive cameo on repeat: after each minute spent on the same
 * page, the mushroom peeks up from the bottom-left corner — silently, just a
 * friendly hello. If the visitor clicks him while he's up he shares a word;
 * otherwise he simply tucks back down after a few seconds, then re-arms.
 * Resets on navigation, and stays quiet if the footer mushroom is already on
 * screen so he never doubles up or interrupts.
 */
export function MushroomPeek() {
  const pathname = usePathname();
  const nextPhrase = useMushroomVoice();
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [phrase, setPhrase] = useState<string | null>(null);
  const [blink, setBlink] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  // Stable handles so the click handler and the effect share the same cycle.
  const showRef = useRef<() => void>(() => {});
  const hideRef = useRef<() => void>(() => {});

  // Re-arm the whole cycle whenever the route changes.
  useEffect(() => {
    const footerMascotInView = () => {
      const el = document.querySelector("[data-mushroom-home]");
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    const hide = () => {
      setVisible(false);
      setPhrase(null);
      timers.current.push(window.setTimeout(() => showRef.current(), DWELL_MS)); // re-arm
    };

    const show = () => {
      // Don't interrupt if the tab is hidden or the footer mushroom is already visible.
      if (document.visibilityState !== "visible" || footerMascotInView()) {
        timers.current.push(window.setTimeout(() => showRef.current(), 20_000)); // try again later
        return;
      }
      setPhrase(null);
      setVisible(true); // rises silently — no bubble unless he's clicked
      timers.current.push(window.setTimeout(() => hideRef.current(), VISIBLE_MS));
    };

    showRef.current = show;
    hideRef.current = hide;

    clearTimers();
    setVisible(false);
    setPhrase(null);
    timers.current.push(window.setTimeout(() => showRef.current(), DWELL_MS));
    return clearTimers;
  }, [pathname, clearTimers]);

  // Click while he's peeking → he speaks, and lingers a little longer to be read.
  const speak = () => {
    const pick = nextPhrase();
    if (!pick) return;
    setPhrase(pick);
    clearTimers(); // cancel the silent auto-hide
    timers.current.push(window.setTimeout(() => hideRef.current(), SPEAK_MS));
  };

  // A soft blink while he's up.
  useEffect(() => {
    if (!visible) return;
    const id = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 150);
    }, 2500);
    return () => window.clearInterval(id);
  }, [visible]);

  const hidden = { opacity: 0, y: reduceMotion ? 0 : 54 };
  const shown = { opacity: 1, y: 0 };

  return (
    <div className="pointer-events-none fixed bottom-0 left-4 z-40 md:left-6">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={hidden}
            animate={shown}
            exit={hidden}
            transition={{ duration: reduceMotion ? 0.25 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* bubble only appears once he's been clicked */}
            <AnimatePresence>
              {phrase && (
                <motion.div
                  key={phrase}
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute bottom-full left-0 mb-2 w-max max-w-[min(70vw,15rem)]"
                >
                  <MushroomBubble text={phrase} align="left" />
                </motion.div>
              )}
            </AnimatePresence>
            <button
              type="button"
              aria-label="A little word from the mushroom"
              onClick={speak}
              className="pointer-events-auto block cursor-pointer"
              style={{ opacity: 0.97, transformOrigin: "bottom center" }}
            >
              <MushroomSVG blink={blink} gaze={1} smiling={!!phrase} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
