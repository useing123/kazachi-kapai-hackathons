import Link from "next/link"
import type { Winner } from "@/lib/types"

interface WinnerCardProps {
  winner: Winner
}

const placeLabels: Record<number, string> = {
  1: "🥇 1st",
  2: "🥈 2nd",
  3: "🥉 3rd",
}

export function WinnerCard({ winner }: WinnerCardProps) {
  return (
    <div className="flex items-center gap-4 border border-[#222] bg-[#0a0a0a] p-4">
      <span className="font-mono text-sm font-bold text-[#555]">
        {placeLabels[winner.place] || `${winner.place}th`}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-mono text-sm font-bold text-white">
          {winner.project}
        </p>
        <p className="truncate font-mono text-xs text-[#666]">
          {winner.team}
        </p>
      </div>
      {winner.url && (
        <Link
          href={winner.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 font-mono text-xs text-[#555] underline hover:text-white transition-colors"
        >
          ↗
        </Link>
      )}
    </div>
  )
}
