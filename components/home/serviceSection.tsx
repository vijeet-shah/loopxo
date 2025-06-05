"use client"

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n/client-utils";

// Service items data structure with translation keys
const getServiceItems = (t: any) => [
  {
    id: "01",
    title: t?.uiUxDesign || "UI-UX Design",
    description: t?.uiUxDesignDescription || "We focus on creating visually appealing and user-friendly interfaces that significantly enhance engagement and user satisfaction. By focusing on intuitive design elements, we help create seamless experiences that keep users engaged.",
    image: "/images/services/ui-ux-design.jpg",
    fallbackIcon: "🎨",
    color: {
      light: "from-purple-500 to-indigo-600",
      dark: "from-purple-400 to-indigo-500"
    }
  },
  {
    id: "02",
    title: t?.mobileApps || "Mobile Apps",
    description: t?.mobileAppsDescription || "We specialize in the development of innovative and user-friendly mobile applications for both iOS and Android platforms. Our process encompasses every stage, from initial concept and design to final deployment.",
    image: "/images/services/mobile-apps.jpg",
    fallbackIcon: "📱",
    color: {
      light: "from-blue-500 to-cyan-400",
      dark: "from-blue-400 to-cyan-300"
    }
  },
  {
    id: "03",
    title: t?.backendDevelopment || "Backend Development",
    description: t?.backendDevelopmentDescription || "We specialize in delivering responsive, secure, and user-friendly web solutions designed to enhance your online presence. Our approach ensures that your website not only meets modern standards but also promotes business growth.",
    image: "/images/services/backend-development.jpg",
    fallbackIcon: "⚙️",
    color: {
      light: "from-emerald-500 to-green-400",
      dark: "from-emerald-400 to-green-300"
    }
  },
  {
    id: "04",
    title: t?.frontendDevelopment || "Frontend Development",
    description: t?.frontendDevelopmentDescription || "We offer expertly crafted website designs that combine aesthetics with functionality, tailored to your brand's unique identity. Our designs prioritize user experience and seamless navigation, ensuring a visually engaging and intuitive interface.",
    image: "/images/services/frontend-development.jpg",
    fallbackIcon: "💻",
    color: {
      light: "from-orange-500 to-amber-400",
      dark: "from-orange-400 to-amber-300"
    }
  },
  {
    id: "05",
    title: t?.artificialIntelligence || "Artificial Intelligence",
    description: t?.artificialIntelligenceDescription || "We focus on harnessing the power of AI to seamlessly integrate information, transforming data into actionable insights that drive intelligent decision-making. By connecting the dots across complex data sets, AI empowers organizations to make informed, strategic choices with precision.",
    image: "/images/services/artificial-intelligence.jpg",
    fallbackIcon: "🤖",
    color: {
      light: "from-rose-500 to-pink-400",
      dark: "from-rose-400 to-pink-300"
    }
  },
  {
    id: "06",
    title: t?.dataScience || "Data Science",
    description: t?.dataScienceDescription || "We excel at uncovering narratives within your data by leveraging advanced visualizations, actionable insights, and precise forecasting, thereby empowering strategic decision-making. Our approach ensures a comprehensive understanding of data-driven trends and patterns.",
    image: "/images/services/data-science.jpg",
    fallbackIcon: "📊",
    color: {
      light: "from-blue-600 to-indigo-500",
      dark: "from-blue-500 to-indigo-400"
    }
  },
  {
    id: "07",
    title: t?.cloudDevOps || "Managed Cloud & DevOps",
    description: t?.cloudDevOpsDescription || "We specialize in optimizing your cloud infrastructure and streamlining operations through Managed Cloud and DevOps services. By integrating automation, continuous monitoring, and agile methodologies, we enhance scalability, security, and performance.",
    image: "/images/services/cloud-devops.jpg",
    fallbackIcon: "☁️",
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
  image: string;
  fallbackIcon: string;
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
  const [imageError, setImageError] = useState(false);
  
  // Color based on theme
  const colorClass = theme === "dark" ? service.color.dark : service.color.light;
  
  // Animation for particles in expanded state
  const particleCount = 8;
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    size: Math.random() * 4 + 2
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
          y: 60,
          filter: "blur(8px)"
        },
        visible: { 
          opacity: 1, 
          y: 0,
          filter: "blur(0px)",
          transition: { 
            type: "spring", 
            damping: 25, 
            stiffness: 150, 
            delay: index * 0.08,
            duration: 0.6
          }
        }
      }}
      className={cn(
        "relative rounded-3xl overflow-hidden",
        "shadow-xl border border-border/50",
        "transition-all duration-500 ease-out",
        "backdrop-blur-sm bg-card/80",
        isExpanded ? "my-6 scale-[1.02] z-20 shadow-2xl" : "z-0 hover:shadow-lg",
        "group"
      )}
    >
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className={cn(
            "absolute inset-0 opacity-8",
            "bg-gradient-to-br",
            colorClass
          )}
          animate={isExpanded ? {
            opacity: [0.08, 0.12, 0.08],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute w-full h-full bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08),transparent_60%)]"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
        
        {/* Professional grid pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      {/* Service header - always visible */}
      <motion.div 
        className={cn(
          "relative p-8 cursor-pointer",
          "flex items-start justify-between gap-6",
          "transition-all duration-300",
          isExpanded 
            ? "bg-gradient-to-r from-muted/40 to-muted/20 backdrop-blur-md" 
            : "hover:bg-muted/20 group-hover:bg-gradient-to-r group-hover:from-muted/30 group-hover:to-muted/10"
        )}
        onClick={() => toggleExpand(service.id)}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="flex items-start gap-6">
          {/* Professional service image */}
          <motion.div 
            className={cn(
              "relative flex items-center justify-center",
              "w-16 h-16 rounded-2xl overflow-hidden",
              "bg-gradient-to-br shadow-lg",
              colorClass,
              "ring-2 ring-white/20"
            )}
            whileHover={{ 
              scale: 1.05,
              rotate: [0, 1, -1, 0],
              transition: {
                rotate: {
                  repeat: 1,
                  duration: 0.4
                },
                scale: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }
              }
            }}
          >
            {!imageError ? (
              <Image
                src={service.image}
                alt={service.title}
                width={64}
                height={64}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-2xl">{service.fallbackIcon}</span>
            )}
            
            {/* Subtle overlay for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{
                boxShadow: [
                  `0 0 0 0px rgba(255,255,255,0)`,
                  `0 0 0 2px rgba(255,255,255,0.1)`,
                  `0 0 0 0px rgba(255,255,255,0)`
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </motion.div>
          
          {/* Title with enhanced typography */}
          <div className="pt-1 flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                {service.title}
              </h3>
              <motion.div
                className={cn(
                  "w-2 h-2 rounded-full shrink-0",
                  "bg-gradient-to-r",
                  colorClass
                )}
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    `0 0 0 rgba(255,255,255,0)`,
                    `0 0 6px rgba(255,255,255,0.3)`,
                    `0 0 0 rgba(255,255,255,0)`
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            </div>
            
            {/* Service number indicator */}
            <motion.div 
              className="mt-1 text-xs font-medium text-muted-foreground"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              Service {service.id}
            </motion.div>
          </div>
        </div>
        
        {/* Enhanced expand/collapse button */}
        <motion.div
          animate={{ 
            rotate: isExpanded ? 180 : 0,
            y: isExpanded ? -2 : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            "bg-gradient-to-br from-muted/60 to-muted/40",
            "text-foreground border border-border/50",
            "hover:from-muted/80 hover:to-muted/60 transition-all duration-200",
            "shadow-sm"
          )}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>

      {/* Enhanced expandable content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: {
                height: {
                  duration: 0.5,
                  ease: [0.32, 0.72, 0, 1]
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
                  duration: 0.4,
                  delay: 0.1,
                  ease: [0.32, 0.72, 0, 1]
                }
              }
            }}
            className="overflow-hidden relative"
          >
            <div className="p-8 pt-4 relative">
              {/* Refined animated particles */}
              {particles.map(particle => (
                <motion.div
                  key={particle.id}
                  className={cn(
                    "absolute rounded-full",
                    "bg-gradient-to-r",
                    colorClass,
                    "opacity-10 blur-[1px]"
                  )}
                  style={{
                    width: particle.size,
                    height: particle.size,
                    left: `${particle.initialX}%`,
                    top: `${particle.initialY}%`,
                  }}
                  animate={{
                    x: [0, Math.random() * 30 - 15, 0],
                    y: [0, Math.random() * 30 - 15, 0],
                    scale: [1, Math.random() * 0.3 + 1, 1],
                    opacity: [0.05, 0.15, 0.05]
                  }}
                  transition={{
                    duration: Math.random() * 6 + 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
              ))}
              
              {/* Enhanced description */}
              <motion.p 
                className="text-muted-foreground mt-2 mb-8 leading-relaxed relative z-10 text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.2, duration: 0.5 }
                }}
              >
                {service.description}
              </motion.p>
              
              {/* Enhanced CTA link */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: 0.3, duration: 0.5 }
                }}
              >
                <Link 
                  href={`/services/${service.id.toLowerCase()}`}
                  className={cn(
                    "inline-flex items-center gap-3",
                    "py-3 px-6 rounded-xl",
                    "bg-gradient-to-r shadow-lg",
                    colorClass,
                    "text-white font-semibold",
                    "hover:shadow-xl hover:scale-105 transition-all duration-300",
                    "group/btn relative overflow-hidden",
                    "ring-1 ring-white/20"
                  )}
                >
                  <span className="relative z-10">Explore {service.title}</span>
                  <motion.div
                    className="relative z-10"
                    animate={{ 
                      x: [0, 4, 0],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 1
                      }
                    }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                  
                  {/* Enhanced hover effect */}
                  <motion.div 
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ 
                      x: "100%",
                      transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                  />
                  
                  {/* Subtle pulse effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{
                      boxShadow: [
                        "0 0 0 0px rgba(255,255,255,0)",
                        "0 0 0 4px rgba(255,255,255,0.1)",
                        "0 0 0 0px rgba(255,255,255,0)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
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

// Enhanced decorative floating objects
const FloatingObject = ({ delay, duration, x, y, size, children }) => {
  return (
    <motion.div
      className="absolute opacity-40"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size
      }}
      animate={{
        y: [0, -15, 0, 15, 0],
        x: [0, 10, 0, -10, 0],
        rotate: [0, 5, 0, -5, 0],
        scale: [1, 1.05, 1, 0.95, 1]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

// Main component
export function ServiceSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-5% 0px" });
  const controls = useAnimation();
  const { theme } = useTheme();
  const { t } = useTranslation();

  // Get service items with translations
  const serviceItems = getServiceItems(t);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Enhanced 3D tilt effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;
    const tiltX = (mouseY / centerY) * 2;
    const tiltY = -(mouseX / centerX) * 2;
    
    setMousePosition({ x: tiltX, y: tiltY });
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden py-24 bg-background"
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced animated background */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 25% 25%, hsl(var(--primary)/0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 75% 50%, hsl(var(--primary)/0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 75%, hsl(var(--primary)/0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 25% 25%, hsl(var(--primary)/0.1) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
      />

      {/* Enhanced floating elements */}
      <FloatingObject delay={0} duration={14} x={88} y={20} size="5rem">
        <div className="w-full h-full rounded-full border-2 border-primary/20 backdrop-blur-md bg-primary/5" />
      </FloatingObject>
      
      <FloatingObject delay={1.5} duration={18} x={8} y={65} size="7rem">
        <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-purple-500/10 to-blue-500/10 border border-border/20 backdrop-blur-sm" />
      </FloatingObject>
      
      <FloatingObject delay={3} duration={12} x={78} y={85} size="4rem">
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-500/10 to-red-500/10 border border-border/10" />
      </FloatingObject>

      {/* Main content with enhanced 3D effect */}
      <motion.div 
        className="container mx-auto max-w-7xl px-6 relative z-10"
        style={{ perspective: "1500px" }}
      >
        <motion.div
          style={{
            transform: `rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg)`
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          {/* Enhanced section header */}
          <motion.div 
            className="text-center mb-24 relative"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: -30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }
                }
              }}
              className="inline-flex items-center justify-center mb-6"
            >
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary"></span>
              <motion.div 
                className="mx-4 px-6 py-2 rounded-full bg-primary/10 text-primary font-semibold backdrop-blur-sm border border-primary/20 shadow-lg"
                whileHover={{
                  y: -3,
                  boxShadow: "0 15px 35px -5px rgba(var(--primary), 0.25)"
                }}
              >
                <span className="relative flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>{t?.ourExpertise || "Our Expertise"}</span>
                </span>
              </motion.div>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary"></span>
            </motion.div>
            
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 40 },
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
              className="text-4xl md:text-7xl font-bold mb-8 relative leading-tight"
            >
              <span className="text-foreground">
                {t?.transformingIdeas || "Transforming Ideas"}
              </span>
              <br />
              <span className="relative inline-block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {t?.intoDigitalReality || "Into Digital Reality"}
                <motion.span
                  className="absolute -bottom-3 left-0 h-1.5 bg-gradient-to-r from-primary to-primary/70 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ 
                    delay: 1.5,
                    duration: 1,
                    ease: "easeOut"
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
              className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              {t?.servicesSectionDescription || "We combine cutting-edge technology, creative excellence, and strategic thinking to deliver solutions that drive innovation and business growth."}
            </motion.p>
          </motion.div>

          {/* Enhanced services grid */}
          <div className="space-y-3 md:space-y-4">
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

          {/* Enhanced CTA section */}
          <motion.div 
            className="mt-24 text-center"
            initial={{ opacity: 0, y: 60 }}
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
                className="relative inline-flex items-center justify-center overflow-hidden rounded-2xl px-12 py-6 font-bold text-lg text-white shadow-2xl group"
              >
                {/* Enhanced gradient layers */}
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.4),transparent_70%)]" />
                
                {/* Premium shine effect */}
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  style={{ backgroundSize: "200% 100%" }}
                  animate={{
                    backgroundPosition: ["200% 0%", "-200% 0%"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    repeatDelay: 3
                  }}
                />
                
                {/* Enhanced border glow */}
                <motion.span 
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    boxShadow: [
                      "0 0 0 2px rgba(var(--primary), 0.3)",
                      "0 0 0 4px rgba(var(--primary), 0.2), 0 0 0 6px rgba(var(--primary), 0.1)",
                      "0 0 0 2px rgba(var(--primary), 0.3)"
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