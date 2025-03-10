
import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { navigationConfig } from '@/config/navigation'
import { cn } from '@/lib/utils'
import { generatePageMetadata } from '@/components/SEO'
import { getLanguage, getTranslations } from '@/lib/i18n/server-utils'



// Helper function to build the sitemap structure from navigation
const buildSitemapFromNav = () => {
  // Basic structure with main pages
  const structure = [
    {
      title: 'Main Pages',
      description: 'Core pages of our website',
      links: [
        { name: 'Home Page', url: '/', description: 'Main landing page' },
        { name: 'Contact Us', url: '/contact', description: 'Get in touch with our team' },
      ],
    }
  ];
  
  // Create sections for each top-level nav item with children
  navigationConfig.mainNav.forEach(item => {
    if (item.children && item.children.length > 0) {
      structure.push({
        title: item.title,
        description: `Explore our ${item.title.toLowerCase()} pages`,
        links: item.children.map(child => ({
          name: child.title,
          url: child.href,
          description: `${child.title} information and details`,
        })),
      });
    }
  });
  
  // Add a legal/resources section
  structure.push({
    title: 'Resources & Information',
    description: 'Helpful resources and legal information',
    links: [
      { name: 'Privacy Policy', url: '/privacy', description: 'How we protect your data and privacy' },
      { name: 'Terms & Conditions', url: '/terms', description: 'Terms of service for all our products' },
      { name: 'Sitemap', url: '/sitemap', description: 'This page - overview of all site content' },
    ],
  });
  
  return structure;
};

export default async function SitemapPage() {
  // Get language and translations with proper await
  const currentLanguage = await getLanguage();
  const t = await getTranslations(currentLanguage);
  
  // Determine if the language reads right-to-left
  const isRTL = currentLanguage === 'ar' || currentLanguage === 'he';
  
  const siteStructure = buildSitemapFromNav();
  const primaryColorClass = "text-primary";
  const primaryBgClass = "bg-primary";
  const primaryHoverClass = "hover:text-primary";
  const primaryBorderClass = "border-primary";

  return (
    <article className="container mx-auto max-w-4xl py-16 px-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          {t.sitemap || "Complete Sitemap"}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t.sitemapDesc || `Navigate through all available pages on the ${siteConfig.name} website.
          This sitemap is organized by category to help you find exactly what you're looking for.`}
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {siteStructure.map((section, i) => (
          <section key={i} className="bg-background shadow-lg rounded-lg p-6 border border-border hover:shadow-xl transition-shadow">
            <h2 className={cn("text-2xl font-semibold mb-2", primaryColorClass)}>
              {t[`section_${section.title.toLowerCase().replace(/\s+/g, '_')}`] || section.title}
            </h2>
            <p className="text-muted-foreground text-sm mb-4">
              {t[`sectionDesc_${section.title.toLowerCase().replace(/\s+/g, '_')}`] || section.description}
            </p>
            <ul className="space-y-3">
              {section.links.map((link, j) => (
                <li key={j}>
                  <Link 
                    href={link.url} 
                    className="flex items-start group"
                  >
                    <ChevronRight size={16} className={cn("mr-2 mt-1 transition-transform group-hover:translate-x-1", primaryColorClass)} />
                    <div>
                      <span className={cn("text-foreground font-medium group-hover:text-primary transition-colors")}>
                        {t[`link_${link.name.toLowerCase().replace(/\s+/g, '_')}`] || link.name}
                      </span>
                      {link.description && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {t[`linkDesc_${link.name.toLowerCase().replace(/\s+/g, '_')}`] || link.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className={cn("mt-16 rounded-lg p-6 border", "bg-primary/5", primaryBorderClass)}>
        <h2 className={cn("text-xl font-semibold mb-4", primaryColorClass)}>
          {t.cantFindPage || "Can't find what you're looking for?"}
        </h2>
        <p className="text-foreground mb-4">
          {t.cantFindPageDesc || "If you can't locate a specific page or need assistance navigating our website, our customer support team is here to help."}
        </p>
        <Link 
          href="/contact" 
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:-translate-y-0.5 focus-visible:outline-none"
        >
          {t.contactSupport || "Contact Support"}
        </Link>
      </div>
    </article>
  )
}