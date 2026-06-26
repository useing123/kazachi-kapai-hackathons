"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Terminal } from "lucide-react"

export function Header() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "home" },
    { href: "/hackathons", label: "hackathons" },
    { href: "/archive", label: "archive" },
    { href: "/submit", label: "submit" },
  ]

  return (
    <header className="border-b border-[#222]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
          <Terminal className="h-5 w-5" />
          <span className="font-mono text-lg font-bold tracking-tight">kazachi-kapai</span>
        </Link>
        <nav className="flex items-center gap-1 font-mono text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 transition-colors ${
                pathname === link.href
                  ? "bg-white text-black"
                  : "text-[#888] hover:text-white hover:bg-[#111]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
