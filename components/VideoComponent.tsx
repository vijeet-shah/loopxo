"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface VideoComponentProps {
  className?: string;
}

export const VideoComponent = ({ className }: VideoComponentProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useRef<boolean>(
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false
  );

  useEffect(() => {
    if (!videoRef.current) return;
    
    // Store the reference to avoid the React Hook exhaustive deps warning
    const videoElement = videoRef.current;
    
    const handleLoaded = () => setIsLoading(false);
    videoElement.addEventListener('loadeddata', handleLoaded);

    if (!prefersReducedMotion.current) {
      videoElement.playbackRate = 0.8;
      videoElement.play().catch(error => {
        console.log('Video autoplay prevented:', error);
      });
    } else {
      videoElement.currentTime = 2;
    }

    return () => {
      // Use the stored reference in cleanup function
      videoElement.removeEventListener('loadeddata', handleLoaded);
    };
  }, []);

  return (
    <div className={cn(
      "relative aspect-square rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800",
      className
    )}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="w-12 h-12 rounded-full border-2 border-t-primary border-gray-200 dark:border-gray-700 animate-spin"></div>
        </div>
      )}
      
      <video 
        ref={videoRef}
        loop
        muted
        playsInline
        className={cn(
          "w-full h-full object-cover",
          isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-700'
        )}
      >
        <source src="/vijeetshah.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
    </div>
  );
};