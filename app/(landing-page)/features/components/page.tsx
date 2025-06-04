// app/(landing-page)/features/components/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getLanguage, getTranslations } from '@/lib/i18n/server-utils';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  CheckCircle2, 
  ChevronRight, 
  Globe, 
  LayoutGrid,
  PanelLeft,
  TabletSmartphone,
  Moon,
  Palette,
  Box
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function ComponentsPage() {
  // Get language and translations with proper await
  const currentLanguage = await getLanguage();
  const t = await getTranslations(currentLanguage);
  
  // Determine if the language reads right-to-left
  const isRTL = currentLanguage === 'ar' || currentLanguage === 'he';
  
  // Set dynamic primary class names for easy theming
  const primaryClass = "text-primary";

  
  // Component categories
  const componentCategories = [
    {
      name: t.layoutComponents || "Layout Components",
      icon: LayoutGrid,
      description: t.layoutComponentsDesc || "Components for structuring your admin panel layout.",
      components: [
        "Dashboard Layout", "Sidebar", "Header", "Footer", "Card", "Grid", "Divider", "Container"
      ]
    },
    {
      name: t.navigationComponents || "Navigation Components",
      icon: PanelLeft,
      description: t.navigationComponentsDesc || "Components for user navigation and menus.",
      components: [
        "Navbar", "Sidebar Navigation", "Dropdown Menu", "Breadcrumbs", "Tabs", "Pagination", "Menu"
      ]
    },
    {
      name: t.dataDisplayComponents || "Data Display Components",
      icon: Box,
      description: t.dataDisplayComponentsDesc || "Components for displaying various types of data.",
      components: [
        "Table", "Data Grid", "List", "Tree View", "Timeline", "Statistics Card", "Progress", "Avatar"
      ]
    },
    {
      name: t.inputComponents || "Input Components",
      icon: TabletSmartphone,
      description: t.inputComponentsDesc || "Form controls and input elements for user interaction.",
      components: [
        "Text Input", "Select", "Checkbox", "Radio", "Switch", "Slider", "Date Picker", "File Upload"
      ]
    },
    {
      name: t.themingComponents || "Theming Components",
      icon: Palette,
      description: t.themingComponentsDesc || "Components for theme customization and styling.",
      components: [
        "Theme Provider", "Color Picker", "Theme Selector", "Design Tokens", "Custom Properties"
      ]
    },
    {
      name: t.utilityComponents || "Utility Components",
      icon: Moon,
      description: t.utilityComponentsDesc || "Utility components for additional functionality.",
      components: [
        "Modal", "Drawer", "Toast", "Tooltip", "Popover", "Loading", "Error Boundary", "Authentication"
      ]
    }
  ];

  // Feature highlights
  const highlights = [
    {
      title: t.consistentDesign || "Consistent Design Language",
      description: t.consistentDesignDesc || "All components follow the same design principles and aesthetics, ensuring a consistent user experience."
    },
    {
      title: t.accessibilityFirst || "Accessibility First",
      description: t.accessibilityFirstDesc || "Components are built with accessibility in mind, following WCAG guidelines to ensure your application is accessible to all users."
    },
    {
      title: t.customizableStyles || "Customizable Styles",
      description: t.customizableStylesDesc || "Easily customize the look and feel of components to match your brand identity with Tailwind CSS."
    },
    {
      title: t.responsiveByDefault || "Responsive by Default",
      description: t.responsiveByDefaultDesc || "All components are designed to work seamlessly across devices of all sizes, from mobile to desktop."
    },
    {
      title: t.typeScriptSupport || "TypeScript Support",
      description: t.typeScriptSupportDesc || "Full TypeScript support with type definitions for all components, providing better developer experience and code quality."
    },
    {
      title: t.darkModeSupport || "Dark Mode Support",
      description: t.darkModeSupportDesc || "Built-in support for dark mode, allowing users to choose their preferred theme for better visibility and reduced eye strain."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-foreground">
            {t.uiComponentLibrary || "UI Component Library"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            {t.componentLibraryDesc || "Explore our comprehensive library of UI components designed to help you build beautiful, functional, and accessible admin panels."}
          </p>
          
          {/* Search bar */}
          <div className="max-w-2xl mx-auto relative mb-12">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              className="w-full pl-12 pr-4 py-3 rounded-full border border-border focus:ring-2 focus:ring-primary focus:outline-none bg-background" 
              placeholder={t.searchComponents || "Search components..."}
            />
          </div>
          
          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {componentCategories.slice(0, 3).map((category, index) => (
              <Button 
                key={index}
                variant="outline" 
                className="gap-2"
                asChild
              >
                <a href={`#${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Component Showcase */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative mb-16 rounded-xl overflow-hidden shadow-lg">
            <div className="aspect-[16/9] relative">
              <Image 
                src="/images/components-showcase.jpg"
                alt="Component Showcase"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {t.buildFaster || "Build Faster with Pre-built Components"}
                </h2>
                <p className="text-white/80 text-lg max-w-3xl">
                  {t.componentShowcaseDesc || "Our component library includes everything you need to build professional admin panels without reinventing the wheel."}
                </p>
              </div>
            </div>
          </div>
          
          {/* Component Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {componentCategories.map((category, categoryIndex) => (
              <div 
                key={categoryIndex}
                id={category.name.toLowerCase().replace(/\s+/g, '-')}
                className="bg-background rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={cn("p-3 rounded-lg mr-4", "bg-primary/10")}>
                      <category.icon className={cn("w-6 h-6", primaryClass)} />
                    </div>
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    {category.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {category.components.slice(0, 4).map((component, componentIndex) => (
                      <li key={componentIndex} className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                        <span>{component}</span>
                      </li>
                    ))}
                    {category.components.length > 4 && (
                      <li className="text-muted-foreground">
                        {t.andMore || "And"} {category.components.length - 4} {t.more || "more"}...
                      </li>
                    )}
                  </ul>
                  <Link 
                    href="/documentation/ui-components" 
                    className={cn("inline-flex items-center font-medium", primaryClass)}
                  >
                    {t.viewAll || "View All"}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Feature Highlights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t.componentFeatures || "Component Features"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <div 
                key={index}
                className="bg-background rounded-xl p-6 border border-border shadow-sm"
              >
                <h3 className="text-xl font-bold mb-3">{highlight.title}</h3>
                <p className="text-muted-foreground">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Integration Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-background rounded-xl overflow-hidden shadow-lg border border-border">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-4">
                  {t.integratedWithNextjs || "Integrated with Next.js"}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {t.nextjsIntegrationDesc || "Our components are built specifically for Next.js, taking advantage of its powerful features like server components, app router, and more."}
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{t.serverComponents || "Server Components Support"}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{t.appRouter || "App Router Compatible"}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{t.optimizedForNextjs || "Optimized for Next.js Performance"}</span>
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/documentation/quick-start">
                    {t.getStarted || "Get Started"}
                  </Link>
                </Button>
              </div>
              <div className="md:w-1/2 bg-gray-100 dark:bg-gray-800 relative">
                <div className="aspect-square md:aspect-auto md:h-full relative">
                  <Image 
                    src="/images/nextjs-integration.jpg"
                    alt="Next.js Integration"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Internationalization Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="md:flex items-center gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">
                {t.multiLanguageSupport || "Multi-Language Support"}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t.i18nDesc || "Our components come with built-in internationalization support, making it easy to create multi-language admin panels that work globally."}
              </p>
              <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>{t.rtlSupport || "RTL Support for Arabic, Hebrew and other RTL languages"}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>{t.translationManagement || "Easy Translation Management"}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>{t.dynamicLanguageSwitching || "Dynamic Language Switching"}</span>
                </li>
              </ul>
              <Button className="gap-2" asChild>
                <Link href="/documentation/i18n">
                  <Globe className="w-4 h-4" />
                  {t.learnMoreI18n || "Learn More About I18n"}
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="bg-background rounded-xl p-6 border border-border shadow-md">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">
                    {`// Multi-language support example
import { getTranslations } from '@/lib/i18n/server-utils';

export async function MyComponent() {
  const translations = await getTranslations('en');
  
  return (
    <div>
      <h1>{translations.welcome}</h1>
      <p>{translations.description}</p>
    </div>
  );
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className={cn("py-16 px-4 sm:px-6 lg:px-8", "bg-primary text-primary-foreground")}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t.startBuilding || "Start Building with Our Components Today"}
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {t.startBuildingDesc || "Get access to our complete library of UI components and start building beautiful admin panels right away."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link href="/documentation/quick-start">
                {t.getStarted || "Get Started"}
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link href="/pricing">
                {t.viewPricing || "View Pricing"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}