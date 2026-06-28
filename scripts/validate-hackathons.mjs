import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const HACKATHONS_DIR = path.join(__dirname, "..", "data", "hackathons")

const VALID_STATUSES = ["upcoming", "ongoing", "completed"]
const VALID_MODES = ["online", "in-person", "hybrid"]

const REQUIRED_FIELDS = [
  "name",
  "date",
  "url",
  "description",
  "location",
  "mode",
  "tags",
  "organizer",
  "status",
]

let totalErrors = 0
let totalWarnings = 0

function error(file, msg) {
  console.error(`  ✗ ${msg}`)
  totalErrors++
}

function warn(file, msg) {
  console.warn(`  ⚠ ${msg}`)
  totalWarnings++
}

function validateDateRange(date, fileName) {
  if (typeof date !== "string") {
    error(fileName, `"date" must be a string, got ${typeof date}`)
    return
  }

  const parts = date.split("/")
  if (parts.length !== 2) {
    error(fileName, `"date" must be ISO range format "YYYY-MM-DD/YYYY-MM-DD", got "${date}"`)
    return
  }

  for (const part of parts) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(part)) {
      error(fileName, `invalid date format in "${date}", expected YYYY-MM-DD`)
      return
    }
    const parsed = new Date(part)
    if (isNaN(parsed.getTime())) {
      error(fileName, `invalid date "${part}"`)
      return
    }
  }

  const start = new Date(parts[0])
  const end = new Date(parts[1])
  if (start > end) {
    error(fileName, `start date ${parts[0]} is after end date ${parts[1]}`)
  }
}

function validateUrl(url, fileName, fieldName) {
  if (typeof url !== "string") {
    error(fileName, `"${fieldName}" must be a string, got ${typeof url}`)
    return
  }
  try {
    new URL(url)
  } catch {
    error(fileName, `"${fieldName}" is not a valid URL: "${url}"`)
  }
}

function validateHackathon(filePath) {
  const fileName = path.basename(filePath)
  const fileContent = fs.readFileSync(filePath, "utf8")

  let data
  try {
    const parsed = matter(fileContent)
    data = parsed.data
  } catch (e) {
    error(fileName, `failed to parse frontmatter: ${e.message}`)
    return
  }

  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      error(fileName, `missing required field: "${field}"`)
    }
  }

  if (data.status && !VALID_STATUSES.includes(data.status)) {
    error(fileName, `invalid status "${data.status}", must be one of: ${VALID_STATUSES.join(", ")}`)
  }

  if (data.mode && !VALID_MODES.includes(data.mode)) {
    error(fileName, `invalid mode "${data.mode}", must be one of: ${VALID_MODES.join(", ")}`)
  }

  if (data.date) {
    validateDateRange(data.date, fileName)
  }

  if (data.deadline) {
    if (typeof data.deadline !== "string") {
      error(fileName, `"deadline" must be a string, got ${typeof data.deadline}`)
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(data.deadline)) {
      error(fileName, `invalid deadline format "${data.deadline}", expected YYYY-MM-DD`)
    }
  }

  if (data.url) {
    validateUrl(data.url, fileName, "url")
  }

  if (data.tags) {
    if (!Array.isArray(data.tags)) {
      error(fileName, `"tags" must be an array, got ${typeof data.tags}`)
    } else if (data.tags.length === 0) {
      warn(fileName, `"tags" is empty, consider adding at least one tag`)
    } else {
      for (const tag of data.tags) {
        if (typeof tag !== "string") {
          error(fileName, `tag must be a string, got ${typeof tag}`)
        }
      }
    }
  }

  if (data.winners) {
    if (!Array.isArray(data.winners)) {
      error(fileName, `"winners" must be an array, got ${typeof data.winners}`)
    } else {
      const places = data.winners.map((w) => w.place)
      const uniquePlaces = new Set(places)
      if (uniquePlaces.size !== places.length) {
        error(fileName, `duplicate winner places detected`)
      }
      for (const winner of data.winners) {
        if (!winner.place || typeof winner.place !== "number") {
          error(fileName, `winner must have a numeric "place" field`)
        }
        if (!winner.project || typeof winner.project !== "string") {
          error(fileName, `winner must have a "project" string field`)
        }
        if (!winner.team || typeof winner.team !== "string") {
          error(fileName, `winner must have a "team" string field`)
        }
        if (winner.url) {
          validateUrl(winner.url, fileName, `winner "${winner.project}" url`)
        }
      }
    }
  }

  if (data.sponsors) {
    if (!Array.isArray(data.sponsors)) {
      error(fileName, `"sponsors" must be an array, got ${typeof data.sponsors}`)
    } else {
      for (const sponsor of data.sponsors) {
        if (!sponsor.name || typeof sponsor.name !== "string") {
          error(fileName, `sponsor must have a "name" string field`)
        }
        if (sponsor.url) {
          validateUrl(sponsor.url, fileName, `sponsor "${sponsor.name}" url`)
        }
      }
    }
  }

  if (data.totalParticipants !== undefined && typeof data.totalParticipants !== "number") {
    error(fileName, `"totalParticipants" must be a number, got ${typeof data.totalParticipants}`)
  }
  if (data.totalProjects !== undefined && typeof data.totalProjects !== "number") {
    error(fileName, `"totalProjects" must be a number, got ${typeof data.totalProjects}`)
  }

  if (data.featured !== undefined && typeof data.featured !== "boolean") {
    error(fileName, `"featured" must be a boolean, got ${typeof data.featured}`)
  }

  const parsed = matter(fileContent)
  if (!parsed.content || parsed.content.trim() === "") {
    warn(fileName, `markdown body is empty, consider adding a description`)
  }

  const slug = fileName.replace(/\.md$/, "")
  if (!/^[a-z0-9-]+$/.test(slug)) {
    error(fileName, `filename "${slug}" must be lowercase with hyphens only (a-z, 0-9, -)`)
  }
}

console.log("\n$ validate hackathons\n")

if (!fs.existsSync(HACKATHONS_DIR)) {
  console.error(`directory not found: ${HACKATHONS_DIR}`)
  process.exit(1)
}

const files = fs.readdirSync(HACKATHONS_DIR).filter((f) => f.endsWith(".md"))

if (files.length === 0) {
  console.warn("  no hackathon files found")
  process.exit(0)
}

console.log(`  checking ${files.length} file${files.length !== 1 ? "s" : ""}...\n`)

for (const file of files) {
  console.log(`  ${file}`)
  validateHackathon(path.join(HACKATHONS_DIR, file))
}

console.log(`\n  ─────────────────────────`)
console.log(`  ${files.length} files checked`)
console.log(`  ${totalErrors} error${totalErrors !== 1 ? "s" : ""}`)
console.log(`  ${totalWarnings} warning${totalWarnings !== 1 ? "s" : ""}`)

if (totalErrors > 0) {
  console.log(`\n  ✗ fix errors before committing\n`)
  process.exit(1)
} else {
  console.log(`\n  ✓ all good\n`)
  process.exit(0)
}
