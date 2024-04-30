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
          <header className="p-2 border-b border-b-border">
            <HeaderMenu />
          </header>
          <main className="lg:py-8 lg:px-10 px-5 flex justify-center grow">
            <div className="max-w-[1000px] lg:w-9/12 w-full">
              {children}
            </div>
          </main>
          <footer />
        </Providers>
      </body>
    </html>
  );
}
