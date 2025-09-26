import { GoogleGenAI, Type } from "@google/genai";
import type { GeneratedProposal } from '../types';

// FIX: Per coding guidelines, initialize GoogleGenAI directly.
// The API key is assumed to be available as a hard requirement.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const proposalSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: 'A compelling title for the proposal.' },
        clientName: { type: Type.STRING, description: 'The name of the client the proposal is for.' },
        introduction: { type: Type.STRING, description: 'A brief introduction outlining the understanding of the client\'s needs.' },
        scopeOfWork: { 
            type: Type.ARRAY,
            description: 'A list of deliverables and tasks.',
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING }
                },
                required: ['title', 'description']
            }
        },
        timeline: {
            type: Type.ARRAY,
            description: 'A phased timeline for the project.',
            items: {
                type: Type.OBJECT,
                properties: {
                    phase: { type: Type.STRING },
                    duration: { type: Type.STRING }
                },
                required: ['phase', 'duration']
            }
        },
        pricing: {
            type: Type.ARRAY,
            description: 'A breakdown of the project costs.',
            items: {
                type: Type.OBJECT,
                properties: {
                    item: { type: Type.STRING },
                    cost: { type: Type.STRING }
                },
                required: ['item', 'cost']
            }
        },
        conclusion: { type: Type.STRING, description: 'A concluding paragraph summarizing the value proposition.' }
    },
    required: ['title', 'clientName', 'introduction', 'scopeOfWork', 'timeline', 'pricing', 'conclusion']
};

export const generateProposal = async (brief: string): Promise<GeneratedProposal> => {
    const prompt = `Based on the following project brief, generate a comprehensive and professional project proposal. The tone should be confident and persuasive. Extract the client's name if possible, otherwise use a placeholder like "Valued Client".

    Project Brief:
    ---
    ${brief}
    ---
    
    Please generate a proposal with a clear introduction, detailed scope of work, a realistic timeline, a sample pricing structure, and a strong conclusion.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: proposalSchema,
                temperature: 0.7,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        
        if (
            !parsedJson.title || 
            !Array.isArray(parsedJson.scopeOfWork) || 
            !Array.isArray(parsedJson.timeline) ||
            !Array.isArray(parsedJson.pricing)
        ) {
            throw new Error("Received malformed JSON response from AI.");
        }
        
        return parsedJson as GeneratedProposal;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to communicate with the AI service.");
    }
};


export const generateChatResponse = async (
    personaInstruction: string,
    messageHistory: { role: 'user' | 'model'; parts: { text: string }[] }[],
    newMessage: string
): Promise<string> => {
    
    const contents = [
        ...messageHistory,
        { role: 'user', parts: [{ text: newMessage }] }
    ];

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config: {
                systemInstruction: personaInstruction,
                temperature: 0.8,
                topP: 0.95,
            },
        });
        
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API for chat:", error);
        throw new Error("Failed to get chat response from the AI service.");
    }
};
