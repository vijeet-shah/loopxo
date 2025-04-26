"use client";

import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { useTranslation } from "@/lib/i18n/client-utils";
import { cn } from "@/lib/utils";
import { SupportedLanguage } from "@/lib/i18n/types";
import { motion, AnimatePresence } from "framer-motion";

export interface LanguageSelectorProps {
  variant?: "icon-only" | "with-text" | "dropdown" | "circular";
  className?: string;
}

export function LanguageSelector({ 
  variant = "icon-only", 
  className 
}: LanguageSelectorProps) {
  const { lang, changeLanguage, languageNames, supportedLanguages } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    if (newLang === lang) return;
    console.log("Language selected:", newLang);
    
    // Always force page reload
    changeLanguage(newLang);
    setIsOpen(false);
  };

  // For hero section's circular design
  if (variant === "circular") {
    return (
      <div className={cn("relative", className)} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-full flex items-center justify-center"
          aria-label="Select language"
        >
          <span className="text-base font-medium">{typeof lang === "string" ? lang.toUpperCase() : lang}</span>
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 shadow-lg z-50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/5 overflow-hidden"
              style={{ width: '140px' }}
            >
              <div className="py-1">
                {supportedLanguages.map((langCode) => (
                  <motion.button
                    key={langCode}
                    whileHover={{ backgroundColor: 'rgba(var(--primary), 0.1)' }}
                    onClick={() => handleLanguageChange(langCode)}
                    className={cn(
                      "block w-full text-left px-4 py-2 text-sm",
                      langCode === lang 
                        ? "bg-primary/10 text-primary font-medium" 
                        : ""
                    )}
                  >
                    {languageNames[langCode]}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (variant === "with-text") {
    return (
      <div className={cn("relative", className)} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 rounded-md p-2 hover:bg-muted"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <Globe className="h-5 w-5" />
          <span>{languageNames[lang]}</span>
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background ring-1 ring-black/5 z-50">
            <div className="py-1">
              {supportedLanguages.map((langCode) => (
                <button
                  key={langCode}
                  onClick={() => handleLanguageChange(langCode)}
                  className={cn(
                    "flex w-full items-center px-4 py-2 text-sm text-left",
                    langCode === lang 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "hover:bg-muted"
                  )}
                >
                  {languageNames[langCode]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  if (variant === "dropdown") {
    return (
      <div className={cn("relative inline-block text-left", className)} ref={dropdownRef}>
        <select
          value={lang}
          onChange={(e) => {
            console.log("Dropdown changed to:", e.target.value);
            handleLanguageChange(e.target.value as SupportedLanguage);
          }}
          className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {supportedLanguages.map((langCode) => (
            <option key={langCode} value={langCode}>
              {languageNames[langCode]}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  // Default: icon-only
  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-md p-2 hover:bg-muted"
        aria-label="Select language"
      >
        <Globe className="h-5 w-5" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background dark:bg-slate-800 ring-1 ring-black/5 z-50">
          <div className="py-1">
            {supportedLanguages.map((langCode) => (
              <button
                key={langCode}
                onClick={() => {
                  console.log("Language button clicked:", langCode);
                  handleLanguageChange(langCode);
                }}
                className={cn(
                  "block w-full text-left px-4 py-2 text-sm",
                  langCode === lang 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-muted"
                )}
              >
                {languageNames[langCode]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}