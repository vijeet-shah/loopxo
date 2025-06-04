
import { Footer } from '@/components/footer';
import { Header } from '@/components/layout/navbar';



import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
  );
}