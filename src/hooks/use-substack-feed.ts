import { useQuery } from "@tanstack/react-query";

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

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/fetch-substack`;

export const useSubstackFeed = () => {
  return useQuery({
    queryKey: ["substack-feed"],
    queryFn: async (): Promise<SubstackPost[]> => {
      try {
        console.log("Fetching Substack posts via edge function...");

        const response = await fetch(EDGE_FUNCTION_URL);

        if (!response.ok) {
          console.error("Failed to fetch from edge function:", response.status);
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const allPosts = data.posts || [];

        // Filter out podcast posts - only show blog articles
        const blogPosts = allPosts.filter((post: SubstackPost) => !post.isPodcast);

        console.log("Fetched", allPosts.length, "total posts,", blogPosts.length, "blog posts (filtered out podcasts)");

        if (blogPosts.length > 0) {
          console.log("First blog post sample:", {
            title: blogPosts[0].title,
            hasContent: !!blogPosts[0].content,
            contentLength: blogPosts[0].content?.length || 0,
            isPodcast: blogPosts[0].isPodcast,
          });
        }

        return blogPosts;
      } catch (error) {
        console.error("Error fetching Substack feed:", error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: true,
    retry: 2,
    retryDelay: 1000,
  });
};
