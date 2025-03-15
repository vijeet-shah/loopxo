// config/navigation.ts

// Define the type for navigation items
interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

// Define the type for the entire navigation configuration
export interface NavigationConfig {
  mainNav: NavItem[];
  i18n: {
    enabled: boolean;
    defaultLanguage: string;
    displayVariant: 'icon-only' | 'text' | 'both';
  };
  announcement: {
    text: string;
    href: string;
    enabled: boolean;
    bgColor: string;
  };
  ctaButton: {
    text: string;
    href: string;
    variant: string;
  };
  mobileMenuMode: 'drawer' | 'dropdown';
  enableSearch: boolean;
  enableLanguageSelector: boolean;
  enableThemeToggle: boolean;
}

export const navigationConfig: NavigationConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
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
    text: "🚀 New blog post: Mastering Next.js 14 App Router",
    href: "/blog/mastering-nextjs-14-app-router",
    enabled: true,
    bgColor: "#3B82F6",
  },
  ctaButton: {
    text: "Subscribe",
    href: "/subscribe",
    variant: "default",
  },
  mobileMenuMode: "drawer",
  enableSearch: true,
  enableLanguageSelector: true,
  enableThemeToggle: true,
};