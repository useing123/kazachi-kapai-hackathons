"use client"

import { useState } from "react"
import { HackathonCard } from "@/components/hackathon-card"
import { HackathonTable } from "@/components/hackathon-table"
import { ViewToggle } from "@/components/view-toggle"
import { SearchBar } from "@/components/search-bar"
import { TagFilter } from "@/components/tag-filter"
import type { Hackathon } from "@/lib/types"

interface ArchiveClientProps {
  hackathons: Hackathon[]
  allTags: string[]
}

export function ArchiveClient({ hackathons, allTags }: ArchiveClientProps) {
  const [view, setView] = useState<"grid" | "table">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const filtered = hackathons.filter((h) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      const searchable = `${h.name} ${h.description} ${h.organizer} ${h.tags.join(" ")}`.toLowerCase()
      if (!searchable.includes(q)) return false
    }
    if (selectedTags.length > 0) {
      if (!selectedTags.some((t) => h.tags.includes(t))) return false
    }
    return true
  })

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div>
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <ViewToggle view={view} onChange={setView} />
        </div>
        <TagFilter tags={allTags} selected={selectedTags} onToggle={toggleTag} />
      </div>

      <div className="font-mono text-sm text-[#555] mb-4">
        $ find archive — {filtered.length} result{filtered.length !== 1 ? "s" : ""}
      </div>

      {filtered.length === 0 ? (
        <div className="border border-[#222] bg-[#0a0a0a] p-12 text-center font-mono text-[#555]">
          no completed hackathons found
        </div>
      ) : view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((h) => (
            <HackathonCard key={h.slug} hackathon={h} />
          ))}
        </div>
      ) : (
        <HackathonTable hackathons={filtered} />
      )}
    </div>
  )
}
