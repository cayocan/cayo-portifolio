# Portfolio Redesign — Noir Cyber Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio site from scratch with a Noir Cyber aesthetic (dark bg, violet/cyan palette, glassmorphism, animated terminal hero, project category filter, EN/PT-BR i18n) compatible with GitHub Pages via Next.js static export + GitHub Actions.

**Architecture:** Single-page Next.js 14 app with `output: 'export'` for static generation. All components are client components (`"use client"`). Translations managed by react-i18next with bundled JSON files (no HTTP fetch). GitHub Actions builds and deploys `out/` to GitHub Pages on push to `main`.

**Tech Stack:** Next.js 14, Tailwind CSS, Framer Motion, react-i18next, lucide-react, Space Grotesk (Google Fonts via next/font)

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `next.config.js` | Create | Static export, basePath, image config |
| `.github/workflows/deploy.yml` | Create | CI/CD — build + deploy to GitHub Pages |
| `lib/i18n.ts` | Create | i18next initialization with bundled translations |
| `public/locales/en/common.json` | Create | All English strings |
| `public/locales/pt/common.json` | Create | All Portuguese PT-BR strings |
| `tailwind.config.ts` | Modify | Add design system colors (violet, cyan, background) |
| `app/globals.css` | Modify | CSS reset tweaks, font variables |
| `app/layout.tsx` | Modify | Space Grotesk font, updated metadata |
| `app/page.tsx` | Rewrite | Compose all section components |
| `components/Navbar.tsx` | Create | Fixed nav, section dots, language switcher, mobile menu |
| `components/Terminal.tsx` | Create | Animated typing terminal window |
| `components/Hero.tsx` | Create | Split layout: bio left + terminal right |
| `components/Skills.tsx` | Create | Skills grid section |
| `components/ProjectCard.tsx` | Rewrite | Glassmorphism card with category badge |
| `components/Projects.tsx` | Create | Projects grid with AnimatePresence category filter |
| `components/Contact.tsx` | Create | Contact form (mailto) + social links |
| `components/Footer.tsx` | Create | Single-line footer |

---

## Task 1: Static Export Config + GitHub Actions

**Files:**
- Create: `next.config.js`
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create next.config.js**

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
}

module.exports = nextConfig
```

> **Note on basePath:**
> - If your GitHub repo is `username.github.io` (user/org page) → site is at `https://username.github.io/` → `NEXT_PUBLIC_BASE_PATH` should be `''` (empty). In the workflow, remove the `env:` block from the build step.
> - If your repo is named anything else (e.g. `portfolio`) → site is at `https://username.github.io/portfolio/` → `NEXT_PUBLIC_BASE_PATH` should be `/portfolio`. The workflow below handles this automatically using the repo name.

- [ ] **Step 2: Create GitHub Actions workflow**

```bash
mkdir -p .github/workflows
```

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_BASE_PATH: /${{ github.event.repository.name }}

      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

> **After creating this file:** go to GitHub repo → Settings → Pages → Source → select **GitHub Actions**.

- [ ] **Step 3: Verify the config doesn't break local dev**

```bash
npm run build
```

Expected: build completes, `out/` folder created with `out/index.html`.

- [ ] **Step 4: Commit**

```bash
git add next.config.js .github/workflows/deploy.yml
git commit -m "feat: add static export config and GitHub Actions deploy workflow"
```

---

## Task 2: Install Dependencies

**Files:**
- Modify: `package.json` (via npm install)

- [ ] **Step 1: Install i18n and font packages**

```bash
npm install react-i18next i18next
```

- [ ] **Step 2: Verify installation**

```bash
npm ls react-i18next i18next
```

Expected: both packages listed without errors.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add react-i18next and i18next dependencies"
```

---

## Task 3: i18n Setup

**Files:**
- Create: `lib/i18n.ts`
- Create: `public/locales/en/common.json`
- Create: `public/locales/pt/common.json`

- [ ] **Step 1: Create translation file — English**

```bash
mkdir -p public/locales/en public/locales/pt
```

```json
// public/locales/en/common.json
{
  "nav": {
    "home": "Home",
    "skills": "Skills",
    "projects": "Projects",
    "contact": "Contact"
  },
  "hero": {
    "badge": "Available for hire",
    "subtitle": "Full Stack Developer · C# & .NET · AI · Unity · Web3",
    "bio": "I help companies build resilient platforms and intelligent experiences that deliver performance, scale, and clarity. Combining backend rigor, modern interfaces, and AI automation to accelerate results.",
    "cta_projects": "View Projects",
    "cta_contact": "Let's Talk",
    "badge_available": "Available for full stack opportunities",
    "badge_focus": "Focused on AI & automation products"
  },
  "skills": {
    "kicker": "Skills",
    "title": "Core Competencies",
    "backend": "Backend",
    "frontend": "Frontend",
    "ai_devops": "AI / DevOps",
    "specialized": "Specialized"
  },
  "projects": {
    "kicker": "Work",
    "title": "Featured Projects",
    "filter_all": "All",
    "filter_games": "Games",
    "filter_web3": "Web3",
    "filter_backend": "Backend",
    "filter_ai": "AI",
    "featured_label": "Featured Build"
  },
  "contact": {
    "kicker": "Contact",
    "title": "Ready to contribute to your team",
    "label_name": "Name",
    "label_email": "Email",
    "label_message": "How can I help",
    "placeholder_name": "Your name",
    "placeholder_email": "you@email.com",
    "placeholder_message": "Tell me about the role, stack, challenges and goals.",
    "send": "Send Message",
    "direct_title": "Direct Contact",
    "direct_desc": "Available to discuss opportunities, challenging projects and AI products.",
    "networks_title": "Social"
  },
  "footer": {
    "rights": "All rights reserved."
  }
}
```

- [ ] **Step 2: Create translation file — Portuguese PT-BR**

```json
// public/locales/pt/common.json
{
  "nav": {
    "home": "Início",
    "skills": "Habilidades",
    "projects": "Projetos",
    "contact": "Contato"
  },
  "hero": {
    "badge": "Disponível para contratação",
    "subtitle": "Desenvolvedor Full Stack · C# & .NET · IA · Unity · Web3",
    "bio": "Ajudo empresas a construir plataformas resilientes e experiências inteligentes que entregam performance, escala e clareza de uso. Combinando rigor de backend, interfaces modernas e automação com IA para acelerar resultados.",
    "cta_projects": "Ver Projetos",
    "cta_contact": "Vamos Conversar",
    "badge_available": "Disponível para oportunidades full stack",
    "badge_focus": "Foco em produtos com IA e automação"
  },
  "skills": {
    "kicker": "Skills",
    "title": "Competências-chave",
    "backend": "Backend",
    "frontend": "Frontend",
    "ai_devops": "AI / DevOps",
    "specialized": "Especialidades"
  },
  "projects": {
    "kicker": "Trabalhos",
    "title": "Projetos em destaque",
    "filter_all": "Todos",
    "filter_games": "Games",
    "filter_web3": "Web3",
    "filter_backend": "Backend",
    "filter_ai": "IA",
    "featured_label": "Destaque"
  },
  "contact": {
    "kicker": "Contato",
    "title": "Pronto para contribuir com sua equipe",
    "label_name": "Nome",
    "label_email": "Email",
    "label_message": "Como posso ajudar",
    "placeholder_name": "Seu nome",
    "placeholder_email": "voce@email.com",
    "placeholder_message": "Conte sobre a vaga, stack, desafios e objetivos.",
    "send": "Enviar mensagem",
    "direct_title": "Contato direto",
    "direct_desc": "Disponível para conversar sobre oportunidades, projetos desafiadores e produtos com IA.",
    "networks_title": "Redes"
  },
  "footer": {
    "rights": "Todos os direitos reservados."
  }
}
```

- [ ] **Step 3: Create lib/i18n.ts**

```ts
// lib/i18n.ts
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "../public/locales/en/common.json"
import pt from "../public/locales/pt/common.json"

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { common: en },
      pt: { common: pt },
    },
    lng: "pt",
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
  })
}

export default i18n
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add lib/i18n.ts public/locales/
git commit -m "feat: add i18n setup with EN and PT-BR translations"
```

---

## Task 4: Design System — Tailwind + Global Styles + Fonts

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update tailwind.config.ts**

Replace the entire file with:

```ts
// tailwind.config.ts
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
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
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
```

- [ ] **Step 2: Update app/globals.css**

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-background text-slate-100 antialiased;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #08060f;
}
::-webkit-scrollbar-thumb {
  background: #3b1f6e;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #7c3aed;
}
```

- [ ] **Step 3: Update app/layout.tsx**

```tsx
// app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Space_Grotesk } from "next/font/google"
import type { ReactNode } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Cayo Aguiar | Portfolio",
  description:
    "Full Stack Developer — C# & .NET · AI · Unity · Web3. Building resilient platforms and intelligent experiences.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: `out/index.html` generated, no errors.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts app/globals.css app/layout.tsx
git commit -m "feat: add Noir Cyber design system — colors, fonts, global styles"
```

---

## Task 5: Navbar Component

**Files:**
- Create: `components/Navbar.tsx`

- [ ] **Step 1: Create components/Navbar.tsx**

```tsx
// components/Navbar.tsx
"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import "@/lib/i18n"

const SECTIONS = ["home", "skills", "projects", "contact"] as const

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [activeSection, setActiveSection] = useState<string>("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Read persisted language on mount
  useEffect(() => {
    const saved = localStorage.getItem("i18nextLng")
    if (saved && saved !== i18n.language) {
      i18n.changeLanguage(saved)
    }
  }, [i18n])

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem("i18nextLng", lang)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <span className="font-display text-lg font-semibold bg-gradient-to-r from-violet-light to-cyan-light bg-clip-text text-transparent">
          Cayo Aguiar
        </span>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {SECTIONS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="relative text-sm text-slate-400 hover:text-white transition-colors py-1"
              >
                {t(`nav.${id}`)}
                {activeSection === id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-violet-primary to-cyan-primary rounded-full"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Language switcher (desktop) */}
        <div className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
          {(["pt", "en"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
                i18n.language === lang
                  ? "bg-violet-primary text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-300 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-white/5 px-6 py-4 space-y-1"
          >
            {SECTIONS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 text-sm transition-colors border-b border-white/5 last:border-0 ${
                  activeSection === id ? "text-white" : "text-slate-400"
                }`}
              >
                {t(`nav.${id}`)}
              </a>
            ))}
            <div className="flex gap-2 pt-3">
              {(["pt", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    changeLanguage(lang)
                    setMenuOpen(false)
                  }}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                    i18n.language === lang
                      ? "bg-violet-primary text-white"
                      : "border border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: add Navbar with section indicator, language switcher, mobile menu"
```

---

## Task 6: Terminal Component

**Files:**
- Create: `components/Terminal.tsx`

- [ ] **Step 1: Create components/Terminal.tsx**

```tsx
// components/Terminal.tsx
"use client"

import { useEffect, useState } from "react"

const LINES = [
  { text: "$ whoami", type: "command" },
  { text: "Cayo Aguiar — Full Stack Dev", type: "output" },
  { text: "", type: "blank" },
  { text: "$ stack --list", type: "command" },
  { text: "C# · .NET · Next.js · Unity · Web3", type: "output" },
  { text: "", type: "blank" },
  { text: "$ status", type: "command" },
  { text: "Available for hire ✓", type: "success" },
]

const DELAY_COMMAND = 700
const DELAY_OUTPUT = 300
const DELAY_BLANK = 200

export default function Terminal() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [cursorOn, setCursorOn] = useState(true)

  useEffect(() => {
    if (visibleCount >= LINES.length) return
    const line = LINES[visibleCount]
    let delay = DELAY_OUTPUT
    if (line.type === "command") delay = DELAY_COMMAND
    if (line.type === "blank") delay = DELAY_BLANK

    const timer = setTimeout(() => {
      setVisibleCount((c) => c + 1)
    }, delay)
    return () => clearTimeout(timer)
  }, [visibleCount])

  useEffect(() => {
    const timer = setInterval(() => setCursorOn((v) => !v), 530)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full max-w-md rounded-2xl border border-violet-primary/30 bg-[#0d0b17] shadow-2xl shadow-violet-900/30 overflow-hidden">
      {/* Glow */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-violet-primary/20 to-cyan-primary/10 pointer-events-none" />

      {/* Window chrome */}
      <div className="relative flex items-center gap-2 border-b border-white/5 bg-surface px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-auto text-xs text-slate-600 font-mono">terminal</span>
      </div>

      {/* Terminal body */}
      <div className="relative p-5 font-mono text-sm min-h-[200px] space-y-0.5">
        {LINES.slice(0, visibleCount).map((line, i) => (
          <div
            key={i}
            className={
              line.type === "command"
                ? "text-violet-400"
                : line.type === "success"
                ? "text-cyan-light"
                : line.type === "blank"
                ? "h-3"
                : "text-slate-300"
            }
          >
            {line.text}
          </div>
        ))}
        <span
          className={`inline-block w-2 h-[1.1em] bg-cyan-primary align-middle transition-opacity duration-100 ${
            cursorOn ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Terminal.tsx
git commit -m "feat: add animated Terminal component"
```

---

## Task 7: Hero Section

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create components/Hero.tsx**

```tsx
// components/Hero.tsx
"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Briefcase, Brain, Sparkles } from "lucide-react"
import { useTranslation } from "react-i18next"
import Terminal from "./Terminal"
import "@/lib/i18n"

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(124,58,237,0.18),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 pt-28 pb-20 md:grid-cols-[1.2fr_0.8fr] md:items-center"
      >
        {/* Left: bio */}
        <motion.div variants={stagger} className="space-y-8">
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-primary/40 bg-violet-primary/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-violet-light">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-primary" />
              </span>
              {t("hero.badge")}
            </span>
          </motion.div>

          {/* Name + title */}
          <motion.div variants={fadeUp} className="space-y-4">
            <h1 className="font-display text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Cayo{" "}
              <span className="bg-gradient-to-r from-violet-light to-cyan-light bg-clip-text text-transparent">
                Aguiar
              </span>
            </h1>
            <p className="text-lg text-slate-400 md:text-xl">{t("hero.subtitle")}</p>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            className="max-w-xl text-base leading-relaxed text-slate-400"
          >
            {t("hero.bio")}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-violet-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-violet-light hover:shadow-lg hover:shadow-violet-primary/30"
            >
              {t("hero.cta_projects")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-violet-primary/50 hover:bg-violet-primary/10"
            >
              {t("hero.cta_contact")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Info badges */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-violet-light" />
              {t("hero.badge_available")}
            </span>
            <span className="inline-flex items-center gap-2">
              <Brain className="h-4 w-4 text-cyan-light" />
              {t("hero.badge_focus")}
            </span>
          </motion.div>
        </motion.div>

        {/* Right: terminal */}
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center"
        >
          <Terminal />
        </motion.div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero section with animated terminal"
```

---

## Task 8: Skills Section

**Files:**
- Create: `components/Skills.tsx`

- [ ] **Step 1: Create components/Skills.tsx**

```tsx
// components/Skills.tsx
"use client"

import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Database, Code2, Cpu, Boxes } from "lucide-react"
import "@/lib/i18n"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const SKILLS = [
  {
    key: "backend",
    icon: Database,
    items: ["C#", ".NET", "Entity Framework", "Flask", "SQL & APIs"],
    accent: "violet",
  },
  {
    key: "frontend",
    icon: Code2,
    items: ["Next.js", "React Native", "Tailwind CSS", "TypeScript", "Angular"],
    accent: "cyan",
  },
  {
    key: "ai_devops",
    icon: Cpu,
    items: ["Copilot", "Docker", "CI/CD", "Prompt Engineering", "ML Integration"],
    accent: "violet",
  },
  {
    key: "specialized",
    icon: Boxes,
    items: ["Unity", "Blockchain", "Realtime Systems", "AI Automation", "Data Ops"],
    accent: "cyan",
  },
] as const

export default function Skills() {
  const { t } = useTranslation()

  return (
    <section id="skills" className="relative py-24">
      {/* Divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-violet-primary/40 to-transparent" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="mx-auto w-full max-w-6xl px-6"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-12">
          <p className="text-xs uppercase tracking-[0.32em] text-violet-light mb-2">
            {t("skills.kicker")}
          </p>
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            {t("skills.title")}
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {SKILLS.map((skill) => (
            <motion.div
              key={skill.key}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="group relative rounded-2xl border border-white/8 bg-surface p-6 transition-shadow hover:shadow-xl hover:shadow-violet-primary/10"
            >
              {/* Glow on hover */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  skill.accent === "violet"
                    ? "bg-gradient-to-br from-violet-primary/10 to-transparent"
                    : "bg-gradient-to-br from-cyan-primary/10 to-transparent"
                }`}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`rounded-xl border p-2 ${
                      skill.accent === "violet"
                        ? "border-violet-primary/30 bg-violet-primary/10 text-violet-light"
                        : "border-cyan-primary/30 bg-cyan-primary/10 text-cyan-light"
                    }`}
                  >
                    <skill.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {t(`skills.${skill.key}`)}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {skill.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-400">
                      <span
                        className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                          skill.accent === "violet" ? "bg-violet-light" : "bg-cyan-light"
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Skills.tsx
git commit -m "feat: add Skills section with glassmorphism cards"
```

---

## Task 9: ProjectCard Component (Rewrite)

**Files:**
- Rewrite: `components/ProjectCard.tsx`

- [ ] **Step 1: Rewrite components/ProjectCard.tsx**

```tsx
// components/ProjectCard.tsx
"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, type LucideIcon } from "lucide-react"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

export type ProjectCategory = "games" | "web3" | "backend" | "ai"

export type ProjectLink = {
  label: string
  href: string
}

export type ProjectCardProps = {
  title: string
  description: string
  tags: string[]
  category: ProjectCategory
  links?: ProjectLink[]
  icon?: LucideIcon
  imageSrc?: string
  imageAlt?: string
}

const CATEGORY_STYLES: Record<ProjectCategory, { badge: string; glow: string; dot: string }> = {
  games: {
    badge: "border-violet-primary/40 bg-violet-primary/10 text-violet-light",
    glow: "hover:shadow-violet-primary/20",
    dot: "bg-violet-light",
  },
  web3: {
    badge: "border-cyan-primary/40 bg-cyan-primary/10 text-cyan-light",
    glow: "hover:shadow-cyan-primary/20",
    dot: "bg-cyan-light",
  },
  backend: {
    badge: "border-violet-primary/40 bg-violet-primary/10 text-violet-light",
    glow: "hover:shadow-violet-primary/20",
    dot: "bg-violet-light",
  },
  ai: {
    badge: "border-cyan-primary/40 bg-cyan-primary/10 text-cyan-light",
    glow: "hover:shadow-cyan-primary/20",
    dot: "bg-cyan-light",
  },
}

export default function ProjectCard({
  title,
  description,
  tags,
  category,
  links = [],
  icon: Icon,
  imageSrc,
  imageAlt,
}: ProjectCardProps) {
  const { t } = useTranslation()
  const styles = CATEGORY_STYLES[category]

  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-surface transition-shadow duration-300 hover:shadow-2xl ${styles.glow}`}
    >
      {/* Image */}
      {imageSrc && (
        <div className="relative overflow-hidden">
          <div className="aspect-video w-full bg-black/40">
            <img
              src={imageSrc}
              alt={imageAlt ?? `${title} preview`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          {/* Category badge */}
          <span
            className={`absolute top-3 right-3 rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles.badge}`}
          >
            {t(`projects.filter_${category}`)}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">
              {t("projects.featured_label")}
            </p>
            <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
          </div>
          {Icon && (
            <span className="flex-shrink-0 rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300">
              <Icon className="h-5 w-5" />
            </span>
          )}
        </div>

        <p className="text-sm leading-relaxed text-slate-400 flex-1 mb-4">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/8 bg-white/5 px-3 py-0.5 text-xs text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        {links.length > 0 && (
          <div className="flex flex-wrap gap-4 pt-3 border-t border-white/5">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/ProjectCard.tsx
git commit -m "feat: rewrite ProjectCard with glassmorphism, category badge, glow"
```

---

## Task 10: Projects Section with Filter

**Files:**
- Create: `components/Projects.tsx`

- [ ] **Step 1: Create components/Projects.tsx**

```tsx
// components/Projects.tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import {
  Activity,
  Bot,
  Sparkles,
  Shield,
  Gamepad2,
  Globe,
} from "lucide-react"
import ProjectCard, { type ProjectCategory } from "./ProjectCard"
import "@/lib/i18n"

type FilterKey = "all" | ProjectCategory

const PROJECTS: Array<{
  title: string
  description: string
  tags: string[]
  category: ProjectCategory
  imageSrc?: string
  imageAlt?: string
  icon: React.ComponentType<{ className?: string }>
  links?: Array<{ label: string; href: string }>
}> = [
  {
    title: "Apex AI",
    description:
      "Sim racing telemetry platform delivering real-time coaching, lap delta insights, and predictive performance cues.",
    tags: ["C#", ".NET", "Realtime", "Telemetry"],
    category: "ai",
    icon: Activity,
    imageSrc: "/gifs/apex-ai.gif",
    imageAlt: "Apex AI preview",
  },
  {
    title: "Argus Bot",
    description:
      "ML-driven crypto trading stack with automated data engineering pipelines, signal scoring, and risk controls.",
    tags: ["Python", "ML", "Data Engineering", "Automation"],
    category: "web3",
    icon: Bot,
    imageSrc: "/gifs/argus-bot.gif",
    imageAlt: "Argus Bot preview",
  },
  {
    title: "FishDex",
    description:
      "AI-powered marine species identification with smart capture workflows and taxonomy enrichment.",
    tags: ["AI", "Vision", "Mobile", "Product"],
    category: "ai",
    icon: Sparkles,
    imageSrc: "/gifs/fishdex.gif",
    imageAlt: "FishDex preview",
  },
  {
    title: "Arbitrage Bot",
    description:
      "Spot/Future and Future/Future high-frequency arbitrage engine with latency-aware execution logic.",
    tags: ["HFT", "Risk", "Execution", "Strategy"],
    category: "web3",
    icon: Shield,
    imageSrc: "/gifs/arbitrage-bot.gif",
    imageAlt: "Arbitrage Bot preview",
  },
]

const FILTERS: FilterKey[] = ["all", "games", "web3", "backend", "ai"]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Projects() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all")

  const filtered =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="relative py-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-cyan-primary/40 to-transparent" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="mx-auto w-full max-w-6xl px-6"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-10">
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-light mb-2">
            {t("projects.kicker")}
          </p>
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            {t("projects.title")}
          </h2>
        </motion.div>

        {/* Filter pills */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-violet-primary text-white shadow-lg shadow-violet-primary/30"
                  : "border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-white/20"
              }`}
            >
              {t(`projects.filter_${filter}`)}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center text-slate-500"
          >
            No projects in this category yet.
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Projects.tsx
git commit -m "feat: add Projects section with AnimatePresence category filter"
```

---

## Task 11: Contact Section

**Files:**
- Create: `components/Contact.tsx`

- [ ] **Step 1: Create components/Contact.tsx**

```tsx
// components/Contact.tsx
"use client"

import { motion } from "framer-motion"
import { Mail, Linkedin, Github, ArrowUpRight, Send } from "lucide-react"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/cayo-aguiar",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/cayoaguiar",
    icon: Github,
  },
  {
    label: "Email",
    href: "mailto:cayocan@gmail.com",
    icon: Mail,
  },
]

const inputClass =
  "mt-2 w-full rounded-xl border border-white/8 bg-black/40 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 focus:border-violet-primary/60 focus:bg-black/60 focus:ring-1 focus:ring-violet-primary/30"

export default function Contact() {
  const { t } = useTranslation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem("name") as HTMLInputElement).value
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value
    const subject = `Portfolio contact from ${name}`
    const body = `From: ${name} (${email})\n\n${message}`
    window.location.href = `mailto:cayocan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact" className="relative py-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-violet-primary/40 to-transparent" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        className="mx-auto w-full max-w-6xl px-6"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-12">
          <p className="text-xs uppercase tracking-[0.32em] text-violet-light mb-2">
            {t("contact.kicker")}
          </p>
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            {t("contact.title")}
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Form */}
          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/8 bg-surface p-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-400">
                {t("contact.label_name")}
                <input
                  type="text"
                  name="name"
                  required
                  className={inputClass}
                  placeholder={t("contact.placeholder_name")}
                />
              </label>
              <label className="text-sm text-slate-400">
                {t("contact.label_email")}
                <input
                  type="email"
                  name="email"
                  required
                  className={inputClass}
                  placeholder={t("contact.placeholder_email")}
                />
              </label>
            </div>
            <label className="mt-4 block text-sm text-slate-400">
              {t("contact.label_message")}
              <textarea
                name="message"
                rows={5}
                required
                className={`${inputClass} resize-none`}
                placeholder={t("contact.placeholder_message")}
              />
            </label>
            <button
              type="submit"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-violet-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-violet-light hover:shadow-lg hover:shadow-violet-primary/30"
            >
              {t("contact.send")}
              <Send className="h-4 w-4" />
            </button>
          </motion.form>

          {/* Right panel */}
          <div className="space-y-4">
            {/* Direct contact */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-white/8 bg-surface p-6"
            >
              <h3 className="font-display text-xl font-semibold text-white mb-2">
                {t("contact.direct_title")}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400 mb-4">
                {t("contact.direct_desc")}
              </p>
              <a
                href="mailto:cayocan@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-cyan-light hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                cayocan@gmail.com
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-white/8 bg-surface p-6"
            >
              <h3 className="font-display text-xl font-semibold text-white mb-4">
                {t("contact.networks_title")}
              </h3>
              <div className="flex flex-wrap gap-3">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition-all hover:border-violet-primary/40 hover:bg-violet-primary/10 hover:text-white"
                  >
                    <social.icon className="h-4 w-4" />
                    {social.label}
                    <ArrowUpRight className="h-3 w-3 opacity-50" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Contact.tsx
git commit -m "feat: add Contact section with mailto form and social links"
```

---

## Task 12: Footer Component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create components/Footer.tsx**

```tsx
// components/Footer.tsx
"use client"

import { useTranslation } from "react-i18next"
import { Github, Linkedin, Mail } from "lucide-react"
import "@/lib/i18n"

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-slate-500">
        <span>
          © {year} Cayo Aguiar — {t("footer.rights")}
        </span>
        <div className="flex items-center gap-4">
          <a href="https://github.com/cayoaguiar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Github className="h-4 w-4" />
          </a>
          <a href="https://www.linkedin.com/in/cayo-aguiar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="mailto:cayocan@gmail.com" className="hover:text-white transition-colors">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 13: Compose app/page.tsx

**Files:**
- Rewrite: `app/page.tsx`

- [ ] **Step 1: Rewrite app/page.tsx**

```tsx
// app/page.tsx
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
```

> **Note:** `page.tsx` is a server component (no `"use client"`). All child components declare `"use client"` themselves. This is correct Next.js architecture.

- [ ] **Step 2: Run full build**

```bash
npm run build
```

Expected output:
```
✓ Compiled successfully
✓ Generating static pages (1/1)
```

Check that `out/index.html` exists:
```bash
ls out/index.html
```

- [ ] **Step 3: Smoke test locally**

```bash
npm run dev
```

Open `http://localhost:3000` and verify:
- [ ] Navbar shows, language switcher works (PT↔EN), mobile menu opens
- [ ] Hero section: badge pulses, terminal animates line by line
- [ ] Skills section: 4 cards visible, hover lifts card
- [ ] Projects section: filter pills work, AnimatePresence animates cards in/out
- [ ] Contact section: form fields work, submit opens mailto
- [ ] Footer: shows year, social icons

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: compose final page with all redesigned sections"
```

---

## Task 14: Final Verification & GitHub Pages Setup

- [ ] **Step 1: Ensure .gitignore excludes out/**

Open `.gitignore` and confirm `out/` or `/out` is listed. If not, add it:
```
# next.js
/out
/.next
```

- [ ] **Step 2: Push to GitHub**

```bash
git push origin main
```

- [ ] **Step 3: Enable GitHub Pages**

In your GitHub repo:
1. Settings → Pages
2. Source → **GitHub Actions**
3. Save

- [ ] **Step 4: Monitor the workflow**

Go to Actions tab in GitHub. The `Deploy to GitHub Pages` workflow should run automatically.

Expected: both `build` and `deploy` jobs show green checkmarks.

- [ ] **Step 5: Verify live site**

Open the URL shown in the workflow (e.g. `https://username.github.io/repo-name/`).

Verify:
- [ ] Site loads without 404
- [ ] All sections render correctly
- [ ] Language switcher persists on reload (localStorage)
- [ ] All links and images load

> **If images 404:** Check that `/gifs/*.gif` paths are correct relative to the basePath. With basePath `/repo-name`, image `src="/gifs/apex-ai.gif"` becomes `/repo-name/gifs/apex-ai.gif` automatically in Next.js static export.

---

## Self-Review Notes

**Spec coverage check:**
- ✓ Noir Cyber aesthetic (violet/cyan, dark bg, glassmorphism)
- ✓ Next.js static export with `output: 'export'`
- ✓ GitHub Actions CI/CD workflow
- ✓ Space Grotesk font (Task 4)
- ✓ Fixed Navbar with section indicator (Task 5)
- ✓ Language switcher EN/PT (Task 5)
- ✓ Hero with animated terminal (Tasks 6-7)
- ✓ Skills grid with glassmorphism (Task 8)
- ✓ Project category filter (Games/Web3/Backend/AI) with AnimatePresence (Tasks 9-10)
- ✓ Contact form via mailto (Task 11)
- ✓ Footer (Task 12)
- ✓ i18n all strings translated in both languages (Task 3)

**Type consistency check:**
- `ProjectCategory` defined in `ProjectCard.tsx`, imported in `Projects.tsx` ✓
- `useTranslation` used consistently with `"@/lib/i18n"` side-effect import in all components ✓
- `NEXT_PUBLIC_BASE_PATH` env var used in both `next.config.js` and `deploy.yml` ✓
