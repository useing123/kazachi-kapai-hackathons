import { Users, FolderGit2 } from "lucide-react"

interface StatsBarProps {
  totalParticipants?: number
  totalProjects?: number
}

export function StatsBar({ totalParticipants, totalProjects }: StatsBarProps) {
  if (!totalParticipants && !totalProjects) return null

  return (
    <div className="flex items-center gap-6 border-t border-[#222] pt-4">
      {totalParticipants && (
        <div className="flex items-center gap-2 font-mono text-sm text-[#888]">
          <Users className="h-4 w-4" />
          <span>{totalParticipants} participants</span>
        </div>
      )}
      {totalProjects && (
        <div className="flex items-center gap-2 font-mono text-sm text-[#888]">
          <FolderGit2 className="h-4 w-4" />
          <span>{totalProjects} projects</span>
        </div>
      )}
    </div>
  )
}
