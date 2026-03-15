"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { LogOut, ExternalLink, Settings } from "lucide-react"
import type { Profile } from "@/lib/types"

type DashboardHeaderProps = {
  profile: Profile
}

export const DashboardHeader = ({ profile }: DashboardHeaderProps) => {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-serif text-xl font-light tracking-tight">
            UniversalWiki
          </Link>
          <span className="text-sm text-muted-foreground">Dashboard</span>
        </div>

        <div className="flex items-center gap-3">
          {profile.slug && (
            <Button variant="outline" size="sm" asChild className="gap-2">
              <Link href={`/p/${profile.slug}`} target="_blank">
                View Profile
                <ExternalLink className="h-3 w-3" />
              </Link>
            </Button>
          )}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/settings">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Sign out</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
