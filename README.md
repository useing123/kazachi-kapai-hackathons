# Kazachi Kapai

open-source hackathon aggregator. no database, no auth — just markdown files and pull requests.

## how it works

1. fork this repo
2. add your hackathon as a `.md` file in `data/hackathons/`
3. validate your data
4. open a pull request
5. after merge, your hackathon appears on the site

## getting started

```bash
git clone https://github.com/useing123/kazachi-kapai-hackathons
cd kazachi-kapai-hackathons
npm install
npm run dev
```

open [http://localhost:3000](http://localhost:3000)

## adding a hackathon

create a file in `data/hackathons/` with a url-friendly name:

```
data/hackathons/my-hackathon.md
```

use this template:

```yaml
---
name: "My Hackathon 2025"
date: "2025-10-15/2025-10-17"
url: "https://myhackathon.com"
description: "a short description"
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

your description goes here (markdown supported)
```

## validating

before opening a PR, run the validator to check your data:

```bash
npm run validate
```

this checks:
- required fields (name, date, url, description, location, mode, tags, organizer, status)
- valid date range format (`YYYY-MM-DD/YYYY-MM-DD`)
- valid URLs
- valid status (`upcoming` | `ongoing` | `completed`)
- valid mode (`online` | `in-person` | `hybrid`)
- tags is an array
- winners have place, project, team
- no duplicate winner places
- sponsors have name
- filename is lowercase with hyphens only

## schema

| field | required | type | description |
|---|---|---|---|
| `name` | yes | string | hackathon name |
| `date` | yes | string | ISO date range (`2025-10-15/2025-10-17`) |
| `url` | yes | string | official website |
| `description` | yes | string | short summary |
| `location` | yes | string | city, country, or "Online" |
| `mode` | yes | string | `online` \| `in-person` \| `hybrid` |
| `tags` | yes | string[] | category tags |
| `organizer` | yes | string | who runs it |
| `status` | yes | string | `upcoming` \| `ongoing` \| `completed` |
| `deadline` | no | string | registration deadline |
| `featured` | no | boolean | show on homepage |
| `winners` | no | array | ranked list (1st, 2nd, 3rd) |
| `sponsors` | no | array | flat list of sponsors |
| `totalParticipants` | no | number | stats for archive |
| `totalProjects` | no | number | stats for archive |

## tech stack

- [Next.js](https://nextjs.org) — app router, static export
- [shadcn/ui](https://ui.shadcn.com) — components
- [Tailwind CSS](https://tailwindcss.com) — styling
- [gray-matter](https://github.com/jonschlinkert/gray-matter) — markdown parsing
- [Netlify](https://netlify.com) — hosting

## project structure

```
kazachi-kapai/
├── app/                  # pages
├── components/           # react components
├── lib/                  # types + data layer
├── data/hackathons/      # .md files (the content)
├── scripts/              # validators
├── netlify.toml          # deploy config
└── package.json
```

## contributing

see [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) and open a PR.

## license

[MIT](LICENSE)
