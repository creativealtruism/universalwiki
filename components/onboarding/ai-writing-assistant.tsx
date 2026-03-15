"use client"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Send, Copy, Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type AIWritingAssistantProps = {
  sectionType: string
  profileContext?: string
  onInsertText: (text: string) => void
}

const getUIMessageText = (parts: Array<{ type: string; text?: string }> | undefined): string => {
  if (!parts || !Array.isArray(parts)) return ""
  return parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text" && typeof p.text === "string")
    .map((p) => p.text)
    .join("")
}

const PROMPTS: Record<string, string[]> = {
  early_life: [
    "Help me describe where I grew up",
    "Write about my childhood memories",
    "Describe my early family life",
  ],
  education: [
    "Describe my educational journey",
    "Write about influential teachers",
    "Capture my school experiences",
  ],
  career: [
    "Summarize my professional path",
    "Describe my career achievements",
    "Write about my work philosophy",
  ],
  achievements: [
    "List my proudest accomplishments",
    "Describe a major milestone",
    "Write about recognition I've received",
  ],
  philosophy: [
    "Articulate my core values",
    "Describe what motivates me",
    "Write about lessons I've learned",
  ],
  family: [
    "Describe my family background",
    "Write about family traditions",
    "Capture meaningful relationships",
  ],
  hobbies: [
    "Describe my favorite pastimes",
    "Write about my creative pursuits",
    "Capture what brings me joy",
  ],
  legacy: [
    "Write about the impact I hope to leave",
    "Describe wisdom I'd pass on",
    "Capture what I want to be remembered for",
  ],
  custom: [
    "Help me write about this topic",
    "Suggest an interesting angle",
    "Make this more engaging",
  ],
}

export const AIWritingAssistant = ({
  sectionType,
  profileContext,
  onInsertText,
}: AIWritingAssistantProps) => {
  const [inputValue, setInputValue] = useState("")
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/ai/chat",
      body: { sectionType, profileContext },
    }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return
    sendMessage({ text: inputValue })
    setInputValue("")
  }

  const handleQuickPrompt = (prompt: string) => {
    if (isLoading) return
    sendMessage({ text: prompt })
  }

  const handleCopyToSection = (text: string, index: number) => {
    onInsertText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const suggestedPrompts = PROMPTS[sectionType] || PROMPTS.early_life

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <Sparkles className="h-4 w-4 text-primary" />
          AI Writing Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Get help crafting your biography. Try a suggestion:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <Button
                  key={prompt}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickPrompt(prompt)}
                  disabled={isLoading}
                  className="text-xs"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        )}

        {messages.length > 0 && (
          <div className="max-h-[300px] space-y-3 overflow-y-auto">
            {messages.map((message, index) => {
              const text = getUIMessageText(message.parts)
              if (!text) return null

              return (
                <div
                  key={message.id}
                  className={cn(
                    "rounded-lg p-3 text-sm",
                    message.role === "user"
                      ? "bg-muted ml-8"
                      : "bg-background border border-border"
                  )}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{text}</p>
                  {message.role === "assistant" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyToSection(text, index)}
                      className="mt-2 h-7 gap-1 text-xs"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="h-3 w-3" />
                          Added
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Add to section
                        </>
                      )}
                    </Button>
                  )}
                </div>
              )
            })}
            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Writing...
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask for help or describe what you want to write..."
            className="min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            size="icon"
            className="h-auto"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
