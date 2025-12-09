import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  thumbnail: string;
  description: string;
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
          return data.posts;
        }
        
        console.warn("No posts returned from edge function");
        return [];
      } catch (error) {
        console.error("Error fetching Substack feed:", error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: 1000,
  });
};
