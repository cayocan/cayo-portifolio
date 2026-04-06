"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Briefcase, Brain } from "lucide-react"
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
        <motion.div className="space-y-8">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-primary/40 bg-violet-primary/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-violet-light">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-primary" />
              </span>
              {t("hero.badge")}
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4">
            <h1 className="font-display text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Cayo{" "}
              <span className="bg-gradient-to-r from-violet-light to-cyan-light bg-clip-text text-transparent">
                Aguiar
              </span>
            </h1>
            <p className="text-lg text-slate-400 md:text-xl">{t("hero.subtitle")}</p>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-base leading-relaxed text-slate-400"
          >
            {t("hero.bio")}
          </motion.p>

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
