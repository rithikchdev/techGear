import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const buildAmazonLink = (query) => {
  const domain = process.env.AMAZON_DOMAIN || "www.amazon.in";
  const url = new URL(`https://${domain}/s`);
  url.searchParams.set("k", query);
  if (process.env.AMAZON_TAG) url.searchParams.set("tag", process.env.AMAZON_TAG);
  return url.toString();
};

export const getRecommendations = async (buffer, mimeType) => {
  const prompt = `Look at this image and suggest 5 products a person could buy on Amazon
that relate to it (the item shown, similar items, accessories, or complementary products).
Return ONLY a JSON array. Each item must have:
"title" (short product name),
"reason" (one sentence on why it fits the image),
"searchQuery" (a concise Amazon search phrase, 2 to 6 words, no brand unless the brand is clearly visible).`;

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
    contents: [
      { inlineData: { mimeType, data: buffer.toString("base64") } },
      { text: prompt },
    ],
    config: { responseMimeType: "application/json" },
  });

  const parsed = JSON.parse(response.text);
  if (!Array.isArray(parsed)) return [];

  return parsed
    .filter((item) => item && item.title)
    .slice(0, 5)
    .map((item) => ({
      title: item.title,
      reason: item.reason || "",
      searchQuery: item.searchQuery || item.title,
      link: buildAmazonLink(item.searchQuery || item.title),
    }));
};