import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface LinkMetadataResponse {
  title: string;
  description: string;
  image: string;
  domain: string;
}

// List of blocked IP ranges (private/internal networks)
const blockedPatterns = [
  /^localhost$/i,
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^192\.168\./,
  /^0\.0\.0\.0$/,
  /^::1$/,
  /^fc00:/i,
  /^fd00:/i,
  /^fe80:/i,
  /^169\.254\./,
  /\.local$/i,
  /\.internal$/i,
  /\.localhost$/i,
];

// Validate URL to prevent SSRF attacks
const validateUrl = (urlString: unknown): { valid: true; url: URL } | { valid: false; error: string } => {
  // Check if URL is provided
  if (!urlString || typeof urlString !== 'string') {
    return { valid: false, error: 'URL is required' };
  }

  // Check length
  if (urlString.length > 2048) {
    return { valid: false, error: 'URL is too long' };
  }

  // Parse URL
  let url: URL;
  try {
    url = new URL(urlString);
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }

  // Only allow http and https protocols
  if (!['http:', 'https:'].includes(url.protocol)) {
    return { valid: false, error: 'Only HTTP and HTTPS URLs are allowed' };
  }

  // Check for blocked patterns (internal IPs and hostnames)
  const hostname = url.hostname.toLowerCase();
  for (const pattern of blockedPatterns) {
    if (pattern.test(hostname)) {
      return { valid: false, error: 'Access to internal URLs is not allowed' };
    }
  }

  // Block URLs with credentials
  if (url.username || url.password) {
    return { valid: false, error: 'URLs with credentials are not allowed' };
  }

  return { valid: true, url };
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Validate URL
    const validation = validateUrl(body?.url);
    if (!validation.valid) {
      console.error("URL validation error:", validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { url } = validation;
    console.log("Fetching metadata for:", url.href);

    // Fetch with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(url.href, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LinkPreviewBot/1.0)",
        "Accept": "text/html",
      },
      signal: controller.signal,
      redirect: "follow",
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`);
    }

    // Check content type
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      return new Response(
        JSON.stringify({ 
          title: "", 
          description: "", 
          image: "", 
          domain: url.hostname.replace("www.", "") 
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Limit response size (1MB max)
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 1024 * 1024) {
      return new Response(
        JSON.stringify({ error: 'Response too large' }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    if (!doc) {
      throw new Error("Failed to parse HTML");
    }

    // Extract domain
    const domain = url.hostname.replace("www.", "");

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

    let image =
      getMeta("og:image") ||
      getMeta("twitter:image") ||
      "";

    // Convert relative image URLs to absolute
    if (image && !image.startsWith('http')) {
      try {
        image = new URL(image, url.href).href;
      } catch {
        image = "";
      }
    }

    const metadata: LinkMetadataResponse = {
      title: title.trim(),
      description: description.trim(),
      image: image.trim(),
      domain,
    };

    console.log("Extracted metadata for:", domain);

    return new Response(JSON.stringify(metadata), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in fetch-link-metadata function:", errorMessage);
    // Don't expose internal error details
    return new Response(
      JSON.stringify({ error: "Failed to fetch link metadata" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
