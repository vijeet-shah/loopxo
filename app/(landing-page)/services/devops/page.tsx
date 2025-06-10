"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  ArrowRight,
  Cloud,
  Shield,
  Database,
  GitBranch,
  Monitor,
  Layers,
  BookOpen,
  TestTube,
  Rocket,
  Target,
  Settings,
  Container,
  Workflow,
  Lock,
  Activity,
  Gauge,
} from "lucide-react";
import { useTheme } from "next-themes";
import { ServiceCard } from "@/components/serviceCard";
import DeliverableCard from "@/components/services/deliverableCard";
import ProcessCard from "@/components/services/processCard";

// Interface for service
interface CloudDevOpsService {
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

// Cloud & DevOps Services data
const cloudDevOpsServices: CloudDevOpsService[] = [
  {
    id: "cloud-infrastructure",
    title: "Cloud Infrastructure & Architecture",
    description:
      "We design and implement scalable, secure cloud architectures on AWS, Azure, and GCP that optimize performance, reduce costs, and ensure high availability for mission-critical applications.",
    icon: Cloud,
    features: [
      "Multi-cloud and hybrid cloud architecture design",
      "Infrastructure as Code with Terraform and CloudFormation",
      "Auto-scaling and load balancing configuration",
      "Cloud migration strategy and implementation",
      "Cost optimization and resource management",
    ],
    color: {
      light: "from-blue-500 to-cyan-600",
      dark: "from-blue-400 to-cyan-500",
    },
  },
  {
    id: "devops-automation",
    title: "DevOps Automation & CI/CD Pipelines",
    description:
      "We streamline development workflows with advanced CI/CD pipelines, automated testing, and deployment strategies that accelerate delivery while maintaining code quality and reliability.",
    icon: Workflow,
    features: [
      "CI/CD pipeline development with Jenkins, GitLab, GitHub Actions",
      "Automated testing and quality assurance integration",
      "Blue-green and canary deployment strategies",
      "Infrastructure automation and configuration management",
      "Release management and rollback procedures",
    ],
    color: {
      light: "from-emerald-500 to-green-600",
      dark: "from-emerald-400 to-green-500",
    },
  },
  {
    id: "container-orchestration",
    title: "Container Orchestration & Microservices",
    description:
      "We architect and deploy containerized applications using Kubernetes and Docker, enabling scalable microservices architectures that improve development velocity and system resilience.",
    icon: Container,
    features: [
      "Kubernetes cluster setup and management",
      "Docker containerization and optimization",
      "Microservices architecture design and implementation",
      "Service mesh configuration with Istio/Linkerd",
      "Container security and compliance",
    ],
    color: {
      light: "from-purple-500 to-indigo-600",
      dark: "from-purple-400 to-indigo-500",
    },
  },
  {
    id: "monitoring-observability",
    title: "Monitoring, Logging & Observability",
    description:
      "We implement comprehensive monitoring solutions that provide real-time insights into system performance, enabling proactive issue resolution and optimal resource utilization.",
    icon: Monitor,
    features: [
      "Application and infrastructure monitoring with Prometheus, Grafana",
      "Centralized logging with ELK stack and Fluentd",
      "Distributed tracing and APM implementation",
      "Custom alerting and incident response automation",
      "Performance metrics and SLA monitoring",
    ],
    color: {
      light: "from-orange-500 to-red-600",
      dark: "from-orange-400 to-red-500",
    },
  },
  {
    id: "security-compliance",
    title: "Cloud Security & Compliance",
    description:
      "We implement robust security frameworks and ensure compliance with industry standards, protecting your cloud infrastructure and applications from threats while maintaining regulatory requirements.",
    icon: Shield,
    features: [
      "Identity and Access Management (IAM) configuration",
      "Security scanning and vulnerability assessment",
      "Compliance automation for SOC2, HIPAA, PCI-DSS",
      "Network security and firewall management",
      "Secrets management and encryption strategies",
    ],
    color: {
      light: "from-red-500 to-pink-600",
      dark: "from-red-400 to-pink-500",
    },
  },
  {
    id: "database-management",
    title: "Database Management & Optimization",
    description:
      "We manage and optimize database systems in the cloud, ensuring high performance, availability, and security for your critical data infrastructure with automated backup and disaster recovery.",
    icon: Database,
    features: [
      "Cloud database setup and migration (RDS, CosmosDB, BigQuery)",
      "Database performance tuning and optimization",
      "Automated backup and disaster recovery planning",
      "Database security and access control",
      "Multi-region replication and high availability",
    ],
    color: {
      light: "from-teal-500 to-blue-600",
      dark: "from-teal-400 to-blue-500",
    },
  },
];

// Professional development process steps
const processSteps = [
  {
    id: "01",
    title: "Infrastructure Assessment & Planning",
    description:
      "We conduct comprehensive infrastructure audits, analyze current architecture, and define cloud strategy. This includes stakeholder interviews, performance assessment, and identifying optimization opportunities to ensure alignment with business objectives.",
    icon: Target,
  },
  {
    id: "02",
    title: "Cloud Architecture & Design",
    description:
      "Our cloud architects design scalable, secure infrastructure with modern cloud platforms, define governance policies, and plan migration strategies. We establish cloud-native architectures optimized for performance and cost.",
    icon: Layers,
  },
  {
    id: "03",
    title: "DevOps Pipeline Development",
    description:
      "We develop robust CI/CD pipelines using industry-leading tools and practices. This includes automated testing integration, deployment automation, and quality gates to ensure reliable software delivery.",
    icon: GitBranch,
  },
  {
    id: "04",
    title: "Infrastructure as Code Implementation",
    description:
      "Our DevOps engineers implement Infrastructure as Code solutions with comprehensive peer review processes. Every configuration follows best practices, includes extensive documentation, and undergoes thorough validation.",
    icon: Settings,
  },
  {
    id: "05",
    title: "Testing & Security Validation",
    description:
      "We implement comprehensive testing suites including infrastructure tests, security scans, and compliance checks. All solutions are tested for performance, scalability, and security across multiple environments.",
    icon: TestTube,
  },
  {
    id: "06",
    title: "Deployment & Ongoing Management",
    description:
      "We deploy cloud solutions with monitoring and alerting in place. Clients receive detailed documentation, team training, and ongoing support for maintenance, optimization, and scaling.",
    icon: Rocket,
  },
];

// Client deliverables and tools
const deliverableTools = [
  {
    title: "Infrastructure Monitoring Dashboards",
    description:
      "Real-time infrastructure monitoring with performance metrics and automated alerting",
    icon: Activity,
  },
  {
    title: "DevOps Documentation & Runbooks",
    description:
      "Comprehensive operational procedures, deployment guides, and troubleshooting documentation",
    icon: BookOpen,
  },
  {
    title: "Security & Compliance Framework",
    description:
      "Complete security policies, compliance reports, and governance documentation",
    icon: Lock,
  },
  {
    title: "Performance Analytics & Reports",
    description:
      "Detailed infrastructure performance metrics, cost analysis, and optimization recommendations",
    icon: Gauge,
  },
];

// Main Cloud DevOps Page Component
export default function CloudDevOpsManagement() {
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
            "radial-gradient(circle at 20% 30%, var(--gradient-1) 0%, transparent 70%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={
          {
            "--gradient-1":
              theme === "dark"
                ? "rgba(6, 182, 212, 0.15)"
                : "rgba(14, 165, 233, 0.1)",
          } as React.CSSProperties
        }
      />

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          style={{
            perspective: "1200px",
            transform: `rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg)`,
            transformStyle: "preserve-3d",
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
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
                Professional Cloud Solutions & DevOps Deliverables
              </motion.h2>
              <motion.p
                className="text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                We provide comprehensive cloud infrastructure and DevOps
                solutions that ensure seamless deployment, monitoring, and
                scaling of your applications with enterprise-grade reliability.
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
                <h3 className="text-4xl font-bold text-foreground mb-2">
                  200+
                </h3>
                <p className="text-muted-foreground">
                  Cloud migrations completed
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-4xl font-bold text-foreground mb-2">
                  99.9%
                </h3>
                <p className="text-muted-foreground">Infrastructure uptime</p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-4xl font-bold text-foreground mb-2">10+</h3>
                <p className="text-muted-foreground">
                  Years of DevOps expertise
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-4xl font-bold text-foreground mb-2">50%</h3>
                <p className="text-muted-foreground">Average cost reduction</p>
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
                Our Proven Cloud & DevOps Process
              </motion.h2>
              <motion.p
                className="text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                We follow industry best practices and proven methodologies
                refined over 10+ years to deliver cloud infrastructure that
                drives business growth and operational efficiency.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, index) => (
                <ProcessCard key={step.id} step={step} index={index} />
              ))}
            </div>
          </div>

          {/* Cloud DevOps Services section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <motion.h2
                className="text-3xl font-bold text-foreground mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                Our Cloud & DevOps Services
              </motion.h2>
              <motion.p
                className="text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                From cloud architecture to automated deployments, we provide
                comprehensive DevOps solutions that accelerate development
                cycles and ensure reliable, scalable infrastructure.
              </motion.p>
            </div>

            <div className="space-y-6">
              {cloudDevOpsServices.map((service, index) => (
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
                Our Cloud & DevOps Technology Stack
              </motion.h2>
              <motion.p
                className="text-muted-foreground max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                We leverage cutting-edge cloud platforms and DevOps tools to
                build resilient, scalable infrastructure solutions.
              </motion.p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                "AWS",
                "Azure",
                "Google Cloud",
                "Kubernetes",
                "Docker",
                "Terraform",
                "Jenkins",
                "GitLab CI",
                "Prometheus",
                "Grafana",
                "ELK Stack",
                "Ansible",
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
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-cyan-500/5 z-0" />

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to Scale Your Cloud Infrastructure?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Let&#39;s transform your infrastructure into a scalable, secure,
                and cost-effective solution that drives business growth. Get
                expert cloud architecture, DevOps automation, and strategic
                guidance from our experienced team.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block"
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3.5 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all"
                  >
                    Start Cloud Migration
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
