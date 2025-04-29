

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
  // config/site.ts
export const siteConfig: SiteConfig = {
  name: "Vijeet Shah",
  legalName: "Vijeet Shah Blog",
  description: "Personal blog and portfolio of Vijeet Shah - Thoughts on technology, web development, and personal growth.",
  url: "https://vijeetshah.com",
  ogImage: "/vijeet.jpg",
  links: {
    twitter: "https://twitter.com/vijeetshah_",
    github: "https://github.com/vijeet-shah",
    linkedin: "https://linkedin.com/in/vijeet-shah",
    instagram: "https://instagram.com/",
  },
  contact: {
    email: "vijeet@vijeetshah.com",
    phone: "+91 9082053880",
    address: {
      street: "Mumbai",
      locality: "Maharashtra",
      postalCode: "400001",
      region: "Maharashtra",
      country: "India",
    },
    openingHours: "Available for consultations Monday-Friday, 10 AM - 6 PM IST",
  },
  customFields: {
    profession: "Full Stack Developer & Technical Writer",
    expertise: ["Web Development", "React", "Next.js", "JavaScript", "TypeScript"],
    yearsOfExperience: 8,
  }
};