// app/sitemap.ts
import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
import { navigationConfig } from '@/config/navigation'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const lastModified = new Date()

  // Create a base set of routes
  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Function to generate sitemap entries from navigation items
  const generateRoutesFromNav = (items: any[]): MetadataRoute.Sitemap => {
    const routes: MetadataRoute.Sitemap = [];
    
    items.forEach(item => {
      if (item.href && item.href !== '#' && !item.href.startsWith('http')) {
        routes.push({
          url: `${baseUrl}${item.href}`,
          lastModified,
          changeFrequency: 'monthly',
          priority: 0.8,
        });
      }

      // Add child routes if they exist
      if (item.children && Array.isArray(item.children)) {
        const childRoutes = generateRoutesFromNav(item.children);
        routes.push(...childRoutes);
      }
    });

    return routes;
  };

  // Add routes from navigation
  const navRoutes = generateRoutesFromNav(navigationConfig.mainNav);

  // Return all routes 
  return [...baseRoutes, ...navRoutes];
}