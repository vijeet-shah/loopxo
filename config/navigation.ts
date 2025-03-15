// config/navigation.ts
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