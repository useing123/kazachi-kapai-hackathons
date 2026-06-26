"use client"

import { Search } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#555]" />
      <input
        type="text"
        placeholder="$ grep hackathons..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[#222] bg-[#0a0a0a] py-2.5 pl-10 pr-4 font-mono text-sm text-white placeholder-[#444] transition-colors focus:border-[#444] focus:outline-none"
      />
    </div>
  )
}
