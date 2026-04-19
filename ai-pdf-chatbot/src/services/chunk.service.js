export const createChunk = (text) => {
    const sentences = text.split('. ');
    
    const chunks = [];
    let currentChunk = '';

    for (const sentence of sentences) {
        if ((currentChunk + sentence).length < 800) {
            currentChunk += sentence + '. ';
        } else {
            chunks.push(currentChunk.trim());
            currentChunk = sentence + '. ';
        }
    }

    if (currentChunk) {
        chunks.push(currentChunk.trim());
    }

    return chunks.filter(chunk => chunk.length > 100);
};