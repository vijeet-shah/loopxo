'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  PlusIcon, FileEdit, Trash2, Eye, Search, Filter, Globe, Check, 
  Calendar, CircleSlash, RefreshCw, MoreHorizontal 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/lib/i18n/client-utils';
import { languageNames } from '@/lib/i18n/dictionary';
import type { SupportedLanguage } from '@/lib/i18n/types';

interface Post {
  id: string;
  title: string;
  slug: string;
  category?: string;
  author: string;
  published: boolean;
  language: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasMore: boolean;
}

export default function PostsPage() {
  const router = useRouter();
  const { lang } = useTranslation();
  
  // State for posts and filters
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 1,
    hasMore: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [search, setSearch] = useState('');
  const initialLang = typeof lang === 'string' ? lang : 'en';

  const [language, setLanguage] = useState<string>(initialLang);
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('all');
  
  // Fetch posts based on current filters
  useEffect(() => {
   
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        // Build query params
        const params = new URLSearchParams();
        params.set('page', pagination.page.toString());
        params.set('limit', pagination.limit.toString());
        
        if (search) params.set('search', search);
        if (language) params.set('language', language);
        if (category) params.set('category', category);
        if (status === 'published') params.set('published', 'true');
        if (status === 'draft') params.set('published', 'false');
        
        // Actually fetch from your API instead of using mock data
        const response = await fetch(`/api/admin/posts?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        setPosts(data.posts || []);
        setPagination(data.pagination || {
          ...pagination,
          totalCount: data.posts?.length || 0,
          totalPages: Math.max(1, Math.ceil((data.posts?.length || 0) / pagination.limit)),
        });
      } catch (err) {
        setError('Error loading posts: ' + (err instanceof Error ? err.message : 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [pagination, pagination.limit, search, language, category, status, lang]);

  // Handle pagination
  const handleChangePage = (newPage: number) => {
    setPagination({
      ...pagination,
      page: newPage,
    });
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination({
      ...pagination,
      page: 1, // Reset to first page on new search
    });
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Handle post deletion
  const handleDeletePost = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the post "${title}"? This action cannot be undone.`)) {
      return;
    }
    
    try {
      // Mock deletion - replace with actual API call
      // await fetch(`/api/admin/posts/${id}`, {
      //   method: 'DELETE',
      // });
      
      // Update UI
      setPosts(posts.filter(post => post.id !== id));
      
      // Show success message
      alert(`Post "${title}" deleted successfully!`);
    } catch (err) {
      setError('Error deleting post: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Button 
          onClick={() => router.push('/admin/posts/new')}
          className="bg-amber-600 hover:bg-amber-700 text-white"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>All Posts</CardTitle>
            
            <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search posts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button type="submit" variant="default">
                Search
              </Button>
            </form>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <Select
                value={language}
                onValueChange={(value) => {
                  setLanguage(value);
                  setPagination({ ...pagination, page: 1 });
                }}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(languageNames).map(([code, name]) => (
                    <SelectItem key={code} value={code}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select
                value={status}
                onValueChange={(value) => {
                  setStatus(value);
                  setPagination({ ...pagination, page: 1 });
                }}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select
                value={category || "all"}
                onValueChange={(value) => {
                  setCategory(value === "all" ? "" : value);
                  setPagination({ ...pagination, page: 1 });
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Savings & Investments">Savings & Investments</SelectItem>
                  <SelectItem value="Loans">Loans</SelectItem>
                  <SelectItem value="News">News</SelectItem>
                  <SelectItem value="Tips">Tips</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => {
                setSearch('');
                setCategory('');
                setStatus('all');
                setPagination({ ...pagination, page: 1 });
              }}
              className="ml-auto"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>
          
          {error && (
            <div className="my-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <RefreshCw className="h-6 w-6 animate-spin text-amber-600" />
              <span className="ml-2">Loading posts...</span>
            </div>
          ) : posts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left">Title</th>
                    <th className="px-4 py-3 text-left">Language</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr 
                      key={post.id} 
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                    >
                      <td className="px-4 py-3">
                        <div 
                          className="font-medium hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer" 
                          onClick={() => router.push(`/admin/posts/${post.id}`)}
                        >
                          {post.title}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline">
                          {languageNames[post.language as SupportedLanguage] || post.language}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        {post.category ? (
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                            {post.category}
                          </span>
                        ) : (
                          <span className="text-gray-400 dark:text-gray-600">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {post.published ? (
                          <Badge className="bg-green-500 hover:bg-green-600 text-white">
                            <Check className="mr-1 h-3 w-3" /> Published
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-amber-500 text-amber-500">
                            <CircleSlash className="mr-1 h-3 w-3" /> Draft
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(post.createdAt)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/admin/posts/${post.id}`)}>
                              <FileEdit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            
                            {post.published && (
                              <DropdownMenuItem asChild>
                                <Link href={`/blog/${post.slug}`} target="_blank">
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuItem 
                              onClick={() => handleDeletePost(post.id, post.title)}
                              className="text-red-600 hover:text-red-700 focus:text-red-700"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="text-amber-600 font-medium mb-2">No posts found</div>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {search || category || status !== 'all' 
                  ? 'Try adjusting your filters or search query' 
                  : 'Click "New Post" to create your first blog post'}
              </p>
              {(search || category || status !== 'all') && (
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearch('');
                    setCategory('');
                    setStatus('all');
                    setPagination({ ...pagination, page: 1 });
                  }}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset Filters
                </Button>
              )}
            </div>
          )}
          
          {/* Pagination controls */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {(pagination.page - 1) * pagination.limit + 1} - {
                  Math.min(pagination.page * pagination.limit, pagination.totalCount)
                } of {pagination.totalCount} posts
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleChangePage(pagination.page - 1)}
                  disabled={pagination.page === 1}
                >
                  Previous
                </Button>
                
                {Array.from(
                  { length: Math.min(5, pagination.totalPages) },
                  (_, i) => {
                    // For simplicity, show up to 5 page buttons
                    let pageNumber;
                    if (pagination.totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (pagination.page <= 3) {
                      pageNumber = i + 1;
                    } else if (pagination.page >= pagination.totalPages - 2) {
                      pageNumber = pagination.totalPages - 4 + i;
                    } else {
                      pageNumber = pagination.page - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNumber}
                        variant={pagination.page === pageNumber ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleChangePage(pageNumber)}
                      >
                        {pageNumber}
                      </Button>
                    );
                  }
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleChangePage(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}