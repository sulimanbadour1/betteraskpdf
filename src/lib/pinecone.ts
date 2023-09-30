import { PineconeClient } from '@pinecone-database/pinecone';
import { downloadFromS3 } from './s3-server';

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


// The heart of the app - load the pdf into pinecone


//  Vectorize the pdf into  vectors
export async function loadS3IntoPinecone(
    file_key: string,
) {
    // 1- Get the pdf from s3
    console.log("Loading pdf from s3 ...");
    const file_name = await downloadFromS3(file_key);


}

