import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Calendar, MapPin, Users } from "lucide-react"
import { getAllHackathonSlugs, getHackathonBySlug, renderMarkdown } from "@/lib/hackathons"
import { Badge } from "@/components/ui/badge"
import { WinnerCard } from "@/components/winner-card"
import { SponsorList } from "@/components/sponsor-list"
import { StatsBar } from "@/components/stats-bar"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllHackathonSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const hackathon = getHackathonBySlug(slug)
  if (!hackathon) return { title: "Not Found" }
  return {
    title: `${hackathon.name} — Kazachi Kapai`,
    description: hackathon.description,
  }
}

function formatDate(dateStr: string): string {
  const parts = dateStr.split("/")
  const start = new Date(parts[0])
  if (parts.length > 1) {
    const end = new Date(parts[1])
    return `${start.toLocaleDateString("en-US", { month: "long", day: "numeric" })} - ${end.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
  }
  return start.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

export default async function HackathonDetailPage({ params }: PageProps) {
  const { slug } = await params
  const hackathon = getHackathonBySlug(slug)
  if (!hackathon) notFound()

  const htmlContent = await renderMarkdown(hackathon.content)

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/hackathons"
        className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-[#666] hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        back
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge
              variant="outline"
              className={`mb-3 font-mono text-xs ${
                hackathon.status === "completed"
                  ? "border-[#333] text-[#666]"
                  : hackathon.status === "ongoing"
                  ? "border-white text-white"
                  : "border-[#444] text-[#aaa]"
              }`}
            >
              {hackathon.status === "ongoing" && "● "}{hackathon.status}
            </Badge>
            <h1 className="font-mono text-3xl font-bold text-white">
              {hackathon.name}
            </h1>
          </div>
          <Link
            href={hackathon.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1 border border-[#333] px-3 py-1.5 font-mono text-sm text-[#888] transition-colors hover:border-white hover:text-white"
          >
            visit <ExternalLink className="h-3 w-3" />
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-sm text-[#888]">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {formatDate(hackathon.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {hackathon.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            {hackathon.mode}
          </span>
        </div>

        <p className="mt-4 font-mono text-[#888]">
          {hackathon.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {hackathon.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="border-[#333] font-mono text-xs text-[#888]">
              {tag}
            </Badge>
          ))}
        </div>

        <StatsBar
          totalParticipants={hackathon.totalParticipants}
          totalProjects={hackathon.totalProjects}
        />
      </div>

      {/* Winners */}
      {hackathon.winners && hackathon.winners.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 font-mono text-sm text-[#555]">$ winners</h2>
          <div className="space-y-2">
            {hackathon.winners.map((winner) => (
              <WinnerCard key={winner.place} winner={winner} />
            ))}
          </div>
        </section>
      )}

      {/* Sponsors */}
      {hackathon.sponsors && hackathon.sponsors.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 font-mono text-sm text-[#555]">$ sponsors</h2>
          <SponsorList sponsors={hackathon.sponsors} />
        </section>
      )}

      {/* Content */}
      <section className="border-t border-[#222] pt-8">
        <div
          className="prose prose-invert max-w-none font-mono text-sm text-[#aaa] prose-headings:text-white prose-headings:font-bold prose-a:text-white prose-strong:text-white prose-code:text-[#ccc] prose-pre:border prose-pre:border-[#222] prose-pre:bg-[#0a0a0a]"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </section>
    </div>
  )
}
