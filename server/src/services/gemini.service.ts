import { generateAITextResponse } from "./ai.service.js";

const generateTestMessage = async (): Promise<string> => {
  return generateAITextResponse({
    prompt:
      "Reply with one short sentence confirming that Gemini is connected to CareerLens AI.",
    temperature: 0.1,
  });
};

export default generateTestMessage;
