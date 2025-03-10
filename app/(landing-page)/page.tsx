import { LandingPage } from '@/components/landing-page';
import { getLanguage } from '@/lib/i18n/server-utils';

export default function Home() {
  // Get language preference for SEO metadata
  const lang = getLanguage();
  
  return <LandingPage />;
}