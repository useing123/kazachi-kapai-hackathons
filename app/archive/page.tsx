import { getCompletedHackathons, getAllTags } from "@/lib/hackathons"
import { ArchiveClient } from "@/components/archive-client"

export const metadata = {
  title: "Archive — Kazachi Kapai",
  description: "Browse past hackathons with winners and sponsors",
}

export default function ArchivePage() {
  const completed = getCompletedHackathons()
  const allTags = getAllTags()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="font-mono text-2xl font-bold text-white">
          $ cat archive.log
        </h1>
        <p className="mt-2 font-mono text-sm text-[#666]">
          {completed.length} completed hackathon{completed.length !== 1 ? "s" : ""} with winners
        </p>
      </div>

      <ArchiveClient hackathons={completed} allTags={allTags} />
    </div>
  )
}
