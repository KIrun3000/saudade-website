"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { MushroomBubble, MushroomSVG, useMushroomVoice } from "@/components/ui/MushroomMascot";

// He shows up here and there — often enough to delight, rare enough not to nag.
const DWELL_MIN = 18_000;
const DWELL_MAX = 34_000;
const VISIBLE_MS = 6_500; // how long he perches (silent) before tucking away
const SPEAK_MS = 7_000; // once clicked, how long his words linger

const MUSH_W = 36;
const MUSH_H = 42;

type Perch = { el: Element; fracX: number };
type Pos = { left: number; top: number; side: "left" | "right" };

const rnd = (min: number, max: number) => min + Math.random() * (max - min);

/** Robust viewport size — never trust a 0 (some embedded/preview contexts
 *  report window.innerHeight as 0 before/around layout). */
function viewport() {
  const w =
    window.innerWidth || document.documentElement.clientWidth || window.screen?.availWidth || 1280;
  const h =
    window.innerHeight || document.documentElement.clientHeight || window.screen?.availHeight || 800;
  return { w, h };
}

/**
 * Find something worth perching on that's comfortably in view — a painting,
 * photo, or image block the visitor is likely looking at. He'll stand on its
 * TOP edge (body above the frame) so he never covers the content. Requires
 * headroom above so a speech bubble fits if he's clicked, and that the block is
 * mostly on screen so he never lands on something scrolled half-away.
 */
function pickPerch(): Perch | null {
  if (typeof document === "undefined") return null;
  const { w: vw, h: vh } = viewport();
  const seen = new Set<Element>();
  const cands: { el: Element; area: number }[] = [];

  const nodes = document.querySelectorAll<HTMLElement>("img, [data-mushroom-perch]");
  nodes.forEach((el) => {
    if (seen.has(el)) return;
    const r = el.getBoundingClientRect();
    const visibleW = Math.min(r.right, vw) - Math.max(r.left, 0);
    const onScreen =
      r.width >= 150 &&
      r.height >= 130 &&
      r.top >= 150 && // headroom above the frame for him + a bubble
      r.top <= vh - 110 && // his frame edge sits in the comfortable middle band
      visibleW >= r.width * 0.7; // most of the block is actually on screen
    if (!onScreen) return;
    seen.add(el);
    cands.push({ el, area: r.width * r.height });
  });

  if (!cands.length) return null;
  // Bias toward the more prominent blocks, but keep variety: pick among the
  // largest handful at random so he lands somewhere fresh each time.
  cands.sort((a, b) => b.area - a.area);
  const pool = cands.slice(0, Math.min(6, cands.length));
  const el = pool[Math.floor(Math.random() * pool.length)].el;
  return { el, fracX: rnd(0.2, 0.8) };
}

export function MushroomPeek() {
  const pathname = usePathname();
  const nextPhrase = useMushroomVoice();
  const reduceMotion = useReducedMotion();

  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState<Pos | null>(null);
  const [phrase, setPhrase] = useState<string | null>(null);
  const [blink, setBlink] = useState(false);
  // gaze story: he looks at the art he's perched on, then up at you, then beams.
  const [gazeDir, setGazeDir] = useState<"content" | "viewer">("content");
  const [smile, setSmile] = useState(false);

  const perchRef = useRef<Perch | null>(null);
  const timers = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const showRef = useRef<() => void>(() => {});
  const hideRef = useRef<() => void>(() => {});

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  // Keep him glued to the frame edge as the page scrolls; tuck away if it drifts
  // out of the comfortable band.
  const reposition = useCallback(() => {
    const p = perchRef.current;
    if (!p) return;
    const r = p.el.getBoundingClientRect();
    const { w: vw, h: vh } = viewport();
    if (r.bottom < 60 || r.top < 90 || r.top > vh - 40 || r.width < 100) {
      hideRef.current();
      return;
    }
    let left = r.left + p.fracX * r.width - MUSH_W / 2;
    left = Math.max(6, Math.min(vw - MUSH_W - 6, left));
    const top = r.top - MUSH_H + 4; // feet grip the top border, body above
    const side: Pos["side"] = left + MUSH_W / 2 < vw / 2 ? "right" : "left";
    setPos({ left, top, side });
  }, []);

  // Re-arm the whole cycle whenever the route changes.
  useEffect(() => {
    const footerMascotInView = () => {
      const el = document.querySelector("[data-mushroom-home]");
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < viewport().h && r.bottom > 0;
    };

    const hide = () => {
      setVisible(false);
      setPhrase(null);
      perchRef.current = null;
      timers.current.push(window.setTimeout(() => showRef.current(), rnd(DWELL_MIN, DWELL_MAX)));
    };

    const show = () => {
      // Never interrupt: skip if the tab is hidden or the footer mushroom is up.
      if (document.visibilityState !== "visible" || footerMascotInView()) {
        timers.current.push(window.setTimeout(() => showRef.current(), 12_000));
        return;
      }
      const perch = pickPerch();
      perchRef.current = perch; // may be null → falls back to the corner
      setPhrase(null);
      setSmile(false);
      setGazeDir("content");
      reposition();
      setVisible(true);

      // the cute beat: glance at the art, then up at you, then a little beam
      timers.current.push(window.setTimeout(() => setGazeDir("viewer"), 1400));
      timers.current.push(window.setTimeout(() => setSmile(true), 2600));
      timers.current.push(window.setTimeout(() => hideRef.current(), VISIBLE_MS));
    };

    showRef.current = show;
    hideRef.current = hide;

    clearTimers();
    setVisible(false);
    setPhrase(null);
    perchRef.current = null;
    timers.current.push(window.setTimeout(() => showRef.current(), rnd(DWELL_MIN, DWELL_MAX)));
    return clearTimers;
  }, [pathname, clearTimers, reposition]);

  // Follow scroll/resize while he's up.
  useEffect(() => {
    if (!visible) return;
    const onMove = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        reposition();
      });
    };
    window.addEventListener("scroll", onMove, { passive: true });
    window.addEventListener("resize", onMove);
    return () => {
      window.removeEventListener("scroll", onMove);
      window.removeEventListener("resize", onMove);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [visible, reposition]);

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
    setGazeDir("viewer");
    setSmile(true);
    setPhrase(pick);
    clearTimers(); // cancel the silent auto-hide
    timers.current.push(window.setTimeout(() => hideRef.current(), SPEAK_MS));
  };

  const corner = !pos; // no perch found → sit in the bottom-left corner
  const gazeY = gazeDir === "content" ? 3.2 : -1.2; // + looks down at the art, − up at you
  const tilt = reduceMotion ? 0 : gazeDir === "content" ? 6 : 0; // a little head-tilt at the art

  const containerStyle: React.CSSProperties = corner
    ? { position: "fixed", left: 16, bottom: 0, zIndex: 40 }
    : { position: "fixed", left: pos!.left, top: pos!.top, zIndex: 40 };

  const bubbleSide = corner ? "left" : pos!.side === "right" ? "left" : "right";

  return (
    <div className="pointer-events-none" style={containerStyle}>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.4, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.5, y: reduceMotion ? 0 : 14 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
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
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
            >
              <MushroomSVG blink={blink} gaze={0} gazeY={gazeY} smiling={smile || !!phrase} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
