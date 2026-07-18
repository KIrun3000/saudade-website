"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { getMoon } from "@/lib/moon";

/** Map the current route to a mushroom phrase section (mushroom.pages.*). */
function pageKeyFromPath(pathname: string): string {
  // Strip the locale prefix: /en/shop/art → shop/art
  const parts = pathname.split("/").filter(Boolean);
  const rest = parts.slice(1); // parts[0] is the locale
  if (rest.length === 0) return "home";
  const [first, second] = rest;
  if (first === "shop") {
    if (second === "art") return "art";
    if (second === "fashion") return "fashion";
    return second ? "product" : "art";
  }
  if (first === "saudade-land") return "land";
  if (["events", "blog", "community", "about", "contact"].includes(first)) return first;
  return "home";
}

/**
 * Shared "voice" for the mushroom. He speaks in two registers and alternates
 * between them, starting with context: lines about the page being read plus
 * warm affirmations ("You are love, and you are loved."), then his general
 * lunar-guru repertoire (real moon phase, planting days, cheeky nudges).
 * Each register keeps a shuffled queue so every line is said once before any
 * repeat; the context queue resets when the visitor changes page. Used by both
 * the footer stroller and the timed peek (each caller keeps its own queues).
 */
export function useMushroomVoice() {
  const t = useTranslations("mushroom");
  const pathname = usePathname();
  // Latest-ref pattern: next-intl hands back a fresh translator every render,
  // so depending on it directly would give callers an unstable callback (and
  // reset any timer keyed on it). The callback stays identity-stable and reads
  // the current translator/pathname through refs instead.
  const tRef = useRef(t);
  tRef.current = t;
  const pathRef = useRef(pathname);
  pathRef.current = pathname;
  const ctxQueue = useRef<string[]>([]);
  const genQueue = useRef<string[]>([]);
  const lastPageKey = useRef("");
  const lastMsg = useRef("");
  const turn = useRef(0);

  return useCallback((): string | null => {
    const tRaw = tRef.current.raw as (key: string) => unknown;
    const pathname = pathRef.current;
    const asArr = (v: unknown) => (Array.isArray(v) ? (v as string[]) : []);
    const asObj = (v: unknown) => (v && typeof v === "object" ? (v as Record<string, unknown>) : {});

    const pageKey = pageKeyFromPath(pathname);
    if (pageKey !== lastPageKey.current) {
      // New page → fresh context; he opens with something relevant to it.
      lastPageKey.current = pageKey;
      ctxQueue.current = [];
      turn.current = 0;
    }

    const pageLines = asArr(asObj(tRaw("pages"))[pageKey]);
    const warm = asArr(tRaw("warm"));

    const moon = getMoon();
    const phaseNames = asObj(tRaw("phaseNames")) as Record<string, string>;
    const phaseLabel = phaseNames[moon.phase] ?? moon.phase;
    const moonLines = asArr(tRaw("moon")).map((s) =>
      s.replace(/\{phase\}/g, phaseLabel).replace(/\{lit\}/g, String(moon.illumination)),
    );
    const plantLines = asArr(tRaw(moon.goodToPlant ? "plantGood" : "plantBad"));
    const cheeky = asArr(tRaw("cheeky"));

    const context = [...pageLines, ...warm];
    const general = [...moonLines, ...plantLines, ...cheeky];
    if (context.length === 0 && general.length === 0) return null;

    const shuffle = (pool: string[]) => {
      const s = [...pool];
      for (let i = s.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [s[i], s[j]] = [s[j], s[i]];
      }
      if (s[0] === lastMsg.current && s.length > 1) [s[0], s[1]] = [s[1], s[0]];
      return s;
    };

    // Even turns → context register, odd turns → general (unless one is empty).
    const useContext = general.length === 0 || (context.length > 0 && turn.current % 2 === 0);
    turn.current++;
    const queue = useContext ? ctxQueue : genQueue;
    if (queue.current.length === 0) queue.current = shuffle(useContext ? context : general);
    const pick = queue.current.shift() as string;
    lastMsg.current = pick;
    return pick;
  }, []);
}

export function MushroomMascot() {
  const nextPhrase = useMushroomVoice();
  // He lives on the bottom edge (the footer line is his floor) and strolls
  // slowly left↔right. Click → he jumps, smiles, and shares a word.
  const [x, setX] = useState(82);          // horizontal %, his spot on the floor
  const [facing, setFacing] = useState(1); // 1 = looking right, -1 = left
  const [jumping, setJumping] = useState(false);
  const [walking, setWalking] = useState(true);
  const [blink, setBlink] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const hideTimer = useRef<number | undefined>(undefined);

  // He smiles (closes eyes + big grin) while jumping OR talking.
  const smiling = jumping || !!message;

  // Strolling along the floor — picks a new spot every few seconds and ambles to it.
  useEffect(() => {
    let alive = true;
    const tick = () => {
      if (!alive) return;
      setX((prev) => {
        const dir = Math.random() > 0.5 ? 1 : -1;
        const step = 8 + Math.random() * 22;
        let next = prev + dir * step;
        if (next < 5) next = 5 + Math.random() * 10;
        if (next > 92) next = 92 - Math.random() * 10;
        setFacing(next >= prev ? 1 : -1);
        return next;
      });
    };
    const id = setInterval(() => { if (walking) tick(); }, 4500 + Math.random() * 3000);
    return () => { alive = false; clearInterval(id); };
  }, [walking]);

  // Occasional gentle blink — sometimes a quick double-blink, extra charming.
  useEffect(() => {
    const t = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
      if (Math.random() < 0.35) {
        setTimeout(() => setBlink(true), 300);
        setTimeout(() => setBlink(false), 440);
      }
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(t);
  }, []);

  const speak = useCallback(() => {
    const pick = nextPhrase();
    if (!pick) return;
    setMessage(pick);
    // Jump up with joy, pause his stroll while he talks, then resume.
    setJumping(true);
    setWalking(false);
    setTimeout(() => setJumping(false), 650);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      setMessage(null);
      setWalking(true);
    }, 7000);
  }, [nextPhrase]);

  useEffect(() => () => window.clearTimeout(hideTimer.current), []);

  // The bubble grows toward screen centre so it never clips at the edges.
  const gaze = x < 50 ? 1 : -1;

  return (
    // Anchored to the top edge of the footer rectangle — he walks along it and
    // hops just one line up when clicked. (Mounted inside <footer>.)
    <motion.div
      data-mushroom-home
      className="pointer-events-none absolute z-20 block -translate-x-1/2"
      style={{ left: `${x}%`, bottom: "100%", marginBottom: "-6px" }}
      animate={{ left: `${x}%` }}
      transition={{ left: { duration: 3.5, ease: "easeInOut" } }}
    >
      <div className="relative">
        {/* speech bubble */}
        <AnimatePresence>
          {message && (
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              // Anchor the bubble toward screen-centre so it never clips at the edges:
              // left-side mushroom → bubble grows rightward; right-side → leftward.
              className="absolute bottom-full mb-2 w-max max-w-[min(70vw,15rem)]"
              style={gaze === 1 ? { left: 0 } : { right: 0 }}
            >
              <MushroomBubble text={message} align={gaze === 1 ? "left" : "right"} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* a little heart floats up whenever he speaks */}
        <AnimatePresence>
          {message && (
            <motion.span
              key={"heart-" + message}
              aria-hidden="true"
              initial={{ opacity: 0, y: 2, scale: 0.5, x: "-50%" }}
              animate={{ opacity: [0, 1, 1, 0], y: -30, scale: 1, x: "-50%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="absolute select-none"
              style={{ left: "50%", top: -4, color: "#e8927c", fontSize: 15 }}
            >
              ♥
            </motion.span>
          )}
        </AnimatePresence>

        {/* the mushroom — walks the floor with a gentle waddle; jumps up and
            smiles when clicked. His eyes track his walking direction. */}
        <motion.button
          type="button"
          aria-label="A little word from the mushroom"
          onClick={speak}
          className="pointer-events-auto block cursor-pointer"
          style={{ opacity: 0.95, transformOrigin: "bottom center" }}
          animate={
            jumping
              ? { y: [0, -26, 0], scaleY: [1, 1.08, 0.9, 1], scaleX: [1, 0.96, 1.06, 1] }
              : walking
                ? { y: [0, -3, 0], rotate: [-3, 3, -3] }
                : { y: 0, rotate: 0 }
          }
          transition={
            jumping
              ? { duration: 0.65, ease: "easeOut" }
              : walking
                ? { duration: 0.9, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.4 }
          }
        >
          <MushroomSVG blink={blink} gaze={facing} smiling={smiling} />
        </motion.button>
      </div>
    </motion.div>
  );
}

/** The cream speech bubble with a downward tail. Shared by stroller + peek. */
export function MushroomBubble({ text, align }: { text: string; align: "left" | "right" }) {
  return (
    <div
      className="rounded-2xl px-4 py-2.5"
      style={{
        fontFamily: "var(--font-heading)",
        fontStyle: "italic",
        fontWeight: 300,
        fontSize: "0.95rem",
        lineHeight: 1.4,
        color: "#2f3b40",
        backgroundColor: "#f2ece3",
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        textAlign: align,
        position: "relative",
      }}
    >
      {text}
      {/* tail points down toward the mushroom */}
      <span
        className="absolute top-full h-0 w-0"
        style={{
          [align]: "1.25rem",
          borderLeft: "7px solid transparent",
          borderRight: "7px solid transparent",
          borderTop: "8px solid #f2ece3",
        } as React.CSSProperties}
      />
    </div>
  );
}

export function MushroomSVG({ blink, gaze = 1, smiling = false }: { blink: boolean; gaze?: number; smiling?: boolean }) {
  const dx = gaze * 2.5; // pupils shift toward what he's looking at (no body flip → spots stay put)
  const eyesClosed = smiling || blink;
  return (
    // The original friendly toadstool, with a glossy 3D cap: gradient dome,
    // soft sheen, blurred rim shading and organically scattered cream dots.
    <svg width="36" height="42" viewBox="0 0 170 170" fill="none"
      style={{ filter: "drop-shadow(0 5px 11px rgba(0,0,0,0.45))" }}
      strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <radialGradient id="mush-cap3d" cx="36%" cy="24%" r="85%">
          <stop offset="0%" stopColor="#ff9068" />
          <stop offset="38%" stopColor="#f25c33" />
          <stop offset="75%" stopColor="#d43c1c" />
          <stop offset="100%" stopColor="#a82c12" />
        </radialGradient>
        <linearGradient id="mush-stem" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f3e7cf" />
          <stop offset="55%" stopColor="#fbf3e2" />
          <stop offset="100%" stopColor="#e3cfa9" />
        </linearGradient>
        <radialGradient id="mush-dot3d" cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#fffdf4" />
          <stop offset="80%" stopColor="#f5ecd9" />
          <stop offset="100%" stopColor="#e9dabd" />
        </radialGradient>
        <clipPath id="mush-capclip">
          <path d="M16 70 C16 38 44 18 85 18 C126 18 154 38 154 70 C154 80 144 82 130 82 L40 82 C26 82 16 80 16 70 Z" />
        </clipPath>
        <filter id="mush-soft2" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2" /></filter>
        <filter id="mush-soft4" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>

      {/* stem — flared 3D, drawn first so the cap overlaps its top */}
      <path d="M57 88 C51 112 50 136 55 147 C62 160 108 160 115 147 C120 136 119 112 113 88 Z"
        stroke="#c4a577" fill="url(#mush-stem)" />
      {/* tiny feet peeking out */}
      <ellipse cx="70" cy="157.5" rx="5.5" ry="3.2" fill="#7a5648" />
      <ellipse cx="100" cy="157.5" rx="5.5" ry="3.2" fill="#7a5648" />
      {/* gill ring — small band tucked under the cap */}
      <path d="M52 84 C52 78 66 75 85 75 C104 75 118 78 118 84 C118 89 104 92 85 92 C66 92 52 89 52 84 Z"
        stroke="#c4a577" fill="#e7d3ab" />
      <path d="M60 85 C67 88 75 89 85 89 C95 89 103 88 110 85" stroke="#caa86f" strokeWidth="1.6" fill="none" opacity="0.7" />

      {/* cap — glossy 3D dome */}
      <path d="M16 70 C16 38 44 18 85 18 C126 18 154 38 154 70 C154 80 144 82 130 82 L40 82 C26 82 16 80 16 70 Z"
        fill="url(#mush-cap3d)" />
      <g clipPath="url(#mush-capclip)">
        {/* soft shading along the cap's lower edge */}
        <path d="M18 74 C40 84 62 86 85 86 C108 86 130 84 152 74" stroke="#7e1f0a" strokeWidth="9" fill="none" opacity="0.45" filter="url(#mush-soft4)" />
        {/* broad sheen + hot specular, upper-left */}
        <ellipse cx="60" cy="36" rx="32" ry="16" fill="#ffffff" opacity="0.28" filter="url(#mush-soft4)" transform="rotate(-14 60 36)" />
        <ellipse cx="50" cy="29" rx="10" ry="5.5" fill="#ffffff" opacity="0.5" filter="url(#mush-soft2)" transform="rotate(-14 50 29)" />
        {/* organic dots: blurred shadow under each + warm gradient fill */}
        <g fill="#8f2610" opacity="0.35" filter="url(#mush-soft2)">
          <ellipse cx="52" cy="39.5" rx="10.5" ry="8.8" />
          <ellipse cx="121" cy="32.5" rx="7.5" ry="6.4" />
          <ellipse cx="137" cy="61.5" rx="6.4" ry="5.6" />
          <ellipse cx="20" cy="63.5" rx="5" ry="4.3" />
          <ellipse cx="88" cy="56.5" rx="3.8" ry="3.2" />
          <ellipse cx="97" cy="28.5" rx="2.7" ry="2.3" />
          <ellipse cx="115" cy="71.5" rx="3.1" ry="2.6" />
          <ellipse cx="44" cy="73.5" rx="2.5" ry="2.1" />
        </g>
        <g fill="url(#mush-dot3d)">
          <ellipse cx="52" cy="37" rx="10.5" ry="9" />
          <ellipse cx="121" cy="30" rx="7.5" ry="6.6" />
          <ellipse cx="137" cy="59" rx="6.4" ry="5.8" />
          <ellipse cx="20" cy="61" rx="5" ry="4.5" />
          <ellipse cx="88" cy="54" rx="3.8" ry="3.4" />
          <ellipse cx="97" cy="26" rx="2.7" ry="2.4" />
          <ellipse cx="115" cy="69" rx="3.1" ry="2.7" />
          <ellipse cx="44" cy="71" rx="2.5" ry="2.2" />
        </g>
        {/* twinkles on the gloss */}
        <path d="M40 23 L41.4 27.1 L45.5 28.5 L41.4 29.9 L40 34 L38.6 29.9 L34.5 28.5 L38.6 27.1 Z" fill="#ffffff" opacity="0.85" />
        <path d="M30 39 L30.9 41.6 L33.5 42.5 L30.9 43.4 L30 46 L29.1 43.4 L26.5 42.5 L29.1 41.6 Z" fill="#ffffff" opacity="0.65" />
      </g>

      {/* face — smaller, friendly eyes on the stem */}
      {eyesClosed ? (
        <>
          <path d="M61 118 C66 112 75 112 79 118" stroke="#3a2f2a" strokeWidth="2.8" />
          <path d="M91 118 C95 112 104 112 109 118" stroke="#3a2f2a" strokeWidth="2.8" />
        </>
      ) : (
        <>
          <ellipse cx="70" cy="120" rx="8" ry="9.2" stroke="#3a2f2a" strokeWidth="2.2" fill="#fffdf8" />
          <ellipse cx="100" cy="120" rx="8" ry="9.2" stroke="#3a2f2a" strokeWidth="2.2" fill="#fffdf8" />
          <circle cx={71 + dx} cy="122" r="5" fill="#3a2f2a" />
          <circle cx={101 + dx} cy="122" r="5" fill="#3a2f2a" />
          <ellipse cx={68.8 + dx} cy="118.8" rx="2.1" ry="2.6" fill="#ffffff" opacity="0.95" />
          <ellipse cx={98.8 + dx} cy="118.8" rx="2.1" ry="2.6" fill="#ffffff" opacity="0.95" />
          <circle cx={73.6 + dx} cy="124.6" r="1.1" fill="#ffffff" opacity="0.8" />
          <circle cx={103.6 + dx} cy="124.6" r="1.1" fill="#ffffff" opacity="0.8" />
        </>
      )}

      {/* mouth */}
      {smiling ? (
        <path d="M79 132 C83 141 87 141 91 132 C87 136 83 136 79 132 Z" stroke="#3a2f2a" strokeWidth="2.2" fill="#c2451f" fillOpacity="0.5" />
      ) : (
        <path d="M82 131 C85 134 89 134 92 131" stroke="#3a2f2a" />
      )}

      {/* rosy cheeks */}
      <circle cx="56" cy="128" r="5.5" fill="#f0987e" opacity="0.6" filter="url(#mush-soft2)" />
      <circle cx="114" cy="128" r="5.5" fill="#f0987e" opacity="0.6" filter="url(#mush-soft2)" />
    </svg>
  );
}
