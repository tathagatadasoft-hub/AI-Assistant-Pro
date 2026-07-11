import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export default async function handler(req, res) {

    // Allow requests from GitHub Pages
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method Not Allowed"
        });
    }

    try {

        const { question } = req.body;

        if (!question) {

            return res.status(400).json({
                error: "Question is required."
            });

        }

        const response = await ai.models.generateContent({

            model: "gemini-2.5-flash",

            contents: question

        });

        return res.status(200).json({

            answer: response.text

        });

    }
    catch (error) {

        console.error(error);

        return res.status(500).json({

            error: error.message

        });

    }

}
