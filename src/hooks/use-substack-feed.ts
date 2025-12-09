import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

export const useSubstackFeed = () => {
  return useQuery({
    queryKey: ["substack-feed"],
    queryFn: async (): Promise<SubstackPost[]> => {
      try {
        console.log("Fetching Substack feed via edge function...");

        const { data, error } = await supabase.functions.invoke("fetch-substack");

        if (error) {
          console.error("Edge function error:", error);
          return [];
        }

        if (data?.posts && data.posts.length > 0) {
          console.log("Fetched", data.posts.length, "posts from Substack");
          console.log("First post sample:", {
            title: data.posts[0]?.title,
            hasContent: !!data.posts[0]?.content,
            hasAudioUrl: !!data.posts[0]?.audioUrl,
            isPodcast: data.posts[0]?.isPodcast
          });
          return data.posts;
        }

        console.warn("No posts returned from edge function");
        return [];
      } catch (error) {
        console.error("Error fetching Substack feed:", error);
        return [];
      }
    },
    staleTime: 1 * 60 * 1000, // Cache for 1 minute (reduced for testing)
    refetchOnWindowFocus: true, // Refetch when window gains focus
    retry: 2,
    retryDelay: 1000,
  });
};
