import gemini from "../config/gemini.config.js";

const generateTestMessage = async (): Promise<string> => {
  const model = process.env.GEMINI_MODEL;

  if (!model) {
    throw new Error("GEMINI_MODEL is missing");
  }

  const response = await gemini.models.generateContent({
    model,
    contents:
      "Reply with one short sentence confirming that Gemini is connected to CareerLens AI.",
  });

  return response.text || "Gemini returned an empty response";
};

export default generateTestMessage;
