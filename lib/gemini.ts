import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with the API key
// This should be set in your .env file
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

// Function to get a Gemini model instance
export function getGeminiModel() {
  // Check if API key is available
  if (!apiKey) {
    console.warn("Gemini API key is not set. Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env file.");
  }
  return genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
}

// Function to analyze a poem using Gemini
export async function analyzePoemWithGemini(
  poemTitle: string,
  poemContent: string,
  userQuery: string
) {
  try {
    // If no API key, return a helpful message
    if (!apiKey) {
      return "API key not configured. Please add your Google Gemini API key to the .env file as NEXT_PUBLIC_GEMINI_API_KEY.";
    }
    
    const model = getGeminiModel();
    
    // Create a system prompt that sets the context for the AI
    const systemPrompt = `
      You are a knowledgeable poetry analysis assistant for Kavyapath, a platform dedicated to Hindi poetry.
      You're analyzing the following poem:
      
      Title: "${poemTitle}"
      
      Content:
      "${poemContent}"
      
      Please provide a thoughtful, insightful response to the user's query about this poem.
      Be respectful of the poet's work and provide culturally relevant context when appropriate.
      If the poem is in Hindi, provide analysis that respects and understands Hindi poetic traditions.
      Keep your responses concise but informative.
    `;
    
    // Combine the system prompt with the user's query
    const prompt = `${systemPrompt}\n\nUser question: ${userQuery}`;
    
    // Generate a response
    const result = await model.generateContent(prompt);
    const response = result.response;
    
    return response.text();
  } catch (error) {
    console.error("Error analyzing poem with Gemini:", error);
    return "I'm sorry, I couldn't analyze this poem right now. Please check your API key configuration or try again later.";
  }
}
