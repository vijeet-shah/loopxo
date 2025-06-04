// components/layout/mobile-menu.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

import { navigationConfig } from "@/config/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageSelector } from "@/components/language-selector";
import { SearchDialog } from "@/components/search-dialog";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  // Check if a nav link is active
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Mobile menu style - can be "drawer" (default) or "fullscreen"
  const menuStyle = navigationConfig.mobileMenuMode || "drawer";

  return (
    <div>
      {/* Toggle Button */}
      <button 
        onClick={toggleMenu} 
        className="p-2 rounded-md hover:bg-muted"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className={cn(
          "fixed inset-0 z-50 bg-background",
          menuStyle === "drawer" ? "md:hidden" : ""
        )}>
          <div className="container h-full flex flex-col">
            <div className="flex justify-end p-4">
              <button 
                onClick={closeMenu}
                className="p-2 rounded-md hover:bg-muted"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-6">
              <ul className="space-y-6">
                {navigationConfig.mainNav.map((item) => {
                  const hasChildren = !!item.children?.length;
                  const isSubmenuOpen = openSubmenu === item.title;
                  const isActive = isActiveLink(item.href);

                  return (
                    <li key={item.title} className="border-b border-muted pb-4">
                      {hasChildren ? (
                        <div>
                          <button
                            onClick={() => toggleSubmenu(item.title)}
                            className={cn(
                              "flex items-center justify-between w-full text-lg font-medium",
                              isActive && "text-primary"
                            )}
                          >
                            {item.title}
                            {isSubmenuOpen ? (
                              <ChevronDown className="h-5 w-5" />
                            ) : (
                              <ChevronRight className="h-5 w-5" />
                            )}
                          </button>
                          
                          {isSubmenuOpen && item.children && (
                            <ul className="mt-4 ml-4 space-y-3">
                              {item.children.map((child) => (
                                <li key={child.title}>
                                  <Link
                                    href={child.href}
                                    onClick={closeMenu}
                                    className={cn(
                                      "text-foreground/80 hover:text-primary",
                                      isActiveLink(child.href) && "text-primary font-medium"
                                    )}
                                  >
                                    {child.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className={cn(
                            "text-lg font-medium hover:text-primary",
                            isActive && "text-primary"
                          )}
                        >
                          {item.title}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="p-6 border-t border-muted">
              <div className="flex items-center justify-between mb-6">
                {navigationConfig.enableSearch && <SearchDialog />}
                {navigationConfig.enableLanguageSelector && <LanguageSelector />}
                {navigationConfig.enableThemeToggle && <ModeToggle />}
              </div>
              
              <Link
                href={navigationConfig.ctaButton.href}
                onClick={closeMenu}
                className={cn(
                  "block w-full bg-primary hover:bg-primary/90 text-white text-center py-3 rounded-md font-medium",
                  {
                    "bg-transparent border border-primary text-primary hover:bg-primary/10": 
                      navigationConfig.ctaButton.variant === "outline",
                    "bg-transparent text-primary hover:bg-primary/10": 
                      navigationConfig.ctaButton.variant === "ghost",
                  }
                )}
              >
                {navigationConfig.ctaButton.text}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}