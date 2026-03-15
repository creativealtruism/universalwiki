"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Briefcase, Calendar, ExternalLink } from "lucide-react"
import type { Profile, MediaAsset } from "@/lib/types"

type ProfileSidebarProps = {
  profile: Profile
  tableOfContents: Array<{ id: string; title: string }>
  mediaAssets: MediaAsset[]
}

export const ProfileSidebar = ({
  profile,
  tableOfContents,
  mediaAssets,
}: ProfileSidebarProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const profilePhoto = mediaAssets.find((m) => m.is_profile_photo)

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(id)
    }
  }

  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      {profilePhoto && (
        <Card>
          <CardContent className="p-0">
            <div className="aspect-[4/5] relative overflow-hidden rounded-lg">
              <Image
                src={profilePhoto.url}
                alt={profilePhoto.alt_text || profile.full_name || "Profile photo"}
                fill
                className="object-cover"
              />
            </div>
            {profilePhoto.caption && (
              <p className="p-3 text-xs text-muted-foreground text-center">
                {profilePhoto.caption}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="font-serif text-base font-light">Quick Facts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {profile.birth_year && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Born {profile.birth_year}</span>
            </div>
          )}
          {profile.location && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{profile.location}</span>
            </div>
          )}
          {profile.occupation && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Briefcase className="h-4 w-4" />
              <span>{profile.occupation}</span>
            </div>
          )}
          {profile.website && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <ExternalLink className="h-4 w-4" />
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground hover:underline"
              >
                Website
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      {tableOfContents.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-serif text-base font-light">Contents</CardTitle>
          </CardHeader>
          <CardContent>
            <nav>
              <ul className="space-y-2 text-sm">
                {tableOfContents.map((item, index) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleScrollTo(item.id)}
                      className={`text-left hover:text-foreground transition-colors ${
                        activeSection === item.id
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {index + 1}. {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </CardContent>
        </Card>
      )}

      {mediaAssets.filter((m) => !m.is_profile_photo).length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-serif text-base font-light">Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {mediaAssets
                .filter((m) => !m.is_profile_photo)
                .slice(0, 4)
                .map((media) => (
                  <div key={media.id} className="aspect-square relative overflow-hidden rounded">
                    <Image
                      src={media.url}
                      alt={media.alt_text || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </aside>
  )
}
