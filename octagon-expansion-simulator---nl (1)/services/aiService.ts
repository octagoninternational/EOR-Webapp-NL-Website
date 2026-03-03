import { GoogleGenAI } from "@google/genai";
import { SimulationInputs, RecommendationType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateExecutiveSummary = async (
  inputs: SimulationInputs, 
  recommendation: RecommendationType
): Promise<string> => {
  try {
    const prompt = `
      Act as a Senior Expansion Consultant for Octagon Professionals (Dutch HR firm).
      
      Analyze this client scenario:
      - Industry: ${inputs.industry}
      - HQ Location: ${inputs.hqLocation}
      - Headcount: ${inputs.headcount}
      - Duration: ${inputs.durationMonths} months
      - Urgency: ${inputs.urgency}
      - Talent Origin: ${inputs.citizenship}
      
      The calculated recommendation is: ${recommendation}.
      
      Write a concise, 2-sentence executive summary explaining specifically WHY this is the best strategic move for them in the Netherlands market (2025 context). 
      Focus on their specific industry risks or timeline. 
      Do not use markdown. Tone: Professional, authoritative, helpful.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // Use the recommended model for text tasks
      contents: prompt,
    });

    return response.text || "Based on your unique inputs, this strategy balances compliance security with operational speed.";
  } catch (error) {
    console.error("AI Generation failed", error);
    return "Based on your inputs, this strategy provides the optimal balance of speed and compliance for the Dutch market.";
  }
};