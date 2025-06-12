// components/landing-page.tsx
import React from "react";
import Link from "next/link";
// import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import {  CTAConfig } from "@/types";
import { HeroSection } from "./home/heroSection";
import { ServiceSection } from "./home/serviceSection";
import {CoreValue}  from "./home/coreValue";
import { GetInTouchSection } from "./home/getInTouch";
import { useTranslation } from "@/lib/i18n/client-utils";



const defaultCTAConfig: CTAConfig = {
  enabled: true,
  title: 'Ready to Get Started?',
  description: 'Join thousands of satisfied customers today.',
  buttonText: 'Contact Us',
  buttonLink: '/contact',
  style: 'banner',
  backgroundStyle: 'gradient'
};

// const defaultContactConfig: ContactSectionConfig = {
//   enabled: true,
//   title: 'Get in Touch',
//   titleKey: 'getInTouch',
//   description: 'We\'re here to help you with all your needs',
//   descriptionKey: 'contactDescription',
//   showAddress: true,
//   showPhone: true,
//   showEmail: true,
//   showSocials: true,
//   mapLink: 'https://maps.google.com'
// };

export function LandingPage() {
    const { t } = useTranslation();
  


  const ctaConfig: CTAConfig =  defaultCTAConfig;

  // Determine primary color class
  const primaryBgClass = "bg-primary";


  return (
    <div className="min-h-screen bg-background">
     <HeroSection/>

    <CoreValue   />
     <ServiceSection/>

      {/* CTA Section */}
      {ctaConfig.enabled && (
        <section className={cn(
          "py-16 px-6 relative overflow-hidden",
          ctaConfig.backgroundStyle === 'gradient' 
            ? `bg-gradient-to-r from-primary to-primary/80` 
            : ctaConfig.backgroundStyle === 'pattern'
            ? `bg-primary bg-[url('/images/pattern.png')] bg-blend-overlay` 
            : primaryBgClass
        )}>
          {


ctaConfig.backgroundStyle === 'gradient' && (
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-3xl"></div>
  </div>
)}
          
<div className="container mx-auto max-w-4xl relative z-10">
  {ctaConfig.style === 'banner' && (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 shadow-2xl border border-white/20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-white max-w-xl">
          <h2 className="text-3xl font-bold mb-4">
            {ctaConfig.titleKey ? t[ctaConfig.titleKey] || ctaConfig.title : ctaConfig.title}
          </h2>
          <p className="text-white/90">
            {ctaConfig.descriptionKey ? t[ctaConfig.descriptionKey] || ctaConfig.description : ctaConfig.description}
          </p>
        </div>
        <div>
          <Link 
            href={ctaConfig.buttonLink} 
            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-white px-8 py-4 text-base font-medium text-primary shadow-lg hover:shadow-white/20 transition-all hover:-translate-y-0.5 hover:bg-gray-50 focus-visible:outline-none"
          >
            {ctaConfig.buttonText}
          </Link>
        </div>
      </div>
    </div>
  )}
  
  {ctaConfig.style === 'box' && (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-2xl text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        {ctaConfig.titleKey ? t[ctaConfig.titleKey] || ctaConfig.title : ctaConfig.title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        {ctaConfig.descriptionKey ? t[ctaConfig.descriptionKey] || ctaConfig.description : ctaConfig.description}
      </p>
      <Link 
        href={ctaConfig.buttonLink} 
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-8 py-4 text-base font-medium shadow-lg transition-all hover:-translate-y-0.5 focus-visible:outline-none",
          primaryBgClass,
          "text-primary-foreground",
          `hover:${primaryBgClass}/90`
        )}
      >
        {ctaConfig.buttonText}
      </Link>
    </div>
  )}
</div>
</section>
)}

<GetInTouchSection/>
</div>
);
}