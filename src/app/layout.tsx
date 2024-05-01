import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { HeaderMenu } from '@/features/HeaderMenu';
import { Providers } from '@/components/Providers';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LinkBanner } from '@/features/HeaderMenu/LinkBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Урбаністичний словник української мови',
  description: 'Найкращі надбання інтернет культури для ваших послуг',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header className="p-2 border-b border-b-border">
            <HeaderMenu />
          </header>
          <LinkBanner />
          <main className="lg:py-8 py-5 lg:px-10 px-5 flex justify-center grow">
            <div className="max-w-[1000px] lg:w-9/12 w-full">
              {children}
            </div>
          </main>
          <footer className="border-t border-t-border p-2 pb-4">
            <div className="flex sm:flex-row flex-col items-center justify-center mb-3">
              <h4 className="font-semibold">Правова інформація:</h4>
              <Link href="/terms" passHref legacyBehavior>
                <Button variant="link">Умови користування</Button>
              </Link>
              <Link href="/privacy" passHref legacyBehavior>
                <Button variant="link">Політика конфіденційності</Button>
              </Link>
            </div>
            <div className="w-full text-center text-sm">© UA Urban, 2024</div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
