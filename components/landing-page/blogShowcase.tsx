'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n/client-utils';

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

export default function BlogShowcase() {
  const { t, lang } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch posts data
  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/posts`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPosts();
  }, [lang]); // Refetch when language changes
  
  // Animation variants for consistent animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8 py-12 overflow-hidden">
      {/* Background elements - kept exactly as original */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/5 to-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/10 blur-3xl" />
      </div>
      
      {/* Main content with fixed height container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto h-full flex flex-col">
        {/* Section header - reduced margins on mobile */}
        <div className="flex flex-col items-center justify-center text-center mb-6 sm:mb-12">
          <motion.h2 
            className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t.blogTitle || "My Blog"}
          </motion.h2>
          
          <motion.p
            className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t.blogDescription || "Thoughts, ideas and guides on product management, software development and technology."}
          </motion.p>
        </div>
        
        {/* Content with auto-height constraints */}
        <div className="flex-1 flex flex-col">
          {/* Loading state */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="border border-border rounded-lg p-2 sm:p-4">
                  <div className="w-full h-24 sm:h-48 bg-muted/50 rounded-md mb-2 sm:mb-4"></div>
                  <div className="h-4 sm:h-6 w-3/4 bg-muted/50 rounded-md mb-1 sm:mb-2"></div>
                  <div className="h-3 sm:h-4 w-1/2 bg-muted/50 rounded-md"></div>
                </div>
              ))}
            </div>
          )}
          
          {/* Error state */}
          {!isLoading && error && (
            <div className="text-center py-6 sm:py-12">
              <p className="text-base sm:text-lg font-medium text-red-500">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4"
                size="sm"
              >
                {t.tryAgain || "Try Again"}
              </Button>
            </div>
          )}
          
          {/* No posts state */}
          {!isLoading && !error && posts.length === 0 && (
            <div className="text-center py-6 sm:py-12 border border-border rounded-lg">
              <p className="text-base sm:text-lg font-medium">{t.noPosts || "No posts found"}</p>
              <p className="text-sm text-muted-foreground mt-2">{t.checkBackSoon || "Check back soon for new content"}</p>
            </div>
          )}
          
          {/* Blog posts grid - with very compact mobile layout */}
          {!isLoading && !error && posts.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
            >
              {posts.map((post) => (
                <motion.div
                  key={post.slug}
                  variants={itemVariants}
                  className="bg-card/50 border border-border rounded-lg overflow-hidden flex flex-col h-full transition-colors hover:border-primary/30"
                >
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    {/* Much smaller image on mobile */}
                    <div className="relative w-full h-28 sm:h-40 md:h-48">
                      <Image
                        src={post.image || "/images/placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Reduced padding on mobile */}
                    <div className="p-2 sm:p-4 md:p-6 flex flex-col flex-grow">
                      {/* Simplified meta info on mobile */}
                      <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground mb-1 sm:mb-3">
                        <span>{post.date}</span>
                        {post.category && !window.matchMedia('(max-width: 640px)').matches && (
                          <>
                            <span className="mx-2">•</span>
                            <span className="capitalize">{post.category}</span>
                          </>
                        )}
                        {post.readTime && (
                          <>
                            <span className="mx-1 sm:mx-2">•</span>
                            <span className="flex items-center">
                              <Clock className="w-2 h-2 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" /> 
                              <span className="hidden sm:inline">{post.readTime} min read</span>
                              <span className="sm:hidden">{post.readTime}m</span>
                            </span>
                          </>
                        )}
                      </div>
                      
                      {/* Smaller title on mobile */}
                      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      {/* Hide description on smallest screens */}
                      <p className="hidden sm:block text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2 sm:mb-4">
                        {post.description}
                      </p>
                      
                      <div className="mt-auto pt-1 sm:pt-4 flex items-center text-primary text-xs sm:text-sm">
                        <span className="hidden sm:inline">{t.readMore || "Read more"}</span>
                        <span className="sm:hidden">Read</span>
                        <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
        
        {/* View all button with smaller size on mobile */}
        {!isLoading && !error && posts.length > 0 && (
          <div className="mt-4 sm:mt-10 text-center">
            <Button asChild size="sm" className="text-xs sm:text-sm">
              <Link href="/blog" className="flex items-center">
                {t.ViewAllPosts || "View All Posts"}
                <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}