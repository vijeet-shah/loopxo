// app/(landing-page)/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Calendar, Tag } from 'lucide-react';
import HeroSection from '@/components/landing-page/heroSection';
import TechnologyTicker from '@/components/landing-page/technologyTicker';
import FeaturedPost from '@/components/landing-page/featuredPost';
import Newsletter from '@/components/landing-page/newsletter';
import { getAllPosts } from '@/lib/api';
import { getLanguage, getTranslations } from '@/lib/i18n/server-utils';
import { SupportedLanguage } from '@/lib/i18n/types';

export default async function HomePage() {
  // Get language and translations
  const currentLanguage = await getLanguage();
  const t = await getTranslations(currentLanguage);
  
  // Get all posts (just like in Blog page)
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'description',
    'image',
    'category',
    'readTime',
  ], { language: currentLanguage as SupportedLanguage });

  // Split into featured post and recent posts
  const featuredPost = allPosts.length > 0 ? allPosts[0] : null;
  const recentPosts = allPosts.slice(1, 6); // Get up to 6 recent posts

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Technology Ticker */}
      <TechnologyTicker />

      {/* Featured Post Section */}
      <section id="featured-post" className="py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="flex items-center justify-between mb-12">
            <h2 className="cosmic-text text-3xl font-bold">
              {t.featuredPost || "Featured Post"}
            </h2>
            <div className="h-0.5 bg-gradient-to-r from-primary/20 to-transparent flex-1 ml-6"></div>
          </div>
          
          <FeaturedPost
            post={featuredPost} 
            t={t} 
            isLoading={false}
          />
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute -z-10 inset-0 bg-pattern-grid opacity-5"></div>
        <div className="absolute bottom-0 left-0 -ml-20 mb-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="flex items-center justify-between mb-12">
            <h2 className="cosmic-text text-3xl font-bold">
              {t.recentArticles || "Recent Articles"}
            </h2>
            <Link 
              href="/blog" 
              className="group px-4 py-2 rounded-lg bg-secondary/90 text-sm font-medium flex items-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              {t.viewAll || "View All"}
              <span className="ml-1 h-4 w-4 inline-block transition-transform group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
          
          {/* Recent Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <div key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`}>
                  <div className="cosmic-card-interactive h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image || "/images/placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      {post.category && (
                        <div className="absolute bottom-4 left-4">
                          <span className="glass-panel px-3 py-1 rounded-full text-xs">
                            {post.category}
                          </span>
                        </div>
                      )}
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
                        <span className="ml-1 h-3 w-3 inline-block transition-transform group-hover:translate-x-1">
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          {recentPosts.length === 0 && (
            <div className="cosmic-card text-center py-12 rounded-xl">
              <Tag className="h-16 w-16 mx-auto text-primary/50 mb-4" />
              <p className="text-xl font-medium">{t.noPosts || "No posts available yet"}</p>
              <p className="text-muted-foreground mt-2">{t.checkBackSoon || "Check back soon for new content"}</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter t={t} />
    </div>
  );
}