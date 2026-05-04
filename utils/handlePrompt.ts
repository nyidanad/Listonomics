export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY;

export const fetchChatResponse = async (history: Message[], newUserPrompt: string, quickContent?: string) => {
  if (!GROQ_API_KEY) {
    throw new Error("Missing Groq API Key in environment variables.");
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: quickContent ?? 'You are a helpful and concise AI assistant.' },
          ...history.map(m => ({
            role: m.role === 'model' ? 'assistant' : 'user',
            content: m.content
          })),
          { role: 'user', content: newUserPrompt }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.choices[0].message.content;
  } catch (error: any) {
    console.error("API Service Error:", error);
    throw error;
  }
};