// lib/seo.tsx
"use client";

import { usePathname } from 'next/navigation';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { defaultMetadata } from '@/config/metadata';

type SeoProps = {
  date?: string;
  templateTitle?: string;
  description?: string;
  image?: string;
  keywords?: string[];
  type?: 'website' | 'article';
  robots?: string;
};

// This is a client component that can be used in special cases
// where you need dynamic SEO that can't be handled by the Metadata API
export default function Seo(props: SeoProps) {
  const pathname = usePathname();
  
  // For client-side SEO needs
  // This component doesn't render anything visible
  // It would be used for things like dynamically setting meta tags
  // based on client-side data
  
  // Only use this component for special cases
  // For standard SEO, use the Metadata API in your layout.ts or page.ts files
  return null;
}

// Helper function to generate metadata for App Router pages
export function generatePageMetadata(props: SeoProps): Metadata {
  // Start with the default metadata from config
  const metadata = { ...defaultMetadata };
  
  // Override with the page-specific props
  let title: string;
  if (props.templateTitle) {
    title = `${props.templateTitle} | ${siteConfig.name}`;
  } else if (typeof metadata.title === 'object' && metadata.title && 'default' in metadata.title) {
    title = metadata.title.default as string;
  } else {
    title = siteConfig.name;
  }
  
  const description = props.description || metadata.description || siteConfig.description;
  
  let ogImage: string | undefined;
  if (props.image) {
    ogImage = props.image;
  } else if (metadata.openGraph && metadata.openGraph.images) {
    // Handle both array and single object cases
    if (Array.isArray(metadata.openGraph.images) && metadata.openGraph.images.length > 0) {
      const firstImage = metadata.openGraph.images[0];
      ogImage = typeof firstImage === 'string' ? firstImage : firstImage.url;
    } else if (typeof metadata.openGraph.images === 'object') {
      ogImage = (metadata.openGraph.images as { url: string }).url;
    }
  } else {
    ogImage = siteConfig.ogImage;
  }

  // Construct the final metadata object
  return {
    ...metadata,
    title,
    description,
    keywords: [...(metadata.keywords || []), ...(props.keywords || [])],
    openGraph: {
      ...metadata.openGraph,
      title,
      description,
      type: props.type || 'website',
      images: ogImage ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : undefined,
    },
    twitter: {
      ...metadata.twitter,
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: props.robots || metadata.robots,
  };
}

// Export favicon links for reference
export const favicons: Array<React.ComponentPropsWithoutRef<'link'>> = [
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicon/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon/favicon-16x16.png',
  },
  { rel: 'manifest', href: '/favicon/site.webmanifest' },
  {
    rel: 'mask-icon',
    href: '/favicon/safari-pinned-tab.svg',
    color: '#3B82F6', // Using primary blue as default
  },
  { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
];