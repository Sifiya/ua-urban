import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        <header className="h-12 bg-card" />
        <main className="py-8 px-10 flex justify-center grow">
          <div className="max-w-[1000px] w-9/12">
            {children}
          </div>
        </main>
        <footer />
      </body>
    </html>
  );
}
