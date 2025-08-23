
import express from "express";
import { GoogleGenAI } from "@google/genai";
import {MODEL_NAME, GEMINI_API_KEY, gemini_config} from "../utils/config.js"
const router = express.Router();

router.post("/generate-exam", async (req, res) => {
    try {
        if (!MODEL_NAME || !GEMINI_API_KEY){
            console.log("Either MODEL_NAME or GEMINI_API_KEY environment variables are not set!");
            return res.status(500).json({error: "Server not configured properly"});
        }
        const { topic, count } = req.body;

        if (!topic || !count || isNaN(count)) {
            return res.status(400).json({ error: "Invalid topic or count!" });
        }

        // Set headers for SSE (streaming)
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
        const prompt = `Generate a math exam for a primary school student with ${count} questions on the topic of ${topic}.`;
        
        const response = await ai.models.generateContentStream({
            model: MODEL_NAME,
            contents: prompt,
            config: gemini_config
        });
        
        for await (const chunk of response) {
            const chunkText = chunk.text;
            if (chunkText){
                res.write(`data: ${JSON.stringify(chunkText)}\n\n`)
            }
            // console.debug(chunk.text);
        }
        res.end("data: [DONE]\n\n");
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: "Failed to generate exam. Please try again." });
    }
});

export default router;
