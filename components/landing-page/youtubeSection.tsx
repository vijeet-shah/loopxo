'use client';

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Play, Film, Youtube, Code, X } from "lucide-react";
import Image from "next/image";

// Video data with titles, thumbnails and URLs
const vlogVideos = [
  {
    title: "My Day in New York City",
    description: "Exploring the vibrant streets of NYC",
    thumbnail: "https://i.ytimg.com/vi/bGIPH-7NR-w/maxresdefault.jpg",
    url: "https://youtu.be/bGIPH-7NR-w?si=5oLI0noae9JUtkrH"
  },
  {
    title: "Product Design Insights",
    description: "Key learnings from my recent project",
    thumbnail: "https://i.ytimg.com/vi/g-0NXx36Tuk/maxresdefault.jpg",
    url: "https://youtu.be/g-0NXx36Tuk?si=Uy3rRN1bho0AvFW1"
  },
  {
    title: "Software Architecture Tips",
    description: "How I approach system design",
    thumbnail: "https://i.ytimg.com/vi/RTBnVSfV1LM/maxresdefault.jpg", 
    url: "https://youtu.be/RTBnVSfV1LM?si=IYEP5qxkQkOIRHeq"
  },
  {
    title: "Startup Journey Vlog",
    description: "Behind the scenes of building a product",
    thumbnail: "https://i.ytimg.com/vi/PGl-2cD8g2E/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=PGl-2cD8g2E"
  }
];

export default function YoutubeSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const vlogCarouselRef = useRef<HTMLDivElement | null>(null);
  
  const scrollLeft = () => {
    if (vlogCarouselRef.current) {
      vlogCarouselRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (vlogCarouselRef.current) {
      vlogCarouselRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-background py-4 sm:py-8 px-2 sm:px-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-[150px] sm:w-[300px] md:w-[400px] h-[150px] sm:h-[300px] md:h-[400px] rounded-full bg-gradient-to-r from-red-500/5 to-primary/10 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-[100px] sm:w-[250px] md:w-[350px] h-[100px] sm:h-[250px] md:h-[350px] rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/10 blur-3xl" />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto h-full flex flex-col overflow-hidden">
        {/* Header section - extremely compact */}
        <div className="flex items-center space-x-3 md:space-x-4 mb-1 sm:mb-3">
          <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-red-500 to-primary flex items-center justify-center">
            <Youtube className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg sm:text-2xl font-bold">My YouTube Channel</h2>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Check out my videos</p>
          </div>
          <a 
            href="https://youtube.com/@vijeet_" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-2 py-1 rounded-lg bg-red-600 text-white text-[10px] font-medium flex items-center hover:bg-red-700"
          >
            <Youtube className="h-2.5 w-2.5 mr-1" />
            <span>Subscribe</span>
          </a>
        </div>

        {/* Content area with NO GAPS */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* First section */}
          <div className="mb-1">
            <div className="flex items-center space-x-1 mb-0.5">
              <Film className="h-3 w-3 text-primary" />
              <h3 className="text-xs sm:text-sm font-medium">Fun & Vlog Videos</h3>
              
              {/* Only show navigation on non-mobile */}
              <div className="hidden sm:flex space-x-1 ml-auto">
                <button
                  onClick={scrollLeft}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 dark:bg-black/20 border border-white/20 text-primary"
                >
                  <ChevronLeft className="h-3 w-3" />
                </button>
                <button
                  onClick={scrollRight}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 dark:bg-black/20 border border-white/20 text-primary"
                >
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
            
            {/* Videos - vertical on mobile, horizontal on larger screens */}
            <div 
              ref={vlogCarouselRef}
              className="sm:flex sm:overflow-x-auto sm:space-x-2 hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {vlogVideos.map((video, index) => (
                <div
                  key={`desktop-${index}`}
                  className="flex-shrink-0 w-[180px] md:w-[220px] cursor-pointer border border-primary/10 rounded-lg overflow-hidden hover:border-primary/30 transition-colors"
                  onClick={() => setActiveVideo(video.url)}
                >
                  <div className="relative aspect-video bg-black/80">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 180px, 220px"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-8 h-8 rounded-full bg-primary/90 flex items-center justify-center">
                        <Play className="h-4 w-4 text-white" fill="white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <h4 className="text-xs font-medium line-clamp-1">
                      {video.title}
                    </h4>
                    <div className="text-[10px] text-muted-foreground line-clamp-1">
                      {video.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile vertical video grid */}
            <div className="grid grid-cols-2 gap-1 sm:hidden">
              {vlogVideos.slice(0, 2).map((video, index) => (
                <div
                  key={`mobile-${index}`}
                  className="cursor-pointer border border-primary/10 rounded-lg overflow-hidden"
                  onClick={() => setActiveVideo(video.url)}
                >
                  <div className="relative aspect-video bg-black/80">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-5 h-5 rounded-full bg-primary/90 flex items-center justify-center">
                        <Play className="h-2.5 w-2.5 text-white" fill="white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-1">
                    <h4 className="text-[9px] font-medium line-clamp-1">
                      {video.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Technical section - NO GAP */}
          <div>
            <div className="flex items-center space-x-1 mb-0.5">
              <Code className="h-4 w-4 text-primary" />
              <h3 className="text-sm sm:text-lg font-medium">Technical Content</h3>
            </div>
            
            {/* Ultra-minimal coming soon box */}
            <div className="border border-primary/10 rounded-lg p-1.5 sm:p-3 md:p-4 bg-muted/5 text-center">
              <div className="w-5 h-5 sm:w-8 sm:h-8 mx-auto rounded-full bg-muted/20 flex items-center justify-center mb-0.5 sm:mb-2">
                <Youtube className="h-2.5 w-2.5 sm:h-4 sm:w-4 text-muted-foreground/50" />
              </div>
              <h4 className="text-xs sm:text-base font-medium mb-0.5">Coming Soon</h4>
              <p className="text-[9px] sm:text-xs text-muted-foreground max-w-lg mx-auto line-clamp-1 sm:line-clamp-2">
                Technical tutorials and coding videos are in production.
              </p>
              <motion.button 
                className="mt-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] sm:text-xs hover:bg-primary/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Notified
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Video modal */}
        {activeVideo && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-1 sm:p-2"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="relative w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${
                  activeVideo.includes('v=') 
                    ? activeVideo.split('v=')[1].split('&')[0] 
                    : activeVideo.split('/').pop()?.split('?')[0]
                }?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-1 right-1 sm:top-2 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black/70 flex items-center justify-center text-white"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}