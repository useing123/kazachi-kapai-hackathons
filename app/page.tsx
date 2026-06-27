import Link from "next/link"
import { Terminal, ArrowRight, GitPullRequest } from "lucide-react"
import { getAllHackathons } from "@/lib/hackathons"
import { HackathonCardFeatured } from "@/components/hackathon-card"

export default function HomePage() {
  const allHackathons = getAllHackathons()
  const upcoming = allHackathons.filter((h) => h.status === "upcoming" || h.status === "ongoing")

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      {/* Hero */}
      <section className="mb-12 sm:mb-16">
        <div className="mb-6 sm:mb-8 flex items-center gap-3">
          <Terminal className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          <h1 className="font-mono text-2xl sm:text-4xl font-bold tracking-tight text-white hacker-glow">
            kazachi-kapai
          </h1>
        </div>
        <p className="max-w-2xl font-mono text-base sm:text-lg text-[#888]">
          open-source hackathon aggregator.
          <br />
          <span className="text-[#555]">$</span> find the next hackathon to conquer.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="/hackathons"
            className="inline-flex items-center justify-center gap-2 border border-white bg-white px-4 py-2 font-mono text-sm text-black transition-colors hover:bg-transparent hover:text-white"
          >
            browse all hackathons <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/submit"
            className="inline-flex items-center justify-center gap-2 border border-[#333] px-4 py-2 font-mono text-sm text-[#888] transition-colors hover:border-white hover:text-white"
          >
            <GitPullRequest className="h-4 w-4" />
            submit yours
          </Link>
        </div>
      </section>

      {/* Upcoming Hackathons */}
      <section className="mb-12 sm:mb-16">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-white">$</span>
            <span className="font-mono text-sm text-white">open for participation</span>
          </div>
          <Link href="/hackathons" className="font-mono text-xs text-[#555] hover:text-white transition-colors">
            view all →
          </Link>
        </div>
        {upcoming.length === 0 ? (
          <div className="border border-[#222] bg-[#0a0a0a] p-8 sm:p-12 text-center font-mono text-[#555]">
            no upcoming hackathons — submit one via PR
          </div>
        ) : (
          <div className="space-y-4">
            {upcoming.map((h) => (
              <HackathonCardFeatured key={h.slug} hackathon={h} />
            ))}
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="border border-[#222] bg-[#0a0a0a] p-6 sm:p-8">
        <h2 className="mb-4 font-mono text-sm font-bold text-white">$ how it works</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <span className="font-mono text-xs text-[#555]">01</span>
            <p className="mt-1 font-mono text-sm text-white">fork the repo</p>
            <p className="mt-1 font-mono text-xs text-[#666]">clone it locally</p>
          </div>
          <div>
            <span className="font-mono text-xs text-[#555]">02</span>
            <p className="mt-1 font-mono text-sm text-white">add your hackathon</p>
            <p className="mt-1 font-mono text-xs text-[#666]">create a .md file in data/hackathons/</p>
          </div>
          <div>
            <span className="font-mono text-xs text-[#555]">03</span>
            <p className="mt-1 font-mono text-sm text-white">open a PR</p>
            <p className="mt-1 font-mono text-xs text-[#666]">we review and merge</p>
          </div>
        </div>
      </section>
    </div>
  )
}
