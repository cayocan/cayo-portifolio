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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-violet-primary/40 to-transparent" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="mx-auto w-full max-w-6xl px-6"
      >
        <motion.div variants={fadeUp} className="mb-12">
          <p className="text-xs uppercase tracking-[0.32em] text-violet-light mb-2">
            {t("skills.kicker")}
          </p>
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            {t("skills.title")}
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {SKILLS.map((skill) => (
            <motion.div
              key={skill.key}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="group relative rounded-2xl border border-white/8 bg-surface p-6 transition-shadow hover:shadow-xl hover:shadow-violet-primary/10"
            >
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
