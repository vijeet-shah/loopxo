// This file contains functions that can be used in both client and server components
import { dictionary, BaseTranslations, languageNames } from './dictionary';
import { SupportedLanguage } from './types';

// Export languageNames from the dictionary
export { languageNames };
export type { SupportedLanguage };

/**
 * Get translations for the specified language
 * @param lang - The language code to get translations for
 * @returns The translations object
 */
export function getTranslations(lang: SupportedLanguage = 'en'): BaseTranslations {
  // Make sure we only use valid dictionary entries
  return dictionary[lang] || dictionary.en;
}

/**
 * Universal function to get language that can be used anywhere
 * IMPORTANT: This doesn't check cookies, it's just for default values
 */
export function getDefaultLanguage(): SupportedLanguage {
  return 'en';
}