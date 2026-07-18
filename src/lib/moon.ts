// Self-contained lunar engine — no API, no network. Computes the moon phase,
// illumination, zodiac sign and a biodynamic "good day to plant" flag from a
// date. Accurate to the day, which is all the mushroom needs.

export type MoonPhase =
  | "new"
  | "waxingCrescent"
  | "firstQuarter"
  | "waxingGibbous"
  | "full"
  | "waningGibbous"
  | "lastQuarter"
  | "waningCrescent";

export type MoonSign =
  | "Aries" | "Taurus" | "Gemini" | "Cancer" | "Leo" | "Virgo"
  | "Libra" | "Scorpio" | "Sagittarius" | "Capricorn" | "Aquarius" | "Pisces";

export type MoonInfo = {
  phase: MoonPhase;
  /** 0..1 fraction through the synodic cycle. */
  fraction: number;
  /** Illuminated percentage, 0..100. */
  illumination: number;
  /** Whether the moon is growing (new → full). */
  waxing: boolean;
  sign: MoonSign;
  /** Biodynamic element of the sign. */
  element: "earth" | "water" | "fire" | "air";
  /** Good day to plant? (waxing + earth/water sign, not at new/full peak). */
  goodToPlant: boolean;
};

const SIGNS: MoonSign[] = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

const ELEMENT: Record<MoonSign, MoonInfo["element"]> = {
  Aries: "fire", Leo: "fire", Sagittarius: "fire",
  Taurus: "earth", Virgo: "earth", Capricorn: "earth",
  Gemini: "air", Libra: "air", Aquarius: "air",
  Cancer: "water", Scorpio: "water", Pisces: "water",
};

function julianDay(dt: Date): number {
  let y = dt.getUTCFullYear();
  let m = dt.getUTCMonth() + 1;
  const d = dt.getUTCDate() + (dt.getUTCHours() + dt.getUTCMinutes() / 60) / 24;
  if (m <= 2) { y -= 1; m += 12; }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + b - 1524.5;
}

export function getMoon(date: Date = new Date()): MoonInfo {
  const J = julianDay(date);
  const days = J - 2451550.1; // days since a known new moon (2000-01-06)
  const SYN = 29.530588853;
  const fraction = ((days % SYN) + SYN) % SYN / SYN;
  const illumination = Math.round(((1 - Math.cos(2 * Math.PI * fraction)) / 2) * 100);
  const waxing = fraction < 0.5;

  // Moon ecliptic longitude (low-precision, ~good to a degree or two).
  const D = days;
  const L = (218.316 + 13.176396 * D) % 360;
  const M = (134.963 + 13.064993 * D) % 360;
  const lon = ((L + 6.289 * Math.sin((M * Math.PI) / 180)) % 360 + 360) % 360;
  const sign = SIGNS[Math.floor(lon / 30) % 12];
  const element = ELEMENT[sign];

  let phase: MoonPhase;
  if (fraction < 0.03 || fraction > 0.97) phase = "new";
  else if (fraction < 0.22) phase = "waxingCrescent";
  else if (fraction < 0.28) phase = "firstQuarter";
  else if (fraction < 0.47) phase = "waxingGibbous";
  else if (fraction < 0.53) phase = "full";
  else if (fraction < 0.72) phase = "waningGibbous";
  else if (fraction < 0.78) phase = "lastQuarter";
  else phase = "waningCrescent";

  // Biodynamic-ish: waxing moon in an earth or water sign is good for planting,
  // away from the exact new/full peaks.
  const goodToPlant =
    waxing &&
    (element === "earth" || element === "water") &&
    phase !== "new" &&
    phase !== "full";

  return { phase, fraction, illumination, waxing, sign, element, goodToPlant };
}
