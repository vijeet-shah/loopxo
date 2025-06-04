"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Briefcase, Clock, MapPin, CreditCard, Check, Sparkles, Users, GraduationCap, Globe } from "lucide-react";
import { useTheme } from "next-themes";

// Define the job posting interface
interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  experience: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  color: {
    light: string;
    dark: string;
  };
}

// Available job postings data
const jobPostings: JobPosting[] = [
  {
    id: "fe-dev",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "New York, NY (Hybrid)",
    type: "Full-time",
    experience: "3+ years",
    salary: "$100,000 - $130,000",
    description: "We're seeking a skilled Frontend Developer to join our engineering team to build exceptional user interfaces. You'll collaborate with designers and backend developers to create responsive and interactive web applications.",
    responsibilities: [
      "Develop responsive and accessible web applications using React, TypeScript, and Next.js",
      "Collaborate with UX designers to create intuitive user interfaces",
      "Write clean, maintainable, and reusable code",
      "Optimize applications for maximum speed and scalability",
      "Work with backend developers to integrate frontend with API services"
    ],
    requirements: [
      "3+ years of experience with modern JavaScript frameworks (React, Vue, Angular)",
      "Strong knowledge of TypeScript and Next.js",
      "Experience with state management solutions (Redux, Context API)",
      "Familiarity with CSS frameworks like Tailwind CSS",
      "Understanding of responsive design principles and cross-browser compatibility",
      "Good eye for design and attention to detail"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Flexible work arrangements with hybrid options",
      "Comprehensive health, dental, and vision insurance",
      "401(k) plan with company match",
      "Professional development budget",
      "Unlimited PTO policy"
    ],
    color: {
      light: "from-blue-500 to-indigo-600",
      dark: "from-blue-400 to-indigo-500"
    }
  },
  {
    id: "ui-ux",
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    experience: "2+ years",
    salary: "$90,000 - $115,000",
    description: "We're looking for a creative UI/UX Designer to craft visually stunning and intuitive user experiences. You'll transform complex requirements into elegant designs that delight our users.",
    responsibilities: [
      "Create user-centered designs by understanding business requirements and user feedback",
      "Design wireframes, prototypes, and high-fidelity mockups",
      "Conduct user research and testing to validate design decisions",
      "Work closely with developers to ensure design implementation matches specifications",
      "Create and maintain design systems for consistent user experience"
    ],
    requirements: [
      "2+ years experience in UI/UX design for digital products",
      "Proficiency in design tools like Figma, Adobe XD, or Sketch",
      "Strong portfolio demonstrating UX process and high-quality UI designs",
      "Understanding of interaction design principles and accessibility standards",
      "Basic knowledge of frontend development (HTML, CSS) is a plus",
      "Excellent communication and collaboration skills"
    ],
    benefits: [
      "Fully remote position with flexible hours",
      "Health insurance with dental and vision coverage",
      "Annual design conference budget",
      "Regular team retreats to inspiring locations",
      "Latest design software and hardware provided",
      "Growth opportunities in a rapidly scaling company"
    ],
    color: {
      light: "from-purple-500 to-pink-500",
      dark: "from-purple-400 to-pink-400"
    }
  },
  {
    id: "be-dev",
    title: "Backend Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "4+ years",
    salary: "$120,000 - $150,000",
    description: "We're seeking an experienced Backend Engineer to design and build scalable systems that power our applications. You'll be responsible for server-side logic, database integrations, and API development.",
    responsibilities: [
      "Design and develop scalable backend services and APIs",
      "Implement security and data protection systems",
      "Optimize server-side performance and response times",
      "Integrate with databases, caching layers, and external services",
      "Collaborate with frontend developers to integrate user-facing elements"
    ],
    requirements: [
      "4+ years experience in backend development",
      "Proficiency in Python, Node.js, or Golang",
      "Experience with database systems (SQL and NoSQL)",
      "Understanding of RESTful API design and GraphQL",
      "Knowledge of cloud services (AWS, GCP, or Azure)",
      "Experience with microservices architecture"
    ],
    benefits: [
      "Competitive compensation package with equity",
      "Comprehensive health, dental, and vision insurance",
      "Flexible work arrangements with remote options",
      "401(k) matching program",
      "Home office stipend and equipment budget",
      "Continuous learning and conference allowance"
    ],
    color: {
      light: "from-emerald-500 to-teal-500",
      dark: "from-emerald-400 to-teal-400"
    }
  },
  {
    id: "data-sci",
    title: "Data Scientist",
    department: "Data",
    location: "Boston, MA (Hybrid)",
    type: "Full-time",
    experience: "3+ years",
    salary: "$110,000 - $140,000",
    description: "Join our data team to extract insights from complex datasets and develop machine learning models that power our products. You'll work with cross-functional teams to drive data-informed decisions.",
    responsibilities: [
      "Develop and implement machine learning and statistical models",
      "Process, cleanse, and validate data for analysis",
      "Build data visualization tools and dashboards",
      "Collaborate with product teams to implement data-driven features",
      "Communicate findings and insights to technical and non-technical stakeholders"
    ],
    requirements: [
      "3+ years experience in data science or related field",
      "Strong background in statistics, mathematics, or computer science",
      "Proficiency in Python and data science libraries (Pandas, NumPy, TensorFlow)",
      "Experience with SQL and data visualization tools",
      "Knowledge of machine learning techniques and algorithms",
      "Good communication skills to present complex findings clearly"
    ],
    benefits: [
      "Competitive salary with performance bonuses",
      "Flexible work arrangements (3 days in office, 2 remote)",
      "Comprehensive benefits package",
      "401(k) with generous company match",
      "Continuing education reimbursement",
      "Regular team social events and activities"
    ],
    color: {
      light: "from-orange-500 to-amber-500",
      dark: "from-orange-400 to-amber-400"
    }
  },
  {
    id: "pm",
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    experience: "5+ years",
    salary: "$130,000 - $160,000",
    description: "We're looking for a strategic Product Manager to define product vision and roadmap. You'll work with engineering, design, and marketing teams to deliver exceptional products that solve real customer problems.",
    responsibilities: [
      "Define product vision, strategy and roadmap based on market research",
      "Gather and prioritize product requirements from stakeholders",
      "Work closely with engineering and design teams throughout product development",
      "Analyze customer feedback and usage metrics to guide product decisions",
      "Coordinate product launches and continuous improvement initiatives"
    ],
    requirements: [
      "5+ years of product management experience in tech",
      "Strong analytical skills with data-driven decision making",
      "Experience with agile methodologies and product development cycles",
      "Excellent communication and presentation skills",
      "Technical background or understanding of software development",
      "Track record of successful product launches"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Fully remote position with occasional team gatherings",
      "Comprehensive health benefits",
      "Home office stipend and equipment allowance",
      "Professional development budget",
      "Flexible vacation policy"
    ],
    color: {
      light: "from-cyan-500 to-blue-500",
      dark: "from-cyan-400 to-blue-400"
    }
  }
];

// Floating decorative element component
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

// Benefit item component
const BenefitItem = ({ icon: Icon, title }) => {
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

// Individual Job Card Component
const JobCard = ({ 
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
            <div className="flex items-center gap-1.5">
              <CreditCard size={14} className="text-muted-foreground" />
              <span>{job.salary}</span>
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

export default function CareersPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(pageRef, { once: false, margin: "-10% 0px" });
  const controls = useAnimation();
  const { theme } = useTheme();

  // Department filters for job listings
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  
  // Unique departments for filter
  const departments = Array.from(new Set(jobPostings.map(job => job.department)));

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Filter jobs by department if selected
  const filteredJobs = selectedDepartment 
    ? jobPostings.filter(job => job.department === selectedDepartment)
    : jobPostings;

  // 3D Tilt effect on mouse move
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const rect = pageRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;
    
    const tiltX = (mouseY / centerY) * 3;
    const tiltY = -(mouseX / centerX) * 3;
    
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
            ? "rgba(79, 70, 229, 0.15)" 
            : "rgba(59, 130, 246, 0.1)"
        } as React.CSSProperties}
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
      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <motion.div
          style={{
            perspective: "1200px",
            transform: `rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg)`
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
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.25)"
                }}
              >
                <span className="relative flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Join Our Team</span>
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
                Build Your Career
              </span>
              <br />
              <span className="relative inline-block text-primary">
                With Our Agency
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
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Join our team of passionate professionals creating innovative solutions for the digital age. We offer a collaborative environment where your skills and creativity can thrive.
            </motion.p>
          </motion.div>

          {/* Why join us section */}
          <motion.div 
            className="mb-16 p-8 rounded-2xl bg-muted/40 border border-border backdrop-blur-sm relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-dark/5 z-0" />
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Why Join Our Agency?</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                <BenefitItem 
                  icon={Sparkles} 
                  title="Creative Environment" 
                />
                <BenefitItem 
                  icon={Users} 
                  title="Collaborative Culture" 
                />
                <BenefitItem 
                  icon={GraduationCap} 
                  title="Growth Opportunities" 
                />
                <BenefitItem 
                  icon={Globe} 
                  title="Remote-Friendly" 
                />
              </div>
            </div>
          </motion.div>

          {/* Filter section */}
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <div className="text-foreground font-medium">Filter by department:</div>
            <div className="flex flex-wrap gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDepartment(null)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  selectedDepartment === null
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                All Roles
              </motion.button>
              
              {departments.map((dept) => (
                <motion.button
                  key={dept}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    selectedDepartment === dept
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {dept}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Job listings */}
          <div className="space-y-6">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12 border border-border rounded-xl bg-muted/40">
                <h3 className="text-xl font-medium text-foreground mb-2">No open positions found</h3>
                <p className="text-muted-foreground">There are currently no openings in this department. Please check back later or try another category.</p>
              </div>
            ) : (
              filteredJobs.map((job, index) => (
                <JobCard
                  key={job.id}
                  job={job}
                  index={index}
                  isExpanded={expandedId === job.id}
                  toggleExpand={toggleExpand}
                />
              ))
            )}
          </div>

          {/* No suitable roles section */}
          <motion.div 
            className="mt-16 p-8 rounded-2xl border border-border relative overflow-hidden text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-3">Don&#39;t see a suitable role?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We&#39;re always looking for talented individuals to join our team. Send us your resume and we&#39;ll keep you in mind for future opportunities.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Send us your resume
                <ChevronRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}