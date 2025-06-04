"use client";

import { motion } from "framer-motion";
import React from "react";

// Reusable floating decorative element
export const FloatingObject = ({ 
  delay = 0, 
  duration = 12, 
  x = 0, 
  y = 0, 
  size = "6rem", 
  children 
}: { 
  delay?: number; 
  duration?: number; 
  x?: number; 
  y?: number; 
  size?: string | number; 
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: typeof size === "string" ? size : `${size}px`,
        height: typeof size === "string" ? size : `${size}px`
      }}
      animate={{
        y: [0, -20, 0, 20, 0],
        x: [0, 15, 0, -15, 0],
        rotate: [0, 10, 0, -10, 0]
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

// Section header component with gradient underline
export const SectionHeader = ({
  overline,
  title,
  description,
  overlineIcon: Icon,
  maxWidth = "3xl"
}: {
  overline: string;
  title: React.ReactNode;
  description: string;
  overlineIcon?: React.ElementType;
  maxWidth?: string;
}) => {
  return (
    <div className="text-center mb-12 relative">
      <motion.div 
        className="inline-flex items-center justify-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <span className="h-px w-10 bg-primary"></span>
        <motion.div 
          className="mx-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium backdrop-blur-sm border border-primary/20"
          whileHover={{
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.25)"
          }}
        >
          <span className="relative flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4" />}
            <span>{overline}</span>
          </span>
        </motion.div>
        <span className="h-px w-10 bg-primary"></span>
      </motion.div>
      
      <motion.h2 
        className="text-3xl md:text-5xl font-bold mb-6 relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {title}
      </motion.h2>
      
      <motion.p 
        className={`text-lg text-muted-foreground max-w-${maxWidth} mx-auto`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {description}
      </motion.p>
    </div>
  );
};

// Feature card component
export const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description,
  colorClass = "from-blue-500 to-indigo-600" 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  colorClass?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-md"
    >
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center text-white mb-4`}>
        <Icon size={22} />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};