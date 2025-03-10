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
      title: "Categories",
      href: "#",
      children: [
        {
          title: "Web Development",
          href: "/blog/category/web-development",
        },
        {
          title: "JavaScript",
          href: "/blog/category/javascript",
        },
        {
          title: "React",
          href: "/blog/category/react",
        },
        {
          title: "NextJS",
          href: "/blog/category/nextjs",
        },
        {
          title: "Career Growth",
          href: "/blog/category/career",
        },
      ],
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Projects",
      href: "/projects",
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