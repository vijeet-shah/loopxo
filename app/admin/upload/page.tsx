"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Trash2, 
  Copy, 
  Check,
  ExternalLink,
  UploadCloud,
  ImageIcon,
  Loader2
} from 'lucide-react';
import { CldImage } from 'next-cloudinary';

interface UploadedImage {
  id: string;
  url: string;
  publicId: string;
  category: string;
  name: string;
  createdAt: string;
}

export default function MediaPage() {
  const router = useRouter();
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState('');
  const [category, setCategory] = useState('general');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch media items from API
    const fetchMedia = async () => {
      try {
        const response = await fetch('/api/admin/media');
        
        if (!response.ok) {
          throw new Error('Failed to fetch media');
        }
        
        const data = await response.json();
        setImages(data);
        setLoading(false);
      } catch (err) {
        setError('Error loading media: ' + (err instanceof Error ? err.message : 'Unknown error'));
        setLoading(false);
      }
    };
    
    fetchMedia();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
      setImageName(e.target.files[0].name.split('.')[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');
    formData.append('name', imageName);
    formData.append('category', category);

    try {
      // First upload to Cloudinary
      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!cloudinaryResponse.ok) {
        throw new Error('Upload to Cloudinary failed');
      }

      const cloudinaryData = await cloudinaryResponse.json();
      
      // Then save to our database
      const dbResponse = await fetch('/api/admin/media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: imageName,
          url: cloudinaryData.secure_url,
          publicId: cloudinaryData.public_id,
          category,
        }),
      });
      
      if (!dbResponse.ok) {
        throw new Error('Failed to save to database');
      }
      
      const newImage = await dbResponse.json();
      
      // Update the UI
      setImages([newImage, ...images]);
      
      // Reset form
      setFile(null);
      setPreview(null);
      setImageName('');
      setError(null);
      
      // Show success message or notification
      
    } catch (err) {
      setError('Upload failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`/api/admin/media/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete media');
      }
      
      // Remove from state
      setImages(images.filter(img => img.id !== id));
      
    } catch (err) {
      setError('Error deleting image: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const categories = ['all', 'general', 'blog', 'products', 'banners'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Media Library</h1>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Card className="border border-gray-200 dark:border-gray-700 shadow-md">
        <CardContent className="p-6">
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" className="text-gray-700 dark:text-gray-300">Category</Label>
                <select 
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Image Name</Label>
                <Input
                  id="name"
                  value={imageName}
                  onChange={(e) => setImageName(e.target.value)}
                  required
                  className="border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="file" className="text-gray-700 dark:text-gray-300">Choose Image</Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="border-gray-300 dark:border-gray-600"
                />
              </div>

              {preview && (
                <div className="relative h-32 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 border border-amber-200 dark:border-amber-800">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-gray-900 text-white shadow-lg transition-all hover:-translate-y-0.5"
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <UploadCloud className="mr-2 h-4 w-4" />
                  Upload Image
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-bold text-amber-800 dark:text-amber-400">Image Gallery</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <Button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                variant={selectedCategory === cat ? "default" : "outline"}
                className={selectedCategory === cat 
                  ? "bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-gray-900 text-white" 
                  : "border-amber-600 text-amber-600 hover:bg-amber-50 dark:border-amber-500 dark:text-amber-400 dark:hover:bg-gray-800"}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.length > 0 ? (
            filteredImages.map((image) => (
              <Card key={image.id} className="border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 border border-amber-100 dark:border-amber-900/50">
                    {image.publicId ? (
                      <CldImage
                      width="400"
                      height="300"
                      src={image.publicId}
                      alt={image.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{image.name}</h3>
                      <p className="text-sm text-amber-600 dark:text-amber-400">{image.category}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(image.id)}
                      className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Input
                      value={image.url}
                      readOnly
                      className="text-sm border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
                    />
                    <Button
                      onClick={() => copyToClipboard(image.url, image.id)}
                      variant="outline"
                      size="icon"
                      className="border-amber-300 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-gray-800"
                    >
                      {copiedId === image.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      )}
                    </Button>
                    <Button
                      onClick={() => window.open(image.url, '_blank')}
                      variant="outline"
                      size="icon"
                      className="border-amber-300 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-gray-800"
                    >
                      <ExternalLink className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 px-4 bg-amber-50 dark:bg-gray-800 rounded-xl border border-amber-100 dark:border-gray-700">
            <ImageIcon className="h-10 w-10 mx-auto text-amber-500 mb-3" />
            <p className="text-amber-700 dark:text-amber-400 font-medium">No images found in this category</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Upload an image by using the form above</p>
          </div>
        )}
      </div>
    </div>
  </div>
);
}