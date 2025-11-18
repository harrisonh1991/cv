import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import zh from "./locales/zh/translation.json";
import { getLang } from "./utils/utils";

void i18n.use(initReactI18next).init({
  resources: {
    "en-US": { translation: en },
    "zh-HK": { translation: zh },
  },
  lng: getLang(),
  fallbackLng: "en-US",
  interpolation: { escapeValue: false },
});

export default i18n;
