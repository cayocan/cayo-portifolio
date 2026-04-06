# CV Download Section — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a bilingual CV download section between Skills and Projects on the portfolio page.

**Architecture:** New `CVDownload` component with two download buttons (EN + PT-BR), wired into `page.tsx` between `<Skills />` and `<Projects />`. Labels via react-i18next. PDF paths prefixed with `NEXT_PUBLIC_BASE_PATH` for GitHub Pages compatibility.

**Tech Stack:** Next.js 14 static export, Tailwind CSS, react-i18next, lucide-react, Framer Motion

---

### Task 1: Add i18n keys

**Files:**
- Modify: `public/locales/en/common.json`
- Modify: `public/locales/pt/common.json`

- [ ] **Step 1: Add CV keys to English locale**

Open `public/locales/en/common.json` and add the `cv` object at the top level (alongside `nav`, `hero`, etc.):

```json
"cv": {
  "title": "Resume",
  "subtitle": "Download my resume to learn more about my experience and skills.",
  "download_en": "Download EN",
  "download_pt": "Download PT-BR"
}
```

- [ ] **Step 2: Add CV keys to Portuguese locale**

Open `public/locales/pt/common.json` and add the `cv` object:

```json
"cv": {
  "title": "Currículo",
  "subtitle": "Baixe meu currículo para saber mais sobre minha experiência e habilidades.",
  "download_en": "Download EN",
  "download_pt": "Download PT-BR"
}
```

- [ ] **Step 3: Commit**

```bash
git add public/locales/en/common.json public/locales/pt/common.json
git commit -m "feat: add cv i18n keys for EN and PT-BR"
```

---

### Task 2: Create CVDownload component

**Files:**
- Create: `components/CVDownload.tsx`

- [ ] **Step 1: Create the component**

Create `components/CVDownload.tsx` with the following content:

```tsx
"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function CVDownload() {
  const { t } = useTranslation()
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

  return (
    <section id="cv" className="relative py-16">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="flex flex-col items-center gap-6 rounded-2xl border border-white/8 bg-surface px-8 py-10 text-center"
        >
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-bold text-white">
              {t("cv.title")}
            </h2>
            <p className="text-slate-400">{t("cv.subtitle")}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`${base}/cv/Cayo_Aguiar_CV_GameDev_EN.pdf`}
              download
              className="inline-flex items-center gap-2 rounded-full bg-violet-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-violet-light hover:shadow-lg hover:shadow-violet-primary/30"
            >
              <Download className="h-4 w-4" />
              {t("cv.download_en")}
            </a>
            <a
              href={`${base}/cv/Cayo_Aguiar_CV_GameDev_PTBR.pdf`}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-violet-primary/50 hover:bg-violet-primary/10"
            >
              <Download className="h-4 w-4" />
              {t("cv.download_pt")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify it compiles locally**

```bash
npm run dev
```

Navigate to `http://localhost:3000` and confirm the CV section appears between Skills and Projects (after next task), with no console errors.

- [ ] **Step 3: Commit**

```bash
git add components/CVDownload.tsx
git commit -m "feat: add CVDownload component with bilingual download buttons"
```

---

### Task 3: Wire into page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Import and add CVDownload to page**

Replace the contents of `app/page.tsx` with:

```tsx
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Skills from "@/components/Skills"
import CVDownload from "@/components/CVDownload"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navbar />
      <Hero />
      <Skills />
      <CVDownload />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 2: Verify locally**

```bash
npm run dev
```

Open `http://localhost:3000`. The CV section should appear between Skills and Projects, showing "Resume" / "Currículo" based on the active language, with two download buttons.

- [ ] **Step 3: Build for production**

```bash
npm run build
```

Expected: no errors. Check `out/` folder contains `cv/Cayo_Aguiar_CV_GameDev_EN.pdf` and `cv/Cayo_Aguiar_CV_GameDev_PTBR.pdf` (Next.js copies `public/` to `out/` automatically).

- [ ] **Step 4: Commit and push**

```bash
git add app/page.tsx
git commit -m "feat: add CVDownload section to page between Skills and Projects"
git push
```
