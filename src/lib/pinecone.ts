import { PineconeClient } from '@pinecone-database/pinecone';
import { downloadFromS3 } from './s3-server';
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document, RecursiveCharacterTextSplitter } from "@pinecone-database/doc-splitter";


// 1- Create a pinecone client

let pinecone: PineconeClient | null = null;

export const getPineconeClient = async () => {
    if (!pinecone) {
        pinecone = new PineconeClient()
        await pinecone.init({
            environment: process.env.PINECONE_ENVIRONMENT!,
            apiKey: process.env.PINECONE_API_KEY!,
        }

        )
    }
    return pinecone;
}


type PDFPage = {
    pageContent: string;
    metadata: {
        loc: { pageNumber: number };
    }
}


// The heart of the app - load the pdf into pinecone
//  1- Vectorize the pdf into  vectors
export async function loadS3IntoPinecone(
    file_key: string,
) {
    // 1- Get the pdf from s3
    console.log("Loading pdf from s3 ...");
    const file_name = await downloadFromS3(file_key);
    if (!file_name) {
        throw new Error("Could not download file from s3");
    }
    const loader = new PDFLoader(file_name);
    const pages = (await loader.load() as PDFPage[]);

    // 2- split and segment the pdf into pages
    // return pages;
    const documents = await Promise.all(pages.map(prepareDocument));

    // 3- vectorize the pdf and embed individual slices of docs


}






export const truncateStringByBytes = (str: string, bytes: number) => {
    const enc = new TextEncoder();
    return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes));
}
async function prepareDocument(page: PDFPage) {
    let { metadata, pageContent } = page;
    pageContent = pageContent.replace(/\n/g, " ");
    //  3- split the page into segments
    const splitter = new RecursiveCharacterTextSplitter();
    const docs = await splitter.splitDocuments([
        new Document(
            {
                pageContent,
                metadata: {
                    pageNumber: metadata.loc.pageNumber,
                    text: truncateStringByBytes(pageContent, 36000)

                }
            }
        )
    ])
    return docs;
}
