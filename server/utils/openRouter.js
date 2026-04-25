import axios from "axios";
export const askAI = async (message) => {
  try {
    if (!message || !Array.isArray(message) || message.length === 0) {
      throw new Error("Messages array is empty.");
    }
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages: message,
        temperature: 0.7,
        max_tokens: 4000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer":process.env.CLIENT_URL || "http://localhost:5173",
          "X-Title": "LLMightyUI",
          "Content-Type": "application/json",
        },
      },
    );
    const content = response?.data?.choices?.[0]?.message?.content;
    if (!content || !content.trim()) {
      throw new Error("AI returned empty response.");
    }
    return content;
  } catch (error) {
    console.error("OpenRouter Error", error.response?.data || error.message);
    throw new Error("OpenRouter API Error");
  }
};
