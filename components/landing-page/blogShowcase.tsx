'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const carouselRef = useRef<HTMLDivElement | null>(null);
  
  // Check scroll position
  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };
  
  // Carousel navigation
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
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
  
  // Set up scroll event listener
  useEffect(() => {
    const currentRef = carouselRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      return () => currentRef.removeEventListener('scroll', checkScrollPosition);
    }
  }, [posts]);
  
  // Animation variants
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
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/5 to-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/10 blur-3xl" />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto h-full flex flex-col">
        {/* Section header */}
        <div className="flex flex-col items-center justify-center text-center mb-6 sm:mb-10">
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
        
        {/* Blog posts carousel */}
        <div className="flex-1 flex flex-col">
          {/* Heading with navigation arrows */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm sm:text-base font-medium">Latest Posts</h3>
            
            {/* Carousel navigation buttons */}
            <div className="flex space-x-2">
              <motion.button
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors 
                  ${canScrollLeft 
                    ? 'bg-white/10 border border-white/20 text-primary hover:bg-white/20' 
                    : 'opacity-30 cursor-not-allowed bg-white/5 border border-white/10 text-muted-foreground'}`}
                whileHover={canScrollLeft ? { scale: 1.05 } : {}}
                whileTap={canScrollLeft ? { scale: 0.95 } : {}}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </motion.button>
              <motion.button
                onClick={scrollRight}
                disabled={!canScrollRight}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors 
                  ${canScrollRight 
                    ? 'bg-white/10 border border-white/20 text-primary hover:bg-white/20' 
                    : 'opacity-30 cursor-not-allowed bg-white/5 border border-white/10 text-muted-foreground'}`}
                whileHover={canScrollRight ? { scale: 1.05 } : {}}
                whileTap={canScrollRight ? { scale: 0.95 } : {}}
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </motion.button>
            </div>
          </div>
          
          {/* Loading state */}
          {isLoading && (
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="border border-border rounded-lg p-3 flex-shrink-0 w-[280px] sm:w-[320px] snap-start">
                  <div className="w-full h-32 sm:h-40 bg-muted/50 rounded-md mb-3"></div>
                  <div className="h-5 w-3/4 bg-muted/50 rounded-md mb-2"></div>
                  <div className="h-3 w-1/2 bg-muted/50 rounded-md"></div>
                </div>
              ))}
            </div>
          )}
          
          {/* Error state */}
          {!isLoading && error && (
            <div className="text-center py-6">
              <p className="text-base font-medium text-red-500">{error}</p>
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
            <div className="text-center py-6 border border-border rounded-lg">
              <p className="text-base font-medium">{t.noPosts || "No posts found"}</p>
              <p className="text-sm text-muted-foreground mt-2">{t.checkBackSoon || "Check back soon for new content"}</p>
            </div>
          )}
          
          {/* Blog posts carousel */}
          {!isLoading && !error && posts.length > 0 && (
            <div 
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch' 
              }}
            >
              {posts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="bg-card/50 border border-border rounded-lg overflow-hidden flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] snap-start hover:border-primary/30 transition-colors"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative w-full h-32 sm:h-40">
                      <Image
                        src={post.image || "/images/placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 350px"
                      />
                    </div>
                    
                    <div className="p-3 sm:p-4">
                      <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground mb-2">
                        <span>{post.date}</span>
                        {post.readTime && (
                          <>
                            <span className="mx-1 sm:mx-2">•</span>
                            <span className="flex items-center">
                              <Clock className="w-2 h-2 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" /> 
                              <span>{post.readTime}m</span>
                            </span>
                          </>
                        )}
                      </div>
                      
                      <h3 className="text-sm sm:text-base font-bold mb-1 sm:mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {post.description}
                      </p>
                      
                      <div className="flex items-center text-primary text-xs">
                        <span>{t.readMore || "Read more"}</span>
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        
        {/* View all button */}
        {!isLoading && !error && posts.length > 0 && (
          <div className="mt-4 sm:mt-8 text-center">
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