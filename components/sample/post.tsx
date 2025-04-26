"use client";

import React, { useEffect } from "react";
import {  useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/client-utils";
import { 
   ArrowRight
} from "lucide-react";

// Define types for post data
interface PostProps {
  posts: {
    slug: string;
    title: string;
    date: string;
    description: string;
    image: string;
    category: string;
    readTime: number;
    author?: string;
  }[];
  t?: any; // Translations
}

// Main component with real post data
export default function PostSec({ posts, t }: PostProps) {
  // Use translation if t is not provided
  const translation = useTranslation();
  const translations = t || translation.t;
  
  // Parallax effect for page corners
  const pageCornerX = useMotionValue(0);
  const pageCornerY = useMotionValue(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate distance from center (normalized to -1 to 1)
      const moveX = (clientX - centerX) / centerX;
      const moveY = (clientY - centerY) / centerY;
      
      pageCornerX.set(moveX * 5); // Adjust multiplier for effect intensity
      pageCornerY.set(moveY * 5);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [pageCornerX, pageCornerY]);

  // Get the featured post (first one) if available
  const featuredPost = posts && posts.length > 0 ? posts[0] : null;
  
  return (
    <section className="py-16 relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-[0.02]"></div>
      <div className="absolute -top-40 -left-40 h-80 w-80 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 h-80 w-80 bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 inline-block relative">
            <span className="relative z-10">{translations.featuredPost || "Featured Article"}</span>
            <div className="absolute bottom-0 left-0 h-3 w-24 bg-primary/20 -z-10"></div>
          </h2>
          
          {featuredPost ? (
            <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
              <div className="md:flex">
                <div className="md:w-1/3 relative h-64 md:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                  <Image 
                    src={featuredPost.image || "/images/placeholder.jpg"} 
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6 md:w-2/3">
                  <div className="text-sm text-primary mb-2">{featuredPost.category}</div>
                  <h3 className="text-2xl font-bold mb-3">{featuredPost.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {featuredPost.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <span>{featuredPost.date}</span>
                    <span className="mx-2">•</span>
                    <span>{featuredPost.readTime} {translations.minRead || "min read"}</span>
                  </div>
                  
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition flex items-center">
                      {translations.readMore || "Read Article"}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-12 text-center">
              <p className="text-lg font-medium">{translations.noPosts || "No featured posts available yet"}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}