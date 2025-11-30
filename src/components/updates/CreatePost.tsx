import { useState } from "react";
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
import { getAvatarUrlSync } from "@/lib/avatar-utils";

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
  const [userProfile, setUserProfile] = useState<{ display_name: string } | null>(null);

  const fetchProfile = async () => {
    if (!session?.user) return;

    const { data } = await supabase
      .from("user_profiles")
      .select("display_name")
      .eq("user_id", session.user.id)
      .single();

    setUserProfile(data);
  };

  useState(() => {
    if (session?.user) {
      fetchProfile();
    }
  });

  const avatarUrl = session?.user ? getAvatarUrlSync(session.user.email) : null;

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("Please write something");
      return;
    }

    // Only admins can post non-anonymously without signing in
    if (!session && !isAdmin) {
      toast.error("Please sign in to post");
      return;
    }

    let displayName = "Anonymous";
    let avatarUrl = null;
    let userId = null;

    if (session?.user && !isAnonymous) {
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("display_name")
        .eq("user_id", session.user.id)
        .single();

      if (profile) {
        displayName = profile.display_name;
      } else {
        displayName = session.user.email?.split("@")[0] || "User";
      }

      // Use avatar utility to get logo for j@froydinger.com, null for others
      avatarUrl = getAvatarUrlSync(session.user.email);
      userId = session.user.id;
    }

    const { error } = await supabase.from("posts").insert({
      user_id: userId,
      display_name: displayName,
      avatar_url: avatarUrl,
      content,
      youtube_url: youtubeUrl || null,
      is_anonymous: isAnonymous,
    });

    if (error) {
      toast.error("Failed to create post");
      return;
    }

    setContent("");
    setYoutubeUrl("");
    setIsAnonymous(false);
    toast.success("Post created!");
    onPostCreated();
  };

  return (
    <Card className="bg-card/80 backdrop-blur-lg border-border p-6">
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarImage src={!isAnonymous && avatarUrl ? avatarUrl : undefined} />
          <AvatarFallback className="bg-primary/20 text-primary">
            {isAnonymous ? "?" : userProfile?.display_name?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-4">
          <Textarea
            placeholder="Share an update..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] bg-background/50 resize-none"
          />
          <div className="space-y-2">
            <Label htmlFor="link-url" className="text-sm text-muted-foreground">
              Add a link (optional)
            </Label>
            <Input
              id="link-url"
              type="url"
              placeholder="https://..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="bg-background/50"
            />
            <p className="text-xs text-muted-foreground">
              Videos will embed, links will show a preview
            </p>
          </div>
          <div className="flex items-center justify-between">
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
              <div className="flex gap-2">
                <Button variant="outline" onClick={onSignInClick}>
                  Sign In
                </Button>
                <Button onClick={handleSubmit} disabled={!content.trim()}>
                  Post Anonymously
                </Button>
              </div>
            ) : (
              <Button onClick={handleSubmit} disabled={!content.trim()}>
                Post
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CreatePost;
