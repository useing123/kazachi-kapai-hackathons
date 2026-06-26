"use client"

import { Grid3x3, List } from "lucide-react"

interface ViewToggleProps {
  view: "grid" | "table"
  onChange: (view: "grid" | "table") => void
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center border border-[#222]">
      <button
        onClick={() => onChange("grid")}
        className={`p-2 transition-colors ${
          view === "grid" ? "bg-white text-black" : "text-[#555] hover:text-white"
        }`}
      >
        <Grid3x3 className="h-4 w-4" />
      </button>
      <button
        onClick={() => onChange("table")}
        className={`p-2 transition-colors ${
          view === "table" ? "bg-white text-black" : "text-[#555] hover:text-white"
        }`}
      >
        <List className="h-4 w-4" />
      </button>
    </div>
  )
}
