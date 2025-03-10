// app/admin/layout.tsx
import { cookies } from 'next/headers';
import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminHeader } from '@/components/admin/header';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if this is the login page by the URL pathname
  // We can't check the pathname server-side easily, so we'll use a different approach
  
  try {
    // Check authentication
    const cookieStore = cookies();
    const adminToken = cookieStore.get('adminToken');
    
    if (!adminToken || adminToken.value !== 'true') {
      redirect('/admin/dashboard');
    }
    
    // If we're here, user is authenticated - show admin layout
    return (
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <AdminSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    );
  } catch (error) {
    // If there's an error accessing cookies, redirect to login
    console.error('Error in admin layout:', error);
    redirect('/login');
  }
}