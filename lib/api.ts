import fs from 'fs';
import matter from 'gray-matter';
import { SupportedLanguage } from '@/lib/i18n/types';

const postsDirectory = process.cwd() + '/blog';

export type Category = 
  | 'Planning'
  | 'Development'
  | 'Finance'
  | 'Investing'
  | string;

export interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  content: string;
  image: string;
  description: string;
  category: Category;
  readTime: number;
  tags: string[];
  language: SupportedLanguage;
  translationSlugs?: Record<string, string>; // Add this to support translation slugs
  authorImage?: string;
  authorBio?: string;
  authorRole?: string;
  featured?: boolean;
  toc?: boolean;
}

export type PostMeta = Omit<Post, 'content'>;

/**
 * Get post slugs (post directory names)
 */
export function getPostSlugs(): string[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.warn(`Blog directory doesn't exist: ${postsDirectory}`);
      return [];
    }
    
    return fs.readdirSync(postsDirectory)
      .filter(file => {
        try {
          return fs.statSync(`${postsDirectory}/${file}`).isDirectory();
        } catch (error) {
          console.error(`Error checking if ${file} is a directory:`, error);
          return false;
        }
      });
  } catch (error) {
    console.error(`Error reading post slugs:`, error);
    return [];
  }
}

/**
 * Get a specific post by its slug and language
 */
export function getPostBySlug(slug: string, fields: (keyof Post)[] = [], language: SupportedLanguage = 'en'): Post | null {
  if (!slug) {
    return null;
  }

  // Change the path to point to language-specific files
  const fullPath = `${postsDirectory}/${slug}/${language}.md`;
  
  try {
    if (!fs.existsSync(fullPath)) {
      console.warn(`Post file not found: ${fullPath}`);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Validate required fields
    const requiredFields = ['title', 'date', 'author', 'category'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      console.warn(`Missing required fields in ${slug}/${language}.md: ${missingFields.join(', ')}`);
    }

    // Calculate read time if not provided (assuming 200 words per minute)
    if (!data.readTime) {
      const wordCount = content.trim().split(/\s+/).length;
      data.readTime = Math.ceil(wordCount / 200);
    }

    const items: Partial<Post> = {};

    // Build the post object based on requested fields
    fields.forEach((field) => {
      if (field === 'slug') {
        items[field] = slug;
      } else if (field === 'content') {
        items[field] = content;
      } else if (field === 'language') {
        items[field] = language;
      } else if (field === 'tags' && !data[field]) {
        items[field] = []; // Provide default empty array for tags
      } else if (field === 'featured' && typeof data[field] === 'undefined') {
        items[field] = false; // Default featured status
      } else if (field === 'translationSlugs') {
        items[field] = data.translationSlugs || {}; // Support translationSlugs
      } else if (typeof data[field] !== 'undefined') {
        items[field] = data[field];
      }
    });

    return items as Post;
  } catch (error) {
    console.error(`Error reading post ${slug} in ${language}:`, error);
    return null;
  }
}

/**
 * Get all posts with optional filtering and sorting
 */
export function getAllPosts(
  fields: (keyof Post)[] = [],
  options?: {
    language?: SupportedLanguage;
    category?: Category;
    featured?: boolean;
    limit?: number;
  }
): Post[] {
  try {
    const language = options?.language || 'en';
    const slugs = getPostSlugs();
    
    if (slugs.length === 0) {
      console.warn(`No post directories found in ${postsDirectory}`);
    }
    
    let posts = slugs
      .map((slug) => getPostBySlug(slug, [...fields, 'language', 'translationSlugs'], language))
      .filter((post): post is Post => post !== null)
      .sort((post1, post2) => (new Date(post1.date) > new Date(post2.date) ? -1 : 1));

    // Apply filters if options are provided
    if (options) {
      if (options.category) {
        posts = posts.filter(post => post.category === options.category);
      }
      if (typeof options.featured !== 'undefined') {
        posts = posts.filter(post => post.featured === options.featured);
      }
      if (options.limit) {
        posts = posts.slice(0, options.limit);
      }
    }

    return posts;
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

/**
 * Get available languages for a specific post
 */
export function getAvailableLanguagesForPost(slug: string): SupportedLanguage[] {
  try {
    const postDir = `${postsDirectory}/${slug}`;
    if (!fs.existsSync(postDir)) {
      console.warn(`Post directory doesn't exist: ${postDir}`);
      return ['en'];
    }
    
    const files = fs.readdirSync(postDir)
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', '') as SupportedLanguage);
    
    if (files.length === 0) {
      console.warn(`No language files found in ${postDir}`);
    }
    
    return files;
  } catch (error) {
    console.error(`Error getting available languages for post ${slug}:`, error);
    return ['en'];
  }
}

/**
 * Get featured posts for a specific language
 */
export function getFeaturedPosts(fields: (keyof Post)[] = [], language: SupportedLanguage = 'en'): Post[] {
  return getAllPosts(fields, { featured: true, language });
}

/**
 * Get posts by category for a specific language
 */
export function getPostsByCategory(category: Category, fields: (keyof Post)[] = [], language: SupportedLanguage = 'en'): Post[] {
  return getAllPosts(fields, { category, language });
}

/**
 * Get related posts based on category and tags
 */
export function getRelatedPosts(
  currentPost: Post,
  fields: (keyof Post)[] = [],
  limit: number = 3
): Post[] {
  const allPosts = getAllPosts(fields, { language: currentPost.language });
  
  return allPosts
    .filter(post => {
      // Exclude current post
      if (post.slug === currentPost.slug) return false;

      // Check category match
      const categoryMatch = post.category === currentPost.category;

      // Check tag match if both posts have tags
      const tagMatch = post.tags && currentPost.tags && 
        post.tags.some(tag => currentPost.tags.includes(tag));

      return categoryMatch || tagMatch;
    })
    .slice(0, limit);
}