import { Terminal } from "lucide-react"

export const metadata = {
  title: "Manifesto — Kazachi Kapai",
  description: "Why this project exists",
}

export default function ManifestoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <div className="mb-12">
        <div className="mb-6 flex items-center gap-3">
          <Terminal className="h-6 w-6 text-white" />
          <h1 className="font-mono text-2xl sm:text-3xl font-bold text-white">$ manifesto</h1>
        </div>
      </div>

      <div className="space-y-8 font-mono text-sm text-[#aaa] leading-relaxed">
        <section>
          <h2 className="mb-3 font-mono text-base font-bold text-white">the internet forgot about hackathons</h2>
          <p>
            every weekend, somewhere in the world, people are building incredible things in 48 hours.
            they ship projects that change careers, start companies, and push technology forward.
            but finding these events? still a mess of scattered tweets, random Telegram groups,
            and word of mouth.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-mono text-base font-bold text-white">we believe in open data</h2>
          <p>
            hackathon information should be public, structured, and easy to find.
            no login walls. no paywalls. no algorithm deciding what you see.
            just a directory of events that anyone can contribute to.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-mono text-base font-bold text-white">contributing should be trivial</h2>
          <p>
            if you know about a hackathon, you should be able to add it in 2 minutes.
            fork the repo, add a markdown file, open a PR. that&apos;s it.
            no accounts, no forms, no email verification. just a pull request.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-mono text-base font-bold text-white">the code stays simple</h2>
          <p>
            no database. no authentication. no server-side rendering at runtime.
            just markdown files parsed at build time into a static site.
            this means the project can be maintained by anyone, hosted anywhere,
            and will outlive any startup.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-mono text-base font-bold text-white">for builders, by builders</h2>
          <p>
            this project is for the people who show up to hackathons —
            the ones who stay up all night debugging, who demo half-finished projects
            at 4am, who learn more in a weekend than in a semester.
            you deserve a place to find the next one.
          </p>
        </section>

        <section className="border-t border-[#222] pt-8">
          <p className="text-[#555]">
            if this resonates with you,{" "}
            <a href="https://github.com/useing123/kazachi-kapai-hackathons" className="text-white underline hover:opacity-80 transition-opacity">
              contribute
            </a>.
          </p>
        </section>
      </div>
    </div>
  )
}
