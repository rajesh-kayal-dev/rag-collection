export const createChunks = (docs) => {
    return docs.map(doc => doc.pageContent);
};