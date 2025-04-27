'use client';

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Play, Youtube, Code } from "lucide-react";
import Image from "next/image";
import { useTranslation } from '@/lib/i18n/client-utils';

// Define interfaces for better type safety
interface VideoItem {
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

// Enhanced video data with FULL YouTube URLs
const vlogVideos: VideoItem[] = [
  {
    title: "unplanned KEDARNATH yatra 2024",
    description: "Exploring KEDARNATH",
    thumbnail: "https://i.ytimg.com/vi/bGIPH-7NR-w/maxresdefault.jpg",
    url: "https://youtu.be/bGIPH-7NR-w?si=D5cqXaICmfIA2gjk" 
  },
  {
    title: "Product Design Insights",
    description: "Key learnings from my recent project",
    thumbnail: "https://i.ytimg.com/vi/g-0NXx36Tuk/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=g-0NXx36Tuk"
  },
  {
    title: "Software Architecture Tips",
    description: "How I approach system design",
    thumbnail: "https://i.ytimg.com/vi/RTBnVSfV1LM/maxresdefault.jpg", 
    url: "https://www.youtube.com/watch?v=RTBnVSfV1LM"
  },
  {
    title: "Startup Journey Vlog",
    description: "Behind the scenes of building a product",
    thumbnail: "https://i.ytimg.com/vi/PGl-2cD8g2E/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=PGl-2cD8g2E"
  }
];

export default function YoutubeSection(): JSX.Element {
  const vlogCarouselRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  
  const checkScrollPosition = (): void => {
    if (vlogCarouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = vlogCarouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };
  
  useEffect(() => {
    const currentRef = vlogCarouselRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      return () => currentRef.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);
  
  const scrollLeft = (): void => {
    if (vlogCarouselRef.current) {
      vlogCarouselRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    }
  };
  
  const scrollRight = (): void => {
    if (vlogCarouselRef.current) {
      vlogCarouselRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };
  
  // Handle video playback by redirecting to YouTube
  const openVideo = (videoUrl: string): void => {
    // Open YouTube directly in a new tab
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-background py-4 sm:py-6 px-3 sm:px-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-[150px] sm:w-[300px] md:w-[400px] h-[150px] sm:h-[300px] md:h-[400px] rounded-full bg-gradient-to-br from-red-500/5 to-primary/5 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-[100px] sm:w-[250px] md:w-[300px] h-[100px] sm:h-[250px] md:h-[300px] rounded-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 blur-3xl" />
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col h-full overflow-hidden">
        {/* Centralized header section */}
        <motion.div 
          className="flex flex-col items-center text-center mb-4 sm:mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div 
            className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center mb-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Youtube className="h-5 w-5 text-white" />
          </motion.div>
          
          <motion.h2 
            className="text-xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-red-500 to-primary mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Vijeet Shah
          </motion.h2>
          
          <motion.p 
            className="text-xs sm:text-sm text-muted-foreground max-w-xs sm:max-w-sm mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {t.latestVideos || "Latest videos on tech, product & entrepreneurship"}
          </motion.p>
          
          <motion.a 
            href="https://youtube.com/@vijeet_" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group px-4 py-1.5 rounded-full bg-red-600 text-white text-xs sm:text-sm font-medium flex items-center hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Youtube className="h-3.5 w-3.5 mr-1.5 group-hover:animate-pulse" />
            <span>{t.subscribe || "Subscribe"}</span>
          </motion.a>
        </motion.div>

        {/* Video section - REMOVED flex-1 to fix spacing */}
        <div className="w-full overflow-hidden">
          {/* Section title with navigation */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mr-2">
                <Play className="h-3 w-3 text-red-500 fill-red-500" />
              </div>
              <h3 className="text-sm font-medium">Featured Videos</h3>
            </div>
            
            {/* Navigation arrows */}
            <div className="flex space-x-1.5">
              <motion.button
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className={`w-6 h-6 rounded-full flex items-center justify-center ${canScrollLeft ? 'bg-white/10 border border-white/20 text-primary hover:bg-white/20' : 'opacity-30 cursor-not-allowed bg-white/5 border border-white/10 text-muted-foreground'}`}
                whileHover={canScrollLeft ? { scale: 1.05 } : {}}
                whileTap={canScrollLeft ? { scale: 0.95 } : {}}
              >
                <ChevronLeft className="h-3 w-3" />
              </motion.button>
              <motion.button
                onClick={scrollRight}
                disabled={!canScrollRight}
                className={`w-6 h-6 rounded-full flex items-center justify-center ${canScrollRight ? 'bg-white/10 border border-white/20 text-primary hover:bg-white/20' : 'opacity-30 cursor-not-allowed bg-white/5 border border-white/10 text-muted-foreground'}`}
                whileHover={canScrollRight ? { scale: 1.05 } : {}}
                whileTap={canScrollRight ? { scale: 0.95 } : {}}
              >
                <ChevronRight className="h-3 w-3" />
              </motion.button>
            </div>
          </div>
          
          {/* Video carousel - REMOVED pb-2 to reduce gap */}
          <div 
            ref={vlogCarouselRef}
            className="grid grid-flow-col auto-cols-max gap-3 overflow-x-auto scroll-smooth min-h-0"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch' 
            }}
          >
            {vlogVideos.map((video, index) => (
              <motion.div
                key={index}
                className="w-[210px] sm:w-[240px] md:w-[260px] rounded-xl bg-card border border-white/10 dark:border-white/10 overflow-hidden cursor-pointer"
                whileHover={{ y: -3, boxShadow: "0 5px 15px -3px rgba(0, 0, 0, 0.1)" }}
                onClick={() => openVideo(video.url)} 
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 640px) 210px, (max-width: 768px) 240px, 260px"
                  />
                  {/* Overlay gradient and play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80" />
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center z-10"
                      initial={{ opacity: 0.8, scale: 0.9 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Play className="h-4 w-4 text-white fill-white ml-0.5" />
                    </motion.div>
                  </div>
                </div>
                <div className="p-2 pb-2.5 bg-gradient-to-b from-black/5 to-transparent">
                  <h4 className="text-xs font-medium line-clamp-1 mb-0.5">
                    {video.title}
                  </h4>
                  <p className="text-[10px] text-muted-foreground line-clamp-1">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Compact coming soon section - REMOVED top margin to reduce gap */}
        <motion.div 
          className="relative overflow-hidden rounded-lg border border-primary/20 bg-gradient-to-br from-muted/20 to-muted/5 p-3 mt-1"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center">
              <Code className="h-3.5 w-3.5 text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-xs sm:text-sm font-medium mb-1">{t.technicalContent || "Technical Content"}</h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 line-clamp-1">
                {t.technicalLine || "In-depth technical tutorials coming soon"}
              </p>
              
              <div className="flex items-center gap-2">
                <motion.a 
                  href="https://youtube.com/@vijeet_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-[10px] hover:bg-primary/15 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Youtube className="h-2.5 w-2.5 mr-1" />
                  <span>{t.channelName || "Channel"}</span>
                </motion.a>
                
                <motion.button 
                  className="inline-flex items-center px-2 py-1 rounded-md bg-primary text-[10px] text-primary-foreground hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.getNotified || "Notify Me"}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}