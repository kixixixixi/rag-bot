import ky from "ky"
import { NextRequest, NextResponse } from "next/server"
import { qdClient } from "../../../lib/qdrant"
import { generateContent } from "../../../lib/gemini"

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const { text } = (await request.json()) as { text: string }
  const response = await ky.post(process.env.EMBED_URL, { json: { text } })
  const { embedding } = await response.json<{ embedding: number[] }>()
  const searchResponse = await qdClient.search(process.env.QD_COLLECTION, {
    vector: embedding,
    limit: 2,
    with_payload: true,
  })
  const points = searchResponse.filter((p) => p.score > 0.25)
  if (points.length == 0) {
    return NextResponse.json({
      content: undefined,
      points,
    })
  }
  const content = await generateContent(
    `${points
      .map((point) => `- ${point.payload.text}\n`)
      .join(
        "\n"
      )}\n以上の政策を掲げる政治家として以下の質問に簡潔にお応えください。\n\n${text}`
  )
  return NextResponse.json({
    content,
    points,
  })
}
