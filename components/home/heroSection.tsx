"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  ArrowRight,
  Shield,
  BarChart,
  Users,
  Star,
  X,
  Maximize2,
} from "lucide-react";
import {
  FloatingObject,
  StatItem,
  TrustBadge,
} from "../animation/floatingElements";
import { useTranslation } from "@/lib/i18n/client-utils";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const isInView = useInView(heroRef, { once: false, margin: "-10% 0px" });
  const controls = useAnimation();
  const { t } = useTranslation();

  // State for video modal
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // 3D Tilt effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: any) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Center coordinates
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Mouse coordinates relative to section center
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;

    // Normalize to -5 to 5 range for subtle tilt effect
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
    <motion.section
      ref={heroRef}
      className="min-h-screen relative overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />

      {/* Floating decorative elements */}
      <FloatingObject delay={0} duration={12} x={85} y={15} size="8rem">
        <div className={`w-full h-full rounded-full backdrop-blur-md `} />
      </FloatingObject>

      <FloatingObject delay={1} duration={15} x={10} y={70} size="6rem">
        <div
          className={`w-full h-full rounded-full bg-gradient-to-tr 
          `}
        />
      </FloatingObject>

      <FloatingObject delay={2} duration={10} x={75} y={80} size="5rem">
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-cyan-500/10 to-blue-500/10" />
      </FloatingObject>

      {/* Award badge */}

      {/* Main content container with 3D tilt effect */}
      <motion.div
        className="container mx-auto max-w-6xl relative z-10"
        style={{
          perspective: "1200px",
        }}
      >
        <motion.div
          style={{
            transform: `rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg)`,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left column - Text content */}
            <motion.div
              className="space-y-8"
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              {/* Main headline */}
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
                      delay: 0.1,
                    },
                  },
                }}
                className="text-4xl md:text-6xl font-bold relative"
              >
                <span
                  className={`bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600`}
                >
                  {t.digitalSolutions || "Digital Solutions"}
                </span>
                <br />
                <span className="relative inline-block">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
                    {t.thatDriveGrowth || "That Drive Growth"}
                  </span>
                  <motion.span
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                      delay: 1.2,
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                  />
                </span>
              </motion.h1>

              {/* Subheading */}
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
                      delay: 0.3,
                    },
                  },
                }}
                className={`text-lg max-w-max `}
              >
                {t.yourVisionBuilt || "Your Vision, Validated and Built. We partner to efficiently develop your concepts into impactful digital solutions, delivering tangible results fast."}
              </motion.p>

              {/* Trust badges */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.5,
                    },
                  },
                }}
                className="flex flex-wrap gap-3"
              >
                <TrustBadge
                  icon={Star}
                  text={t.deliveringResults ||"Delivering Proven Results"}
                  delay={0.5}
                />
                <TrustBadge
                  icon={Users}
                  text={t.partneringWith ||"Partnering with 100+ Visionaries"}
                  delay={0.6}
                />
                <TrustBadge
                  icon={Shield}
                  text={t.clientSupport||"Dedicated 5-Star Client Support"}
                  delay={0.7}
                />
              </motion.div>

              {/* CTA buttons */}
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
                      delay: 0.4,
                    },
                  },
                }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                {/* Primary button */}
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/contact"
                    className="relative inline-flex items-center justify-center overflow-hidden rounded-xl px-8 py-4 font-medium text-white shadow-lg"
                  >
                    {/* Button gradient layers */}
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90" />
                    <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.3),transparent_70%)]" />

                    {/* Moving gradient effect */}
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      style={{ backgroundSize: "200% 100%" }}
                      animate={{
                        backgroundPosition: ["100% 0%", "0% 0%", "100% 0%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                      }}
                    />

                    {/* Border glow */}
                    <motion.span
                      className="absolute inset-0 rounded-xl"
                      animate={{
                        boxShadow: [
                          "0 0 0 2px rgba(37, 99, 235, 0.3)",
                          "0 0 0 4px rgba(37, 99, 235, 0.2)",
                          "0 0 0 2px rgba(37, 99, 235, 0.3)",
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                    />

                    {/* Button text */}
                    <span className="relative flex items-center gap-2 z-10 font-bold text-base">
                      {t.getStarted || "Get Started"}
                      <motion.span
                        animate={{
                          x: [0, 5, 0],
                          opacity: [1, 0.8, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "loop",
                        }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.span>
                    </span>
                  </Link>
                </motion.div>

                {/* Secondary button */}
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/services"
                    className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl px-8 py-4 font-medium backdrop-blur-sm
                     `}
                  >
                    <span className="relative z-10">{t.viewOurWork || "View Our Work"}</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right column - Image and stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.6,
                },
              }}
              className="relative"
            >
              {/* Image container with effects */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-500/30 to-indigo-500/30 blur-xl opacity-70"
                  animate={{
                    opacity: [0.5, 0.7, 0.5],
                    scale: [0.98, 1.02, 0.98],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />

                <div
                  className={`relative rounded-2xl overflow-hidden shadow-2xl
                 `}
                >
                  {/* Video Thumbnail with Play Button Overlay */}
                  <div
                    className="relative aspect-video w-full cursor-pointer"
                    onClick={() => setIsVideoModalOpen(true)}
                  >
                    <iframe
                      src="https://www.youtube.com/embed/vqyjjrS7fWM?autoplay=1&mute=1&loop=1&playlist=vqyjjrS7fWM"
                      title="YouTube video player"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Expand button in corner */}
                    <div className="absolute top-4 right-4 z-10">
                      <motion.div
                        className={`backdrop-blur-md p-2 rounded-full 
                         `}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Maximize2 />
                      </motion.div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-white font-bold text-lg mb-1">
                          {t.transformingBusinesses||"Transforming Businesses"}
                        </div>
                        <div className="text-blue-300 text-sm">
                          {t.latestProjectGrowth ||"Our latest project delivered 40% growth"}
                        </div>
                      </div>

                      {/* Client avatars */}
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((index) => (
                          <div
                            key={index}
                            className="inline-block h-8 w-8 rounded-full border-2 border-white overflow-hidden"
                          >
                            <div className="h-full w-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-xs text-white font-bold">
                              {index}
                            </div>
                          </div>
                        ))}
                        <div className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border-2 border-white bg-black/50 px-2 text-xs font-medium text-white">
                          +28
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <motion.div
                className="grid grid-cols-3 gap-4 mt-4"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      delay: 0.8,
                      staggerChildren: 0.1,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
              >
                <StatItem icon={BarChart} title={t.projects ||"Projects"} value="100+" />
                <StatItem icon={Users} title={t.clients ||"Clients"} value="50+" />
                <StatItem icon={Star} title={t.caseStudies ||"Case Studies"} value="5+" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10"
          >
            <div className="absolute top-4 right-4 z-10">
              <motion.button
                onClick={() => setIsVideoModalOpen(false)}
                className="bg-black/40 hover:bg-black/60 backdrop-blur-md p-3 rounded-full border border-white/20 text-white transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/vqyjjrS7fWM?autoplay=1&rel=0"
                title="YouTube video player"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      )}
    </motion.section>
  );
}
