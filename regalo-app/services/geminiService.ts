
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateHorsePun = async (): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "「午（うま）」または「馬」を使った、面白くておめでたい年賀状用の駄洒落を1つ考えてください。改行せず、必ず1行の短いフレーズ（15文字以内程度）で出力してください。例：今年もウマくいく！",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          pun: { type: Type.STRING, description: "A single-line horse-themed Japanese pun" }
        },
        required: ["pun"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text);
    return data.pun.replace(/\n/g, ' '); // Ensure it's strictly one line
  } catch (e) {
    return "今年もウマくいく！";
  }
};

export const generateIllustration = async (base64Image: string): Promise<string> => {
  const ai = getAI();
  
  const prompt = `
    Transform the person's face in this photo into a stylized Japanese-style illustration for the Year of the Horse (Nengajo). 
    - The person should be depicted as a heroic or elegant character associated with a horse (e.g., riding a horse or wearing horse-themed traditional attire).
    - Style: High-quality digital illustration, Japanese traditional woodblock print (Ukiyo-e) mixed with modern anime style.
    - Festive atmosphere with vibrant colors: Red, Gold, White, and Indigo.
    - Focus on capturing the person's features while making them look like a cool character.
    - LEAVE PLENTY OF MARGIN for text overlays.
    - DO NOT include any text in the generated image itself.
  `;

  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: base64Image.split(',')[1],
    },
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [imagePart, { text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "3:4" 
      }
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("Failed to generate image");
};
