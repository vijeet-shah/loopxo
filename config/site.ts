

export interface Branch {
  name: string;
  address: string;
  phone?: string;
  hours?: string;
  mapLink?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export type SiteConfig = {
    name: string;
    legalName: string;
    description: string;
    url: string;
    ogImage: string;
    links: {
      facebook: string;
      twitter: string;
      instagram: string;
      [key: string]: string; // Allow for additional custom social links
    };
    contact: {
      phone: string;
      email: string;
      secondaryPhone?: string; // Added for multiple phone numbers
      address: {
        street: string;
        locality: string;
        postalCode: string;
        region: string;
        country: string;
      };
      geo?: {
        latitude: number;
        longitude: number;
        radius?: number; // in meters
      };
      openingHours?: string;
    };
    founding?: {
      date: string;
      founders: string[];
    };
    // Custom fields that can be added by clients
    customFields?: Record<string, any>;
    branches?: Branch[];
    faqs?: FAQ[];
  };
  
  // Default Loopxo template configuration
  // This should be replaced with client-specific data
  export const siteConfig: SiteConfig = {
    name: "Loopxo",
    legalName: "Loopxo",
    description: "A highly customizable Next.js 15 template for creating modern websites with TypeScript and Tailwind CSS.",
    url: "https://loopxo-template.vercel.app",
    ogImage: "/images/og-image.jpg",
    links: {
      facebook: "https://facebook.com/loopxotemplate",
      twitter: "https://twitter.com/loopxotemplate",
      instagram: "https://instagram.com/loopxotemplate",
      github: "https://github.com/loopxotemplate",
    },
    contact: {
      phone: "+1234567890",
      email: "hello@loopxotemplate.com",
      address: {
        street: "123 Template Street",
        locality: "Web City",
        postalCode: "10101",
        region: "Digital State",
        country: "US",
      },
    },
    customFields: {
      // Add any client-specific fields here
      industry: "Technology",
      yearEstablished: 2024,
      customerSatisfaction: "99%",
    }
  };