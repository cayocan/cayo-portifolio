"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Activity, Bot, Sparkles, Shield, Lock, Wallet, MessageSquare, Gamepad2, Smartphone, GraduationCap, CircleDot, Grid3X3, Swords, type LucideIcon } from "lucide-react"
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
  icon: LucideIcon
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
  {
    title: "VaultPass",
    description:
      "NFT Access Infrastructure — white-label platform for creating, distributing and monetizing Access Pass NFTs.",
    tags: ["NFT", "Solidity", "Web3", "White-label"],
    category: "web3",
    icon: Lock,
    links: [{ label: "GitHub", href: "https://github.com/web3-portfolio-projects/vaultpass" }],
  },
  {
    title: "Block Jar Tip",
    description:
      "Full-stack Web3 tipping dApp where merchants deploy their own smart contract, generate a unique QR/link, and receive on-chain tips with optional messages.",
    tags: ["Solidity", "dApp", "Smart Contracts", "Web3"],
    category: "web3",
    icon: Wallet,
    links: [{ label: "GitHub", href: "https://github.com/web3-portfolio-projects/block-jar-tip" }],
  },
  {
    title: "Greeting Wall",
    description:
      "Full-stack Web3 dApp where users connect their wallet, submit on-chain greetings, and read the latest messages from blockchain event history.",
    tags: ["Solidity", "dApp", "Events", "Web3"],
    category: "web3",
    icon: MessageSquare,
    links: [{ label: "GitHub", href: "https://github.com/web3-portfolio-projects/greeting-wall" }],
  },
  {
    title: "eth-agents",
    description:
      "Claude Code plugin bringing a team of 10 specialized AI agents to Ethereum development. Describe what you want in plain English — eth-agents figures out the rest.",
    tags: ["Claude Code", "AI Agents", "Ethereum", "Plugin"],
    category: "ai",
    icon: Bot,
    links: [{ label: "GitHub", href: "https://github.com/cayocan/eth-agents" }],
  },
  {
    title: "UTC Não Pode Rir",
    description:
      "Party game for Android where players try not to laugh at absurd dares and challenges. Free-to-play with 1K+ downloads.",
    tags: ["Unity", "Android", "Party", "Mobile"],
    category: "games",
    icon: Smartphone,
    links: [{ label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.dreamlight.utcnaopoderir" }],
  },
  {
    title: "Crossbar GGJ18",
    description:
      "Global Game Jam 2018 entry. Play as a switchboard operator connecting incoming transmissions under pressure before you get fired. Made with Unity.",
    tags: ["Unity", "Game Jam", "Android", "Windows"],
    category: "games",
    icon: Gamepad2,
    links: [{ label: "itch.io", href: "https://johnnyr-san.itch.io/crossbar-ggj18" }],
  },
  {
    title: "Play Educa Disney",
    description:
      "Educational platform with 100+ licensed Disney character activities for children, featuring IAP, Addressables, and a REST API + CDN content pipeline targeting Android, iOS, and WebGL.",
    tags: ["Unity", "Educational", "Disney", "Mobile"],
    category: "games",
    icon: GraduationCap,
  },
  {
    title: "Truzzle",
    description:
      "Casual puzzle game published on Steam. Take the ball from start to finish through 80+ handmade levels with increasing difficulty — spins, teleports, and moving parts included.",
    tags: ["Unity", "Puzzle", "Steam", "Casual"],
    category: "games",
    icon: CircleDot,
    links: [{ label: "Steam", href: "https://store.steampowered.com/app/1342730/Truzzle/" }],
  },
  {
    title: "Peg Adventure: Solo Noble",
    description:
      "Steam puzzle game — a fresh take on classic peg solitaire. Unlock levels with peak performance across 3-star challenges and 43 Steam achievements. Published by Dreamlight Games.",
    tags: ["Unity", "Puzzle", "Steam", "Strategy"],
    category: "games",
    icon: Grid3X3,
    links: [{ label: "Steam", href: "https://store.steampowered.com/app/1433830/Peg_Adventure__Solo_Noble/" }],
  },
  {
    title: "Grave Knight",
    description:
      "Interactive RPG Visual Novel on Steam with 70k+ words, dice-roll combat, 3 playable classes, and nonlinear storytelling inspired by the SRD 5.1 ruleset. Published by Dreamlight Games.",
    tags: ["Unity", "RPG", "Visual Novel", "Steam"],
    category: "games",
    icon: Swords,
    links: [{ label: "Steam", href: "https://store.steampowered.com/app/1484790/Grave_Knight/" }],
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
        <motion.div variants={fadeUp} className="mb-10">
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-light mb-2">
            {t("projects.kicker")}
          </p>
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            {t("projects.title")}
          </h2>
        </motion.div>

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

        <motion.div
          layout
          className="grid gap-5 sm:grid-cols-2"
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

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center text-slate-500"
          >
            {t("projects.empty")}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
