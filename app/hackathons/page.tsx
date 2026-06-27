import { getAllHackathons, getAllTags } from "@/lib/hackathons"
import { HackathonCardFeatured } from "@/components/hackathon-card"
import { HackathonList } from "@/components/hackathon-list"

export const metadata = {
  title: "Hackathons — Kazachi Kapai",
  description: "Browse all hackathons in the directory",
}

export default function HackathonsPage() {
  const allHackathons = getAllHackathons()
  const allTags = getAllTags()
  const upcoming = allHackathons.filter((h) => h.status === "upcoming" || h.status === "ongoing")

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="font-mono text-xl sm:text-2xl font-bold text-white">
          $ ls hackathons/
        </h1>
        <p className="mt-2 font-mono text-sm text-[#666]">
          {allHackathons.length} hackathon{allHackathons.length !== 1 ? "s" : ""} in directory
        </p>
      </div>

      {/* Upcoming / Ongoing — Prominent Section */}
      {upcoming.length > 0 && (
        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-white">$</span>
              <span className="font-mono text-sm text-white">accepting participants</span>
            </div>
            <span className="font-mono text-xs text-[#555]">
              {upcoming.length} open
            </span>
          </div>
          <div className="space-y-4">
            {upcoming.map((h) => (
              <HackathonCardFeatured key={h.slug} hackathon={h} />
            ))}
          </div>
        </section>
      )}

      {/* All Hackathons — Filtered List */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <span className="font-mono text-sm text-[#555]">$</span>
          <span className="font-mono text-sm text-[#555]">all hackathons</span>
        </div>
        <HackathonList hackathons={allHackathons} allTags={allTags} />
      </section>
    </div>
  )
}
