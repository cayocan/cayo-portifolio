# Cayo Aguiar — Portfolio

Personal portfolio site built with Next.js 14, deployed to GitHub Pages via GitHub Actions.

**Live:** [cayoaguiar.github.io](https://cayoaguiar.github.io) *(update with your actual URL)*

---

## Stack

| | |
|---|---|
| Framework | Next.js 14 (static export) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| i18n | react-i18next (EN / PT-BR) |
| Icons | lucide-react |
| Fonts | Space Grotesk + Inter (Google Fonts) |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

## Features

- **Noir Cyber design** — dark background, violet/cyan palette, glassmorphism cards
- **Animated terminal** in the hero section
- **Project filter** by category: Games · Web3 · Backend · AI
- **Bilingual** — toggle between English and Portuguese (PT-BR), persisted in localStorage
- **Static export** — no server required, fully compatible with GitHub Pages

## Project Structure

```
app/
  layout.tsx          # Fonts, metadata, global styles
  page.tsx            # Page composition
  globals.css         # Design tokens, scrollbar
components/
  Navbar.tsx          # Fixed nav, section indicator, language switcher
  Hero.tsx            # Split layout: bio + terminal
  Terminal.tsx        # Animated typing terminal
  Skills.tsx          # Skills grid
  Projects.tsx        # Project grid with category filter
  ProjectCard.tsx     # Individual project card
  Contact.tsx         # Contact form + social links
  Footer.tsx          # Footer
lib/
  i18n.ts             # i18next configuration
public/
  locales/
    en/common.json    # English strings
    pt/common.json    # Portuguese strings
  gifs/               # Project preview GIFs
.github/
  workflows/
    deploy.yml        # GitHub Actions: build + deploy to GitHub Pages
```

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a Project

Edit the `PROJECTS` array in `components/Projects.tsx`:

```ts
{
  title: "My Project",
  description: "What it does.",
  tags: ["React", "Node.js"],
  category: "backend",   // "games" | "web3" | "backend" | "ai"
  icon: SomeLucideIcon,
  imageSrc: "/gifs/my-project.gif",
  links: [{ label: "GitHub", href: "https://github.com/..." }],
},
```

## Updating Translations

Edit the JSON files in `public/locales/`:

```
public/locales/en/common.json   ← English
public/locales/pt/common.json   ← Portuguese
```

Both files must have identical keys.

## Deployment

Push to `main` — GitHub Actions automatically builds and deploys to GitHub Pages.

**First-time setup:**
1. Go to repo → **Settings → Pages**
2. Source → **GitHub Actions**
3. Save

**Note on base path:** If the repo is named anything other than `username.github.io`, the workflow automatically sets `NEXT_PUBLIC_BASE_PATH=/repo-name` so all assets resolve correctly.

## License

MIT
