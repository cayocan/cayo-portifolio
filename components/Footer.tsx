"use client"

import { useTranslation } from "react-i18next"
import { Github, Linkedin, Mail } from "lucide-react"
import "@/lib/i18n"

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-slate-500">
        <span>
          © {year} Cayo Aguiar — {t("footer.rights")}
        </span>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/cayocan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/cayoaguiar/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="mailto:cayocan@gmail.com"
            className="hover:text-white transition-colors"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
