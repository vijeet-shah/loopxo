import { getAllPosts } from '@/lib/api';
import { getLanguage, getTranslations } from '@/lib/i18n/server-utils';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Calendar, UserIcon, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import HeroSection from '@/components/hero-section';

export default async function HomePage() {
  // Get translations
  const lang = await getLanguage();
  const t = await getTranslations(lang);
  
  // Get featured and recent posts
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'description',
    'image',
    'category',
    'readTime',
    'featured'
  ], { language: lang });
  
  // Separate featured and regular posts
  const featuredPosts = allPosts.filter(post => post.featured);
  const recentPosts = allPosts.slice(0, 6);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection/>

      {/* Featured Post Section */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container px-4 mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold">Featured Post</h2>
              <div className="h-0.5 bg-primary/10 flex-1 ml-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-96 rounded-xl overflow-hidden">
                <Image
                  src={featuredPosts[0].image || "/images/placeholder.jpg"}
                  alt={featuredPosts[0].title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                {featuredPosts[0].category && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                      {featuredPosts[0].category}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-3xl font-bold">{featuredPosts[0].title}</h3>
                <p className="text-muted-foreground">{featuredPosts[0].description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <UserIcon className="mr-1 h-4 w-4" />
                    <span>{featuredPosts[0].author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>{featuredPosts[0].date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{featuredPosts[0].readTime || 5} min read</span>
                  </div>
                </div>
                
                <Button asChild className="mt-4 self-start">
                  <Link href={`/blog/${featuredPosts[0].slug}`}>
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-16 bg-muted/20">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Recent Articles</h2>
            <Link href="/blog" className="text-primary font-medium hover:underline flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <div className="bg-background rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || "/images/placeholder.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    {post.category && (
                      <div className="absolute bottom-4 left-4">
                        <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center text-xs text-muted-foreground mb-2">
                      <Calendar className="mr-1 h-3 w-3" /> 
                      <span>{post.date}</span>
                      {post.readTime && (
                        <>
                          <span className="mx-2">·</span>
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{post.readTime} min read</span>
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
                      Read Article <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Topics/Categories Section */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-10">Explore Topics</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {["Web Development", "JavaScript", "React", "NextJS", "Career Growth", "TypeScript", "UI/UX", "Performance"].map((topic) => (
              <Link 
                key={topic} 
                href={`/blog/category/${topic.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-muted/50 hover:bg-primary/5 border border-border hover:border-primary/20 rounded-lg p-4 text-center transition-colors group"
              >
                <div className="flex flex-col items-center">
                  <Tag className="h-8 w-8 mb-2 text-primary" />
                  <span className="font-medium group-hover:text-primary transition-colors">{topic}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary/5">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to my newsletter to receive updates on new articles, resources, and occasional dev tips.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                required
              />
              <Button type="submit">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">
              I respect your privacy. No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}