// app/admin/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ImageIcon, Users, Eye, Pencil, Globe, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

// Mock data for now (replace with actual data from database when ready)
const stats = {
  postsCount: 12,
  pagesCount: 5,
  mediaCount: 24,
  usersCount: 8,
  publishedPostsCount: 10,
  publishedPagesCount: 5,
  recentPosts: [
    { id: '1', title: 'Getting Started with Loopxo', author: 'Admin', createdAt: new Date().toISOString(), published: true },
    { id: '2', title: 'Best Practices for SEO', author: 'Admin', createdAt: new Date().toISOString(), published: true },
    { id: '3', title: 'Upcoming Features (Draft)', author: 'Admin', createdAt: new Date().toISOString(), published: false },
  ]
};

export default function AdminDashboard() {
  const statsCards = [
    {
      title: 'Blog Posts',
      value: stats.postsCount,
      description: `${stats.publishedPostsCount} published`,
      icon: FileText,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      link: '/admin/posts'
    },
    {
      title: 'Pages',
      value: stats.pagesCount,
      description: `${stats.publishedPagesCount} published`,
      icon: Globe,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      link: '/admin/pages'
    },
    {
      title: 'Media Files',
      value: stats.mediaCount,
      description: 'Images and documents',
      icon: ImageIcon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      link: '/admin/media'
    },
    {
      title: 'Users',
      value: stats.usersCount,
      description: 'Registered accounts',
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      link: '/admin/users'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <Link href={card.link} key={index}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.title}</p>
                    <p className="text-3xl font-bold">{card.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{card.description}</p>
                  </div>
                  <div className={`p-3 rounded-full ${card.bgColor}`}>
                    <card.icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{post.title}</p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>By {post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {post.published ? (
                      <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        <Eye className="mr-1 h-3 w-3" />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                        <Pencil className="mr-1 h-3 w-3" />
                        Draft
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <Link 
                href="/admin/posts" 
                className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
              >
                View all posts
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <Link href="/admin/posts/new">
                <Button variant="outline" className="w-full justify-start text-left">
                  <FileText className="mr-2 h-4 w-4 text-amber-500" />
                  Create new blog post
                </Button>
              </Link>
              <Link href="/admin/pages/new">
                <Button variant="outline" className="w-full justify-start text-left">
                  <Globe className="mr-2 h-4 w-4 text-emerald-500" />
                  Create new page
                </Button>
              </Link>
              <Link href="/admin/media">
                <Button variant="outline" className="w-full justify-start text-left">
                  <ImageIcon className="mr-2 h-4 w-4 text-blue-500" />
                  Upload media
                </Button>
              </Link>
              <Link href="/admin/settings/site">
                <Button variant="outline" className="w-full justify-start text-left">
                  Edit site settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Component for the button
function Button({ variant = "default", className, children, ...props }) {
  return (
    <button
      className={`
        ${variant === "default" ? "bg-amber-600 text-white hover:bg-amber-700" : ""}
        ${variant === "outline" ? "border border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800" : ""}
        px-4 py-2 rounded-md text-sm font-medium transition-colors
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}