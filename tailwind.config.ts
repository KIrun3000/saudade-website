import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-light": "var(--color-primary-light)",
        "primary-dark": "var(--color-primary-dark)",
        accent: "var(--color-accent)",
        "accent-light": "var(--color-accent-light)",
        "accent-muted": "var(--color-accent-muted)",
        sage: "var(--color-sage)",
        "sage-light": "var(--color-sage-light)",
        "text-on-dark": "var(--color-text-on-dark)",
        "text-on-light": "var(--color-text-on-light)",
        "bg-light": "var(--color-bg-light)",
        "bg-alt": "var(--color-bg-alt)",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        display: ["var(--font-display)"],
        subheading: ["var(--font-display)"],
        body: ["var(--font-body)"],
        accent: ["var(--font-accent)"],
        wordmark: ["var(--font-wordmark)"],
      },
    },
  },
};

export default config;
