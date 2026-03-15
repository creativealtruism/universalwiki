import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileSection } from "@/components/profile/profile-section"
import { ProfileSidebar } from "@/components/profile/profile-sidebar"
import { ProfileFooter } from "@/components/profile/profile-footer"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, headline, location")
    .eq("slug", slug)
    .eq("visibility", "public")
    .single()

  if (!profile) {
    return {
      title: "Profile Not Found | UniversalWiki",
    }
  }

  return {
    title: `${profile.full_name} | UniversalWiki`,
    description: profile.headline || `The personal legacy of ${profile.full_name}`,
    openGraph: {
      title: `${profile.full_name} | UniversalWiki`,
      description: profile.headline || `The personal legacy of ${profile.full_name}`,
      type: "profile",
    },
  }
}

const PublicProfilePage = async ({ params }: Props) => {
  const { slug } = await params
  const supabase = await createClient()

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("slug", slug)
    .eq("visibility", "public")
    .single()

  if (error || !profile) {
    notFound()
  }

  const { data: sections } = await supabase
    .from("profile_sections")
    .select("*")
    .eq("profile_id", profile.id)
    .eq("is_visible", true)
    .order("display_order", { ascending: true })

  const { data: mediaAssets } = await supabase
    .from("media_assets")
    .select("*")
    .eq("profile_id", profile.id)
    .order("display_order", { ascending: true })

  const tableOfContents =
    sections?.map((section) => ({
      id: section.id,
      title: section.title,
    })) || []

  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader profile={profile} />

      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          <article className="prose prose-lg max-w-none">
            <header className="mb-12 not-prose">
              <h1 className="font-serif text-4xl font-light tracking-tight text-foreground md:text-5xl">
                {profile.full_name}
              </h1>
              {profile.headline && (
                <p className="mt-4 text-xl leading-relaxed text-muted-foreground">
                  {profile.headline}
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                {profile.birth_year && <span>Born {profile.birth_year}</span>}
                {profile.location && <span>{profile.location}</span>}
                {profile.occupation && <span>{profile.occupation}</span>}
              </div>
            </header>

            {sections && sections.length > 0 ? (
              <div className="space-y-12">
                {sections.map((section) => (
                  <ProfileSection key={section.id} section={section} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground italic">
                This profile is still being written. Check back soon for more content.
              </p>
            )}
          </article>

          <ProfileSidebar
            profile={profile}
            tableOfContents={tableOfContents}
            mediaAssets={mediaAssets || []}
          />
        </div>
      </main>

      <ProfileFooter profile={profile} />
    </div>
  )
}

export default PublicProfilePage
