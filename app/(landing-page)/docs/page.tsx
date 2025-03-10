import { getLanguage, getTranslations } from '@/lib/i18n/server-utils';
import { 
  BookOpen, 
  Code, 
  Search, 
  ChevronRight,
  Database,
  Layers,
  LineChart,
  Users,
  Globe,
  Briefcase,
  Smartphone,
  Layout,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default async function DocumentationPage() {
  // Get language and translations
  const currentLanguage = await getLanguage();
  const t = await getTranslations(currentLanguage);
  
  // Determine if RTL
  const isRTL = currentLanguage === 'ar' || currentLanguage === 'he';
  
  // CSS classes
  const primaryClass = "text-primary";
  const primaryBgClass = "bg-primary";
  
  // Navigation items
  const navItems = [
    { title: t.servicesOverview || "Services Overview", href: "#services", icon: Briefcase },
    { title: t.webDevelopment || "Web Development", href: "#web-dev", icon: Globe },
    { title: t.adminSystems || "Admin Systems", href: "#admin", icon: Layout },
    { title: t.contentManagement || "Content Management", href: "#cms", icon: BookOpen },
    { title: t.dataAnalytics || "Data Analytics", href: "#analytics", icon: LineChart },
    { title: t.mobileApps || "Mobile Apps", href: "#mobile", icon: Smartphone },
    { title: t.technologies || "Technologies", href: "#tech", icon: Code },
    { title: t.caseStudies || "Case Studies", href: "#cases", icon: Users },
    { title: t.getStarted || "Get Started", href: "#get-started", icon: CheckCircle },
  ];
  
  // Services data
  const services = [
    {
      id: "web-dev",
      title: t.webDevelopment || "Web Development",
      description: t.webDevDescription || "Custom website and web application development",
      icon: Globe,
      features: [
        "Responsive Design",
        "E-commerce Solutions",
        "Progressive Web Apps",
        "Custom CMS",
        "SEO Optimization",
        "Performance Optimization"
      ]
    },
    {
      id: "admin",
      title: t.adminSystems || "Admin Systems",
      description: t.adminDescription || "Powerful administrative dashboards for your business",
      icon: Layout,
      features: [
        "User Management",
        "Role-based Access",
        "Data Visualization",
        "Custom Reports",
        "Workflow Automation",
        "API Integration"
      ]
    },
    {
      id: "cms",
      title: t.contentManagement || "Content Management",
      description: t.contentDescription || "Easy-to-use CMS solutions for digital content",
      icon: BookOpen,
      features: [
        "Multi-language Support",
        "SEO Tools",
        "Media Management",
        "Version Control",
        "Content Scheduling",
        "Author Collaboration"
      ]
    },
    {
      id: "analytics",
      title: t.dataAnalytics || "Data Analytics",
      description: t.analyticsDescription || "Insights and visualization tools for your data",
      icon: LineChart,
      features: [
        "Interactive Dashboards",
        "Real-time Analytics",
        "Custom Reports",
        "Data Integration",
        "Export Options",
        "Predictive Analytics"
      ]
    },
    {
      id: "mobile",
      title: t.mobileApps || "Mobile Applications",
      description: t.mobileDescription || "Native and cross-platform mobile app development",
      icon: Smartphone,
      features: [
        "iOS Development",
        "Android Development",
        "Cross-platform Apps",
        "Offline Functionality",
        "Push Notifications",
        "App Store Deployment"
      ]
    }
  ];
  
  // Technologies
  const technologies = [
    { name: "Next.js", icon: Code },
    { name: "React", icon: Code },
    { name: "Node.js", icon: Code },
    { name: "TypeScript", icon: Code },
    { name: "Tailwind CSS", icon: Code },
    { name: "PostgreSQL", icon: Database },
    { name: "MongoDB", icon: Database },
    { name: "Prisma", icon: Database },
    { name: "Docker", icon: Layers }
  ];
  
  // Case studies
  const caseStudies = [
    {
      title: "E-commerce Platform",
      client: "RetailCo",
      description: "Complete e-commerce solution with custom admin panel",
      image: "/images/case-retail.jpg",
      technologies: ["Next.js", "React", "Node.js", "PostgreSQL"]
    },
    {
      title: "Content Management System",
      client: "MediaGroup",
      description: "Multi-language CMS for international content team",
      image: "/images/case-media.jpg",
      technologies: ["React", "Node.js", "MongoDB", "i18n"]
    },
    {
      title: "Analytics Dashboard",
      client: "DataViz Inc",
      description: "Real-time data visualization and reporting system",
      image: "/images/case-data.jpg",
      technologies: ["React", "D3.js", "Node.js", "WebSockets"]
    }
  ];
  
  // Getting started steps
  const steps = [
    { title: t.discovery || "Discovery Call", description: "We discuss your needs and goals" },
    { title: t.proposal || "Custom Proposal", description: "We create a detailed project plan" },
    { title: t.development || "Development", description: "Our team builds your solution" },
    { title: t.deployment || "Deployment", description: "Your solution goes live" },
    { title: t.maintenance || "Maintenance", description: "Ongoing support and updates" }
  ];

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className={cn("text-4xl md:text-5xl font-bold mb-6", primaryClass)}>
            {t.docs || "Documentation"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            {t.docsDescription || "Comprehensive guides and resources for our services and solutions"}
          </p>
          
          {/* Search bar */}
          <div className="max-w-2xl mx-auto relative mb-12">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              className="w-full pl-12 pr-4 py-3 rounded-full border border-border focus:ring-2 focus:ring-primary focus:outline-none bg-background" 
              placeholder={t.searchDocs || "Search documentation..."}
            />
          </div>
        </div>
      </section>
      
      {/* Main content with sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar navigation */}
          <aside className="lg:w-64 flex-shrink-0 mb-8 lg:mb-0">
            <div className="lg:sticky lg:top-24 bg-background rounded-lg border border-border p-4">
              <nav className="space-y-1">
                {navItems.map((item, i) => (
                  <a 
                    key={i}
                    href={item.href}
                    className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-muted group transition-colors"
                  >
                    <item.icon className={cn("mr-3 h-5 w-5", primaryClass)} />
                    <span className="truncate">{item.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>
          
          {/* Main content */}
          <main className="flex-1">
            {/* Services Overview Section */}
            <section id="services" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">{t.servicesOverview || "Services Overview"}</h2>
              <p className="text-lg text-muted-foreground mb-8">{t.servicesDescription || "Explore our range of professional services"}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, i) => (
                  <a 
                    key={i}
                    href={`#${service.id}`}
                    className="bg-background rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow hover:border-primary/50"
                  >
                    <div className="flex items-center mb-4">
                      <div className={cn("p-3 rounded-lg mr-4", "bg-primary/10")}>
                        <service.icon className={cn("w-6 h-6", primaryClass)} />
                      </div>
                      <h3 className="text-xl font-bold">{service.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center text-sm font-medium text-primary">
                      {t.learnMore || "Learn More"} <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </a>
                ))}
              </div>
            </section>
            
            {/* Individual Service Sections */}
            {services.map((service, index) => (
              <section id={service.id} key={index} className="mb-16 scroll-mt-16">
                <div className="flex items-center mb-6">
                  <div className={cn("p-3 rounded-lg mr-4", "bg-primary/10")}>
                    <service.icon className={cn("w-6 h-6", primaryClass)} />
                  </div>
                  <h2 className="text-3xl font-bold">{service.title}</h2>
                </div>
                
                <p className="text-lg text-muted-foreground mb-8">{service.description}</p>
                
                <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4">{t.featuresIncluded || "Features Included"}</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className={cn("mr-3 h-5 w-5", primaryClass)} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Example image placeholder */}
                <div className="mt-8 rounded-xl overflow-hidden border border-border">
                  <div className="h-64 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center">
                    <p className="text-muted-foreground">Image Placeholder: {service.title} Example</p>
                  </div>
                </div>
              </section>
            ))}
            
            {/* Technologies Section */}
            <section id="tech" className="mb-16 scroll-mt-16">
              <h2 className="text-3xl font-bold mb-6">{t.technologies || "Technologies"}</h2>
              <p className="text-lg text-muted-foreground mb-8">{t.techDescription || "The technologies we use to build solutions"}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {technologies.map((tech, i) => (
                  <div 
                    key={i} 
                    className="bg-background rounded-xl border border-border p-6 shadow-sm flex items-center"
                  >
                    <div className={cn("p-3 rounded-lg mr-4", "bg-primary/10")}>
                      <tech.icon className={cn("w-6 h-6", primaryClass)} />
                    </div>
                    <h3 className="text-lg font-bold">{tech.name}</h3>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Case Studies Section */}
            <section id="cases" className="mb-16 scroll-mt-16">
              <h2 className="text-3xl font-bold mb-6">{t.caseStudies || "Case Studies"}</h2>
              <p className="text-lg text-muted-foreground mb-8">{t.caseStudiesDescription || "Examples of our successful projects"}</p>
              
              <div className="space-y-8">
                {caseStudies.map((study, i) => (
                  <div key={i} className="bg-background rounded-xl border border-border overflow-hidden shadow-sm">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-primary/30 to-primary/5 p-6 flex items-center justify-center">
                        <p className="text-primary font-medium">Image: {study.title}</p>
                      </div>
                      <div className="p-6">
                        <div className="flex flex-col h-full">
                          <div>
                            <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                            <p className="text-sm font-medium text-primary mb-3">Client: {study.client}</p>
                            <p className="text-muted-foreground mb-4">{study.description}</p>
                          </div>
                          
                          <div className="mt-auto">
                            <h4 className="text-sm font-semibold mb-2">Technologies:</h4>
                            <div className="flex flex-wrap gap-2">
                              {study.technologies.map((tech, j) => (
                                <span 
                                  key={j} 
                                  className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Getting Started Section */}
            <section id="get-started" className="mb-16 scroll-mt-16">
              <h2 className="text-3xl font-bold mb-6">{t.getStarted || "Getting Started"}</h2>
              <p className="text-lg text-muted-foreground mb-8">Follow these steps to start your project with us:</p>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-border"></div>
                
                <div className="space-y-8">
                  {steps.map((step, i) => (
                    <div key={i} className="relative pl-14">
                      {/* Timeline dot */}
                      <div className={cn(
                        "absolute left-0 top-1.5 w-8 h-8 rounded-full flex items-center justify-center z-10",
                        primaryBgClass
                      )}>
                        <span className="text-white font-bold">{i + 1}</span>
                      </div>
                      
                      <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
                        <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* CTA Section */}
            <section className={cn("py-12 px-8 rounded-xl", primaryBgClass, "text-white")}>
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">
                  {t.readyToStart || "Ready to Start Your Project?"}
                </h2>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  {t.projectDescription || "Contact us to discuss your requirements"}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/contact" className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-md font-medium">
                    {t.contactUs || "Contact Us"}
                  </Link>
                  <Link href="/pricing" className="border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium">
                    {t.viewPricing || "View Pricing"}
                  </Link>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}