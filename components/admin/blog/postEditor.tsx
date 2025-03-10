// components/admin/blog/PostEditor.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertCircle, Save, Eye, Globe, Image, Tag, FileText, Calendar, Clock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { MarkdownEditor } from '@/components/admin/blog/markdownEditor';
import { cn } from '@/lib/utils';
import { slugify } from '@/lib/utils';
import { languageNames, SupportedLanguage } from '@/lib/i18n/types';

interface PostEditorProps {
  postId?: string;
  defaultLanguage?: SupportedLanguage;
  isNew?: boolean;
}

interface TranslationStatus {
  [key: string]: 'draft' | 'published' | 'none';
}

interface PostFormData {
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  tags: string[];
  published: boolean;
  translationSlugs: Record<string, string>;
}

export function PostEditor({ postId, defaultLanguage = 'en', isNew = false }: PostEditorProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(defaultLanguage);
  const [availableLanguages, setAvailableLanguages] = useState<SupportedLanguage[]>(
    Object.keys(languageNames) as SupportedLanguage[]
  );
  const [translations, setTranslations] = useState<Record<string, PostFormData>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [translationStatus, setTranslationStatus] = useState<TranslationStatus>({});

  // Form setup for the main language
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<PostFormData>({
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      content: '',
      image: '',
      category: '',
      author: '',
      date: new Date().toISOString().split('T')[0],
      readTime: 5,
      tags: [],
      published: false,
      translationSlugs: {},
    },
  });

  const watchTitle = watch('title');
  const watchContent = watch('content');
  const watchSlug = watch('slug');
  const watchTags = watch('tags', []);

  // Handle auto-slug generation when title changes
  useEffect(() => {
    if (watchTitle && isNew && activeTab === defaultLanguage) {
      const generatedSlug = slugify(watchTitle);
      setValue('slug', generatedSlug);
    }
  }, [watchTitle, isNew, activeTab, defaultLanguage, setValue]);

  // Calculate read time when content changes
  useEffect(() => {
    if (watchContent) {
      const wordCount = watchContent.trim().split(/\s+/).length;
      const calculatedReadTime = Math.max(1, Math.ceil(wordCount / 200)); // Assume 200 words per minute
      setValue('readTime', calculatedReadTime);
    }
  }, [watchContent, setValue]);

  // Fetch post data if editing an existing post
  useEffect(() => {
    const fetchPostData = async () => {
      if (!postId || isNew) return;

      try {
        const response = await fetch(`/api/admin/posts/${postId}`);
        if (!response.ok) throw new Error('Failed to fetch post data');
        
        const data = await response.json();
        
        // Set form values for main language
        setValue('title', data.title || '');
        setValue('slug', data.slug || '');
        setValue('description', data.description || '');
        setValue('content', data.content || '');
        setValue('image', data.image || '');
        setValue('category', data.category || '');
        setValue('author', data.author || '');
        setValue('date', data.date || new Date().toISOString().split('T')[0]);
        setValue('readTime', data.readTime || 5);
        setValue('tags', data.tags || []);
        setValue('published', data.published || false);
        setValue('translationSlugs', data.translationSlugs || {});
        
        // Set translation status
        const status: TranslationStatus = { [defaultLanguage]: data.published ? 'published' : 'draft' };
        
        // Load translations if available
        if (data.translations) {
          const newTranslations: Record<string, PostFormData> = {};
          
          for (const [lang, translation] of Object.entries(data.translations)) {
            newTranslations[lang] = translation as PostFormData;
            status[lang] = translation.published ? 'published' : 'draft';
          }
          
          setTranslations(newTranslations);
        }
        
        // Set status for languages without translations
        availableLanguages.forEach(lang => {
          if (!status[lang]) {
            status[lang] = 'none';
          }
        });
        
        setTranslationStatus(status);
        
      } catch (err) {
        setError('Error loading post: ' + (err instanceof Error ? err.message : 'Unknown error'));
      }
    };

    fetchPostData();
  }, [postId, isNew, setValue, defaultLanguage, availableLanguages]);

  // Handle form submission
  const onSubmit = async (data: PostFormData) => {
    setSaving(true);
    setError(null);
  
    try {
      // Save the current language data to translations object
      const updatedTranslations = {
        ...translations,
        [activeTab]: data,
      };
      
      // Create the request body
      const requestBody = {
        ...data,
        translations: updatedTranslations,
        language: defaultLanguage,
      };
      
      // Determine endpoint and method
      const endpoint = isNew ? '/api/admin/posts' : `/api/admin/posts/${postId}`;
      const method = isNew ? 'POST' : 'PUT';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save post');
      }
      
      const savedPost = await response.json();
      
      // If new post, redirect to the post detail page
      if (isNew && savedPost.id) {
        router.push(`/admin/posts/${savedPost.id}/edit`);
      } else {
        // Update translation status
        const newStatus = { ...translationStatus };
        newStatus[activeTab] = data.published ? 'published' : 'draft';
        setTranslationStatus(newStatus);
        
        // Show success message or notification
        alert('Post saved successfully!');
      }
    } catch (err) {
      setError('Error saving post: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  // Handle tag input
  const handleAddTag = () => {
    if (tagInput.trim() && !watchTags.includes(tagInput.trim())) {
      setValue('tags', [...watchTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue('tags', watchTags.filter(tag => tag !== tagToRemove));
  };

  // Handle language change
  const handleLanguageChange = (language: string) => {
    // Save current form data to translations object
    const currentData = {
      title: watch('title'),
      slug: watch('slug'),
      description: watch('description'),
      content: watch('content'),
      image: watch('image'),
      category: watch('category'),
      author: watch('author'),
      date: watch('date'),
      readTime: watch('readTime'),
      tags: watch('tags', []),
      published: watch('published'),
      translationSlugs: watch('translationSlugs'),
    };
    
    setTranslations({
      ...translations,
      [activeTab]: currentData,
    });
    
    // Load selected language data
    const languageData = translations[language];
    if (languageData) {
      Object.entries(languageData).forEach(([key, value]) => {
        setValue(key as keyof PostFormData, value);
      });
    } else {
      // Set defaults for new translation
      setValue('title', '');
      setValue('slug', '');
      setValue('description', '');
      setValue('content', '');
      // Keep shared fields
      // setValue('image', watch('image'));
      // setValue('category', watch('category'));
      // setValue('author', watch('author'));
      // setValue('tags', watch('tags', []));
      setValue('published', false);
    }
    
    setActiveTab(language as SupportedLanguage);
  };

  // Add a new translation
  const addTranslation = (language: SupportedLanguage) => {
    if (translationStatus[language] === 'none') {
      const newStatus = { ...translationStatus };
      newStatus[language] = 'draft';
      setTranslationStatus(newStatus);
      handleLanguageChange(language);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button 
            type="submit" 
            className="bg-amber-600 hover:bg-amber-700 text-white"
            disabled={saving}
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : 'Save Post'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {previewMode ? 'Edit Mode' : 'Preview'}
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-muted-foreground" />
          <div className="text-sm font-medium">Languages:</div>
          <div className="flex gap-1">
            {availableLanguages.map(lang => (
              <Badge
                key={lang}
                variant={activeTab === lang ? "default" : "outline"}
                className={cn(
                  "cursor-pointer hover:bg-primary/20",
                  translationStatus[lang] === 'none' && "opacity-50"
                )}
                onClick={() => translationStatus[lang] !== 'none' 
                  ? handleLanguageChange(lang) 
                  : addTranslation(lang)
                }
              >
                {languageNames[lang]}
                {translationStatus[lang] === 'published' && "✓"}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Content - {languageNames[activeTab]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Post Title</Label>
                  <Input
                    id="title"
                    {...register('title', { required: 'Title is required' })}
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="slug">
                    Slug 
                    <span className="ml-1 text-xs text-muted-foreground">
                      (used in URL: /blog/{watchSlug})
                    </span>
                  </Label>
                  <Input
                    id="slug"
                    {...register('slug', { required: 'Slug is required' })}
                    className={errors.slug ? 'border-red-500' : ''}
                  />
                  {errors.slug && (
                    <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    {...register('description', { required: 'Description is required' })}
                    rows={3}
                    className={errors.description ? 'border-red-500' : ''}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="content">Content</Label>
                  <MarkdownEditor
                    value={watchContent}
                    onChange={(value) => setValue('content', value)}
                    preview={previewMode}
                  />
                  {errors.content && (
                    <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publication Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Published</Label>
                  <Switch
                    id="published"
                    checked={watch('published')}
                    onCheckedChange={(checked) => setValue('published', checked)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="date">
                    <Calendar className="inline-block mr-2 h-4 w-4" />
                    Publication Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    {...register('date', { required: 'Date is required' })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="readTime">
                    <Clock className="inline-block mr-2 h-4 w-4" />
                    Read Time (minutes)
                  </Label>
                  <Input
                    id="readTime"
                    type="number"
                    min="1"
                    {...register('readTime', { 
                      required: 'Read time is required',
                      valueAsNumber: true
                    })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    {...register('author', { required: 'Author is required' })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={watch('category')}
                    onValueChange={(value) => setValue('category', value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Savings & Investments">Savings & Investments</SelectItem>
                      <SelectItem value="Loans">Loans</SelectItem>
                      <SelectItem value="News">News</SelectItem>
                      <SelectItem value="Tips">Tips</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Image className="mr-2 h-5 w-5" />
                Featured Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    {...register('image', { required: 'Image URL is required' })}
                  />
                  {watch('image') && (
                    <div className="mt-2 relative aspect-video rounded-md overflow-hidden border">
                      <img 
                        src={watch('image')} 
                        alt="Preview" 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                </div>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push('/admin/media')}
                >
                  Select from Media Library
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tag className="mr-2 h-5 w-5" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag..."
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <Button type="button" onClick={handleAddTag} variant="outline">
                    Add
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {watchTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button 
                        type="button" 
                        onClick={() => handleRemoveTag(tag)} 
                        className="text-xs rounded-full hover:bg-gray-200 h-4 w-4 inline-flex items-center justify-center"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}