// components/layout/footer.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ChevronRight, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import {  getTranslations } from "@/lib/i18n/server-utils";
import { siteConfig } from "@/config/site";
import { navigationConfig } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { getLanguage } from "@/lib/i18n/server-utils";

// Define the footer config type and export it for use in the site config
export type FooterConfig = {
  enabled: boolean;
  style: 'simple' | 'standard' | 'complex';
  showSocials: boolean;
  showContactInfo: boolean;
  showQuickLinks: boolean;
  showServices: boolean;
  showBankingHours: boolean;
  showCopyright: boolean;
  showLogo: boolean;
  quickLinks?: Array<{ title: string; href: string; translationKey?: string }>;
  services?: Array<{ title: string; href: string; translationKey?: string }>;
  customSections?: Array<{
    title: string;
    translationKey?: string;
    links?: Array<{ title: string; href: string; translationKey?: string }>;
    content?: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
};

// You can add this to your site config
const defaultFooterConfig: FooterConfig = {
  enabled: true,
  style: 'standard',
  showSocials: true,
  showContactInfo: true,
  showQuickLinks: true,
  showServices: true,
  showBankingHours: true,
  showCopyright: true,
  showLogo: true,
  quickLinks: [
    { title: "About Us", href: "/about", translationKey: "aboutUs" },
    { title: "Services", href: "/services", translationKey: "services" },
    { title: "Blog", href: "/blog", translationKey: "blog" },
    { title: "Contact", href: "/contact", translationKey: "contactUs" }
  ],
  services: [
    { title: "Service 1", href: "/services/service1" },
    { title: "Service 2", href: "/services/service2" },
    { title: "Service 3", href: "/services/service3" }
  ]
};

export function Footer() {
  const lang = getLanguage();
  const t = getTranslations(lang);
  const currentYear = new Date().getFullYear();
  
  // Get footer config from site config or use default
  const footerConfig: FooterConfig = siteConfig.footer || defaultFooterConfig;
  
  // If footer is disabled, return null
  if (!footerConfig.enabled) {
    return null;
  }

  // Use theme colors from site config or default to tailwind classes
  const bgColor = footerConfig.backgroundColor || 'bg-slate-900 dark:bg-slate-950';
  const textColor = footerConfig.textColor || 'text-slate-100 dark:text-slate-200';
  const accentColor = footerConfig.accentColor || 'text-primary';
  const borderColor = 'border-slate-700/50 dark:border-slate-700';
  const hoverColor = 'hover:text-primary';

  return (
    <footer className={cn(bgColor, textColor)}>
      {/* Main Footer */}
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          {footerConfig.showLogo && (
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 relative mr-3 bg-background rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/images/logo.png"
                    alt={`${siteConfig.name} Logo`}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {siteConfig.name}
                  </h3>
                  {siteConfig.legalName !== siteConfig.name && (
                    <p className="text-xs text-slate-300/80 dark:text-slate-400">
                      {siteConfig.legalName.replace(siteConfig.name, '').trim()}
                    </p>
                  )}
                </div>
              </div>
              
              <p className="text-sm text-slate-300 dark:text-slate-400">
                {siteConfig.description}
              </p>
              
              {footerConfig.showSocials && (
                <div className="flex space-x-3 mt-4">
                  {siteConfig.links.facebook && (
                    <a 
                      href={siteConfig.links.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label="Facebook" 
                      className="bg-slate-800/70 dark:bg-slate-800 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors p-2 rounded-full"
                    >
                      <Facebook size={18} />
                    </a>
                  )}
                  
                  {siteConfig.links.twitter && (
                    <a 
                      href={siteConfig.links.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label="Twitter"
                      className="bg-slate-800/70 dark:bg-slate-800 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors p-2 rounded-full"
                    >
                      <Twitter size={18} />
                    </a>
                  )}
                  
                  {siteConfig.links.instagram && (
                    <a 
                      href={siteConfig.links.instagram} 
                      target="_blank"
                      rel="noopener noreferrer" 
                      aria-label="Instagram" 
                      className="bg-slate-800/70 dark:bg-slate-800 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors p-2 rounded-full"
                    >
                      <Instagram size={18} />
                    </a>
                  )}
                  
                  {siteConfig.links.linkedin && (
                    <a 
                      href={siteConfig.links.linkedin || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label="LinkedIn" 
                      className="bg-slate-800/70 dark:bg-slate-800 hover:bg-primary/20 dark:hover:bg-primary/20 transition-colors p-2 rounded-full"
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Column 2: Quick Links */}
          {footerConfig.showQuickLinks && footerConfig.quickLinks && footerConfig.quickLinks.length > 0 && (
            <div className="space-y-4">
              <h3 className={cn("font-bold text-lg border-b pb-2", borderColor)}>
                {t.quickLinks || "Quick Links"}
              </h3>
              <ul className="space-y-2">
                {footerConfig.quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href} 
                      className={cn("text-slate-300 dark:text-slate-400 transition-colors flex items-center", hoverColor)}
                    >
                      <ChevronRight size={16} className={cn("mr-1", accentColor)} />
                      <span>
                        {link.translationKey ? t[link.translationKey] || link.title : link.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Column 3: Services */}
          {footerConfig.showServices && footerConfig.services && footerConfig.services.length > 0 && (
            <div className="space-y-4">
              <h3 className={cn("font-bold text-lg border-b pb-2", borderColor)}>
                {t.ourServices || "Our Services"}
              </h3>
              <ul className="space-y-2">
                {footerConfig.services.map((service, index) => (
                  <li key={index}>
                    <Link 
                      href={service.href} 
                      className={cn("text-slate-300 dark:text-slate-400 transition-colors flex items-center", hoverColor)}
                    >
                      <ChevronRight size={16} className={cn("mr-1", accentColor)} />
                      <span>
                        {service.translationKey ? t[service.translationKey] || service.title : service.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Column 4: Contact Info */}
          {footerConfig.showContactInfo && (
            <div className="space-y-4">
              <h3 className={cn("font-bold text-lg border-b pb-2", borderColor)}>
                {t.getInTouch || "Get In Touch"}
              </h3>
              <ul className="space-y-3">
                {siteConfig.contact.address && (
                  <li className="flex">
                    <MapPin className={cn("mr-3 flex-shrink-0 mt-1", accentColor)} size={18} />
                    <span className="text-slate-300 dark:text-slate-400 text-sm">
                      {siteConfig.contact.address.street}<br />
                      {siteConfig.contact.address.locality}, {siteConfig.contact.address.region}<br />
                      {siteConfig.contact.address.postalCode}
                    </span>
                  </li>
                )}
                
                {siteConfig.contact.phone && (
                  <li className="flex items-center">
                    <Phone className={cn("mr-3 flex-shrink-0", accentColor)} size={18} />
                    <a 
                      href={`tel:${siteConfig.contact.phone}`} 
                      className={cn("text-slate-300 dark:text-slate-400 transition-colors text-sm", hoverColor)}
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </li>
                )}
                
                {siteConfig.contact.email && (
                  <li className="flex items-center">
                    <Mail className={cn("mr-3 flex-shrink-0", accentColor)} size={18} />
                    <a 
                      href={`mailto:${siteConfig.contact.email}`} 
                      className={cn("text-slate-300 dark:text-slate-400 transition-colors text-sm", hoverColor)}
                    >
                      {siteConfig.contact.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
          
          {/* Custom Sections - render any additional sections from config */}
          {footerConfig.customSections?.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className={cn("font-bold text-lg border-b pb-2", borderColor)}>
                {section.translationKey ? t[section.translationKey] || section.title : section.title}
              </h3>
              
              {section.content && (
                <p className="text-sm text-slate-300 dark:text-slate-400">
                  {section.content}
                </p>
              )}
              
              {section.links && section.links.length > 0 && (
                <ul className="space-y-2">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link 
                        href={link.href} 
                        className={cn("text-slate-300 dark:text-slate-400 transition-colors flex items-center", hoverColor)}
                      >
                        <ChevronRight size={16} className={cn("mr-1", accentColor)} />
                        <span>
                          {link.translationKey ? t[link.translationKey] || link.title : link.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Banking Hours Strip or any other middle section */}
      {footerConfig.showBankingHours && siteConfig.contact.openingHours && (
        <div className="bg-slate-800 dark:bg-slate-900 py-4">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-3 md:mb-0">
                <h4 className={cn("font-medium text-sm", accentColor)}>
                  {t.bankingHours || "Opening Hours"}:
                </h4>
                <p className="text-slate-300 dark:text-slate-400 text-sm">
                  {siteConfig.contact.openingHours}
                </p>
              </div>
              <div>
                <Link
                  href={navigationConfig.ctaButton.href}
                  className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-md text-sm font-medium inline-block shadow-lg"
                >
                  {navigationConfig.ctaButton.text}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Copyright */}
      {footerConfig.showCopyright && (
        <div className="bg-slate-950 dark:bg-black py-4">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm">
              <p className="text-slate-400 dark:text-slate-500 mb-3 md:mb-0">
                &copy; {currentYear} {siteConfig.name}. {t.allRightsReserved || "All Rights Reserved"}
              </p>
              <div className="flex space-x-4 flex-wrap justify-center">
                <Link href="/privacy" className={cn("text-slate-400 dark:text-slate-500 transition-colors", hoverColor)}>
                  {t.privacyPolicy || "Privacy Policy"}
                </Link>
                <Link href="/terms" className={cn("text-slate-400 dark:text-slate-500 transition-colors", hoverColor)}>
                  {t.terms || "Terms & Conditions"}
                </Link>
                <Link href="/sitemap" className={cn("text-slate-400 dark:text-slate-500 transition-colors", hoverColor)}>
                  {t.sitemap || "Sitemap"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}