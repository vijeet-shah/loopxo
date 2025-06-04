import React from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Admin specific header could go here if needed */}
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      {/* Admin specific footer could go here if needed */}
    </div>
  );
}