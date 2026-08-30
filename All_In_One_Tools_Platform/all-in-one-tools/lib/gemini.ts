import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini with your API Key
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateAIContent(prompt: string, toolName: string): Promise<string> {
  if (!apiKey || apiKey.trim() === "") {
    return "⚠️ Error: API Key is missing. Please add your key to the .env.local file and restart the server.";
  }

  // 🚀 AS PER GOOGLE'S LATEST UPDATES (Explicitly requested by Google API)
  // Using the absolute latest Generation 3 models
  const modelsToTry = [
    "gemini-3.6-flash",       // Google's highly recommended ultra-fast model
    "gemini-3.1-pro-preview"  // Powerful Pro model fallback
  ];
  
  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      return result.response.text();
      
    } catch (error: any) {
      console.error(`[${modelName}] failed for ${toolName}:`, error.message);
      
      // If a model is not found (404), jump to the next one instantly
      if (error.message.includes("404") || error.message.includes("not found")) {
        continue; 
      }
      
      // If server is busy (503), wait 2 seconds and try the next model
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  return "⚠️ All AI models are currently busy or unavailable. Please try again in a few seconds.";
}