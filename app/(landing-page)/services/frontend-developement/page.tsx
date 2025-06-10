"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { 
  ArrowRight, 
  Palette, 
  Smartphone, 
  Shield, 
  Code2, 
  Zap, 
  GitBranch, 
  Layers,
  BookOpen,
  TestTube,
  Sparkles,
  Rocket,
  Target,
  Eye
} from "lucide-react";
import { useTheme } from "next-themes";
import { ServiceCard } from "@/components/serviceCard";
import ProcessCard, { CommunicationCard } from "@/components/services/processCard";

// Interface for service
interface FrontendService {
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

// Frontend Development Services data
const frontendServices: FrontendService[] = [
  {
    id: "ui-ux-development",
    title: "UI/UX Development & Design Systems",
    description: "We craft pixel-perfect, accessible user interfaces with comprehensive design systems that ensure consistency and scalability across your entire product ecosystem.",
    icon: Palette,
    features: [
      "Component-based design system architecture",
      "Responsive web design with mobile-first approach",
      "Accessibility compliance (WCAG 2.1 AA standards)",
      "Cross-browser compatibility testing and optimization",
      "Interactive prototyping and user experience validation"
    ],
    color: {
      light: "from-purple-500 to-pink-600",
      dark: "from-purple-400 to-pink-500"
    }
  },
  {
    id: "react-development",
    title: "React & Next.js Applications",
    description: "We build high-performance, scalable React applications using modern frameworks and best practices, optimized for speed, SEO, and user experience.",
    icon: Code2,
    features: [
      "React 18+ with hooks and context management",
      "Next.js 14+ with App Router and Server Components",
      "State management with Redux Toolkit/Zustand",
      "TypeScript implementation for type safety",
      "Server-side rendering and static site generation"
    ],
    color: {
      light: "from-blue-500 to-cyan-600",
      dark: "from-blue-400 to-cyan-500"
    }
  },
  {
    id: "mobile-responsive",
    title: "Mobile-First & Progressive Web Apps",
    description: "We create responsive, mobile-optimized applications and PWAs that deliver native app experiences across all devices and platforms.",
    icon: Smartphone,
    features: [
      "Mobile-first responsive design methodology",
      "Progressive Web App (PWA) development",
      "Touch-optimized interfaces and gestures",
      "Offline functionality and service workers",
      "App store deployment and PWA installation"
    ],
    color: {
      light: "from-emerald-500 to-teal-600",
      dark: "from-emerald-400 to-teal-500"
    }
  },
  {
    id: "performance-optimization",
    title: "Performance & Core Web Vitals",
    description: "We optimize frontend applications for lightning-fast performance, achieving excellent Core Web Vitals scores and superior user experience metrics.",
    icon: Zap,
    features: [
      "Core Web Vitals optimization (LCP, FCP, CLS)",
      "Code splitting and lazy loading implementation",
      "Image optimization and modern format adoption",
      "Bundle size optimization and tree shaking",
      "Performance monitoring and real-time analytics"
    ],
    color: {
      light: "from-amber-500 to-orange-600",
      dark: "from-amber-400 to-orange-500"
    }
  },
  {
    id: "frontend-security",
    title: "Frontend Security & Best Practices",
    description: "We implement comprehensive security measures and follow industry best practices to protect user data and prevent common frontend vulnerabilities.",
    icon: Shield,
    features: [
      "XSS and CSRF protection implementation",
      "Content Security Policy (CSP) configuration",
      "Secure authentication and session management",
      "Input validation and sanitization",
      "Security auditing and vulnerability assessment"
    ],
    color: {
      light: "from-red-500 to-rose-600",
      dark: "from-red-400 to-rose-500"
    }
  },
  {
    id: "testing-quality",
    title: "Testing & Quality Assurance",
    description: "We ensure code quality and reliability through comprehensive testing strategies, automated workflows, and continuous integration practices.",
    icon: TestTube,
    features: [
      "Unit testing with Jest and React Testing Library",
      "End-to-end testing with Playwright/Cypress",
      "Visual regression testing and component stories",
      "Automated accessibility testing integration",
      "Code quality gates and pre-commit hooks"
    ],
    color: {
      light: "from-indigo-500 to-purple-600",
      dark: "from-indigo-400 to-purple-500"
    }
  }
];

// Professional development process steps
const processSteps = [
  {
    id: "01",
    title: "Discovery & UX Research",
    description: "We conduct comprehensive user research, analyze target audiences, and define user journeys. This includes competitive analysis, user persona development, and information architecture planning to ensure optimal user experience design.",
    icon: Target
  },
  {
    id: "02",
    title: "Design System & Prototyping",
    description: "Our design team creates comprehensive design systems with reusable components, style guides, and interactive prototypes. We establish visual hierarchy, color schemes, typography, and component libraries for consistency.",
    icon: Layers
  },
  {
    id: "03",
    title: "Frontend Architecture Planning",
    description: "We architect scalable frontend solutions with modern frameworks, define component structures, and plan state management strategies. This includes technology stack selection and performance optimization planning.",
    icon: Sparkles
  },
  {
    id: "04",
    title: "Development & Code Review",
    description: "Our senior developers implement pixel-perfect designs using modern frontend technologies. Every component undergoes rigorous peer review, follows coding standards, and includes comprehensive testing coverage.",
    icon: GitBranch
  },
  {
    id: "05",
    title: "Testing & Quality Assurance",
    description: "We implement comprehensive testing suites including unit tests, integration tests, and end-to-end testing. All components are tested for accessibility, performance, and cross-browser compatibility.",
    icon: TestTube
  },
  {
    id: "06",
    title: "Deployment & Performance Monitoring",
    description: "We deploy applications with CI/CD pipelines and implement comprehensive monitoring. Clients receive style guides, component documentation, and ongoing support for maintenance and updates.",
    icon: Rocket
  }
];

// Client communication tools and deliverables
const communicationTools = [
  {
    title: "Interactive Style Guide",
    description: "Comprehensive design system documentation with live component examples",
    icon: BookOpen
  },
  {
    title: "Storybook Component Library",
    description: "Interactive component documentation for easy development and testing",
    icon: Layers
  },
  {
    title: "Figma Design Handoffs",
    description: "Detailed design specifications with developer-friendly annotations",
    icon: Eye
  },
  {
    title: "Performance Reports",
    description: "Detailed Core Web Vitals and performance optimization documentation",
    icon: Zap
  }
];





// Main Frontend Development Page Component
export default function FrontendDevelopment() {
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
  
  const handleMouseMove = (e: React.MouseEvent) => {
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
            ? "rgba(168, 85, 247, 0.15)" 
            : "rgba(147, 51, 234, 0.1)"
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
          

          {/* Client Communication Tools section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl font-bold text-foreground mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Professional Design Handoffs & Documentation
              </motion.h2>
              <motion.p 
                className="text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                We provide comprehensive design systems and documentation that ensure seamless collaboration 
                between design and development teams.
              </motion.p>
            </div>

            {/* Stats section */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-4xl font-bold text-foreground mb-2">200+</h3>
                <p className="text-muted-foreground">Frontend projects delivered</p>
              </div>
              
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-4xl font-bold text-foreground mb-2">98%</h3>
                <p className="text-muted-foreground">Client satisfaction rate</p>
              </div>
              
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-4xl font-bold text-foreground mb-2">10+</h3>
                <p className="text-muted-foreground">Years of expertise</p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-4xl font-bold text-foreground mb-2">95+</h3>
                <p className="text-muted-foreground">Average Lighthouse score</p>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {communicationTools.map((tool, index) => (
                <CommunicationCard key={tool.title} tool={tool} index={index} />
              ))}
            </div>
          </div>

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
                Our Proven Development Process
              </motion.h2>
              <motion.p 
                className="text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                We follow industry best practices and proven methodologies honed over 10+ years to deliver 
                frontend solutions that exceed expectations and drive business results.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, index) => (
                <ProcessCard key={step.id} step={step} index={index} />
              ))}
            </div>
          </div>

          {/* Frontend Services section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl font-bold text-foreground mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Our Frontend Development Services
              </motion.h2>
              <motion.p 
                className="text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                From responsive design to performance optimization, we provide comprehensive frontend solutions 
                that deliver exceptional user experiences across all devices and platforms.
              </motion.p>
            </div>
            
            <div className="space-y-6">
              {frontendServices.map((service, index) => (
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

          {/* Technology Stack section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl font-bold text-foreground mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Our Frontend Technology Stack
              </motion.h2>
              <motion.p 
                className="text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                We leverage cutting-edge technologies and proven frameworks to build modern, scalable frontend applications.
              </motion.p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                "React 18", "Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Storybook",
                "Jest", "Cypress", "Figma", "Webpack", "Vite", "PWA"
              ].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="bg-card rounded-lg p-4 border border-border text-center hover:border-purple-500/50 transition-colors"
                >
                  <p className="font-medium text-foreground">{tech}</p>
                </motion.div>
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
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 z-0" />
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Transform Your User Experience?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Let&#39;s create a frontend that not only looks stunning but performs exceptionally. 
                Get professional design systems, performance optimization, and ongoing support from our experienced team.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block"
                >
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3.5 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    Start Your Frontend Project
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>

             
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}