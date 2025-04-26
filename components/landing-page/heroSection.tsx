import React from "react";
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

export default function HeroSection() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

    const currentLanguage =  getClientLanguage();
    const x =  getClientTranslations(currentLanguage);
    

  return (
    <div className="relative min-h-screen overflow-hidden perspective-1000">
      {/* Book pages container */}
      <div className="relative min-h-screen w-full perspective-1000 bg-background">
        <div className="h-screen w-full flex items-center justify-center relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary/5 to-primary/10 blur-3xl" />
            <motion.div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/10 blur-3xl" />
          </div>

          {/* Main content - orbital layout around video */}
          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="flex flex-col items-center">
              {/* Center video */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
              >
                {/* Photo frame design around video */}
                <div className="relative mx-auto">
                  {/* Decorative corner elements */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-primary"></div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-primary"></div>
                  <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-primary"></div>
                  <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-primary"></div>

                  {/* Main video component */}
                  <motion.div
                    className="relative rounded-lg shadow-2xl overflow-hidden w-[380px] h-[380px] md:w-[480px] md:h-[480px]"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <VideoComponent className={"id"} />

                    {/* Video overlay with name */}
                    <motion.div
                      className="absolute inset-0 flex flex-col items-center justify-end pb-8 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.h1
                        className="text-4xl sm:text-5xl font-bold text-white text-center"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                       {t.name || "Vijeet Shah"}
                      </motion.h1>
                      <motion.p
                        className="mt-2 text-xl text-white/90"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        {x.post || "Technical Product Manager"}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Orbital UI Elements */}
              <div className="relative w-full max-w-3xl mx-auto mt-12">
                {/* Central greeting */}
                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <p className="text-primary text-lg">
                    {t.greeting || "Namaste, World! 🙏"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-lg mx-auto">
                    {x.line ||"Turning ideas into impactful products | Product leadership with engineering excellence"}
                  </p>
                </motion.div>

                {/* Controls and buttons in a circular/orbital arrangement */}
                <div className="relative">
                  <motion.div className="flex justify-center items-center gap-6 flex-wrap">
                    {/* Theme Toggle */}
                    <motion.div
                      className="p-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <button
                        onClick={() =>
                          setTheme(theme === "dark" ? "light" : "dark")
                        }
                        className="w-12 h-12 rounded-full flex items-center justify-center text-primary"
                        aria-label="Toggle theme"
                      >
                        {theme === "dark" ? (
                          <Sun className="h-6 w-6" />
                        ) : (
                          <Moon className="h-6 w-6" />
                        )}
                      </button>
                    </motion.div>

                    {/* Language Selection */}
                    <motion.div
                      className="p-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-primary">
                        <LanguageSelector variant="circular" />
                      </div>
                    </motion.div>

                    {/* Social Links - circular arrangement */}
                    {[
                      { icon: Github, label: "GitHub" },
                      { icon: Twitter, label: "Twitter" },
                      { icon: Linkedin, label: "LinkedIn" },
                      { icon: Mail, label: "Email" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="p-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 + i * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-primary">
                          <item.icon className="h-5 w-5" />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

               
              </div>
            </div>
          </div>

          {/* Page corner curl effect */}
          <motion.div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none" />

         
        </div>
      </div>
    </div>
  );
}
