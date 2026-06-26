import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Hackathon } from "@/lib/types"

interface HackathonCardProps {
  hackathon: Hackathon
}

function formatDate(dateStr: string): string {
  const parts = dateStr.split("/")
  const start = new Date(parts[0])
  if (parts.length > 1) {
    const end = new Date(parts[1])
    return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
  }
  return start.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    upcoming: "border-[#444] text-white",
    ongoing: "border-white text-white",
    completed: "border-[#333] text-[#666]",
  }
  return (
    <Badge variant="outline" className={`font-mono text-xs ${styles[status] || ""}`}>
      {status === "ongoing" && "● "}{status}
    </Badge>
  )
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  return (
    <Link
      href={`/hackathons/${hackathon.slug}`}
      className="group block border border-[#222] bg-[#0a0a0a] p-5 transition-all hover:border-[#444] hover:bg-[#0f0f0f]"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-mono text-base font-bold text-white group-hover:underline">
          {hackathon.name}
        </h3>
        <StatusBadge status={hackathon.status} />
      </div>
      <p className="mt-2 font-mono text-sm text-[#666]">
        {formatDate(hackathon.date)} · {hackathon.location}
      </p>
      <p className="mt-2 line-clamp-2 font-mono text-sm text-[#888]">
        {hackathon.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {hackathon.tags.slice(0, 4).map((tag) => (
          <Badge key={tag} variant="outline" className="border-[#333] font-mono text-xs text-[#aaa]">
            {tag}
          </Badge>
        ))}
      </div>
      {hackathon.winners && hackathon.winners.length > 0 && (
        <div className="mt-3 border-t border-[#222] pt-3">
          <p className="font-mono text-xs text-[#555]">
            🥇 {hackathon.winners[0]?.project}
          </p>
        </div>
      )}
    </Link>
  )
}
