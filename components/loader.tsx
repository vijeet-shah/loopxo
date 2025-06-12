'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  className?: string;
}

export default function Loader({ className = '' }: LoaderProps) {
  // Animation variants
  const fogVariants = {
    fog1: {
      x: [-20, 40, -20],
      y: [-30, 20, -30],
      rotate: [0, 180, 360],
      scale: [0.8, 1.1, 0.8],
      opacity: [0.1, 0.2, 0.1],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    fog2: {
      x: [30, -50, 30],
      y: [-20, 30, -20],
      rotate: [0, -180, 0],
      scale: [1, 0.9, 1],
      opacity: [0.15, 0.05, 0.15],
      transition: {
        duration: 25,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    fog3: {
      x: [-40, 35, -40],
      y: [25, -40, 25],
      rotate: [0, 90, 180],
      scale: [0.9, 1.2, 0.9],
      opacity: [0.08, 0.18, 0.08],
      transition: {
        duration: 30,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    fog4: {
      x: [25, -30, 25],
      y: [35, -25, 35],
      rotate: [0, -90, 0],
      scale: [1.1, 0.8, 1.1],
      opacity: [0.12, 0.22, 0.12],
      transition: {
        duration: 22,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (delay: number) => ({
      scale: 1,
      opacity: delay === 1 ? 0.8 : delay === 1.3 ? 0.6 : 0.4,
      transition: {
        duration: 1,
        delay,
        ease: "easeOut"
      }
    })
  };

  const handVariants = {
    hidden: { opacity: 0, rotate: 0 },
    visible: (isMinute: boolean) => ({
      opacity: isMinute ? 0.8 : 1,
      rotate: isMinute ? 720 : 360,
      transition: {
        duration: isMinute ? 2 : 3,
        delay: isMinute ? 2.2 : 2,
        ease: "easeOut"
      }
    })
  };

  const pulseVariants = {
    pulse: (delay: number) => ({
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        delay
      }
    })
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black ${className}`}>
      {/* Fog Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute w-96 h-96 bg-gray-800/20 rounded-full blur-3xl -top-48 -left-48"
          animate="fog1"
          variants={fogVariants}
        />
        <motion.div 
          className="absolute w-80 h-80 bg-gray-700/15 rounded-full blur-3xl -top-32 -right-40"
          animate="fog2"
          variants={fogVariants}
        />
        <motion.div 
          className="absolute w-72 h-72 bg-gray-600/10 rounded-full blur-3xl -bottom-36 -left-36"
          animate="fog3"
          variants={fogVariants}
        />
        <motion.div 
          className="absolute w-88 h-88 bg-gray-700/20 rounded-full blur-3xl -bottom-44 -right-44"
          animate="fog4"
          variants={fogVariants}
        />
      </div>

      {/* Main Logo */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Logo Text */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl font-light text-white tracking-wider">
            Loop<span className="font-bold">x</span>
            <span className="inline-block relative ml-2">
              {/* Circular O with animated clock hands */}
              <div className="w-16 h-16 md:w-20 md:h-20 relative inline-block align-middle">
                {/* Outer circle */}
                <motion.div 
                  className="absolute inset-0 border-2 border-white/80 rounded-full"
                  variants={circleVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                />
                {/* Middle circle */}
                <motion.div 
                  className="absolute inset-2 border-2 border-white/60 rounded-full"
                  variants={circleVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1.3}
                />
                {/* Inner circle */}
                <motion.div 
                  className="absolute inset-4 border-2 border-white/40 rounded-full"
                  variants={circleVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1.6}
                />
                
                {/* Clock center dot */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.5, duration: 1, ease: "easeOut" }}
                />
                
                {/* Hour hand (shorter, thicker) */}
                <motion.div 
                  className="absolute w-0.5 bg-white transform -translate-x-1/2"
                  style={{ 
                    height: '1rem', 
                    transformOrigin: '50% 100%', 
                    top: 'calc(50% - 1rem)',
                    left: '50%'
                  }}
                  variants={handVariants}
                  initial="hidden"
                  animate="visible"
                  custom={false}
                />
                
                {/* Minute hand (longer, thinner) */}
                <motion.div 
                  className="absolute w-0.5 bg-white/80 transform -translate-x-1/2"
                  style={{ 
                    height: '1.5rem', 
                    transformOrigin: '50% 100%', 
                    top: 'calc(50% - 1.5rem)',
                    left: '50%'
                  }}
                  variants={handVariants}
                  initial="hidden"
                  animate="visible"
                  custom={true}
                />
                
              </div>
            </span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.div 
          className="text-gray-400 text-sm font-light tracking-widest mb-16 uppercase"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3, ease: "easeOut" }}
        >
          Digital Software Agency
        </motion.div>

        {/* Loading Dots */}
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1, ease: "easeOut" }}
        >
          <div className="flex space-x-2">
            <motion.div 
              className="w-1.5 h-1.5 bg-white rounded-full"
              variants={pulseVariants}
              animate="pulse"
              custom={0}
            />
            <motion.div 
              className="w-1.5 h-1.5 bg-white rounded-full"
              variants={pulseVariants}
              animate="pulse"
              custom={0.2}
            />
            <motion.div 
              className="w-1.5 h-1.5 bg-white rounded-full"
              variants={pulseVariants}
              animate="pulse"
              custom={0.4}
            />
          </div>
          <div className="text-gray-500 text-xs font-mono tracking-wide">
            Loading
          </div>
        </motion.div>
      </div>

      {/* Corner accents */}
      <motion.div 
        className="absolute top-8 left-8 w-8 h-8 border-t border-l border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}