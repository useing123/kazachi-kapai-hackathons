"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Hackathon } from "@/lib/types"

interface HackathonTableProps {
  hackathons: Hackathon[]
}

function formatDate(dateStr: string): string {
  const start = new Date(dateStr.split("/")[0])
  return start.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export function HackathonTable({ hackathons }: HackathonTableProps) {
  return (
    <div className="overflow-x-auto border border-[#222]">
      <table className="w-full font-mono text-sm">
        <thead>
          <tr className="border-b border-[#222] bg-[#0a0a0a]">
            <th className="px-4 py-3 text-left text-[#666]">name</th>
            <th className="px-4 py-3 text-left text-[#666]">date</th>
            <th className="px-4 py-3 text-left text-[#666]">location</th>
            <th className="px-4 py-3 text-left text-[#666]">participants</th>
            <th className="px-4 py-3 text-left text-[#666]">top winner</th>
            <th className="px-4 py-3 text-left text-[#666]">tags</th>
          </tr>
        </thead>
        <tbody>
          {hackathons.map((h) => (
            <tr
              key={h.slug}
              className="border-b border-[#1a1a1a] transition-colors hover:bg-[#0a0a0a]"
            >
              <td className="px-4 py-3">
                <Link
                  href={`/hackathons/${h.slug}`}
                  className="font-bold text-white hover:underline"
                >
                  {h.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-[#888]">{formatDate(h.date)}</td>
              <td className="px-4 py-3 text-[#888]">{h.location}</td>
              <td className="px-4 py-3 text-[#888]">{h.totalParticipants || "—"}</td>
              <td className="px-4 py-3 text-[#888]">
                {h.winners && h.winners.length > 0 ? h.winners[0].project : "—"}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {h.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="border-[#333] font-mono text-xs text-[#888]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
