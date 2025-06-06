"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Send,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// Social media links with animations
const SocialLink = ({ href, icon: Icon, color }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:opacity-90",
        color
      )}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon size={16} className="text-white" />
    </motion.a>
  );
};

export function Footer() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });

  // Staggered animation for footer columns
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Quick links data
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  // Services data
  const services = [
    { name: "UI-UX Design", href: "/services/ui-ux-design" },
    { name: "Mobile Apps", href: "/services/mobile-apps" },
    { name: "Backend Development", href: "/services/backend-development" },
    { name: "Frontend Development", href: "/services/frontend-development" },
    { name: "Artificial Intelligence", href: "/services/ai" },
    { name: "Data Analysis & Science", href: "/services/data-science" },
    { name: "Cloud & DevOps", href: "/services/cloud-devops" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-r from-background to-muted"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, var(--gradient-1) 0%, transparent 70%)",
            "radial-gradient(circle at 70% 60%, var(--gradient-1) 0%, transparent 70%)",
            "radial-gradient(circle at 20% 30%, var(--gradient-1) 0%, transparent 70%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={
          {
            "--gradient-1":
              theme === "dark"
                ? "rgba(79, 70, 229, 0.15)"
                : "rgba(59, 130, 246, 0.1)",
          } as React.CSSProperties
        }
      />

      {/* Main Footer Content */}
      <div className="container mx-auto max-w-7xl px-6 py-14 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Column 1: About - spans 4 columns */}
          <motion.div
            className="lg:col-span-4 space-y-5"
            variants={itemVariants}
          >
            <div className="flex items-center mb-4">
              <motion.div
                className="h-10 w-10 relative mr-3 bg-muted rounded-full overflow-hidden shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Image
                  src="/logo.png"
                  alt="Company Logo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </motion.div>
              <h3 className="text-lg font-bold text-foreground">LoopXo </h3>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              We specialize in creating innovative digital solutions that drive
              business growth. Our team of experts is dedicated to delivering
              exceptional results that exceed expectations.
            </p>

            <div className="flex space-x-2.5 pt-2">
              <SocialLink
                href="https://facebook.com"
                icon={Facebook}
                color="bg-blue-600"
              />
              <SocialLink
                href="https://twitter.com"
                icon={Twitter}
                color="bg-sky-500"
              />
              <SocialLink
                href="https://instagram.com"
                icon={Instagram}
                color="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
              />
              <SocialLink
                href="https://linkedin.com"
                icon={Linkedin}
                color="bg-blue-700"
              />
            </div>
          </motion.div>

          {/* Column 2: Quick Links - spans 2 columns */}
          <motion.div
            className="lg:col-span-2 space-y-5"
            variants={itemVariants}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>

            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center text-sm group text-muted-foreground hover:text-foreground"
                  >
                    <motion.span
                      animate={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }}
                    >
                      <ChevronRight size={14} className="text-primary mr-2" />
                    </motion.span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services - spans 2 columns */}
          <motion.div
            className="lg:col-span-2 space-y-5"
            variants={itemVariants}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Our Services
            </h3>

            <ul className="space-y-2.5">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Link
                    href={service.href}
                    className="flex items-center text-sm group text-muted-foreground hover:text-foreground"
                  >
                    <motion.span
                      animate={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }}
                    >
                      <ChevronRight size={14} className="text-primary mr-2" />
                    </motion.span>
                    {service.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact Info - spans 2 columns */}
          <motion.div
            className="lg:col-span-2 space-y-5"
            variants={itemVariants}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Contact Us
            </h3>

            <ul className="space-y-3">
              <li className="flex items-start text-muted-foreground">
                <MapPin
                  size={16}
                  className="text-primary mr-2.5 mt-0.5 flex-shrink-0"
                />
                <span className="text-xs leading-tight">
                  Lokhandwala, Kandivali East, Mumbai - 400101
                </span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone
                  size={16}
                  className="text-primary mr-2.5 flex-shrink-0"
                />
                <a href="tel:+1234567890" className="text-xs hover:underline">
                  +91 9082053880
                </a>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Mail size={16} className="text-primary mr-2.5 flex-shrink-0" />
                <a
                  href="mailto:contact@example.com"
                  className="text-xs hover:underline"
                >
                  hello@loopxo.com
                </a>
              </li>
            </ul>

            <div className="text-xs text-muted-foreground/80">
              <span className="font-medium block mb-1">Business Hours:</span>
              Monday - Saturday: 9am - 6pm IST
                            
            </div>
          </motion.div>

          {/* Column 5: Newsletter - spans 2 columns */}
          <motion.div
            className="lg:col-span-2 space-y-5"
            variants={itemVariants}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
              Newsletter
            </h3>

            <p className="text-muted-foreground text-xs leading-relaxed">
              Stay updated with our latest news, updates and exclusive offers.
            </p>

            <form className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full relative overflow-hidden py-2 px-3 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-primary-foreground text-xs font-medium flex items-center justify-center group"
                type="submit"
              >
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.3),transparent_70%)]"></span>
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
                <Send size={12} className="mr-2" />
                <span>Subscribe</span>
                <motion.div
                  className="absolute right-3"
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
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </motion.button>
              <p className="text-xs text-muted-foreground/80">
                We respect your privacy.
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="py-5 border-t border-border">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.5 }}
            >
              © {currentYear} LoopXo. All rights reserved.
            </motion.p>

            <motion.div
              className="flex space-x-6 mt-4 md:mt-0"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.7 }}
            >
              <Link
                href="/terms"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/sitemap"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Sitemap
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
