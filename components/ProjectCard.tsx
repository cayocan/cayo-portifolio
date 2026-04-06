"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react"
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
  /** Single image (legacy) */
  imageSrc?: string
  imageAlt?: string
  /** Multiple images → enables carousel */
  images?: Array<{ src: string; alt?: string }>
  wip?: boolean
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
  images,
  wip,
}: ProjectCardProps) {
  const { t } = useTranslation()
  const styles = CATEGORY_STYLES[category]

  // Normalise to a single array regardless of which prop was used
  const slides: Array<{ src: string; alt: string }> = images
    ? images.map((img) => ({ src: img.src, alt: img.alt ?? `${title} preview` }))
    : imageSrc
    ? [{ src: imageSrc, alt: imageAlt ?? `${title} preview` }]
    : []

  const [idx, setIdx] = useState(0)
  const isCarousel = slides.length > 1

  const prev = () => setIdx((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setIdx((i) => (i + 1) % slides.length)

  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-surface transition-shadow duration-300 hover:shadow-2xl ${styles.glow}`}
    >
      {slides.length > 0 && (
        <div className="relative overflow-hidden">
          <div className="aspect-video w-full bg-black/40">
            <img
              key={slides[idx].src}
              src={slides[idx].src}
              alt={slides[idx].alt}
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

          {/* WIP badge */}
          {wip && (
            <span className="absolute top-3 left-3 rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-0.5 text-xs font-medium text-amber-300">
              {t("projects.wip")}
            </span>
          )}

          {/* Carousel controls */}
          {isCarousel && (
            <>
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-black/70"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-black/70"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    aria-label={`Go to image ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      i === idx ? "w-4 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
            {wip && slides.length === 0 && (
              <span className="mt-1 inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-0.5 text-xs font-medium text-amber-300">
                {t("projects.wip")}
              </span>
            )}
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
