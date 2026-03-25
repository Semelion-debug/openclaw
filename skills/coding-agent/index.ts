// /coding-agent/index.ts
import fetch from "node-fetch"; // or built-in fetch in newer Node

const HF_API_KEY = process.env.HF_API_KEY;
const HF_MODEL = process.env.HF_MODEL || "Qwen2.5-7B-Instruct";

export default {
  name: "coding-agent",
  description: "Use Hugging Face model for coding or reasoning tasks",
  run: async (input: string) => {
    if (!HF_API_KEY) {
      throw new Error("HF_API_KEY not set in environment");
    }

    const response = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: input }),
    });

    const data = await response.json();

    // The response might be an array of strings or an object depending on model
    return data?.[0]?.generated_text || JSON.stringify(data);
  },
};
