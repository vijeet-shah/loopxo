"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Palette, 
  Users, 
  Eye, 
  Layers, 
  Code, 
  CheckSquare, 
  LineChart, 
  Figma,
  Smartphone,

  ChevronRight,
  Frame
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

// UI/UX Services data
const uiUxServices: UiUxService[] = [
  {
    id: "ux-research",
    title: "UX Research & Strategy",
    description: "We conduct comprehensive user research to understand your audience's needs, behaviors, and pain points to inform strategic design decisions.",
    icon: Users,
    features: [
      "User interviews and usability testing",
      "Competitive analysis and benchmarking",
      "Persona development and user journey mapping",
      "Information architecture and user flows",
      "Heuristic evaluation of existing products"
    ],
    color: {
      light: "from-blue-500 to-indigo-600",
      dark: "from-blue-400 to-indigo-500"
    }
  },
  {
    id: "ui-design",
    title: "User Interface Design",
    description: "Our UI designers create visually stunning interfaces that balance aesthetics with functionality to deliver exceptional user experiences.",
    icon: Palette,
    features: [
      "Visual design system creation",
      "Responsive web and mobile app design",
      "Icon and illustration design",
      "Brand identity implementation",
      "Design system documentation"
    ],
    color: {
      light: "from-purple-500 to-pink-600",
      dark: "from-purple-400 to-pink-500"
    }
  },
  {
    id: "ux-design",
    title: "User Experience Design",
    description: "We craft intuitive user experiences that guide users smoothly through your product, making complex processes feel simple and natural.",
    icon: Eye,
    features: [
      "Wireframing and low-fidelity prototyping",
      "User flow optimization",
      "Interaction design and micro-interactions",
      "Accessibility (WCAG) compliance",
      "Content strategy and information architecture"
    ],
    color: {
      light: "from-emerald-500 to-teal-600",
      dark: "from-emerald-400 to-teal-500"
    }
  },
  {
    id: "prototyping",
    title: "Interactive Prototyping",
    description: "We build interactive prototypes that simulate the actual user experience, allowing for thorough testing and validation before development.",
    icon: Figma,
    features: [
      "High-fidelity interactive prototypes",
      "Animation and transition design",
      "User flow validation",
      "Stakeholder presentation materials",
      "Developer handoff specifications"
    ],
    color: {
      light: "from-amber-500 to-orange-600",
      dark: "from-amber-400 to-orange-500"
    }
  },
  {
    id: "mobile-design",
    title: "Mobile UI/UX Design",
    description: "We design mobile interfaces that are optimized for touch interactions, device capabilities, and mobile usage contexts.",
    icon: Smartphone,
    features: [
      "Native iOS and Android design",
      "Cross-platform consistent experiences",
      "Touch-optimized interfaces",
      "Performance-conscious design",
      "Gesture-based interaction design"
    ],
    color: {
      light: "from-cyan-500 to-blue-600",
      dark: "from-cyan-400 to-blue-500"
    }
  },
  {
    id: "design-systems",
    title: "Design Systems",
    description: "We create comprehensive design systems that ensure consistency, scalability, and efficient design-to-development handoff.",
    icon: Layers,
    features: [
      "Component library creation",
      "Design tokens and variables",
      "Style guides and pattern libraries",
      "Documentation for design and development teams",
      "Version control and system maintenance planning"
    ],
    color: {
      light: "from-red-500 to-rose-600",
      dark: "from-red-400 to-rose-500"
    }
  }
];

// Process steps data
const processSteps = [
  {
    id: "01",
    title: "Discovery & Research",
    description: "We begin by understanding your business goals, audience, and market position through stakeholder interviews, user research, and competitive analysis.",
    icon: Users
  },
  {
    id: "02",
    title: "Strategy & Planning",
    description: "Based on research insights, we develop a UX strategy that aligns with your business objectives and creates a roadmap for the design process.",
    icon: LineChart
  },
  {
    id: "03",
    title: "Wireframing & Information Architecture",
    description: "We create the structural foundation of your product with wireframes and information architecture that organize content logically and intuitively.",
    icon: Frame
  },
  {
    id: "04",
    title: "UI Design & Visual Language",
    description: "Our designers craft the visual elements of your interface, from color schemes and typography to imagery and iconography, creating a cohesive visual language.",
    icon: Palette
  },
  {
    id: "05",
    title: "Prototyping & Testing",
    description: "We build interactive prototypes to simulate the real product experience and conduct user testing to validate our design decisions.",
    icon: CheckSquare
  },
  {
    id: "06",
    title: "Developer Handoff & Implementation",
    description: "We prepare detailed specifications and assets for developers and provide support during implementation to ensure design integrity.",
    icon: Code
  }
];

// Floating decorative element
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

// Service card component
const ServiceCard = ({ 
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
          <motion.div
            animate={{ 
              rotate: isExpanded ? 90 : 0,
              y: isExpanded ? -3 : 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-muted/50 text-foreground flex-shrink-0"
          >
            <ChevronRight className="h-5 w-5" />
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

// Process step card component
interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const ProcessCard = ({ step, index }: { step: ProcessStep, index: number }) => {
  const cardRef = useRef(null);
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
      className="border border-border rounded-xl overflow-hidden flex flex-col h-full bg-card"
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

// Main UI/UX Services Page Component
export default function UiUxServicesPage() {
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
  
  const handleMouseMove = (e) => {
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

      {/* Floating decorative elements */}
      <FloatingObject delay={0} duration={12} x={85} y={15} size="8rem">
        <div className="w-full h-full rounded-full border border-border/20 backdrop-blur-md bg-muted/10" />
      </FloatingObject>
      
      <FloatingObject delay={1} duration={15} x={10} y={70} size="10rem">
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-500/10 to-pink-500/10 border border-border/10" />
      </FloatingObject>
      
      <FloatingObject delay={2} duration={10} x={75} y={80} size="6rem">
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-500/10 to-indigo-500/10" />
      </FloatingObject>

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
          {/* Hero section */}
          <motion.div 
            className="text-center mb-16 relative"
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
              <span className="h-px w-10 bg-primary"></span>
              <motion.div 
                className="mx-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium backdrop-blur-sm border border-primary/20"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.25)"
                }}
              >
                <span className="relative flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <span>UI/UX Design Services</span>
                </span>
              </motion.div>
              <span className="h-px w-10 bg-primary"></span>
            </motion.div>
            
            <motion.h1 
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
                Elevate Your Digital
              </span>
              <br />
              <span className="relative inline-block text-primary">
                Experience with UI/UX Design
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ 
                    delay: 1.2,
                    duration: 0.8,
                    ease: "easeInOut"
                  }}
                />
              </span>
            </motion.h1>
            
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
              className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8"
            >
              We create intuitive, engaging, and user-centered digital experiences that drive business value
              through strategic design thinking and meticulous attention to user needs.
            </motion.p>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.4
                  }
                }
              }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 group"
              >
                Request a Design Consultation
                <motion.div
                  animate={{
                    x: [0, 5, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </motion.button>
              
             
            </motion.div>
          </motion.div>

          {/* Stats section */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-4xl font-bold text-foreground mb-2">200+</h3>
              <p className="text-muted-foreground">Successful UI/UX projects completed</p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-4xl font-bold text-foreground mb-2">42%</h3>
              <p className="text-muted-foreground">Average increase in user engagement</p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-4xl font-bold text-foreground mb-2">35%</h3>
              <p className="text-muted-foreground">Typical reduction in user error rates</p>
            </div>
          </motion.div>

          {/* Our Process section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl font-bold text-foreground mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Our UI/UX Design Process
              </motion.h2>
              <motion.p 
                className="text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                We follow a proven, iterative design methodology that ensures your digital products are both beautiful and functional.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, index) => (
                <ProcessCard key={step.id} step={step} index={index} />
              ))}
            </div>
          </div>

          {/* UI/UX Services section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl font-bold text-foreground mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Our UI/UX Design Services
              </motion.h2>
              <motion.p 
                className="text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                We offer comprehensive UI/UX design services tailored to your specific business needs and user requirements.
              </motion.p>
            </div>
            
            <div className="space-y-6">
              {uiUxServices.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  isExpanded={expandedId === service.id}
                  toggleExpand={toggleExpand}
                />
              ))}
            </div>
          </div>

          {/* CTA section */}
          <motion.div 
            className="rounded-2xl border border-border p-8 md:p-12 bg-card/50 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-purple-500/5 z-0" />
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Transform Your User Experience?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Let&#39;s discuss how our UI/UX design services can help you create digital experiences that delight your users
                and drive measurable business results.
              </p>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block"
              >
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Start Your Design Project
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