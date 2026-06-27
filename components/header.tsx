"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Terminal, Menu, X } from "lucide-react"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { href: "/", label: "home" },
    { href: "/hackathons", label: "hackathons" },
    { href: "/archive", label: "archive" },
    { href: "/submit", label: "submit" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#222] bg-black md:static md:bg-transparent">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
          <Terminal className="h-5 w-5" />
          <span className="font-mono text-lg font-bold tracking-tight">kazachi-kapai</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 font-mono text-sm md:flex">
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

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-[#888] hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-[#222] px-4 py-3 font-mono text-sm md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 transition-colors ${
                pathname === link.href
                  ? "bg-white text-black px-2"
                  : "text-[#888] hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
