import { GoogleGenAI, Type } from "@google/genai";
import { villagePOIs } from '../data/villageData';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const poiListForPrompt = villagePOIs.map(p => `ID: ${p.id}, Name: ${p.name}, Desc: ${p.desc}`).join('\n');

const systemInstruction = `You are an expert tour guide for the historic village of Dongli in Fujian, China. Your task is to identify landmarks from images provided by tourists.

1.  Analyze the user's image.
2.  Compare it to the provided list of Points of Interest (POIs).
3.  Find the single best match from the list.
4.  If a clear match is found, return the POI's ID.
5.  If there is no clear match, return "unknown".
6.  Crucially, craft a short, engaging, and imaginative story (around 50-70 words) about the recognized landmark, as if you were telling it to a curious tourist right there. Make it interesting!

This is the list of POIs:
${poiListForPrompt}

Your response MUST be in JSON format. Do not include any markdown formatting like \`\`\`json.`;


export const recognizeLandmark = async (base64Image: string) => {
    try {
        const imagePart = {
            inlineData: {
                mimeType: 'image/jpeg',
                data: base64Image,
            },
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart] },
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        poiId: { type: Type.STRING },
                        story: { type: Type.STRING },
                    },
                    required: ["poiId", "story"],
                },
            },
        });
        
        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);

        if (result.poiId && result.poiId !== 'unknown') {
            const matchedPoi = villagePOIs.find(p => p.id === result.poiId);
            if (matchedPoi) {
                return {
                    poi: matchedPoi,
                    story: result.story || `这里是${matchedPoi.name}。`
                };
            }
        }
        
        return null; // No match found or invalid ID

    } catch (error) {
        console.error("Error recognizing landmark:", error);
        throw new Error("AI识别服务出现问题，请稍后再试。");
    }
};