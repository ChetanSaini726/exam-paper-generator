import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

async function streamExamRequest({ topic, count, onChunk }) {
    const res = await fetch(`${BACKEND}/api/generate-exam`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, count })
    });
    if (!res.body) throw new Error("No stream");
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";
        for (const part of parts) {
            if (!part.startsWith("data:")) continue;
            const data = part.slice(5).trim();
            if (data === "[DONE]") return;
            onChunk(JSON.parse(data));
        }
    }
}

export function useGenerateExam() {
    const [text, setText] = useState("");
    const mutation = useMutation({
        mutationFn: ({ topic, count }) =>
            streamExamRequest({
                topic,
                count,
                onChunk: chunk => setText(prev => prev + chunk)
            })
    });
    return { ...mutation, text, setText };
}
