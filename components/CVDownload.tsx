"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { useTranslation } from "react-i18next"
import "@/lib/i18n"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function CVDownload() {
  const { t } = useTranslation()
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

  return (
    <section id="cv" className="relative py-16">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="flex flex-col items-center gap-6 rounded-2xl border border-white/8 bg-surface px-8 py-10 text-center"
        >
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-bold text-white">
              {t("cv.title")}
            </h2>
            <p className="text-slate-400">{t("cv.subtitle")}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`${base}/cv/Cayo_Aguiar_CV_GameDev_EN.pdf`}
              download
              className="inline-flex items-center gap-2 rounded-full bg-violet-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-violet-light hover:shadow-lg hover:shadow-violet-primary/30"
            >
              <Download className="h-4 w-4" />
              {t("cv.download_en")}
            </a>
            <a
              href={`${base}/cv/Cayo_Aguiar_CV_GameDev_PTBR.pdf`}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-violet-primary/50 hover:bg-violet-primary/10"
            >
              <Download className="h-4 w-4" />
              {t("cv.download_pt")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
