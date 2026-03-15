import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProfileOverview } from "@/components/dashboard/profile-overview"
import { SectionsList } from "@/components/dashboard/sections-list"
import { QuickActions } from "@/components/dashboard/quick-actions"

const DashboardPage = async () => {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (!profile?.onboarding_completed) {
    redirect("/onboarding")
  }

  const { data: sections } = await supabase
    .from("profile_sections")
    .select("*")
    .eq("profile_id", user.id)
    .order("display_order", { ascending: true })

  const { data: mediaAssets } = await supabase
    .from("media_assets")
    .select("*")
    .eq("profile_id", user.id)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader profile={profile} />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <ProfileOverview profile={profile} mediaCount={mediaAssets?.length || 0} />
            <SectionsList
              sections={sections || []}
              profileId={user.id}
              isPremium={profile.is_premium}
            />
          </div>

          <div className="space-y-6">
            <QuickActions profile={profile} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage
