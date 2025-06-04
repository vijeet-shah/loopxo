"use client"

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

// Service items data structure
const serviceItems = [
  {
    id: "01",
    title: "UI-UX Design",
    description: "We focus on creating visually appealing and user-friendly interfaces that significantly enhance engagement and user satisfaction. By focusing on intuitive design elements, we help create seamless experiences that keep users engaged.",
    icon: "/images/icons/design.svg",
    color: {
      light: "from-purple-500 to-indigo-600",
      dark: "from-purple-400 to-indigo-500"
    }
  },
  {
    id: "02",
    title: "Mobile Apps",
    description: "We specialize in the development of innovative and user-friendly mobile applications for both iOS and Android platforms. Our process encompasses every stage, from initial concept and design to final deployment.",
    icon: "/images/icons/mobile.svg",
    color: {
      light: "from-blue-500 to-cyan-400",
      dark: "from-blue-400 to-cyan-300"
    }
  },
  {
    id: "03",
    title: "Backend Development",
    description: "We specialize in delivering responsive, secure, and user-friendly web solutions designed to enhance your online presence. Our approach ensures that your website not only meets modern standards but also promotes business growth.",
    icon: "/images/icons/backend.svg",
    color: {
      light: "from-emerald-500 to-green-400",
      dark: "from-emerald-400 to-green-300"
    }
  },
  {
    id: "04",
    title: "Frontend Development",
    description: "We offer expertly crafted website designs that combine aesthetics with functionality, tailored to your brand's unique identity. Our designs prioritize user experience and seamless navigation, ensuring a visually engaging and intuitive interface.",
    icon: "/images/icons/frontend.svg",
    color: {
      light: "from-orange-500 to-amber-400",
      dark: "from-orange-400 to-amber-300"
    }
  },
  {
    id: "05",
    title: "Artificial Intelligence",
    description: "We focus on harnessing the power of AI to seamlessly integrate information, transforming data into actionable insights that drive intelligent decision-making. By connecting the dots across complex data sets, AI empowers organizations to make informed, strategic choices with precision.",
    icon: "/images/icons/ai.svg",
    color: {
      light: "from-rose-500 to-pink-400",
      dark: "from-rose-400 to-pink-300"
    }
  },
  {
    id: "06",
    title: "Data Analysis & Data science",
    description: "We excel at uncovering narratives within your data by leveraging advanced visualizations, actionable insights, and precise forecasting, thereby empowering strategic decision-making. Our approach ensures a comprehensive understanding of data-driven trends and patterns.",
    icon: "/images/icons/data.svg",
    color: {
      light: "from-blue-600 to-indigo-500",
      dark: "from-blue-500 to-indigo-400"
    }
  },
  {
    id: "07",
    title: "Managed Cloud & DevOps",
    description: "We specialize in optimizing your cloud infrastructure and streamlining operations through Managed Cloud and DevOps services. By integrating automation, continuous monitoring, and agile methodologies, we enhance scalability, security, and performance.",
    icon: "/images/icons/cloud.svg",
    color: {
      light: "from-cyan-500 to-teal-400",
      dark: "from-cyan-400 to-teal-300"
    }
  }
];

// Interface for service item
interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: {
    light: string;
    dark: string;
  };
}

// Individual Service Card Component
const ServiceCard = ({ 
  service, 
  index, 
  isExpanded, 
  toggleExpand, 
  theme 
}: { 
  service: ServiceItem; 
  index: number; 
  isExpanded: boolean; 
  toggleExpand: (id: string) => void; 
  theme: string | undefined;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: "-100px 0px" });
  const controls = useAnimation();
  
  // Color based on theme
  const colorClass = theme === "dark" ? service.color.dark : service.color.light;
  
  // Animation for particles in expanded state
  const particleCount = 10;
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    size: Math.random() * 6 + 2
  }));

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
          y: 80,
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
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "shadow-lg",
        "transition-all duration-300 ease-out",
        isExpanded ? "my-8 scale-105 z-10" : "z-0",
        "backdrop-blur-sm border border-border"
      )}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={cn(
          "absolute inset-0 opacity-10",
          "bg-gradient-to-r",
          colorClass
        )} />
        
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

      {/* Service header - always visible */}
      <motion.div 
        className={cn(
          "relative p-6 md:p-8 cursor-pointer",
          "flex items-start justify-between gap-4",
          "transition-all duration-300",
          isExpanded ? "bg-muted/50 backdrop-blur-md" : "hover:bg-muted/30"
        )}
        onClick={() => toggleExpand(service.id)}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="flex items-start gap-5">
          {/* Numbered icon */}
          <motion.div 
            className={cn(
              "relative flex items-center justify-center",
              "w-14 h-14 rounded-lg overflow-hidden",
              "bg-gradient-to-br",
              colorClass,
              "shadow-lg text-white font-bold text-lg"
            )}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, 2, -2, 0],
              transition: {
                rotate: {
                  repeat: 1,
                  duration: 0.3
                }
              }
            }}
          >
            {service.id}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{ 
                opacity: [0, 0.1, 0],
                scale: [1, 1.5],
                transition: { 
                  duration: 1,
                  repeat: Infinity
                }
              }}
            />
          </motion.div>
          
          {/* Title and glowing dot */}
          <div className="pt-1 flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                {service.title}
              </h3>
              <motion.div
                className={cn(
                  "w-2 h-2 rounded-full",
                  "bg-gradient-to-r",
                  colorClass
                )}
                animate={{
                  boxShadow: [
                    `0 0 0 rgba(255,255,255,0)`,
                    `0 0 8px rgba(255,255,255,0.5)`,
                    `0 0 0 rgba(255,255,255,0)`
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            </div>
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
            <div className="p-8 pt-2 relative">
              {/* Animated particles for expanded state */}
              {particles.map(particle => (
                <motion.div
                  key={particle.id}
                  className={cn(
                    "absolute rounded-full",
                    "bg-gradient-to-r",
                    colorClass,
                    "opacity-20 blur-sm"
                  )}
                  style={{
                    width: particle.size,
                    height: particle.size,
                    left: `${particle.initialX}%`,
                    top: `${particle.initialY}%`,
                  }}
                  animate={{
                    x: [0, Math.random() * 40 - 20, 0],
                    y: [0, Math.random() * 40 - 20, 0],
                    scale: [1, Math.random() * 0.5 + 1, 1],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{
                    duration: Math.random() * 4 + 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              ))}
              
              {/* Description */}
              <motion.p 
                className="text-muted-foreground mt-4 mb-6 leading-relaxed relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.2, duration: 0.4 }
                }}
              >
                {service.description}
              </motion.p>
              
              {/* "Learn more" link */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: 0.3, duration: 0.4 }
                }}
              >
                <Link 
                  href={`/services/${service.id.toLowerCase()}`}
                  className={cn(
                    "inline-flex items-center gap-2",
                    "py-2 px-4 rounded-lg",
                    "bg-gradient-to-r bg-opacity-10",
                    colorClass,
                    "text-foreground font-medium",
                    "hover:bg-opacity-20 transition-all",
                    "group relative overflow-hidden"
                  )}
                >
                  <span className="relative z-10">Explore {service.title}</span>
                  <motion.div
                    className="relative z-10"
                    animate={{ 
                      x: [0, 5, 0],
                      transition: {
                        duration: 1.2,
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 0.5
                      }
                    }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                  
                  {/* Hover animation */}
                  <motion.div 
                    className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-100",
                      "bg-gradient-to-r",
                      colorClass
                    )}
                    initial={{ x: "-100%" }}
                    whileHover={{ 
                      x: "100%",
                      transition: { duration: 0.8 }
                    }}
                  />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Decorative floating objects
const FloatingObject = ({ delay, duration, x, y, size, children }) => {
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

// Main component
export function ServiceSection() {
  const [expandedId, setExpandedId] = useState(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10% 0px" });
  const controls = useAnimation();
  const { theme } = useTheme();

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // 3D Tilt effect on mouse move
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    // Center coordinates
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Mouse coordinates relative to section center
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;
    
    // Normalize to -10 to 10 range for tilt effect
    const tiltX = (mouseY / centerY) * 3;
    const tiltY = -(mouseX / centerX) * 3;
    
    setMousePosition({ x: tiltX, y: tiltY });
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden py-20 bg-background"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, var(--gradient-1) 0%, transparent 70%)",
            "radial-gradient(circle at 70% 60%, var(--gradient-1) 0%, transparent 70%)",
            "radial-gradient(circle at 40% 80%, var(--gradient-1) 0%, transparent 70%)",
            "radial-gradient(circle at 20% 30%, var(--gradient-1) 0%, transparent 70%)"
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "loop"
        }}
       
      />

      {/* Floating decorative elements */}
      <FloatingObject delay={0} duration={12} x={85} y={25} size="6rem">
        <div className="w-full h-full rounded-full border border-border/20 backdrop-blur-md bg-muted/10" />
      </FloatingObject>
      
      <FloatingObject delay={1} duration={15} x={10} y={70} size="8rem">
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-500/10 to-blue-500/10 border border-border/10" />
      </FloatingObject>
      
      <FloatingObject delay={2} duration={10} x={75} y={80} size="4rem">
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-500/10 to-red-500/10" />
      </FloatingObject>

      {/* Main content container - 3D tilt effect */}
      <motion.div 
        className="container mx-auto max-w-6xl px-6 relative z-10"
        style={{
          perspective: "1200px"
        }}
      >
        <motion.div
          style={{
            transform: `rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg)`
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30
          }}
        >
         

          {/* Section header */}
          <motion.div 
            className="text-center mb-20 relative"
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
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }
              }}
              className="inline-flex items-center justify-center mb-4"
            >
              <span className="h-px w-10 bg-blue-500"></span>
              <motion.div 
                className="mx-4 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 font-medium backdrop-blur-sm border border-blue-500/20"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.25)"
                }}
              >
                <span className="relative flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Our Expertise</span>
                </span>
              </motion.div>
              <span className="h-px w-10 bg-blue-500"></span>
            </motion.div>
            
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.1
                  }
                }
              }}
              className="text-4xl md:text-6xl font-bold mb-6 relative"
            >
              <span className="text-foreground">
                Transforming Ideas
              </span>
              <br />
              <span className="relative inline-block text-blue-500 dark:text-blue-400">
                Into Digital Reality
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ 
                    delay: 1.2,
                    duration: 0.8,
                    ease: "easeInOut"
                  }}
                />
              </span>
            </motion.h2>
            
            <motion.p 
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
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              We combine cutting-edge technology, creative excellence, and strategic thinking 
              to deliver solutions that drive innovation and business growth.
            </motion.p>
          </motion.div>

          {/* Services list */}
          <div className="space-y-2 md:space-y-4">
            {serviceItems.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                isExpanded={expandedId === service.id}
                toggleExpand={toggleExpand}
                theme={theme}
              />
            ))}
          </div>

          {/* CTA Button */}
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.2
              }
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="inline-block"
              whileHover={{ 
                scale: 1.05,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                href="/contact" 
                className="relative inline-flex items-center justify-center overflow-hidden rounded-xl px-10 py-5 font-medium text-white shadow-lg"
              >
                {/* Button gradient layers */}
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-70" />
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.3),transparent_70%)]" />
                
                {/* Moving gradient effect */}
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{ backgroundSize: "200% 100%" }}
                  animate={{
                    backgroundPosition: ["100% 0%", "0% 0%", "100% 0%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear"
                  }}
                />
                
                {/* Border glow */}
                <motion.span 
                  className="absolute inset-0 rounded-xl"
                  animate={{
                    boxShadow: [
                      "0 0 0 2px rgba(112, 90, 249, 0.3)",
                      "0 0 0 4px rgba(112, 90, 249, 0.2)",
                      "0 0 0 2px rgba(112, 90, 249, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
                
                {/* Button text */}
                <span className="relative flex items-center gap-2 z-10 font-bold text-lg">
                  Get Started With Us
                  <motion.span
                    animate={{
                      x: [0, 5, 0],
                      opacity: [1, 0.8, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.span>
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}