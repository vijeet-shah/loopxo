"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { 
  ArrowRight, 
  Database, 
  Shield, 
  Code2, 
  Cloud, 
  Workflow, 
  GitBranch, 
  FileText,
  Monitor,
  Zap,
  Globe,
  BookOpen,
  TestTube
} from "lucide-react";
import { useTheme } from "next-themes";
import { ServiceCard } from "@/components/serviceCard";
import ProcessCard from "@/components/services/processCard";

// Interface for service
interface BackendService {
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

// Backend Development Services data
const backendServices: BackendService[] = [
  {
    id: "api-development",
    title: "API Development & Integration",
    description: "We design and build robust, scalable APIs that serve as the backbone of your digital ecosystem, ensuring seamless data flow and system integration.",
    icon: Globe,
    features: [
      "RESTful API design and development",
      "GraphQL implementation and optimization",
      "Third-party API integration (Payment gateways, Social media, Cloud services)",
      "API versioning and backward compatibility",
      "Real-time APIs with WebSocket and Server-Sent Events"
    ],
    color: {
      light: "from-blue-500 to-indigo-600",
      dark: "from-blue-400 to-indigo-500"
    }
  },
  {
    id: "database-architecture",
    title: "Database Design & Optimization",
    description: "Our database architects create efficient, scalable data structures that grow with your business while maintaining optimal performance.",
    icon: Database,
    features: [
      "Database schema design and normalization",
      "SQL and NoSQL database optimization",
      "Data migration and ETL processes",
      "Database performance tuning and indexing",
      "Backup strategies and disaster recovery planning"
    ],
    color: {
      light: "from-emerald-500 to-teal-600",
      dark: "from-emerald-400 to-teal-500"
    }
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud Infrastructure & DevOps",
    description: "We architect and deploy scalable cloud solutions with automated CI/CD pipelines that ensure reliable, efficient application delivery.",
    icon: Cloud,
    features: [
      "AWS, Azure, and Google Cloud Platform deployment",
      "Containerization with Docker and Kubernetes",
      "CI/CD pipeline setup with automated testing",
      "Infrastructure as Code (Terraform, CloudFormation)",
      "Monitoring, logging, and alerting systems"
    ],
    color: {
      light: "from-purple-500 to-pink-600",
      dark: "from-purple-400 to-pink-500"
    }
  },
  {
    id: "security-compliance",
    title: "Security & Compliance",
    description: "We implement comprehensive security measures and ensure compliance with industry standards to protect your data and maintain user trust.",
    icon: Shield,
    features: [
      "Authentication and authorization systems (OAuth, JWT)",
      "Data encryption at rest and in transit",
      "GDPR, HIPAA, and SOC2 compliance implementation",
      "Security audits and penetration testing",
      "Rate limiting and DDoS protection"
    ],
    color: {
      light: "from-red-500 to-rose-600",
      dark: "from-red-400 to-rose-500"
    }
  },
  {
    id: "microservices",
    title: "Microservices Architecture",
    description: "We design and implement microservices architectures that provide flexibility, scalability, and maintainability for complex applications.",
    icon: Workflow,
    features: [
      "Service decomposition and domain modeling",
      "Inter-service communication patterns",
      "Service mesh implementation (Istio, Linkerd)",
      "Event-driven architecture with message queues",
      "Distributed system monitoring and tracing"
    ],
    color: {
      light: "from-amber-500 to-orange-600",
      dark: "from-amber-400 to-orange-500"
    }
  },
  {
    id: "performance-optimization",
    title: "Performance & Scalability",
    description: "We optimize backend systems for high performance and scalability, ensuring your applications can handle growth and peak loads efficiently.",
    icon: Zap,
    features: [
      "Application performance profiling and optimization",
      "Caching strategies (Redis, Memcached, CDN)",
      "Load balancing and auto-scaling implementation",
      "Database query optimization and connection pooling",
      "Asynchronous processing and job queues"
    ],
    color: {
      light: "from-cyan-500 to-blue-600",
      dark: "from-cyan-400 to-blue-500"
    }
  }
];

// Professional development process steps
const processSteps = [
  {
    id: "01",
    title: "Discovery & Requirements Analysis",
    description: "We conduct comprehensive stakeholder interviews, analyze business requirements, and define technical specifications. This includes API requirements gathering, data flow analysis, and integration mapping with existing systems.",
    icon: FileText
  },
  {
    id: "02",
    title: "Architecture Design & Documentation",
    description: "Our architects create detailed system designs, database schemas, and API specifications. We provide comprehensive documentation including technical architecture diagrams, data models, and integration blueprints.",
    icon: Code2
  },
  {
    id: "03",
    title: "API Design & Swagger Documentation",
    description: "We design RESTful APIs following OpenAPI specifications and create detailed Swagger documentation. This includes endpoint definitions, request/response schemas, authentication methods, and error handling protocols.",
    icon: BookOpen
  },
  {
    id: "04",
    title: "Development & Code Review",
    description: "Our senior developers implement backend services using industry best practices. Every piece of code undergoes rigorous peer review, follows coding standards, and includes comprehensive unit and integration tests.",
    icon: GitBranch
  },
  {
    id: "05",
    title: "Testing & Quality Assurance",
    description: "We implement automated testing suites including unit tests, integration tests, and load testing. API endpoints are thoroughly tested using Postman collections and automated test scenarios.",
    icon: TestTube
  },
  {
    id: "06",
    title: "Deployment & Monitoring",
    description: "We deploy applications to production environments with comprehensive monitoring, logging, and alerting. Clients receive deployment guides, API documentation, and ongoing support for system maintenance.",
    icon: Monitor
  }
];

// Client communication tools and deliverables
const communicationTools = [
  {
    title: "OpenAPI Documentation",
    description: "Interactive API documentation with live testing capabilities",
    icon: BookOpen
  },
  {
    title: "Postman Collections",
    description: "Pre-configured API testing collections for easy integration",
    icon: TestTube
  },
  {
    title: "Technical Architecture Diagrams",
    description: "Detailed system architecture and data flow visualizations",
    icon: Workflow
  },
  {
    title: "Database Schema Documentation",
    description: "Comprehensive database design with relationships and constraints",
    icon: Database
  }
];




// Communication tools card component
const CommunicationCard = ({ tool, index }: { tool: any, index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px 0px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-card rounded-lg p-6 border border-border hover:border-blue-500/50 transition-colors"
    >
      <div className="flex items-center gap-3 mb-3">
        
        <h3 className="font-semibold text-foreground">{tool.title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{tool.description}</p>
    </motion.div>
  );
};

// Main Backend Development Page Component
export default function BackendDevelopment() {
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
            ? "rgba(59, 130, 246, 0.15)" 
            : "rgba(37, 99, 235, 0.1)"
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
                Professional Client Communication & Documentation
              </motion.h2>
              <motion.p 
                className="text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                We provide comprehensive documentation and communication tools that ensure seamless collaboration 
                and easy integration of backend services.
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
              <h3 className="text-4xl font-bold text-foreground mb-2">60+</h3>
              <p className="text-muted-foreground">Backend systems delivered</p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-4xl font-bold text-foreground mb-2">99.9%</h3>
              <p className="text-muted-foreground">Average system uptime</p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-4xl font-bold text-foreground mb-2">5+</h3>
              <p className="text-muted-foreground">Years of expertise</p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-4xl font-bold text-foreground mb-2">10M+</h3>
              <p className="text-muted-foreground">API calls handled daily</p>
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
                Our Professional Development Process
              </motion.h2>
              <motion.p 
                className="text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                We follow industry best practices and proven methodologies to deliver backend solutions 
                that exceed expectations and stand the test of time.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, index) => (
                <ProcessCard key={step.id} step={step} index={index} />
              ))}
            </div>
          </div>

          {/* Backend Services section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl font-bold text-foreground mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Our Backend Development Services
              </motion.h2>
              <motion.p 
                className="text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                From API development to cloud infrastructure, we provide end-to-end backend solutions 
                that scale with your business needs.
              </motion.p>
            </div>
            
            <div className="space-y-6">
              {backendServices.map((service, index) => (
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
                Our Technology Stack
              </motion.h2>
              <motion.p 
                className="text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                We leverage cutting-edge technologies and proven frameworks to build robust backend systems.
              </motion.p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                "Node.js", "Python", "Java", "Go", "PostgreSQL", "MongoDB",
                "Redis", "Docker", "Kubernetes", "AWS", "GraphQL", "REST API"
              ].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="bg-card rounded-lg p-4 border border-border text-center hover:border-blue-500/50 transition-colors"
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
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 z-0" />
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Build Your Next Backend System?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Let&#39;s discuss your backend requirements and create a scalable solution that grows with your business. 
                Get professional documentation, API specs, and ongoing support from day one.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block"
                >
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Start Your Backend Project
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