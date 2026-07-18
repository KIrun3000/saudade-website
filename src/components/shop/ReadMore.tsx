"use client";

import { useState } from "react";

const btnStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "9px",
  letterSpacing: "0.25em",
  paddingBottom: "2px",
  marginTop: "1.25rem",
  display: "inline-block",
  background: "none",
  border: "none",
  borderBottom: "1px solid rgba(216,207,196,0.3)",
  color: "inherit",
  cursor: "pointer",
  textTransform: "uppercase",
  opacity: 0.55,
  transition: "opacity 0.2s",
};

export function ReadMore({
  teaser,
  children,
}: {
  teaser: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {teaser}
      {open && children}
      <div style={{ marginTop: "1.5rem" }}>
        <button style={btnStyle} onClick={() => setOpen(!open)}>
          {open ? "Close the story ↑" : "Unfold the story ↓"}
        </button>
      </div>
    </div>
  );
}

export function ReadMoreText({
  text,
  textStyle,
}: {
  text: string;
  textStyle?: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);

  const firstPeriod = text.indexOf(". ");
  const teaser = firstPeriod > -1 ? text.slice(0, firstPeriod + 1) : text;
  const rest = firstPeriod > -1 ? " " + text.slice(firstPeriod + 2) : "";

  return (
    <div>
      <p style={textStyle}>
        {teaser}
        {!open && rest ? "…" : ""}
        {open && rest}
      </p>
      {rest && (
        <button style={btnStyle} onClick={() => setOpen(!open)}>
          {open ? "Close ↑" : "Read more ↓"}
        </button>
      )}
    </div>
  );
}
