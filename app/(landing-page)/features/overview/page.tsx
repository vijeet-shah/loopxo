// app/(landing-page)/features/overview/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getLanguage, getTranslations } from '@/lib/i18n/server-utils';
import { Button } from '@/components/ui/button';
import { 
  Layout, 
  LayoutDashboard, 
  Layers, 
  Globe, 
  Moon, 
  BookOpen, 
  ServerCrash, 
  Shield, 
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function FeaturesOverviewPage() {
  // Get language and translations with proper await
  const currentLanguage = await getLanguage();
  const t = await getTranslations(currentLanguage);
  
  // Determine if the language reads right-to-left
  const isRTL = currentLanguage === 'ar' || currentLanguage === 'he';
  
  // Set dynamic primary class names for easy theming
  const primaryClass = "text-primary";
  const primaryBgClass = "bg-primary";


  // Main features list
  const mainFeatures = [
    {
      title: t.responsiveDesign || "Responsive Design",
      description: t.responsiveDesignDesc || "A fully responsive admin panel that works perfectly on all devices, from desktops to smartphones.",
      icon: Layout,
      imageUrl: "/images/features/responsive-design.jpg"
    },
    {
      title: t.customizableDashboard || "Customizable Dashboard",
      description: t.customizableDashboardDesc || "Build your perfect dashboard with drag-and-drop widgets, customizable charts, and personalized analytics.",
      icon: LayoutDashboard,
      imageUrl: "/images/features/dashboard.jpg"
    },
    {
      title: t.uiComponents || "Extensive UI Components",
      description: t.uiComponentsDesc || "Over 50+ UI components built with TailwindCSS and ShadcnUI, all fully customizable to match your brand.",
      icon: Layers,
      imageUrl: "/images/features/ui-components.jpg"
    },
    {
      title: t.multiLanguageSupport || "Multi-Language Support",
      description: t.multiLanguageDesc || "Built-in internationalization support for multiple languages, making your admin panel accessible globally.",
      icon: Globe,
      imageUrl: "/images/features/multilingual.jpg"
    },
    {
      title: t.darkMode || "Dark Mode",
      description: t.darkModeDesc || "Toggle between light and dark mode with a single click, offering comfortable viewing experiences in any environment.",
      icon: Moon,
      imageUrl: "/images/features/dark-mode.jpg"
    },
    {
      title: t.documentation || "Comprehensive Documentation",
      description: t.documentationDesc || "Detailed documentation with examples and guides to help you get started quickly and efficiently.",
      icon: BookOpen,
      imageUrl: "/images/features/documentation.jpg"
    },
    {
      title: t.performanceOptimized || "Performance Optimized",
      description: t.performanceOptimizedDesc || "Highly optimized for speed and efficiency, ensuring your admin panel loads quickly even with large datasets.",
      icon: ServerCrash,
      imageUrl: "/images/features/performance.jpg"
    },
    {
      title: t.securityFocused || "Security Focused",
      description: t.securityFocusedDesc || "Built with security best practices, including authentication, authorization, and protection against common web vulnerabilities.",
      icon: Shield,
      imageUrl: "/images/features/security.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            {t.everythingYouNeed || "Everything You Need to Build Amazing Admin Panels"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            {t.featuresOverviewDesc || "Explore the powerful features that make our admin panel template the perfect starting point for your next project."}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className={cn("gap-2", primaryBgClass)}
              asChild
            >
              <Link href="/pricing">
                {t.viewPricing || "View Pricing"}
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 border-primary text-primary"
              asChild
            >
              <Link href="/documentation/quick-start">
                {t.getStarted || "Get Started"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Key Features Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t.keyFeatures || "Key Features"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-background rounded-xl p-6 border border-border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className={cn("p-3 rounded-lg mr-4", "bg-primary/10")}>
                    <feature.icon className={cn("w-6 h-6", primaryClass)} />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Feature Showcase Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-6">
                {t.adminDashboard || "Admin Dashboard"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t.adminDashboardDesc || "Get a quick overview of your application with customizable widgets, charts, and data visualizations. Monitor key metrics and make data-driven decisions."}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ChevronRight className={cn("w-5 h-5 mt-0.5 mr-2", primaryClass)} />
                  <span>{t.customizableWidgets || "Customizable widgets and cards"}</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className={cn("w-5 h-5 mt-0.5 mr-2", primaryClass)} />
                  <span>{t.interactiveCharts || "Interactive charts and graphs"}</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className={cn("w-5 h-5 mt-0.5 mr-2", primaryClass)} />
                  <span>{t.realTimeUpdates || "Real-time data updates"}</span>
                </li>
              </ul>
            </div>
            <div className="order-1 lg:order-2 rounded-xl overflow-hidden shadow-xl relative">
              <Image 
                src="/images/features/dashboard-showcase.jpg" 
                alt="Admin Dashboard" 
                width={600} 
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <Image 
                src="/images/features/content-management.jpg" 
                alt="Content Management" 
                width={600} 
                height={400}
                className="w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {t.contentManagement || "Content Management"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t.contentManagementDesc || "Easily manage your blog posts, articles, or any content with our intuitive editor. Support for markdown, multilingual content, and media management."}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ChevronRight className={cn("w-5 h-5 mt-0.5 mr-2", primaryClass)} />
                  <span>{t.richTextEditor || "Rich text editor with markdown support"}</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className={cn("w-5 h-5 mt-0.5 mr-2", primaryClass)} />
                  <span>{t.mediaManagement || "Media management and galleries"}</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className={cn("w-5 h-5 mt-0.5 mr-2", primaryClass)} />
                  <span>{t.categoryTagging || "Categories, tags, and advanced filtering"}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-6">
                {t.userManagement || "User Management"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t.userManagementDesc || "Manage users, roles, and permissions with ease. Create user hierarchies, assign permissions, and maintain secure access control."}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ChevronRight className={cn("w-5 h-5 mt-0.5 mr-2", primaryClass)} />
                  <span>{t.roleBasedAccess || "Role-based access control"}</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className={cn("w-5 h-5 mt-0.5 mr-2", primaryClass)} />
                  <span>{t.userProfiles || "User profiles and activity tracking"}</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className={cn("w-5 h-5 mt-0.5 mr-2", primaryClass)} />
                  <span>{t.secureAuthentication || "Secure authentication methods"}</span>
                </li>
              </ul>
            </div>
            <div className="order-1 lg:order-2 rounded-xl overflow-hidden shadow-xl">
              <Image 
                src="/images/features/user-management.jpg" 
                alt="User Management" 
                width={600} 
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Technology Stack Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t.builtWithLatestTech || "Built with the Latest Technologies"}
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-12">
            {t.techStackDesc || "Our admin panel is built with modern, reliable technologies to ensure the best developer experience and end-user performance."}
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {/* Technology logos would go here */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-3">
                <Image src="/images/tech/nextjs.svg" alt="Next.js" width={40} height={40} />
              </div>
              <span className="text-sm font-medium">Next.js</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-3">
                <Image src="/images/tech/react.svg" alt="React" width={40} height={40} />
              </div>
              <span className="text-sm font-medium">React</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-3">
                <Image src="/images/tech/typescript.svg" alt="TypeScript" width={40} height={40} />
              </div>
              <span className="text-sm font-medium">TypeScript</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-3">
                <Image src="/images/tech/tailwind.svg" alt="Tailwind CSS" width={40} height={40} />
              </div>
              <span className="text-sm font-medium">Tailwind CSS</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-3">
                <Image src="/images/tech/prisma.svg" alt="Prisma" width={40} height={40} />
              </div>
              <span className="text-sm font-medium">Prisma</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-3">
                <Image src="/images/tech/shadcn.svg" alt="shadcn/ui" width={40} height={40} />
              </div>
              <span className="text-sm font-medium">shadcn/ui</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
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
              <Link href="/features/components">
                {t.exploreComponents || "Explore Components"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}