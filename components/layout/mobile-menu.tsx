// components/layout/mobile-menu.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight, Mail, Github, Linkedin, Twitter, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  // Social links for mobile menu
  const socialLinks = [
    { icon: Mail, href: "mailto:vijeetbshah@gmail.com", label: "Email" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/vijeet-shah/", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/vijeetshah_", label: "Twitter" },
    { icon: Github, href: "https://github.com/vijeet-shah/", label: "GitHub" },
  ];

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      x: menuStyle === "drawer" ? -300 : 0,
      y: 0, 
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 }
  };

  const socialVariants = {
    closed: { opacity: 0, scale: 0.8 },
    open: { 
      opacity: 1, 
      scale: 1,
      transition: {
        delay: 0.4
      }
    }
  };

  return (
    <div>
      {/* Toggle Button */}
      <motion.button 
        onClick={toggleMenu} 
        className="cosmic-card p-2 rounded-md hover:bg-muted"
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className={cn(
              "fixed inset-0 z-50 glass-panel",
              menuStyle === "drawer" ? "md:hidden" : ""
            )}
          >
            <div className="container h-full flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-primary/10">
                <div className="cosmic-text text-lg font-bold">Vijeet Shah</div>
                <motion.button 
                  onClick={closeMenu}
                  className="p-2 rounded-md hover:bg-muted"
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              <nav className="flex-1 overflow-y-auto py-6 px-6">
                <motion.ul 
                  variants={menuVariants}
                  className="space-y-6"
                >
                  {navigationConfig.mainNav.map((item) => {
                    const hasChildren = !!item.children?.length;
                    const isSubmenuOpen = openSubmenu === item.title;
                    const isActive = isActiveLink(item.href);

                    return (
                      <motion.li variants={itemVariants} key={item.title} className="border-b border-muted pb-4">
                        {hasChildren ? (
                          <div>
                            <button
                              onClick={() => toggleSubmenu(item.title)}
                              className={cn(
                                "flex items-center justify-between w-full text-base font-medium",
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
                            
                            <AnimatePresence>
                              {isSubmenuOpen && item.children && (
                                <motion.ul 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-4 ml-4 space-y-3 overflow-hidden"
                                >
                                  {item.children.map((child) => (
                                    <motion.li 
                                      variants={itemVariants}
                                      key={child.title}
                                    >
                                      <Link
                                        href={child.href}
                                        onClick={closeMenu}
                                        className={cn(
                                          "text-foreground/80 hover:text-primary flex items-center",
                                          isActiveLink(child.href) && "text-primary font-medium"
                                        )}
                                      >
                                        {isActiveLink(child.href) && <Sparkles className="h-3 w-3 mr-2 text-primary" />}
                                        {child.title}
                                      </Link>
                                    </motion.li>
                                  ))}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            className={cn(
                              "text-base font-medium hover:text-primary flex items-center",
                              isActive && "text-primary"
                            )}
                          >
                            {isActive && <Sparkles className="h-4 w-4 mr-2 text-primary" />}
                            {item.title}
                          </Link>
                        )}
                      </motion.li>
                    );
                  })}
                </motion.ul>

                {/* Social links */}
                <motion.div 
                  variants={socialVariants}
                  className="mt-8 pt-4 border-t border-muted"
                >
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Connect with me</h3>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cosmic-card-interactive flex items-center justify-center h-10 w-10 rounded-full"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={link.label}
                      >
                        <link.icon className="h-5 w-5 text-primary" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </nav>

              <motion.div 
                variants={itemVariants}
                className="p-6 border-t border-muted"
              >
                <div className="flex items-center justify-between mb-6">
                  {navigationConfig.enableSearch && <SearchDialog />}
                  {navigationConfig.enableLanguageSelector && <LanguageSelector />}
                  {navigationConfig.enableThemeToggle && <ModeToggle />}
                </div>
                
                <Link
                  href="/subscribe"
                  onClick={closeMenu}
                  className="cosmic-button flex items-center justify-center space-x-2 w-full py-3 rounded-md font-medium"
                >
                  <Mail className="h-4 w-4" />
                  <span>Join Newsletter</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}