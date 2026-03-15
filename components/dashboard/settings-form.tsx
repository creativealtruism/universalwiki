"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Check, AlertTriangle } from "lucide-react"
import type { Profile } from "@/lib/types"

type SettingsFormProps = {
  profile: Profile
  userEmail: string
}

export const SettingsForm = ({ profile, userEmail }: SettingsFormProps) => {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [formData, setFormData] = useState({
    slug: profile.slug || "",
    visibility: profile.visibility || "public",
    website: profile.website || "",
  })

  const handleSave = async () => {
    setIsSaving(true)
    setMessage(null)
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          slug: formData.slug,
          visibility: formData.visibility,
          website: formData.website,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id)

      if (error) {
        if (error.code === "23505") {
          setMessage({ type: "error", text: "This URL is already taken. Please choose another." })
        } else {
          throw error
        }
        return
      }

      setMessage({ type: "success", text: "Settings saved successfully!" })
      router.refresh()
    } catch (error) {
      setMessage({ type: "error", text: "Failed to save settings. Please try again." })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg font-light">Profile URL</CardTitle>
          <CardDescription>Your unique, shareable profile address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">universalwiki.org/p/</span>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                  })
                }
                className="flex-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg font-light">Visibility</CardTitle>
          <CardDescription>Control who can see your profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              { value: "public", label: "Public", description: "Anyone can view your profile" },
              {
                value: "unlisted",
                label: "Unlisted",
                description: "Only people with the link can view",
              },
              {
                value: "private",
                label: "Private",
                description: "Only you can view your profile",
              },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                  formData.visibility === option.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/50"
                }`}
              >
                <input
                  type="radio"
                  name="visibility"
                  value={option.value}
                  checked={formData.visibility === option.value}
                  onChange={(e) => setFormData({ ...formData, visibility: e.target.value as "public" | "unlisted" | "private" })}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium">{option.label}</p>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg font-light">External Links</CardTitle>
          <CardDescription>Add links to your website or social profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="website">Personal Website</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://yourwebsite.com"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg font-light">Account</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email Address</Label>
            <p className="text-sm text-muted-foreground">{userEmail}</p>
          </div>
          <div className="space-y-2">
            <Label>Plan</Label>
            <p className="text-sm">
              {profile.is_premium ? (
                <span className="text-primary font-medium">Premium</span>
              ) : (
                <>
                  Free{" "}
                  <a href="/pricing" className="text-primary hover:underline">
                    Upgrade
                  </a>
                </>
              )}
            </p>
          </div>
        </CardContent>
      </Card>

      {message && (
        <div
          className={`flex items-center gap-2 rounded-lg p-4 ${
            message.type === "success"
              ? "bg-green-500/10 text-green-600"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {message.type === "success" ? (
            <Check className="h-4 w-4" />
          ) : (
            <AlertTriangle className="h-4 w-4" />
          )}
          {message.text}
        </div>
      )}

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  )
}
