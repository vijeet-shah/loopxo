// components/landing-page/storySection.tsx
'use client';

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";


export default function StorySection() {


  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/5 to-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/10 blur-3xl" />
      </div>
      
      {/* Book page styling */}
      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Book binding effect */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary/20 to-transparent transform -translate-x-1/2 hidden md:block" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left side - Story content */}
          <motion.div 
            className="order-2 md:order-1 p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Decorative corner elements */}
            <div className="relative p-8 text-lg">
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary"></div>
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary"></div>
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary"></div>
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary"></div>
              
              <motion.h2 
                className="cosmic-text text-3xl sm:text-4xl font-bold mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                My Journey
              </motion.h2>
              
              <motion.div
                className="prose prose-lg dark:prose-invert max-w-none space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p>
                  My story begins with a deep passion for technology and its potential to transform lives. Growing up in a small town, I was always fascinated by how computers worked and the endless possibilities they offered.
                </p>
                
                <p>
                  After graduating with a degree in Computer Science, I embarked on a career that would take me through various roles - from software engineer to technical product manager. Each experience shaped my understanding of how great products are built.
                </p>
                
                <p>
                  What drives me is the intersection of technology and human needs. I believe the best products aren&#39;t just technically excellent - they solve real problems for real people in elegant, intuitive ways.
                </p>
                
                <p>
                  Today, I focus on bridging the gap between technical complexity and user simplicity, ensuring that the products I help create are both powerful and accessible.
                </p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right side - Image */}
          <motion.div 
            className="order-1 md:order-2 p-8 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <motion.div 
              className="relative w-full max-w-md aspect-[3/4] rounded-xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Decorative patterns */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-overlay z-10"></div>
              
              {/* Main image */}
              <Image
                src="/pro.png" 
                alt="Vijeet Shah - Professional Portrait"
                fill
                className="object-cover"
                priority
              />
              
              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white text-sm font-medium">
                  Building products that make a difference
                </p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-primary/20 rounded-full backdrop-blur-sm"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
      
      </motion.div>
      
      {/* Book edge shadow */}
      <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none hidden md:block"></div>
      <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none hidden md:block"></div>
    </div>
  );
}