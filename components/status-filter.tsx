"use client"

import type { HackathonStatus } from "@/lib/types"

interface StatusFilterProps {
  value: HackathonStatus | "all"
  onChange: (value: HackathonStatus | "all") => void
}

const statuses: { value: HackathonStatus | "all"; label: string }[] = [
  { value: "all", label: "all" },
  { value: "upcoming", label: "upcoming" },
  { value: "ongoing", label: "ongoing" },
  { value: "completed", label: "completed" },
]

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div className="flex items-center gap-1 font-mono text-sm">
      <span className="text-[#555]">status:</span>
      {statuses.map((s) => (
        <button
          key={s.value}
          onClick={() => onChange(s.value)}
          className={`px-2 py-1 transition-colors ${
            value === s.value
              ? "bg-white text-black"
              : "text-[#666] hover:text-white"
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}
