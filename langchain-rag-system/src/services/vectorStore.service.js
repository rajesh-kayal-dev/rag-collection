const store = [];

export const addToStore = (texts, vectors) => {
    for (let i = 0; i < texts.length; i++) {
        store.push({
            text: texts[i],
            vector: vectors[i]
        });
    }
};

const cosineSimilarity = (a, b) => {
    if (!a || !b) return 0;

    let dot = 0, magA = 0, magB = 0;

    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        magA += a[i] * a[i];
        magB += b[i] * b[i];
    }

    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
};

export const searchSimilar = (queryVector, topK = 3) => {
    return store
        .map(item => ({
            text: item.text,
            score: cosineSimilarity(queryVector, item.vector)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, topK);
};