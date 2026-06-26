import type { Metadata } from "next";
import { Geist_Mono, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";

const geistMonoHeading = Geist_Mono({subsets:['latin'],variable:'--font-heading'});

const nunitoSans = Nunito_Sans({subsets:['latin'],variable:'--font-sans'});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kazachi Kapai — Hackathon Aggregator",
  description: "Open-source directory of hackathons. Add yours via pull request.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", geistMono.variable, "font-sans", nunitoSans.variable, geistMonoHeading.variable)}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[#222] py-6 text-center text-sm text-[#666]">
          <div className="mx-auto max-w-6xl px-4">
            <p className="font-mono">
              <span className="text-white">$</span> kazachi-kapai — open source hackathon aggregator
            </p>
            <p className="mt-1 text-[#444]">
              add your hackathon via <a href="https://github.com/useing123/kazachi-kapai-hackathons/pulls" className="underline hover:text-white transition-colors">pull request</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
