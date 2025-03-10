// components/layout/navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { siteConfig } from "@/config/site";
import { navigationConfig } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageSelector } from "@/components/language-selector";
import { SearchDialog } from "@/components/search-dialog";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <>
      {/* Announcement Banner */}
      {navigationConfig.announcement?.enabled && (
        <div
          className="text-white text-center py-1 px-4 overflow-hidden"
          style={{
            backgroundColor:
              navigationConfig.announcement.bgColor || "var(--color-primary)",
          }}
        >
          <div className="container mx-auto whitespace-nowrap overflow-x-auto scrollbar-hide">
            <Link
              href={navigationConfig.announcement.href}
              className="text-sm md:text-base font-medium hover:underline"
            >
              {navigationConfig.announcement.text}
            </Link>
          </div>
        </div>
      )}

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-200",
          isScrolled
            ? "bg-background/95 backdrop-blur-sm shadow-sm"
            : "bg-background"
        )}
      >
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-8 w-8 overflow-hidden">
                <Image
                  src="/logo.png"
                  alt={`${siteConfig.name} Logo`}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">{siteConfig.name}</h1>
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
                      <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-background dark:bg-slate-800 ring-1 ring-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="py-1 rounded-md overflow-hidden">
                          {item.children.map((child) => (
                            <Link
                              key={child.title}
                              href={child.href}
                              className={cn(
                                "block px-4 py-2 text-sm hover:bg-muted",
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
                      "px-3 py-2 text-sm font-medium transition-colors",
                      isActiveLink(item.href)
                        ? "text-primary"
                        : "text-foreground/80 hover:text-primary"
                    )}
                  >
                    {item.title}
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
                  variant={navigationConfig.i18n.displayVariant}
                />
              )}

              {navigationConfig.enableThemeToggle && <ModeToggle />}

              <Link
                href={navigationConfig.ctaButton.href}
                className={cn(
                  "bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium",
                  {
                    "bg-transparent border border-primary text-primary hover:bg-primary/10":
                      navigationConfig.ctaButton.variant === "outline",
                    "bg-transparent text-primary hover:bg-primary/10":
                      navigationConfig.ctaButton.variant === "ghost",
                    "bg-transparent text-primary underline hover:no-underline":
                      navigationConfig.ctaButton.variant === "link",
                  }
                )}
              >
                {navigationConfig.ctaButton.text}
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
