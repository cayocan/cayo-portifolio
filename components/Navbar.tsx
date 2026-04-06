"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import "@/lib/i18n"

const SECTIONS = ["home", "skills", "projects", "contact"] as const

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [activeSection, setActiveSection] = useState<string>("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("i18nextLng")
    if (saved && saved !== i18n.language) {
      i18n.changeLanguage(saved)
    }
  }, [i18n])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem("i18nextLng", lang)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="font-display text-lg font-semibold bg-gradient-to-r from-violet-light to-cyan-light bg-clip-text text-transparent">
          Cayo Aguiar
        </span>

        <ul className="hidden md:flex items-center gap-8">
          {SECTIONS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="relative text-sm text-slate-400 hover:text-white transition-colors py-1"
              >
                {t(`nav.${id}`)}
                {activeSection === id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-violet-primary to-cyan-primary rounded-full"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
          {(["pt", "en"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
                i18n.language === lang
                  ? "bg-violet-primary text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          className="md:hidden text-slate-300 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-white/5 px-6 py-4 space-y-1"
          >
            {SECTIONS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 text-sm transition-colors border-b border-white/5 last:border-0 ${
                  activeSection === id ? "text-white" : "text-slate-400"
                }`}
              >
                {t(`nav.${id}`)}
              </a>
            ))}
            <div className="flex gap-2 pt-3">
              {(["pt", "en"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    changeLanguage(lang)
                    setMenuOpen(false)
                  }}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                    i18n.language === lang
                      ? "bg-violet-primary text-white"
                      : "border border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
