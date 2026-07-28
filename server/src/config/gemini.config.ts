import { GoogleGenAI } from "@google/genai";
import { environment } from "./env.js";

const gemini = new GoogleGenAI({
  apiKey: environment.GEMINI_API_KEY,
});

export default gemini;
