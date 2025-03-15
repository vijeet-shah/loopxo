// lib/i18n/server-utils.tsx
'use server';

import { cookies } from 'next/headers';
import { dictionary } from './dictionary';
import type { BaseTranslations } from './dictionary';
import type { SupportedLanguage } from './types';

/**
 * Get the current language from cookies or use default
 * THIS FUNCTION CAN ONLY BE USED IN SERVER COMPONENTS
 * @param defaultLang - The default language to use if no cookie is found
 * @returns The detected language code
 */
export async function getLanguage(defaultLang: SupportedLanguage = 'en'): Promise<SupportedLanguage> {
  try {
    // Get cookies in a way that works with Next.js server components
    const cookieStore = await cookies();
    const langCookie = cookieStore.get('language');
    
    // Check if the cookie exists and has a valid value
    if (langCookie && langCookie.value in dictionary) {
      return langCookie.value as SupportedLanguage;
    }
  } catch (error) {
    console.error('Error reading language cookie:', error);
  }
  
  // Return the default language
  return defaultLang;
}

/**
 * Get translations for the specified language
 * @param lang - The language code to get translations for
 * @returns The translations object
 */
export async function getTranslations(lang: SupportedLanguage = 'en'): Promise<BaseTranslations> {
  // Make sure we only use valid dictionary entries and that dictionary is defined
  if (!dictionary) {
    console.error('Dictionary is undefined');
    return {} as BaseTranslations;
  }
  
  return dictionary[lang] || dictionary.en || {} as BaseTranslations;
}