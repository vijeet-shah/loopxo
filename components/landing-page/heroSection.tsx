"use client";

import React, { useEffect, useState, useRef } from "react";
import { ReactTyped } from "react-typed";
import { Button } from "../ui/button";
import { ArrowRight, Github, Linkedin, Mail, Twitter, Youtube, Sparkles, BookOpen, ChevronDown } from "lucide-react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/client-utils";

const HeroSection = () => {
  interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
  }

  const { t } = useTranslation();
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  
  // Fix for hydration mismatch - initialize particles as empty array
  const [particles, setParticles] = useState<Particle[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  // Enhanced parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  
  useEffect(() => {
    if (!hasAnimated) {
      controls.start("visible");
      setHasAnimated(true);
    }
    
    // Generate particles on client-side only with improved variation
    const generateParticles = () => {
      return Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 20 + 10
      }));
    };
    
    setParticles(generateParticles());
  }, [controls, hasAnimated]);
  
  // Refined animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14
      }
    }
  };
  
  const socialIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: 1.0 + (i * 0.08), type: "spring", stiffness: 220 }
    }),
    hover: {
      scale: 1.15,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };



  return (
    <section ref={ref} className="relative overflow-hidden bg-background min-h-screen flex items-center ">
      {/* Enhanced cosmic background */}
      <div className="absolute inset-0 bg-[url('/cosmic-grid.svg')] opacity-8"></div>
      
      {/* Improved animated floating particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30 backdrop-blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Enhanced background glows */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "mirror"
        }}
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
      />
      
      {/* New decorative element */}
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 6, 
          delay: 2,
          repeat: Infinity,
          repeatType: "mirror"
        }}
        className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left content section - now spans 7 columns for better balance */}
          <motion.div
            className="flex flex-col items-start justify-center lg:col-span-7"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            style={{ scale }}
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center px-4 py-2 rounded-full glass-panel border border-primary/30 text-primary font-medium text-sm mb-6 backdrop-blur-sm shadow-sm"
            >
              <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
              Welcome to my blog
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="cosmic-text text-5xl md:text-6xl lg:text-7xl font-bold pb-5 tracking-tight"
            >
              {t.heroTitle}
            </motion.h1>
            
            <motion.div 
              variants={itemVariants}
              className="text-2xl md:text-3xl font-medium text-primary mb-8"
            >
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                <ReactTyped
                  strings={[
                    "I Write About Tech",
                    "I Share My Knowledge",
                    "I Document My Journey",
                    "I Explore Ideas",
                    "I Solve Problems"
                  ]}
                  typeSpeed={70}
                  backSpeed={50}
                  loop
                  className="font-semibold"
                />
              </span>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
            >
              {t.personalBio}
            </motion.p>

            {/* Enhanced buttons with better spacing and hover effects */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-wrap gap-5 mb-12"
            >
              <Button 
                asChild 
                size="lg" 
                className="cosmic-button group px-6 py-6 h-auto text-base"
              >
                <Link href="#recent-posts" className="flex items-center">
                  Latest Articles
                  <motion.span
                    className="group-hover:translate-x-1 transition-transform"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "loop", 
                      duration: 1.5, 
                      ease: "easeInOut" 
                    }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.span>
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="glass-panel border-primary/30 backdrop-blur-sm hover:bg-primary/10 px-6 py-6 h-auto text-base transition-all duration-300"
              >
                <Link href="/categories" className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Categories
                </Link>
              </Button>
            </motion.div>
            
            {/* Enhanced social links section */}
            <motion.div variants={itemVariants} className="space-y-5">
              <h3 className="text-sm font-medium text-muted-foreground">{t.connectWithMe}:</h3>
              <div className="flex space-x-5">
                {[
                  { icon: Mail, href: "mailto:vijeetbshah@gmail.com", label: "Email" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/vijeet-shah/", label: "LinkedIn" },
                  { icon: Twitter, href: "https://twitter.com/vijeetshah_", label: "Twitter" },
                  { icon: Github, href: "https://github.com/vijeet-shah/", label: "GitHub" },
                  { icon: Youtube, href: "https://www.youtube.com/@vijeetshah_", label: "YouTube" }
                ].map((social, i) => (
                  <motion.a
                    key={social.label}
                    custom={i}
                    variants={socialIconVariants}
                    whileHover="hover"
                    href={social.href}
                    className="cosmic-card-interactive p-3 rounded-full flex items-center justify-center h-12 w-12 shadow-md border border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-colors"
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-primary" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right side video with enhanced cosmic card styling - now spans 5 columns */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block lg:col-span-5 cosmic-card rounded-2xl shadow-2xl overflow-hidden border border-primary/30 h-[540px] relative"
          >
            {/* Enhanced decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-40 mix-blend-overlay z-10 pointer-events-none"></div>
            
            {/* Video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="object-cover object-center w-full h-full scale-105 transition-transform duration-10000 hover:scale-110"
              preload="auto"
            >
              <source src="/vijeetshah.mp4" type="video/mp4" />
            </video>
            
            {/* Blog-related corner decorations */}
            <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-primary/40 backdrop-blur-sm border border-primary/30 flex items-center justify-center shadow-lg text-white text-sm">
              New post every week
            </div>
            
            <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-sm text-white font-medium shadow-lg">
              Tech blogger & Developer
            </div>
            
            {/* Featured posts indicator */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/30 backdrop-blur-sm border border-primary/40 text-xs text-white flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
              100+ articles
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial="initial"
          animate="animate"
          
        >
          <span className="text-muted-foreground text-sm mb-2">Scroll for latest posts</span>
          <ChevronDown className="h-5 w-5 text-primary" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;