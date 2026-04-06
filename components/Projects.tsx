"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Activity, Bot, Sparkles, Lock, Wallet, MessageSquare, Gamepad2, Smartphone, GraduationCap, CircleDot, Grid3X3, Swords, type LucideIcon } from "lucide-react"
import ProjectCard, { type ProjectCategory } from "./ProjectCard"
import "@/lib/i18n"

type FilterKey = "all" | ProjectCategory

const PROJECTS: Array<{
  title: string
  descKey: string
  tags: string[]
  category: ProjectCategory
  images?: Array<{ src: string; alt?: string }>
  icon: LucideIcon
  wip?: boolean
  links?: Array<{ label: string; href: string }>
}> = [
  {
    title: "Apex AI",
    descKey: "projects.desc_apex_ai",
    tags: ["C#", ".NET", "Realtime", "Telemetry"],
    category: "ai",
    icon: Activity,
    wip: true,
    images: [
      { src: "/images/ApexAi/img01.PNG" },
      { src: "/images/ApexAi/img02.PNG" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/cayocan/Apex-AI" }],
  },
  {
    title: "Block Jar Tip",
    descKey: "projects.desc_block_jar_tip",
    tags: ["Solidity", "dApp", "Smart Contracts", "Web3"],
    category: "web3",
    icon: Wallet,
    images: [
      { src: "/images/BlockTipJar/STEP_001.gif" },
      { src: "/images/BlockTipJar/STEP_002.gif" },
      { src: "/images/BlockTipJar/STEP_003.gif" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/web3-portfolio-projects/block-jar-tip" }],
  },
  {
    title: "Crossbar GGJ18",
    descKey: "projects.desc_crossbar",
    tags: ["Unity", "Game Jam", "Android", "Windows"],
    category: "games",
    icon: Gamepad2,
    images: [
      { src: "/images/Crossbar/img01.png" },
      { src: "/images/Crossbar/img02.png" },
      { src: "/images/Crossbar/img03.png" },
    ],
    links: [{ label: "itch.io", href: "https://johnnyr-san.itch.io/crossbar-ggj18" }],
  },
  {
    title: "eth-agents",
    descKey: "projects.desc_eth_agents",
    tags: ["Claude Code", "AI Agents", "Ethereum", "Plugin"],
    category: "ai",
    icon: Bot,
    images: [
      { src: "/images/eth-agents/img01.PNG" },
      { src: "/images/eth-agents/img02.PNG" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/cayocan/eth-agents" },
      { label: "Site", href: "https://cayocan.github.io/eth-agents/" },
    ],
  },
  {
    title: "FishDex",
    descKey: "projects.desc_fishdex",
    tags: ["AI", "Vision", "Mobile", "Product"],
    category: "ai",
    icon: Sparkles,
    wip: true,
    images: [
      { src: "/images/FishDex/img01.PNG" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/cayocan/fishdex" }],
  },
  {
    title: "Grave Knight",
    descKey: "projects.desc_grave_knight",
    tags: ["Unity", "RPG", "Visual Novel", "Steam"],
    category: "games",
    icon: Swords,
    images: [
      { src: "/images/GraveKnight/img01.png" },
      { src: "/images/GraveKnight/Screen1Port.png" },
      { src: "/images/GraveKnight/Screen2PortVivi.png" },
      { src: "/images/GraveKnight/Screen3Port.png" },
      { src: "/images/GraveKnight/Screen4Port.png" },
      { src: "/images/GraveKnight/Screen5Port.png" },
      { src: "/images/GraveKnight/Screen6Port.png" },
      { src: "/images/GraveKnight/Screen7Port.png" },
      { src: "/images/GraveKnight/Screen8Port.png" },
      { src: "/images/GraveKnight/Screen9Port.png" },
      { src: "/images/GraveKnight/Screens10Port.png" },
    ],
    links: [{ label: "Steam", href: "https://store.steampowered.com/app/1484790/Grave_Knight/" }],
  },
  {
    title: "Greeting Wall",
    descKey: "projects.desc_greeting_wall",
    tags: ["Solidity", "dApp", "Events", "Web3"],
    category: "web3",
    icon: MessageSquare,
    images: [
      { src: "/images/GreetingWall/demo.gif" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/web3-portfolio-projects/greeting-wall" }],
  },
  {
    title: "Peg Adventure: Solo Noble",
    descKey: "projects.desc_peg_adventure",
    tags: ["Unity", "Puzzle", "Steam", "Strategy"],
    category: "games",
    icon: Grid3X3,
    images: [
      { src: "/images/PegAdventure/01img01.png" },
      { src: "/images/PegAdventure/1433830_20201027071431_1.png" },
      { src: "/images/PegAdventure/1433830_20201027071518_1.png" },
      { src: "/images/PegAdventure/1433830_20201027071601_1.png" },
      { src: "/images/PegAdventure/1433830_20201027071657_1.png" },
      { src: "/images/PegAdventure/1433830_20201027071720_1.png" },
      { src: "/images/PegAdventure/1433830_20201027071845_1.png" },
      { src: "/images/PegAdventure/1433830_20201027071917_1.png" },
      { src: "/images/PegAdventure/1433830_20201027072350_1.png" },
      { src: "/images/PegAdventure/1433830_20201027072356_1.png" },
    ],
    links: [{ label: "Steam", href: "https://store.steampowered.com/app/1433830/Peg_Adventure__Solo_Noble/" }],
  },
  {
    title: "Play Educa Disney",
    descKey: "projects.desc_play_educa",
    tags: ["Unity", "Educational", "Disney", "Mobile"],
    category: "games",
    icon: GraduationCap,
    images: [
      { src: "/images/PlayEduca/img01.PNG" },
      { src: "/images/PlayEduca/img02.PNG" },
      { src: "/images/PlayEduca/img03.PNG" },
      { src: "/images/PlayEduca/img04.PNG" },
      { src: "/images/PlayEduca/img05.PNG" },
      { src: "/images/PlayEduca/img06.PNG" },
      { src: "/images/PlayEduca/img07.PNG" },
    ],
  },
  {
    title: "ShieldMaiden: Remix Edition",
    descKey: "projects.desc_shieldmaiden",
    tags: ["Unity", "Xbox", "Porting", "Console"],
    category: "games",
    icon: Gamepad2,
    images: [
      { src: "/images/Shieldmaiden/img01.png" },
    ],
    links: [{ label: "Xbox Store", href: "https://www.xbox.com/pt-BR/games/store/shieldmaiden-remix-edition/9mtgtz54t4p9" }],
  },
  {
    title: "Truzzle",
    descKey: "projects.desc_truzzle",
    tags: ["Unity", "Puzzle", "Steam", "Casual"],
    category: "games",
    icon: CircleDot,
    images: [
      { src: "/images/Truzzle/cap1.png" },
      { src: "/images/Truzzle/cap2.png" },
    ],
    links: [{ label: "Steam", href: "https://store.steampowered.com/app/1342730/Truzzle/" }],
  },
  {
    title: "UTC Não Pode Rir",
    descKey: "projects.desc_utc",
    tags: ["Unity", "Android", "Party", "Mobile"],
    category: "games",
    icon: Smartphone,
    images: [
      { src: "/images/UTC/img01.png" },
      { src: "/images/UTC/img02.png" },
      { src: "/images/UTC/img03.png" },
    ],
    links: [{ label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.dreamlight.utcnaopoderir" }],
  },
  {
    title: "VaultPass",
    descKey: "projects.desc_vaultpass",
    tags: ["NFT", "Solidity", "Web3", "White-label"],
    category: "web3",
    icon: Lock,
    wip: true,
    images: [
      { src: "/images/VaultPass/img01.PNG" },
      { src: "/images/VaultPass/img02.PNG" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/web3-portfolio-projects/vaultpass" }],
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

  const filtered = (
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter)
  ).slice().sort((a, b) => a.title.localeCompare(b.title))

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
                <ProjectCard {...project} description={t(project.descKey)} wip={project.wip} />
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
