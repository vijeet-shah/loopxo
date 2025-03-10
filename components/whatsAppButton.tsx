"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '+919619957354';
  const message = encodeURIComponent(
"Hello RBC Support, I’d love to connect and discuss about: "
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const pulseRing = {
    initial: { scale: 0.9, opacity: 0 },
    animate: {
      scale: 1.2,
      opacity: 0,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
    >
      {/* Animated ring effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-[#25D366] rounded-full"
            initial="initial"
            animate="animate"
            exit="initial"
            variants={pulseRing}
          />
        )}
      </AnimatePresence>

      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative"
      >
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 8px 20px rgba(37, 211, 102, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

          <div className="md:hidden flex items-center p-3 relative">
            <motion.svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </motion.svg>
          </div>

          {/* Desktop version (icon + text) */}
          <motion.div 
            className="hidden md:flex items-center gap-3 px-5 py-3"
            initial={false}
            animate={isHovered ? { x: 0 } : { x: 0 }}
          >
            <motion.svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </motion.svg>
            <span className="font-medium text-base whitespace-nowrap tracking-wide">
              Chat on WhatsApp
            </span>
          </motion.div>

          <motion.div
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap md:hidden"
            initial={{ x: 10, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
          >
            <div className="relative">
              Chat on WhatsApp
              <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-2 h-2 bg-black/90 rotate-45" />
            </div>
          </motion.div>
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default WhatsAppButton;