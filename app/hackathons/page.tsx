import { getAllHackathons, getAllTags } from "@/lib/hackathons"
import { HackathonList } from "@/components/hackathon-list"

export const metadata = {
  title: "Hackathons — Kazachi Kapai",
  description: "Browse all hackathons in the directory",
}

export default function HackathonsPage() {
  const hackathons = getAllHackathons()
  const allTags = getAllTags()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="font-mono text-2xl font-bold text-white">
          $ ls hackathons/
        </h1>
        <p className="mt-2 font-mono text-sm text-[#666]">
          {hackathons.length} hackathon{hackathons.length !== 1 ? "s" : ""} in directory
        </p>
      </div>
      <HackathonList hackathons={hackathons} allTags={allTags} />
    </div>
  )
}
