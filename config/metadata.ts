// config/metadata.ts
import type { Metadata } from 'next';
import { siteConfig } from './site';

// Define base keywords for SEO
const baseKeywords = [
  'nextjs', 'react', 'typescript', 'tailwindcss', 'template', 'web development'
];

// Client-specific keywords - should be customized for each client
const clientKeywords = [
  'loopxo', 'template', 'nextjs template', 'react template', 'web template',
  'typescript template', 'tailwind template', 'performance', 'accessibility'
];

/**
 * Generate metadata for pages throughout the site
 * @param pageTitle - Optional title for specific page
 * @param pageDescription - Optional description for specific page
 * @param pageKeywords - Optional additional keywords for the page
 * @param pageImage - Optional custom OG image for the page
 * @returns Metadata object compatible with Next.js Metadata API
 */
export function generateMetadata(
  pageTitle?: string,
  pageDescription?: string,
  pageKeywords?: string[],
  pageImage?: string
): Metadata {
  // Construct title with client name
  const title = pageTitle 
    ? `${pageTitle} | ${siteConfig.name}`
    : `${siteConfig.name} | Modern Web Template`;
  
  // Use page-specific description or fall back to site description
  const description = pageDescription ?? siteConfig.description;
  
  // Combine all keywords for SEO
  const keywords = [
    ...baseKeywords,
    ...(pageKeywords ?? clientKeywords)
  ];
  
  // Use page-specific image or fall back to default OG image
  const ogImage = pageImage ?? siteConfig.ogImage;

  // Generate the metadata object
  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      telephone: true,
      address: true,
      email: true,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: siteConfig.url,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    applicationName: siteConfig.name,
    verification: {
      // Replace these with actual verification IDs when deploying
      google: 'google-site-verification-id',
      yandex: 'yandex-verification-id',
    },
  };
}

// Generate default site metadata
export const defaultMetadata = generateMetadata();

// Helper functions for specific page types
export const generateBlogMetadata = (title: string, description: string, image?: string) => 
  generateMetadata(
    title, 
    description, 
    [...clientKeywords, 'blog', 'article'], 
    image
  );

export const generateProductMetadata = (title: string, description: string, image?: string) => 
  generateMetadata(
    title, 
    description, 
    [...clientKeywords, 'product', 'service'], 
    image
  );