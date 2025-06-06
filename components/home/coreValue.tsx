"use client";
import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
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
      image: '/assets/v1.jpeg',
      title: 'Integrity',
      titleKey: 'integrity',
      description: 'Transparency and ethical excellence form the cornerstone of our identity. We operate with unwavering moral standards, fostering deep trust through authentic communication, complete accountability, and honest dealings in every interaction.',
      descriptionKey: 'integrityDescription',
      color: 'from-blue-500 to-indigo-600',
      accent: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      image: '/assets/v2.jpeg',
      title: 'Collaboration',
      titleKey: 'collaboration',
      description: 'Our greatest triumphs emerge from the synergy of collective brilliance. We cultivate an environment where diverse perspectives converge, knowledge flows freely, and individual strengths unite to create extraordinary outcomes that exceed expectations.',
      descriptionKey: 'collaborationDescription',
      color: 'from-emerald-500 to-teal-600',
      accent: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      image: '/assets/v3.jpeg',
      title: 'Reliability',
      titleKey: 'reliability',
      description: 'Consistency is our signature. We deliver unwavering performance, maintaining the highest standards of dependability. Our commitment to reliability means you can confidently rely on us to exceed expectations, every single time.',
      descriptionKey: 'reliabilityDescription',
      color: 'from-purple-500 to-violet-600',
      accent: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      image: '/assets/v4.jpeg',
      title: 'Innovation',
      titleKey: 'innovation',
      description: 'We are pioneers in an ever-evolving landscape, continuously pushing boundaries to redefine what\'s possible. Our relentless pursuit of innovation drives us to anticipate tomorrow\'s challenges and deliver cutting-edge solutions that transform industries.',
      descriptionKey: 'innovationDescription',
      color: 'from-orange-500 to-red-600',
      accent: 'bg-orange-500/10 border-orange-500/20'
    }
  ]
};

// Define interface for ValueCard props
interface ValueCardProps {
  value: {
    image: string;
    title: string;
    titleKey: string;
    description: string;
    descriptionKey: string;
    color: string;
    accent: string;
  };
  index: number;
  isActive: boolean;
  t: Record<string, string>;
}

// Optimized Value card with reduced animations
const ValueCard = React.memo(({ value, index, isActive, t }: ValueCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Memoize transition configs
  const hoverTransition = useMemo(() => ({
    type: "spring",
    stiffness: 300,
    damping: 25
  }), []);

  const baseTransition = useMemo(() => ({
    duration: 0.4,
    ease: [0.25, 0.46, 0.45, 0.94]
  }), []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isActive ? 1 : 0.8, 
        y: 0,
        scale: isActive ? 1 : 0.98
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: hoverTransition
      }}
      transition={baseTransition}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border rounded-2xl overflow-hidden shadow-xl transition-all duration-300 group cursor-pointer",
        value.accent,
        isActive ? "ring-1 ring-primary/30" : ""
      )}
    >
      {/* Static gradient overlay */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-5", value.color)} />
      
      {/* Optimized Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          width={400}
          height={300}
          src={value.image} 
          alt={t[value.titleKey] || value.title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered ? "scale-105" : "scale-100"
          )}
        />
        
        {/* Simplified overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        
        {/* Static number indicator */}
        <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
          <span className="text-white font-semibold text-sm">{index + 1}</span>
        </div>
      </div>
      
      {/* Simplified Content Section */}
      <div className="p-6 relative">
        <div className={cn("absolute top-0 left-6 w-12 h-0.5 rounded-full bg-gradient-to-r", value.color)} />
        
        <h3 className="text-xl font-bold mb-3 text-foreground pt-3">
          <span className={cn("bg-clip-text text-transparent bg-gradient-to-r", value.color)}>
            {t[value.titleKey] || value.title}
          </span>
        </h3>
        
        <p className="text-muted-foreground leading-relaxed text-sm ">
          {t[value.descriptionKey] || value.description}
        </p>
        
        {/* Simple hover element */}
       
      </div>
    </motion.div>
  );
});

ValueCard.displayName = "ValueCard";

export function CoreValue() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });
  const controls = useAnimation();
  
  // Optimized carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  
  const valuesConfig = useMemo(() => defaultValuesConfig, []);
  
  // Optimized auto-play with proper cleanup
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % valuesConfig.values.length);
    }, 5000); // Increased interval for better UX
    
    return () => clearInterval(interval);
  }, [isAutoPlay, valuesConfig.values.length]);
  
  // Simplified animation trigger
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Pause autoplay on hover
  const handleMouseEnter = useCallback(() => {
    setIsAutoPlay(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsAutoPlay(true);
  }, []);

  // Memoize animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }), []);

  return (
    <motion.section 
      ref={sectionRef}
      className="py-20 px-6 bg-gradient-to-br from-background via-background to-primary/3 relative overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Simplified background animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-50" />
      
      {/* Reduced floating particles */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full"
          animate={{
            y: [-20, -100, -20],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 3,
            ease: "linear"
          }}
          style={{
            left: `${20 + i * 30}%`,
            top: `${80}%`
          }}
        />
      ))}

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Optimized Header */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.div 
            className="inline-flex items-center justify-center mb-6"
            variants={itemVariants}
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent" />
            
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-8 text-foreground leading-tight max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/80">
              {t[valuesConfig.titleKey] || valuesConfig.title}
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {t[valuesConfig.descriptionKey] || valuesConfig.description}
          </motion.p>
        </motion.div>
        
        {/* Optimized Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={itemVariants}
        >
          {valuesConfig.values.map((value, index) => (
            <ValueCard 
              key={index}
              value={value}
              index={index}
              isActive={index === currentIndex}
              t={t}
            />
          ))}
        </motion.div>
        
       
      </div>
    </motion.section>
  );
}