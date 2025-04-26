'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/components/loader';

// Dynamically import HeroSection with no SSR
const Main = dynamic(() => import('@/components/main'), {
  ssr: false,
});

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch posts from API instead of using fs directly
  useEffect(() => {
    async function fetchPosts() {
      try {
        // Fetch data but don't store it if we're not using it
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        await response.json(); // Just to make the request complete
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPosts();
  }, []);

  useEffect(() => {
    // Check if this is a page refresh or new session
    let hasSeenLoader = false;
    
    // Use try-catch to handle potential sessionStorage errors
    try {
      hasSeenLoader = sessionStorage.getItem('hasSeenLoader') === 'true';
    } catch (error) {
      console.error('Session storage access error:', error);
    }
    
    if (hasSeenLoader) {
      // Skip loader if already seen in this session
      setShowLoader(false);
    } else {
      try {
        // Mark that user has seen the loader in this session
        sessionStorage.setItem('hasSeenLoader', 'true');
      } catch (error) {
        console.error('Session storage write error:', error);
      }
    }
    
    // Set loaded state to true after checking session storage
    setLoaded(true);
    
    // Add a failsafe timeout to ensure loader doesn't run forever
    const safetyTimeout = setTimeout(() => {
      setShowLoader(false);
    }, 10000); // 10 seconds max
    
    return () => clearTimeout(safetyTimeout);
  }, []);

  // Handler for when loader completes
  const handleLoaderComplete = () => {
    setShowLoader(false);
  };
  
  return (
    <>
      {/* Only show loader if needed */}
      {showLoader && loaded && (
        <Loader onComplete={handleLoaderComplete} />
      )}
      
      {/* Main content - always render but initially hidden if loader is showing */}
      {!isLoading && (
        <Main />
      )}
    </>
  );
}