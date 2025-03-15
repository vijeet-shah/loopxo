'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Clock, Calendar, Tag, Bookmark, Sparkles } from 'lucide-react';
import { useRef } from 'react';

// Use TypeScript interfaces to improve type safety
interface Post {
  slug: string;
  title: string;
  date: string;
  description?: string;
  image?: string;
  category?: string;
  readTime?: number;
  author?: string;
}

interface RecentPostsProps {
  posts: Post[];
  t: any;
  isLoading?: boolean;
}

export default function RecentPosts({ posts, t, isLoading = false }: RecentPostsProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Create staggered animation effect based on scroll
  const containerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const containerY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div 
            key={i}
            className="cosmic-card h-96 shimmer"
          >
            <div className="h-48 bg-muted/30"></div>
            <div className="p-6 space-y-3">
              <div className="h-4 w-1/2 rounded bg-muted/30"></div>
              <div className="h-8 rounded bg-muted/30"></div>
              <div className="h-16 rounded bg-muted/30"></div>
              <div className="h-4 w-1/3 rounded bg-muted/30"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="cosmic-card text-center py-12 rounded-xl">
        <Tag className="h-16 w-16 mx-auto text-primary/50 mb-4" />
        <p className="text-xl font-medium">{t.noPosts || "No posts available yet"}</p>
        <p className="text-muted-foreground mt-2">{t.checkBackSoon || "Check back soon for new content"}</p>
      </div>
    );
  }
  
  return (
    <motion.div 
      ref={ref}
      style={{
        opacity: containerOpacity,
        y: containerY
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {posts.map((post, index) => (
        <motion.div 
          key={post.slug} 
          variants={itemVariants}
          whileHover={{ 
            y: -5,
            transition: { type: "spring", stiffness: 300, damping: 10 }
          }}
          className="group"
        >
          <Link href={`/blog/${post.slug}`}>
            <div className="cosmic-card-interactive h-full flex flex-col rounded-xl overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-30 mix-blend-overlay z-10 pointer-events-none"></div>
                
                <Image
                  src={post.image || "/images/placeholder.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                
                {/* Category badge */}
                {post.category && (
                  <div className="absolute bottom-4 left-4 z-20">
                    <div className="glass-panel px-2 py-1 rounded-full flex items-center space-x-1 border border-primary/20">
                      <Sparkles className="h-3 w-3 text-primary" />
                      <span className="text-xs font-medium">{post.category}</span>
                    </div>
                  </div>
                )}
                
                {/* Bookmark button */}
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition-colors"
                  >
                    <Bookmark className="h-3 w-3" />
                  </motion.button>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-muted-foreground mb-2">
                  <Calendar className="mr-1 h-3 w-3 text-primary/70" /> 
                  <span>{post.date}</span>
                  {post.readTime && (
                    <>
                      <span className="mx-2">·</span>
                      <Clock className="mr-1 h-3 w-3 text-primary/70" />
                      <span>{post.readTime} {t.minRead || "min read"}</span>
                    </>
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {post.description}
                </p>
                
                <div className="mt-auto flex items-center text-sm font-medium text-primary">
                  {t.readMore || "Read Article"}
                  <motion.div
                    className="ml-1 h-3 w-3 inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "loop", 
                      duration: 1.5, 
                      ease: "easeInOut",
                      delay: index * 0.1
                    }}
                  >
                    <ArrowRight className="h-3 w-3" />
                  </motion.div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}