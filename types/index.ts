import { ArrowRight, CheckCircle2, Shield, TrendingUp, Users, Star, Phone, Mail, MapPin, Clock } from "lucide-react";


export const IconsMap = {
  Shield: Shield,
  TrendingUp: TrendingUp,
  Users: Users,
  Star: Star,
  Phone: Phone,
  Mail: Mail,
  MapPin: MapPin,
  Clock: Clock,
  CheckCircle2: CheckCircle2,
  ArrowRight: ArrowRight,
};

export type HeroConfig = {
  enabled: boolean;
  style: 'simple' | 'split' | 'centered';
  showImage: boolean;
  imageSrc: string;
  showBadge: boolean;
  badgeText: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  showTrustIndicators: boolean;
  trustIndicators?: Array<{ icon: keyof typeof IconsMap; text: string }>;
  backgroundStyle?: 'gradient' | 'pattern' | 'solid';
};

export type ValuesSectionConfig = {
  enabled: boolean;
  title: string;
  titleKey?: string;
  description?: string;
  descriptionKey?: string;
  values: Array<{
    icon: keyof typeof IconsMap;
    title: string;
    titleKey?: string;
    description: string;
    descriptionKey?: string;
  }>;
};

export type FeaturedSectionConfig = {
  enabled: boolean;
  title: string;
  titleKey?: string;
  description?: string;
  descriptionKey?: string;
  items: Array<{
    title: string;
    titleKey?: string;
    description: string;
    descriptionKey?: string;
    image?: string;
    link?: string;
    highlight?: string;
    highlightKey?: string;
    badge?: string;
  }>;
  style: 'cards' | 'grid' | 'list';
};

export type CTAConfig = {
  enabled: boolean;
  title: string;
  titleKey?: string;
  description?: string;
  descriptionKey?: string;
  buttonText: string;
  buttonLink: string;
  style: 'banner' | 'box' | 'split';
  backgroundStyle?: 'gradient' | 'pattern' | 'solid';
};

export type ContactSectionConfig = {
  enabled: boolean;
  title: string;
  titleKey?: string;
  description?: string;
  descriptionKey?: string;
  showAddress: boolean;
  showPhone: boolean;
  showEmail: boolean;
  showSocials: boolean;
  mapLink?: string;
};