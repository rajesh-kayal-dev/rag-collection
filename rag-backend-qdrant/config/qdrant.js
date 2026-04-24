import { QdrantClient } from "@qdrant/js-client-rest";

export const qdrant = new QdrantClient({
  url: "http://localhost:6333"
});

export async function createCollection() {
  try {
    await qdrant.createCollection("documents", {
      vectors: {
        size: 768,
        distance: "Cosine"
      }
    });
    console.log("Collection created");
  } catch {
    console.log("Collection already exists");
  }
}