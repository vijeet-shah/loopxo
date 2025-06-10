"use client";

import React, {  useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, MapPin, Check} from "lucide-react";
import { useTheme } from "next-themes";


// Benefit item component
export const BenefitItem = ({ icon: Icon, title }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div 
      className="flex items-center gap-3"
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
        theme === "dark" ? "bg-primary/20" : "bg-primary/10"
      }`}>
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <span className="text-sm text-foreground">{title}</span>
    </motion.div>
  );
};


// Define the job posting interface
interface JobPosting {
    id: string;
    title: string;
    department: string;
    location: string;
    type: "Full-time" | "Part-time" | "Contract" | "Remote";
    experience: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
    color: {
      light: string;
      dark: string;
    };
  }

export const JobCard = ({ 
    job, 
    index, 
    isExpanded, 
    toggleExpand 
  }: { 
    job: JobPosting; 
    index: number; 
    isExpanded: boolean; 
    toggleExpand: (id: string) => void; 
  }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: false, margin: "-100px 0px" });
    const controls = useAnimation();
    const { theme } = useTheme();
    
    // Color based on theme
    const colorClass = theme === "dark" ? job.color.dark : job.color.light;
    
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
            filter: "blur(10px)"
          },
          visible: { 
            opacity: 1, 
            y: 0,
            filter: "blur(0px)",
            transition: { 
              type: "spring", 
              damping: 30, 
              stiffness: 200, 
              delay: index * 0.1,
              duration: 0.8
            }
          }
        }}
        className={`relative rounded-xl overflow-hidden shadow-md border border-border backdrop-blur-sm 
          transition-all duration-300 ease-out ${isExpanded ? "my-8 scale-105 z-10" : "z-0"}`}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute inset-0 opacity-10 bg-gradient-to-r ${colorClass}`} />
          
          <motion.div 
            className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              repeatType: "mirror"
            }}
          />
        </div>
  
        {/* Job header - always visible */}
        <motion.div 
          className={`relative p-6 cursor-pointer ${isExpanded ? "bg-muted/50" : "hover:bg-muted/30"} 
            transition-all duration-300`}
          onClick={() => toggleExpand(job.id)}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            {/* Title and department */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              <div className="flex items-center mt-1">
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${colorClass} text-white`}>
                  {job.department}
                </span>
              </div>
            </div>
            
            {/* Job details in a grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
              
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-muted-foreground" />
                <span>{job.location}</span>
              </div>
  
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-muted-foreground" />
                <span>{job.type}</span>
              </div>
             
            </div>
            
            {/* Expand/collapse chevron */}
            <motion.div
              animate={{ 
                rotate: isExpanded ? 180 : 0,
                y: isExpanded ? -3 : 0
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-muted/50 text-foreground"
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </div>
        </motion.div>
  
        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: "auto", 
                opacity: 1,
                transition: {
                  height: {
                    duration: 0.4,
                    ease: [0.33, 1, 0.68, 1]
                  },
                  opacity: {
                    duration: 0.4,
                    delay: 0.1
                  }
                }
              }}
              exit={{ 
                height: 0, 
                opacity: 0,
                transition: {
                  opacity: {
                    duration: 0.2
                  },
                  height: {
                    duration: 0.3,
                    delay: 0.1,
                    ease: [0.33, 1, 0.68, 1]
                  }
                }
              }}
              className="overflow-hidden relative"
            >
              <div className="p-6 pt-2 relative">
                {/* Description */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-foreground mb-2">About the Role</h4>
                  <p className="text-muted-foreground mb-6">
                    {job.description}
                  </p>
                  
                  {/* Responsibilities */}
                  <h4 className="text-lg font-semibold text-foreground mb-2">Responsibilities</h4>
                  <ul className="space-y-2 mb-6">
                    {job.responsibilities.map((item, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: 0.1 + (i * 0.05) }
                        }}
                        className="flex items-start gap-2"
                      >
                        <Check size={18} className={`text-primary mt-0.5 min-w-[18px]`} />
                        <span className="text-muted-foreground text-sm">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  {/* Requirements */}
                  <h4 className="text-lg font-semibold text-foreground mb-2">Requirements</h4>
                  <ul className="space-y-2 mb-6">
                    {job.requirements.map((item, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: 0.1 + (i * 0.05) }
                        }}
                        className="flex items-start gap-2"
                      >
                        <Check size={18} className={`text-primary mt-0.5 min-w-[18px]`} />
                        <span className="text-muted-foreground text-sm">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  {/* Benefits */}
                  <h4 className="text-lg font-semibold text-foreground mb-2">Benefits</h4>
                  <ul className="space-y-2 mb-6">
                    {job.benefits.map((item, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: 0.1 + (i * 0.05) }
                        }}
                        className="flex items-start gap-2"
                      >
                        <Check size={18} className={`text-primary mt-0.5 min-w-[18px]`} />
                        <span className="text-muted-foreground text-sm">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                {/* Apply button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-end"
                >
                  <Link href={`/careers/${job.id}`}>
                    <motion.button
                      className={`py-2.5 px-5 rounded-lg text-sm font-medium text-white bg-gradient-to-r ${colorClass} hover:opacity-90 transition-opacity`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Apply for this position
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };