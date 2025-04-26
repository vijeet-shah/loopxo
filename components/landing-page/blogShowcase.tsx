// components/landing-page/blogShowcase.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Clock, Calendar, UserIcon, Bookmark, Sparkles, Tag} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n/client-utils';


// TypeScript interfaces for better type safety
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
  
  const featuredRef = useRef(null);
  const recentRef = useRef(null);
  
  // Parallax effects for featured post
  const { scrollYProgress: featuredScrollProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(featuredScrollProgress, [0, 1], [0, -30]);
  const contentY = useTransform(featuredScrollProgress, [0, 1], [0, 20]);
  
  // Effects for recent posts
  const { scrollYProgress: recentScrollProgress } = useScroll({
    target: recentRef,
    offset: ["start end", "end start"]
  });
  
  const containerOpacity = useTransform(recentScrollProgress, [0, 0.1], [0, 1]);
  const containerY = useTransform(recentScrollProgress, [0, 0.1], [30, 0]);
  
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
  
  // Animation variants
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
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };
  
  // Split posts into featured and recent
  const featuredPost = posts.length > 0 ? posts[0] : null;
  const recentPosts = posts.length > 1 ? posts.slice(1, 4) : []; // Limit to 3 for better book page fit

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/5 to-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/10 blur-3xl" />
      </div>
      
      {/* Book page styling */}
      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Book binding effect */}
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 md:gap-16 items-center">
          <motion.div 
            className="p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Page header */}
            <motion.h2 
              className="cosmic-text text-3xl sm:text-4xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              My Digital Notebook
            </motion.h2>
            
            {/* FEATURED POST SECTION */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="cosmic-text text-2xl font-bold">
                  {t.featuredPost || "Featured Post"}
                </h3>
                <div className="h-0.5 bg-gradient-to-r from-primary/20 to-transparent flex-1 ml-6"></div>
              </div>
              
              {/* Featured post loading state */}
              {isLoading && (
                <div ref={featuredRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="h-64 rounded-lg overflow-hidden shimmer bg-muted/30"></div>
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="h-6 w-3/4 rounded shimmer bg-muted/30"></div>
                    <div className="h-16 rounded shimmer bg-muted/30"></div>
                    <div className="h-4 w-1/2 rounded shimmer bg-muted/30"></div>
                  </div>
                </div>
              )}
              
              {/* Error state */}
              {!isLoading && error && (
                <div className="border border-primary/10 rounded-lg text-center py-10">
                  <Bookmark className="h-12 w-12 mx-auto text-red-500/50 mb-4" />
                  <p className="text-lg font-medium">{t.errorLoadingPost || "Error loading featured post"}</p>
                  <p className="text-muted-foreground mt-2">{error}</p>
                </div>
              )}
              
              {/* No featured post state */}
              {!isLoading && !error && !featuredPost && (
                <div className="border border-primary/10 rounded-lg text-center py-10">
                  <Bookmark className="h-12 w-12 mx-auto text-primary/50 mb-4" />
                  <p className="text-lg font-medium">{t.noPosts || "No featured post available"}</p>
                  <p className="text-muted-foreground mt-2">{t.checkBackSoon || "Check back soon for new content"}</p>
                </div>
              )}
              
              {/* Featured post content */}
              {!isLoading && !error && featuredPost && (
                <motion.div 
                  ref={featuredRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-primary/10 rounded-lg p-4 bg-card/50"
                >
                  {/* Featured image with parallax effect */}
                  <motion.div 
                    style={{ y: imageY }}
                    className="relative"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative h-64 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={featuredPost.image || "/images/placeholder.jpg"}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        priority
                      />
                      
                      {/* Gradient overlay for text legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      
                      {/* Category tag with special styling */}
                      {featuredPost.category && (
                        <div className="absolute top-3 left-3">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-primary/20 flex items-center space-x-1"
                          >
                            <Sparkles className="h-3 w-3 text-primary" />
                            <span className="text-xs font-medium text-white">{featuredPost.category}</span>
                          </motion.div>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                  
                  {/* Content with subtle parallax in opposite direction */}
                  <motion.div 
                    style={{ y: contentY }}
                    className="flex flex-col justify-center space-y-4"
                  >
                    <h3 className="text-xl font-bold">{featuredPost.title}</h3>
                    
                    <p className="text-muted-foreground text-sm line-clamp-3">{featuredPost.description}</p>
                      
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      {featuredPost.author && (
                        <div className="flex items-center">
                          <UserIcon className="mr-1 h-3 w-3 text-primary/70" />
                          <span>{featuredPost.author}</span>
                        </div>
                      )}
                      {featuredPost.date && (
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3 text-primary/70" />
                          <span>{featuredPost.date}</span>
                        </div>
                      )}
                      {featuredPost.readTime && (
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3 text-primary/70" />
                          <span>{featuredPost.readTime} {t.minRead || "min read"}</span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <Button asChild variant="link" className="p-0 h-auto text-primary">
                        <Link href={`/blog/${featuredPost.slug}`}>
                          {t.readMore || "Read Article"}
                          <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </motion.span>
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </section>
            
            {/* RECENT POSTS SECTION */}
            <section ref={recentRef} className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="cosmic-text text-2xl font-bold">
                  {t.recentArticles || "Recent Articles"}
                </h3>
                <Link 
                  href="/blog" 
                  className="text-xs font-medium text-primary flex items-center"
                >
                  {t.viewAll || "View All"}
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
              
              {/* Recent posts loading state */}
              {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border border-primary/10 rounded-lg p-3 space-y-2">
                      <div className="h-24 rounded shimmer bg-muted/30"></div>
                      <div className="h-4 w-3/4 rounded shimmer bg-muted/30"></div>
                      <div className="h-8 rounded shimmer bg-muted/30"></div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Empty recent posts state */}
              {!isLoading && !error && recentPosts.length === 0 && (
                <div className="border border-primary/10 rounded-lg text-center py-8">
                  <Tag className="h-12 w-12 mx-auto text-primary/50 mb-3" />
                  <p className="text-base font-medium">{t.noPosts || "No recent articles yet"}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.checkBackSoon || "Check back soon"}</p>
                </div>
              )}
              
              {/* Recent posts grid */}
              {!isLoading && !error && recentPosts.length > 0 && (
                <motion.div
                  style={{
                    opacity: containerOpacity,
                    y: containerY
                  }}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {recentPosts.map((post) => (
                    <motion.div 
                      key={post.slug}
                      variants={itemVariants}
                      className="group border border-primary/10 hover:border-primary/30 rounded-lg p-3 transition-all"
                    >
                      <Link href={`/blog/${post.slug}`} className="block">
                        <div className="relative h-24 mb-3 rounded overflow-hidden">
                          <Image
                            src={post.image || "/images/placeholder.jpg"}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {post.category && (
                            <div className="absolute bottom-1 left-1 z-10">
                              <div className="px-1.5 py-0.5 text-[10px] rounded-full bg-white/10 backdrop-blur-sm border border-primary/20">
                                {post.category}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-bold line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          
                          <div className="flex items-center text-[10px] text-muted-foreground">
                            <Calendar className="mr-0.5 h-2 w-2" /> 
                            <span>{post.date}</span>
                            {post.readTime && (
                              <>
                                <span className="mx-1">·</span>
                                <Clock className="mr-0.5 h-2 w-2" />
                                <span>{post.readTime} min</span>
                              </>
                            )}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </section>
          </motion.div>
        </div>
     
      </motion.div>
      
      {/* Book edge shadow */}
      <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none hidden md:block"></div>
      <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none hidden md:block"></div>
    </div>
  );
}