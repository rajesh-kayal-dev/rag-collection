import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

export const createChunks = (docs) => {
    const chunks = docs.map(doc => doc.pageContent);

    return chunks.filter(chunk => {
        return (
            chunk.length > 200 &&               // small text remove
            !chunk.toLowerCase().includes('chapter') &&
            !chunk.toLowerCase().includes('contents') &&
            !chunk.toLowerCase().includes('figure') &&
            !chunk.toLowerCase().includes('summary')
        );
    });
};