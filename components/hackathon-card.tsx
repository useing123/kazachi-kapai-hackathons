import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
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
    ongoing: "border-white text-white bg-white/10",
    completed: "border-[#333] text-[#666]",
  }
  return (
    <Badge variant="outline" className={`font-mono text-xs ${styles[status] || ""}`}>
      {status === "ongoing" && "● "}{status}
    </Badge>
  )
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  const isActive = hackathon.status === "upcoming" || hackathon.status === "ongoing"

  return (
    <Link
      href={`/hackathons/${hackathon.slug}`}
      className={`group block border bg-[#0a0a0a] p-5 transition-all ${
        isActive
          ? "border-[#333] hover:border-white"
          : "border-[#222] hover:border-[#444] hover:bg-[#0f0f0f]"
      }`}
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

export function HackathonCardFeatured({ hackathon }: HackathonCardProps) {
  return (
    <Link
      href={`/hackathons/${hackathon.slug}`}
      className="group block border border-[#333] bg-[#0a0a0a] p-6 sm:p-8 transition-all hover:border-white"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex items-center gap-2">
            <StatusBadge status={hackathon.status} />
            {hackathon.deadline && (
              <span className="font-mono text-xs text-[#555]">
                deadline: {new Date(hackathon.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            )}
          </div>
          <h3 className="font-mono text-xl sm:text-2xl font-bold text-white group-hover:underline">
            {hackathon.name}
          </h3>
          <p className="mt-2 font-mono text-sm text-[#666]">
            {formatDate(hackathon.date)} · {hackathon.location} · {hackathon.mode}
          </p>
          <p className="mt-3 font-mono text-sm text-[#888]">
            {hackathon.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {hackathon.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-[#333] font-mono text-xs text-[#aaa]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 items-center">
          <span className="inline-flex items-center gap-2 border border-white bg-white px-5 py-2.5 font-mono text-sm font-bold text-black transition-colors group-hover:bg-transparent group-hover:text-white">
            apply <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
