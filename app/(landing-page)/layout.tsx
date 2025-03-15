import { Header } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}