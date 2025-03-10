// components/landing-page.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, TrendingUp, Users, Star, Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { navigationConfig } from "@/config/navigation";
import { getLanguage, getTranslations } from "@/lib/i18n/server-utils";
import { cn } from "@/lib/utils";


// Types for the configurable sections
export type HeroConfig = {
  enabled: boolean;
  style: 'simple' | 'split' | 'centered';
  showImage: boolean;
  imageSrc: string;
  showBadge: boolean;
  badgeText: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  showTrustIndicators: boolean;
  trustIndicators?: Array<{ icon: keyof typeof IconsMap; text: string }>;
  backgroundStyle?: 'gradient' | 'pattern' | 'solid';
};

export type ValuesSectionConfig = {
  enabled: boolean;
  title: string;
  titleKey?: string;
  description?: string;
  descriptionKey?: string;
  values: Array<{
    icon: keyof typeof IconsMap;
    title: string;
    titleKey?: string;
    description: string;
    descriptionKey?: string;
  }>;
};

export type FeaturedSectionConfig = {
  enabled: boolean;
  title: string;
  titleKey?: string;
  description?: string;
  descriptionKey?: string;
  items: Array<{
    title: string;
    titleKey?: string;
    description: string;
    descriptionKey?: string;
    image?: string;
    link?: string;
    highlight?: string;
    highlightKey?: string;
    badge?: string;
  }>;
  style: 'cards' | 'grid' | 'list';
};

export type CTAConfig = {
  enabled: boolean;
  title: string;
  titleKey?: string;
  description?: string;
  descriptionKey?: string;
  buttonText: string;
  buttonLink: string;
  style: 'banner' | 'box' | 'split';
  backgroundStyle?: 'gradient' | 'pattern' | 'solid';
};

export type ContactSectionConfig = {
  enabled: boolean;
  title: string;
  titleKey?: string;
  description?: string;
  descriptionKey?: string;
  showAddress: boolean;
  showPhone: boolean;
  showEmail: boolean;
  showSocials: boolean;
  mapLink?: string;
};

// Define all potential icons that can be used
const IconsMap = {
  Shield: Shield,
  TrendingUp: TrendingUp,
  Users: Users,
  Star: Star,
  Phone: Phone,
  Mail: Mail,
  MapPin: MapPin,
  Clock: Clock,
  CheckCircle2: CheckCircle2,
  ArrowRight: ArrowRight,
};

// These configurations would normally be in the site config
// This is just for demonstration purposes
const defaultHeroConfig: HeroConfig = {
  enabled: true,
  style: 'split',
  showImage: true,
  imageSrc: '/images/hero-image.jpg',
  showBadge: true,
  badgeText: 'New',
  primaryButtonText: 'Get Started',
  primaryButtonLink: '#features',
  secondaryButtonText: 'Learn More',
  secondaryButtonLink: '#contact',
  showTrustIndicators: true,
  trustIndicators: [
    { icon: 'CheckCircle2', text: 'Trusted Partner' },
    { icon: 'CheckCircle2', text: 'Premium Support' }
  ],
  backgroundStyle: 'gradient'
};

const defaultValuesConfig: ValuesSectionConfig = {
  enabled: true,
  title: 'Our Core Values',
  titleKey: 'valuesTitle',
  description: 'We are committed to excellence in everything we do.',
  descriptionKey: 'valuesDescription',
  values: [
    {
      icon: 'Shield',
      title: 'Integrity',
      titleKey: 'integrity',
      description: 'We uphold the highest standards of honesty in all our interactions.',
      descriptionKey: 'integrityDesc'
    },
    {
      icon: 'Users',
      title: 'Teamwork',
      titleKey: 'teamwork',
      description: 'Together we achieve more, supporting each other with dedication.',
      descriptionKey: 'teamworkDesc'
    },
    {
      icon: 'Star',
      title: 'Reliability',
      titleKey: 'reliability',
      description: 'Consistently delivering on our promises and maintaining stability.',
      descriptionKey: 'reliabilityDesc'
    },
    {
      icon: 'TrendingUp',
      title: 'Innovation',
      titleKey: 'innovation',
      description: 'Continuously improving our services to meet evolving needs.',
      descriptionKey: 'innovationDesc'
    }
  ]
};

const defaultFeaturedConfig: FeaturedSectionConfig = {
  enabled: true,
  title: 'Our Services',
  titleKey: 'schemesTitle',
  description: 'Comprehensive solutions designed to meet your unique needs',
  descriptionKey: 'schemesDescription',
  style: 'cards',
  items: [
    {
      title: 'Service 1',
      titleKey: 'service1',
      description: 'Description of service 1',
      descriptionKey: 'service1Desc',
      image: '/images/service1.jpg',
      link: '/services/1',
      highlight: 'Popular',
      badge: 'New'
    },
    {
      title: 'Service 2',
      titleKey: 'service2',
      description: 'Description of service 2',
      descriptionKey: 'service2Desc',
      image: '/images/service2.jpg',
      link: '/services/2'
    },
    {
      title: 'Service 3',
      titleKey: 'service3',
      description: 'Description of service 3',
      descriptionKey: 'service3Desc',
      image: '/images/service3.jpg',
      link: '/services/3'
    }
  ]
};

const defaultCTAConfig: CTAConfig = {
  enabled: true,
  title: 'Ready to Get Started?',
  description: 'Join thousands of satisfied customers today.',
  buttonText: 'Contact Us',
  buttonLink: '/contact',
  style: 'banner',
  backgroundStyle: 'gradient'
};

const defaultContactConfig: ContactSectionConfig = {
  enabled: true,
  title: 'Get in Touch',
  titleKey: 'getInTouch',
  description: 'We\'re here to help you with all your needs',
  descriptionKey: 'contactDescription',
  showAddress: true,
  showPhone: true,
  showEmail: true,
  showSocials: true,
  mapLink: 'https://maps.google.com'
};

export async function LandingPage() {
  // Get translations - properly awaited
  const lang = await getLanguage();
  const t = await getTranslations(lang);

  // Get configurations from site config (or use defaults if not set)
  const heroConfig: HeroConfig = siteConfig.landing?.hero || defaultHeroConfig;
  const valuesConfig: ValuesSectionConfig = siteConfig.landing?.values || defaultValuesConfig;
  const featuredConfig: FeaturedSectionConfig = siteConfig.landing?.featured || defaultFeaturedConfig;
  const ctaConfig: CTAConfig = siteConfig.landing?.cta || defaultCTAConfig;
  const contactConfig: ContactSectionConfig = siteConfig.landing?.contact || defaultContactConfig;

  // Determine primary color class
  const primaryColorClass = "text-primary";
  const primaryBgClass = "bg-primary";
  const primaryBgLightClass = "bg-primary/10";
  const primaryHoverClass = "hover:text-primary";
  const primaryBorderClass = "border-primary";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Configurable */}
      {heroConfig.enabled && (
        <section className={cn(
          "relative py-20 px-6 overflow-hidden",
          heroConfig.backgroundStyle === 'gradient' 
            ? "bg-gradient-to-b from-primary/5 to-background" 
            : "bg-background"
        )}>
          {/* Decorative elements */}
          {heroConfig.backgroundStyle === 'gradient' && (
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
              <div className="absolute top-40 -left-20 w-80 h-80 bg-primary rounded-full blur-3xl"></div>
            </div>
          )}
          
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className={cn(
              "grid gap-16 items-center",
              heroConfig.style === 'split' ? "md:grid-cols-2" : "md:grid-cols-1"
            )}>
              <div className={cn(
                "space-y-8",
                heroConfig.style === 'centered' && "text-center mx-auto max-w-3xl"
              )}>
                {heroConfig.showBadge && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
                    <span className="px-2 py-0.5 text-xs font-semibold bg-primary text-white rounded-full">
                      {heroConfig.badgeText}
                    </span>
                    <span className="ml-2 text-sm text-primary">
                      {navigationConfig.announcement?.text || 'Introducing our latest offering'}
                    </span>
                  </div>
                )}
                
                <div className="space-y-3">
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                    {siteConfig.name}
                  </h1>
                  {siteConfig.legalName !== siteConfig.name && (
                    <h2 className="text-xl font-semibold text-foreground/80">
                      {siteConfig.legalName.replace(siteConfig.name, '').trim()}
                    </h2>
                  )}
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  {t.heroTitle || "Welcome to our platform"}
                </h3>
                <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                  {t.heroDescription || "Your journey to success starts here with our comprehensive solutions."}
                </p>
                
                <div className={cn(
                  "flex gap-4 pt-2",
                  heroConfig.style === 'centered' ? "justify-center flex-col sm:flex-row" : "flex-col sm:flex-row"
                )}>
                  {heroConfig.primaryButtonText && (
                    <Link
                      href={heroConfig.primaryButtonLink || "#"}
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:-translate-y-0.5 focus-visible:outline-none"
                    >
                      {t[heroConfig.primaryButtonText.toLowerCase().replace(/\s+/g, '')] || heroConfig.primaryButtonText}
                    </Link>
                  )}
                  
                  {heroConfig.secondaryButtonText && (
                    <Link
                      href={heroConfig.secondaryButtonLink || "#"}
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md border-2 border-primary px-8 py-4 text-base font-medium text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary/5 focus-visible:outline-none"
                    >
                      {t[heroConfig.secondaryButtonText.toLowerCase().replace(/\s+/g, '')] || heroConfig.secondaryButtonText}
                    </Link>
                  )}
                </div>
                
                {heroConfig.showTrustIndicators && heroConfig.trustIndicators && (
                  <div className="flex gap-6 pt-2">
                    {heroConfig.trustIndicators.map((indicator, index) => {
                      const Icon = IconsMap[indicator.icon] || CheckCircle2;
                      
                      return (
                        <div key={index} className="flex items-center">
                          <div className="mr-2 flex-shrink-0 h-6 w-6">
                            <Icon className={cn("h-6 w-6", primaryColorClass)} />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {indicator.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              
              {heroConfig.showImage && heroConfig.style === 'split' && (
                <div className="flex justify-center">
                  <div className="relative w-full max-w-md">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 rounded-2xl blur-2xl opacity-20 transform rotate-6"></div>
                    <div className="relative h-96 w-full overflow-hidden rounded-2xl shadow-2xl border-4 border-background">
                      <Image 
                        src={heroConfig.imageSrc}
                        alt="Hero image" 
                        width={600} 
                        height={480} 
                        className="object-cover h-full w-full"
                        priority
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                        <div className="text-white text-sm font-medium">Trusted by thousands of users</div>
                        <div className="flex items-center mt-2">
                          <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(index => (
                              <div key={index} className="inline-block h-8 w-8 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                                <div className="h-full w-full bg-primary/40 flex items-center justify-center text-xs text-primary-foreground font-bold">
                                  {index}
                                </div>
                              </div>
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-white">and many more</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Feature highlights */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className={cn("flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-md", primaryBgLightClass)}>
                    <Shield className={cn("h-6 w-6", primaryColorClass)} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Trusted Partner</h3>
                    <p className="text-sm text-muted-foreground mt-1">Serving with integrity and security</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className={cn("flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-md", primaryBgLightClass)}>
                    <Star className={cn("h-6 w-6", primaryColorClass)} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Premium Quality</h3>
                    <p className="text-sm text-muted-foreground mt-1">Exceptional service and outstanding results</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className={cn("flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-md", primaryBgLightClass)}>
                    <Users className={cn("h-6 w-6", primaryColorClass)} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Community Focused</h3>
                    <p className="text-sm text-muted-foreground mt-1">Building relationships that last</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative wave divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden line-height-0">
            <svg className="relative block w-full h-[70px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path 
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
                className="fill-background"
              ></path>
            </svg>
          </div>
        </section>
      )}

      {/* Values Section */}
      {valuesConfig.enabled && (
        <section className="py-28 px-6 bg-background relative">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-20">
              <div className="inline-flex items-center justify-center mb-4">
                <span className={cn("h-px w-10", primaryBgClass)}></span>
                <span className={cn("mx-4 text-sm font-semibold tracking-wide uppercase", primaryColorClass)}>Our Core Values</span>
                <span className={cn("h-px w-10", primaryBgClass)}></span>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                {valuesConfig.titleKey ? t[valuesConfig.titleKey] || valuesConfig.title : valuesConfig.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {valuesConfig.descriptionKey ? t[valuesConfig.descriptionKey] || valuesConfig.description : valuesConfig.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {valuesConfig.values.map((value, index) => {
                const Icon = IconsMap[value.icon] || Shield;
                
                return (
                  <div key={index} className="bg-background border border-border rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className={cn("w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg", primaryBgLightClass)}>
                      <Icon className={cn("w-8 h-8", primaryColorClass)} />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-foreground">
                      {value.titleKey ? t[value.titleKey] || value.title : value.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {value.descriptionKey ? t[value.descriptionKey] || value.description : value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Featured Services/Products Section */}
      {featuredConfig.enabled && (
        <section id="features" className="py-28 px-6 bg-gradient-to-b from-muted/50 to-background relative">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-center opacity-5"></div>
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center justify-center mb-4">
                <span className={cn("h-px w-10", primaryBgClass)}></span>
                <span className={cn("mx-4 text-sm font-semibold tracking-wide uppercase", primaryColorClass)}>Featured Offerings</span>
                <span className={cn("h-px w-10", primaryBgClass)}></span>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                {featuredConfig.titleKey ? t[featuredConfig.titleKey] || featuredConfig.title : featuredConfig.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {featuredConfig.descriptionKey ? t[featuredConfig.descriptionKey] || featuredConfig.description : featuredConfig.description}
              </p>
            </div>
            
            {/* Conditional rendering based on style */}
            {featuredConfig.style === 'cards' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {featuredConfig.items.map((item, index) => (
                  <div key={index} className="bg-background border border-border rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                    <div className="p-8">
                      <div className="flex justify-center mb-6">
                        <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg", primaryBgLightClass)}>
                          {item.image ? (
                            <Image 
                              src={item.image} 
                              alt={item.title} 
                              width={50} 
                              height={50}
                              className="rounded-lg"
                            />
                          ) : (
                            <Star className={cn("w-8 h-8", primaryColorClass)} />
                          )}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-center mb-4 text-foreground">
                        {item.titleKey ? t[item.titleKey] || item.title : item.title}
                      </h3>
                      <p className="text-center text-muted-foreground mb-6">
                        {item.descriptionKey ? t[item.descriptionKey] || item.description : item.description}
                      </p>
                      {item.highlight && (
                        <div className={cn("rounded-xl p-4 text-center font-bold shadow-inner", primaryBgLightClass, primaryColorClass)}>
                          {item.highlightKey ? t[item.highlightKey] || item.highlight : item.highlight}
                        </div>
                      )}
                      {item.link && (
                        <div className="mt-6 text-center">
                          <Link 
                            href={item.link} 
                            className={cn("inline-flex items-center font-semibold transition-colors group", primaryColorClass, `hover:${primaryColorClass}/80`)}
                          >
                            Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {featuredConfig.style === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {featuredConfig.items.slice(0, 2).map((item, index) => (
                  <div key={index} className="overflow-hidden rounded-2xl border border-border bg-background shadow-2xl transition-all hover:shadow-xl">
                    <div className={cn("px-8 py-6", primaryBgClass)}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-2xl font-bold text-primary-foreground">
                            {item.titleKey ? t[item.titleKey] || item.title : item.title}
                          </h3>
                          {item.badge && (
                            <p className="text-primary-foreground/80 text-lg">{item.badge}</p>
                          )}
                        </div>
                        {item.highlight && (
                          <div className="flex items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">
                            <span>{item.highlight}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {item.image && (
                          <div className="w-full md:w-1/3">
                            <div className="overflow-hidden rounded-xl shadow-lg">
                              <Image 
                                src={item.image} 
                                alt={item.title} 
                                width={300} 
                                height={300} 
                                className="rounded-xl w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          </div>
                        )}
                        <div className="w-full md:w-2/3">
                          <p className="text-muted-foreground mb-4">
                            {item.descriptionKey ? t[item.descriptionKey] || item.description : item.description}
                          </p>
                          {item.link && (
                            <Link 
                              href={item.link} 
                              className={cn("inline-flex items-center font-semibold transition-colors group", primaryColorClass, `hover:${primaryColorClass}/80`)}
                            >
                              Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {featuredConfig.style === 'list' && (
              <div className="space-y-6">
                {featuredConfig.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
                    {item.image ? (
                      <div className="bg-background rounded-xl p-3 shadow-lg">
                        <Image 
                          src={item.image} 
                          alt={item.title} 
                          width={50} 
                          height={50} 
                          className="rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className={cn("rounded-xl p-3 shadow-lg", primaryBgLightClass)}>
                        <Star className={cn("h-6 w-6", primaryColorClass)} />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-lg text-foreground">
                          {item.titleKey ? t[item.titleKey] || item.title : item.title}
                        </h4>
                        {item.badge && (
                          <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground">
                        {item.descriptionKey ? t[item.descriptionKey] || item.description : item.description}
                      </p>
                    </div>
                    {item.link && (
                      <Link href={item.link} className="ml-auto">
                        <ArrowRight className={cn("h-5 w-5", primaryColorClass)} />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* View all link */}
            <div className="mt-16 text-center">
              <Link 
                href="/services" 
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-8 py-4 text-base font-medium shadow-lg transition-all hover:-translate-y-0.5 focus-visible:outline-none",
                  primaryBgClass,
                  "text-primary-foreground",
                  `hover:${primaryBgClass}/90`
                )}
              >
                {t.viewAll || "View All"}
              </Link>
            </div>
          </div>
        </section>
      )}

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

            // Continuing the LandingPage component...

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

{/* Contact Section */}
{contactConfig.enabled && (
<section id="contact" className="py-28 px-6 bg-background">
  <div className="container mx-auto max-w-7xl">
    <div className="flex justify-center mb-12">
      <div className="relative w-20 h-20 md:w-32 md:h-32">
        <div className="absolute -inset-1 bg-primary rounded-full blur opacity-30 animate-pulse"></div>
        <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl bg-muted dark:bg-muted/50 ring-2 ring-primary/30">
          <Image
            src="/images/logo.png"
            alt={`${siteConfig.name} Logo`}
            width={128}
            height={128}
            className="object-cover"
          />
        </div>
      </div>
    </div>
    
    <div className="text-center mb-16">
      <div className="inline-flex items-center justify-center mb-4">
        <span className={cn("h-px w-10", primaryBgClass)}></span>
        <span className={cn("mx-4 text-sm font-semibold tracking-wide uppercase", primaryColorClass)}>Contact Us</span>
        <span className={cn("h-px w-10", primaryBgClass)}></span>
      </div>
      <h2 className="text-4xl font-bold mb-6 text-foreground">
        {contactConfig.titleKey ? t[contactConfig.titleKey] || contactConfig.title : contactConfig.title}
      </h2>
      <p className="text-lg text-muted-foreground max-w-md mx-auto">
        {contactConfig.descriptionKey ? t[contactConfig.descriptionKey] || contactConfig.description : contactConfig.description}
      </p>
    </div>
    
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {contactConfig.showAddress && (
          <div className="flex flex-col items-center p-8 bg-muted rounded-2xl text-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-6 shadow-lg">
              <MapPin className={cn("w-8 h-8", primaryColorClass)} />
            </div>
            <h3 className={cn("text-xl font-bold mb-4", primaryColorClass)}>
              {t.ourAddress || "Our Address"}
            </h3>
            <p className="text-foreground">
              {siteConfig.contact.address.street}<br />
              {siteConfig.contact.address.locality}<br />
              {siteConfig.contact.address.postalCode}<br />
              {siteConfig.contact.address.region}, {siteConfig.contact.address.country}
            </p>
            {contactConfig.mapLink && (
              <a 
                href={contactConfig.mapLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={cn("mt-4 text-sm inline-flex items-center group", primaryColorClass)}
              >
                {t.viewOnMap || "View on Map"} <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </a>
            )}
          </div>
        )}
        
        {contactConfig.showPhone && (
          <div className="flex flex-col items-center p-8 bg-muted rounded-2xl text-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Phone className={cn("w-8 h-8", primaryColorClass)} />
            </div>
            <h3 className={cn("text-xl font-bold mb-4", primaryColorClass)}>
              {t.contactNumbers || "Contact Numbers"}
            </h3>
            <div className="space-y-4">
              <a 
                href={`tel:${siteConfig.contact.phone}`} 
                className="block text-foreground hover:text-primary transition-colors"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
            {siteConfig.contact.openingHours && (
              <p className="mt-4 text-sm text-muted-foreground">
                {siteConfig.contact.openingHours}
              </p>
            )}
          </div>
        )}
        
        {contactConfig.showEmail && (
          <div className="flex flex-col items-center p-8 bg-muted rounded-2xl text-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Mail className={cn("w-8 h-8", primaryColorClass)} />
            </div>
            <h3 className={cn("text-xl font-bold mb-4", primaryColorClass)}>
              {t.emailUs || "Email Us"}
            </h3>
            <a 
              href={`mailto:${siteConfig.contact.email}`} 
              className="block text-foreground hover:text-primary transition-colors"
            >
              {siteConfig.contact.email}
            </a>
            {contactConfig.showSocials && (
              <div className="mt-6 p-3 bg-background rounded-xl">
                <p className="text-foreground mb-2">
                  {t.connectWithUs || "Connect With Us"}
                </p>
                <div className="flex justify-center space-x-4">
                  {siteConfig.links.facebook && (
                    <a 
                      href={siteConfig.links.facebook}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors", primaryBgClass, `hover:${primaryBgClass}/80`)}
                    >
                      <span className="sr-only">Facebook</span>
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  
                  {siteConfig.links.twitter && (
                    <a 
                      href={siteConfig.links.twitter}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors", primaryBgClass, `hover:${primaryBgClass}/80`)}
                    >
                      <span className="sr-only">Twitter</span>
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  )}
                  
                  {siteConfig.links.instagram && (
                    <a 
                      href={siteConfig.links.instagram}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors", primaryBgClass, `hover:${primaryBgClass}/80`)}
                    >
                      <span className="sr-only">Instagram</span>
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
</section>
)}
</div>
);
}