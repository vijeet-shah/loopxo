
"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 

  CheckSquare, 

} from "lucide-react";
import { useTheme } from "next-themes";

// Interface for service
interface UiUxService {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  color: {
    light: string;
    dark: string;
  };
}


export const ServiceCard = ({ 
    service, 
    index, 
    isExpanded, 
    toggleExpand 
  }: { 
    service: UiUxService; 
    index: number; 
    isExpanded: boolean; 
    toggleExpand: (id: string) => void; 
  }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px 0px" });
    const controls = useAnimation();
    const { theme } = useTheme();
    
    // Color based on theme
    const colorClass = theme === "dark" ? service.color.dark : service.color.light;
    const Icon = service.icon;
  
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
        className={`relative rounded-xl overflow-hidden shadow-md border border-border backdrop-blur-sm 
          transition-all duration-300 ease-out ${isExpanded ? "my-8 scale-[1.02] z-10" : "z-0"}`}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute inset-0 opacity-5 bg-gradient-to-r ${colorClass}`} />
        </div>
  
        {/* Service header - always visible */}
        <motion.div 
          className={`relative p-6 cursor-pointer ${isExpanded ? "bg-muted/50" : "hover:bg-muted/30"} 
            transition-all duration-300`}
          onClick={() => toggleExpand(service.id)}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex items-start gap-4">
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${colorClass} text-white flex-shrink-0`}>
                <Icon size={24} />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            </div>
            
            {/* Expand/collapse indicator */}
      
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
              <div className="p-6 pt-2 border-t border-border/50">
                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-foreground mb-3">Key Services</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
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
                        <CheckSquare size={18} className={`text-primary mt-0.5 min-w-[18px]`} />
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
  
                {/* Learn more link */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-end"
                >
                  <Link href={`/services/ui-ux/${service.id}`}>
                    <motion.button
                      className={`py-2 px-4 rounded-lg text-sm font-medium text-white bg-gradient-to-r ${colorClass} hover:opacity-90 transition-opacity flex items-center gap-1`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Learn more 
                      <ArrowRight size={14} />
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