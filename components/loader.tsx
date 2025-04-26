'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePositionRef = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Simulate loading progress
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        const increment = prev < 50 ? 1 : prev < 80 ? 2 : 3;
        const newProgress = Math.min(prev + increment, 100);
        
        if (newProgress >= 100) {
          setTimeout(() => {
            setIsLoading(false);
            // Call onComplete callback when loading is done
            if (onComplete) onComplete();
          }, 800);
          clearInterval(intervalRef.current as NodeJS.Timeout);
        }
        
        return newProgress;
      });
    }, 40);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with DPI correction
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    setCanvasSize();

    // Draw name function
    const drawName = () => {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      
      const fontSize = Math.min(100, window.innerWidth / 10);
      ctx.font = `bold ${fontSize}px 'Georgia', serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Draw the name
      const text = 'Vijeet Shah';
      const centerX = (canvas.width / dpr) / 2;
      const centerY = (canvas.height / dpr) / 2;
      
      // Get mouse position
      const { x: mouseX, y: mouseY } = mousePositionRef.current;
      
      // Calculate distortion for each letter
      const letters = text.split('');
      const letterSpacing = fontSize * 0.6;
      const totalWidth = letterSpacing * (letters.length - 1);
      const startX = centerX - totalWidth / 2;
      
      letters.forEach((letter, i) => {
        const letterX = startX + i * letterSpacing;
        
        // Calculate distance to mouse
        const dx = mouseX - letterX;
        const dy = mouseY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Apply distortion if mouse is close
        let distortedX = letterX;
        let distortedY = centerY;
        let color = 'white';
        
        if (distance < 200) {
          const force = (200 - distance) / 200;
          const angle = Math.atan2(dy, dx);
          const repelX = Math.cos(angle) * force * 40;
          const repelY = Math.sin(angle) * force * 40;
          
          distortedX = letterX - repelX;
          distortedY = centerY - repelY;
          
          // Change color based on distance
          const r = 255;
          const g = Math.floor(153 + force * 102);
          const b = Math.floor(force * 255);
          color = `rgb(${r}, ${g}, ${b})`;
        }
        
        // Draw letter with glow effect
        ctx.save();
        
        if (distance < 200) {
          ctx.shadowColor = 'rgba(255, 153, 0, 0.7)';
          ctx.shadowBlur = 15;
        } else {
          ctx.shadowColor = 'rgba(66, 153, 225, 0.3)';
          ctx.shadowBlur = 5;
        }
        
        ctx.fillStyle = color;
        ctx.fillText(letter, distortedX, distortedY);
        ctx.restore();
      });
      
      // Add hint text
      ctx.font = '14px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillText('Move your cursor to interact', centerX, centerY + fontSize);
      
      // Request next frame
      animationFrameRef.current = requestAnimationFrame(drawName);
    };
    
    // Start animation
    drawName();
    
    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { 
        x: e.clientX, 
        y: e.clientY 
      };
    };
    
    const handleMouseLeave = () => {
      mousePositionRef.current = { x: -1000, y: -1000 };
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault();
        mousePositionRef.current = { 
          x: e.touches[0].clientX, 
          y: e.touches[0].clientY 
        };
      }
    };
    
    const handleResize = () => {
      setCanvasSize();
    };
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
          }}
        >
          {/* Canvas for text effect */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 touch-none"
            aria-label="Interactive text effect with Vijeet Shah"
          />
          
          {/* Progress indicator */}
          <div className="relative z-10 mt-auto mb-16">
            <div className="w-64 h-0.5 bg-gray-800 mb-2 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-blue-400 to-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400 text-sm mt-2 font-mono text-center"
            >
              {progress === 100 ? (
                <span className="text-primary">Ready</span>
              ) : (
                <span>Loading {progress}%</span>
              )}
            </motion.div>
          </div>
          
          {/* Corner decorations */}
          <div className="absolute top-10 left-10 w-16 h-16 border-t border-l border-primary/50"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 border-b border-r border-primary/50"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}