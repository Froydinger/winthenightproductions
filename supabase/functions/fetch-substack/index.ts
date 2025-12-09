import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUBSTACK_FEED_URL = "https://winthenight.substack.com/feed";

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  guid: string;
  isPodcast: boolean;
  audioUrl?: string;
}

function extractCDATA(text: string): string {
  // Remove CDATA wrapper if present
  const cdataMatch = text.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  if (cdataMatch) {
    return cdataMatch[1];
  }
  return text;
}

function extractTagContent(xml: string, tagName: string): string {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = xml.match(regex);
  if (match) {
    return extractCDATA(match[1].trim());
  }
  return "";
}

function isPodcastEpisode(itemXml: string, title: string): boolean {
  // Check if enclosure is audio
  const enclosureMatch = itemXml.match(/<enclosure[^>]*type="([^"]+)"[^>]*>/i);
  if (enclosureMatch && enclosureMatch[1].includes("audio")) {
    return true;
  }

  // Check if title contains episode indicators
  if (title.match(/\bEP\.\s*\d+|\bEpisode\s+\d+/i)) {
    return true;
  }

  return false;
}

function extractAudioUrl(itemXml: string): string {
  // Extract audio URL from enclosure tag
  const enclosureMatch = itemXml.match(/<enclosure[^>]*url="([^"]+)"[^>]*type="([^"]+)"[^>]*>/i);
  if (enclosureMatch && enclosureMatch[2].includes("audio")) {
    return enclosureMatch[1];
  }
  return "";
}

function extractThumbnail(itemXml: string): string {
  // Try enclosure first (but skip if it's an audio file)
  const enclosureMatch = itemXml.match(/<enclosure[^>]*url="([^"]+)"[^>]*type="([^"]+)"[^>]*>/i);
  if (enclosureMatch && !enclosureMatch[2].includes("audio")) {
    return enclosureMatch[1];
  }

  // Try media:content
  const mediaMatch = itemXml.match(/<media:content[^>]*url="([^"]+)"[^>]*>/i);
  if (mediaMatch) {
    return mediaMatch[1];
  }

  // Try to find image in content
  const imgMatch = itemXml.match(/<img[^>]*src="([^"]+)"[^>]*>/i);
  if (imgMatch) {
    return imgMatch[1];
  }

  return "";
}

function parseRSSItems(xml: string): SubstackPost[] {
  const items: SubstackPost[] = [];
  
  // Find all <item> elements
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const title = extractTagContent(itemXml, "title");
    const isPodcast = isPodcastEpisode(itemXml, title);

    const description = extractTagContent(itemXml, "description");
    const fullContent = extractTagContent(itemXml, "content:encoded") || description;

    const post: SubstackPost = {
      title,
      link: extractTagContent(itemXml, "link"),
      pubDate: extractTagContent(itemXml, "pubDate"),
      author: extractTagContent(itemXml, "dc:creator") || extractTagContent(itemXml, "author") || "Win The Night",
      thumbnail: extractThumbnail(itemXml),
      description,
      content: fullContent,
      guid: extractTagContent(itemXml, "guid") || extractTagContent(itemXml, "link"),
      isPodcast,
      audioUrl: isPodcast ? extractAudioUrl(itemXml) : undefined,
    };

    if (post.title && post.link) {
      items.push(post);
    }
  }
  
  return items;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Fetching Substack RSS feed...");
    
    const response = await fetch(SUBSTACK_FEED_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; WinTheNight/1.0)",
        "Accept": "application/rss+xml, application/xml, text/xml, */*",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch RSS:", response.status, response.statusText);
      return new Response(
        JSON.stringify({ error: "Failed to fetch RSS feed", posts: [] }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const xml = await response.text();
    console.log("RSS feed fetched, length:", xml.length);

    const posts = parseRSSItems(xml);
    console.log("Parsed", posts.length, "posts from RSS");

    return new Response(
      JSON.stringify({ posts }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error fetching Substack feed:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage, posts: [] }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
