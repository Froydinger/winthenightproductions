import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface LinkMetadataRequest {
  url: string;
}

interface LinkMetadataResponse {
  title: string;
  description: string;
  image: string;
  domain: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url }: LinkMetadataRequest = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: "URL is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Fetching metadata for:", url);

    // Fetch the page HTML
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LinkPreviewBot/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`);
    }

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    if (!doc) {
      throw new Error("Failed to parse HTML");
    }

    // Extract domain
    const urlObj = new URL(url);
    const domain = urlObj.hostname.replace("www.", "");

    // Helper function to get meta tag content
    const getMeta = (property: string): string | null => {
      // Try Open Graph tags
      let element = doc.querySelector(`meta[property="${property}"]`);
      if (element) {
        return element.getAttribute("content");
      }

      // Try name attribute
      element = doc.querySelector(`meta[name="${property}"]`);
      if (element) {
        return element.getAttribute("content");
      }

      return null;
    };

    // Extract metadata with fallbacks
    const title =
      getMeta("og:title") ||
      getMeta("twitter:title") ||
      doc.querySelector("title")?.textContent ||
      domain;

    const description =
      getMeta("og:description") ||
      getMeta("twitter:description") ||
      getMeta("description") ||
      "";

    const image =
      getMeta("og:image") ||
      getMeta("twitter:image") ||
      "";

    const metadata: LinkMetadataResponse = {
      title: title.trim(),
      description: description.trim(),
      image: image.trim(),
      domain,
    };

    console.log("Extracted metadata:", metadata);

    return new Response(JSON.stringify(metadata), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in fetch-link-metadata function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
