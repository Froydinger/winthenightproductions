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
import { getAvatarUrlSync } from "@/lib/avatar-utils";
import { normalizeUrl } from "@/lib/url-utils";
import { FileImage, X } from "lucide-react";
import GifPicker from "./GifPicker";

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
  const [gifUrl, setGifUrl] = useState<string>("");
  const [showGifPicker, setShowGifPicker] = useState(false);

  const fetchProfile = async () => {
    if (!session?.user) return;

    const { data } = await supabase
      .from("user_profiles")
      .select("display_name")
      .eq("user_id", session.user.id)
      .single();

    setUserProfile(data);
  };

  useEffect(() => {
    if (session?.user) {
      fetchProfile();
    }
  }, [session?.user?.id]);

  const avatarUrl = session?.user ? getAvatarUrlSync(session.user.email) : null;

  const handleGifSelect = (gifUrl: string) => {
    setGifUrl(gifUrl);
  };

  const clearGif = () => {
    setGifUrl("");
  };

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

    // Normalize URL (add https:// if missing)
    const normalizedUrl = youtubeUrl ? normalizeUrl(youtubeUrl) : null;

    // Build post data - only include media fields if they have values
    const postData: any = {
      user_id: userId,
      display_name: displayName,
      avatar_url: avatarUrl,
      content,
      youtube_url: normalizedUrl,
      is_anonymous: isAnonymous,
    };

    // TODO: Re-enable GIF support once Lovable applies the migration
    // Only add GIF if it exists
    // if (gifUrl) postData.gif_url = gifUrl;

    const { error } = await supabase.from("posts").insert(postData);

    if (error) {
      toast.error("Failed to create post");
      console.error("Error creating post:", error);
      return;
    }

    setContent("");
    setYoutubeUrl("");
    setGifUrl("");
    setIsAnonymous(false);
    toast.success("Post created!");
    onPostCreated();
  };

  const hasGif = gifUrl;

  return (
    <Card className="bg-card/80 backdrop-blur-lg border-border p-4 sm:p-6">
      <div className="flex items-start gap-3 sm:gap-4">
        <Avatar className="shrink-0">
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
            className="min-h-[100px] bg-background/50 resize-none w-full"
          />

          {/* GIF Preview */}
          {hasGif && (
            <div className="relative rounded-lg overflow-hidden border-2 border-primary/20">
              <img src={gifUrl} alt="GIF preview" className="w-full max-h-96 object-cover" />
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={clearGif}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
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

          {/* GIF Button */}
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowGifPicker(true)}
              disabled={!session || hasGif}
              className="flex items-center gap-2"
            >
              <FileImage className="h-4 w-4" />
              GIF
            </Button>

            {!session && (
              <p className="text-xs text-muted-foreground w-full">
                Sign in to add GIFs
              </p>
            )}
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
                <Button variant="outline" onClick={onSignInClick} className="flex-1 sm:flex-none">
                  Sign In
                </Button>
                <Button onClick={handleSubmit} disabled={!content.trim()} className="flex-1 sm:flex-none">
                  Post Anonymously
                </Button>
              </div>
            ) : (
              <Button onClick={handleSubmit} disabled={!content.trim()} className="w-full sm:w-auto">
                Post
              </Button>
            )}
          </div>
        </div>
      </div>

      <GifPicker
        open={showGifPicker}
        onOpenChange={setShowGifPicker}
        onSelectGif={handleGifSelect}
      />
    </Card>
  );
};

export default CreatePost;
