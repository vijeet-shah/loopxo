'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Clock, Calendar, UserIcon, Bookmark, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

export default function FeaturedPost({ post, t, isLoading }: { post: any, t: any, isLoading: any }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Create parallax effect
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  
  // Shimmer effect for loading state
  if (isLoading) {
    return (
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-96 rounded-xl overflow-hidden shimmer bg-muted/30"></div>
        <div className="flex flex-col justify-center space-y-4">
          <div className="h-10 w-3/4 rounded shimmer bg-muted/30"></div>
          <div className="h-20 rounded shimmer bg-muted/30"></div>
          <div className="h-4 w-1/2 rounded shimmer bg-muted/30"></div>
          <div className="h-10 w-1/4 rounded shimmer bg-muted/30"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="cosmic-card text-center py-12 rounded-xl">
        <Bookmark className="h-16 w-16 mx-auto text-primary/50 mb-4" />
        <p className="text-xl font-medium">{t.noPosts || "No featured post available"}</p>
        <p className="text-muted-foreground mt-2">{t.checkBackSoon || "Check back soon for new content"}</p>
      </div>
    );
  }

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 relative"
    >
      {/* Decorative background elements */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
      
      {/* Featured image with parallax effect */}
      <motion.div 
        style={{ y: imageY }}
        className="relative"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="cosmic-card-interactive h-96 rounded-xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-30 mix-blend-overlay z-10"></div>
          <Image
            src={post.image || "/images/placeholder.jpg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            priority
          />
          
          {/* Gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
          
          {/* Category tag with special styling */}
          {post.category && (
            <div className="absolute top-4 left-4 z-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="glass-panel px-3 py-1 rounded-full shadow-lg border border-primary/20 flex items-center space-x-1"
              >
                <Sparkles className="h-3 w-3 text-primary" />
                <span className="text-sm font-medium">{post.category}</span>
              </motion.div>
            </div>
          )}
          
          {/* Bookmark button on the top right */}
          <div className="absolute top-4 right-4 z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              <Bookmark className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Content with subtle parallax in opposite direction */}
      <motion.div 
        style={{ y: contentY }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col justify-center space-y-6"
      >
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="cosmic-text text-4xl font-bold leading-tight"
        >
          {post.title}
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-lg"
          >
            {post.description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
          >
            <div className="flex items-center px-3 py-1 bg-muted/30 backdrop-blur rounded-full">
              <UserIcon className="mr-1 h-4 w-4 text-primary/70" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center px-3 py-1 bg-muted/30 backdrop-blur rounded-full">
              <Calendar className="mr-1 h-4 w-4 text-primary/70" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center px-3 py-1 bg-muted/30 backdrop-blur rounded-full">
              <Clock className="mr-1 h-4 w-4 text-primary/70" />
              <span>{post.readTime || 5} {t.minRead || "min read"}</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button asChild className="cosmic-button mt-4 group">
              <Link href={`/blog/${post.slug}`}>
                {t.readMore || "Read Article"}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "loop", 
                    duration: 1.5, 
                    ease: "easeInOut" 
                  }}
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }