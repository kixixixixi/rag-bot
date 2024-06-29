import ky from "ky"
import { NextRequest, NextResponse } from "next/server"
import { qdClient } from "../../../lib/qdrant"

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  const { title, text } = (await request.json()) as {
    title: string
    text: string
  }
  const response = await ky.post(process.env.EMBED_URL, { json: { text } })
  const { embedding } = await response.json<{ embedding: number[] }>()
  await qdClient.upsert(process.env.QD_COLLECTION, {
    points: [
      {
        vector: embedding,
        id: crypto.randomUUID(),
        payload: {
          text,
          title,
        },
      },
    ],
  })
  return NextResponse.json({
    status: "ok",
  })
}
