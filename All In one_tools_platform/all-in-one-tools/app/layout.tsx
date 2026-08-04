import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { CommandMenu } from "@/components/shared/CommandMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MultiTool - The World's Largest Free AI + Utility Platform",
  description: "Premium enterprise-grade micro tools for global users.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-[#0f172a] text-slate-50 antialiased flex flex-col`}>
        <Navbar />
        <main className="flex-grow flex flex-col relative z-0">
          {children}
        </main>
        <CommandMenu />
      </body>
    </html>
  );
}