'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/components/loader';

// Dynamically import HeroSection with no SSR to ensure client-side only rendering
const HeroSection = dynamic(() => import('@/components/landing-page/heroSection'), {
  ssr: false,
});

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  // Use effect to handle potential hydration issues
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {/* Loader component */}
      <Loader />
      
      {/* Only render the main content when loaded (prevents hydration issues) */}
      {loaded && (
        <div className="min-h-screen">
          <HeroSection />
        </div>
      )}
    </>
  );
}