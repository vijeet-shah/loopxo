"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import { 
  ArrowRight, 
  BarChart3, 
  Brain, 
  Shield, 
  Database, 
  GitBranch, 
  Layers,
  BookOpen,
  TestTube,
  Rocket,
  Target,
  TrendingUp,
  Cpu,
  ChartLine,
 
} from "lucide-react";
import { useTheme } from "next-themes";
import { ServiceCard } from "@/components/serviceCard";
import ProcessCard from "@/components/services/processCard";
import DeliverableCard from "@/components/services/deliverableCard";

// Interface for service
interface DataScienceService {
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

// Data Science Services data
const dataScienceServices: DataScienceService[] = [
  {
    id: "ai-ml-development",
    title: "AI & Machine Learning Solutions",
    description: "We build intelligent AI systems and machine learning models that transform raw data into actionable insights, automating complex decision-making processes with enterprise-grade accuracy.",
    icon: Brain,
    features: [
      "Custom ML model development and deployment",
      "Natural Language Processing and Computer Vision",
      "Deep Learning with TensorFlow and PyTorch",
      "AI model optimization and performance tuning",
      "MLOps pipelines for continuous model improvement"
    ],
    color: {
      light: "from-blue-500 to-purple-600",
      dark: "from-blue-400 to-purple-500"
    }
  },
  {
    id: "data-analytics",
    title: "Advanced Data Analytics & Visualization",
    description: "We transform complex datasets into compelling visual stories and actionable business intelligence through advanced analytics, interactive dashboards, and predictive modeling.",
    icon: BarChart3,
    features: [
      "Interactive dashboard development with Tableau/Power BI",
      "Statistical analysis and hypothesis testing",
      "Predictive analytics and forecasting models",
      "Real-time data visualization and monitoring",
      "Custom reporting automation and KPI tracking"
    ],
    color: {
      light: "from-emerald-500 to-teal-600",
      dark: "from-emerald-400 to-teal-500"
    }
  },
  {
    id: "big-data-engineering",
    title: "Big Data Engineering & Architecture",
    description: "We design and implement scalable data infrastructure that handles petabytes of data efficiently, ensuring optimal performance, security, and accessibility across your organization.",
    icon: Database,
    features: [
      "Data pipeline development with Apache Spark/Kafka",
      "Cloud data warehousing (AWS, GCP, Azure)",
      "ETL/ELT process optimization and automation",
      "Data lake architecture and implementation",
      "Real-time streaming data processing"
    ],
    color: {
      light: "from-amber-500 to-orange-600",
      dark: "from-amber-400 to-orange-500"
    }
  },
  {
    id: "ai-consulting",
    title: "AI Strategy & Implementation Consulting",
    description: "We guide organizations through AI transformation with strategic planning, technology selection, and implementation roadmaps that align with business objectives and deliver measurable ROI.",
    icon: Cpu,
    features: [
      "AI readiness assessment and strategy development",
      "Technology stack selection and architecture design",
      "AI governance and ethical AI implementation",
      "Change management and team training programs",
      "ROI measurement and continuous optimization"
    ],
    color: {
      light: "from-purple-500 to-pink-600",
      dark: "from-purple-400 to-pink-500"
    }
  },
  {
    id: "data-security",
    title: "Data Security & Compliance",
    description: "We implement comprehensive data security frameworks and ensure compliance with industry regulations while maintaining data accessibility and analytical capabilities.",
    icon: Shield,
    features: [
      "GDPR, HIPAA, and SOX compliance implementation",
      "Data encryption and access control systems",
      "Privacy-preserving analytics and differential privacy",
      "Data governance framework development",
      "Security auditing and vulnerability assessment"
    ],
    color: {
      light: "from-red-500 to-rose-600",
      dark: "from-red-400 to-rose-500"
    }
  },
  {
    id: "model-optimization",
    title: "Model Testing & Performance Optimization",
    description: "We ensure AI models perform reliably in production through rigorous testing, validation, and continuous optimization strategies that maintain accuracy and efficiency at scale.",
    icon: TestTube,
    features: [
      "A/B testing for ML models and data experiments",
      "Model validation and cross-validation strategies",
      "Performance monitoring and model drift detection",
      "Automated model retraining and deployment",
      "Quality assurance for data pipelines and processes"
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
    title: "Data Discovery & Business Understanding",
    description: "We conduct comprehensive data audits, analyze business requirements, and define success metrics. This includes stakeholder interviews, data quality assessment, and identifying key performance indicators to ensure alignment with business objectives.",
    icon: Target
  },
  {
    id: "02",
    title: "Data Architecture & Infrastructure Design",
    description: "Our data engineers design scalable data architecture with modern cloud platforms, define data governance policies, and plan integration strategies. We establish data lakes, warehouses, and processing pipelines for optimal performance.",
    icon: Layers
  },
  {
    id: "03",
    title: "AI/ML Model Development & Training",
    description: "We develop custom machine learning models using cutting-edge algorithms and frameworks. This includes feature engineering, model selection, hyperparameter tuning, and rigorous validation to ensure optimal performance.",
    icon: Brain
  },
  {
    id: "04",
    title: "Implementation & Code Review",
    description: "Our senior AI developers implement production-ready solutions with comprehensive peer review processes. Every model and pipeline follows coding standards, includes extensive documentation, and undergoes thorough testing.",
    icon: GitBranch
  },
  {
    id: "05",
    title: "Testing & Quality Assurance",
    description: "We implement comprehensive testing suites including unit tests, integration tests, and model validation. All solutions are tested for accuracy, performance, scalability, and bias detection across diverse datasets.",
    icon: TestTube
  },
  {
    id: "06",
    title: "Deployment & Monitoring",
    description: "We deploy AI solutions with MLOps pipelines and implement comprehensive monitoring. Clients receive detailed documentation, training materials, and ongoing support for maintenance and model improvements.",
    icon: Rocket
  }
];

// Client deliverables and tools
const deliverableTools = [
  {
    title: "Interactive Analytics Dashboards",
    description: "Real-time business intelligence dashboards with drill-down capabilities and automated insights",
    icon: ChartLine
  },
  {
    title: "Model Documentation & APIs",
    description: "Comprehensive ML model documentation with RESTful APIs for seamless integration",
    icon: BookOpen
  },
  {
    title: "Data Governance Framework",
    description: "Complete data governance policies, procedures, and compliance documentation",
    icon: Shield
  },
  {
    title: "Performance Analytics Reports",
    description: "Detailed model performance metrics, ROI analysis, and optimization recommendations",
    icon: TrendingUp
  }
];





// Main Data Science Page Component
export default function DataScienceAnalytics() {
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
          

          {/* Client Deliverables section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl font-bold text-foreground mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Professional AI Solutions & Analytics Deliverables
              </motion.h2>
              <motion.p 
                className="text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                We provide comprehensive AI solutions and data analytics deliverables that ensure seamless 
                integration and maximum business impact from your data science investments.
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
                <h3 className="text-4xl font-bold text-foreground mb-2">150+</h3>
                <p className="text-muted-foreground">AI/ML models deployed</p>
              </div>
              
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-4xl font-bold text-foreground mb-2">95%</h3>
                <p className="text-muted-foreground">Model accuracy rate</p>
              </div>
              
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-4xl font-bold text-foreground mb-2">10+</h3>
                <p className="text-muted-foreground">Years of AI expertise</p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-4xl font-bold text-foreground mb-2">500M+</h3>
                <p className="text-muted-foreground">Data points processed</p>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deliverableTools.map((tool, index) => (
                <DeliverableCard key={tool.title} tool={tool} index={index} />
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
                Our Proven AI Development Process
              </motion.h2>
              <motion.p 
                className="text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                We follow industry best practices and proven methodologies refined over 10+ years to deliver 
                AI solutions that drive measurable business outcomes and sustainable competitive advantages.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, index) => (
                <ProcessCard key={step.id} step={step} index={index} />
              ))}
            </div>
          </div>

          {/* Data Science Services section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl font-bold text-foreground mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Our Data Science & AI Services
              </motion.h2>
              <motion.p 
                className="text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                From machine learning models to big data engineering, we provide comprehensive data science 
                solutions that unlock the full potential of your data and drive intelligent business decisions.
              </motion.p>
            </div>
            
            <div className="space-y-6">
              {dataScienceServices.map((service, index) => (
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
                Our AI & Data Science Technology Stack
              </motion.h2>
              <motion.p 
                className="text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                We leverage cutting-edge AI frameworks and enterprise-grade data platforms to build scalable, intelligent solutions.
              </motion.p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                "Python", "TensorFlow", "PyTorch", "Scikit-learn", "Apache Spark", "Kafka",
                "AWS SageMaker", "Google AI", "Azure ML", "Tableau", "Power BI", "MLflow"
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
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 z-0" />
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Unlock Your Data&#39;s Intelligence?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Let&#39;s transform your data into intelligent business solutions that drive growth and innovation. 
                Get expert AI development, advanced analytics, and strategic guidance from our experienced team.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block"
                >
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3.5 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    Start Your AI Journey
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