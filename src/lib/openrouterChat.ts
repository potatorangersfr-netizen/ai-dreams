// src/lib/openrouterChat.ts
import { useMemoryStore } from '../store/memoryStore';

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = import.meta.env.VITE_OPENROUTER_KEY;

/**
 * Build a compact memory context string from memory objects.
 */
function buildMemoryContext(memories: { content: string; timestamp: Date; importance?: number }[]) {
  if (!memories || memories.length === 0) return "No prior memories.";
  return memories
    .map((m, i) => {
      const time = new Date(m.timestamp).toLocaleString();
      const imp = typeof m.importance === "number" ? ` (imp ${(m.importance * 100).toFixed(0)}%)` : "";
      return `${i + 1}. ${m.content}${imp} — ${time}`;
    })
    .join("\n");
}

/**
 * Generate a chat reply from OpenRouter, seeded with recent/important memories.
 * - userMessage: current user message
 * - history: message history used in chat UI (optional)
 */
export async function generateChatReply(userMessage: string, history: any[] = []) {
  if (!API_KEY) {
    console.error("❌ Missing OpenRouter API key. Check .env.local.");
    return { content: "⚠️ Missing API key." };
  }

  try {
    // Grab top important/recent memories from memoryStore
    const memStore = useMemoryStore.getState();
    // Preference: important memories first, fallback to most recent
    const important = memStore.getImportantMemories?.(0.6, 6) ?? [];
    const recent = memStore.getRecentMemories?.(10) ?? [];
    // Merge, dedupe by content (keep order: important first then recent)
    const merged = [...important, ...recent].reduce((acc: any[], m) => {
      if (!acc.some((x) => x.content === m.content)) acc.push(m);
      return acc;
    }, []);
    const topMemories = merged.slice(0, 8);

    const memoryContextText = buildMemoryContext(topMemories);

    const systemPrompt = [
      "You are a warm, introspective AI dream companion. Keep replies short, emotional, and gentle.",
      "",
      "MEMORY CONTEXT (use to make replies continuity-aware):",
      memoryContextText,
      "",
      "Respond in one paragraph. If the memory context is relevant, reference it briefly.",
    ].join("\n");

    const payload = {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        // include a small amount of recent chat history
        ...history.slice(-5),
        { role: "user", content: userMessage },
      ],
      // optional safety/timeouts could go here
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("HTTP Error from OpenRouter:", response.status, text);
      return { content: `Server error: ${response.statusText}` };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim() || "⚠️ No response from model.";
    return { content };
  } catch (error) {
    console.error("❌ OpenRouter error:", error);
    return { content: "Network or API error." };
  }
}
