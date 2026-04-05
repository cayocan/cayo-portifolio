# Portfolio Redesign — Design Spec
**Date:** 2026-04-05
**Status:** Approved

---

## Overview

Full redesign of Cayo Aguiar's portfolio site from scratch. Aesthetic: **Tech & Futurista / Noir Cyber** — dark background, purple/violet + cyan palette, glassmorphism cards, animated terminal hero, glow effects. Single page with fixed navbar. Compatible with GitHub Pages via Next.js static export + GitHub Actions CI/CD.

---

## Technical Architecture

### Stack
- **Next.js 14** with `output: 'export'` in `next.config.js`
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — animations and transitions
- **react-i18next + i18next** — internationalization (EN / PT-BR)
- **lucide-react** — icons
- **Space Grotesk** (headings) + **Inter** (body) — Google Fonts

### GitHub Pages Deployment
- Static build output to `out/` folder via `next build`
- GitHub Actions workflow at `.github/workflows/deploy.yml`
- Workflow: push to `main` → `next build` → deploy `out/` via `actions/deploy-pages`
- GitHub Pages configured: Settings → Pages → Source: GitHub Actions
- `next.config.js` must set `basePath`, `assetPrefix`, and `images: { unoptimized: true }`

### next.config.js requirements
```js
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
}
```

---

## Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `background` | `#08060f` | Page background |
| `surface` | `#110d1e` | Cards, panels |
| `violet-primary` | `#7c3aed` | Primary accent |
| `violet-light` | `#a855f7` | Gradients, glows |
| `cyan-primary` | `#06b6d4` | Secondary accent |
| `cyan-light` | `#22d3ee` | Highlights |
| `text-primary` | `#f8fafc` | Headings |
| `text-secondary` | `#94a3b8` | Body, labels |

### Typography
- **Headings:** Space Grotesk, bold/semibold
- **Body:** Inter, regular/medium
- **Terminal/mono:** JetBrains Mono or system monospace
- Hero name: 64px+ desktop, 40px mobile, gradient violet→cyan on keyword

### Component Patterns
- **Cards:** `bg-[#110d1e]` + `border border-white/10` + `backdrop-blur` + violet glow on hover
- **Buttons (primary):** solid violet background, white text, hover lightens
- **Buttons (ghost):** transparent + `border-white/20`, hover adds bg
- **Glows:** `box-shadow: 0 0 40px rgba(124,58,237,0.3)` on card hover
- **Gradients:** `violet-primary → cyan-primary` for decorative elements and section dividers

---

## File Structure

```
app/
  layout.tsx              ← metadata, fonts, i18n provider, global styles
  page.tsx                ← single page, composes all sections
components/
  Navbar.tsx              ← fixed top nav, section dots indicator, language switcher
  Hero.tsx                ← split layout: bio left + terminal right
  Terminal.tsx            ← animated typing terminal component
  Skills.tsx              ← skills grid section
  Projects.tsx            ← projects grid with category filter
  ProjectCard.tsx         ← redesigned glassmorphism project card
  Contact.tsx             ← contact form + social links
  Footer.tsx              ← single-line footer
lib/
  i18n.ts                 ← i18next initialization
public/
  locales/
    en/common.json        ← all English strings
    pt/common.json        ← all Portuguese PT-BR strings
  gifs/                   ← project preview GIFs (existing)
.github/
  workflows/
    deploy.yml            ← GitHub Actions CI/CD for GitHub Pages
docs/
  superpowers/specs/      ← this file
```

---

## Sections

### 1. Navbar
- Fixed top, full width
- Left: name/logo
- Center: nav links (`Home · Skills · Projects · Contact`)
- Right: language switcher (`EN | PT`) + optional GitHub link
- Active section indicator: violet dot/underline below active link (uses IntersectionObserver)
- Mobile: hamburger icon, full-screen overlay menu with slide animation
- Background: `bg-[#08060f]/80 backdrop-blur border-b border-white/5`

### 2. Hero
Layout: 60/40 split (desktop), stacked (mobile)

**Left column:**
- Badge: "Available for hire" / "Disponível para contratação" — green pulsing dot + pill
- H1: "Cayo Aguiar" in Space Grotesk bold, gradient violet→cyan on "Aguiar" or role keyword
- Subtitle: "Full Stack Developer · C# & .NET · AI · Unity · Web3"
- Bio paragraph (2-3 lines)
- Two CTA buttons: "View Projects" (violet solid) + "Let's Talk" (ghost)
- Two info badges: availability + focus area

**Right column:**
- Dark terminal window (macOS-style header with red/yellow/green dots)
- Animated typing effect, line by line:
  ```
  > whoami
  Cayo Aguiar — Full Stack Dev
  > stack --list
  C# · .NET · Next.js · Unity · Web3
  > status
  Available for hire ✓
  ```
- Cursor blinks after last line
- Terminal has subtle violet glow border

**Background:** radial gradient glow at top-center (violet), grid overlay (subtle)

### 3. Skills
- Section header with icon + kicker + title (same pattern as current)
- 2×2 grid desktop, 1 col mobile
- Cards: glassmorphism, icon top-left, title, bullet list of techs
- Hover: violet glow, slight lift (`y: -4`)
- Categories: Backend · Frontend · AI/DevOps · Specialized

### 4. Projects
- Section header
- **Filter bar:** `All · Games · Web3 · Backend · AI` — pill buttons, active = violet filled
- Filtering uses `AnimatePresence` from Framer Motion for smooth enter/exit
- 2-column grid (desktop), 1 col (mobile)
- Each `ProjectCard`:
  - Preview image/GIF (top, 16:9 aspect)
  - Category badge (top-right corner of image)
  - Title + description
  - Tag pills
  - Optional links (GitHub, Live)
  - Hover: glow border (violet for Games/Backend, cyan for Web3/AI)

**Project categories:**
- Games: Unity projects
- Web3: Blockchain/crypto projects (Arbitrage Bot, etc.)
- Backend: C#/.NET/Python backend projects
- AI: AI-powered projects (Apex AI, FishDex, Argus Bot, etc.)

### 5. Contact
Two-column layout (desktop):
- **Left:** Contact form — Name, Email, Message fields + Submit button
  - Form submits via `mailto:` (no backend needed for static site)
  - Fields styled with dark bg, violet focus border
- **Right:** Direct contact card (email) + Social links card (LinkedIn, GitHub)

### 6. Footer
Single line:
- Left: `© 2025 Cayo Aguiar`
- Right: Social icon links

---

## Internationalization (i18n)

### Library
`react-i18next` + `i18next` — client-side only, compatible with static export.

### Setup
- `lib/i18n.ts`: initializes i18next with `initReactI18next`, loads JSON from `public/locales/`
- Language stored in `localStorage` key `i18nextLng`
- Default language: `pt` (Portuguese), fallback: `en`
- Import `useTranslation` hook in each component

### Translation file structure
```json
// public/locales/en/common.json
{
  "nav": { "home": "Home", "skills": "Skills", ... },
  "hero": { "badge": "Available for hire", "name": "Cayo Aguiar", ... },
  "skills": { "title": "Core Skills", ... },
  "projects": { "title": "Featured Projects", "filter": { "all": "All", ... } },
  "contact": { "title": "Let's Work Together", ... }
}
```

### Language Switcher
- Component in Navbar, right side
- Two buttons: `EN` | `PT` — active is violet, inactive is ghost
- On click: calls `i18n.changeLanguage()`, saves to localStorage

---

## GitHub Actions Workflow

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
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run build
        env:
          NEXT_PUBLIC_BASE_PATH: /${{ github.event.repository.name }}
      - uses: actions/upload-pages-artifact@v3
        with: { path: out }
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

---

## Animations

| Element | Animation |
|---------|-----------|
| Hero text | `fadeUp` stagger on mount |
| Terminal | Type line by line, 60ms/char, 400ms between lines |
| Section entry | `whileInView` fadeUp, `once: true` |
| Project cards | `AnimatePresence` on filter change |
| Navbar | Fade in on scroll down, always visible |
| Card hover | `y: -6`, glow box-shadow transition |

---

## Constraints & Notes

- No server-side rendering — all components that use browser APIs must be `"use client"` or wrapped in `useEffect`
- `next/image` → must use `<img>` or set `unoptimized: true` in config
- No API routes (incompatible with static export)
- Contact form uses `mailto:` link — no form backend
- All text content must have both EN and PT translations from day one
- `basePath`/`assetPrefix`: if repo is `username.github.io` (user page), both should be `''`; if repo is a project page (e.g. `portfolio`), both should be `/portfolio`. Set via `NEXT_PUBLIC_BASE_PATH` env var in the GitHub Actions workflow
