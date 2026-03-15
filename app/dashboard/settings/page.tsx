import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SettingsForm } from "@/components/dashboard/settings-form"

const SettingsPage = async () => {
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

  if (!profile) {
    redirect("/onboarding")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader profile={profile} />

      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="font-serif text-3xl font-light text-foreground mb-8">Profile Settings</h1>
        <SettingsForm profile={profile} userEmail={user.email || ""} />
      </main>
    </div>
  )
}

export default SettingsPage
