// components/admin/blog/TranslationManager.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Globe, AlertCircle, Edit, Eye, PlusCircle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { SupportedLanguage } from '@/lib/i18n/types';
import Link from 'next/link';
import { languageNames } from '@/lib/i18n/dictionary';

interface TranslationManagerProps {
  postId: string;
  postSlug: string;
  defaultLanguage?: SupportedLanguage;
}

interface Translation {
  language: SupportedLanguage;
  slug: string;
  title: string;
  status: 'published' | 'draft' | 'none';
  lastUpdated: string;
}

export function TranslationManager({ postId, postSlug, defaultLanguage = 'en' }: TranslationManagerProps) {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Define supportedLanguages outside of the component render
  // to avoid recreating it on each render
  const supportedLanguages = Object.keys(languageNames) as SupportedLanguage[];
  
  // Use useCallback to memoize the fetch function
  const fetchTranslations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/admin/posts/${postId}/translations`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch translations');
      }
      
      const data = await response.json();
      
      // Process translations data
      const translationList: Translation[] = [];
      
      // Add default language
      translationList.push({
        language: defaultLanguage,
        slug: postSlug,
        title: data.title || '',
        status: data.published ? 'published' : 'draft',
        lastUpdated: data.updatedAt || data.createdAt || new Date().toISOString(),
      });
      
      // Add translations from other languages
      if (data.translations) {
        for (const lang of supportedLanguages) {
          if (lang !== defaultLanguage) {
            const translation = data.translations[lang];
            
            if (translation) {
              translationList.push({
                language: lang,
                slug: translation.slug || '',
                title: translation.title || '',
                status: translation.published ? 'published' : 'draft',
                lastUpdated: translation.updatedAt || translation.createdAt || new Date().toISOString(),
              });
            } else {
              translationList.push({
                language: lang,
                slug: '',
                title: '',
                status: 'none',
                lastUpdated: '',
              });
            }
          }
        }
      }
      
      setTranslations(translationList);
    } catch (err) {
      setError('Error loading translations: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [postId, postSlug, defaultLanguage,supportedLanguages]); // Remove supportedLanguages from deps

  // Fetch translations only once on component mount
  useEffect(() => {
    fetchTranslations();
  }, [fetchTranslations]);

  // Format date to a readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case 'published':
        return (
          <Badge variant="default" className="bg-green-500">
            <CheckCircle className="mr-1 h-3 w-3" /> Published
          </Badge>
        );
      case 'draft':
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            <Edit className="mr-1 h-3 w-3" /> Draft
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="border-gray-300 text-gray-500">
            <XCircle className="mr-1 h-3 w-3" /> Not Translated
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Globe className="mr-2 h-5 w-5" />
          Translation Management
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchTranslations}
          disabled={loading}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {loading ? (
          <div className="text-center py-4">Loading translations...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Language</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {translations.map((translation) => (
                <TableRow key={translation.language}>
                  <TableCell className="font-medium">
                    {languageNames[translation.language] || translation.language}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {translation.title || <span className="text-gray-400 italic">No title</span>}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={translation.status} />
                  </TableCell>
                  <TableCell>
                    {formatDate(translation.lastUpdated)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {translation.status !== 'none' ? (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            asChild
                          >
                            <Link href={`/admin/posts/${postId}/edit?lang=${translation.language}`}>
                              <Edit className="mr-1 h-4 w-4" />
                              Edit
                            </Link>
                          </Button>
                          
                          {translation.status === 'published' && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              asChild
                            >
                              <Link href={`/blog/${translation.slug}`} target="_blank">
                                <Eye className="mr-1 h-4 w-4" />
                                View
                              </Link>
                            </Button>
                          )}
                        </>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          asChild
                        >
                          <Link href={`/admin/posts/${postId}/translate?lang=${translation.language}`}>
                            <PlusCircle className="mr-1 h-4 w-4" />
                            Add Translation
                          </Link>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}