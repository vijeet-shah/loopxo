"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  getClientLanguage,
  getClientTranslations,
} from "@/lib/i18n/client-utils";

export default function StorySection() {
  const currentLanguage = getClientLanguage();
  const t = getClientTranslations(currentLanguage);

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[150px] sm:w-[400px] md:w-[600px] h-[150px] sm:h-[400px] md:h-[600px] rounded-full bg-gradient-to-r from-primary/5 to-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[100px] sm:w-[250px] md:w-[400px] h-[100px] sm:h-[250px] md:h-[400px] rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/10 blur-3xl" />
      </div>

      {/* Book page styling */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 overflow-y-auto max-h-[90vh] md:max-h-screen scrollbar-hide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Book binding effect */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] sm:w-[2px] bg-gradient-to-b from-transparent via-primary/20 to-transparent transform -translate-x-1/2 hidden md:block" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 md:gap-16 items-center py-4 md:py-0">
          {/* Left side - Story content */}
          <motion.div
            className="order-2 md:order-1 p-2 sm:p-4 md:p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Decorative corner elements */}
            <div className="relative p-1 sm:p-4 md:p-8">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-5 sm:w-8 md:w-10 h-5 sm:h-8 md:h-10 border-t-[1px] sm:border-t-2 border-l-[1px] sm:border-l-2 border-primary"></div>
              <div className="absolute top-0 right-0 w-5 sm:w-8 md:w-10 h-5 sm:h-8 md:h-10 border-t-[1px] sm:border-t-2 border-r-[1px] sm:border-r-2 border-primary"></div>
              <div className="absolute bottom-0 left-0 w-5 sm:w-8 md:w-10 h-5 sm:h-8 md:h-10 border-b-[1px] sm:border-b-2 border-l-[1px] sm:border-l-2 border-primary"></div>
              <div className="absolute bottom-0 right-0 w-5 sm:w-8 md:w-10 h-5 sm:h-8 md:h-10 border-b-[1px] sm:border-b-2 border-r-[1px] sm:border-r-2 border-primary"></div>

              <motion.h2
                className="cosmic-text text-xl sm:text-2xl md:text-4xl font-bold mb-2 sm:mb-4 md:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {t.line1 || "My Journey"}
              </motion.h2>

              <motion.div
                className="prose-sm sm:prose md:prose-lg dark:prose-invert max-w-none space-y-2 sm:space-y-3 md:space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-xs sm:text-base md:text-lg">
                  {t.line2 ||
                    "After graduating in Computer Science, I started my career as a Software Engineer while also completing my Master&#39;s degree. After nearly two years in the corporate world, I transitioned to working remotely with international startups."}{" "}
                </p>
                <p className="text-xs sm:text-base md:text-lg">
                  {t.line3 ||
                    "During this time, I discovered my passion for management and product development, leading me to start my own agency, Loopxo. There, I helped clients build MVPs, websites, and digital products (SAAS), while also taking on marketing projects."}{" "}
                </p>
                <p className="text-xs sm:text-base md:text-lg">
                  {t.line4 ||
                    "Later, I founded Srilakshmi Finance, a loan business in India, after securing an RBI license. Managing both Loopxo and Srilakshmi Finance strengthened my leadership, operational, and technical skills."}{" "}
                </p>
                <p className="text-xs sm:text-base md:text-lg">
                  {t.line5 ||
                    "Today, I focus on building tech products and managing the technical side of my financial business, combining entrepreneurship, technology, and innovation."}{" "}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            className="order-1 md:order-2 p-1 sm:p-4 md:p-8 flex justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="relative w-24 h-44 sm:w-32 sm:h-56 md:w-60 md:h-[26.5rem] lg:w-72 lg:h-[32rem] rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-2xl"
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
                className="object-cover object-center"
                sizes="(max-width: 640px) 6rem, (max-width: 768px) 8rem, (max-width: 1024px) 15rem, 18rem"
                priority
              />

              {/* Caption overlay with larger text */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1 sm:p-2 md:p-4">
                <p className="text-white text-[10px] sm:text-xs md:text-sm font-medium line-clamp-1">
                  Building products that make a difference
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-[1px] sm:border-2 border-white/30 rounded-full items-center justify-center flex">
                <div className="w-2 h-2 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-primary/20 rounded-full backdrop-blur-sm"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Book edge shadow */}
      <div className="absolute top-0 bottom-0 left-0 w-4 sm:w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none hidden md:block"></div>
      <div className="absolute top-0 bottom-0 right-0 w-4 sm:w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none hidden md:block"></div>
    </div>
  );
}
