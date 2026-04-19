const store = [];

export const addToStore = (chunks, embeddings) => {
    for (let i = 0; i < embeddings.length; i++) {
        store.push({
            text: chunks[i],
            vector: embeddings[i]
        });
    }
};

export const getStore = () => store;


const cosineSimilarity = (a, b) => {
    let dot = 0;
    let magA = 0;
    let magB = 0;

    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        magA += a[i] * a[i];
        magB += b[i] * b[i];
    }

    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
};

export const searchSimilar = (queryVector, question, topK = 5) => {
    const keywords = question.toLowerCase().split(' ');



    const results = store.map(item => {
        let score = cosineSimilarity(queryVector, item.vector);

        if (keywords.some(word => item.text.toLowerCase().includes(word))) {
            score += 0.2;
        }

        return {
            text: item.text,
            score
        };
    });

    return results
        .sort((a, b) => b.score - a.score)
        .slice(0, topK);
};