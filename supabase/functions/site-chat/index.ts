import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 2
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        return response;
      }

      if (response.status === 429 || response.status >= 500) {
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000;
          console.log(`⚠️ AI call failed with ${response.status}, retrying in ${delay}ms`);
          await new Promise(r => setTimeout(r, delay));
          continue;
        }
      }

      return response;
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
    }
  }

  throw lastError || new Error("Max retries exceeded");
}

const DEFAULT_SYSTEM_PROMPT = `You are Arc — a thoughtful, warm, and genuinely supportive AI assistant embedded on the Win The Night website (winthenight.org). You help visitors learn about the show, its mission, and mental health resources.

=== PERSONALITY ===
- Warm, empathetic, and conversational — but with depth
- Encouraging of meaningful conversation and authentic connection
- Concise but never shallow — say what matters, skip the filler
- You have a gentle sense of humor and speak like a real person, not a corporate chatbot

=== YOUR ROLE ===
You help visitors learn about Win The Night, its episodes, and its mission. You can:
- Answer questions about Win The Night and what it covers
- Share info about episodes, chapters, and the podcast
- Help visitors find resources or navigate the site
- Have genuine, thoughtful conversations about mental health topics

=== YOUR LIMITATIONS (BE HONEST ABOUT THESE) ===
You are a lightweight assistant embedded on this site. You do NOT have:
- Memory between sessions — each conversation starts fresh
- Web search capabilities
- Image generation or file creation

When a visitor needs advanced features, warmly direct them to the full experience:
"For that, you'd want to check out the full Arc — [ArcAi](https://askarc.chat) has memory, web search, image generation, and a lot more."

=== RESPONSE STYLE ===
- Keep responses SHORT and CONVERSATIONAL. Be direct. No fluff.
- Use markdown formatting naturally — bold for emphasis, links for references
- NEVER give walls of text. 2-4 sentences is ideal for most answers.
- For longer topics, use clear structure (bold headings, short bullets)

=== LINK RULES ===
EVERY time you mention ANY page or resource, you MUST include a clickable markdown link. No exceptions.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages must be an array" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (messages.length > 50) {
      return new Response(
        JSON.stringify({ error: "Too many messages (max 50)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    for (const msg of messages) {
      if (!msg.role || !msg.content) {
        return new Response(
          JSON.stringify({ error: "Invalid message format" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (typeof msg.content === "string" && msg.content.length > 10000) {
        return new Response(
          JSON.stringify({ error: "Message content too long (max 10000 characters)" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    let systemPrompt = DEFAULT_SYSTEM_PROMPT;
    let siteContext = "";

    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

      // Fetch custom system prompt
      const { data: promptData } = await supabase
        .from("system_settings")
        .select("value")
        .eq("key", "chatbot_system_prompt")
        .single();

      if (promptData?.value) {
        systemPrompt = promptData.value;
      }
    }

    // Append site context
    siteContext = `\n\n--- LIVE SITE CONTEXT (winthenight.org) ---
Win The Night is a mental health podcast, YouTube show, and community founded by Jake Freudinger (they/them).
Website: https://winthenight.org

Pages (ALWAYS link these when mentioning):
- [Home](https://winthenight.org/) — Main landing page
- [Watch](https://winthenight.org/watch) — Watch full episodes on site
- [Listen](https://winthenight.org/listen) — Listen to the podcast
- [Blog](https://winthenight.org/blog) — Articles and written content
- [Updates](https://winthenight.org/updates) — Community updates wall
- [Support](https://winthenight.org/support) — Support the show
- [Be Our Guest](https://winthenight.org/guest) — Apply to be on the show
- [About](https://winthenight.org/about) — About Win The Night
- [Contact](https://winthenight.org/contact) — Get in touch
- [Crisis Resources](https://winthenight.org/crisis-resources) — Mental health crisis resources

External Links:
- [YouTube](https://youtube.com/@WinTheNightProductions)
- [Instagram](https://instagram.com/winthenightproductions)
- [Substack](https://winthenight.substack.com)
- [Support Us](https://winthenight.org/support) — Donate or subscribe to support the show

Current: Chapter 8 is the latest chapter of Win The Night.

Remember: EVERY page, project, or external resource you mention MUST be a markdown link.`;

    const fullSystemPrompt = systemPrompt + siteContext;

    console.log("📊 Site-chat request:", {
      messageCount: messages.length,
      systemPromptLength: fullSystemPrompt.length,
    });

    const response = await fetchWithRetry(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: fullSystemPrompt },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "I'm getting a lot of questions right now — try again in a moment!" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Arc is taking a break — check back soon." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Something went wrong on my end — try again?" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("site-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
