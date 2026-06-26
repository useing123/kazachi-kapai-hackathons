"use client"

import { Badge } from "@/components/ui/badge"

interface TagFilterProps {
  tags: string[]
  selected: string[]
  onToggle: (tag: string) => void
}

export function TagFilter({ tags, selected, onToggle }: TagFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {tags.map((tag) => (
        <button key={tag} onClick={() => onToggle(tag)}>
          <Badge
            variant="outline"
            className={`cursor-pointer font-mono text-xs transition-colors ${
              selected.includes(tag)
                ? "border-white bg-white text-black"
                : "border-[#333] text-[#888] hover:border-[#555] hover:text-white"
            }`}
          >
            {tag}
          </Badge>
        </button>
      ))}
    </div>
  )
}
