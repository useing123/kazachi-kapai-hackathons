import Link from "next/link"
import { Terminal, ArrowRight } from "lucide-react"
import { getAllHackathons, getAllTags } from "@/lib/hackathons"
import { HackathonList } from "@/components/hackathon-list"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const allHackathons = getAllHackathons()
  const allTags = getAllTags()
  const featured = allHackathons.filter((h) => h.featured)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero */}
      <section className="mb-16">
        <div className="mb-8 flex items-center gap-3">
          <Terminal className="h-8 w-8 text-white" />
          <h1 className="font-mono text-4xl font-bold tracking-tight text-white hacker-glow">
            kazachi-kapai
          </h1>
        </div>
        <p className="max-w-2xl font-mono text-lg text-[#888]">
          open-source hackathon aggregator.
          <br />
          <span className="text-[#555]">$</span> find the next hackathon to conquer.
        </p>
        <div className="mt-6 flex items-center gap-4">
          <Link
            href="/hackathons"
            className="inline-flex items-center gap-2 border border-white bg-white px-4 py-2 font-mono text-sm text-black transition-colors hover:bg-transparent hover:text-white"
          >
            browse hackathons <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 border border-[#333] px-4 py-2 font-mono text-sm text-[#888] transition-colors hover:border-white hover:text-white"
          >
            submit yours
          </Link>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mb-16">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="font-mono text-sm font-bold text-[#555]">$</h2>
            <h2 className="font-mono text-sm text-[#555]">featured hackathons</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((h) => (
              <Link
                key={h.slug}
                href={`/hackathons/${h.slug}`}
                className="group block border border-[#333] bg-[#0a0a0a] p-6 transition-all hover:border-white"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="outline" className="mb-2 border-[#444] font-mono text-xs text-[#666]">
                      featured
                    </Badge>
                    <h3 className="font-mono text-lg font-bold text-white group-hover:underline">
                      {h.name}
                    </h3>
                    <p className="mt-1 font-mono text-sm text-[#666]">
                      {h.location} · {h.mode}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 text-[#444] transition-transform group-hover:translate-x-1 group-hover:text-white" />
                </div>
                <p className="mt-3 font-mono text-sm text-[#888]">
                  {h.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {h.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-[#333] font-mono text-xs text-[#888]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* All Hackathons */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <h2 className="font-mono text-sm text-[#555]">$</h2>
          <h2 className="font-mono text-sm text-[#555]">all hackathons</h2>
        </div>
        <HackathonList hackathons={allHackathons} allTags={allTags} />
      </section>
    </div>
  )
}
