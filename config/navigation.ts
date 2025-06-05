// config/navigation.ts
export type NavigationItem = {
  title: string;
  href: string;
  children?: NavigationItem[];
  isExternal?: boolean;
  icon?: string; // Optional icon name from your icon library
};

export type NavigationConfig = {
  mainNav: NavigationItem[];
  announcement?: {
    text: string;
    href: string;
    enabled: boolean;
    bgColor?: string; // Optional custom background color
  };
  ctaButton: {
    text: string;
    href: string;
    variant?: 'default' | 'outline' | 'ghost' | 'link'; // Button variants
  };

  i18n: {
    enabled: boolean;
    defaultLanguage: string;
    displayVariant?: 'icon-only' | 'with-text' | 'dropdown';
  };
  mobileMenuMode?: 'drawer' | 'fullscreen'; // Different mobile menu styles
  enableSearch?: boolean;
  enableLanguageSelector?: boolean;
  enableThemeToggle?: boolean;
  enablePreviewMode?: boolean; // For admin/editor features
};

// Default Loopxo template navigation configuration
// This should be customized for each client
export const navigationConfig: NavigationConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Features",
      href: "#",
      children: [
        {
          title: "Overview",
          href: "/features/overview",
        },
        {
          title: "Components",
          href: "/features/components",
        },
        {
          title: "Integrations",
          href: "/features/integrations",
        },
      ],
    },
    {
      title: "Services",
      href: "#",
      children: [
        {
          title: "UI-UX Design",
          href: "/services/ui-ux",
        },
        {
          title: "Mobile Apps",
          href: "/services/mobile-app",
        },
        {
          title: "Backend Development",
          href: "/services/backend-developement",
        },
        {
          title: "Frontend Development",
          href: "/services/frontend-developement",
        },
        {
          title: "Artificial Intelligence",
          href: "/services/ai-integration",
        },{
          title: "Data Analysis & Data science",
          href: "/services/data-analysis",
        },{
          title: "Managed Cloud & DevOps",
          href: "/services/devops",
        },

      ],
    },
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "Career",
      href: "/career",
    },
    {
      title: "Blog",
      href: "/blog",
    },
   
  ],
  i18n: {
    enabled: true,
    defaultLanguage: 'en',
    displayVariant: 'icon-only',
  },
  announcement: {
    text: "Book a Appoinent with us right Now",
    href: "/intro",
    enabled: true,
    bgColor: "#000000", 
  },
  ctaButton: {
    text: "Get Started",
    href: "/get-started",
    variant: "default",
  },
  mobileMenuMode: "drawer",
  enableSearch: true,
  enableLanguageSelector: true,
  enableThemeToggle: true,
};