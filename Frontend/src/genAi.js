import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY2;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const dummyData = [
  {
    "question": "What is the difference between synchronous and asynchronous programming in JavaScript?",
    "answer": "Synchronous programming executes tasks one after the other, blocking the code until the current task completes. Asynchronous programming allows multiple tasks to be processed without waiting for previous ones to finish, enabling better performance. In JavaScript, this is commonly handled using callbacks, promises, or async/await."
  },
  {
    "question": "What is the purpose of `useState` in React?",
    "answer": "`useState` is a React Hook that lets you add state to functional components. It returns a state variable and a function to update it. This allows the component to remember values between renders and update the UI when the state changes."
  },
  {
    "question": "Explain the role of Express.js in a Node.js application.",
    "answer": "Express.js is a minimal and flexible web application framework for Node.js. It provides features like routing, middleware support, and HTTP utility methods, which simplify the creation of server-side applications and APIs."
  },
  {
    "question": "How is data stored in MongoDB, and how does it differ from relational databases like MySQL?",
    "answer": "MongoDB stores data as flexible, JSON-like documents in collections. Unlike MySQL, which uses structured tables and schemas, MongoDB allows for a more dynamic and flexible data model, which is ideal for handling unstructured or semi-structured data."
  },
  {
    "question": "Can you describe the flow of a full stack web request from client to server and back?",
    "answer": "When a user interacts with the frontend (e.g., React), it sends an HTTP request to the backend (Node.js with Express). The backend processes the request, possibly querying or updating the MongoDB database. The response is then sent back to the frontend, which updates the UI accordingly."
  }
]


async function genAI({
  jobTitle,
  company,
  jobDescription,
  skills,
  difficulty,
  experience,
}) {
  // const prompt = `jobTitle: ${jobTitle}, company: ${company}, jobDescription: ${jobDescription}, skills: ${skills}, difficultyLevel: ${difficulty}, experience: ${experience}. Based on this information, generate five interview questions and answers in JSON format. Use fields "question" and "answer".`;

   const prompt = `jobTitle: ${jobTitle}, company: ${company}, jobDescription: ${jobDescription}, skills: ${skills}, difficultyLevel: ${difficulty}, experience: ${experience}. Based on this information, generate five interview questions  JSON format`;

  // return dummyData;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    // console.log(response.text);
    const text = response.text;

    

    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsedData = JSON.parse(cleaned);
    return parsedData;
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Gemini API call failed.");
  }
}

export default genAI;
