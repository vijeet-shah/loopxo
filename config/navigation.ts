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
        title: "Documentation",
        href: "/docs",
      },
      {
        title: "Pricing",
        href: "/pricing",
      },
      {
        title: "Blog",
        href: "/blog",
      },
      {
        title: "Contact",
        href: "/contact",
      },
    ],
    i18n: {
      enabled: true,
      defaultLanguage: 'en',
      displayVariant: 'icon-only',
    },
    announcement: {
      text: "🚀 Welcome to Loopxo - The ultimate Next.js starter kit!",
      href: "/intro",
      enabled: true,
      bgColor: "#3B82F6", // Default blue
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