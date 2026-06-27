import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kazachi Kapai — Hackathon Aggregator",
  description: "Open-source directory of hackathons. Add yours via pull request.",
};

const cleanupScript = `
(function(){
  try {
    var body = document.body;
    if (body) {
      var known = ['bis_skin_checked','bis_register','__processed_'];
      for (var i = 0; i < body.attributes.length; ) {
        var attr = body.attributes[i];
        if (known.some(function(k){ return attr.name.indexOf(k) === 0; })) {
          body.removeAttribute(attr.name);
        } else {
          i++;
        }
      }
    }
  } catch(e) {}
})();
`.trim();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistMono.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: cleanupScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 pt-16 md:pt-0">{children}</main>
        <footer className="border-t border-[#222] py-6 text-center text-sm text-[#666]">
          <div className="mx-auto max-w-6xl px-4">
            <p className="font-mono">
              <span className="text-white">$</span> kazachi-kapai — open source hackathon aggregator
            </p>
            <div className="mt-2 flex items-center justify-center gap-4 font-mono text-xs text-[#444]">
              <a href="https://github.com/useing123/kazachi-kapai-hackathons" className="hover:text-white transition-colors">github</a>
              <span>·</span>
              <a href="/manifesto" className="hover:text-white transition-colors">manifesto</a>
              <span>·</span>
              <a href="/submit" className="hover:text-white transition-colors">submit</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
