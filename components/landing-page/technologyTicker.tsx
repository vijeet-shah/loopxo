'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function TechnologyTicker() {
  const marqueeVariants = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear"
        }
      }
    }
  };

  const technologies = [
    "TypeScript", "React", "Next.js", "Node.js", "TailwindCSS", 
    "Framer Motion", "Prisma", "GraphQL", "AWS", "Docker", 
    "Git", "Redux", "MongoDB", "PostgreSQL", "Jest", 
    "Cypress", "GitHub Actions", "Storybook"
  ];

  const duplicateTechnologies = [
    "TypeScript", "React", "Next.js", "Node.js", "TailwindCSS", 
    "Framer Motion", "Prisma", "GraphQL", "AWS", "Docker", "Git"
  ];

  return (
    <div className="relative py-6 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 overflow-hidden">
      <motion.div 
        className="flex whitespace-nowrap"
        variants={marqueeVariants}
        animate="animate"
      >
        {technologies.map(tech => (
          <div 
            key={tech} 
            className="mx-8 flex items-center text-lg font-semibold text-primary/80"
          >
            <Star className="mr-1 h-4 w-4" />
            {tech}
          </div>
        ))}
        {duplicateTechnologies.map(tech => (
          <div 
            key={`${tech}-dup`} 
            className="mx-8 flex items-center text-lg font-semibold text-primary/80"
          >
            <Star className="mr-1 h-4 w-4" />
            {tech}
          </div>
        ))}
      </motion.div>
    </div>
  );
}