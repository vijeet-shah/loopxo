// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPostBySlug, getAllPosts, getAvailableLanguagesForPost } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'
import TableOfContents from './TableOfContents'
import { ArrowLeft, Calendar, Clock, UserIcon, Globe } from 'lucide-react'
import { getLanguage, getTranslations } from '@/lib/i18n/server-utils'
import { SupportedLanguage } from '@/lib/i18n/types'
import './markdown-styles.css'
import { languageNames } from '@/lib/i18n/dictionary'

export async function generateStaticParams() {
  // Get all post slugs (directory names)
  const slugs = getAllPosts(['slug']).map(post => post.slug);
  
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const currentLanguage = await getLanguage();
  const t = await getTranslations(currentLanguage);
  
  // First try to get the post in current language
  let post = getPostBySlug(
    params.slug, 
    ['title', 'date', 'slug', 'author', 'content', 'image', 'description', 'category', 'readTime'],
    currentLanguage
  );

  // If not found, try to get it in the default language (English)
  if (!post && currentLanguage !== 'en') {
    post = getPostBySlug(
      params.slug,
      ['title', 'date', 'slug', 'author', 'content', 'image', 'description', 'category', 'readTime'],
      'en'
    );
  }

  if (!post) {
    notFound();
  }

  // Process the markdown content to HTML
  const { content, headings } = markdownToHtml(post.content || '');

  // Get available languages for this post
  const availableLanguages = getAvailableLanguagesForPost(params.slug);
  const hasTranslations = availableLanguages.length > 1;

  // Determine if the language reads right-to-left (only Arabic and Hebrew are truly RTL)
  // Hindi is NOT an RTL language, so we remove it from this check
  const isRTL = currentLanguage === 'ar' || currentLanguage === 'he';
  // Special font for Hindi without RTL
  const isHindi = currentLanguage === 'hi';

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> {t.backToBlog || 'Back to Blog'}
          </Link>
          
          {/* Language switcher for the current post */}
          {hasTranslations && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <div className="flex flex-wrap gap-2">
                {availableLanguages.map(lang => {
                  if (lang === currentLanguage) return null;
                  
                  // Ensure languageNames[lang] exists before using it
                  const displayName = languageNames[lang as SupportedLanguage] || lang;
                  
                  return (
                    <Link 
                      key={lang}
                      href={`/blog/${params.slug}?lang=${lang}`}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      {displayName}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
        <article className="bg-background shadow-lg rounded-xl overflow-hidden">
          {post.image && (
            <div className="relative h-72 sm:h-96">
              <Image 
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              {post.category && (
                <div className="absolute bottom-6 left-6">
                  <span className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              )}
            </div>
          )}
          <div className="p-6 sm:p-8">
            <h1 className={`text-3xl sm:text-4xl font-bold mb-2 text-foreground ${isHindi ? 'font-hindi' : ''}`}>
              {post.title}
            </h1>
            <p className={`text-muted-foreground mb-4 ${isHindi ? 'font-hindi' : ''}`}>
              {post.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm mb-8 text-muted-foreground">
              <div className="flex items-center">
                <UserIcon className="h-4 w-4 mr-1" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{post.date}</span>
              </div>
              {post.readTime && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readTime} {t.minRead || 'min read'}</span>
                </div>
              )}
            </div>
            
            <div className="border-b-2 border-primary/10 mb-8"></div>

            <div className="flex flex-col lg:flex-row gap-8">
              {headings && headings.length > 0 && (
                <aside className="lg:w-1/4 lg:pr-4">
                  <TableOfContents headings={headings} tableTitle={t.tableOfContents || 'Table of Contents'} />
                </aside>
              )}

              <div className={headings && headings.length > 0 ? "lg:w-3/4" : "w-full"}>
                <div 
                  className={`markdown-content ${isHindi ? 'font-hindi' : ''}`}
                  dangerouslySetInnerHTML={{ __html: content }} 
                />
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}