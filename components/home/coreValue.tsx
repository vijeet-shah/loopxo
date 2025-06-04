"use client";
import React, { useRef, useEffect } from "react";
import { Shield, Users, Star, TrendingUp } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// Floating decoration component
const FloatingElement = ({ delay, duration, x, y, size, children }) => {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size
      }}
      animate={{
        y: [0, -15, 0, 15, 0],
        x: [0, 10, 0, -10, 0],
        rotate: [0, 5, 0, -5, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "loop"
      }}
    >
      {children}
    </motion.div>
  );
};

const IconsMap = {
  Shield: Shield,
  Users: Users,
  Star: Star,
  TrendingUp: TrendingUp
};

const defaultValuesConfig = {
  enabled: true,
  title: 'Our Core Values',
  titleKey: 'valuesTitle',
  description: 'We are committed to excellence in everything we do.',
  descriptionKey: 'valuesDescription',
  values: [
    {
      icon: 'Shield',
      title: 'Integrity',
      titleKey: 'integrity',
      description: 'We uphold the highest standards of honesty in all our interactions.',
      descriptionKey: 'integrityDesc'
    },
    {
      icon: 'Users',
      title: 'Teamwork',
      titleKey: 'teamwork',
      description: 'Together we achieve more, supporting each other with dedication.',
      descriptionKey: 'teamworkDesc'
    },
    {
      icon: 'Star',
      title: 'Reliability',
      titleKey: 'reliability',
      description: 'Consistently delivering on our promises and maintaining stability.',
      descriptionKey: 'reliabilityDesc'
    },
    {
      icon: 'TrendingUp',
      title: 'Innovation',
      titleKey: 'innovation',
      description: 'Continuously improving our services to meet evolving needs.',
      descriptionKey: 'innovationDesc'
    }
  ]
};

// Value card component with animations
const ValueCard = ({ icon: IconName, title, description, index, primaryColorClass, primaryBgLightClass }) => {
  const Icon = IconsMap[IconName] || Shield;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.1 * index
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -10, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      className="bg-background border border-border rounded-2xl p-8 shadow-xl transition-all duration-300"
    >
      <motion.div 
        className={cn("w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg", primaryBgLightClass)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        animate={{
          boxShadow: [
            "0 0 0 rgba(255, 255, 255, 0.4)",
            "0 0 20px rgba(var(--primary-rgb), 0.3)",
            "0 0 0 rgba(255, 255, 255, 0.4)"
          ]
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }
        }}
      >
        <Icon className={cn("w-8 h-8", primaryColorClass)} />
      </motion.div>
      
      <motion.h3 
        className="text-xl font-bold mb-4 text-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 + 0.1 * index }}
      >
        {title}
        <motion.div
          className={cn("h-1 w-12 mt-2 rounded-full", primaryBgLightClass)}
          initial={{ width: 0 }}
          whileInView={{ width: "3rem" }}
          transition={{ 
            delay: 0.3 + 0.1 * index,
            duration: 0.8,
            ease: "easeInOut"
          }}
        />
      </motion.h3>
      
      <motion.p 
        className="text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 + 0.1 * index }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

interface CoreValueProps {s
  translations?: Record<string, string>;
}


export function CoreValue({ translations }: CoreValueProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10% 0px" });
  const controls = useAnimation();
  
  // Mock translation function
  const t = (key) => {
    return translations?.[key] || key;
  };
  
  // Get configurations from site config (or use defaults if not set)
  const valuesConfig = defaultValuesConfig;
  
  const primaryColorClass = "text-primary";
  const primaryBgClass = "bg-primary";
  const primaryBgLightClass = "bg-primary/10";
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  return (
    <motion.section 
      ref={sectionRef}
      className="py-28 px-6 bg-background relative overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: {
            staggerChildren: 0.2
          }
        }
      }}
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(var(--primary-rgb), 0.3) 0%, transparent 70%)",
            "radial-gradient(circle at 70% 60%, rgba(var(--primary-rgb), 0.3) 0%, transparent 70%)",
            "radial-gradient(circle at 40% 80%, rgba(var(--primary-rgb), 0.3) 0%, transparent 70%)",
            "radial-gradient(circle at 20% 30%, rgba(var(--primary-rgb), 0.3) 0%, transparent 70%)"
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
      
      {/* Floating decorative elements */}
      <FloatingElement delay={0} duration={12} x={85} y={15} size="10rem">
        <div className="w-full h-full rounded-full border border-primary/10 backdrop-blur-md bg-primary/5" />
      </FloatingElement>
      
      <FloatingElement delay={1} duration={15} x={5} y={75} size="8rem">
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-primary/10 to-primary/5 border border-primary/5" />
      </FloatingElement>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div 
          className="text-center mb-20"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <motion.div 
            className="inline-flex items-center justify-center mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              className={cn("h-px w-10", primaryBgClass)}
              initial={{ width: 0 }}
              whileInView={{ width: "2.5rem" }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
            <motion.span 
              className={cn("mx-4 text-sm font-semibold tracking-wide uppercase px-4 py-1 rounded-full", primaryColorClass, primaryBgLightClass)}
              whileHover={{
                y: -3,
                boxShadow: "0 10px 15px -3px rgba(var(--primary-rgb), 0.2)"
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Our Core Values
            </motion.span>
            <motion.span 
              className={cn("h-px w-10", primaryBgClass)}
              initial={{ width: 0 }}
              whileInView={{ width: "2.5rem" }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
          </motion.div>
          
          <motion.h2 
            className="text-4xl font-bold mb-6 text-foreground"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.2
                }
              }
            }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/70 to-primary">
              {valuesConfig.titleKey ? t(valuesConfig.titleKey) : valuesConfig.title}
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.3
                }
              }
            }}
          >
            {valuesConfig.descriptionKey ? t(valuesConfig.descriptionKey) : valuesConfig.description}
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {valuesConfig.values.map((value, index) => (
            <ValueCard 
              key={index}
              icon={value.icon}
              title={value.titleKey ? t(value.titleKey) : value.title}
              description={value.descriptionKey ? t(value.descriptionKey) : value.description}
              index={index}
              primaryColorClass={primaryColorClass} 
              primaryBgLightClass={primaryBgLightClass}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}