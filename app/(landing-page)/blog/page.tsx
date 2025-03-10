// app/blog/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ClockIcon, ArrowRight } from 'lucide-react'
import { getAllPosts } from '@/lib/api'
import { getLanguage, getTranslations } from '@/lib/i18n/server-utils'
import { cn } from '@/lib/utils'
import { SupportedLanguage } from '@/lib/i18n/types'

export default async function Blog() {
  // Use await for async functions
  const currentLanguage = await getLanguage();
  const t = await getTranslations(currentLanguage);
  
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'description',
    'image',
    'category',
    'readTime',
    // Make sure 'translationSlugs' is a valid key in your Post type
  ], { language: currentLanguage as SupportedLanguage });

  // Get unique categories from posts
  const categoriesSet = new Set(allPosts.map(post => post.category).filter(Boolean));
  const categories = Array.from(categoriesSet) as string[];

  // Use our design token classes instead of hardcoded colors
  const primaryClass = "text-primary";
  const primaryBgClass = "bg-primary";
  const primaryHoverClass = "hover:text-primary";

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/20" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at center, white 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px'
          }}
        />
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-foreground">
            {t.blogTitle || 'Blog'}
          </h1>
          <div className={cn("h-1 w-20 mx-auto mb-6", primaryBgClass)}></div>
          <p className="text-xl text-center text-muted-foreground max-w-2xl mx-auto">
            {t.blogDescription || 'Latest articles and updates'}
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Button
              variant="outline"
              size="sm"
              className={cn(primaryBgClass, "text-primary-foreground hover:bg-primary/90 transition-colors")}
            >
              {t.allPosts || 'All Posts'}
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className={cn("border-primary text-primary hover:bg-primary/10 transition-colors")}
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {/* Featured Post */}
        {allPosts.length > 0 && (
          <div className="mb-16">
            <h2 className={cn("text-2xl font-bold mb-6 text-foreground flex items-center")}>
              {t.featuredPost || 'Featured Post'}
              <div className={cn("h-1 w-6 ml-2", primaryBgClass)}></div>
            </h2>
            <Link href={`/blog/${allPosts[0].slug}`} className="group">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-72 md:h-96 overflow-hidden">
                    <Image
                      src={allPosts[0].image || '/images/placeholder.jpg'}
                      alt={allPosts[0].title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {allPosts[0].category && (
                      <div className="absolute bottom-4 left-4">
                        <span className={cn("text-primary-foreground text-sm px-3 py-1 rounded-full", primaryBgClass)}>
                          {allPosts[0].category}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-sm">
                      {allPosts[0].readTime && (
                        <span className="text-muted-foreground flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" /> {allPosts[0].readTime} {t.minRead || 'min read'}
                        </span>
                      )}
                    </div>
                    <h3 className={cn("text-2xl md:text-3xl font-bold mt-4 mb-3 text-foreground group-hover:text-primary transition-colors")}>
                      {allPosts[0].title}
                    </h3>
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {allPosts[0].description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-medium text-foreground">{allPosts[0].author}</div>
                          <div className="text-sm text-muted-foreground">{allPosts[0].date}</div>
                        </div>
                      </div>
                      <div className={cn("flex items-center font-medium group-hover:translate-x-1 transition-transform", primaryClass)}>
                        {t.readMore || 'Read More'} <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        )}

        {/* All Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.slice(1).map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group"
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-0">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image || '/images/placeholder.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  {post.category && (
                    <div className="absolute bottom-4 left-4">
                      <span className={cn("text-primary-foreground text-xs px-2 py-1 rounded-full", primaryBgClass)}>
                        {post.category}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm mb-3">
                    {post.readTime && (
                      <span className="text-muted-foreground flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" /> {post.readTime} {t.minRead || 'min read'}
                      </span>
                    )}
                  </div>
                  <h3 className={cn("text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2")}>
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-sm text-muted-foreground">
                      {post.date}
                    </div>
                    <div className={cn("text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform", primaryClass)}>
                      {t.readMore || 'Read More'} <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}