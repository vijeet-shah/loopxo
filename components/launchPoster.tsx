"use client"

import Image from 'next/image';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LaunchPosterProps {
  onClose: () => void;
}

const LaunchPoster: React.FC<LaunchPosterProps> = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center p-4 mt-16"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            y: 0,
            transition: {
              type: "spring",
              duration: 0.5,
              bounce: 0.3
            }
          }}
          exit={{ 
            scale: 0.95, 
            opacity: 0, 
            y: -20,
            transition: { duration: 0.2 }
          }}
          className="relative bg-white dark:bg-[#010A20] rounded-lg shadow-xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden transition-colors duration-300"
        >

          <div className="hidden md:block md:w-5/12 md:h-auto relative">
            <Image
              src="/test1.png"
              alt="Service Professional"
              width={800}
              height={1200}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col justify-between">
            <div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block bg-black dark:bg-white text-white dark:text-black text-xl md:text-2xl font-bold px-4 py-2 mb-4 rounded-lg shadow-md transition-transform duration-300"
              >
                SPC
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              {!showForm ? (
                <motion.div
                  key="initial-content"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >

                  <div className="space-y-4 md:space-y-6 mt-4">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-black dark:text-white leading-tight">
                      The Wait Is Finally Over!
                    </h1>
                    <p className="text-lg md:text-xl text-black/80 dark:text-white/90 leading-relaxed font-medium">
                      SPC is launching soon to revolutionize how you find and book trusted service professionals.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      {['Verified Providers', 'Instant Booking', 'Secure Payments', '24/7 Support'].map((feature) => (
                        <motion.div
                          key={feature}
                          className="flex items-center space-x-2 group"
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-2 h-2 bg-emerald-500 dark:bg-white rounded-full group-hover:scale-125 transition-transform duration-300" />
                          <span className="text-black/90 dark:text-white/80 text-sm md:text-base font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-lg md:text-xl text-black/80 dark:text-white/90 mb-4 font-medium">
                      Get ready for a seamless experience!
                    </p>
                    <motion.button 
                      onClick={() => setShowForm(true)}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black text-lg md:text-xl font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Join the Waitlist
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LaunchPoster;