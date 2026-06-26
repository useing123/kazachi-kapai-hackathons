import Link from "next/link"
import type { Sponsor } from "@/lib/types"

interface SponsorListProps {
  sponsors: Sponsor[]
}

export function SponsorList({ sponsors }: SponsorListProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {sponsors.map((sponsor) => (
        <Link
          key={sponsor.name}
          href={sponsor.url || "#"}
          target={sponsor.url ? "_blank" : undefined}
          rel={sponsor.url ? "noopener noreferrer" : undefined}
          className="border border-[#333] bg-[#0a0a0a] px-4 py-2 font-mono text-sm text-[#aaa] transition-colors hover:border-[#555] hover:text-white"
        >
          {sponsor.name}
        </Link>
      ))}
    </div>
  )
}
