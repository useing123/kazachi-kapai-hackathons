import { GitPullRequest, FileCode, CheckCircle, Shield } from "lucide-react"

export const metadata = {
  title: "Submit a Hackathon — Kazachi Kapai",
  description: "Add your hackathon to the directory via pull request",
}

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="mb-2 font-mono text-xl sm:text-2xl font-bold text-white">
        $ echo &quot;submit your hackathon&quot;
      </h1>
      <p className="mb-8 sm:mb-12 font-mono text-sm text-[#666]">
        this project is open source. add your hackathon via pull request.
      </p>

      <div className="space-y-6 sm:space-y-8">
        {/* Step 1 */}
        <div className="border border-[#222] bg-[#0a0a0a] p-4 sm:p-6">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-[#333] font-mono text-xs text-[#888]">
              1
            </span>
            <h2 className="font-mono text-sm font-bold text-white">fork the repo</h2>
            <GitPullRequest className="ml-auto h-4 w-4 shrink-0 text-[#444]" />
          </div>
          <div className="overflow-x-auto border border-[#1a1a1a] bg-[#050505] p-4 font-mono text-sm text-[#888]">
            <p><span className="text-[#555]">$</span> gh repo fork useing123/kazachi-kapai-hackathons</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="border border-[#222] bg-[#0a0a0a] p-4 sm:p-6">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-[#333] font-mono text-xs text-[#888]">
              2
            </span>
            <h2 className="font-mono text-sm font-bold text-white">create your hackathon file</h2>
            <FileCode className="ml-auto h-4 w-4 shrink-0 text-[#444]" />
          </div>
          <p className="mb-3 font-mono text-sm text-[#888]">
            create a new file in <code className="text-white">data/hackathons/</code> with a URL-friendly name:
          </p>
          <div className="overflow-x-auto border border-[#1a1a1a] bg-[#050505] p-4 font-mono text-sm text-[#888]">
            <p><span className="text-[#555]">$</span> touch data/hackathons/my-hackathon.md</p>
          </div>
          <p className="mt-3 font-mono text-sm text-[#666]">
            use this template:
          </p>
          <div className="mt-2 overflow-x-auto border border-[#1a1a1a] bg-[#050505] p-4 font-mono text-xs text-[#888]">
            <pre>{`---
name: "My Hackathon 2025"
date: "2025-10-15/2025-10-17"
url: "https://myhackathon.com"
description: "A short description"
location: "Online"
mode: "online"
tags: ["AI", "Web3", "Beginner-friendly"]
deadline: "2025-10-01"
organizer: "My Org"
status: "upcoming"
featured: false

# optional (for completed hackathons):
# winners:
#   - place: 1
#     project: "Cool Project"
#     team: "Team Name"
#     url: "https://project.dev"
# sponsors:
#   - name: "Sponsor Name"
#     url: "https://sponsor.com"
# totalParticipants: 200
# totalProjects: 40
---

your description goes here (markdown)
`}</pre>
          </div>
        </div>

        {/* Step 3 */}
        <div className="border border-[#222] bg-[#0a0a0a] p-4 sm:p-6">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-[#333] font-mono text-xs text-[#888]">
              3
            </span>
            <h2 className="font-mono text-sm font-bold text-white">validate your data</h2>
            <Shield className="ml-auto h-4 w-4 shrink-0 text-[#444]" />
          </div>
          <p className="mb-3 font-mono text-sm text-[#888]">
            run the validator to check your hackathon file before pushing:
          </p>
          <div className="overflow-x-auto border border-[#1a1a1a] bg-[#050505] p-4 font-mono text-sm text-[#888]">
            <p><span className="text-[#555]">$</span> npm run validate</p>
          </div>
          <p className="mt-3 font-mono text-xs text-[#555]">
            checks required fields, valid dates, URLs, status, mode, tags, winners, sponsors, and filename format.
          </p>
        </div>

        {/* Step 4 */}
        <div className="border border-[#222] bg-[#0a0a0a] p-4 sm:p-6">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-[#333] font-mono text-xs text-[#888]">
              4
            </span>
            <h2 className="font-mono text-sm font-bold text-white">open a pull request</h2>
            <CheckCircle className="ml-auto h-4 w-4 shrink-0 text-[#444]" />
          </div>
          <div className="overflow-x-auto border border-[#1a1a1a] bg-[#050505] p-4 font-mono text-sm text-[#888]">
            <p><span className="text-[#555]">$</span> git checkout -b add/my-hackathon</p>
            <p><span className="text-[#555]">$</span> git add data/hackathons/my-hackathon.md</p>
            <p><span className="text-[#555]">$</span> git commit -m &quot;add: My Hackathon 2025&quot;</p>
            <p><span className="text-[#555]">$</span> git push origin add/my-hackathon</p>
          </div>
          <p className="mt-3 font-mono text-sm text-[#666]">
            then open a PR on github. we&apos;ll review and merge it.
          </p>
        </div>
      </div>

      {/* Schema Reference */}
      <div className="mt-8 sm:mt-12 border border-[#222] bg-[#0a0a0a] p-4 sm:p-6">
        <h2 className="mb-4 font-mono text-sm font-bold text-white">$ schema reference</h2>
        <div className="space-y-2 font-mono text-xs sm:text-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#1a1a1a] pb-2 gap-1">
            <span className="text-[#888]">name</span>
            <span className="text-[#555]">required · string</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#1a1a1a] pb-2 gap-1">
            <span className="text-[#888]">date</span>
            <span className="text-[#555]">required · ISO range</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#1a1a1a] pb-2 gap-1">
            <span className="text-[#888]">url</span>
            <span className="text-[#555]">required · string</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#1a1a1a] pb-2 gap-1">
            <span className="text-[#888]">description</span>
            <span className="text-[#555]">required · string</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#1a1a1a] pb-2 gap-1">
            <span className="text-[#888]">location</span>
            <span className="text-[#555]">required · string</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#1a1a1a] pb-2 gap-1">
            <span className="text-[#888]">mode</span>
            <span className="text-[#555]">required · online | in-person | hybrid</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#1a1a1a] pb-2 gap-1">
            <span className="text-[#888]">tags</span>
            <span className="text-[#555]">required · string[]</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#1a1a1a] pb-2 gap-1">
            <span className="text-[#888]">organizer</span>
            <span className="text-[#555]">required · string</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#1a1a1a] pb-2 gap-1">
            <span className="text-[#888]">status</span>
            <span className="text-[#555]">required · upcoming | ongoing | completed</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#1a1a1a] pb-2 gap-1">
            <span className="text-[#888]">deadline</span>
            <span className="text-[#555]">optional · ISO date</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#1a1a1a] pb-2 gap-1">
            <span className="text-[#888]">featured</span>
            <span className="text-[#555]">optional · boolean</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#1a1a1a] pb-2 gap-1">
            <span className="text-[#888]">winners</span>
            <span className="text-[#555]">optional · array</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
            <span className="text-[#888]">sponsors</span>
            <span className="text-[#555]">optional · array</span>
          </div>
        </div>
      </div>
    </div>
  )
}
