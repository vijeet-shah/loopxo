// lib/helpers.ts
/**
 * Generate a URL-friendly slug from a string
 * @param text The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function generateSlug(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')       // Replace spaces with hyphens
      .replace(/&/g, '-and-')      // Replace & with 'and'
      .replace(/[^\w\-]+/g, '')    // Remove non-word characters
      .replace(/\-\-+/g, '-')      // Replace multiple hyphens with a single hyphen
      .replace(/^-+/, '')          // Trim hyphens from start
      .replace(/-+$/, '');         // Trim hyphens from end
  }