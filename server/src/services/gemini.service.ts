import { GoogleGenAI } from "@google/genai";

const generateTestMessage = async (): Promise<string> => {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  if (!model) {
    throw new Error("GEMINI_MODEL is missing");
  }

  const ai = new GoogleGenAI({
    apiKey,
  });

  const response = await ai.models.generateContent({
    model,
    contents:
      "Reply with one short sentence confirming that Gemini is connected to CareerLens AI.",
  });

  return response.text || "Gemini returned an empty response";
};

export default generateTestMessage;
