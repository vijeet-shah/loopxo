// app/not-found.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Search, ArrowRight, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { navigationConfig } from '@/config/navigation';
import { cn } from '@/lib/utils';

// Define some default quick links
const defaultQuickLinks = [
  { name: 'Home Page', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact Us', href: '/contact' },
];

// Get links from the navigation config
const getQuickLinks = () => {
  // Start with the default links
  const links = [...defaultQuickLinks];
  
  // Add the CTA button if it exists
  if (navigationConfig.ctaButton) {
    links.push({
      name: navigationConfig.ctaButton.text,
      href: navigationConfig.ctaButton.href,
    });
  }
  
  // Return up to 5 links
  return links.slice(0, 5);
};

export default function NotFound() {
  const quickLinks = getQuickLinks();
  const primaryColorClass = "text-primary";
  const primaryBgClass = "bg-primary";
  const primaryHoverClass = "hover:text-primary";
  const primaryBorderClass = "border-primary";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl text-center">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-30"></div>
          <div className="relative bg-background rounded-full p-4 shadow-lg border-2 border-primary/10">
            <Image
              src="/images/logo.png"
              alt={`${siteConfig.name} Logo`}
              width={96}
              height={96}
              className="rounded-full"
            />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold text-foreground mb-2">Page Not Found</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          We're sorry, but the page you are looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <Link 
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:-translate-y-0.5"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Homepage
          </Link>
          <Link 
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border-2 border-primary px-6 py-3 text-base font-medium text-primary hover:bg-primary/5 transition-all hover:-translate-y-0.5"
          >
            <Phone className="mr-2 h-5 w-5" />
            Contact Support
          </Link>
        </div>

        <div className="bg-background rounded-xl p-8 shadow-lg border border-border">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Quick Navigation
          </h3>
          <p className="text-muted-foreground mb-6">
            You might be looking for one of these popular pages:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {quickLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="flex items-center p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors group"
              >
                <ArrowRight className={cn("mr-2 h-5 w-5 transition-transform group-hover:translate-x-1", primaryColorClass)} />
                <span className="font-medium text-foreground">{link.name}</span>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-muted-foreground text-sm mb-3">
              Or try searching our site:
            </p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder={`Search ${siteConfig.name}...`}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <p className="text-sm text-muted-foreground">
            If you believe this is an error, please{' '}
            <Link href="/contact" className={cn("hover:underline", primaryColorClass)}>
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}