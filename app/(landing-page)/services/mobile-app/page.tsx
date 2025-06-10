"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Smartphone, 
  ShieldCheck, 
  Zap, 
  Layout, 
  Code, 
  CheckSquare, 
  Layers, 
  User, 
  Server,
  Settings,
  GitBranch,
  LineChart,
  Globe,
  Target
} from "lucide-react";
import { useTheme } from "next-themes";
import {  FeatureCard } from "@/components/animation/floatingElements";

// Interface for platform feature
interface PlatformFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: {
    light: string;
    dark: string;
  };
}

// Mobile platforms data
const platforms: PlatformFeature[] = [
  {
    id: "ios",
    title: "iOS App Development",
    description: "We create premium iOS applications using Swift and SwiftUI that deliver exceptional user experiences on iPhone and iPad with native performance and Apple's design guidelines.",
    icon: Smartphone,
    color: {
      light: "from-blue-500 to-indigo-600",
      dark: "from-blue-400 to-indigo-500"
    }
  },
  {
    id: "android",
    title: "Android App Development",
    description: "Our Android development team builds high-performance applications using Kotlin and Jetpack Compose, following material design principles for a cohesive user experience across all Android devices.",
    icon: Smartphone,
    color: {
      light: "from-green-500 to-emerald-600",
      dark: "from-green-400 to-emerald-500"
    }
  },
  {
    id: "cross-platform",
    title: "Cross-Platform Development",
    description: "Using React Native and Flutter, we develop apps that run on both iOS and Android from a single codebase, reducing development time and cost while maintaining a near-native user experience.",
    icon: Layers,
    color: {
      light: "from-purple-500 to-pink-600",
      dark: "from-purple-400 to-pink-500"
    }
  },
  {
    id: "pwa",
    title: "Progressive Web Apps",
    description: "We build progressive web applications that combine the best of web and mobile apps, offering offline capabilities, push notifications, and app-like experiences without requiring installation.",
    icon: Globe,
    color: {
      light: "from-amber-500 to-orange-600",
      dark: "from-amber-400 to-orange-500"
    }
  }
];

// Process steps data
const developmentSteps = [
  {
    id: "01",
    title: "Discovery & Strategy",
    description: "We begin by understanding your business goals, target audience, and app requirements to develop a comprehensive mobile strategy and roadmap.",
    icon: Target
  },
  {
    id: "02",
    title: "UX/UI Design",
    description: "Our designers create intuitive user experiences and visually appealing interfaces tailored to your brand and optimized for mobile interaction.",
    icon: Layout
  },
  {
    id: "03",
    title: "Development",
    description: "Our engineers build your app using best practices and the latest technologies, ensuring scalability, security, and optimal performance.",
    icon: Code
  },
  {
    id: "04",
    title: "Testing & QA",
    description: "We conduct rigorous testing across devices and scenarios to identify and fix bugs, ensure compatibility, and optimize performance.",
    icon: CheckSquare
  },
  {
    id: "05",
    title: "Deployment",
    description: "We manage the submission process to app stores, ensuring compliance with guidelines and preparing marketing materials for a successful launch.",
    icon: GitBranch
  },
  {
    id: "06",
    title: "Maintenance & Support",
    description: "After launch, we provide ongoing support, updates, and enhancements to keep your app secure, relevant, and aligned with evolving platform standards.",
    icon: Settings
  }
];

// Process step card component
interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const ProcessCard = ({ step, index }: { step: ProcessStep, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px 0px" });
  const controls = useAnimation();
  
  const Icon = step.icon;

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
      className="border border-border rounded-xl overflow-hidden flex flex-col h-full bg-card/60 backdrop-blur-sm"
    >
      <div className="h-1.5 w-full bg-primary"></div>
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
            <Icon size={24} />
          </div>
          <div className="flex items-center">
            <span className="text-3xl font-bold text-muted-foreground/50">{step.id}</span>
            <h3 className="text-xl font-semibold ml-3 text-foreground">{step.title}</h3>
          </div>
        </div>
        <p className="text-muted-foreground flex-grow">{step.description}</p>
      </div>
    </motion.div>
  );
};

// Platform card component
const PlatformCard = ({ 
  platform, 
  index, 
  isExpanded, 
  toggleExpand 
}: { 
  platform: PlatformFeature; 
  index: number; 
  isExpanded: boolean; 
  toggleExpand: (id: string) => void; 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px 0px" });
  const controls = useAnimation();
  const { theme } = useTheme();
  
  // Color based on theme
  const colorClass = theme === "dark" ? platform.color.dark : platform.color.light;
  const Icon = platform.icon;

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
        transition-all duration-300 ease-out ${isExpanded ? "my-6 scale-[1.02] z-10" : "z-0"}`}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 opacity-5 bg-gradient-to-r ${colorClass}`} />
      </div>

      {/* Platform header - always visible */}
      <motion.div 
        className={`relative p-6 cursor-pointer ${isExpanded ? "bg-muted/50" : "hover:bg-muted/30"} 
          transition-all duration-300`}
        onClick={() => toggleExpand(platform.id)}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-start gap-4">
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${colorClass} text-white flex-shrink-0`}>
              <Icon size={24} />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{platform.title}</h3>
              <p className="text-muted-foreground">{platform.description}</p>
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
              {/* Platform-specific content - customized per platform */}
              {platform.id === "ios" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Technologies</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Swift & SwiftUI</li>
                      <li>• UIKit</li>
                      <li>• Core Data</li>
                      <li>• CloudKit</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Apple Sign-In</li>
                      <li>• Apple Pay Integration</li>
                      <li>• iCloud Sync</li>
                      <li>• iOS Widgets</li>
                    </ul>
                  </div>
                </div>
              )}

              {platform.id === "android" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Technologies</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Kotlin</li>
                      <li>• Jetpack Compose</li>
                      <li>• Android Architecture Components</li>
                      <li>• Material Design 3</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Google Pay Integration</li>
                      <li>• Firebase Analytics</li>
                      <li>• Google Maps Integration</li>
                      <li>• Android Widgets</li>
                    </ul>
                  </div>
                </div>
              )}

              {platform.id === "cross-platform" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Technologies</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• React Native</li>
                      <li>• Flutter & Dart</li>
                      <li>• Expo</li>
                      <li>• TypeScript</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Benefits</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Faster development cycle</li>
                      <li>• Code reuse across platforms</li>
                      <li>• Cost-effective solution</li>
                      <li>• Consistent UX across devices</li>
                    </ul>
                  </div>
                </div>
              )}

              {platform.id === "pwa" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Technologies</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Next.js / React</li>
                      <li>• Service Workers</li>
                      <li>• Web Push API</li>
                      <li>• IndexedDB / LocalStorage</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Offline functionality</li>
                      <li>• Home screen installation</li>
                      <li>• Push notifications</li>
                      <li>• App-like experience</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Learn more link */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-end"
              >
                <Link href={`/services/mobile-apps/${platform.id}`}>
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

// Main Mobile App Development Page Component
export default function MobileAppDevelopmentPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(pageRef, { once: false, margin: "-10% 0px" });
  const controls = useAnimation();
  const { theme } = useTheme();

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // 3D Tilt effect on mouse move
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = pageRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;
    
    const tiltX = (mouseY / centerY) * 2;
    const tiltY = -(mouseX / centerX) * 2;
    
    setMousePosition({ x: tiltX, y: tiltY });
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div 
          ref={pageRef}
          className="min-h-screen relative overflow-hidden py-16 bg-background"
          onMouseMove={handleMouseMove}
        >
          {/* Animated background gradient */}
          <motion.div 
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                "radial-gradient(circle at 20% 30%, var(--gradient-1) 0%, transparent 70%)",
                "radial-gradient(circle at 70% 60%, var(--gradient-1) 0%, transparent 70%)",
                "radial-gradient(circle at 20% 30%, var(--gradient-1) 0%, transparent 70%)"
              ]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "loop"
            }}
            style={{ 
              "--gradient-1": theme === "dark" 
                ? "rgba(94, 63, 206, 0.15)" 
                : "rgba(124, 58, 237, 0.1)"
            } as React.CSSProperties}
          />
    
        
          <div className="container mx-auto max-w-7xl px-6 relative z-10">
            <motion.div
              style={{
                perspective: "1200px",
                transform: `rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg)`,
                transformStyle: "preserve-3d"
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30
              }}
            >
              
         

          {/* Key Features section */}
          <div className="mb-20">
          <div className="text-center mb-12">
            
           <motion.h2 
                           className="text-3xl font-bold text-foreground mb-3"
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.6 }}
                           viewport={{ once: true, margin: "-100px" }}
                         >
              Why Choose Our Mobile App Services
            </motion.h2>


            <motion.p 
                            className="text-muted-foreground max-w-3xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true, margin: "-100px" }}
                          >
       We specialize in the development of innovative and user-friendly mobile applications for both iOS and Android platforms. Our process encompasses every stage, from initial concept and design to final deployment.
       </motion.p>
       </div>

     


            <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-border">
              <h3 className="text-4xl font-bold text-foreground mb-2">100+</h3>
              <p className="text-muted-foreground">Mobile apps delivered</p>
            </div>
            
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-border">
              <h3 className="text-4xl font-bold text-foreground mb-2">4.7+</h3>
              <p className="text-muted-foreground">Average App Store rating</p>
            </div>
            
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 border border-border">
              <h3 className="text-4xl font-bold text-foreground mb-2">+65%</h3>
              <p className="text-muted-foreground">Typical user engagement increase</p>
            </div>
          </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard 
                icon={User} 
                title="User-Centered Approach" 
                description="We put users at the heart of our development process, ensuring intuitive and engaging experiences that meet their needs and expectations."
                colorClass="from-blue-500 to-indigo-600"
              />
              
              <FeatureCard 
                icon={Zap} 
                title="High Performance" 
                description="We build lightweight, optimized apps that load quickly, respond instantly to user interactions, and consume minimal device resources."
                colorClass="from-amber-500 to-orange-600"
              />
              
              <FeatureCard 
                icon={ShieldCheck} 
                title="Enterprise-Grade Security" 
                description="We implement robust security measures including encryption, secure authentication, and data protection to safeguard user information."
                colorClass="from-emerald-500 to-teal-600"
              />
              
              <FeatureCard 
                icon={Layout} 
                title="Beautiful UI Design" 
                description="Our designers create visually stunning interfaces that reflect your brand identity while adhering to platform design guidelines."
                colorClass="from-purple-500 to-pink-600"
              />
              
              <FeatureCard 
                icon={Server} 
                title="Scalable Architecture" 
                description="We build apps on robust, scalable architectures that can handle growing user bases and evolving feature requirements."
                colorClass="from-blue-600 to-sky-500"
              />
              
              <FeatureCard 
                icon={LineChart} 
                title="Analytics Integration" 
                description="We implement comprehensive analytics to track user behavior, app performance, and key metrics to drive continuous improvement."
                colorClass="from-red-500 to-rose-600"
              />
            </div>
          </div>

          {/* Development Process section */}
          <div className="mb-20">
            <motion.h2 
              className="text-3xl font-bold text-foreground mb-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Our Mobile App Development Process
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {developmentSteps.map((step, index) => (
                <ProcessCard key={step.id} step={step} index={index} />
              ))}
            </div>
          </div>

          {/* Platforms section */}
          <div className="mb-20">
            <motion.h2 
              className="text-3xl font-bold text-foreground mb-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Mobile Development Platforms
            </motion.h2>
            
            <div className="space-y-6">
              {platforms.map((platform, index) => (
                <PlatformCard
                  key={platform.id}
                  platform={platform}
                  index={index}
                  isExpanded={expandedId === platform.id}
                  toggleExpand={toggleExpand}
                />
              ))}
            </div>
          </div>

          {/* Mobile app showcase */}

          
      

          {/* CTA section */}
          <motion.div 
            className="rounded-2xl border border-border p-8 md:p-10 bg-card/50 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-indigo-500/5 z-0" />
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Build Your Mobile App?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Let our mobile experts help you transform your idea into a successful app that users love.
                Schedule a consultation to discuss your project requirements.
              </p>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block"
              >
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2  text-primary-foreground px-8 py-3.5 rounded-lg font-medium  transition-colors"
                >
                  Schedule a Mobile Consultation
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}