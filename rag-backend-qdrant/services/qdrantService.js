import { qdrant } from "../config/qdrant.js";

export async function storeEmbedding(id, chunk, embedding) {
  await qdrant.upsert("documents", {
    points: [
      {
        id,
        vector: embedding,
        payload: {
          text: chunk
        }
      }
    ]
  });
}

export async function searchSimilarChunks(queryEmbedding) {
  return await qdrant.search("documents", {
    vector: queryEmbedding,
    limit: 3
  });
}