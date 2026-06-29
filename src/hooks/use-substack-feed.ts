import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";

export interface SubstackPost {
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

function sanitizeContent(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'b', 'i',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'a', 'img',
      'blockquote', 'code', 'pre',
      'div', 'span',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'figure', 'figcaption'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id'],
    ALLOWED_URI_REGEXP: /^(?:https?|mailto):/i,
    FORBID_TAGS: ['script', 'style', 'iframe', 'form', 'input', 'button', 'object', 'embed'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur']
  });
}

export const useSubstackFeed = () => {
  return useQuery({
    queryKey: ["substack-feed"],
    queryFn: async (): Promise<SubstackPost[]> => {
      console.log("Fetching Substack feed via Netlify function...");

      const response = await fetch("/.netlify/functions/fetch-substack");
      if (!response.ok) {
        throw new Error("Failed to fetch Substack feed");
      }
      const data = await response.json();

      const posts: SubstackPost[] = data?.posts || [];
      console.log(`Got ${posts.length} posts from edge function`);

      // Filter out podcasts and sanitize content
      const blogPosts = posts
        .filter(post => !post.isPodcast)
        .map(post => ({
          ...post,
          content: sanitizeContent(post.content),
        }));

      console.log(`Returning ${blogPosts.length} blog posts`);
      return blogPosts;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
    retryDelay: 2000,
  });
};
