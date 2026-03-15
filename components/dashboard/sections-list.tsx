"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AIWritingAssistant } from "@/components/onboarding/ai-writing-assistant"
import {
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Sparkles,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Lock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { SECTION_TYPES } from "@/lib/constants"
import type { ProfileSection } from "@/lib/types"

type SectionsListProps = {
  sections: ProfileSection[]
  profileId: string
  isPremium: boolean
}

const FREE_SECTION_LIMIT = 3

export const SectionsList = ({ sections, profileId, isPremium }: SectionsListProps) => {
  const router = useRouter()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [showAIAssistant, setShowAIAssistant] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [editForm, setEditForm] = useState({ title: "", content: "", section_type: "custom" })
  const [newForm, setNewForm] = useState({ title: "", content: "", section_type: "custom" })
  const [isSaving, setIsSaving] = useState(false)

  const canAddSection = isPremium || sections.length < FREE_SECTION_LIMIT

  const toggleExpand = (id: string) => {
    const newSet = new Set(expandedSections)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setExpandedSections(newSet)
  }

  const startEditing = (section: ProfileSection) => {
    setEditingId(section.id)
    setEditForm({
      title: section.title,
      content: section.content || "",
      section_type: section.section_type,
    })
    setExpandedSections((prev) => new Set([...prev, section.id]))
  }

  const cancelEditing = () => {
    setEditingId(null)
    setShowAIAssistant(null)
  }

  const handleSave = async (sectionId: string) => {
    setIsSaving(true)
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from("profile_sections")
        .update({
          title: editForm.title,
          content: editForm.content,
          section_type: editForm.section_type,
          updated_at: new Date().toISOString(),
        })
        .eq("id", sectionId)

      if (error) throw error

      setEditingId(null)
      setShowAIAssistant(null)
      router.refresh()
    } catch (error) {
      console.error("Error saving section:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddNew = async () => {
    if (!canAddSection) return
    setIsSaving(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("profile_sections").insert({
        profile_id: profileId,
        title: newForm.title,
        content: newForm.content,
        section_type: newForm.section_type,
        display_order: sections.length,
      })

      if (error) throw error

      setIsAddingNew(false)
      setNewForm({ title: "", content: "", section_type: "custom" })
      setShowAIAssistant(null)
      router.refresh()
    } catch (error) {
      console.error("Error adding section:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (sectionId: string) => {
    if (!confirm("Are you sure you want to delete this section?")) return

    const supabase = createClient()

    try {
      const { error } = await supabase.from("profile_sections").delete().eq("id", sectionId)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error("Error deleting section:", error)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-serif text-xl font-light">Biography Sections</CardTitle>
        {canAddSection ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddingNew(true)}
            disabled={isAddingNew}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Section
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <a href="/pricing">
              <Lock className="h-4 w-4" />
              Upgrade for More
            </a>
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {sections.length === 0 && !isAddingNew && (
          <p className="py-8 text-center text-muted-foreground">
            No sections yet. Add your first section to start building your biography.
          </p>
        )}

        {sections.map((section) => (
          <div
            key={section.id}
            className={cn(
              "rounded-lg border border-border p-4 transition-colors",
              editingId === section.id && "border-primary/50 bg-primary/5"
            )}
          >
            {editingId === section.id ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    <Input
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="max-w-xs font-medium"
                      placeholder="Section title"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={cancelEditing} disabled={isSaving}>
                      <X className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleSave(section.id)}
                      disabled={isSaving}
                      className="gap-2"
                    >
                      <Check className="h-4 w-4" />
                      {isSaving ? "Saving..." : "Save"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Content</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setShowAIAssistant(showAIAssistant === section.id ? null : section.id)
                      }
                      className="gap-2 text-primary"
                    >
                      <Sparkles className="h-4 w-4" />
                      {showAIAssistant === section.id ? "Hide AI" : "AI Help"}
                    </Button>
                  </div>
                  <Textarea
                    value={editForm.content}
                    onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                    className="min-h-[150px] leading-relaxed"
                    placeholder="Write your content here..."
                  />
                </div>

                {showAIAssistant === section.id && (
                  <AIWritingAssistant
                    sectionType={editForm.section_type}
                    onInsertText={(text) =>
                      setEditForm({
                        ...editForm,
                        content: editForm.content
                          ? `${editForm.content}\n\n${text}`
                          : text,
                      })
                    }
                  />
                )}

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(section.id)}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Section
                </Button>
              </div>
            ) : (
              <div>
                <div
                  className="flex cursor-pointer items-center justify-between"
                  onClick={() => toggleExpand(section.id)}
                >
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium">{section.title}</h3>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      {SECTION_TYPES.find((t) => t.id === section.section_type)?.label ||
                        section.section_type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        startEditing(section)
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {expandedSections.has(section.id) ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
                {expandedSections.has(section.id) && section.content && (
                  <p className="mt-4 whitespace-pre-wrap leading-relaxed text-muted-foreground">
                    {section.content}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}

        {isAddingNew && (
          <div className="rounded-lg border border-primary/50 bg-primary/5 p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">New Section</h3>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsAddingNew(false)
                      setShowAIAssistant(null)
                    }}
                    disabled={isSaving}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAddNew}
                    disabled={isSaving || !newForm.title.trim()}
                    className="gap-2"
                  >
                    <Check className="h-4 w-4" />
                    {isSaving ? "Adding..." : "Add"}
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={newForm.title}
                    onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                    placeholder="e.g., Education"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <select
                    value={newForm.section_type}
                    onChange={(e) => setNewForm({ ...newForm, section_type: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {SECTION_TYPES.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Content</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAIAssistant(showAIAssistant === "new" ? null : "new")}
                    className="gap-2 text-primary"
                  >
                    <Sparkles className="h-4 w-4" />
                    {showAIAssistant === "new" ? "Hide AI" : "AI Help"}
                  </Button>
                </div>
                <Textarea
                  value={newForm.content}
                  onChange={(e) => setNewForm({ ...newForm, content: e.target.value })}
                  className="min-h-[150px] leading-relaxed"
                  placeholder="Write your content here..."
                />
              </div>

              {showAIAssistant === "new" && (
                <AIWritingAssistant
                  sectionType={newForm.section_type}
                  onInsertText={(text) =>
                    setNewForm({
                      ...newForm,
                      content: newForm.content ? `${newForm.content}\n\n${text}` : text,
                    })
                  }
                />
              )}
            </div>
          </div>
        )}

        {!isPremium && sections.length > 0 && (
          <p className="text-center text-sm text-muted-foreground">
            {sections.length} of {FREE_SECTION_LIMIT} free sections used.{" "}
            <a href="/pricing" className="text-primary hover:underline">
              Upgrade for unlimited sections
            </a>
          </p>
        )}
      </CardContent>
    </Card>
  )
}
