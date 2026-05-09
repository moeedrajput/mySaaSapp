"use server";

import Groq from "groq-sdk";

export interface SeoStrategy {
  titles: string[];
  description: string;
  hashtags: string[];
}

export async function generateSeoStrategy(topic: string): Promise<{ success: boolean; data?: SeoStrategy; error?: string }> {
  if (!topic || topic.trim().length === 0) {
    return { success: false, error: "Topic is required" };
  }

  // Initialize Groq client inside the function to ensure process.env is ready
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  try {
    console.log(`Generating SEO strategy for topic: ${topic}`);
    
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert SEO and Digital Marketing strategist. You must always respond in valid JSON format. Ensure the response is a single JSON object."
        },
        {
          role: "user",
          content: `Create an SEO strategy for: "${topic}". 
          Provide:
          1. 3 Viral, click-worthy titles.
          2. A comprehensive, SEO-optimized meta description (approx 160 characters).
          3. A list of 20 trending and relevant hashtags.
          
          Format your response exactly like this JSON object:
          {
            "titles": ["Title 1", "Title 2", "Title 3"],
            "description": "Description here...",
            "hashtags": ["#tag1", "#tag2", ...]
          }`
        }
      ],
      model: "llama-3.3-70b-versatile", 
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = chatCompletion.choices[0]?.message?.content;
    
    if (!content) {
      console.error("Groq Error: No content received");
      throw new Error("No content received from Groq");
    }

    const data = JSON.parse(content) as SeoStrategy;
    console.log("SEO Strategy generated successfully");

    return {
      success: true,
      data,
    };
  } catch (error: any) {
    console.error("DETAILED GROQ ERROR (SEO):", error);
    
    let message = "An error occurred while generating the strategy.";
    if (error.status === 401) message = "Invalid Groq API Key. Please check your Vercel Environment Variables.";
    
    return {
      success: false,
      error: error.message || message,
    };
  }
}
