"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ExternalLink,
  Share2,
  Crown,
  Settings,
  Eye,
  Link as LinkIcon,
  Copy,
  Check,
} from "lucide-react"
import { useState } from "react"
import type { Profile } from "@/lib/types"

type QuickActionsProps = {
  profile: Profile
}

export const QuickActions = ({ profile }: QuickActionsProps) => {
  const [copied, setCopied] = useState(false)

  const profileUrl = profile.slug
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/p/${profile.slug}`
    : null

  const handleCopyLink = async () => {
    if (!profileUrl) return
    await navigator.clipboard.writeText(profileUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg font-light">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {profile.slug && (
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
              <Link href={`/p/${profile.slug}`} target="_blank">
                <Eye className="h-4 w-4" />
                Preview Profile
              </Link>
            </Button>
          )}

          {profileUrl && (
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={handleCopyLink}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Profile Link
                </>
              )}
            </Button>
          )}

          <Button variant="outline" className="w-full justify-start gap-2" asChild>
            <Link href="/dashboard/settings">
              <Settings className="h-4 w-4" />
              Profile Settings
            </Link>
          </Button>
        </CardContent>
      </Card>

      {!profile.is_premium && (
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif text-lg font-light">
              <Crown className="h-5 w-5 text-primary" />
              Upgrade to Premium
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Unlimited biography sections
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Upload unlimited photos
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Custom profile themes
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Priority AI writing assistance
              </li>
            </ul>
            <Button className="w-full" asChild>
              <Link href="/pricing">
                View Plans
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg font-light">Profile Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Visibility</span>
              <span className="capitalize">{profile.visibility || "Public"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Plan</span>
              <span className={profile.is_premium ? "text-primary" : ""}>
                {profile.is_premium ? "Premium" : "Free"}
              </span>
            </div>
            {profile.slug && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">URL</span>
                <span className="flex items-center gap-1 text-xs">
                  <LinkIcon className="h-3 w-3" />
                  /p/{profile.slug}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
