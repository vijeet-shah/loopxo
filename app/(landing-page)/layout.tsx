
import { Header } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';



export default function RootLayout({ children }) {
  return (
    <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
  );
}