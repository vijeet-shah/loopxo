'use client';

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Play, Film, Youtube, Code } from "lucide-react";

// Full YouTube URLs for vlogs
const vlogLinks = [
  "https://youtu.be/bGIPH-7NR-w?si=5oLI0noae9JUtkrH",
  "https://youtu.be/g-0NXx36Tuk?si=Uy3rRN1bho0AvFW1",
  "https://youtu.be/RTBnVSfV1LM?si=IYEP5qxkQkOIRHeq",
  "https://www.youtube.com/watch?v=PGl-2cD8g2E"
];

export default function YoutubeSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const vlogCarouselRef = useRef<HTMLDivElement | null>(null);
  
  const scrollLeft = () => {
    if (vlogCarouselRef.current) {
      vlogCarouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (vlogCarouselRef.current) {
      vlogCarouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-background py-12 px-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-red-500/5 to-primary/10 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/10 blur-3xl" />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-primary flex items-center justify-center mb-4 md:mb-0">
            <Youtube className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-bold">My YouTube Channel</h2>
            <p className="text-muted-foreground mt-2">Check out my latest videos</p>
          </div>
          <a 
            href="https://youtube.com/@vijeet_" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 px-6 py-3 rounded-lg bg-red-600 text-white font-medium flex items-center space-x-2 hover:bg-red-700 transition-colors self-start"
          >
            <Youtube className="h-5 w-5 mr-2" />
            <span>Subscribe</span>
          </a>
        </div>

        {/* Video categories */}
        <div className="space-y-12">
          {/* Vlog Videos Section */}
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <Film className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-medium">Fun & Vlog Videos</h3>
              
              <div className="flex space-x-2 ml-auto">
                <button
                  onClick={scrollLeft}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 dark:bg-black/20 border border-white/20 text-primary"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={scrollRight}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 dark:bg-black/20 border border-white/20 text-primary"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Vlog Videos Carousel */}
            <div 
              ref={vlogCarouselRef}
              className="flex overflow-x-auto space-x-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {vlogLinks.map((url, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[300px] cursor-pointer border border-primary/10 rounded-lg overflow-hidden hover:border-primary/30 transition-colors hover:shadow-md"
                  onClick={() => setActiveVideo(url)}
                >
                  <div className="relative aspect-video bg-black/80 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-80 bg-gradient-to-br from-black/20 to-black/60"></div>
                    <Play className="h-12 w-12 text-primary" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium">Vlog Video {index + 1}</h4>
                    <div className="text-xs text-muted-foreground mt-1 truncate">
                      {url}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Technical Videos Section */}
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <Code className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-medium">Technical Content</h3>
            </div>
            
            {/* Coming Soon Message */}
            <div className="border border-primary/10 rounded-lg p-8 bg-muted/5 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted/20 flex items-center justify-center mb-4">
                <Youtube className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <h4 className="text-xl font-medium mb-2">Coming Soon</h4>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Technical tutorials and coding videos are in production. 
                Subscribe to my channel to be notified when new content is released!
              </p>
              <motion.button 
                className="mt-6 px-6 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
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
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${
                  activeVideo.includes('v=') 
                    ? activeVideo.split('v=')[1].split('&')[0] 
                    : activeVideo.split('/').pop()?.split('?')[0]
                }`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}