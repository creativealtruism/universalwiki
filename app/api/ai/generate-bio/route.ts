import { streamText } from "ai"

export async function POST(req: Request) {
  const { prompt, sectionType, context } = await req.json()

  const systemPrompt = `You are a skilled biography writer helping someone craft their personal legacy. 
Write in a warm, elegant, and literary style - like a well-crafted Wikipedia article meets a thoughtful memoir.
Keep the tone dignified but personal, avoiding clichés and overly flowery language.
Write in third person unless specifically asked otherwise.
Be concise but meaningful - aim for 2-4 paragraphs that capture the essence of the topic.

Section type: ${sectionType}
${context ? `Additional context about the person: ${context}` : ""}`

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: systemPrompt,
    messages: [{ role: "user", content: prompt }],
  })

  return result.toUIMessageStreamResponse()
}
