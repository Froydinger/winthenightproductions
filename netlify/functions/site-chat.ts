import type { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { defaultSiteSettings, type SiteSettings } from "../../src/lib/site-settings";

type Message = { role: "user" | "assistant"; content: string };

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
};

const systemPrompt = `You are Arc, a warm, concise assistant embedded on the Win The Night website.
Help visitors navigate the site, learn about the show, find episodes, read the blog, and locate mental health resources.
Win The Night links:
- Home: https://winthenight.org/
- Watch: https://winthenight.org/watch
- Listen: https://winthenight.org/listen
- Blog/Substack: https://winthenight.blog
- Support: https://buymeacoffee.com/winthenight
- Guest page: https://winthenight.org/guest
- Crisis resources: https://winthenight.org/crisis-resources
You are not a crisis service or clinician. If someone may be in immediate danger, direct them to 988 in the US or local emergency services.
Keep most answers to 2-4 sentences and include markdown links when naming pages or resources.`;

async function getSystemPrompt() {
  try {
    const store = getStore("wtn-admin");
    const stored = await store.get("site-settings", { type: "json" });
    const settings = { ...defaultSiteSettings, ...((stored || {}) as Partial<SiteSettings>) };
    return settings.chatbot_system_prompt || systemPrompt;
  } catch {
    return systemPrompt;
  }
}

function toTranscript(messages: Message[]) {
  return messages
    .map((message) => `${message.role === "assistant" ? "Arc" : "Visitor"}: ${message.content}`)
    .join("\n");
}

function getResponseText(data: any) {
  if (typeof data.output_text === "string") return data.output_text;

  const textParts = data.output
    ?.flatMap((item: any) => item.content || [])
    ?.filter((content: any) => content.type === "output_text" && typeof content.text === "string")
    ?.map((content: any) => content.text);

  return textParts?.join("\n").trim() || "";
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: corsHeaders, body: "Method not allowed" };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 503,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Arc is taking a break right now. Try again later." }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}") as { messages?: Message[] };
    const messages = Array.isArray(body.messages) ? body.messages.slice(-20) : [];

    if (!messages.length || messages.some((m) => !m.content || !["user", "assistant"].includes(m.role))) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Send Arc a message to get started." }),
      };
    }

    if (messages.some((m) => m.content.length > 4000)) {
      return {
        statusCode: 413,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ message: "That message is a little too long. Can you shorten it?" }),
      };
    }

    const activeSystemPrompt = await getSystemPrompt();
    const model = process.env.OPENAI_MODEL || "gpt-5.4-nano";
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        instructions: activeSystemPrompt,
        input: toTranscript(messages),
        max_output_tokens: 450,
      }),
    });

    if (!response.ok) {
      console.error("OpenAI Responses API error", response.status, await response.text());
      return {
        statusCode: response.status === 429 ? 429 : 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Arc hit a snag. Try again in a moment." }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ message: getResponseText(data) || "I am here, but I came up empty. Try asking that another way?" }),
    };
  } catch (error) {
    console.error("site-chat error", error);
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Something went sideways. Try again in a moment." }),
    };
  }
};
