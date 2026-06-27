"use client"

import { useState, useMemo } from "react"
import { HackathonCard } from "./hackathon-card"
import { SearchBar } from "./search-bar"
import { TagFilter } from "./tag-filter"
import { StatusFilter } from "./status-filter"
import type { Hackathon, HackathonStatus } from "@/lib/types"

interface HackathonListProps {
  hackathons: Hackathon[]
  allTags: string[]
  showFilters?: boolean
}

export function HackathonList({ hackathons, allTags, showFilters = true }: HackathonListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<HackathonStatus | "all">("all")

  const filtered = useMemo(() => {
    return hackathons.filter((h) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const searchable = `${h.name} ${h.description} ${h.organizer} ${h.tags.join(" ")}`.toLowerCase()
        if (!searchable.includes(q)) return false
      }
      if (selectedTags.length > 0) {
        if (!selectedTags.some((t) => h.tags.includes(t))) return false
      }
      if (selectedStatus !== "all" && h.status !== selectedStatus) return false
      return true
    })
  }, [hackathons, searchQuery, selectedTags, selectedStatus])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div>
      {showFilters && (
        <div className="mb-8 space-y-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <StatusFilter value={selectedStatus} onChange={setSelectedStatus} />
            <TagFilter tags={allTags} selected={selectedTags} onToggle={toggleTag} />
          </div>
        </div>
      )}
      <div className="font-mono text-sm text-[#555] mb-4">
        $ find hackathons — {filtered.length} result{filtered.length !== 1 ? "s" : ""}
      </div>
      {filtered.length === 0 ? (
        <div className="border border-[#222] bg-[#0a0a0a] p-8 sm:p-12 text-center font-mono text-[#555]">
          no hackathons found
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((h) => (
            <HackathonCard key={h.slug} hackathon={h} />
          ))}
        </div>
      )}
    </div>
  )
}
