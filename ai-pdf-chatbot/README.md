## Project: PDF RAG Chatbot

This project is a backend-based AI system that allows users to upload a PDF and ask questions based on its content.

Instead of giving generic answers, the system retrieves relevant parts from the document and generates responses using that context.

## How It Works

1. Upload a PDF file
2. Extract text from the PDF
3. Split text into smaller chunks
4. Convert chunks into embeddings (vectors)
5. Store embeddings in memory
6. Convert user question into embedding
7. Find most similar chunks using cosine similarity
8. Send context + question to LLM
9. Generate final answer

## Tech Stack

- Node.js (Backend)
- Express.js
- pdf-parse (PDF text extraction)
- @xenova/transformers (Embeddings)
- Custom Vector Store (In-memory)
- Groq API (LLM)

## Features

- PDF upload and processing
- Text chunking with overlap
- Embedding generation (local model)
- Vector similarity search
- Keyword boosting for better retrieval
- Context-aware answer generation
- Hallucination control (strict prompt)

## What I Learned

- How RAG systems work internally
- Importance of chunking and data quality
- How embeddings and vector search work
- Handling hallucination in LLMs
- Improving retrieval using keyword boosting
- Structuring a real-world AI backend project


## Project Structure

src/
│
├── controllers/
├── services/
├── routes/
├── utils/
└── app.js

## Future Improvements

- Store embeddings in database (MongoDB / Chroma)
- Add frontend (React chat UI)
- Support multiple PDFs
- Improve search using hybrid retrieval
- Add chat memory

## Setup

1. Clone the repository

2. Install dependencies
   npm install

3. Create .env file and add:
   GROQ_API_KEY=your_api_key

4. Run the server
   node src/app.js

``This project is part of my learning journey in building real-world AI systems using RAG.``