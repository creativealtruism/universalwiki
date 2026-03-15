import Link from "next/link"
import type { Profile } from "@/lib/types"

type ProfileHeaderProps = {
  profile: Profile
}

export const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-serif text-xl font-light tracking-tight text-foreground">
          UniversalWiki
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/auth/sign-up" className="text-muted-foreground hover:text-foreground transition-colors">
            Create Your Profile
          </Link>
        </nav>
      </div>
    </header>
  )
}
