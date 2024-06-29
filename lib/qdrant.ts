import { QdrantClient } from "@qdrant/js-client-rest"

export const qdClient = new QdrantClient({
  url: process.env.QD_URL,
  apiKey: process.env.QD_APIKEY,
})
