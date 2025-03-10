import { dictionary } from './dictionary';


// Export language names for consumption by both client and server components
export const languageNames = {
  en: "English",
  hi: "हिन्दी",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  zh: "中文",
};

export type SupportedLanguage = keyof typeof dictionary;