"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { MushroomBubble, MushroomSVG, useMushroomVoice } from "@/components/ui/MushroomMascot";

// He greets you soon after you land, then drops by here and there — often
// enough to feel alive, gentle enough never to nag.
const FIRST_MIN = 5_000;
const FIRST_MAX = 9_000;
const DWELL_MIN = 15_000;
const DWELL_MAX = 27_000;
const VISIBLE_MS = 6_000; // how long he lingers (silent) before tucking away
const SPEAK_MS = 7_000; // once clicked, how long his words stay

const MUSH_W = 36;
const MUSH_H = 42;

type Perch = { el: Element; fracX: number };
type Pos =
  | { mode: "perch"; left: number; top: number; side: "left" | "right" }
  | { mode: "bottom"; left: number; side: "left" | "right" };

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
 * photo, or image block the visitor is likely looking at. He stands on its TOP
 * edge (body above the frame) so he never covers the content. Needs headroom
 * above and to be mostly on screen. Returns null when there's nothing suitable
 * (text-only pages) — then he peeks up from the bottom edge instead.
 */
function pickPerch(): Perch | null {
  if (typeof document === "undefined") return null;
  const { w: vw, h: vh } = viewport();
  const seen = new Set<Element>();
  const cands: { el: Element; area: number }[] = [];

  const nodes = document.querySelectorAll<HTMLElement>("img, [data-mushroom-perch]");
  nodes.forEach((el) => {
    if (seen.has(el)) return;
    // never the logo / nav, and never anything opted out (e.g. the hero)
    if (el.closest("header") || el.closest("[data-mushroom-noperch]")) return;
    const r = el.getBoundingClientRect();
    const visibleW = Math.min(r.right, vw) - Math.max(r.left, 0);
    const onScreen =
      r.width >= 150 &&
      r.height >= 130 &&
      r.top >= 150 &&
      r.top <= vh - 110 &&
      visibleW >= r.width * 0.7;
    if (!onScreen) return;
    seen.add(el);
    cands.push({ el, area: r.width * r.height });
  });

  if (!cands.length) return null;
  cands.sort((a, b) => b.area - a.area);
  const pool = cands.slice(0, Math.min(6, cands.length));
  const el = pool[Math.floor(Math.random() * pool.length)].el;
  return { el, fracX: rnd(0.22, 0.78) };
}

export function MushroomPeek() {
  const pathname = usePathname();
  const nextPhrase = useMushroomVoice();
  const reduceMotion = useReducedMotion();

  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState<Pos | null>(null);
  const [phrase, setPhrase] = useState<string | null>(null);
  const [blink, setBlink] = useState(false);
  // where he's looking: {x,y} in SVG units (+y = down at the art, −y = up at you)
  const [gaze, setGaze] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [smile, setSmile] = useState(false);

  const perchRef = useRef<Perch | null>(null);
  const bottomXRef = useRef(0.5);
  const timers = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const showRef = useRef<() => void>(() => {});
  const hideRef = useRef<() => void>(() => {});

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  // Keep him glued to the frame edge as the page scrolls (perch mode only).
  const reposition = useCallback(() => {
    const { w: vw, h: vh } = viewport();
    const p = perchRef.current;
    if (!p) {
      // bottom-edge peek — anchored to the viewport, no scroll math needed
      const left = Math.max(6, Math.min(vw - MUSH_W - 6, bottomXRef.current * vw - MUSH_W / 2));
      setPos({ mode: "bottom", left, side: left + MUSH_W / 2 < vw / 2 ? "right" : "left" });
      return;
    }
    const r = p.el.getBoundingClientRect();
    if (r.bottom < 60 || r.top < 90 || r.top > vh - 40 || r.width < 100) {
      hideRef.current();
      return;
    }
    let left = r.left + p.fracX * r.width - MUSH_W / 2;
    left = Math.max(6, Math.min(vw - MUSH_W - 6, left));
    const top = r.top - MUSH_H + 4; // feet grip the top border, body above
    setPos({ mode: "perch", left, top, side: left + MUSH_W / 2 < vw / 2 ? "right" : "left" });
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
      // Never intrude: skip if the tab is hidden or the footer mushroom is up.
      if (document.visibilityState !== "visible" || footerMascotInView()) {
        timers.current.push(window.setTimeout(() => showRef.current(), 8_000));
        return;
      }
      const perch = pickPerch();
      // No painting/photo to perch on? Only peek up from the bottom once the
      // hero (logo + description) has been scrolled past, so he never appears
      // over the brand header. Otherwise wait and try again shortly.
      if (!perch && window.scrollY < viewport().h * 0.6) {
        timers.current.push(window.setTimeout(() => showRef.current(), 6_000));
        return;
      }
      perchRef.current = perch;
      bottomXRef.current = rnd(0.18, 0.85);
      setPhrase(null);
      setSmile(false);

      if (perch) {
        // stands on the art → glance down at it, then up at you, then beams
        setGaze({ x: 0, y: 2.8 });
        timers.current.push(window.setTimeout(() => setGaze({ x: 0, y: -1.2 }), 1300));
        timers.current.push(window.setTimeout(() => setSmile(true), 2500));
      } else {
        // peeking up from the bottom → a playful look around, then a beam
        setGaze({ x: -3, y: -0.6 });
        timers.current.push(window.setTimeout(() => setGaze({ x: 3, y: -0.6 }), 900));
        timers.current.push(window.setTimeout(() => setGaze({ x: 0, y: -0.9 }), 1700));
        timers.current.push(window.setTimeout(() => setSmile(true), 2100));
      }

      reposition();
      setVisible(true);
      timers.current.push(window.setTimeout(() => hideRef.current(), VISIBLE_MS));
    };

    showRef.current = show;
    hideRef.current = hide;

    clearTimers();
    setVisible(false);
    setPhrase(null);
    perchRef.current = null;
    timers.current.push(window.setTimeout(() => showRef.current(), rnd(FIRST_MIN, FIRST_MAX)));
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
    setGaze({ x: 0, y: -0.8 });
    setSmile(true);
    setPhrase(pick);
    clearTimers(); // cancel the silent auto-hide
    timers.current.push(window.setTimeout(() => hideRef.current(), SPEAK_MS));
  };

  if (!pos) return null;

  // a gentle head-tilt: leans down toward the art, or toward a sideways glance
  const tilt = reduceMotion ? 0 : gaze.y > 1 ? 6 : gaze.x * 1.0;

  const containerStyle: React.CSSProperties =
    pos.mode === "perch"
      ? { position: "fixed", left: pos.left, top: pos.top, zIndex: 40 }
      : { position: "fixed", left: pos.left, bottom: 0, zIndex: 40 };

  const bubbleSide = pos.side === "right" ? "left" : "right";

  return (
    <div className="pointer-events-none" style={containerStyle}>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.8 }}
            transition={{ type: "spring", stiffness: 180, damping: 20, mass: 0.9 }}
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
              transition={{ type: "spring", stiffness: 100, damping: 16 }}
            >
              <MushroomSVG blink={blink} gaze={gaze.x} gazeY={gaze.y} smiling={smile || !!phrase} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
