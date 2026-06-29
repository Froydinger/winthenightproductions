import type { Handler } from "@netlify/functions";

const SUBSTACK_FEED_URL = "https://winthenight.substack.com/feed";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
};

const extractCDATA = (text: string) => text.match(/<!\[CDATA\[([\s\S]*?)\]\]>/)?.[1] ?? text;

const extractTagContent = (xml: string, tagName: string) => {
  const escaped = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const isContentTag = tagName.toLowerCase().includes("content") || tagName.toLowerCase().includes("encoded");
  const regex = new RegExp(`<${escaped}[^>]*>([\\s\\S]${isContentTag ? "*" : "*?"})<\\/${escaped}>`, "i");
  return extractCDATA(xml.match(regex)?.[1]?.trim() ?? "");
};

const isPodcastEpisode = (itemXml: string, title: string) => {
  const enclosureType = itemXml.match(/<enclosure[^>]*type="([^"]+)"[^>]*>/i)?.[1] ?? "";
  return enclosureType.includes("audio") || /\bEP\.\s*\d+|\bEpisode\s+\d+/i.test(title);
};

const extractAudioUrl = (itemXml: string) => {
  const enclosure = itemXml.match(/<enclosure[^>]*url="([^"]+)"[^>]*type="([^"]+)"[^>]*>/i);
  return enclosure?.[2]?.includes("audio") ? enclosure[1] : "";
};

const extractThumbnail = (itemXml: string) => {
  const enclosure = itemXml.match(/<enclosure[^>]*url="([^"]+)"[^>]*type="([^"]+)"[^>]*>/i);
  if (enclosure && !enclosure[2].includes("audio")) return enclosure[1];
  return (
    itemXml.match(/<media:content[^>]*url="([^"]+)"[^>]*>/i)?.[1] ||
    itemXml.match(/<img[^>]*src="([^"]+)"[^>]*>/i)?.[1] ||
    ""
  );
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  try {
    const response = await fetch(SUBSTACK_FEED_URL, {
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml, */*",
        "User-Agent": "Mozilla/5.0 (compatible; WinTheNight/1.0)",
      },
    });

    if (!response.ok) {
      return {
        statusCode: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Failed to fetch RSS feed", posts: [] }),
      };
    }

    const xml = await response.text();
    const posts = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/gi))
      .map((match) => {
        const itemXml = match[1];
        const title = extractTagContent(itemXml, "title");
        const isPodcast = isPodcastEpisode(itemXml, title);
        const description = extractTagContent(itemXml, "description");
        const content =
          extractTagContent(itemXml, "content:encoded") ||
          extractTagContent(itemXml, "content") ||
          description;

        return {
          title,
          link: extractTagContent(itemXml, "link"),
          pubDate: extractTagContent(itemXml, "pubDate"),
          author: extractTagContent(itemXml, "dc:creator") || extractTagContent(itemXml, "author") || "Win The Night",
          thumbnail: extractThumbnail(itemXml),
          description,
          content,
          guid: extractTagContent(itemXml, "guid") || extractTagContent(itemXml, "link"),
          isPodcast,
          audioUrl: isPodcast ? extractAudioUrl(itemXml) : undefined,
        };
      })
      .filter((post) => post.title && post.link);

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ posts }),
    };
  } catch (error) {
    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error", posts: [] }),
    };
  }
};
