"use client"

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Send, Phone, Mail, MapPin, ExternalLink, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function GetInTouchSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10% 0px" });
  const controls = useAnimation();
  const { theme } = useTheme();
  
  // Form state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    submitted: false,
    submitting: false,
    error: null
  });
  
  // 3D Tilt effect on mouse move (similar to ServiceSection)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;
    
    const tiltX = (mouseY / centerY) * 3;
    const tiltY = -(mouseX / centerX) * 3;
    
    setMousePosition({ x: tiltX, y: tiltY });
  };
  
  // Start animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, submitting: true, error: null }));
    
    // Simulate form submission
    setTimeout(() => {
      setFormState(prev => ({ 
        ...prev, 
        submitting: false, 
        submitted: true 
      }));
    }, 1500);
  };
  
  // Contact methods with animations for staggered entry
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
      color: theme === "dark" ? "from-blue-400 to-indigo-500" : "from-blue-500 to-indigo-600"
    },
    {
      icon: Mail,
      title: "Email Us",
      value: "contact@example.com",
      href: "mailto:contact@example.com",
      color: theme === "dark" ? "from-cyan-400 to-teal-500" : "from-cyan-500 to-teal-600"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "123 Business Ave, Suite 100",
      href: "https://maps.google.com",
      external: true,
      color: theme === "dark" ? "from-amber-400 to-orange-500" : "from-amber-500 to-orange-600"
    }
  ];
  
  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen relative py-24 px-6 bg-background overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 30% 70%, var(--gradient-2) 0%, transparent 70%)",
            "radial-gradient(circle at 60% 20%, var(--gradient-2) 0%, transparent 70%)",
            "radial-gradient(circle at 30% 70%, var(--gradient-2) 0%, transparent 70%)"
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{ 
          "--gradient-1": theme === "dark" ? "rgba(59, 130, 246, 0.15)" : "rgba(59, 130, 246, 0.2)",
          "--gradient-2": theme === "dark" ? "rgba(79, 70, 229, 0.15)" : "rgba(79, 70, 229, 0.2)"
        }}
      />
      
      {/* Decorative floating elements */}
      <FloatingObject
        delay={0.2}
        duration={6}
        x={85}
        y={15}
        size={80}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-md" />
      </FloatingObject>
      
      <FloatingObject
        delay={0.5}
        duration={8}
        x={15}
        y={75}
        size={100}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-md" />
      </FloatingObject>
      
      {/* Content container with 3D tilt effect */}
      <motion.div 
        className="container mx-auto max-w-7xl relative z-10"
        style={{ 
          perspective: "1000px",
          transform: `rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg)`
        }}
      >
        {/* Section header with animations */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16 relative"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
        >
          <motion.h2
            variants={{
              hidden: { 
                opacity: 0, 
                y: 20,
                filter: "blur(10px)"  
              },
              visible: { 
                opacity: 1, 
                y: 0,
                filter: "blur(0px)",
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
              Let&#39;s Start a
            </span>
            <br />
            <span className="relative inline-block text-blue-500 dark:text-blue-400">
              Conversation
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
            Have a question or want to work together? We&#39;d love to hear from you.
            Reach out through any of the methods below.
          </motion.p>
        </motion.div>
      
        {/* Contact information and form in a two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact cards column */}
          <motion.div 
            className="space-y-6"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
          >            
            {/* Contact method cards with animations */}
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
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
                      delay: index * 0.1 + 0.4
                    }
                  }
                }}
              >
                <Link 
                  href={method.href}
                  target={method.external ? "_blank" : "_self"}
                  rel={method.external ? "noopener noreferrer" : ""}
                  className="group block p-6 bg-background border border-border shadow-sm rounded-xl hover:shadow-md transition-all hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      "bg-gradient-to-r",
                      method.color
                    )}>
                      <method.icon className="w-5 h-5 text-white" />
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium mb-1">{method.title}</h4>
                      <p className="text-muted-foreground">{method.value}</p>
                      
                      <div className="flex items-center gap-1 mt-2 text-blue-500 dark:text-blue-400 font-medium">
                        <span>Contact us</span>
                        {method.external ? <ExternalLink className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated gradient background on hover */}
                  <motion.div
                    className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-5",
                      "bg-gradient-to-r",
                      method.color
                    )}
                    initial={{ x: "-100%" }}
                    whileHover={{ 
                      x: "100%",
                      transition: { duration: 0.8 }
                    }}
                  />
                </Link>
              </motion.div>
            ))}
            
        
          </motion.div>
          
          {/* Contact form column */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: {
                  type: "spring",
                  damping: 30,
                  stiffness: 200,
                  delay: 0.3
                }
              }
            }}
          >
            <div className="bg-background border border-border rounded-xl shadow-sm p-8">
              <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
              
              <AnimatePresence mode="wait">
                {formState.submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <h4 className="text-xl font-medium text-green-800 dark:text-green-400">Message Sent!</h4>
                    </div>
                    <p className="text-green-700 dark:text-green-300 mb-4">
                      Thank you for reaching out. We&#39;ve received your message and will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setFormState({
                        name: "",
                        email: "",
                        message: "",
                        submitted: false,
                        submitting: false,
                        error: null
                      })}
                      className="text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-5 py-2.5 rounded-lg font-medium transition-all"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Name field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <motion.div
                        whileFocus={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <input
                          id="name"
                          type="text"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                          placeholder="John Doe"
                          value={formState.name}
                          onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Email field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <motion.div
                        whileFocus={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <input
                          id="email"
                          type="email"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                          placeholder="your@email.com"
                          value={formState.email}
                          onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Message field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Your Message
                      </label>
                      <motion.div
                        whileFocus={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <textarea
                          id="message"
                          required
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                          placeholder="How can we help you?"
                          value={formState.message}
                          onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Error message if there is one */}
                    {formState.error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm border border-red-200 dark:border-red-800"
                      >
                        {formState.error}
                      </motion.div>
                    )}
                    
                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      disabled={formState.submitting}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium text-white",
                        "bg-gradient-to-r from-blue-500 to-indigo-600",
                        "hover:from-blue-600 hover:to-indigo-700",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                        "transition-all",
                        formState.submitting && "opacity-80 cursor-not-allowed"
                      )}
                      whileHover={{ 
                        scale: formState.submitting ? 1 : 1.02,
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {formState.submitting ? (
                        <>
                          <motion.div 
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}

// Floating decorative element similar to ServiceSection
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