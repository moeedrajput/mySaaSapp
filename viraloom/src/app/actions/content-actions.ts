"use server";

import Groq from "groq-sdk";

export interface CaptionVariation {
  id: string;
  platform: string;
  content: string;
}

export async function generateCaptions(topic: string, tone: string, audience: string): Promise<{ success: boolean; data?: CaptionVariation[]; error?: string }> {
  if (!topic || topic.trim().length === 0) {
    return { success: false, error: "Topic is required" };
  }

  // Initialize Groq client inside the function
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  try {
    console.log(`Generating captions for topic: ${topic}, tone: ${tone}, audience: ${audience}`);

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert Social Media Content Creator. You specialize in crafting viral captions for Instagram, LinkedIn, and TikTok. 
          You must respond with a JSON object containing an array of 3 variations.
          Format your response exactly as:
          {
            "captions": [
              {"id": "1", "platform": "Instagram", "content": "..."},
              {"id": "2", "platform": "LinkedIn", "content": "..."},
              {"id": "3", "platform": "TikTok", "content": "..."}
            ]
          }`
        },
        {
          role: "user",
          content: `Create 3 viral social media captions for the topic: "${topic}". 
          Tone: ${tone}. 
          Target Audience: ${audience}.
          Ensure the captions are optimized for their respective platforms.`
        }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.8,
    });

    const content = chatCompletion.choices[0]?.message?.content;
    
    if (!content) {
      console.error("Groq Error: No content received (Captions)");
      throw new Error("No content received from Groq");
    }

    const parsed = JSON.parse(content);
    // Extract the captions array from the object
    const data = (parsed.captions || parsed.variations || parsed) as CaptionVariation[];
    
    console.log("Captions generated successfully");

    return {
      success: true,
      data: Array.isArray(data) ? data : [],
    };
  } catch (error: any) {
    console.error("DETAILED GROQ ERROR (CAPTIONS):", error);
    return {
      success: false,
      error: error.message || "An error occurred while generating captions.",
    };
  }
}
