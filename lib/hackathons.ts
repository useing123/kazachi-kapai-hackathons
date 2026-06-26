import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import type { Hackathon } from "./types"

const hackathonsDirectory = path.join(process.cwd(), "data/hackathons")

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "")
}

export function getAllHackathonSlugs(): string[] {
  if (!fs.existsSync(hackathonsDirectory)) return []
  return fs.readdirSync(hackathonsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map(getSlugFromFilename)
}

function parseHackathonFile(slug: string, fileContent: string): Hackathon {
  const { data, content } = matter(fileContent)
  return {
    slug,
    name: data.name || "",
    date: data.date || "",
    url: data.url || "",
    description: data.description || "",
    location: data.location || "",
    mode: data.mode || "online",
    tags: data.tags || [],
    deadline: data.deadline,
    organizer: data.organizer || "",
    status: data.status || "upcoming",
    featured: data.featured || false,
    winners: data.winners || [],
    sponsors: data.sponsors || [],
    totalParticipants: data.totalParticipants,
    totalProjects: data.totalProjects,
    content,
  }
}

export function getAllHackathons(): Hackathon[] {
  const slugs = getAllHackathonSlugs()
  return slugs
    .map((slug) => {
      const fullPath = path.join(hackathonsDirectory, `${slug}.md`)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      return parseHackathonFile(slug, fileContents)
    })
    .sort((a, b) => {
      const dateA = new Date(a.date.split("/")[0]).getTime()
      const dateB = new Date(b.date.split("/")[0]).getTime()
      return dateB - dateA
    })
}

export function getHackathonBySlug(slug: string): Hackathon | null {
  const fullPath = path.join(hackathonsDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null
  const fileContents = fs.readFileSync(fullPath, "utf8")
  return parseHackathonFile(slug, fileContents)
}

export async function renderMarkdown(content: string): Promise<string> {
  const result = await remark().use(html).process(content)
  return result.toString()
}

export function getUpcomingHackathons(): Hackathon[] {
  return getAllHackathons().filter((h) => h.status === "upcoming" || h.status === "ongoing")
}

export function getCompletedHackathons(): Hackathon[] {
  return getAllHackathons().filter((h) => h.status === "completed")
}

export function getFeaturedHackathons(): Hackathon[] {
  return getAllHackathons().filter((h) => h.featured)
}

export function getAllTags(): string[] {
  const hackathons = getAllHackathons()
  const tags = new Set<string>()
  hackathons.forEach((h) => h.tags.forEach((t) => tags.add(t)))
  return Array.from(tags).sort()
}
