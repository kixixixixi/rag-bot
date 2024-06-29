import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_APIKEY)

export const generateContent = async (prompt: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" })
  const result = await model.generateContent(prompt)
  return result.response.text()
}
