import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08060f",
        surface: "#110d1e",
        "violet-primary": "#7c3aed",
        "violet-light": "#a855f7",
        "cyan-primary": "#06b6d4",
        "cyan-light": "#22d3ee",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-violet-cyan":
          "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
      },
    },
  },
  plugins: [],
}

export default config
