"use client"

import { useState, useEffect } from 'react';
import { LandingPage } from '@/components/landing-page';
import Loader from '@/components/loader'; 
// import LaunchPoster from '@/components/launchPoster';
import { useRouter, usePathname } from "next/navigation";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  // const [showPoster, setShowPoster] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isLoaderShown = sessionStorage.getItem("loaderShown");

    if (!isLoaderShown) {
      // Simulating a delay to mimic the loading process
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("loaderShown", "true");
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, []);

  // useEffect(() => {
  //   const posterTimer = setTimeout(() => {
  //     setShowPoster(true);
  //   }, 7000);

  //   return () => clearTimeout(posterTimer);
  // }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      if (pathname === "/") {
        const isLoaderShown = sessionStorage.getItem("loaderShown");
        if (!isLoaderShown) {
          setIsLoading(true);
        }
      }
    };

    router.refresh = handleRouteChange;

    // Clean up the event listener when the component unmounts
    return () => {};
  }, [router, pathname]);


  return (
    <main className="w-auto h-full space-y-10">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <LandingPage/>

        </div>
      )}

      {/* {showPoster && <LaunchPoster onClose={() => setShowPoster(false)} />} */}
    </main>
  );
}
