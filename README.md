<img src="https://github.com/sulimanbadour1/betteraskpdf/blob/master/src/assets/logos/png/logo-no-background.png?raw=true" width="200" alt="sitelogo">

# Better Ask Pdf

**Summary**: "Better ask pdf" is a SAAS product designed to empower users by allowing them to upload and interactively engage with PDF files. Leveraging the power of Next.js, Tailwind CSS, NeonDB, Stripe, and OpenAI, this application offers a seamless experience from file upload to information extraction, all while ensuring a modern and responsive design. Deployed on AWS S3 and optimized with Vercel Edge, "Better ask pdf" aims to provide fast, reliable, and efficient service to its users.

## Features

- **PDF Upload**: Secure and fast file uploading using react dropzone.
- **langchain**: open source framework to convert Pdf's into text strings by AI and ML utility functions.
- **Interactive Engagement**: Extract and interact with content from uploaded PDFs.
- **Lucide react** :A Lucide icon library package for React applications.
- **Stylish Design**: Modern UI/UX with Tailwind CSS.
- **shadncn/ui**: Beautifully designed components built with Radix UI and Tailwind CSS.
- **Database Integration**: Efficient data management with NeonDB.
- **DrizzleORM**: TypeScript ORM for SQL databases designed with maximum type safety in mind.
- **React Query**: data-fetching and state management library for React applications that simplifies fetching, caching, and updating data.
- **Clerk Auth**: add authentication and user management to your application.
- **Payment Gateway**: Seamless payment process with Stripe.
- **AI-Powered**: Enhanced functionalities using OpenAI/Edge to integrate with edge.
- **Deployment**: Robust and scalable deployment on AWS S3.
- **Optimization**: Lightning-fast performance with Vercel Edge.
- **AI Retrieval Augmanted Genertation**: a technique that can provide more accurate results to queries than a generative large language model on its own.
- **Pinecone** is a cloud-based vector database that offers various features and benefits to the infrastructure community: Fast and fresh vector search: Pinecone provides ultra-low query latency, even with billions of items. This means that users will always get a great experience, even when searching large datasets.

- **Pinecone Terminology**

- 1. Index

An index in Pinecone refers to a database specifically designed to store a myriad of variables. It serves as the backbone for efficient data retrieval and storage, ensuring that operations are performed swiftly and accurately.

- 2. NameSpace

A NameSpace in Pinecone is essentially a segmentation mechanism used for each PDF vector space. By segmenting the vector space, Pinecone ensures organized storage and efficient retrieval of vectors, allowing for better scalability and management of data.

- **How to segment the pdf files**
  <img src="https://github.com/sulimanbadour1/betteraskpdf/blob/master/src/assets/rag%20info/Rag_info.png?raw=true" width="800" alt="sitelogo">

## Prerequisites

- Node.js and npm
- AWS account
- Stripe account
- OpenAI API key

## Packages Information

To set up the project, you'll need to install the following packages:

- Core Packages:

  - **`next`**: A React framework that enables server-side rendering and static site generation.
  - **`react`**: A JavaScript library for building user interfaces.
  - **`react-dom`**: React package for working with the DOM.
  - **`tailwindcss`**: A utility-first CSS framework for rapid UI development.
  - **`neondb`**: A database package specific to the project (assuming based on the name).
  - **`stripe`**: Library to integrate Stripe payment gateway.
  - **`openai`**: SDK for interacting with the OpenAI API.
  - **`aws-sdk`**: AWS SDK for JavaScript, to interact with AWS services.
  - **`dotenv`**: Module to load environment variables from a `.env` file.
  - **`pg`**: Non-blocking PostgreSQL client for Node.js.
  - **`@neondatabase/serverless`**: Serverless integration for NeonDB (assumed based on the name).
  - **`drizzle-orm`**: An ORM for database interactions (assumed based on the name).
  - **`drizzle-kit`**: Toolkit related to `drizzle-orm` (assumed based on the name).

- Commands:

  - **Push the Schema to the neon database**: `npx drizzle-kit push:pg`
  - **See the live database (opens a localhost port: 4983)**: `npx drizzle-kit studio`

- Additional Libraries:
  - **`@tanstack/react-query`**: Hooks for fetching, caching, and updating asynchronous data in React.
  - **`axios`**: Promise-based HTTP client for the browser and Node.js.
  - **`react-hot-toast`**: Library for adding toast notifications to React apps.
  - **PINECONE DB**:
    - **`@pinecone-database/pinecone`**: Core package for Pinecone database (assumed based on the name).
    - **`@pinecone-database/doc-splitter`**: Document splitter utility for Pinecone (assumed based on the name).
  - **`langchain`**: Assumed to be a language processing or translation library (based on the name).
  - **`openai-edge`**: SDK for OpenAI's edge capabilities.
  - **`md5`**: JavaScript function for hashing messages with MD5.

## DataBase Models

### **Table: `chats`**

| Column Name | Data Type    | Constraints             |
| ----------- | ------------ | ----------------------- |
| id          | serial       | primary key             |
| pdfName     | text         | not null                |
| pdfUrl      | text         | not null                |
| createdAt   | timestamp    | not null, default now() |
| userId      | varchar(256) | not null                |
| fileKey     | text         | not null                |

### **Table: `messages`**

| Column Name | Data Type      | Constraints                    |
| ----------- | -------------- | ------------------------------ |
| id          | serial         | primary key                    |
| chatId      | integer        | not null, references chats(id) |
| content     | text           | not null                       |
| createdAt   | timestamp      | not null, default now()        |
| role        | userSystemEnum | not null                       |
