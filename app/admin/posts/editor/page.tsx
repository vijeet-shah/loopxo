// app/admin/posts/editor/page.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  ArrowLeft,
  Save,
  Eye,
  Image as ImageIcon,
  Loader2,
  Upload,
  Trash2,
  Calendar,
  Clock,
  Tag,
  Check,
  X,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Helper function to generate a slug from a string
function generateSlug(text) {
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

// Format a date for display
function formatDateForDisplay(dateString) {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  // Format options
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return date.toLocaleDateString('en-US', options);
}

export default function PostEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');
  const isEditing = !!postId;

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [readTime, setReadTime] = useState('5');
  const [published, setPublished] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [language, setLanguage] = useState('en');
  const [translationSlugs, setTranslationSlugs] = useState({});

  // Image handling
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef(null);

  // State for UI
  const [activeTab, setActiveTab] = useState('write');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Mock categories and languages for the demo
  const categories = ['Technology', 'Finance', 'Health', 'Lifestyle', 'Education', 'News'];
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'hi', name: 'Hindi' },
  ];

  // Effect to load post data when editing
  useEffect(() => {
    if (isEditing) {
      fetchPostData();
    }
  }, [isEditing]);

  // Load post data when editing
  const fetchPostData = async () => {
    try {
      const response = await fetch(`/api/admin/posts/${postId}`);
      if (!response.ok) throw new Error('Failed to fetch post data');
      
      const post = await response.json();
      
      setTitle(post.title || '');
      setSlug(post.slug || '');
      setDescription(post.description || '');
      setContent(post.content || '');
      setCategory(post.category || '');
      setTags(post.tags?.join(', ') || '');
      setReadTime(post.readTime?.toString() || '5');
      setPublished(post.published || false);
      setFeatured(post.featured || false);
      setImage(post.image || '');
      setLanguage(post.language || 'en');
      setTranslationSlugs(post.translationSlugs || {});
    } catch (err) {
      console.error('Error fetching post:', err);
      setError('Failed to load post data');
    }
  };

  // Generate slug from title
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!isEditing) {
      setSlug(generateSlug(newTitle));
    }
  };

  // Handle image upload
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl);
    }
  };

  // Function to upload image to Cloudinary
  const uploadImageToCloudinary = async () => {
    if (!imageFile) return image; // Return existing image URL if no new file
    
    setImageUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      if (!response.ok) throw new Error('Failed to upload image');
      
      const data = await response.json();
      return data.secure_url;
    } catch (err) {
      console.error('Error uploading image:', err);
      throw new Error('Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  // Handle saving the post
  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!title || !slug) {
      setError('Title and slug are required');
      return;
    }
    
    setSaving(true);
    setError('');
    
    try {
      // First upload image if needed
      let imageUrl = image;
      if (imageFile) {
        imageUrl = await uploadImageToCloudinary();
      }
      
      // Prepare post data
      const postData = {
        title,
        slug,
        description,
        content,
        category,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        readTime: parseInt(readTime) || 5,
        published,
        featured,
        image: imageUrl,
        language,
        translationSlugs,
        // Set author to current user (would get from authentication)
        author: 'Admin',
        // Add current date for new posts
        date: isEditing ? undefined : new Date().toISOString().split('T')[0],
      };
      
      // Save to API
      const url = isEditing 
        ? `/api/admin/posts/${postId}` 
        : '/api/admin/posts';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save post');
      }
      
      setSuccess('Post saved successfully!');
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/admin/posts');
      }, 1500);
      
    } catch (err) {
      console.error('Error saving post:', err);
      setError(err.message || 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  // Helper to calculate estimated read time
  const calculateReadTime = () => {
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
    setReadTime(readingTime.toString());
  };

  // Helper function to remove image
  const removeImage = () => {
    setImage('');
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="/admin/posts" className="mr-4">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => setActiveTab(activeTab === 'write' ? 'preview' : 'write')}
          >
            {activeTab === 'write' ? (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </>
            ) : (
              <>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Editor
              </>
            )}
          </Button>
          
          <Button
            onClick={handleSave}
            disabled={saving || imageUploading}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Post
              </>
            )}
          </Button>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert className="mb-6 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          <AlertDescription className="text-green-800 dark:text-green-400">
            {success}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="write" className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="title">Post Title</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Enter post title"
                        className="mb-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="slug">
                        Slug (URL) 
                        <span className="text-xs text-gray-500 ml-1">
                          (auto-generated, but you can customize)
                        </span>
                      </Label>
                      <Input
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="post-url-slug"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Short Description</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Brief description of the post (will be shown in cards and SEO)"
                        rows={2}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="content">Content (Markdown)</Label>
                      <div className="border rounded-md overflow-hidden">
                        <div className="bg-muted px-3 py-1 text-xs border-b flex justify-between items-center">
                          <span>Markdown Editor</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={calculateReadTime}
                            className="text-xs h-6"
                            type="button"
                          >
                            <Clock className="mr-1 h-3 w-3" />
                            Calculate Reading Time
                          </Button>
                        </div>
                        <Textarea
                          id="content"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="Write your post content in Markdown format..."
                          className="border-0 rounded-none focus-visible:ring-0 min-h-[400px]"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        You can use Markdown syntax and HTML to format your content.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preview" className="mt-0">
              <Card className="overflow-hidden">
                {image && (
                  <div className="relative h-56 w-full">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <h1 className="text-3xl font-bold mb-4">{title || 'Post Title'}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm mb-8 text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDateForDisplay(new Date())}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{readTime} min read</span>
                    </div>
                    {category && (
                      <span className="bg-primary text-primary-foreground text-sm px-2 py-1 rounded-full">
                        {category}
                      </span>
                    )}
                  </div>
                  
                  <div className="prose prose-amber max-w-none dark:prose-invert">
                    {content ? (
                      <div dangerouslySetInnerHTML={{ __html: content }}></div>
                    ) : (
                      <div className="text-muted-foreground italic">
                        Your post content will appear here...
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          {/* Publishing Options */}
          <Card>
            <CardHeader>
              <CardTitle>Publishing Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="published" className="cursor-pointer">Publish Post</Label>
                <Switch
                  id="published"
                  checked={published}
                  onCheckedChange={setPublished}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="featured" className="cursor-pointer">Featured Post</Label>
                <Switch
                  id="featured"
                  checked={featured}
                  onCheckedChange={setFeatured}
                />
              </div>
              <div>
                <Label htmlFor="readTime">Reading Time (minutes)</Label>
                <Input
                  id="readTime"
                  type="number"
                  min="1"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="language">Language</Label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1 w-full border border-input rounded-md p-2 bg-background"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Translation info */}
              {language !== 'en' && (
                <div className="pt-2 border-t border-border">
                  <Label className="text-sm mb-2 block">
                    <Globe className="h-4 w-4 inline mr-1" />
                    This is a translated post
                  </Label>
                  <div className="text-xs text-muted-foreground">
                    Translated posts will be shown to users browsing in {languages.find(l => l.code === language)?.name}.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              {image ? (
                <div className="space-y-3">
                  <div className="relative h-44 rounded-md overflow-hidden border border-border">
                    <Image
                      src={image}
                      alt="Featured image"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Change
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={removeImage}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div 
                    className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">
                      Click to upload an image
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Recommended: 1200×630px
                    </p>
                  </div>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />
            </CardContent>
          </Card>
          
          {/* Categories & Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Categories & Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 w-full border border-input rounded-md p-2 bg-background"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="tags">
                  Tags
                  <span className="text-xs text-gray-500 ml-1">
                    (comma separated)
                  </span>
                </Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="technology, news, tutorial"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}