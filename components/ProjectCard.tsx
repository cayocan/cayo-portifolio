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
          <span
            className={`absolute top-3 right-3 rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles.badge}`}
          >
            {t(`projects.filter_${category}`)}
          </span>
        </div>
      )}

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
