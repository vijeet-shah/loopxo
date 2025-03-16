// components/layout/navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Mail } from "lucide-react";

import { siteConfig } from "@/config/site";
import { navigationConfig } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageSelector } from "@/components/language-selector";
import { SearchDialog } from "@/components/search-dialog";
import { NewsletterBanner } from "./newsletter-banner";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(true);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if a nav link is active
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Close newsletter banner
  const closeNewsletter = () => {
    setShowNewsletter(false);
    // Optional: save to localStorage to keep it closed across page refreshes
    localStorage.setItem("newsletterClosed", "true");
  };

  // Check localStorage on component mount
  useEffect(() => {
    const isClosed = localStorage.getItem("newsletterClosed");
    if (isClosed === "true") {
      setShowNewsletter(false);
    }
  }, []);

  return (
    <>
      {/* Newsletter Banner */}
      <AnimatePresence>
        {showNewsletter && <NewsletterBanner onClose={closeNewsletter} />}
      </AnimatePresence>

      <motion.header
        initial={{ y: -5 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-200",
          isScrolled
            ? "glass-panel backdrop-blur-lg shadow-sm border-b border-primary/10"
            : "bg-background"
        )}
      >
        <div className="container mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-primary/20 cosmic-card">
                <Image
                  src="/logo.png"
                  alt={`${siteConfig.name}`}
                  width={40}
                  height={40}
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">Vijeet Shah</h1>
                <span className="text-xs text-muted-foreground">Developer & Educator</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationConfig.mainNav.map((item) => {
                // If item has children, render dropdown
                if (item.children?.length) {
                  return (
                    <div key={item.title} className="relative group px-3 py-2">
                      <button
                        className={cn(
                          "flex items-center text-sm font-medium transition-colors",
                          isActiveLink(item.href)
                            ? "text-primary"
                            : "text-foreground/80 hover:text-primary"
                        )}
                      >
                        {item.title} <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                      <div className="absolute left-0 mt-1 w-48 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="cosmic-card py-1 rounded-md overflow-hidden">
                          {item.children.map((child) => (
                            <Link
                              key={child.title}
                              href={child.href}
                              className={cn(
                                "block px-4 py-2 text-sm hover:bg-primary/5",
                                isActiveLink(child.href)
                                  ? "text-primary font-medium"
                                  : "text-foreground/80"
                              )}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                // Otherwise render simple link
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors relative",
                      isActiveLink(item.href)
                        ? "text-primary"
                        : "text-foreground/80 hover:text-primary"
                    )}
                  >
                    {item.title}
                    {isActiveLink(item.href) && (
                      <motion.span 
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side buttons - Language, Theme Toggle, Search & CTA */}
            <div className="hidden md:flex items-center space-x-3">
              {navigationConfig.enableSearch && <SearchDialog />}

              {/* Conditional rendering of language selector */}
              {navigationConfig.i18n.enabled && (
                <LanguageSelector
                />
              )}

              {navigationConfig.enableThemeToggle && <ModeToggle />}

              <Link
                href="/subscribe"
                className="cosmic-button-secondary flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium"
              >
                <Mail className="h-4 w-4" />
                <span>Subscribe</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}