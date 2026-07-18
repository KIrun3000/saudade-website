"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the animation starts. */
  delay?: number;
  /** Travel distance in px for the rise. */
  y?: number;
  /** Animation direction. */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Render as a different element-equivalent motion tag. */
  as?: "div" | "section" | "li" | "span";
  once?: boolean;
};

/**
 * Cinematic scroll-reveal: fades + rises (or slides) into view when scrolled to.
 * Tasteful defaults — soft, slow, no bounce. Used across the home page sections.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  direction = "up",
  as = "div",
  once = true,
}: RevealProps) {
  const offset =
    direction === "up"
      ? { y }
      : direction === "down"
        ? { y: -y }
        : direction === "left"
          ? { x: y }
          : direction === "right"
            ? { x: -y }
            : {};

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
    },
  };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}
