import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Trash2, Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface Post {
  id: string;
  display_name: string;
  avatar_url: string | null;
  content: string;
  youtube_url: string | null;
  is_anonymous: boolean;
  created_at: string;
  user_id: string | null;
}

interface Reply {
  id: string;
  display_name: string;
  avatar_url: string | null;
  content: string;
  is_anonymous: boolean;
  created_at: string;
  user_id: string | null;
}

interface PostCardProps {
  post: Post;
  session: Session | null;
  onDelete: () => void;
  isAdmin: boolean;
}

const PostCard = ({ post, session, onDelete, isAdmin }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyContent, setReplyContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    fetchLikes();
    fetchReplies();
  }, [post.id, session]);

  const fetchLikes = async () => {
    const { count } = await supabase
      .from("post_likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", post.id);

    setLikeCount(count || 0);

    if (session?.user) {
      const { data } = await supabase
        .from("post_likes")
        .select("id")
        .eq("post_id", post.id)
        .eq("user_id", session.user.id)
        .single();

      setLiked(!!data);
    }
  };

  const fetchReplies = async () => {
    const { data } = await supabase
      .from("post_replies")
      .select("*")
      .eq("post_id", post.id)
      .order("created_at", { ascending: true });

    if (data) {
      setReplies(data);
    }
  };

  const handleLike = async () => {
    if (!session?.user) {
      toast.error("Please sign in to like posts");
      return;
    }

    if (liked) {
      await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", post.id)
        .eq("user_id", session.user.id);
    } else {
      await supabase.from("post_likes").insert({
        post_id: post.id,
        user_id: session.user.id,
      });
    }

    fetchLikes();
  };

  const handleReply = async () => {
    if (!replyContent.trim()) return;

    let displayName = "Anonymous";
    let avatarUrl = null;

    if (session?.user && !isAnonymous) {
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("display_name, avatar_url")
        .eq("user_id", session.user.id)
        .single();

      if (profile) {
        displayName = profile.display_name;
        avatarUrl = profile.avatar_url;
      }
    }

    await supabase.from("post_replies").insert({
      post_id: post.id,
      user_id: session?.user && !isAnonymous ? session.user.id : null,
      display_name: displayName,
      avatar_url: avatarUrl,
      content: replyContent,
      is_anonymous: isAnonymous,
    });

    setReplyContent("");
    setIsAnonymous(false);
    fetchReplies();
    toast.success("Reply posted!");
  };

  const handleDelete = async () => {
    const canDelete = session?.user?.id === post.user_id || isAdmin;
    
    if (!canDelete) {
      toast.error("You don't have permission to delete this post");
      return;
    }

    await supabase.from("posts").delete().eq("id", post.id);
    toast.success("Post deleted");
    onDelete();
  };

  const extractYouTubeId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const youtubeId = post.youtube_url ? extractYouTubeId(post.youtube_url) : null;

  return (
    <Card className="bg-card/80 backdrop-blur-lg border-border p-6">
      <div className="flex items-start gap-4 mb-4">
        <Avatar>
          <AvatarImage src={post.avatar_url || undefined} />
          <AvatarFallback className="bg-primary/20 text-primary">
            {post.display_name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">{post.display_name}</p>
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </p>
            </div>
            {(session?.user?.id === post.user_id || isAdmin) && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <p className="text-foreground mb-4 whitespace-pre-wrap">{post.content}</p>

      {youtubeId && (
        <div className="mb-4 rounded-lg overflow-hidden aspect-video">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <div className="flex items-center gap-4 pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={liked ? "text-primary" : "text-muted-foreground"}
        >
          <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-current" : ""}`} />
          {likeCount}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowReplies(!showReplies)}
          className="text-muted-foreground"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          {replies.length}
        </Button>
      </div>

      {showReplies && (
        <div className="mt-4 space-y-4 pt-4 border-t border-border">
          {replies.map((reply) => (
            <div key={reply.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={reply.avatar_url || undefined} />
                <AvatarFallback className="bg-primary/20 text-primary text-xs">
                  {reply.display_name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm text-foreground">{reply.display_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                  </p>
                </div>
                <p className="text-sm text-foreground mt-1">{reply.content}</p>
              </div>
            </div>
          ))}

          <div className="flex gap-2">
            <Textarea
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="min-h-[60px] bg-background/50"
            />
            <div className="flex flex-col gap-2">
              <Button size="icon" onClick={handleReply} disabled={!replyContent.trim()}>
                <Send className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant={isAnonymous ? "default" : "outline"}
                onClick={() => setIsAnonymous(!isAnonymous)}
                className="text-xs"
              >
                Anon
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PostCard;
