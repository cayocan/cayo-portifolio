// lib/i18n.ts
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "../public/locales/en/common.json"
import pt from "../public/locales/pt/common.json"

const queryLang =
  typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("lang") ?? undefined
    : undefined

const supportedLangs = ["en", "pt"]
const initialLng =
  queryLang && supportedLangs.includes(queryLang) ? queryLang : "pt"

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { common: en },
      pt: { common: pt },
    },
    lng: initialLng,
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
  })
}

export default i18n
