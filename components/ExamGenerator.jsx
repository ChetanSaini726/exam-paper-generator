import { useState } from "react";
import { useGenerateExam } from "../hooks/useGenerateExam";

export default function ExamGenerator() {
    const [topic, setTopic] = useState("");
    const [count, setCount] = useState(5);
    const [withAnswers, setWithAnswers] = useState(false);
    const { mutate, isPending, isError, error, text, setText } = useGenerateExam();

    const disabled = isPending || !topic || !count || Number(count) <= 0 || Number.isNaN(Number(count));

    return (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
            <h1>AI Exam Paper Generator</h1>
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 180px 1fr" }}>
                <input placeholder="Topic" value={topic} onChange={e => setTopic(e.target.value)} />
                <input type="number" min="1" placeholder="Count" value={count} onChange={e => setCount(e.target.value)} />
                <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input type="checkbox" checked={withAnswers} onChange={e => setWithAnswers(e.target.checked)} />
                    Include answers
                </label>
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
                <button
                    onClick={() => {
                        setText("");
                        mutate({ topic, count: Number(count), withAnswers });
                    }}
                    disabled={disabled}
                >
                    {isPending ? "Generating..." : "Generate Exam"}
                </button>
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(text || "");
                    }}
                    disabled={!text}
                >
                    Copy
                </button>
            </div>
            {isError && <div style={{ color: "red", marginTop: 12 }}>{error?.message || "Failed to generate exam. Please try again."}</div>}
            <pre style={{ whiteSpace: "pre-wrap", background: "#f7f7f8", padding: 16, borderRadius: 8, marginTop: 16, minHeight: 200 }}>{text}</pre>
        </div>
    );
}
