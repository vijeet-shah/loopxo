// app/(landing-page)/features/integrations/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getLanguage, getTranslations } from '@/lib/i18n/server-utils';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  ChevronRight, 
  Database, 
  Lock,
  Cloud,
  Code,
  Zap,
  BarChart,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function IntegrationsPage() {
  // Get language and translations with proper await
  const currentLanguage = await getLanguage();
  const t = await getTranslations(currentLanguage);
  
  // Determine if the language reads right-to-left
  const isRTL = currentLanguage === 'ar' || currentLanguage === 'he';
  
  // Set dynamic primary class names for easy theming
  const primaryClass = "text-primary";
  const primaryBgClass = "bg-primary";
  const primaryBorderClass = "border-primary";
  
  // Integration categories
  const integrationCategories = [
    {
      name: t.databaseIntegrations || "Database Integrations",
      icon: Database,
      description: t.databaseIntegrationsDesc || "Connect your admin panel to various database systems.",
      integrations: [
        "Prisma ORM", "MongoDB", "PostgreSQL", "MySQL", "SQLite", "Firebase Firestore"
      ],
      href: "/documentation/database-setup"
    },
    {
      name: t.authIntegrations || "Authentication Integrations",
      icon: Lock,
      description: t.authIntegrationsDesc || "Secure user authentication for your admin panel.",
      integrations: [
        "NextAuth.js", "Auth0", "Firebase Auth", "Magic Link", "Clerk", "Cognito"
      ],
      href: "/documentation/authentication"
    },
    {
      name: t.cloudIntegrations || "Cloud Service Integrations",
      icon: Cloud,
      description: t.cloudIntegrationsDesc || "Integrate with cloud services for storage and more.",
      integrations: [
        "Vercel", "AWS S3", "Cloudinary", "Supabase", "Google Cloud", "Azure"
      ],
      href: "/documentation/deployment"
    }
  ];

  // Featured integrations
  const featuredIntegrations = [
    {
      name: t.prismaORM || "Prisma ORM",
      logo: "/images/integrations/prisma.svg",
      description: t.prismaORMDesc || "Easily interact with your database using Prisma ORM. Type-safe database access, migrations, and more.",
      href: "/documentation/database-setup#prisma"
    },
    {
      name: t.nextAuthJs || "NextAuth.js",
      logo: "/images/integrations/nextauth.svg",
      description: t.nextAuthJsDesc || "Implement authentication in minutes with NextAuth.js. Support for OAuth providers, email/password, and more.",
      href: "/documentation/authentication#nextauth"
    },
    {
      name: t.vercelDeployment || "Vercel Deployment",
      logo: "/images/integrations/vercel.svg",
      description: t.vercelDeploymentDesc || "Deploy your admin panel to Vercel with just a few clicks. Automatic deployments, preview environments, and more.",
      href: "/documentation/deployment#vercel"
    }
  ];

  // Integration benefits
  const benefits = [
    {
      title: t.easyImplementation || "Easy Implementation",
      description: t.easyImplementationDesc || "Integrate with your favorite services in minutes with our pre-built connectors and detailed documentation.",
      icon: Zap
    },
    {
      title: t.performanceOptimized || "Performance Optimized",
      description: t.performanceOptimizedDesc || "Our integrations are built with performance in mind, ensuring minimal overhead and maximum efficiency.",
      icon: BarChart
    },
    {
      title: t.constantlyUpdated || "Constantly Updated",
      description: t.constantlyUpdatedDesc || "We continuously update our integrations to ensure compatibility with the latest versions of third-party services.",
      icon: RefreshCw
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-foreground">
            {t.powerfulIntegrations || "Powerful Integrations"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            {t.integrationsDesc || "Connect your admin panel to your favorite tools and services with our pre-built integrations."}
          </p>
          
          <Button 
            size="lg" 
            className={cn("gap-2", primaryBgClass)}
            asChild
          >
            <Link href="#all-integrations">
              {t.viewAllIntegrations || "View All Integrations"}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Integration Categories */}
      <section id="all-integrations" className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            {t.integrationsOverview || "Integrations Overview"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {integrationCategories.map((category, index) => (
              <div 
                key={index}
                className="bg-background rounded-xl border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
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
                    {category.integrations.slice(0, 4).map((integration, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                        <span>{integration}</span>
                      </li>
                    ))}
                    {category.integrations.length > 4 && (
                      <li className="text-muted-foreground">
                        {t.andMore || "And"} {category.integrations.length - 4} {t.more || "more"}...
                      </li>
                    )}
                  </ul>
                  <Link 
                    href={category.href} 
                    className={cn("inline-flex items-center font-medium", primaryClass)}
                  >
                    {t.viewAllIntegrationsInCategory || "View All"}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Integrations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t.featuredIntegrations || "Featured Integrations"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredIntegrations.map((integration, index) => (
              <div 
                key={index}
                className="bg-background rounded-xl p-6 border border-border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="h-16 w-16 relative">
                    <Image 
                      src={integration.logo} 
                      alt={integration.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{integration.name}</h3>
                <p className="text-muted-foreground mb-6 text-center">
                  {integration.description}
                </p>
                <div className="text-center">
                  <Link 
                    href={integration.href} 
                    className={cn("inline-flex items-center font-medium", primaryClass)}
                  >
                    {t.learnMore || "Learn More"}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Integration Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t.integrationBenefits || "Benefits of Our Integrations"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-background rounded-xl p-6 border border-border shadow-sm"
              >
                <div className={cn("p-3 rounded-lg inline-block mb-4", "bg-primary/10")}>
                  <benefit.icon className={cn("w-6 h-6", primaryClass)} />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Custom Integration Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="bg-background rounded-xl overflow-hidden shadow-lg border border-border">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-4">
                  {t.needCustomIntegration || "Need a Custom Integration?"}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {t.customIntegrationDesc || "Don't see the integration you need? Our documentation shows you how to create custom integrations with any service or API."}
                </p>
                <Button asChild>
                  <Link href="/documentation/integrations/custom">
                    {t.readDocumentation || "Read Documentation"}
                  </Link>
                </Button>
              </div>
              <div className="md:w-1/2 bg-gray-100 dark:bg-gray-800 relative">
                <div className="aspect-square md:aspect-auto md:h-full relative">
                  <Image 
                    src="/images/custom-integration.jpg"
                    alt="Custom Integration"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Code Example */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="md:flex items-center gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">
                {t.integrationExample || "Simple Integration Example"}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t.integrationExampleDesc || "Our integrations are designed to be simple to implement with just a few lines of code. Here's an example of connecting to a database with Prisma."}
              </p>
              <Button className="gap-2" asChild>
                <Link href="/documentation/database-setup">
                  <Code className="w-4 h-4" />
                  {t.readDocumentation || "Read Documentation"}
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="bg-background rounded-xl p-6 border border-border shadow-md">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm">
                    {`// Database integration with Prisma
import { PrismaClient } from '@prisma/client'

// Initialize Prisma client
const prisma = new PrismaClient()

// Use in your API routes
export async function getUsers() {
  try {
    // Fetch all users with their profiles
    const users = await prisma.user.findMany({
      include: {
        profile: true,
      },
    })
    
    return users
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
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
            {t.readyToConnect || "Ready to Connect Your Services?"}
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {t.readyToConnectDesc || "Get started with our admin panel template and integrate with your favorite services today."}
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
                <ExternalLink className="w-4 h-4 mr-2" />
                {t.exploreComponents || "Explore Components"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}