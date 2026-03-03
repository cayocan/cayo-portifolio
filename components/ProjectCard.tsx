"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  links?: ProjectLink[];
  icon?: LucideIcon;
  accent?: "blue" | "lime";
  imageSrc?: string;
  imageAlt?: string;
  reverse?: boolean;
};

export default function ProjectCard({
  title,
  description,
  tags,
  links = [],
  icon: Icon,
  accent = "blue",
  imageSrc,
  imageAlt,
  reverse = false,
}: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur"
    >
      <div
        className={
          accent === "lime"
            ? "absolute -right-16 -top-16 h-40 w-40 rounded-full bg-lime-400/20 blur-3xl"
            : "absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky-500/20 blur-3xl"
        }
      />
      <div className="relative grid h-full gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className={reverse ? "order-2 md:order-2" : "order-2 md:order-1"}>
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Featured Build</p>
              <h3 className="text-xl font-semibold text-white">{title}</h3>
            </div>
            {Icon ? (
              <span className="rounded-xl border border-white/10 bg-white/10 p-2 text-sky-300">
                <Icon className="h-5 w-5" />
              </span>
            ) : null}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-2 text-sm font-medium text-sky-300 transition group-hover:text-white"
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {imageSrc ? (
          <div className={reverse ? "order-1 md:order-1" : "order-1 md:order-2"}>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
              <div className="aspect-[16/9] w-full">
                <img
                  src={imageSrc}
                  alt={imageAlt ?? `${title} preview`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
