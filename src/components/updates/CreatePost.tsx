import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { normalizeUrl } from "@/lib/url-utils";
import MediaUpload from "./MediaUpload";

interface CreatePostProps {
  session: Session | null;
  onPostCreated: () => void;
  onSignInClick: () => void;
  isAdmin: boolean;
}

const CreatePost = ({ session, onPostCreated, onSignInClick, isAdmin }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [userProfile, setUserProfile] = useState<{ display_name: string; avatar_url: string | null } | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<{ url: string; type: 'image' | 'video' | 'gif' } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProfile = async () => {
    if (!session?.user) return;

    const { data } = await supabase
      .from("user_profiles")
      .select("display_name, avatar_url")
      .eq("user_id", session.user.id)
      .single();

    setUserProfile(data);
  };

  useEffect(() => {
    if (session?.user) {
      fetchProfile();
    }
  }, [session?.user?.id]);

  const avatarUrl = userProfile?.avatar_url || null;

  const handleMediaSelect = (url: string, type: 'image' | 'video' | 'gif') => {
    setSelectedMedia({ url, type });
  };

  const handleMediaClear = () => {
    setSelectedMedia(null);
  };

  const handleSubmit = async () => {
    if (!content.trim() && !selectedMedia) {
      toast.error("Please write something or add media");
      return;
    }

    if (!session && !isAdmin) {
      toast.error("Please sign in to post");
      return;
    }

    setIsSubmitting(true);

    let displayName = "Anonymous";
    let avatarUrl = null;
    let userId = null;

    if (session?.user && !isAnonymous) {
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("display_name, avatar_url")
        .eq("user_id", session.user.id)
        .single();

      if (profile) {
        displayName = profile.display_name;
        avatarUrl = profile.avatar_url;
      } else {
        displayName = session.user.email?.split("@")[0] || "User";
      }

      userId = session.user.id;
    }

    const normalizedUrl = youtubeUrl ? normalizeUrl(youtubeUrl) : null;

    const { error } = await supabase.from("posts").insert({
      user_id: userId,
      display_name: displayName,
      avatar_url: avatarUrl,
      content,
      youtube_url: normalizedUrl,
      is_anonymous: isAnonymous,
      media_url: selectedMedia?.url || null,
      media_type: selectedMedia?.type || null,
    });

    if (error) {
      console.error("Post error:", error);
      toast.error("Failed to create post");
      setIsSubmitting(false);
      return;
    }

    setContent("");
    setYoutubeUrl("");
    setIsAnonymous(false);
    setSelectedMedia(null);
    toast.success("Post created!");
    onPostCreated();
    setIsSubmitting(false);
  };

  return (
    <Card className="bg-card/80 backdrop-blur-lg border-border p-4 sm:p-6 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
      <div className="flex items-start gap-3 sm:gap-4">
        <Avatar className="shrink-0 ring-2 ring-primary/30">
          <AvatarImage src={!isAnonymous && avatarUrl ? avatarUrl : undefined} />
          <AvatarFallback className="bg-primary/20 text-primary">
            {isAnonymous ? "?" : userProfile?.display_name?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-4 min-w-0">
          <Textarea
            placeholder="Share an update..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] bg-background/50 resize-none w-full border-primary/20 focus:border-primary transition-colors"
          />

          {/* Media Upload Section */}
          {session && (
            <MediaUpload
              userId={session.user.id}
              onMediaSelect={handleMediaSelect}
              onMediaClear={handleMediaClear}
              selectedMedia={selectedMedia}
              disabled={isSubmitting}
            />
          )}

          <div className="space-y-2">
            <Label htmlFor="link-url" className="text-sm text-muted-foreground">
              Add a link (optional)
            </Label>
            <Input
              id="link-url"
              type="text"
              placeholder="google.com or youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="bg-background/50 w-full"
            />
            <p className="text-xs text-muted-foreground">
              No need for https:// - just paste the link!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="anonymous"
                checked={isAnonymous}
                onCheckedChange={setIsAnonymous}
              />
              <Label htmlFor="anonymous" className="text-sm cursor-pointer">
                Post anonymously
              </Label>
            </div>
            {!session ? (
              <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                <Button variant="outline" onClick={onSignInClick} className="flex-1 sm:flex-none border-primary/30 hover:border-primary">
                  Sign In
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={!content.trim() || isSubmitting} 
                  className="flex-1 sm:flex-none bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Post Anonymously
                </Button>
              </div>
            ) : (
              <Button 
                onClick={handleSubmit} 
                disabled={(!content.trim() && !selectedMedia) || isSubmitting} 
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                {isSubmitting ? "Posting..." : "Post"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CreatePost;
