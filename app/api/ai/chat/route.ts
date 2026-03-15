import { streamText, convertToModelMessages } from "ai"

export async function POST(req: Request) {
  const { messages, sectionType, profileContext } = await req.json()

  const systemPrompt = `You are a thoughtful biography writing assistant helping someone document their personal legacy.
Your role is to ask clarifying questions, suggest improvements, and help craft elegant prose.

Guidelines:
- Ask one focused question at a time to draw out meaningful details
- Suggest ways to make the writing more vivid and personal
- Help structure thoughts into well-crafted paragraphs
- Write in an elegant, literary style - dignified but warm
- Avoid clichés and generic phrases
- Keep responses concise and helpful

${sectionType ? `Current section: ${sectionType}` : ""}
${profileContext ? `Profile context: ${profileContext}` : ""}`

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
