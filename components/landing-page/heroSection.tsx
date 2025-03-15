"use client";

import React, { useEffect, useState, useRef } from "react";
import { ReactTyped } from "react-typed";
import { Button } from "../ui/button";
import { ArrowRight, Github, Linkedin, Mail, Twitter, Youtube, Sparkles, Star } from "lucide-react";
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
  
  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  useEffect(() => {
    if (!hasAnimated) {
      controls.start("visible");
      setHasAnimated(true);
    }
    
    // Generate particles on client-side only
    const generateParticles = () => {
      return Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 20 + 10
      }));
    };
    
    setParticles(generateParticles());
  }, [controls, hasAnimated]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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
        stiffness: 100,
        damping: 12
      }
    }
  };
  
  const socialIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: 1.2 + (i * 0.1), type: "spring", stiffness: 200 }
    }),
    hover: {
      scale: 1.2,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };


  return (
    <section ref={ref} className="relative overflow-hidden bg-background py-24">
      {/* Cosmic background */}
      <div className="absolute inset-0 bg-[url('/cosmic-grid.svg')] opacity-5"></div>
      
      {/* Animated floating particles - only rendered client-side */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Background glows */}
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

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <motion.div
            className="flex flex-col items-start justify-center lg:col-span-3"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center px-4 py-2 rounded-full glass-panel border border-primary/20 text-primary font-medium text-sm mb-6"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Welcome to....
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="cosmic-text text-5xl md:text-6xl font-bold pb-5 "
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
                    "I Love to Teach & Learn",
                    "A Frontend Developer",
                    "A Backend Developer",
                    "A Full-Stack Developer",
                    "A Problem Solver"
                  ]}
                  typeSpeed={80}
                  backSpeed={50}
                  loop
                  className="font-semibold"
                />
              </span>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-8 max-w-2xl"
            >
              {t.personalBio}
            </motion.p>

            <motion.div 
              variants={itemVariants} 
              className="flex flex-wrap gap-4 mb-10"
            >
              <Button asChild size="lg" className="cosmic-button">
                <Link href="#recent-posts">
                  {t.exploreMore}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "loop", 
                      duration: 1.5, 
                      ease: "easeInOut" 
                    }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.span>
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="glass-panel border-primary/20">
                <Link href="/about">
                  About Me
                </Link>
              </Button>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-medium text-muted-foreground mb-4">{t.connectWithMe}:</h3>
              <div className="flex space-x-4">
                <motion.a
                  custom={0}
                  variants={socialIconVariants}
                  whileHover="hover"
                  href="mailto:vijeetbshah@gmail.com"
                  className="cosmic-card-interactive p-3 rounded-full flex items-center justify-center h-10 w-10"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5 text-primary" />
                </motion.a>
                <motion.a
                  custom={1}
                  variants={socialIconVariants}
                  whileHover="hover"
                  href="https://www.linkedin.com/in/vijeet-shah/"
                  className="cosmic-card-interactive p-3 rounded-full flex items-center justify-center h-10 w-10"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-primary" />
                </motion.a>
                <motion.a
                  custom={2}
                  variants={socialIconVariants}
                  whileHover="hover"
                  href="https://twitter.com/vijeetshah_"
                  className="cosmic-card-interactive p-3 rounded-full flex items-center justify-center h-10 w-10"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5 text-primary" />
                </motion.a>
                <motion.a
                  custom={3}
                  variants={socialIconVariants}
                  whileHover="hover"
                  href="https://github.com/vijeet-shah/"
                  className="cosmic-card-interactive p-3 rounded-full flex items-center justify-center h-10 w-10"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5 text-primary" />
                </motion.a>
                <motion.a
                  custom={4}
                  variants={socialIconVariants}
                  whileHover="hover"
                  href="https://www.youtube.com/@vijeetshah_"
                  className="cosmic-card-interactive p-3 rounded-full flex items-center justify-center h-10 w-10"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5 text-primary" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side video with cosmic card styling */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block lg:col-span-2 cosmic-card rounded-2xl shadow-2xl overflow-hidden border border-primary/20 h-[500px] relative"
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-30 mix-blend-overlay z-10 pointer-events-none"></div>
            
            <video
              autoPlay
              muted
              loop
              playsInline
              className="object-cover object-center w-full h-full"
              preload="auto"
            >
              <source src="/vijeetshah.mp4" type="video/mp4" />
            </video>
            
            {/* Corner decorations */}
            <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-primary/30 backdrop-blur-sm border border-primary/20 flex items-center justify-center">
              <Star className="h-3 w-3 text-white" />
            </div>
            
            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs text-white font-medium">
              Full-Stack Developer
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;