"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { ChevronRight, Sparkles, Users, GraduationCap, Globe, Mail, MapPin, Clock, Briefcase, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";

// Define the job posting interface
interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
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
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
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
    color: {
      light: "from-purple-500 to-pink-500",
      dark: "from-purple-400 to-pink-400"
    }
  },
  {
    id: "be-dev",
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "4+ years",
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
    color: {
      light: "from-emerald-500 to-teal-500",
      dark: "from-emerald-400 to-teal-400"
    }
  },
  {
    id: "data-sci",
    title: "Data Scientist",
    department: "Data",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
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
    color: {
      light: "from-cyan-500 to-blue-500",
      dark: "from-cyan-400 to-blue-400"
    }
  }
];

// Benefit item component
const BenefitItem = ({ icon: Icon, title }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div 
      className="flex items-center gap-3 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
      whileHover={{ 
        scale: 1.02,
        y: -2,
        boxShadow: theme === "dark" 
          ? "0 10px 25px rgba(0,0,0,0.3)" 
          : "0 10px 25px rgba(0,0,0,0.1)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center relative overflow-hidden ${
        theme === "dark" ? "bg-primary/20" : "bg-primary/10"
      }`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
        <Icon className="h-6 w-6 text-primary relative z-10" />
      </div>
      <span className="text-sm font-medium text-foreground">{title}</span>
    </motion.div>
  );
};

const JobCard = ({ job, index, isExpanded, toggleExpand }) => {
  
  const handleGetInTouch = () => {
    const subject = encodeURIComponent(`Application for ${job.title} Position`);
    const body = encodeURIComponent(`Dear Hiring Team,

I am interested in applying for the ${job.title} position at your company. I believe my skills and experience align well with the requirements for this role.

Please find my resume attached, and I look forward to discussing this opportunity further.

Best regards,
[Your Name]`);
    
    window.location.href = `mailto:hiring@loopxo.com?subject=${subject}&body=${body}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
        {/* Gradient overlay */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r  opacity-5`} />
        
        {/* Card content */}
        <div className="relative z-10 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {job.title}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${job.color.light} text-white`}>
                  {job.department}
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {job.type}
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase size={14} />
                  {job.experience}
                </div>
              </div>
            </div>
            
            <motion.button
              onClick={() => toggleExpand(job.id)}
              className="ml-4 p-2 rounded-full hover:bg-muted/50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} className="text-muted-foreground" />
              </motion.div>
            </motion.button>
          </div>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            {job.description}
          </p>

          <motion.div
            initial={false}
            animate={{ 
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-6 pt-4 border-t border-border/50">
              {/* Responsibilities */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Key Responsibilities
                </h4>
                <ul className="space-y-2">
                  {job.responsibilities.map((resp, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {resp}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Requirements
                </h4>
                <ul className="space-y-2">
                  {job.requirements.map((req, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {req}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Get in Touch Button */}
              <div className="flex justify-center pt-4">
                <motion.button
                  onClick={handleGetInTouch}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r ${job.color.light} hover:shadow-lg transition-all duration-300 group/btn`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail size={16} />
                  Get in Touch
                  <motion.div
                    className="group-hover/btn:translate-x-1 transition-transform duration-300"
                  >
                    <ChevronRight size={16} />
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Career Page Component
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
      className="min-h-screen relative overflow-hidden py-20 bg-background"
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, var(--gradient-1) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 60%, var(--gradient-2) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, var(--gradient-3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 30%, var(--gradient-1) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "loop"
          }}
          style={{ 
            "--gradient-1": theme === "dark" ? "rgba(79, 70, 229, 0.2)" : "rgba(59, 130, 246, 0.15)",
            "--gradient-2": theme === "dark" ? "rgba(236, 72, 153, 0.2)" : "rgba(236, 72, 153, 0.15)",
            "--gradient-3": theme === "dark" ? "rgba(34, 197, 94, 0.2)" : "rgba(34, 197, 94, 0.15)"
          } as React.CSSProperties}
        />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main content container */}
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
          {/* Enhanced Why join us section */}
          <motion.div 
            className="mb-16 p-8 rounded-3xl bg-background/60 border border-border/50 backdrop-blur-xl relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Enhanced background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-tl from-secondary/10 via-transparent to-primary/5" />
            
            <div className="relative z-10">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Why Join Our Agency?
              </motion.h2>

              <motion.p 
                className="text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Join our team of passionate professionals creating innovative solutions for the digital age. 
                We offer a collaborative environment where your skills and creativity can thrive in an atmosphere of continuous learning and growth.
              </motion.p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Sparkles, title: "Creative Environment" },
                  { icon: Users, title: "Collaborative Culture" },
                  { icon: GraduationCap, title: "Growth Opportunities" },
                  { icon: Globe, title: "Remote-Friendly" }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <BenefitItem icon={item.icon} title={item.title} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Enhanced Filter section */}
          <motion.div 
            className="mb-8 p-6 rounded-2xl bg-muted/30 border border-border/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center gap-4">
              <div className="text-foreground font-semibold text-lg">Filter by department:</div>
              <div className="flex flex-wrap gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDepartment(null)}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                    selectedDepartment === null
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'bg-background text-muted-foreground hover:text-foreground hover:bg-muted border border-border/50'
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
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                      selectedDepartment === dept
                        ? 'bg-primary text-white shadow-lg shadow-primary/25'
                        : 'bg-background text-muted-foreground hover:text-foreground hover:bg-muted border border-border/50'
                    }`}
                  >
                    {dept}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Job listings */}
          <div className="space-y-6">
            {filteredJobs.length === 0 ? (
              <motion.div 
                className="text-center py-16 border border-border/50 rounded-2xl bg-muted/30 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-semibold text-foreground mb-3">No open positions found</h3>
                <p className="text-muted-foreground text-lg">There are currently no openings in this department. Please check back later or try another category.</p>
              </motion.div>
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

          {/* Enhanced No suitable roles section */}
          <motion.div 
            className="mt-16 p-8 rounded-3xl border border-border/50 bg-background/60 backdrop-blur-xl relative overflow-hidden text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-foreground mb-4">Don&#39;t see a suitable role?</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                We&#39;re always looking for talented individuals to join our team. Send us your resume and we&#39;ll keep you in mind for future opportunities that match your expertise.
              </p>
              
              <motion.button
                onClick={() => {
                  const subject = encodeURIComponent("General Application - Future Opportunities");
                  const body = encodeURIComponent(`Dear Hiring Team,

I am interested in joining your team and would like to be considered for future opportunities that match my skills and experience.

Please find my resume attached, and I look forward to discussing potential roles when they become available.

Best regards,
[Your Name]`);
                  
                  window.location.href = `mailto:hiring@loopxo.com?subject=${subject}&body=${body}`;
                }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary/80 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
                Send us your resume
                <motion.div
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <ChevronRight size={20} />
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}