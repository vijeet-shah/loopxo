"use client";

import { useState, useEffect } from 'react';
import { dictionary, BaseTranslations, languageNames } from './dictionary';
import { SupportedLanguage } from './types';

/**
 * Get the current language from client-side cookies
 * @param defaultLang - The default language to use if no cookie is found
 * @returns The detected language code
 */
export function getClientLanguage(defaultLang: SupportedLanguage = 'en'): SupportedLanguage {
  if (typeof window === 'undefined') {
    return defaultLang;
  }

  try {
    // Parse cookies from document.cookie
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      if (key && value) acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
    
    // Check if language cookie exists and is valid
    if (cookies["language"] && cookies["language"] in dictionary) {
      return cookies["language"] as SupportedLanguage;
    }
  } catch (error) {
    console.error("Error reading language cookie:", error);
  }
  
  // Default to the specified language
  return defaultLang;
}

/**
 * Set the language cookie and reload the page to apply changes
 * @param lang - The language code to set
 * @param reload - Whether to reload the page after setting the language
 */
export function setClientLanguage(lang: SupportedLanguage, reload = true): void {
  // Set cookie with a long expiration (1 year)
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  
  document.cookie = `language=${lang};expires=${expiryDate.toUTCString()};path=/;SameSite=Lax`;
  
  // Reload the page to apply the language change if requested
  if (reload) {
    window.location.reload();
  }
}

/**
 * Get translations for the specified language on the client side
 * @param lang - The language code to get translations for
 * @returns The translations object
 */
export function getClientTranslations(lang: SupportedLanguage = 'en'): BaseTranslations {
  return dictionary[lang] || dictionary.en;
}

/**
 * React hook to use translations in client components
 * @returns The current language, translations, and a function to change the language
 */
export function useTranslation() {
  const [lang, setLang] = useState<SupportedLanguage>('en');
  const [translations, setTranslations] = useState<BaseTranslations>(dictionary.en);
  
  useEffect(() => {
    // Get the language from cookies on the client side
    const detectedLang = getClientLanguage();
    setLang(detectedLang);
    setTranslations(dictionary[detectedLang] || dictionary.en);
  }, []);
  
  const changeLanguage = (newLang: SupportedLanguage) => {
    if (newLang === lang) return; // Skip if same language
    
    // Always reload when changing the language to ensure proper server-side rendering
    setClientLanguage(newLang, true);
    
    // These lines will only execute if reload is false
    setLang(newLang);
    setTranslations(dictionary[newLang] || dictionary.en);
  };
  
  return {
    lang,
    t: translations,
    changeLanguage,
    languageNames,
    supportedLanguages: Object.keys(dictionary) as SupportedLanguage[]
  };
}