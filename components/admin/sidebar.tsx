// components/admin/sidebar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
  LayoutDashboard,
  FileText,
  ImageIcon,
  Settings,
  Users,
  Globe,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

interface SubItem {
  label: string;
  path: string;
}

interface MenuItem {
  title: string;
  icon: React.ElementType;
  path?: string;
  subItems?: SubItem[];
}

export function AdminSidebar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize open submenu based on current path
  useEffect(() => {
    const checkForMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };
    
    checkForMobile();
    window.addEventListener('resize', checkForMobile);

    // Set open submenu based on current path
    menuItems.forEach(item => {
      if (item.subItems && item.subItems.some(subItem => pathname === subItem.path)) {
        setOpenSubmenu(item.title);
      }
    });

    return () => window.removeEventListener('resize', checkForMobile);
  }, [pathname]);

  const handleSidebarToggle = () => setIsSidebarOpen(!isSidebarOpen);
  const handleSubmenuToggle = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const menuItems: MenuItem[] = [
    { 
      title: "Dashboard", 
      icon: LayoutDashboard, 
      path: "/admin/dashboard" 
    },
    {
      title: "Content Management",
      icon: FileText,
      subItems: [
        { label: "Blog Posts", path: "/admin/posts" },
        { label: "Add New Post", path: "/admin/posts/new" },
        { label: "Categories", path: "/admin/categories" },
      ],
    },
    {
      title: "Media Library",
      icon: ImageIcon,
      path: "/admin/upload",
    },
    {
      title: "Settings",
      icon: Settings,
      subItems: [
        { label: "Site Settings", path: "/admin/settings/site" },
        { label: "GitHub Integration", path: "/admin/settings/github" },
      ],
    },
    {
      title: "Users",
      icon: Users,
      path: "/admin/users",
    }
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  const isSubActive = (subItems: SubItem[]) => {
    return subItems.some(item => pathname === item.path);
  };

  // Close sidebar when clicking a link on mobile
  const handleMobileLinkClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={handleSidebarToggle}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-md bg-white dark:bg-gray-800 shadow-md"
      >
        {isSidebarOpen ? (
          <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        ) : (
          <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        )}
      </button>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={handleSidebarToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 z-30 h-full transition-all duration-300 ease-in-out",
          "bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700",
          "flex flex-col",
          isSidebarOpen ? "w-64" : "w-0 md:w-20",
          isMobile && !isSidebarOpen && "translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="relative h-8 w-8">
            {/* Fallback if logo.png doesn't exist */}
            <div className="h-8 w-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
          {isSidebarOpen && (
            <div className="ml-3 overflow-hidden">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Admin Panel</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 block">Blog Management</span>
            </div>
          )}
        </div>

        {/* Desktop Toggle Button */}
        <button
          onClick={handleSidebarToggle}
          className="w-8 h-8 mx-auto mt-4 hidden md:flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
        >
          {isSidebarOpen ? (
            <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <Menu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>

        {/* Navigation */}
        <nav className="mt-4 flex-1 overflow-y-auto">
          <ul className="px-3 space-y-1">
            {menuItems.map((item) => (
              <li key={item.title} className="relative">
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => handleSubmenuToggle(item.title)}
                      className={cn(
                        "flex items-center justify-between w-full",
                        "px-3 py-2 text-sm font-medium rounded-md",
                        "transition-colors duration-200",
                        isSubActive(item.subItems)
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      )}
                    >
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 min-w-5" />
                        {isSidebarOpen && <span className="ml-2">{item.title}</span>}
                      </div>
                      {isSidebarOpen && (
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openSubmenu === item.title ? "rotate-90" : ""
                          )}
                        />
                      )}
                    </button>
                    
                    {(openSubmenu === item.title && isSidebarOpen) && (
                      <ul className="ml-4 pl-2 mt-1 border-l border-gray-200 dark:border-gray-700">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.label}>
                            <Link
                              href={subItem.path}
                              className={cn(
                                "block px-3 py-2 text-sm rounded-md",
                                isActive(subItem.path)
                                  ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                                  : "text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                              )}
                              onClick={handleMobileLinkClick}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.path!}
                    className={cn(
                      "flex items-center",
                      "px-3 py-2 text-sm font-medium rounded-md",
                      "transition-colors duration-200",
                      isActive(item.path!)
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                    onClick={handleMobileLinkClick}
                  >
                    <item.icon className="h-5 w-5 min-w-5" />
                    {isSidebarOpen && <span className="ml-2">{item.title}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/"
            target="_blank"
            className={cn(
              "flex items-center text-sm text-gray-600 dark:text-gray-400",
              "hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            )}
            onClick={handleMobileLinkClick}
          >
            <Globe className="h-4 w-4" />
            {isSidebarOpen && <span className="ml-2">View Website</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}