"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/client-utils";
import Image from "next/image";

const defaultValuesConfig = {
  enabled: true,
  title: 'Our Core Values',
  titleKey: 'valuesTitle',
  description: "At the heart of our organization lies a set of unwavering principles that define who we are and guide every decision we make. These values aren't merely words on a wall—they're the DNA of our success, the promise we uphold with every client interaction, and the foundation upon which we build lasting partnerships.",
  descriptionKey: 'valuesDescription',
  values: [
    {
      image: '/images/values/integrity.jpg',
      title: 'Integrity',
      titleKey: 'integrity',
      description: 'Transparency and ethical excellence form the cornerstone of our identity. We operate with unwavering moral standards, fostering deep trust through authentic communication, complete accountability, and honest dealings in every interaction.',
      descriptionKey: 'integrityDescription',
      color: 'from-blue-500 to-indigo-600',
      accent: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      image: '/images/values/teamwork.jpg',
      title: 'Collaboration',
      titleKey: 'collaboration',
      description: 'Our greatest triumphs emerge from the synergy of collective brilliance. We cultivate an environment where diverse perspectives converge, knowledge flows freely, and individual strengths unite to create extraordinary outcomes that exceed expectations.',
      descriptionKey: 'collaborationDescription',
      color: 'from-emerald-500 to-teal-600',
      accent: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      image: '/images/values/reliability.jpg',
      title: 'Reliability',
      titleKey: 'reliability',
      description: 'Consistency is our signature. We deliver unwavering performance, maintaining the highest standards of dependability. Our commitment to reliability means you can confidently rely on us to exceed expectations, every single time.',
      descriptionKey: 'reliabilityDescription',
      color: 'from-purple-500 to-violet-600',
      accent: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      image: '/images/values/innovation.jpg',
      title: 'Innovation',
      titleKey: 'innovation',
      description: 'We are pioneers in an ever-evolving landscape, continuously pushing boundaries to redefine what\'s possible. Our relentless pursuit of innovation drives us to anticipate tomorrow\'s challenges and deliver cutting-edge solutions that transform industries.',
      descriptionKey: 'innovationDescription',
      color: 'from-orange-500 to-red-600',
      accent: 'bg-orange-500/10 border-orange-500/20'
    }
  ]
};

// Enhanced Value card with premium design
const ValueCard = ({ value, index, isActive, t }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ 
        opacity: isActive ? 1 : 0.7, 
        y: 0, 
        scale: isActive ? 1 : 0.95,
        filter: isActive ? "blur(0px)" : "blur(1px)"
      }}
      whileHover={{ 
        y: -15, 
        scale: 1.02,
        boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3)",
        filter: "blur(0px)",
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={cn(
        "relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 group cursor-pointer",
        value.accent,
        isActive ? "ring-2 ring-primary/20" : ""
      )}
    >
      {/* Gradient Overlay */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-5", value.color)} />
      
      {/* Professional Image Container */}
      <motion.div 
        className="relative h-64 w-full overflow-hidden"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.4 }}
      >
        <Image
          width={400}
          height={300}
          src={value.image} 
          alt={t[value.titleKey] || value.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        />
        
        {/* Dynamic overlay */}
        <motion.div 
          className={cn("absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent")}
          initial={{ opacity: 0.3 }}
          whileHover={{ opacity: 0.6 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Floating number indicator */}
        <motion.div
          className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center"
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-white font-bold text-lg">{index + 1}</span>
        </motion.div>
        
        {/* Animated corner accent */}
        <motion.div
          className="absolute top-6 right-6 w-3 h-3 rounded-full bg-white/80"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      </motion.div>
      
      {/* Enhanced Content Section */}
      <div className="p-8 relative">
        <motion.div
          className={cn("absolute top-0 left-8 w-16 h-1 rounded-full bg-gradient-to-r", value.color)}
          initial={{ width: 0 }}
          whileInView={{ width: "4rem" }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
        
        <motion.h3 
          className="text-2xl font-bold mb-4 text-foreground pt-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className={cn("bg-clip-text text-transparent bg-gradient-to-r", value.color)}>
            {t[value.titleKey] || value.title}
          </span>
        </motion.h3>
        
        <motion.p 
          className="text-muted-foreground leading-relaxed text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {t[value.descriptionKey] || value.description}
        </motion.p>
        
        {/* Interactive hover element */}
        <motion.div
          className={cn("mt-6 inline-flex items-center text-sm font-medium bg-gradient-to-r bg-clip-text text-transparent", value.color)}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1, x: 5 }}
          transition={{ duration: 0.3 }}
        >
          Learn More →
        </motion.div>
      </div>
    </motion.div>
  );
};



export function CoreValue() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10% 0px" });
  const controls = useAnimation();
  
  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const isPlaying = true;
  
  const valuesConfig = defaultValuesConfig;
  
  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % valuesConfig.values.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, valuesConfig.values.length]);
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  

  
  return (
    <motion.section 
      ref={sectionRef}
      className=" px-6 bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: {
            staggerChildren: 0.3
          }
        }
      }}
    >
      {/* Enhanced animated background */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)",
            "radial-gradient(circle at 80% 70%, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)",
            "radial-gradient(circle at 40% 90%, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)",
            "radial-gradient(circle at 20% 30%, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)"
          ]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
      
      {/* Floating particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5
          }}
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`
          }}
        />
      ))}

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-20"
          variants={{
            hidden: { opacity: 0, y: -30 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <motion.div 
            className="inline-flex items-center justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              transition={{ delay: 0.2, duration: 1 }}
            />
            <motion.span 
              className="mx-8 text-sm font-bold tracking-widest uppercase px-8 py-3 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-primary backdrop-blur-sm"
              whileHover={{
                y: -4,
                boxShadow: "0 20px 40px -12px rgba(var(--primary-rgb), 0.35)",
                scale: 1.05
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {t[valuesConfig.titleKey] || "Our Core Values"}
            </motion.span>
            <motion.span 
              className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              transition={{ delay: 0.2, duration: 1 }}
            />
          </motion.div>
          
          <motion.h2 
            className="text-6xl font-bold mb-10 text-foreground leading-tight max-w-4xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                  delay: 0.3
                }
              }
            }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/80">
              {t[valuesConfig.titleKey] || valuesConfig.title}
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                  delay: 0.5
                }
              }
            }}
          >
            {t[valuesConfig.descriptionKey] || valuesConfig.description}
          </motion.p>
        </motion.div>
        
        {/* Enhanced Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <AnimatePresence mode="wait">
            {valuesConfig.values.map((value, index) => (
              <ValueCard 
                key={index}
                value={value}
                index={index}
                isActive={index === currentIndex}
                t={t}
              />
            ))}
          </AnimatePresence>
        </div>
        
        {/* Enhanced Carousel Controls */}
       
       
      </div>
    </motion.section>
  );
}