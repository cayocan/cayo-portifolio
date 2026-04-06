"use client"

import { motion } from "framer-motion"
import { Mail, Linkedin, Github, ArrowUpRight, Send } from "lucide-react"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/cayo-aguiar",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/cayoaguiar",
    icon: Github,
  },
  {
    label: "Email",
    href: "mailto:cayocan@gmail.com",
    icon: Mail,
  },
]

const inputClass =
  "mt-2 w-full rounded-xl border border-white/8 bg-black/40 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 focus:border-violet-primary/60 focus:bg-black/60 focus:ring-1 focus:ring-violet-primary/30"

export default function Contact() {
  const { t } = useTranslation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem("name") as HTMLInputElement).value
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value
    const subject = `Portfolio contact from ${name}`
    const body = `From: ${name} (${email})\n\n${message}`
    window.location.href = `mailto:cayocan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact" className="relative py-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-violet-primary/40 to-transparent" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        className="mx-auto w-full max-w-6xl px-6"
      >
        <motion.div variants={fadeUp} className="mb-12">
          <p className="text-xs uppercase tracking-[0.32em] text-violet-light mb-2">
            {t("contact.kicker")}
          </p>
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            {t("contact.title")}
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/8 bg-surface p-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-400">
                {t("contact.label_name")}
                <input
                  type="text"
                  name="name"
                  required
                  className={inputClass}
                  placeholder={t("contact.placeholder_name")}
                />
              </label>
              <label className="text-sm text-slate-400">
                {t("contact.label_email")}
                <input
                  type="email"
                  name="email"
                  required
                  className={inputClass}
                  placeholder={t("contact.placeholder_email")}
                />
              </label>
            </div>
            <label className="mt-4 block text-sm text-slate-400">
              {t("contact.label_message")}
              <textarea
                name="message"
                rows={5}
                required
                className={`${inputClass} resize-none`}
                placeholder={t("contact.placeholder_message")}
              />
            </label>
            <button
              type="submit"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-violet-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-violet-light hover:shadow-lg hover:shadow-violet-primary/30"
            >
              {t("contact.send")}
              <Send className="h-4 w-4" />
            </button>
          </motion.form>

          <div className="space-y-4">
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-white/8 bg-surface p-6"
            >
              <h3 className="font-display text-xl font-semibold text-white mb-2">
                {t("contact.direct_title")}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400 mb-4">
                {t("contact.direct_desc")}
              </p>
              <a
                href="mailto:cayocan@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-cyan-light hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                cayocan@gmail.com
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-white/8 bg-surface p-6"
            >
              <h3 className="font-display text-xl font-semibold text-white mb-4">
                {t("contact.networks_title")}
              </h3>
              <div className="flex flex-wrap gap-3">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition-all hover:border-violet-primary/40 hover:bg-violet-primary/10 hover:text-white"
                  >
                    <social.icon className="h-4 w-4" />
                    {social.label}
                    <ArrowUpRight className="h-3 w-3 opacity-50" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
