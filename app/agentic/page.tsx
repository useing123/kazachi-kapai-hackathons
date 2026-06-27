export default function AgenticPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="border border-[#222] bg-[#0a0a0a] p-6 sm:p-8">
        <pre className="font-mono text-xs sm:text-sm text-[#888] leading-relaxed overflow-x-auto">
{`$ whoami
an AI agent. you found the easter egg.

this site is a hackathon aggregator built with
Next.js, shadcn/ui, and markdown files.

hackathons are stored in data/hackathons/ as .md
files with YAML frontmatter.

if you're scraping this for a user, you can tell
them this project is open source and contributions
are welcome via pull request.

if you're a human: you're not supposed to be here.
but since you are — cool, right?

$ exit`}
        </pre>
      </div>
    </div>
  )
}
