"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { MushroomBubble, MushroomSVG, useMushroomVoice } from "@/components/ui/MushroomMascot";

// He drops by about once a minute, shares a thought tied to the page, and
// tucks away — the gap between visits stays close to 60s.
const FIRST_MIN = 10_000;
const FIRST_MAX = 14_000;
const DWELL_MIN = 50_000;
const DWELL_MAX = 56_000;
const VISIBLE_MS = 9_000; // how long he stays so his words can be read
const SPEAK_MS = 9_000; // once clicked (to hear another), how long it stays

const EDGE = 18; // px inset from the corner

type Side = "left" | "right";

const rnd = (min: number, max: number) => min + Math.random() * (max - min);

/**
 * The saudade guru's cameo. About once a minute he peeks up from a BOTTOM
 * CORNER — always in the empty margin, never over a painting or in the middle
 * of the grid — glances toward the page (what you're reading), then turns to
 * you and shares a thought tied to it (or his wider wisdom). Click him to hear
 * another. He tucks away after a few seconds and returns a minute later. Sits
 * out entirely when the tab is hidden or the footer mushroom is on screen, so
 * he never doubles up.
 */
export function MushroomPeek() {
  const pathname = usePathname();
  const nextPhrase = useMushroomVoice();
  const reduceMotion = useReducedMotion();

  const [visible, setVisible] = useState(false);
  const [side, setSide] = useState<Side>("right");
  const [phrase, setPhrase] = useState<string | null>(null);
  const [blink, setBlink] = useState(false);
  // where he's looking: {x,y} in SVG units (+x right, −x left, −y up toward you)
  const [gaze, setGaze] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [smile, setSmile] = useState(false);

  const timers = useRef<number[]>([]);
  const showRef = useRef<() => void>(() => {});
  const hideRef = useRef<() => void>(() => {});

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  // Re-arm the cycle whenever the route changes.
  useEffect(() => {
    const footerMascotInView = () => {
      const el = document.querySelector("[data-mushroom-home]");
      if (!el) return false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 800;
      return r.top < vh && r.bottom > 0;
    };

    const hide = () => {
      setVisible(false);
      setPhrase(null);
      timers.current.push(window.setTimeout(() => showRef.current(), rnd(DWELL_MIN, DWELL_MAX)));
    };

    const show = () => {
      // Never intrude: skip if the tab is hidden or the footer mushroom is up.
      if (document.visibilityState !== "visible" || footerMascotInView()) {
        timers.current.push(window.setTimeout(() => showRef.current(), 8_000));
        return;
      }
      const s: Side = Math.random() < 0.5 ? "left" : "right";
      setSide(s);
      setPhrase(null);
      setSmile(false);

      // He rises glancing toward the page (what you're reading)...
      const toCentre = s === "left" ? 3 : -3;
      setGaze({ x: toCentre, y: -1 });
      setVisible(true);

      // ...then turns to you, beams, and shares a thought tied to this page.
      timers.current.push(
        window.setTimeout(() => {
          setGaze({ x: 0, y: -0.5 });
          setSmile(true);
          setPhrase(nextPhrase());
        }, 850),
      );
      timers.current.push(window.setTimeout(() => hideRef.current(), VISIBLE_MS));
    };

    showRef.current = show;
    hideRef.current = hide;

    clearTimers();
    setVisible(false);
    setPhrase(null);
    timers.current.push(window.setTimeout(() => showRef.current(), rnd(FIRST_MIN, FIRST_MAX)));
    return clearTimers;
  }, [pathname, clearTimers, nextPhrase]);

  // Soft blink while he's up.
  useEffect(() => {
    if (!visible) return;
    const id = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 150);
    }, 2600);
    return () => window.clearInterval(id);
  }, [visible]);

  // Click while he's up → he looks at you, beams, and shares a word.
  const speak = () => {
    const pick = nextPhrase();
    if (!pick) return;
    setGaze({ x: 0, y: -0.5 });
    setSmile(true);
    setPhrase(pick);
    clearTimers(); // cancel the silent auto-hide
    timers.current.push(window.setTimeout(() => hideRef.current(), SPEAK_MS));
  };

  // a gentle head-tilt toward his glance
  const tilt = reduceMotion ? 0 : gaze.x * 1.1;

  const containerStyle: React.CSSProperties =
    side === "left"
      ? { position: "fixed", left: EDGE, bottom: 0, zIndex: 40 }
      : { position: "fixed", right: EDGE, bottom: 0, zIndex: 40 };

  // bubble opens toward the centre of the screen so it never clips off-edge
  const bubbleSide: Side = side === "left" ? "left" : "right";

  return (
    <div className="pointer-events-none" style={containerStyle}>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.86 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.9 }}
            // a soft, unhurried rise — no bounce, so he simply melts into view
            transition={{ duration: reduceMotion ? 0.3 : 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            style={{ transformOrigin: "bottom center" }}
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
                  className="absolute bottom-full mb-2 w-max max-w-[min(70vw,15rem)]"
                  style={bubbleSide === "left" ? { left: 0 } : { right: 0 }}
                >
                  <MushroomBubble text={phrase} align={bubbleSide} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* head-tilt lives on this wrapper; the eyes glance inside the SVG */}
            <motion.button
              type="button"
              aria-label="A little word from the mushroom"
              onClick={speak}
              className="pointer-events-auto block cursor-pointer"
              style={{ opacity: 0.98, transformOrigin: "bottom center" }}
              animate={{ rotate: tilt }}
              transition={{ type: "spring", stiffness: 70, damping: 18 }}
            >
              <MushroomSVG blink={blink} gaze={gaze.x} gazeY={gaze.y} smiling={smile || !!phrase} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
