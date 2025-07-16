import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY2;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function genAI({
  jobTitle,
  company,
  jobDescription,
  skills,
  difficulty,
  experience,
}) {
  const prompt = `jobTitle: ${jobTitle}, company: ${company}, jobDescription: ${jobDescription}, skills: ${skills}, difficultyLevel: ${difficulty}, experience: ${experience}. Based on this information, generate five interview questions and answers in JSON format. Use fields "question" and "answer".`;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash-001", // or gemini-1.5-pro
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = result.response.text();
    console.log(text);
    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsedData = JSON.parse(cleaned);

    return parsedData;
    // console.log(parsedData);
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Gemini API call failed.");
  }
}

export default genAI;
