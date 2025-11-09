// src/lib/qwen.ts
import 'dotenv/config';
import fetch from 'node-fetch';
import type { Personality } from '../types';

const apiKey = process.env.OPENROUTER_API_KEY!;

async function callOpenRouter(prompt: string): Promise<string> {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen-2.5-chat",
        messages: [
          { role: 'system', content: 'You are a helpful AI with personality and memory awareness.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "I couldn't generate a response.";
  } catch (err) {
    console.error("⚠️ OpenRouter API call failed:", err);
    return "I'm having trouble thinking right now...";
  }
}

export async function generateWakeResponse(
  dream: any,
  userMessage: string,
  personality: Personality,
  conversationHistory: Array<{ role: string; content: string }>
): Promise<string> {
  const prompt = `You just woke from this dream:
"${dream.dreamNarrative}"

You feel ${dream.emotionalTone}. Your personality shifted:
${JSON.stringify(dream.personalityShift)}

Current state: ${JSON.stringify(personality)}

Recent conversation:
${conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n')}

User says: "${userMessage}"

Respond naturally, maybe reference the dream. Be conversational.`;

  return callOpenRouter(prompt);
}

export async function generateConversationResponse(
  userMessage: string,
  personality: Personality,
  conversationHistory: Array<{ role: string; content: string }>,
  recentMemories: any[]
): Promise<string> {
  const prompt = `You are an AI with personality:
${JSON.stringify(personality)}

Recent conversation:
${conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n')}

Relevant memories:
${recentMemories.map(m => `- ${m.content}`).join('\n')}

User: ${userMessage}

Respond naturally, embodying your personality.`;

  return callOpenRouter(prompt);
}
