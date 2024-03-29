import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import de from "@/locales/de.json";

export default createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    de,
  },
  numberFormats: {
    en: {
      currency: {
        style: "currency",
        currency: "USD",
      },
    },
    ja: {
      currency: {
        style: "currency",
        currency: "JPY",
      },
    },
  },
});