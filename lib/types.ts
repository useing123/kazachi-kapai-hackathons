export interface Winner {
  place: number
  project: string
  team: string
  url?: string
}

export interface Sponsor {
  name: string
  url?: string
}

export type HackathonStatus = "upcoming" | "ongoing" | "completed"
export type HackathonMode = "online" | "in-person" | "hybrid"

export interface Hackathon {
  slug: string
  name: string
  date: string
  url: string
  description: string
  location: string
  mode: HackathonMode
  tags: string[]
  deadline?: string
  organizer: string
  status: HackathonStatus
  featured?: boolean
  winners?: Winner[]
  sponsors?: Sponsor[]
  totalParticipants?: number
  totalProjects?: number
  content: string
}
