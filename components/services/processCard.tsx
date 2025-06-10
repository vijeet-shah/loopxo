"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

// Process step card component
interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

export default function ProcessCard({ step, index }: { step: ProcessStep, index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px 0px" });
  const controls = useAnimation();
  

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { 
          opacity: 0, 
          y: 50,
          filter: "blur(5px)"
        },
        visible: { 
          opacity: 1, 
          y: 0,
          filter: "blur(0px)",
          transition: { 
            type: "spring", 
            damping: 25, 
            stiffness: 100, 
            delay: index * 0.1,
            duration: 0.6
          }
        }
      }}
      className="border border-border rounded-xl overflow-hidden flex flex-col h-full bg-card"
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-cyan-600"></div>
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center">
            <span className="text-4xl font-bold text-muted-foreground/50 mr-2">{step.id}</span>
            <h3 className="text-lg font-semibold ml-3 text-foreground">{step.title}</h3>
          </div>
        </div>
        <p className="text-muted-foreground flex-grow">{step.description}</p>
      </div>
    </motion.div>
  );
};




export const CommunicationCard = ({ tool, index }: { tool: any, index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px 0px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-card rounded-lg p-6 border border-border hover:border-purple-500/50 transition-colors"
    >
      <div className="flex items-center gap-3 mb-3">
        <h3 className="font-semibold text-foreground">{tool.title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{tool.description}</p>
    </motion.div>
  );
};