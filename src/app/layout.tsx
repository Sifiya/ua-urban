import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { HeaderMenu } from "@/features/HeaderMenu";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Урбаністичний словник української мови",
  description: "Найкращі надбання інтернет культури для ваших послуг",
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
          <header className="min-h-12 p-2 border-b border-b-border">
            <HeaderMenu />
          </header>
          <main className="py-8 px-10 flex justify-center grow">
            <div className="max-w-[1000px] w-9/12">
              {children}
            </div>
          </main>
          <footer />
        </Providers>
      </body>
    </html>
  );
}
