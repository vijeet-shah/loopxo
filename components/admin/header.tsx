// components/admin/header.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Bell, User, LogOut, Moon, Sun, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import Cookies from 'js-cookie';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [notifications] = useState<string[]>([]);

  // Extract page title from pathname
  const getPageTitle = () => {
    const path = pathname.split('/').filter(Boolean);
    if (path.length === 1 && path[0] === 'admin') return 'Dashboard';
    
    // Get the last segment of the path and capitalize it
    const lastSegment = path[path.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, ' ');
  };

  const handleSignOut = () => {
    Cookies.remove('adminToken');
    router.push('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 sticky top-0 z-10">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          {getPageTitle()}
        </h1>
        
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.length > 0 ? (
                notifications.map((notification, i) => (
                  <DropdownMenuItem key={i} className="cursor-pointer">
                    {notification}
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem>No new notifications</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span className="hidden md:block text-sm font-medium">
                  Admin
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="cursor-pointer text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}