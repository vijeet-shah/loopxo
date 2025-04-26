import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getClientLanguage, getClientTranslations, useTranslation } from "@/lib/i18n/client-utils";
import { useTheme } from "next-themes";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Sun,
  Moon,
} from "lucide-react";
import { VideoComponent } from "../VideoComponent";
import { LanguageSelector } from "../language-selector";

const socialLinks = [
  { 
    icon: Github, 
    label: "GitHub",
    url: "https://github.com/vijeetshah" 
  },
  { 
    icon: Twitter, 
    label: "Twitter",
    url: "https://twitter.com/vijeetshah" 
  },
  { 
    icon: Linkedin, 
    label: "LinkedIn",
    url: "https://linkedin.com/in/vijeetshah" 
  },
  { 
    icon: Mail, 
    label: "Email",
    url: "mailto:contact@vijeetshah.com" 
  },
];

export default function HeroSection() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const currentLanguage = getClientLanguage();
  const x = getClientTranslations(currentLanguage);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if on mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Subtle mouse parallax effect (desktop only)
  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      setMousePosition({ 
        x: moveX / 50, 
        y: moveY / 50 
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/5 to-primary/10 blur-3xl"
          animate={!isMobile ? { 
            x: mousePosition.x * -0.5, 
            y: mousePosition.y * -0.5 
          } : {}}
          transition={{ 
            type: "spring", 
            stiffness: 10 
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/10 blur-3xl"
          animate={!isMobile ? { 
            x: mousePosition.x * 0.3, 
            y: mousePosition.y * 0.3 
          } : {}}
          transition={{ 
            type: "spring", 
            stiffness: 10 
          }}
        />
      </div>

      <div className="h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center z-10">
          {/* Center video */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            style={!isMobile ? {
              transform: `rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01}deg)`
            } : {}}
          >
            {/* Photo frame design around video */}
            <div className="relative mx-auto">
              {/* Decorative corner elements */}
              <div className="absolute -top-3 -left-3 w-8 sm:w-10 h-8 sm:h-10 border-t-2 border-l-2 border-primary"></div>
              <div className="absolute -top-3 -right-3 w-8 sm:w-10 h-8 sm:h-10 border-t-2 border-r-2 border-primary"></div>
              <div className="absolute -bottom-3 -left-3 w-8 sm:w-10 h-8 sm:h-10 border-b-2 border-l-2 border-primary"></div>
              <div className="absolute -bottom-3 -right-3 w-8 sm:w-10 h-8 sm:h-10 border-b-2 border-r-2 border-primary"></div>

              {/* Pulse effect */}
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/20 to-blue-500/20 opacity-50 blur-sm"></div>
              
              {/* Main video component - responsive sizing */}
              <motion.div
                className="relative rounded-lg shadow-2xl overflow-hidden w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] lg:w-[480px] lg:h-[480px]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <VideoComponent className={"id"} />

                {/* Video overlay with name */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-end pb-4 sm:pb-8 bg-gradient-to-t from-black/70 via-black/40 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="px-4 py-3 sm:px-6 sm:py-4 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 max-w-[90%]">
                    <motion.h1
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      {t.name || "Vijeet Shah"}
                    </motion.h1>
                    <motion.div
                      className="h-0.5 w-3/4 mx-auto my-2 bg-gradient-to-r from-transparent via-primary/70 to-transparent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.9, duration: 0.8 }}
                    />
                    <motion.p
                      className="mt-1 sm:mt-2 text-sm sm:text-base md:text-xl text-white/90 text-center"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      {x.post || "Technical Product Manager"}
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Orbital UI Elements */}
          <div className="w-full mt-8 sm:mt-12">
            {/* Central greeting with responsive font sizes */}
            <motion.div
              className="text-center mb-6 sm:mb-8 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <p className="text-primary font-medium text-base sm:text-lg">
                {t.greeting || "Namaste, World! 🙏"}
              </p>
              <p className="text-muted-foreground mt-2 max-w-lg mx-auto text-sm sm:text-base">
                {x.line || "Turning ideas into impactful products | Product leadership with engineering excellence"}
              </p>
            </motion.div>

            {/* Controls and buttons with responsive spacing */}
            <motion.div 
              className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6 flex-wrap px-2"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 1.0,
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {/* Theme Toggle */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-1.5 sm:p-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-lg"
              >
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-primary"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 sm:h-6 sm:w-6" />
                  ) : (
                    <Moon className="h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                </button>
              </motion.div>

              {/* Language Selection */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-1.5 sm:p-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-lg"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-primary">
                  <LanguageSelector variant="circular" />
                </div>
              </motion.div>

              {/* Social Links - circular arrangement */}
              {socialLinks.map((item, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1.5 sm:p-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-lg"
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-primary"
                    aria-label={item.label}
                  >
                    <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

   
    </div>
  );
}