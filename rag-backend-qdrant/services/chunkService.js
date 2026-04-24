export function createChunks(text) {
  return text
    .split(/(?<=[.?!])\s+/)
    .map(chunk => chunk.trim())
    .filter(chunk => chunk.length > 0);
}