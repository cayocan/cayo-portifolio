# CV Download Section — Design Spec

**Goal:** Add a dedicated CV download section between Skills and Projects, allowing visitors to download Cayo's resume in English or PT-BR.

**Architecture:** New `CVDownload` component inserted into `page.tsx` between `<Skills />` and `<Projects />`. Uses react-i18next for bilingual labels. PDF files are served statically from `public/cv/`.

**Tech Stack:** Next.js 14 static export, Tailwind CSS, react-i18next, lucide-react

---

## Component: `components/CVDownload.tsx`

- `"use client"` with `useTranslation()`
- Framer Motion `fadeUp` animation (same pattern as Hero)
- Centered card: `border border-white/8 bg-surface rounded-2xl`
- Title via `t("cv.title")`
- Subtitle via `t("cv.subtitle")`
- Two pill buttons side by side:
  - EN button: `bg-violet-primary hover:bg-violet-light hover:shadow-violet-primary/30` — primary style
  - PT-BR button: `border border-white/15 bg-white/5 hover:border-violet-primary/50 hover:bg-violet-primary/10` — secondary style
- Both buttons: lucide-react `Download` icon, `download` attribute on `<a>` tag
- Paths:
  - EN: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/cv/Cayo_Aguiar_CV_GameDev_EN.pdf`
  - PT-BR: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/cv/Cayo_Aguiar_CV_GameDev_PTBR.pdf`

## i18n Keys

**en/common.json:**
```json
"cv": {
  "title": "Resume",
  "subtitle": "Download my resume to learn more about my experience and skills.",
  "download_en": "Download EN",
  "download_pt": "Download PT-BR"
}
```

**pt/common.json:**
```json
"cv": {
  "title": "Currículo",
  "subtitle": "Baixe meu currículo para saber mais sobre minha experiência e habilidades.",
  "download_en": "Download EN",
  "download_pt": "Download PT-BR"
}
```

## Files Changed

| File | Action |
|------|--------|
| `components/CVDownload.tsx` | Create |
| `app/page.tsx` | Add `<CVDownload />` between `<Skills />` and `<Projects />` |
| `public/locales/en/common.json` | Add `cv.*` keys |
| `public/locales/pt/common.json` | Add `cv.*` keys |
