"use client"

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import {  Send, Phone, Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/client-utils";

export function GetInTouchSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10% 0px" });
  const controls = useAnimation();
  const { t } = useTranslation();
  
  // Form state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    submitted: false,
    submitting: false,
    error: null
  });
  
  // 3D Tilt effect on mouse move
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
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
  
 

  // Trust indicators
  const trustIndicators = [
    { icon: Star, text: t.trustedBy || "Trusted by 500+ clients" },
    { icon: Check, text: t.response24h || "24h response time" },
    { icon: Phone, text: t.freeConsultation || "Free consultation" }
  ];
  
  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen relative py-24 px-6 bg-gradient-to-b from-background via-background/95 to-background overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced animated background with professional gradients */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Professional floating elements */}
      <FloatingObject delay={0.2} duration={8} x={85} y={15} size={120}>
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-500/5 to-indigo-500/5 backdrop-blur-xl border border-blue-200/20 dark:border-blue-700/20" />
      </FloatingObject>
      
      <FloatingObject delay={0.5} duration={10} x={10} y={75} size={80}>
        <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-500/5 to-teal-500/5 backdrop-blur-xl border border-emerald-200/20 dark:border-emerald-700/20" />
      </FloatingObject>
      
      <FloatingObject delay={1} duration={12} x={90} y={85} size={60}>
        <div className="w-full h-full rounded-xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 backdrop-blur-xl border border-amber-200/20 dark:border-amber-700/20" />
      </FloatingObject>
      
      {/* Content container with enhanced 3D effect */}
      <motion.div 
        className="container mx-auto max-w-7xl relative z-10"
        style={{ 
          perspective: "1200px",
          transform: `rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg)`
        }}
      >
        {/* Enhanced section header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20 relative"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
        >
          {/* Decorative badge */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { type: "spring", stiffness: 100, damping: 20 }
              }
            }}
            className="inline-block mb-6"
          >
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-200/50 dark:border-blue-700/50">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {t.getInTouch || "Get In Touch"}
              </span>
            </div>
          </motion.div>

          <motion.h2
            variants={{
              hidden: { 
                opacity: 0, 
                y: 30,
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
            className="text-4xl md:text-6xl font-bold mb-6 relative leading-tight"
          >
            <span className="text-foreground">
              {t.letsStart || "Let's Start a "}
            </span>
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
                {t.conversation || "Conversation"}
              </span>           

              <motion.span
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
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
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            {t.contactDescription || "Have a question or want to work together? We'd love to hear from you. Reach out through any of the methods below."}
          </motion.p>

          {/* Trust indicators */}
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
                  delay: 0.5
                }
              }
            }}
            className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
          >
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center gap-2">
                <indicator.icon className="w-4 h-4 text-blue-500" />
                <span>{indicator.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      
        {/* Enhanced contact information and form layout */}
        
          
          {/* Enhanced contact form */}
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
            <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg p-8 relative overflow-hidden">
              {/* Form header */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  {t.sendMessage || "Send a Message"}
                </h3>
                <p className="text-muted-foreground">
                  {t.formDescription || "Fill out the form below and we'll get back to you within 24 hours."}
                </p>
              </div>
              
              <AnimatePresence mode="wait">
                {formState.submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 p-8 rounded-xl border border-green-200/50 dark:border-green-700/50"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold text-green-800 dark:text-green-400">
                        {t.messageSent || "Message Sent!"}
                      </h4>
                    </div>
                    <p className="text-green-700 dark:text-green-300 mb-6 text-lg">
                      {t.thankYouMessage || "Thank you for reaching out. We've received your message and will get back to you shortly."}
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
                      className="text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-green-500/25"
                    >
                      {t.sendAnother || "Send Another Message"}
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
                    {/* Enhanced form fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name field */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold mb-3 text-foreground">
                          {t.yourName || "Your Name"} <span className="text-red-500">*</span>
                        </label>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <input
                            id="name"
                            type="text"
                            required
                            className="w-full px-4 py-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all placeholder:text-muted-foreground/50"
                            placeholder={t.namePlaceholder || "John Doe"}
                            value={formState.name}
                            onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </motion.div>
                      </div>
                      
                      {/* Email field */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold mb-3 text-foreground">
                          {t.emailAddress || "Email Address"} <span className="text-red-500">*</span>
                        </label>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <input
                            id="email"
                            type="email"
                            required
                            className="w-full px-4 py-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all placeholder:text-muted-foreground/50"
                            placeholder={t.emailPlaceholder || "your@email.com"}
                            value={formState.email}
                            onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                          />
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Message field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold mb-3 text-foreground">
                        {t.yourMessage || "Your Message"} <span className="text-red-500">*</span>
                      </label>
                      <motion.div
                        whileFocus={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <textarea
                          id="message"
                          required
                          rows={6}
                          className="w-full px-4 py-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none placeholder:text-muted-foreground/50"
                          placeholder={t.messagePlaceholder || "Tell us about your project or how we can help you..."}
                          value={formState.message}
                          onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                        />
                      </motion.div>
                    </div>
                    
                    {/* Error message */}
                    {formState.error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border border-red-200/50 dark:border-red-800/50"
                      >
                        {formState.error}
                      </motion.div>
                    )}
                    
                    {/* Enhanced submit button */}
                    <motion.button
                      type="submit"
                      disabled={formState.submitting}
                      className={cn(
                        "w-full flex items-center justify-center gap-3 py-4 px-8 rounded-xl font-semibold text-white text-lg",
                        "bg-gradient-to-r from-blue-500 to-indigo-600",
                        "hover:from-blue-600 hover:to-indigo-700",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                        "shadow-lg hover:shadow-xl hover:shadow-blue-500/25",
                        "transition-all duration-300",
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
                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>{t.sending || "Sending..."}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>{t.sendMessage || "Send Message"}</span>
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
      </motion.div>
    </motion.section>
  );
}

// Enhanced floating decorative element
const FloatingObject = ({ delay, duration, x, y, size, children }) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size
      }}
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 20, 0, -15, 0],
        rotate: [0, 5, 0, -5, 0],
        scale: [1, 1.1, 1, 0.95, 1]
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