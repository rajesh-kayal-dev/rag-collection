# Mini RAG System (Node.js + Ollama + Qdrant)

## Overview

This project is a simple implementation of a Retrieval-Augmented Generation system built using Node.js. It helps understand how modern AI applications retrieve and use relevant data before generating responses.

The goal of this project is to learn how text is converted into embeddings, stored in a vector database, and retrieved using similarity search.

This project focuses on the core backend logic without any frontend.

---

## What This Project Does

This system allows you to:

* Add text manually
* Break text into smaller chunks
* Convert each chunk into embeddings using Ollama
* Store embeddings in Qdrant
* Ask a question
* Convert the question into embedding
* Find similar chunks using vector search
* Return relevant results

---

## Core Flow

Text → Chunk → Embedding → Store → Query → Embedding → Search → Result

---

## Tech Stack

* Node.js with Express
* Ollama for embeddings
* Qdrant as vector database

---

## Key Concepts Explained

### 1. Embedding

Embedding means converting text into numbers.

Example:

"Node.js is a backend runtime" becomes a list of numbers.

These numbers represent the meaning of the text.

Similar sentences will have similar embeddings.

---

### 2. Chunking

Chunking means breaking large text into smaller parts.

Instead of storing a full paragraph, we store smaller sentences.

This improves search accuracy.

---

### 3. Vector Database

A vector database stores embeddings instead of normal text.

Qdrant stores:

* Vector (embedding)
* Payload (actual text)

This allows fast similarity search.

---

### 4. Similarity Search

When a question is asked:

* Convert question into embedding
* Compare with stored embeddings
* Find closest matches

This is how relevant data is retrieved.

---

### 5. Retrieval (RAG Concept)

Instead of answering blindly, the system first finds relevant chunks.

These chunks can later be used by an AI model to generate accurate answers.

---

## Project Structure

```
mini-rag/
│
├── server.js
│
├── config/
│   └── qdrant.js
│
├── services/
│   ├── embeddingService.js
│   ├── chunkService.js
│   └── qdrantService.js
│
├── routes/
│   ├── textRoutes.js
│   └── queryRoutes.js
```

---

## How It Works Step by Step

### Step 1: Add Text

API: POST /api/add-text

* User sends text
* Text is divided into chunks

---

### Step 2: Generate Embeddings

* Each chunk is sent to Ollama
* Ollama returns embedding (numbers)

---

### Step 3: Store in Qdrant

* Each chunk is stored with:

  * vector (embedding)
  * payload (text)

---

### Step 4: Ask Question

API: POST /api/query

* User sends question
* Question is converted into embedding

---

### Step 5: Similarity Search

* Qdrant compares question embedding with stored vectors
* Returns most similar chunks

---

### Step 6: Return Result

* Backend returns matched chunks
* These chunks can be used to generate final AI response

---

## API Endpoints

### Add Text

POST /api/add-text

Request:

```
{
  "text": "Node.js is a backend runtime. It is used to build scalable APIs."
}
```

Response:

```
{
  "message": "Stored in Qdrant",
  "chunks": [
    "Node.js is a backend runtime.",
    "It is used to build scalable APIs."
  ]
}
```

---

### Query

POST /api/query

Request:

```
{
  "question": "What is Node.js?"
}
```

Response:

```
{
  "question": "What is Node.js?",
  "matchedChunks": [
    "Node.js is a backend runtime.",
    "It is used to build scalable APIs."
  ]
}
```

---

## What I Learned from This Project

* How text is converted into embeddings
* Why vector databases are used
* How similarity search works
* How retrieval improves AI accuracy
* How to structure a backend project properly for RAG

---

## Real-World Use Case

This system is the base of:

* AI chatbots
* Document search systems
* Knowledge assistants
* Customer support AI

---

## Future Improvements

* Add LLM response generation
* Improve chunking strategy
* Add authentication
* Add caching using Redis
* Build frontend interface

---

## Conclusion

This project demonstrates the core idea of Retrieval-Augmented Generation.

It shows how AI systems use stored knowledge to provide better and more accurate responses instead of guessing.

This is the foundation of modern AI applications.
