import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string) {
    try {
        const response = await openai.createEmbedding({
            model: "text-embedding-ada-002",
            input: text.replace(/\n/g, " "),
        });
        const result = await response.json();

        if (result.error && result.error.type === 'insufficient_quota') {
            console.error("OpenAI API quota exceeded:", result.error.message);
            throw new Error("OpenAI API quota exceeded. Please check your plan and billing details.");
        }

        if (result.data && result.data.length > 0 && result.data[0].embedding) {
            return result.data[0].embedding as number[];
        } else {
            console.error("Unexpected response structure:", result);
            throw new Error("Unexpected response structure from OpenAI API");
        }
    } catch (error) {
        console.log("error calling openai embeddings api", error);
        throw error;
    }
}
