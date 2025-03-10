// lib/i18n/dictionary.ts
export type TranslationKey = string;

// This type helps TypeScript validate that all languages have the same keys
export type TranslationDictionary<T extends Record<TranslationKey, string>> = {
  [language: string]: T;
};

// The base type that all language dictionaries must follow
export type BaseTranslations = {
  // Navigation
  home: string;
  about: string;
  services: string;
  blog: string;
  contact: string;
  
  // Common actions
  login: string;
  register: string;
  applyNow: string;
  learnMore: string;
  viewAll: string;
  
  // Hero section
  heroTitle: string;
  heroDescription: string;
  exploreMore: string;
  
  // Blog specific
  blogTitle: string;
  blogDescription: string;
  featuredPost: string;
  allPosts: string;
  readMore: string;
  minRead: string;
  backToBlog: string;
  tableOfContents: string;
  
  // Footer
  footerTagline: string;
  allRightsReserved: string;
  quickLinks: string;
  
  // Documentation page
  docGettingStarted: string;
  docGettingStartedDesc: string;
  docQuickStart: string;
  docInstallation: string;
  docConfig: string;
  docComponents: string;
  docComponentsDesc: string;
  docUI: string;
  docForms: string;
  docLayouts: string;
  docDataManagement: string;
  docDataManagementDesc: string;
  docDatabaseSetup: string;
  docAPIRoutes: string;
  docAuth: string;
  docAdvancedTopics: string;
  docAdvancedTopicsDesc: string;
  docCustomization: string;
  docDeployment: string;
  docPerformance: string;
  documentation: string;
  documentationDesc: string;
  searchDocs: string;
  quickStart: string;
  apiReference: string;
  github: string;
  buildFaster: string;
  componentShowcaseDesc: string;
  additionalResources: string;
  contribute: string;
  contributeDesc: string;
  visitGithub: string;
  support: string;
  supportDesc: string;
  contactUs: string;
  readyToStart: string;
  readyToStartDesc: string;
  getStarted: string;
  exploreFeatures: string;

  // Pricing page
  transparentPricing: string;
  pricingDesc: string;
  oneTimePayment: string;
  noSubscription: string;
  freePlan: string;
  freePlanPrice: string;
  freePlanDesc: string;
  proPlan: string;
  proPlanPrice: string;
  proPlanPeriod: string;
  proPlanDesc: string;
  enterprisePlan: string;
  enterprisePlanPrice: string;
  enterprisePlanDesc: string;
  mostPopular: string;
  whatsIncluded: string;
  uiComponents: string;
  responsiveDesign: string;
  singleUser: string;
  basicTemplates: string;
  githubAccess: string;
  communitySupport: string;
  blogFunctionality: string;
  multiLanguageSupport: string;
  prioritySupport: string;
  advancedAnalytics: string;
  needCustomSolution: string;
  customSolutionDesc: string;
  contactSales: string;
  frequentlyAskedQuestions: string;
  pricingFaq1Q: string;
  pricingFaq1A: string;
  pricingFaq2Q: string;
  pricingFaq2A: string;
  pricingFaq3Q: string;
  pricingFaq3A: string;
  pricingFaq4Q: string;
  pricingFaq4A: string;
  pricingFaq5Q: string;
  pricingFaq5A: string;
  stillHaveQuestions: string;
  contactSupport: string;
  readyToGetStarted: string;
  startBuildingToday: string;
  getStartedFree: string;
  unlimitedUsers: string;
  allTemplates: string;
  emailSupport: string;
  premiumSupport: string;
  buyNow: string;

  // Features Overview
  everythingYouNeed: string;
  featuresOverviewDesc: string;
  keyFeatures: string;
  allFeaturesIncluded: string;
  viewPricing: string;
  adminDashboard: string;
  adminDashboardDesc: string;
  contentManagement: string;
  contentManagementDesc: string;
  userManagement: string;
  userManagementDesc: string;
  builtWithLatestTech: string;
  techStackDesc: string;
  startBuilding: string;
  startBuildingDesc: string;

  // Features Components
  uiComponentLibrary: string;
  componentLibraryDesc: string;
  searchComponents: string;
  layoutComponents: string;
  layoutComponentsDesc: string;
  navigationComponents: string;
  navigationComponentsDesc: string;
  dataDisplayComponents: string;
  dataDisplayComponentsDesc: string;
  inputComponents: string;
  inputComponentsDesc: string;
  themingComponents: string;
  themingComponentsDesc: string;
  utilityComponents: string;
  utilityComponentsDesc: string;
  consistentDesign: string;
  consistentDesignDesc: string;
  accessibilityFirst: string;
  accessibilityFirstDesc: string;
  customizableStyles: string;
  customizableStylesDesc: string;
  responsiveByDefault: string;
  responsiveByDefaultDesc: string;
  typeScriptSupport: string;
  typeScriptSupportDesc: string;
  darkModeSupport: string;
  darkModeSupportDesc: string;
  integratedWithNextjs: string;
  nextjsIntegrationDesc: string;
  serverComponents: string;
  appRouter: string;
  optimizedForNextjs: string;
  rtlSupport: string;
  translationManagement: string;
  dynamicLanguageSwitching: string;
  learnMoreI18n: string;

  // Features Integrations
  powerfulIntegrations: string;
  integrationsDesc: string;
  viewAllIntegrations: string;
  integrationsOverview: string;
  databaseIntegrations: string;
  databaseIntegrationsDesc: string;
  authIntegrations: string;
  authIntegrationsDesc: string;
  cloudIntegrations: string;
  cloudIntegrationsDesc: string;
  viewAllIntegrationsInCategory: string;
  featuredIntegrations: string;
  prismaORM: string;
  prismaORMDesc: string;
  nextAuthJs: string;
  nextAuthJsDesc: string;
  vercelDeployment: string;
  vercelDeploymentDesc: string;
  integrationBenefits: string;
  easyImplementation: string;
  easyImplementationDesc: string;
  performanceOptimized: string;
  performanceOptimizedDesc: string;
  constantlyUpdated: string;
  constantlyUpdatedDesc: string;
  needCustomIntegration: string;
  customIntegrationDesc: string;
  readDocumentation: string;
  readyToConnect: string;
  readyToConnectDesc: string;
  
  // Allow for extension with any string key
  [key: string]: string;
};

// English translations
const en: BaseTranslations = {
  // Navigation
  home: "Home",
  about: "About",
  services: "Services",
  blog: "Blog",
  contact: "Contact",
  
  // Common actions
  login: "Login",
  register: "Register",
  applyNow: "Apply Now",
  learnMore: "Learn More",
  viewAll: "View All",
  
  // Hero section
  heroTitle: "Welcome to Our Platform",
  heroDescription: "Your journey starts here with our comprehensive solutions.",
  exploreMore: "Explore More",
  
  // Blog specific
  blogTitle: "Blog",
  blogDescription: "Latest articles and updates",
  featuredPost: "Featured Post",
  allPosts: "All Posts",
  readMore: "Read More",
  minRead: "min read",
  backToBlog: "Back to Blog",
  tableOfContents: "Table of Contents",
  
  // Footer
  footerTagline: "Providing Quality Services",
  allRightsReserved: "All rights reserved.",
  quickLinks: "Quick Links",

  // Documentation page
  docGettingStarted: "Getting Started",
  docGettingStartedDesc: "Quick installation and setup guides to get your project running.",
  docQuickStart: "Quick Start",
  docInstallation: "Installation",
  docConfig: "Configuration",
  docComponents: "Components",
  docComponentsDesc: "Pre-built UI components ready to use in your admin panel.",
  docUI: "UI Components",
  docForms: "Forms & Validation",
  docLayouts: "Layout Examples",
  docDataManagement: "Data Management",
  docDataManagementDesc: "Learn how to manage data with database integration and API routes.",
  docDatabaseSetup: "Database Setup",
  docAPIRoutes: "API Routes",
  docAuth: "Authentication",
  docAdvancedTopics: "Advanced Topics",
  docAdvancedTopicsDesc: "Dive deeper into customization and advanced features.",
  docCustomization: "Customization",
  docDeployment: "Deployment",
  docPerformance: "Performance",
  documentation: "Documentation",
  documentationDesc: "Comprehensive guides and resources to help you build and customize your admin panel.",
  searchDocs: "Search documentation...",
  quickStart: "Quick Start",
  apiReference: "API Reference",
  github: "GitHub",
  buildFaster: "Build Faster with Pre-built Components",
  componentShowcaseDesc: "Our component library includes everything you need to build professional admin panels without reinventing the wheel.",
  additionalResources: "Additional Resources",
  contribute: "Contribute",
  contributeDesc: "Join our open source community and help improve the project.",
  visitGithub: "Visit GitHub",
  support: "Support",
  supportDesc: "Get help from our team or community support channels.",
  contactUs: "Contact Us",
  readyToStart: "Ready to Start Building?",
  readyToStartDesc: "Get started with our admin panel template and build your next project faster.",
  getStarted: "Get Started",
  exploreFeatures: "Explore Features",

  // Pricing page
  transparentPricing: "Simple, Transparent Pricing",
  pricingDesc: "Choose the perfect plan for your project. All plans include access to our core admin panel features.",
  oneTimePayment: "One-time payment",
  noSubscription: "No subscription",
  freePlan: "Free",
  freePlanPrice: "Free",
  freePlanDesc: "Perfect for personal projects or learning.",
  proPlan: "Pro",
  proPlanPrice: "$99",
  proPlanPeriod: "one-time payment",
  proPlanDesc: "Everything you need for professional projects.",
  enterprisePlan: "Enterprise",
  enterprisePlanPrice: "Custom",
  enterprisePlanDesc: "Advanced features and dedicated support for large teams.",
  mostPopular: "Most Popular",
  whatsIncluded: "What's included:",
  uiComponents: "UI Components",
  responsiveDesign: "Responsive Design",
  singleUser: "Single User",
  basicTemplates: "Basic Templates",
  githubAccess: "GitHub Access",
  communitySupport: "Community Support",
  blogFunctionality: "Blog Functionality",
  multiLanguageSupport: "Multi-Language Support",
  prioritySupport: "Priority Support",
  advancedAnalytics: "Advanced Analytics",
  needCustomSolution: "Need a custom solution?",
  customSolutionDesc: "Our enterprise plan includes custom development, priority support, and additional features tailored to your specific needs.",
  contactSales: "Contact Sales",
  frequentlyAskedQuestions: "Frequently Asked Questions",
  pricingFaq1Q: "What's included in the free plan?",
  pricingFaq1A: "The free plan includes access to all basic UI components, responsive design, and GitHub repository access. It's perfect for personal projects, learning, or evaluating the admin panel before purchasing.",
  pricingFaq2Q: "Is the Pro license a subscription or one-time payment?",
  pricingFaq2A: "The Pro license is a one-time payment that gives you lifetime access to all current features included in the Pro plan at the time of purchase. Future major version updates may require an upgrade fee.",
  pricingFaq3Q: "Can I use this for client projects?",
  pricingFaq3A: "Yes! The Pro license allows you to use the admin panel for unlimited client projects. Each project can have its own installation and customization.",
  pricingFaq4Q: "Do you offer refunds?",
  pricingFaq4A: "We offer a 14-day money-back guarantee for the Pro license. If you're not satisfied with the product, contact us within 14 days of purchase for a full refund.",
  pricingFaq5Q: "What kind of support is included?",
  pricingFaq5A: "Free users get community support through GitHub issues. Pro users receive email support with a 48-hour response time. Enterprise clients get priority support with dedicated channels and faster response times.",
  stillHaveQuestions: "Still have questions?",
  contactSupport: "Contact Support",
  readyToGetStarted: "Ready to Get Started?",
  startBuildingToday: "Join thousands of developers building better admin panels with our solution.",
  getStartedFree: "Get Started for Free",
  unlimitedUsers: "Unlimited Users",
  allTemplates: "All Templates",
  emailSupport: "Email Support",
  premiumSupport: "Premium Support",
  buyNow: "Buy Now",

  // Features Overview
  everythingYouNeed: "Everything You Need to Build Amazing Admin Panels",
  featuresOverviewDesc: "Explore the powerful features that make our admin panel template the perfect starting point for your next project.",
  keyFeatures: "Key Features",
  allFeaturesIncluded: "All Features Included",
  viewPricing: "View Pricing",
  adminDashboard: "Admin Dashboard",
  adminDashboardDesc: "Get a quick overview of your application with customizable widgets, charts, and data visualizations. Monitor key metrics and make data-driven decisions.",
  contentManagement: "Content Management",
  contentManagementDesc: "Easily manage your blog posts, articles, or any content with our intuitive editor. Support for markdown, multilingual content, and media management.",
  userManagement: "User Management",
  userManagementDesc: "Manage users, roles, and permissions with ease. Create user hierarchies, assign permissions, and maintain secure access control.",
  builtWithLatestTech: "Built with the Latest Technologies",
  techStackDesc: "Our admin panel is built with modern, reliable technologies to ensure the best developer experience and end-user performance.",
  startBuilding: "Start Building with Our Components Today",
  startBuildingDesc: "Get access to our complete library of UI components and start building beautiful admin panels right away.",

  // Features Components
  uiComponentLibrary: "UI Component Library",
  componentLibraryDesc: "Explore our comprehensive library of UI components designed to help you build beautiful, functional, and accessible admin panels.",
  searchComponents: "Search components...",
  layoutComponents: "Layout Components",
  layoutComponentsDesc: "Components for structuring your admin panel layout.",
  navigationComponents: "Navigation Components",
  navigationComponentsDesc: "Components for user navigation and menus.",
  dataDisplayComponents: "Data Display Components",
  dataDisplayComponentsDesc: "Components for displaying various types of data.",
  inputComponents: "Input Components",
  inputComponentsDesc: "Form controls and input elements for user interaction.",
  themingComponents: "Theming Components",
  themingComponentsDesc: "Components for theme customization and styling.",
  utilityComponents: "Utility Components",
  utilityComponentsDesc: "Utility components for additional functionality.",
  consistentDesign: "Consistent Design Language",
  consistentDesignDesc: "All components follow the same design principles and aesthetics, ensuring a consistent user experience.",
  accessibilityFirst: "Accessibility First",
  accessibilityFirstDesc: "Components are built with accessibility in mind, following WCAG guidelines to ensure your application is accessible to all users.",
  customizableStyles: "Customizable Styles",
  customizableStylesDesc: "Easily customize the look and feel of components to match your brand identity with Tailwind CSS.",
  responsiveByDefault: "Responsive by Default",
  responsiveByDefaultDesc: "All components are designed to work seamlessly across devices of all sizes, from mobile to desktop.",
  typeScriptSupport: "TypeScript Support",
  typeScriptSupportDesc: "Full TypeScript support with type definitions for all components, providing better developer experience and code quality.",
  darkModeSupport: "Dark Mode Support",
  darkModeSupportDesc: "Built-in support for dark mode, allowing users to choose their preferred theme for better visibility and reduced eye strain.",
  integratedWithNextjs: "Integrated with Next.js",
  nextjsIntegrationDesc: "Our components are built specifically for Next.js, taking advantage of its powerful features like server components, app router, and more.",
  serverComponents: "Server Components Support",
  appRouter: "App Router Compatible",
  optimizedForNextjs: "Optimized for Next.js Performance",
  rtlSupport: "RTL Support for Arabic, Hebrew and other RTL languages",
  translationManagement: "Easy Translation Management",
  dynamicLanguageSwitching: "Dynamic Language Switching",
  learnMoreI18n: "Learn More About I18n",

  // Features Integrations
  powerfulIntegrations: "Powerful Integrations",
  integrationsDesc: "Connect your admin panel to your favorite tools and services with our pre-built integrations.",
  viewAllIntegrations: "View All Integrations",
  integrationsOverview: "Integrations Overview",
  databaseIntegrations: "Database Integrations",
  databaseIntegrationsDesc: "Connect your admin panel to various database systems.",
  authIntegrations: "Authentication Integrations",
  authIntegrationsDesc: "Secure user authentication for your admin panel.",
  cloudIntegrations: "Cloud Service Integrations",
  cloudIntegrationsDesc: "Integrate with cloud services for storage and more.",
  viewAllIntegrationsInCategory: "View All",
  featuredIntegrations: "Featured Integrations",
  prismaORM: "Prisma ORM",
  prismaORMDesc: "Easily interact with your database using Prisma ORM. Type-safe database access, migrations, and more.",
  nextAuthJs: "NextAuth.js",
  nextAuthJsDesc: "Implement authentication in minutes with NextAuth.js. Support for OAuth providers, email/password, and more.",
  vercelDeployment: "Vercel Deployment",
  vercelDeploymentDesc: "Deploy your admin panel to Vercel with just a few clicks. Automatic deployments, preview environments, and more.",
  integrationBenefits: "Benefits of Our Integrations",
  easyImplementation: "Easy Implementation",
  easyImplementationDesc: "Integrate with your favorite services in minutes with our pre-built connectors and detailed documentation.",
  performanceOptimized: "Performance Optimized",
  performanceOptimizedDesc: "Our integrations are built with performance in mind, ensuring minimal overhead and maximum efficiency.",
  constantlyUpdated: "Constantly Updated",
  constantlyUpdatedDesc: "We continuously update our integrations to ensure compatibility with the latest versions of third-party services.",
  needCustomIntegration: "Need a Custom Integration?",
  customIntegrationDesc: "Don't see the integration you need? Our documentation shows you how to create custom integrations with any service or API.",
  readDocumentation: "Read Documentation",
  readyToConnect: "Ready to Connect Your Services?",
  readyToConnectDesc: "Get started with our admin panel template and integrate with your favorite services today.",
};

// Hindi translations
const hi: BaseTranslations = {
  // Navigation
  home: "होम",
  about: "हमारे बारे में",
  services: "सेवाएं",
  blog: "ब्लॉग",
  contact: "संपर्क",
  
  // Common actions
  login: "लॉगिन",
  register: "रजिस्टर",
  applyNow: "अभी आवेदन करें",
  learnMore: "और जानें",
  viewAll: "सभी देखें",
  
  // Hero section
  heroTitle: "हमारे प्लेटफॉर्म पर आपका स्वागत है",
  heroDescription: "हमारे व्यापक समाधानों के साथ आपकी यात्रा यहां से शुरू होती है।",
  exploreMore: "और एक्सप्लोर करें",
  
  // Blog specific
  blogTitle: "ब्लॉग",
  blogDescription: "नवीनतम लेख और अपडेट",
  featuredPost: "विशेष पोस्ट",
  allPosts: "सभी पोस्ट",
  readMore: "और पढ़ें",
  minRead: "मिनट का पठन",
  backToBlog: "ब्लॉग पर वापस जाएं",
  tableOfContents: "विषय सूची",
  
  // Footer
  footerTagline: "गुणवत्तापूर्ण सेवाएं प्रदान करना",
  allRightsReserved: "सर्वाधिकार सुरक्षित।",
  quickLinks: "त्वरित लिंक्स",

  // Documentation page
  docGettingStarted: "शुरुआत करना",
  docGettingStartedDesc: "अपने प्रोजेक्ट को शुरू करने के लिए त्वरित इंस्टॉलेशन और सेटअप गाइड।",
  docQuickStart: "त्वरित शुरुआत",
  docInstallation: "इंस्टॉलेशन",
  docConfig: "कॉन्फ़िगरेशन",
  docComponents: "कंपोनेंट्स",
  docComponentsDesc: "आपके एडमिन पैनल में उपयोग के लिए तैयार पूर्व-निर्मित UI कंपोनेंट्स।",
  docUI: "UI कंपोनेंट्स",
  docForms: "फॉर्म और वैलिडेशन",
  docLayouts: "लेआउट उदाहरण",
  docDataManagement: "डेटा प्रबंधन",
  docDataManagementDesc: "डेटाबेस इंटीग्रेशन और API रूट्स के साथ डेटा प्रबंधन सीखें।",
  docDatabaseSetup: "डेटाबेस सेटअप",
  docAPIRoutes: "API रूट्स",
  docAuth: "प्रमाणीकरण",
  docAdvancedTopics: "उन्नत विषय",
  docAdvancedTopicsDesc: "कस्टमाइजेशन और उन्नत फीचर्स में गहराई से जाएं।",
  docCustomization: "कस्टमाइजेशन",
  docDeployment: "डिप्लॉयमेंट",
  docPerformance: "प्रदर्शन",
  documentation: "दस्तावेज़ीकरण",
  documentationDesc: "आपके एडमिन पैनल को बनाने और कस्टमाइज़ करने में मदद के लिए व्यापक गाइड और संसाधन।",
  searchDocs: "दस्तावेज़ ढूंढें...",
  quickStart: "त्वरित शुरुआत",
  apiReference: "API संदर्भ",
  github: "गिटहब",
  buildFaster: "पूर्व-निर्मित कंपोनेंट्स के साथ तेजी से बनाएं",
  componentShowcaseDesc: "हमारे कंपोनेंट लाइब्रेरी में आपको पेशेवर एडमिन पैनल बनाने के लिए सभी आवश्यक चीजें शामिल हैं।",
  additionalResources: "अतिरिक्त संसाधन",
  contribute: "योगदान दें",
  contributeDesc: "हमारे ओपन सोर्स समुदाय में शामिल हों और प्रोजेक्ट को बेहतर बनाने में मदद करें।",
  visitGithub: "गिटहब पर जाएँ",
  support: "सहायता",
  supportDesc: "हमारी टीम या सामुदायिक सहायता चैनलों से मदद प्राप्त करें।",
  contactUs: "हमसे संपर्क करें",
  readyToStart: "निर्माण शुरू करने के लिए तैयार हैं?",
  readyToStartDesc: "हमारे एडमिन पैनल टेम्प्लेट के साथ शुरू करें और अपना अगला प्रोजेक्ट तेजी से बनाएं।",
  getStarted: "शुरू करें",
  exploreFeatures: "फीचर्स का अन्वेषण करें",

  // Pricing page
  transparentPricing: "सरल, पारदर्शी मूल्य निर्धारण",
  pricingDesc: "अपने प्रोजेक्ट के लिए सही प्लान चुनें। सभी प्लान में हमारे मुख्य एडमिन पैनल फीचर्स शामिल हैं।",
  oneTimePayment: "एक बार भुगतान",
  noSubscription: "कोई सब्सक्रिप्शन नहीं",
  freePlan: "फ्री",
  freePlanPrice: "मुफ्त",
  freePlanDesc: "व्यक्तिगत प्रोजेक्ट या सीखने के लिए बिल्कुल सही।",
  proPlan: "प्रो",
  proPlanPrice: "₹7,999",
  proPlanPeriod: "एक बार भुगतान",
  proPlanDesc: "पेशेवर प्रोजेक्ट के लिए आपको जो चाहिए वो सब।",
  enterprisePlan: "एंटरप्राइज",
  enterprisePlanPrice: "कस्टम",
  enterprisePlanDesc: "बड़ी टीमों के लिए उन्नत फीचर्स और समर्पित सहायता।",
  mostPopular: "सबसे लोकप्रिय",
  whatsIncluded: "क्या शामिल है:",
  uiComponents: "UI कंपोनेंट्स",
  responsiveDesign: "रेस्पोंसिव डिज़ाइन",
  singleUser: "एकल उपयोगकर्ता",
  basicTemplates: "बेसिक टेम्पलेट्स",
  githubAccess: "गिटहब एक्सेस",
  communitySupport: "कम्युनिटी सपोर्ट",
  blogFunctionality: "ब्लॉग कार्यक्षमता",
  multiLanguageSupport: "बहु-भाषा समर्थन",
  prioritySupport: "प्राथमिकता समर्थन",
  advancedAnalytics: "उन्नत एनालिटिक्स",
  needCustomSolution: "कस्टम समाधान की आवश्यकता है?",
  customSolutionDesc: "हमारा एंटरप्राइज प्लान कस्टम विकास, प्राथमिकता समर्थन और आपकी विशिष्ट जरूरतों के अनुरूप अतिरिक्त सुविधाओं को शामिल करता है।",
  contactSales: "बिक्री से संपर्क करें",
  frequentlyAskedQuestions: "अक्सर पूछे जाने वाले प्रश्न",
  pricingFaq1Q: "फ्री प्लान में क्या शामिल है?",
  pricingFaq1A: "फ्री प्लान में सभी बेसिक UI कंपोनेंट्स, रेस्पोंसिव डिज़ाइन और गिटहब रिपॉजिटरी एक्सेस शामिल है। यह व्यक्तिगत प्रोजेक्ट, सीखने या खरीदने से पहले एडमिन पैनल का मूल्यांकन करने के लिए एकदम सही है।",
  pricingFaq2Q: "क्या प्रो लाइसेंस एक सब्सक्रिप्शन है या एक बार भुगतान है?",
  pricingFaq2A: "प्रो लाइसेंस एक बार का भुगतान है जो आपको खरीद के समय प्रो प्लान में शामिल सभी वर्तमान फीचर्स तक आजीवन पहुंच प्रदान करता है। भविष्य के प्रमुख संस्करण अपडेट के लिए अपग्रेड शुल्क की आवश्यकता हो सकती है।",
  pricingFaq3Q: "क्या मैं इसे क्लाइंट प्रोजेक्ट के लिए उपयोग कर सकता हूं?",
  pricingFaq3A: "हां! प्रो लाइसेंस आपको असीमित क्लाइंट प्रोजेक्ट के लिए एडमिन पैनल का उपयोग करने की अनुमति देता है। प्रत्येक प्रोजेक्ट में अपना इंस्टॉलेशन और कस्टमाइज़ेशन हो सकता है।",
  pricingFaq4Q: "क्या आप रिफंड प्रदान करते हैं?",
  pricingFaq4A: "हम प्रो लाइसेंस के लिए 14-दिन की मनी-बैक गारंटी प्रदान करते हैं। यदि आप उत्पाद से संतुष्ट नहीं हैं, तो पूर्ण रिफंड के लिए खरीदारी के 14 दिनों के भीतर हमसे संपर्क करें।",
  pricingFaq5Q: "किस प्रकार का सपोर्ट शामिल है?",
  pricingFaq5A: "फ्री उपयोगकर्ताओं को गिटहब इश्यूज के माध्यम से कम्युनिटी सपोर्ट मिलता है। प्रो उपयोगकर्ताओं को 48 घंटे के प्रतिक्रिया समय के साथ ईमेल सपोर्ट प्राप्त होता है। एंटरप्राइज क्लाइंट को समर्पित चैनलों और तेज़ प्रतिक्रिया समय के साथ प्राथमिकता सपोर्ट मिलता है।",
  stillHaveQuestions: "अभी भी प्रश्न हैं?",
  contactSupport: "सपोर्ट से संपर्क करें",
  readyToGetStarted: "शुरू करने के लिए तैयार हैं?",
  startBuildingToday: "हमारे समाधान के साथ बेहतर एडमिन पैनल बनाने वाले हजारों डेवलपर्स में शामिल हों।",
  getStartedFree: "मुफ्त में शुरू करें",
  unlimitedUsers: "असीमित उपयोगकर्ता",
  allTemplates: "सभी टेम्प्लेट्स",
  emailSupport: "ईमेल सपोर्ट",
  premiumSupport: "प्रीमियम सपोर्ट",
  buyNow: "अभी खरीदें",

  // Features Overview
  everythingYouNeed: "अद्भुत एडमिन पैनल बनाने के लिए आपको जो कुछ चाहिए",
  featuresOverviewDesc: "शक्तिशाली सुविधाओं का अन्वेषण करें जो हमारे एडमिन पैनल टेम्प्लेट को आपके अगले प्रोजेक्ट के लिए सही शुरुआती बिंदु बनाती हैं।",
  keyFeatures: "मुख्य विशेषताएँ",
  allFeaturesIncluded: "सभी सुविधाएँ शामिल",
  viewPricing: "मूल्य निर्धारण देखें",
  adminDashboard: "एडमिन डैशबोर्ड",
  adminDashboardDesc: "कस्टमाइज़ करने योग्य विजेट, चार्ट्स और डेटा विज़ुअलाइज़ेशन के साथ अपने एप्लिकेशन का त्वरित अवलोकन प्राप्त करें। प्रमुख मेट्रिक्स की निगरानी करें और डेटा-संचालित निर्णय लें।",
  contentManagement: "कंटेंट प्रबंधन",
  contentManagementDesc: "हमारे सहज संपादक के साथ अपने ब्लॉग पोस्ट, लेख या किसी भी सामग्री को आसानी से प्रबंधित करें। मार्कडाउन, बहुभाषी सामग्री और मीडिया प्रबंधन के लिए समर्थन।",
  userManagement: "उपयोगकर्ता प्रबंधन",
  userManagementDesc: "आसानी से उपयोगकर्ताओं, भूमिकाओं और अनुमतियों का प्रबंधन करें। उपयोगकर्ता पदानुक्रम बनाएं, अनुमतियां असाइन करें और सुरक्षित एक्सेस नियंत्रण बनाए रखें।",
  builtWithLatestTech: "नवीनतम तकनीकों के साथ निर्मित",
  techStackDesc: "हमारा एडमिन पैनल आधुनिक, विश्वसनीय तकनीकों के साथ बनाया गया है ताकि सर्वोत्तम डेवलपर अनुभव और अंतिम-उपयोगकर्ता प्रदर्शन सुनिश्चित किया जा सके।",
  startBuilding: "आज ही हमारे कंपोनेंट्स के साथ बनाना शुरू करें",
  startBuildingDesc: "हमारे UI कंपोनेंट्स की पूरी लाइब्रेरी तक पहुंच प्राप्त करें और तुरंत सुंदर एडमिन पैनल बनाना शुरू करें।",

  // Features Components
  uiComponentLibrary: "UI कंपोनेंट लाइब्रेरी",
  componentLibraryDesc: "हमारी व्यापक UI कंपोनेंट लाइब्रेरी का अन्वेषण करें जो आपको सुंदर, कार्यात्मक और सुलभ एडमिन पैनल बनाने में मदद करने के लिए डिज़ाइन की गई है।",
  searchComponents: "कंपोनेंट्स खोजें...",
  layoutComponents: "लेआउट कंपोनेंट्स",
  layoutComponentsDesc: "आपके एडमिन पैनल लेआउट को स्ट्रक्चर करने के लिए कंपोनेंट्स।",
  navigationComponents: "नेविगेशन कंपोनेंट्स",
  navigationComponentsDesc: "उपयोगकर्ता नेविगेशन और मेनू के लिए कंपोनेंट्स।",
  dataDisplayComponents: "डेटा डिस्प्ले कंपोनेंट्स",
  dataDisplayComponentsDesc: "विभिन्न प्रकार के डेटा प्रदर्शित करने के लिए कंपोनेंट्स।",
  inputComponents: "इनपुट कंपोनेंट्स",
  inputComponentsDesc: "उपयोगकर्ता इंटरैक्शन के लिए फॉर्म कंट्रोल और इनपुट एलिमेंट्स।",
  themingComponents: "थीमिंग कंपोनेंट्स",
  themingComponentsDesc: "थीम कस्टमाइजेशन और स्टाइलिंग के लिए कंपोनेंट्स।",
  utilityComponents: "यूटिलिटी कंपोनेंट्स",
  utilityComponentsDesc: "अतिरिक्त कार्यक्षमता के लिए यूटिलिटी कंपोनेंट्स।",
  consistentDesign: "निरंतर डिज़ाइन भाषा",
  consistentDesignDesc: "सभी कंपोनेंट्स एक ही डिज़ाइन सिद्धांतों और एस्थेटिक्स का पालन करते हैं, जिससे एक सुसंगत उपयोगकर्ता अनुभव सुनिश्चित होता है।",
  accessibilityFirst: "एक्सेसिबिलिटी पहले",
  accessibilityFirstDesc: "कंपोनेंट्स WCAG दिशानिर्देशों का पालन करते हुए एक्सेसिबिलिटी को ध्यान में रखकर बनाए गए हैं, ताकि आपका एप्लिकेशन सभी उपयोगकर्ताओं के लिए सुलभ हो।",
  customizableStyles: "कस्टमाइज़ करने योग्य स्टाइल्स",
  customizableStylesDesc: "Tailwind CSS के साथ कंपोनेंट्स के लुक एंड फील को आसानी से अपने ब्रांड आइडेंटिटी से मेल खाने के लिए कस्टमाइज़ करें।",
  responsiveByDefault: "डिफ़ॉल्ट रूप से रेस्पोंसिव",
  responsiveByDefaultDesc: "सभी कंपोनेंट्स मोबाइल से लेकर डेस्कटॉप तक सभी आकारों के डिवाइसों पर सहजता से काम करने के लिए डिज़ाइन किए गए हैं।",
  typeScriptSupport: "टाइपस्क्रिप्ट समर्थन",
  typeScriptSupportDesc: "सभी कंपोनेंट्स के लिए टाइप परिभाषाओं के साथ पूर्ण टाइपस्क्रिप्ट समर्थन, बेहतर डेवलपर अनुभव और कोड गुणवत्ता प्रदान करता है।",
  darkModeSupport: "डार्क मोड समर्थन",
  darkModeSupportDesc: "डार्क मोड के लिए अंतर्निहित समर्थन, जो उपयोगकर्ताओं को बेहतर दृश्यता और कम आंखों के तनाव के लिए अपना पसंदीदा थीम चुनने की अनुमति देता है।",
  integratedWithNextjs: "Next.js के साथ एकीकृत",
  nextjsIntegrationDesc: "हमारे कंपोनेंट्स विशेष रूप से Next.js के लिए बनाए गए हैं, जो सर्वर कंपोनेंट्स, ऐप राउटर और अधिक जैसी इसकी शक्तिशाली विशेषताओं का लाभ उठाते हैं।",
  serverComponents: "सर्वर कंपोनेंट्स समर्थन",
  appRouter: "ऐप राउटर संगत",
  optimizedForNextjs: "Next.js प्रदर्शन के लिए अनुकूलित",
  rtlSupport: "अरबी, हिब्रू और अन्य RTL भाषाओं के लिए RTL समर्थन",
  translationManagement: "आसान अनुवाद प्रबंधन",
  dynamicLanguageSwitching: "गतिशील भाषा स्विचिंग",
  learnMoreI18n: "I18n के बारे में अधिक जानें",

  // Features Integrations
  powerfulIntegrations: "शक्तिशाली एकीकरण",
  integrationsDesc: "हमारे पूर्व-निर्मित एकीकरण के साथ अपने एडमिन पैनल को अपने पसंदीदा टूल्स और सेवाओं से जोड़ें।",
  viewAllIntegrations: "सभी एकीकरण देखें",
  integrationsOverview: "एकीकरण अवलोकन",
  databaseIntegrations: "डेटाबेस एकीकरण",
  databaseIntegrationsDesc: "अपने एडमिन पैनल को विभिन्न डेटाबेस सिस्टम से जोड़ें।",
  authIntegrations: "प्रमाणीकरण एकीकरण",
  authIntegrationsDesc: "अपने एडमिन पैनल के लिए सुरक्षित उपयोगकर्ता प्रमाणीकरण।",
  cloudIntegrations: "क्लाउड सेवा एकीकरण",
  cloudIntegrationsDesc: "स्टोरेज और अधिक के लिए क्लाउड सेवाओं के साथ एकीकृत करें।",
  viewAllIntegrationsInCategory: "सभी देखें",
  featuredIntegrations: "विशेष एकीकरण",
  prismaORM: "Prisma ORM",
  prismaORMDesc: "Prisma ORM का उपयोग करके अपने डेटाबेस के साथ आसानी से इंटरैक्ट करें। टाइप-सुरक्षित डेटाबेस एक्सेस, माइग्रेशन और अधिक।",
  nextAuthJs: "NextAuth.js",
  nextAuthJsDesc: "NextAuth.js के साथ मिनटों में प्रमाणीकरण लागू करें। OAuth प्रदाताओं, ईमेल/पासवर्ड और अधिक के लिए समर्थन।",
  vercelDeployment: "Vercel डिप्लॉयमेंट",
  vercelDeploymentDesc: "कुछ ही क्लिक में अपने एडमिन पैनल को Vercel पर डिप्लॉय करें। स्वचालित डिप्लॉयमेंट, प्रीव्यू एनवायरनमेंट और अधिक।",
  integrationBenefits: "हमारे एकीकरण के लाभ",
  easyImplementation: "आसान कार्यान्वयन",
  easyImplementationDesc: "हमारे पूर्व-निर्मित कनेक्टर्स और विस्तृत दस्तावेज़ीकरण के साथ मिनटों में अपनी पसंदीदा सेवाओं के साथ एकीकृत करें।",
  performanceOptimized: "प्रदर्शन के लिए अनुकूलित",
  performanceOptimizedDesc: "हमारे एकीकरण प्रदर्शन को ध्यान में रखकर बनाए गए हैं, जिससे न्यूनतम ओवरहेड और अधिकतम दक्षता सुनिश्चित होती है।",
  constantlyUpdated: "लगातार अपडेट",
  constantlyUpdatedDesc: "हम अपने एकीकरण को लगातार अपडेट करते हैं ताकि तृतीय-पक्ष सेवाओं के नवीनतम संस्करणों के साथ संगतता सुनिश्चित हो सके।",
  needCustomIntegration: "कस्टम एकीकरण की आवश्यकता है?",
  customIntegrationDesc: "आपको जिस एकीकरण की आवश्यकता है, वह दिखाई नहीं दे रहा है? हमारा दस्तावेज़ीकरण आपको किसी भी सेवा या API के साथ कस्टम एकीकरण बनाने का तरीका दिखाता है।",
  readDocumentation: "दस्तावेज़ पढ़ें",
  readyToConnect: "अपनी सेवाओं को कनेक्ट करने के लिए तैयार हैं?",
  readyToConnectDesc: "हमारे एडमिन पैनल टेम्प्लेट के साथ शुरू करें और आज ही अपनी पसंदीदा सेवाओं के साथ एकीकृत करें।",
};

// German translations
const de: BaseTranslations = {
  // Navigation
  home: "Startseite",
  about: "Über uns",
  services: "Dienstleistungen",
  blog: "Blog",
  contact: "Kontakt",
  
  // Common actions
  login: "Anmelden",
  register: "Registrieren",
  applyNow: "Jetzt bewerben",
  learnMore: "Mehr erfahren",
  viewAll: "Alle anzeigen",
  
  // Hero section
  heroTitle: "Willkommen auf unserer Plattform",
  heroDescription: "Ihre Reise beginnt hier mit unseren umfassenden Lösungen.",
  exploreMore: "Mehr entdecken",
  
  // Blog specific
  blogTitle: "Blog",
  blogDescription: "Neueste Artikel und Updates",
  featuredPost: "Empfohlener Beitrag",
  allPosts: "Alle Beiträge",
  readMore: "Weiterlesen",
  minRead: "Min. Lesezeit",
  backToBlog: "Zurück zum Blog",
  tableOfContents: "Inhaltsverzeichnis",
  
  // Footer
  footerTagline: "Bereitstellung von Qualitätsdienstleistungen",
  allRightsReserved: "Alle Rechte vorbehalten.",
  quickLinks: "Schnelllinks",

  // Documentation page
  docGettingStarted: "Erste Schritte",
  docGettingStartedDesc: "Schnelle Installations- und Einrichtungsanleitungen, um Ihr Projekt zum Laufen zu bringen.",
  docQuickStart: "Schnellstart",
  docInstallation: "Installation",
  docConfig: "Konfiguration",
  docComponents: "Komponenten",
  docComponentsDesc: "Vorgefertigte UI-Komponenten, die in Ihrem Admin-Panel verwendet werden können.",
  docUI: "UI-Komponenten",
  docForms: "Formulare & Validierung",
  docLayouts: "Layout-Beispiele",
  docDataManagement: "Datenverwaltung",
  docDataManagementDesc: "Lernen Sie, wie Sie Daten mit Datenbankintegration und API-Routen verwalten können.",
  docDatabaseSetup: "Datenbankeinrichtung",
  docAPIRoutes: "API-Routen",
  docAuth: "Authentifizierung",
  docAdvancedTopics: "Fortgeschrittene Themen",
  docAdvancedTopicsDesc: "Tauchen Sie tiefer in die Anpassung und fortgeschrittene Funktionen ein.",
  docCustomization: "Anpassung",
  docDeployment: "Bereitstellung",
  docPerformance: "Leistung",
  documentation: "Dokumentation",
  documentationDesc: "Umfassende Anleitungen und Ressourcen, die Ihnen beim Aufbau und der Anpassung Ihres Admin-Panels helfen.",
  searchDocs: "Dokumentation durchsuchen...",
  quickStart: "Schnellstart",
  apiReference: "API-Referenz",
  github: "GitHub",
  buildFaster: "Schneller bauen mit vorgefertigten Komponenten",
  componentShowcaseDesc: "Unsere Komponentenbibliothek enthält alles, was Sie zum Erstellen professioneller Admin-Panels benötigen, ohne das Rad neu zu erfinden.",
  additionalResources: "Zusätzliche Ressourcen",
  contribute: "Mitwirken",
  contributeDesc: "Treten Sie unserer Open-Source-Community bei und helfen Sie, das Projekt zu verbessern.",
  visitGithub: "GitHub besuchen",
  support: "Support",
  supportDesc: "Erhalten Sie Hilfe von unserem Team oder Community-Support-Kanälen.",
  contactUs: "Kontaktieren Sie uns",
  readyToStart: "Bereit zum Loslegen?",
  readyToStartDesc: "Starten Sie mit unserer Admin-Panel-Vorlage und bauen Sie Ihr nächstes Projekt schneller.",
  getStarted: "Loslegen",
  exploreFeatures: "Funktionen erkunden",

  // Pricing page
  transparentPricing: "Einfache, transparente Preisgestaltung",
  pricingDesc: "Wählen Sie den perfekten Plan für Ihr Projekt. Alle Pläne beinhalten Zugriff auf unsere Kern-Admin-Panel-Funktionen.",
  oneTimePayment: "Einmalige Zahlung",
  noSubscription: "Kein Abonnement",
  freePlan: "Kostenlos",
  freePlanPrice: "Kostenlos",
  freePlanDesc: "Perfekt für persönliche Projekte oder zum Lernen.",
  proPlan: "Pro",
  proPlanPrice: "99 €",
  proPlanPeriod: "einmalige Zahlung",
  proPlanDesc: "Alles, was Sie für professionelle Projekte benötigen.",
  enterprisePlan: "Enterprise",
  enterprisePlanPrice: "Individuell",
  enterprisePlanDesc: "Erweiterte Funktionen und dedizierter Support für große Teams.",
  mostPopular: "Am beliebtesten",
  whatsIncluded: "Was enthalten ist:",
  uiComponents: "UI-Komponenten",
  responsiveDesign: "Responsives Design",
  singleUser: "Einzelner Benutzer",
  basicTemplates: "Basis-Vorlagen",
  githubAccess: "GitHub-Zugang",
  communitySupport: "Community-Support",
  blogFunctionality: "Blog-Funktionalität",
  multiLanguageSupport: "Mehrsprachenunterstützung",
  prioritySupport: "Prioritäts-Support",
  advancedAnalytics: "Erweiterte Analysen",
  needCustomSolution: "Benötigen Sie eine individuelle Lösung?",
  customSolutionDesc: "Unser Enterprise-Plan umfasst individuelle Entwicklung, Prioritäts-Support und zusätzliche Funktionen, die auf Ihre spezifischen Bedürfnisse zugeschnitten sind.",
  contactSales: "Vertrieb kontaktieren",
  frequentlyAskedQuestions: "Häufig gestellte Fragen",
  pricingFaq1Q: "Was ist im kostenlosen Plan enthalten?",
  pricingFaq1A: "Der kostenlose Plan umfasst Zugriff auf alle grundlegenden UI-Komponenten, responsives Design und GitHub-Repository-Zugang. Er ist perfekt für persönliche Projekte, zum Lernen oder zur Bewertung des Admin-Panels vor dem Kauf.",
  pricingFaq2Q: "Ist die Pro-Lizenz ein Abonnement oder eine einmalige Zahlung?",
  pricingFaq2A: "Die Pro-Lizenz ist eine einmalige Zahlung, die Ihnen lebenslangen Zugriff auf alle aktuellen Funktionen gibt, die zum Zeitpunkt des Kaufs im Pro-Plan enthalten sind. Für zukünftige größere Versionsupdates kann eine Upgrade-Gebühr erforderlich sein.",
  pricingFaq3Q: "Kann ich dies für Kundenprojekte verwenden?",
  pricingFaq3A: "Ja! Die Pro-Lizenz ermöglicht es Ihnen, das Admin-Panel für unbegrenzte Kundenprojekte zu verwenden. Jedes Projekt kann seine eigene Installation und Anpassung haben.",
  pricingFaq4Q: "Bieten Sie Rückerstattungen an?",
  pricingFaq4A: "Wir bieten eine 14-tägige Geld-zurück-Garantie für die Pro-Lizenz. Wenn Sie mit dem Produkt nicht zufrieden sind, kontaktieren Sie uns innerhalb von 14 Tagen nach dem Kauf für eine vollständige Rückerstattung.",
  pricingFaq5Q: "Welche Art von Support ist enthalten?",
  pricingFaq5A: "Kostenlose Benutzer erhalten Community-Support über GitHub Issues. Pro-Benutzer erhalten E-Mail-Support mit einer Reaktionszeit von 48 Stunden. Enterprise-Kunden erhalten Prioritäts-Support mit dedizierten Kanälen und schnelleren Reaktionszeiten.",
  stillHaveQuestions: "Haben Sie noch Fragen?",
  contactSupport: "Support kontaktieren",
  readyToGetStarted: "Bereit loszulegen?",
  startBuildingToday: "Schließen Sie sich Tausenden von Entwicklern an, die mit unserer Lösung bessere Admin-Panels erstellen.",
  getStartedFree: "Kostenlos starten",
  unlimitedUsers: "Unbegrenzte Benutzer",
  allTemplates: "Alle Vorlagen",
  emailSupport: "E-Mail-Support",
  premiumSupport: "Premium-Support",
  buyNow: "Jetzt kaufen",

  // Features Overview
  everythingYouNeed: "Alles, was Sie zum Erstellen erstaunlicher Admin-Panels benötigen",
  featuresOverviewDesc: "Entdecken Sie die leistungsstarken Funktionen, die unsere Admin-Panel-Vorlage zum perfekten Ausgangspunkt für Ihr nächstes Projekt machen.",
  keyFeatures: "Hauptfunktionen",
  allFeaturesIncluded: "Alle Funktionen inbegriffen",
  viewPricing: "Preise anzeigen",
  adminDashboard: "Admin-Dashboard",
  adminDashboardDesc: "Erhalten Sie einen schnellen Überblick über Ihre Anwendung mit anpassbaren Widgets, Diagrammen und Datenvisualisierungen. Überwachen Sie wichtige Kennzahlen und treffen Sie datengestützte Entscheidungen.",
  contentManagement: "Inhaltsverwaltung",
  contentManagementDesc: "Verwalten Sie Ihre Blogbeiträge, Artikel oder beliebige Inhalte einfach mit unserem intuitiven Editor. Unterstützung für Markdown, mehrsprachige Inhalte und Medienverwaltung.",
  userManagement: "Benutzerverwaltung",
  userManagementDesc: "Verwalten Sie Benutzer, Rollen und Berechtigungen mit Leichtigkeit. Erstellen Sie Benutzerhierarchien, weisen Sie Berechtigungen zu und pflegen Sie eine sichere Zugriffskontrolle.",
  builtWithLatestTech: "Mit den neuesten Technologien gebaut",
  techStackDesc: "Unser Admin-Panel ist mit modernen, zuverlässigen Technologien gebaut, um die beste Entwicklererfahrung und Endbenutzerleistung zu gewährleisten.",
  startBuilding: "Beginnen Sie noch heute mit unseren Komponenten zu bauen",
  startBuildingDesc: "Erhalten Sie Zugriff auf unsere komplette Bibliothek von UI-Komponenten und beginnen Sie sofort mit dem Aufbau schöner Admin-Panels.",

  // Features Components
  uiComponentLibrary: "UI-Komponentenbibliothek",
  componentLibraryDesc: "Entdecken Sie unsere umfassende Bibliothek von UI-Komponenten, die entwickelt wurden, um Ihnen beim Aufbau schöner, funktionaler und zugänglicher Admin-Panels zu helfen.",
  searchComponents: "Komponenten suchen...",
  layoutComponents: "Layout-Komponenten",
  layoutComponentsDesc: "Komponenten zur Strukturierung Ihres Admin-Panel-Layouts.",
  navigationComponents: "Navigationskomponenten",
  navigationComponentsDesc: "Komponenten für Benutzernavigation und Menüs.",
  dataDisplayComponents: "Datenanzeigekomponenten",
  dataDisplayComponentsDesc: "Komponenten zur Anzeige verschiedener Datentypen.",
  inputComponents: "Eingabekomponenten",
  inputComponentsDesc: "Formularsteuerelemente und Eingabeelemente für Benutzerinteraktionen.",
  themingComponents: "Theming-Komponenten",
  themingComponentsDesc: "Komponenten für Theme-Anpassung und Styling.",
  utilityComponents: "Utility-Komponenten",
  utilityComponentsDesc: "Utility-Komponenten für zusätzliche Funktionalität.",
  consistentDesign: "Konsistente Designsprache",
  consistentDesignDesc: "Alle Komponenten folgen denselben Designprinzipien und Ästhetik und gewährleisten so eine konsistente Benutzererfahrung.",
  accessibilityFirst: "Barrierefreiheit zuerst",
  accessibilityFirstDesc: "Komponenten wurden mit Barrierefreiheit im Sinn entwickelt und folgen den WCAG-Richtlinien, um sicherzustellen, dass Ihre Anwendung für alle Benutzer zugänglich ist.",
  customizableStyles: "Anpassbare Stile",
  customizableStylesDesc: "Passen Sie das Aussehen und Gefühl der Komponenten einfach an Ihre Markenidentität mit Tailwind CSS an.",
  responsiveByDefault: "Standardmäßig responsiv",
  responsiveByDefaultDesc: "Alle Komponenten sind so konzipiert, dass sie nahtlos auf Geräten aller Größen funktionieren, vom Mobiltelefon bis zum Desktop.",
  typeScriptSupport: "TypeScript-Unterstützung",
  typeScriptSupportDesc: "Vollständige TypeScript-Unterstützung mit Typdefinitionen für alle Komponenten, die eine bessere Entwicklererfahrung und Codequalität bieten.",
  darkModeSupport: "Dark Mode-Unterstützung",
  darkModeSupportDesc: "Integrierte Unterstützung für den Dark Mode, sodass Benutzer ihr bevorzugtes Theme für bessere Sichtbarkeit und weniger Augenbelastung wählen können.",
  integratedWithNextjs: "Integriert mit Next.js",
  nextjsIntegrationDesc: "Unsere Komponenten sind speziell für Next.js entwickelt und nutzen seine leistungsstarken Funktionen wie Server-Komponenten, App Router und mehr.",
  serverComponents: "Server-Komponenten-Unterstützung",
  appRouter: "App Router-kompatibel",
  optimizedForNextjs: "Optimiert für Next.js-Leistung",
  rtlSupport: "RTL-Unterstützung für Arabisch, Hebräisch und andere RTL-Sprachen",
  translationManagement: "Einfache Übersetzungsverwaltung",
  dynamicLanguageSwitching: "Dynamisches Sprachwechseln",
  learnMoreI18n: "Mehr über I18n erfahren",

  // Features Integrations
  powerfulIntegrations: "Leistungsstarke Integrationen",
  integrationsDesc: "Verbinden Sie Ihr Admin-Panel mit Ihren Lieblingstools und -diensten mit unseren vorgefertigten Integrationen.",
  viewAllIntegrations: "Alle Integrationen anzeigen",
  integrationsOverview: "Integrationsübersicht",
  databaseIntegrations: "Datenbankintegrationen",
  databaseIntegrationsDesc: "Verbinden Sie Ihr Admin-Panel mit verschiedenen Datenbanksystemen.",
  authIntegrations: "Authentifizierungsintegrationen",
  authIntegrationsDesc: "Sichere Benutzerauthentifizierung für Ihr Admin-Panel.",
  cloudIntegrations: "Cloud-Service-Integrationen",
  cloudIntegrationsDesc: "Integration mit Cloud-Diensten für Speicher und mehr.",
  viewAllIntegrationsInCategory: "Alle anzeigen",
  featuredIntegrations: "Hervorgehobene Integrationen",
  prismaORM: "Prisma ORM",
  prismaORMDesc: "Interagieren Sie einfach mit Ihrer Datenbank mit Prisma ORM. Typsicherer Datenbankzugriff, Migrationen und mehr.",
  nextAuthJs: "NextAuth.js",
  nextAuthJsDesc: "Implementieren Sie Authentifizierung in Minuten mit NextAuth.js. Unterstützung für OAuth-Anbieter, E-Mail/Passwort und mehr.",
  vercelDeployment: "Vercel-Bereitstellung",
  vercelDeploymentDesc: "Stellen Sie Ihr Admin-Panel mit nur wenigen Klicks auf Vercel bereit. Automatische Bereitstellungen, Vorschauumgebungen und mehr.",
  integrationBenefits: "Vorteile unserer Integrationen",
  easyImplementation: "Einfache Implementierung",
  easyImplementationDesc: "Integrieren Sie sich in Minuten mit Ihren Lieblingsdiensten mit unseren vorgefertigten Konnektoren und detaillierter Dokumentation.",
  performanceOptimized: "Leistungsoptimiert",
  performanceOptimizedDesc: "Unsere Integrationen wurden mit Blick auf die Leistung entwickelt und gewährleisten minimalen Overhead und maximale Effizienz.",
  constantlyUpdated: "Ständig aktualisiert",
  constantlyUpdatedDesc: "Wir aktualisieren unsere Integrationen kontinuierlich, um die Kompatibilität mit den neuesten Versionen von Drittanbieterdiensten sicherzustellen.",
  needCustomIntegration: "Benötigen Sie eine benutzerdefinierte Integration?",
  customIntegrationDesc: "Sehen Sie nicht die Integration, die Sie benötigen? Unsere Dokumentation zeigt Ihnen, wie Sie benutzerdefinierte Integrationen mit jedem Dienst oder jeder API erstellen können.",
  readDocumentation: "Dokumentation lesen",
  readyToConnect: "Bereit, Ihre Dienste zu verbinden?",
  readyToConnectDesc: "Starten Sie mit unserer Admin-Panel-Vorlage und integrieren Sie noch heute mit Ihren Lieblingsdiensten.",
};

// French translations
const fr: BaseTranslations = {
  // Navigation
  home: "Accueil",
  about: "À propos",
  services: "Services",
  blog: "Blog",
  contact: "Contact",
  
  // Common actions
  login: "Connexion",
  register: "S'inscrire",
  applyNow: "Postuler maintenant",
  learnMore: "En savoir plus",
  viewAll: "Voir tout",
  
  // Hero section
  heroTitle: "Bienvenue sur notre plateforme",
  heroDescription: "Votre voyage commence ici avec nos solutions complètes.",
  exploreMore: "Explorer davantage",
  
  // Blog specific
  blogTitle: "Blog",
  blogDescription: "Derniers articles et mises à jour",
  featuredPost: "Article à la une",
  allPosts: "Tous les articles",
  readMore: "Lire la suite",
  minRead: "min de lecture",
  backToBlog: "Retour au blog",
  tableOfContents: "Table des matières",
  
  // Footer
  footerTagline: "Fournir des services de qualité",
  allRightsReserved: "Tous droits réservés.",
  quickLinks: "Liens rapides",

  // Documentation page
  docGettingStarted: "Premiers pas",
  docGettingStartedDesc: "Guides d'installation et de configuration rapides pour démarrer votre projet.",
  docQuickStart: "Démarrage rapide",
  docInstallation: "Installation",
  docConfig: "Configuration",
  docComponents: "Composants",
  docComponentsDesc: "Composants UI prêts à l'emploi pour votre panneau d'administration.",
  docUI: "Composants UI",
  docForms: "Formulaires et validation",
  docLayouts: "Exemples de mise en page",
  docDataManagement: "Gestion des données",
  docDataManagementDesc: "Apprenez à gérer les données avec l'intégration de base de données et les routes API.",
  docDatabaseSetup: "Configuration de base de données",
  docAPIRoutes: "Routes API",
  docAuth: "Authentification",
  docAdvancedTopics: "Sujets avancés",
  docAdvancedTopicsDesc: "Plongez plus profondément dans la personnalisation et les fonctionnalités avancées.",
  docCustomization: "Personnalisation",
  docDeployment: "Déploiement",
  docPerformance: "Performance",
  documentation: "Documentation",
  documentationDesc: "Guides et ressources complets pour vous aider à construire et personnaliser votre panneau d'administration.",
  searchDocs: "Rechercher dans la documentation...",
  quickStart: "Démarrage rapide",
  apiReference: "Référence API",
  github: "GitHub",
  buildFaster: "Construire plus rapidement avec des composants préfabriqués",
  componentShowcaseDesc: "Notre bibliothèque de composants comprend tout ce dont vous avez besoin pour construire des panneaux d'administration professionnels sans réinventer la roue.",
  additionalResources: "Ressources supplémentaires",
  contribute: "Contribuer",
  contributeDesc: "Rejoignez notre communauté open source et aidez à améliorer le projet.",
  visitGithub: "Visiter GitHub",
  support: "Support",
  supportDesc: "Obtenez de l'aide de notre équipe ou des canaux de support communautaire.",
  contactUs: "Contactez-nous",
  readyToStart: "Prêt à commencer à construire ?",
  readyToStartDesc: "Commencez avec notre modèle de panneau d'administration et construisez votre prochain projet plus rapidement.",
  getStarted: "Commencer",
  exploreFeatures: "Explorer les fonctionnalités",

  // Pricing page
  transparentPricing: "Tarification simple et transparente",
  pricingDesc: "Choisissez le plan parfait pour votre projet. Tous les plans comprennent l'accès à nos fonctionnalités de base du panneau d'administration.",
  oneTimePayment: "Paiement unique",
  noSubscription: "Pas d'abonnement",
  freePlan: "Gratuit",
  freePlanPrice: "Gratuit",
  freePlanDesc: "Parfait pour les projets personnels ou l'apprentissage.",
  proPlan: "Pro",
  proPlanPrice: "99 €",
  proPlanPeriod: "paiement unique",
  proPlanDesc: "Tout ce dont vous avez besoin pour des projets professionnels.",
  enterprisePlan: "Entreprise",
  enterprisePlanPrice: "Sur mesure",
  enterprisePlanDesc: "Fonctionnalités avancées et support dédié pour les grandes équipes.",
  mostPopular: "Le plus populaire",
  whatsIncluded: "Ce qui est inclus :",
  uiComponents: "Composants UI",
  responsiveDesign: "Design responsive",
  singleUser: "Utilisateur unique",
  basicTemplates: "Modèles de base",
  githubAccess: "Accès GitHub",
  communitySupport: "Support communautaire",
  blogFunctionality: "Fonctionnalité de blog",
  multiLanguageSupport: "Support multilingue",
  prioritySupport: "Support prioritaire",
  advancedAnalytics: "Analyses avancées",
  needCustomSolution: "Besoin d'une solution personnalisée ?",
  customSolutionDesc: "Notre plan Entreprise comprend un développement personnalisé, un support prioritaire et des fonctionnalités supplémentaires adaptées à vos besoins spécifiques.",
  contactSales: "Contacter les ventes",
  frequentlyAskedQuestions: "Questions fréquemment posées",
  pricingFaq1Q: "Qu'est-ce qui est inclus dans le plan gratuit ?",
  pricingFaq1A: "Le plan gratuit comprend l'accès à tous les composants UI de base, le design responsive et l'accès au dépôt GitHub. C'est parfait pour les projets personnels, l'apprentissage ou l'évaluation du panneau d'administration avant l'achat.",
  pricingFaq2Q: "La licence Pro est-elle un abonnement ou un paiement unique ?",
  pricingFaq2A: "La licence Pro est un paiement unique qui vous donne un accès à vie à toutes les fonctionnalités actuelles incluses dans le plan Pro au moment de l'achat. Les mises à jour majeures futures peuvent nécessiter des frais de mise à niveau.",
  pricingFaq3Q: "Puis-je utiliser ceci pour des projets clients ?",
  pricingFaq3A: "Oui ! La licence Pro vous permet d'utiliser le panneau d'administration pour un nombre illimité de projets clients. Chaque projet peut avoir sa propre installation et personnalisation.",
  pricingFaq4Q: "Offrez-vous des remboursements ?",
  pricingFaq4A: "Nous offrons une garantie de remboursement de 14 jours pour la licence Pro. Si vous n'êtes pas satisfait du produit, contactez-nous dans les 14 jours suivant l'achat pour un remboursement complet.",
  pricingFaq5Q: "Quel type de support est inclus ?",
  pricingFaq5A: "Les utilisateurs gratuits bénéficient d'un support communautaire via les problèmes GitHub. Les utilisateurs Pro reçoivent un support par e-mail avec un temps de réponse de 48 heures. Les clients Entreprise bénéficient d'un support prioritaire avec des canaux dédiés et des temps de réponse plus rapides.",
  stillHaveQuestions: "Vous avez encore des questions ?",
  contactSupport: "Contacter le support",
  readyToGetStarted: "Prêt à commencer ?",
  startBuildingToday: "Rejoignez des milliers de développeurs qui construisent de meilleurs panneaux d'administration avec notre solution.",
  getStartedFree: "Commencer gratuitement",
  unlimitedUsers: "Utilisateurs illimités",
  allTemplates: "Tous les modèles",
  emailSupport: "Support par e-mail",
  premiumSupport: "Support premium",
  buyNow: "Acheter maintenant",

  // Features Overview
  everythingYouNeed: "Tout ce dont vous avez besoin pour construire des panneaux d'administration étonnants",
  featuresOverviewDesc: "Explorez les fonctionnalités puissantes qui font de notre modèle de panneau d'administration le point de départ parfait pour votre prochain projet.",
  keyFeatures: "Fonctionnalités clés",
  allFeaturesIncluded: "Toutes les fonctionnalités incluses",
  viewPricing: "Voir les tarifs",
  adminDashboard: "Tableau de bord d'administration",
  adminDashboardDesc: "Obtenez une vue d'ensemble rapide de votre application avec des widgets personnalisables, des graphiques et des visualisations de données. Surveillez les métriques clés et prenez des décisions basées sur les données.",
  contentManagement: "Gestion de contenu",
  contentManagementDesc: "Gérez facilement vos articles de blog, articles ou tout contenu avec notre éditeur intuitif. Support pour markdown, contenu multilingue et gestion des médias.",
  userManagement: "Gestion des utilisateurs",
  userManagementDesc: "Gérez facilement les utilisateurs, les rôles et les permissions. Créez des hiérarchies d'utilisateurs, attribuez des permissions et maintenez un contrôle d'accès sécurisé.",
  builtWithLatestTech: "Construit avec les dernières technologies",
  techStackDesc: "Notre panneau d'administration est construit avec des technologies modernes et fiables pour assurer la meilleure expérience développeur et performance utilisateur final.",
  startBuilding: "Commencez à construire avec nos composants dès aujourd'hui",
  startBuildingDesc: "Accédez à notre bibliothèque complète de composants UI et commencez à construire de beaux panneaux d'administration immédiatement.",

  // Features Components
  uiComponentLibrary: "Bibliothèque de composants UI",
  componentLibraryDesc: "Explorez notre bibliothèque complète de composants UI conçus pour vous aider à construire des panneaux d'administration beaux, fonctionnels et accessibles.",
  searchComponents: "Rechercher des composants...",
  layoutComponents: "Composants de mise en page",
  layoutComponentsDesc: "Composants pour structurer la mise en page de votre panneau d'administration.",
  navigationComponents: "Composants de navigation",
  navigationComponentsDesc: "Composants pour la navigation utilisateur et les menus.",
  dataDisplayComponents: "Composants d'affichage de données",
  dataDisplayComponentsDesc: "Composants pour afficher divers types de données.",
  inputComponents: "Composants d'entrée",
  inputComponentsDesc: "Contrôles de formulaire et éléments d'entrée pour l'interaction utilisateur.",
  themingComponents: "Composants de thème",
  themingComponentsDesc: "Composants pour la personnalisation de thème et le style.",
  utilityComponents: "Composants utilitaires",
  utilityComponentsDesc: "Composants utilitaires pour des fonctionnalités supplémentaires.",
  consistentDesign: "Langage de conception cohérent",
  consistentDesignDesc: "Tous les composants suivent les mêmes principes de conception et esthétique, assurant une expérience utilisateur cohérente.",
  accessibilityFirst: "Accessibilité d'abord",
  accessibilityFirstDesc: "Les composants sont construits en tenant compte de l'accessibilité, suivant les directives WCAG pour s'assurer que votre application est accessible à tous les utilisateurs.",
  customizableStyles: "Styles personnalisables",
  customizableStylesDesc: "Personnalisez facilement l'apparence des composants pour correspondre à l'identité de votre marque avec Tailwind CSS.",
  responsiveByDefault: "Responsive par défaut",
  responsiveByDefaultDesc: "Tous les composants sont conçus pour fonctionner parfaitement sur des appareils de toutes tailles, du mobile au bureau.",
  typeScriptSupport: "Support TypeScript",
  typeScriptSupportDesc: "Support TypeScript complet avec des définitions de type pour tous les composants, offrant une meilleure expérience développeur et qualité de code.",
  darkModeSupport: "Support du mode sombre",
  darkModeSupportDesc: "Support intégré pour le mode sombre, permettant aux utilisateurs de choisir leur thème préféré pour une meilleure visibilité et moins de fatigue oculaire.",
  integratedWithNextjs: "Intégré avec Next.js",
  nextjsIntegrationDesc: "Nos composants sont spécifiquement construits pour Next.js, tirant parti de ses fonctionnalités puissantes comme les composants serveur, le routeur d'applications, et plus.",
  serverComponents: "Support des composants serveur",
  appRouter: "Compatible avec App Router",
  optimizedForNextjs: "Optimisé pour les performances Next.js",
  rtlSupport: "Support RTL pour l'arabe, l'hébreu et autres langues RTL",
  translationManagement: "Gestion facile des traductions",
  dynamicLanguageSwitching: "Changement dynamique de langue",
  learnMoreI18n: "En savoir plus sur I18n",

  // Features Integrations
  powerfulIntegrations: "Intégrations puissantes",
  integrationsDesc: "Connectez votre panneau d'administration à vos outils et services préférés avec nos intégrations préfabriquées.",
  viewAllIntegrations: "Voir toutes les intégrations",
  integrationsOverview: "Aperçu des intégrations",
  databaseIntegrations: "Intégrations de base de données",
  databaseIntegrationsDesc: "Connectez votre panneau d'administration à divers systèmes de base de données.",
  authIntegrations: "Intégrations d'authentification",
  authIntegrationsDesc: "Authentification utilisateur sécurisée pour votre panneau d'administration.",
  cloudIntegrations: "Intégrations de services cloud",
  cloudIntegrationsDesc: "Intégrez avec des services cloud pour le stockage et plus.",
  viewAllIntegrationsInCategory: "Voir tout",
  featuredIntegrations: "Intégrations en vedette",
  prismaORM: "Prisma ORM",
  prismaORMDesc: "Interagissez facilement avec votre base de données en utilisant Prisma ORM. Accès de base de données type-safe, migrations, et plus.",
  nextAuthJs: "NextAuth.js",
  nextAuthJsDesc: "Implémentez l'authentification en minutes avec NextAuth.js. Support pour les fournisseurs OAuth, email/mot de passe, et plus.",
  vercelDeployment: "Déploiement Vercel",
  vercelDeploymentDesc: "Déployez votre panneau d'administration sur Vercel en quelques clics. Déploiements automatiques, environnements de prévisualisation, et plus.",
  integrationBenefits: "Avantages de nos intégrations",
  easyImplementation: "Implémentation facile",
  easyImplementationDesc: "Intégrez avec vos services préférés en minutes avec nos connecteurs préfabriqués et documentation détaillée.",
  performanceOptimized: "Optimisé pour la performance",
  performanceOptimizedDesc: "Nos intégrations sont construites en gardant la performance à l'esprit, assurant un minimum de surcharge et une efficacité maximale.",
  constantlyUpdated: "Constamment mis à jour",
  constantlyUpdatedDesc: "Nous mettons constamment à jour nos intégrations pour assurer la compatibilité avec les dernières versions des services tiers.",
  needCustomIntegration: "Besoin d'une intégration personnalisée ?",
  customIntegrationDesc: "Vous ne voyez pas l'intégration dont vous avez besoin ? Notre documentation vous montre comment créer des intégrations personnalisées avec n'importe quel service ou API.",
  readDocumentation: "Lire la documentation",
  readyToConnect: "Prêt à connecter vos services ?",
  readyToConnectDesc: "Commencez avec notre modèle de panneau d'administration et intégrez avec vos services préférés dès aujourd'hui.",
};

// Spanish translations
const es: BaseTranslations = {
  // Navigation
  home: "Inicio",
  about: "Sobre Nosotros",
  services: "Servicios",
  blog: "Blog",
  contact: "Contacto",
  
  // Common actions
  login: "Iniciar Sesión",
  register: "Registrarse",
  applyNow: "Aplicar Ahora",
  learnMore: "Saber Más",
  viewAll: "Ver Todo",
  
  // Hero section
  heroTitle: "Bienvenido a Nuestra Plataforma",
  heroDescription: "Tu viaje comienza aquí con nuestras soluciones integrales.",
  exploreMore: "Explorar Más",
  
  // Blog specific
  blogTitle: "Blog",
  blogDescription: "Últimos artículos y actualizaciones",
  featuredPost: "Artículo Destacado",
  allPosts: "Todos los Artículos",
  readMore: "Leer Más",
  minRead: "min de lectura",
  backToBlog: "Volver al Blog",
  tableOfContents: "Tabla de Contenidos",
  
  // Footer
  footerTagline: "Proporcionando Servicios de Calidad",
  allRightsReserved: "Todos los derechos reservados.",
  quickLinks: "Enlaces Rápidos",

  // Documentation page
  docGettingStarted: "Primeros Pasos",
  docGettingStartedDesc: "Guías rápidas de instalación y configuración para poner en marcha tu proyecto.",
  docQuickStart: "Inicio Rápido",
  docInstallation: "Instalación",
  docConfig: "Configuración",
  docComponents: "Componentes",
  docComponentsDesc: "Componentes UI prediseñados listos para usar en tu panel de administración.",
  docUI: "Componentes UI",
  docForms: "Formularios y Validación",
  docLayouts: "Ejemplos de Layouts",
  docDataManagement: "Gestión de Datos",
  docDataManagementDesc: "Aprende a gestionar datos con integración de base de datos y rutas API.",
  docDatabaseSetup: "Configuración de Base de Datos",
  docAPIRoutes: "Rutas API",
  docAuth: "Autenticación",
  docAdvancedTopics: "Temas Avanzados",
  docAdvancedTopicsDesc: "Profundiza en la personalización y características avanzadas.",
  docCustomization: "Personalización",
  docDeployment: "Despliegue",
  docPerformance: "Rendimiento",
  documentation: "Documentación",
  documentationDesc: "Guías completas y recursos para ayudarte a construir y personalizar tu panel de administración.",
  searchDocs: "Buscar en la documentación...",
  quickStart: "Inicio Rápido",
  apiReference: "Referencia API",
  github: "GitHub",
  buildFaster: "Construye Más Rápido con Componentes Prediseñados",
  componentShowcaseDesc: "Nuestra biblioteca de componentes incluye todo lo que necesitas para construir paneles de administración profesionales sin reinventar la rueda.",
  additionalResources: "Recursos Adicionales",
  contribute: "Contribuir",
  contributeDesc: "Únete a nuestra comunidad de código abierto y ayuda a mejorar el proyecto.",
  visitGithub: "Visitar GitHub",
  support: "Soporte",
  supportDesc: "Obtén ayuda de nuestro equipo o canales de soporte comunitario.",
  contactUs: "Contáctanos",
  readyToStart: "¿Listo para Empezar a Construir?",
  readyToStartDesc: "Comienza con nuestra plantilla de panel de administración y construye tu próximo proyecto más rápido.",
  getStarted: "Comenzar",
  exploreFeatures: "Explorar Características",

  // Pricing page
  transparentPricing: "Precios Simples y Transparentes",
  pricingDesc: "Elige el plan perfecto para tu proyecto. Todos los planes incluyen acceso a nuestras características principales del panel de administración.",
  oneTimePayment: "Pago único",
  noSubscription: "Sin suscripción",
  freePlan: "Gratis",
  freePlanPrice: "Gratis",
  freePlanDesc: "Perfecto para proyectos personales o aprendizaje.",
  proPlan: "Pro",
  proPlanPrice: "$99",
  proPlanPeriod: "pago único",
  proPlanDesc: "Todo lo que necesitas para proyectos profesionales.",
  enterprisePlan: "Empresa",
  enterprisePlanPrice: "Personalizado",
  enterprisePlanDesc: "Características avanzadas y soporte dedicado para equipos grandes.",
  mostPopular: "Más Popular",
  whatsIncluded: "Lo que está incluido:",
  uiComponents: "Componentes UI",
  responsiveDesign: "Diseño Responsivo",
  singleUser: "Usuario Único",
  basicTemplates: "Plantillas Básicas",
  githubAccess: "Acceso a GitHub",
  communitySupport: "Soporte Comunitario",
  blogFunctionality: "Funcionalidad de Blog",
  multiLanguageSupport: "Soporte Multilenguaje",
  prioritySupport: "Soporte Prioritario",
  advancedAnalytics: "Analíticas Avanzadas",
  needCustomSolution: "¿Necesitas una solución personalizada?",
  customSolutionDesc: "Nuestro plan Empresa incluye desarrollo personalizado, soporte prioritario y características adicionales adaptadas a tus necesidades específicas.",
  contactSales: "Contactar Ventas",
  frequentlyAskedQuestions: "Preguntas Frecuentes",
  pricingFaq1Q: "¿Qué incluye el plan gratuito?",
  pricingFaq1A: "El plan gratuito incluye acceso a todos los componentes UI básicos, diseño responsivo y acceso al repositorio GitHub. Es perfecto para proyectos personales, aprendizaje o evaluar el panel de administración antes de comprar.",
  pricingFaq2Q: "¿La licencia Pro es una suscripción o un pago único?",
  pricingFaq2A: "La licencia Pro es un pago único que te da acceso de por vida a todas las características actuales incluidas en el plan Pro en el momento de la compra. Actualizaciones futuras de versiones principales pueden requerir una tarifa de actualización.",
  pricingFaq3Q: "¿Puedo usar esto para proyectos de clientes?",
  pricingFaq3A: "¡Sí! La licencia Pro te permite usar el panel de administración para proyectos de clientes ilimitados. Cada proyecto puede tener su propia instalación y personalización.",
  pricingFaq4Q: "¿Ofrecen reembolsos?",
  pricingFaq4A: "Ofrecemos una garantía de devolución de dinero de 14 días para la licencia Pro. Si no estás satisfecho con el producto, contáctanos dentro de los 14 días posteriores a la compra para un reembolso completo.",
  pricingFaq5Q: "¿Qué tipo de soporte está incluido?",
  pricingFaq5A: "Los usuarios gratuitos obtienen soporte comunitario a través de los problemas de GitHub. Los usuarios Pro reciben soporte por correo electrónico con un tiempo de respuesta de 48 horas. Los clientes Empresa obtienen soporte prioritario con canales dedicados y tiempos de respuesta más rápidos.",
  stillHaveQuestions: "¿Todavía tienes preguntas?",
  contactSupport: "Contactar Soporte",
  readyToGetStarted: "¿Listo para Empezar?",
  startBuildingToday: "Únete a miles de desarrolladores construyendo mejores paneles de administración con nuestra solución.",
  getStartedFree: "Comenzar Gratis",
  unlimitedUsers: "Usuarios Ilimitados",
  allTemplates: "Todas las Plantillas",
  emailSupport: "Soporte por Email",
  premiumSupport: "Soporte Premium",
  buyNow: "Comprar Ahora",

  // Features Overview
  everythingYouNeed: "Todo lo que Necesitas para Construir Increíbles Paneles de Administración",
  featuresOverviewDesc: "Explora las potentes características que hacen de nuestra plantilla de panel de administración el punto de partida perfecto para tu próximo proyecto.",
  keyFeatures: "Características Clave",
  allFeaturesIncluded: "Todas las Características Incluidas",
  viewPricing: "Ver Precios",
  adminDashboard: "Panel de Administración",
  adminDashboardDesc: "Obtén una visión rápida de tu aplicación con widgets personalizables, gráficos y visualizaciones de datos. Monitorea métricas clave y toma decisiones basadas en datos.",
  contentManagement: "Gestión de Contenido",
  contentManagementDesc: "Gestiona fácilmente tus entradas de blog, artículos o cualquier contenido con nuestro editor intuitivo. Soporte para markdown, contenido multilingüe y gestión de medios.",
  userManagement: "Gestión de Usuarios",
  userManagementDesc: "Gestiona usuarios, roles y permisos con facilidad. Crea jerarquías de usuarios, asigna permisos y mantén un control de acceso seguro.",
  builtWithLatestTech: "Construido con las Últimas Tecnologías",
  techStackDesc: "Nuestro panel de administración está construido con tecnologías modernas y confiables para garantizar la mejor experiencia de desarrollador y rendimiento de usuario final.",
  startBuilding: "Comienza a Construir con Nuestros Componentes Hoy",
  startBuildingDesc: "Obtén acceso a nuestra biblioteca completa de componentes UI y comienza a construir hermosos paneles de administración de inmediato.",
 
  // Features Components
  uiComponentLibrary: "Biblioteca de Componentes UI",
  componentLibraryDesc: "Explora nuestra completa biblioteca de componentes UI diseñados para ayudarte a construir paneles de administración hermosos, funcionales y accesibles.",
  searchComponents: "Buscar componentes...",
  layoutComponents: "Componentes de Layout",
  layoutComponentsDesc: "Componentes para estructurar el layout de tu panel de administración.",
  navigationComponents: "Componentes de Navegación",
  navigationComponentsDesc: "Componentes para navegación de usuario y menús.",
  dataDisplayComponents: "Componentes de Visualización de Datos",
  dataDisplayComponentsDesc: "Componentes para mostrar varios tipos de datos.",
  inputComponents: "Componentes de Entrada",
  inputComponentsDesc: "Controles de formulario y elementos de entrada para interacción del usuario.",
  themingComponents: "Componentes de Tematización",
  themingComponentsDesc: "Componentes para personalización de temas y estilizado.",
  utilityComponents: "Componentes de Utilidad",
  utilityComponentsDesc: "Componentes de utilidad para funcionalidad adicional.",
  consistentDesign: "Lenguaje de Diseño Consistente",
  consistentDesignDesc: "Todos los componentes siguen los mismos principios de diseño y estética, asegurando una experiencia de usuario consistente.",
  accessibilityFirst: "Accesibilidad Primero",
  accessibilityFirstDesc: "Los componentes están construidos teniendo en cuenta la accesibilidad, siguiendo las pautas WCAG para asegurar que tu aplicación sea accesible para todos los usuarios.",
  customizableStyles: "Estilos Personalizables",
  customizableStylesDesc: "Personaliza fácilmente el aspecto de los componentes para que coincidan con la identidad de tu marca con Tailwind CSS.",
  responsiveByDefault: "Responsivo por Defecto",
  responsiveByDefaultDesc: "Todos los componentes están diseñados para funcionar perfectamente en dispositivos de todos los tamaños, desde móviles hasta escritorio.",
  typeScriptSupport: "Soporte TypeScript",
  typeScriptSupportDesc: "Soporte completo para TypeScript con definiciones de tipo para todos los componentes, proporcionando mejor experiencia de desarrollador y calidad de código.",
  darkModeSupport: "Soporte para Modo Oscuro",
  darkModeSupportDesc: "Soporte integrado para modo oscuro, permitiendo a los usuarios elegir su tema preferido para mejor visibilidad y menor fatiga visual.",
  integratedWithNextjs: "Integrado con Next.js",
  nextjsIntegrationDesc: "Nuestros componentes están construidos específicamente para Next.js, aprovechando sus potentes características como componentes de servidor, router de aplicación, y más.",
  serverComponents: "Soporte para Componentes de Servidor",
  appRouter: "Compatible con App Router",
  optimizedForNextjs: "Optimizado para Rendimiento de Next.js",
  rtlSupport: "Soporte RTL para Árabe, Hebreo y otros idiomas RTL",
  translationManagement: "Gestión Fácil de Traducciones",
  dynamicLanguageSwitching: "Cambio Dinámico de Idioma",
  learnMoreI18n: "Aprender Más Sobre I18n",
 
  // Features Integrations
  powerfulIntegrations: "Potentes Integraciones",
  integrationsDesc: "Conecta tu panel de administración con tus herramientas y servicios favoritos con nuestras integraciones prediseñadas.",
  viewAllIntegrations: "Ver Todas las Integraciones",
  integrationsOverview: "Visión General de Integraciones",
  databaseIntegrations: "Integraciones de Base de Datos",
  databaseIntegrationsDesc: "Conecta tu panel de administración a varios sistemas de bases de datos.",
  authIntegrations: "Integraciones de Autenticación",
  authIntegrationsDesc: "Autenticación segura de usuario para tu panel de administración.",
  cloudIntegrations: "Integraciones de Servicios en la Nube",
  cloudIntegrationsDesc: "Integración con servicios en la nube para almacenamiento y más.",
  viewAllIntegrationsInCategory: "Ver Todo",
  featuredIntegrations: "Integraciones Destacadas",
  prismaORM: "Prisma ORM",
  prismaORMDesc: "Interactúa fácilmente con tu base de datos usando Prisma ORM. Acceso a base de datos con tipo seguro, migraciones, y más.",
  nextAuthJs: "NextAuth.js",
  nextAuthJsDesc: "Implementa autenticación en minutos con NextAuth.js. Soporte para proveedores OAuth, email/contraseña, y más.",
  vercelDeployment: "Despliegue en Vercel",
  vercelDeploymentDesc: "Despliega tu panel de administración en Vercel con solo unos clics. Despliegues automáticos, entornos de vista previa, y más.",
  integrationBenefits: "Beneficios de Nuestras Integraciones",
  easyImplementation: "Implementación Fácil",
  easyImplementationDesc: "Integra con tus servicios favoritos en minutos con nuestros conectores prediseñados y documentación detallada.",
  performanceOptimized: "Optimizado para Rendimiento",
  performanceOptimizedDesc: "Nuestras integraciones están construidas teniendo en cuenta el rendimiento, asegurando mínima sobrecarga y máxima eficiencia.",
  constantlyUpdated: "Constantemente Actualizado",
  constantlyUpdatedDesc: "Continuamente actualizamos nuestras integraciones para asegurar compatibilidad con las últimas versiones de servicios de terceros.",
  needCustomIntegration: "¿Necesitas una Integración Personalizada?",
  customIntegrationDesc: "¿No ves la integración que necesitas? Nuestra documentación te muestra cómo crear integraciones personalizadas con cualquier servicio o API.",
  readDocumentation: "Leer Documentación",
  readyToConnect: "¿Listo para Conectar tus Servicios?",
  readyToConnectDesc: "Comienza con nuestra plantilla de panel de administración e integra con tus servicios favoritos hoy.",
 };
 
 // Chinese translations
 const zh: BaseTranslations = {
  // Navigation
  home: "首页",
  about: "关于我们",
  services: "服务",
  blog: "博客",
  contact: "联系我们",
  
  // Common actions
  login: "登录",
  register: "注册",
  applyNow: "立即申请",
  learnMore: "了解更多",
  viewAll: "查看全部",
  
  // Hero section
  heroTitle: "欢迎来到我们的平台",
  heroDescription: "您的旅程从这里开始，探索我们全面的解决方案。",
  exploreMore: "探索更多",
  
  // Blog specific
  blogTitle: "博客",
  blogDescription: "最新文章和更新",
  featuredPost: "特色文章",
  allPosts: "所有文章",
  readMore: "阅读更多",
  minRead: "分钟阅读",
  backToBlog: "返回博客",
  tableOfContents: "目录",
  
  // Footer
  footerTagline: "提供优质服务",
  allRightsReserved: "版权所有。",
  quickLinks: "快速链接",
 
  // Documentation page
  docGettingStarted: "入门指南",
  docGettingStartedDesc: "快速安装和设置指南，帮助您启动项目。",
  docQuickStart: "快速入门",
  docInstallation: "安装",
  docConfig: "配置",
  docComponents: "组件",
  docComponentsDesc: "可在管理面板中使用的预构建UI组件。",
  docUI: "UI组件",
  docForms: "表单和验证",
  docLayouts: "布局示例",
  docDataManagement: "数据管理",
  docDataManagementDesc: "学习如何使用数据库集成和API路由管理数据。",
  docDatabaseSetup: "数据库设置",
  docAPIRoutes: "API路由",
  docAuth: "身份验证",
  docAdvancedTopics: "高级主题",
  docAdvancedTopicsDesc: "深入探讨自定义和高级功能。",
  docCustomization: "自定义",
  docDeployment: "部署",
  docPerformance: "性能",
  documentation: "文档",
  documentationDesc: "全面的指南和资源，帮助您构建和自定义管理面板。",
  searchDocs: "搜索文档...",
  quickStart: "快速入门",
  apiReference: "API参考",
  github: "GitHub",
  buildFaster: "使用预构建组件更快构建",
  componentShowcaseDesc: "我们的组件库包含构建专业管理面板所需的一切，无需重新发明轮子。",
  additionalResources: "附加资源",
  contribute: "贡献",
  contributeDesc: "加入我们的开源社区，帮助改进项目。",
  visitGithub: "访问GitHub",
  support: "支持",
  supportDesc: "从我们的团队或社区支持渠道获取帮助。",
  contactUs: "联系我们",
  readyToStart: "准备开始构建？",
  readyToStartDesc: "使用我们的管理面板模板开始，更快地构建您的下一个项目。",
  getStarted: "开始使用",
  exploreFeatures: "探索功能",
 
  // Pricing page
  transparentPricing: "简单透明的定价",
  pricingDesc: "为您的项目选择完美的计划。所有计划都包括访问我们的核心管理面板功能。",
  oneTimePayment: "一次性付款",
  noSubscription: "无订阅",
  freePlan: "免费",
  freePlanPrice: "免费",
  freePlanDesc: "适合个人项目或学习。",
  proPlan: "专业版",
  proPlanPrice: "¥699",
  proPlanPeriod: "一次性付款",
  proPlanDesc: "为专业项目提供所需的一切。",
  enterprisePlan: "企业版",
  enterprisePlanPrice: "定制",
  enterprisePlanDesc: "为大型团队提供高级功能和专属支持。",
  mostPopular: "最受欢迎",
  whatsIncluded: "包含内容：",
  uiComponents: "UI组件",
  responsiveDesign: "响应式设计",
  singleUser: "单用户",
  basicTemplates: "基础模板",
  githubAccess: "GitHub访问",
  communitySupport: "社区支持",
  blogFunctionality: "博客功能",
  multiLanguageSupport: "多语言支持",
  prioritySupport: "优先支持",
  advancedAnalytics: "高级分析",
  needCustomSolution: "需要定制解决方案？",
  customSolutionDesc: "我们的企业计划包括定制开发、优先支持和针对您特定需求的额外功能。",
  contactSales: "联系销售",
  frequentlyAskedQuestions: "常见问题",
  pricingFaq1Q: "免费计划包括什么？",
  pricingFaq1A: "免费计划包括访问所有基本UI组件、响应式设计和GitHub存储库访问。它非常适合个人项目、学习或在购买前评估管理面板。",
  pricingFaq2Q: "专业版许可是订阅还是一次性付款？",
  pricingFaq2A: "专业版许可是一次性付款，让您终身访问购买时专业版计划中包含的所有当前功能。未来主要版本更新可能需要升级费用。",
  pricingFaq3Q: "我可以将其用于客户项目吗？",
  pricingFaq3A: "是的！专业版许可允许您将管理面板用于无限数量的客户项目。每个项目可以有自己的安装和自定义。",
  pricingFaq4Q: "您提供退款吗？",
  pricingFaq4A: "我们为专业版许可提供14天退款保证。如果您对产品不满意，请在购买后14天内联系我们获得全额退款。",
  pricingFaq5Q: "包括什么类型的支持？",
  pricingFaq5A: "免费用户通过GitHub问题获得社区支持。专业版用户获得48小时响应时间的电子邮件支持。企业客户获得优先支持，有专属渠道和更快的响应时间。",
  stillHaveQuestions: "还有问题？",
  contactSupport: "联系支持",
  readyToGetStarted: "准备开始？",
  startBuildingToday: "加入数千名使用我们的解决方案构建更好管理面板的开发者。",
  getStartedFree: "免费开始",
  unlimitedUsers: "无限用户",
  allTemplates: "所有模板",
  emailSupport: "电子邮件支持",
  premiumSupport: "高级支持",
  buyNow: "立即购买",
 
  // Features Overview
  everythingYouNeed: "构建惊人管理面板所需的一切",
  featuresOverviewDesc: "探索使我们的管理面板模板成为您下一个项目完美起点的强大功能。",
  keyFeatures: "关键功能",
  allFeaturesIncluded: "包含所有功能",
  viewPricing: "查看定价",
  adminDashboard: "管理仪表板",
  adminDashboardDesc: "通过可自定义的小部件、图表和数据可视化，快速了解您的应用程序。监控关键指标并做出数据驱动的决策。",
  contentManagement: "内容管理",
  contentManagementDesc: "通过我们直观的编辑器轻松管理您的博客文章、文章或任何内容。支持markdown、多语言内容和媒体管理。",
  userManagement: "用户管理",
  userManagementDesc: "轻松管理用户、角色和权限。创建用户层次结构、分配权限并维护安全访问控制。",
  builtWithLatestTech: "使用最新技术构建",
  techStackDesc: "我们的管理面板采用现代、可靠的技术构建，确保最佳的开发者体验和终端用户性能。",
  startBuilding: "立即开始使用我们的组件构建",
  startBuildingDesc: "获取我们完整的UI组件库访问权限，立即开始构建美观的管理面板。",
 
  // Features Components
  uiComponentLibrary: "UI组件库",
  componentLibraryDesc: "探索我们全面的UI组件库，设计用于帮助您构建美观、功能齐全且无障碍的管理面板。",
  searchComponents: "搜索组件...",
  layoutComponents: "布局组件",
  layoutComponentsDesc: "用于构建管理面板布局的组件。",
  navigationComponents: "导航组件",
  navigationComponentsDesc: "用于用户导航和菜单的组件。",
  dataDisplayComponents: "数据显示组件",
  dataDisplayComponentsDesc: "用于显示各种类型数据的组件。",
  inputComponents: "输入组件",
  inputComponentsDesc: "用于用户交互的表单控件和输入元素。",
  themingComponents: "主题组件",
  themingComponentsDesc: "用于主题自定义和样式的组件。",
  utilityComponents: "实用组件",
  utilityComponentsDesc: "提供额外功能的实用组件。",
  consistentDesign: "一致的设计语言",
  consistentDesignDesc: "所有组件遵循相同的设计原则和美学，确保一致的用户体验。",
  accessibilityFirst: "无障碍优先",
  accessibilityFirstDesc: "组件在设计时考虑到无障碍性，遵循WCAG指南，确保您的应用程序对所有用户都是无障碍的。",
  customizableStyles: "可自定义样式",
  customizableStylesDesc: "使用Tailwind CSS轻松自定义组件的外观和感觉，以匹配您的品牌标识。",
  responsiveByDefault: "默认响应式",
  responsiveByDefaultDesc: "所有组件都设计为在所有大小的设备上无缝工作，从移动设备到桌面。",
  typeScriptSupport: "TypeScript支持",
  typeScriptSupportDesc: "为所有组件提供完整的TypeScript支持和类型定义，提供更好的开发者体验和代码质量。",
  darkModeSupport: "深色模式支持",
  darkModeSupportDesc: "内置深色模式支持，允许用户选择他们喜欢的主题，以获得更好的可见性和减少眼睛疲劳。",
  integratedWithNextjs: "与Next.js集成",
  nextjsIntegrationDesc: "我们的组件专为Next.js构建，利用其强大功能如服务器组件、应用路由器等。",
  serverComponents: "服务器组件支持",
  appRouter: "应用路由器兼容",
  optimizedForNextjs: "为Next.js性能优化",
  rtlSupport: "阿拉伯语、希伯来语和其他RTL语言的RTL支持",
  translationManagement: "简易翻译管理",
  dynamicLanguageSwitching: "动态语言切换",
  learnMoreI18n: "了解更多关于I18n",
 
  // Features Integrations
  powerfulIntegrations: "强大的集成",
  integrationsDesc: "通过我们预构建的集成将您的管理面板连接到您喜爱的工具和服务。",
  viewAllIntegrations: "查看所有集成",
  integrationsOverview: "集成概览",
  databaseIntegrations: "数据库集成",
  databaseIntegrationsDesc: "将您的管理面板连接到各种数据库系统。",
  authIntegrations: "身份验证集成",
  authIntegrationsDesc: "为您的管理面板提供安全的用户身份验证。",
  cloudIntegrations: "云服务集成",
  cloudIntegrationsDesc: "与云服务集成，用于存储等功能。",
  viewAllIntegrationsInCategory: "查看全部",
  featuredIntegrations: "精选集成",
  prismaORM: "Prisma ORM",
  prismaORMDesc: "使用Prisma ORM轻松与数据库交互。类型安全的数据库访问、迁移等。",
  nextAuthJs: "NextAuth.js",
  nextAuthJsDesc: "使用NextAuth.js在几分钟内实现身份验证。支持OAuth提供商、电子邮件/密码等。",
  vercelDeployment: "Vercel部署",
  vercelDeploymentDesc: "只需几次点击即可将管理面板部署到Vercel。自动部署、预览环境等。",
  integrationBenefits: "我们集成的好处",
  easyImplementation: "易于实现",
  easyImplementationDesc: "通过我们预构建的连接器和详细文档，在几分钟内与您喜爱的服务集成。",
  performanceOptimized: "性能优化",
  performanceOptimizedDesc: "我们的集成考虑到性能而构建，确保最小的开销和最大的效率。",
  constantlyUpdated: "持续更新",
  constantlyUpdatedDesc: "我们不断更新我们的集成，确保与第三方服务的最新版本兼容。",
  needCustomIntegration: "需要自定义集成？",
  customIntegrationDesc: "没有看到您需要的集成？我们的文档向您展示如何创建与任何服务或API的自定义集成。",
  readDocumentation: "阅读文档",
  readyToConnect: "准备连接您的服务？",
  readyToConnectDesc: "使用我们的管理面板模板开始，今天就与您喜爱的服务集成。",
 };
 
 // Export the dictionary with all supported languages
 export const dictionary: TranslationDictionary<BaseTranslations> = {
  en,
  hi,
  de,
  fr,
  es,
  zh,
 };
 
 // Export language names for the language selector
 export const languageNames: Record<string, string> = {
  en: "English",
  hi: "हिन्दी",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  zh: "中文",
 };