import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Trash2, Send, Pencil } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import LinkPreview from "./LinkPreview";

interface Post {
  id: string;
  display_name: string;
  avatar_url: string | null;
  content: string;
  youtube_url: string | null;
  media_url?: string | null;
  media_type?: string | null;
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
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [editUrl, setEditUrl] = useState(post.youtube_url || "");

  useEffect(() => {
    fetchLikes();
    fetchReplies();
  }, [post.id, session]);

  const fetchLikes = async () => {
    // Count likes directly from post_likes table
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
      // Fetch current avatars from user_profiles for non-anonymous replies
      // Only authenticated users can access user_profiles
      const userIds = data
        .filter(reply => reply.user_id && !reply.is_anonymous)
        .map(reply => reply.user_id)
        .filter((id, index, self) => id && self.indexOf(id) === index); // unique IDs

      let avatarMap: Record<string, string | null> = {};

      if (session && userIds.length > 0) {
        const { data: profiles } = await supabase
          .from("user_profiles")
          .select("user_id, avatar_url")
          .in("user_id", userIds);

        if (profiles) {
          avatarMap = profiles.reduce((acc, profile) => {
            acc[profile.user_id] = profile.avatar_url;
            return acc;
          }, {} as Record<string, string | null>);
        }
      }

      // Update replies with current avatars
      const repliesWithCurrentAvatars = data.map(reply => ({
        ...reply,
        avatar_url: reply.user_id && !reply.is_anonymous && avatarMap[reply.user_id] !== undefined
          ? avatarMap[reply.user_id]
          : reply.avatar_url
      }));

      setReplies(repliesWithCurrentAvatars);
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

  const handleEdit = () => {
    setEditContent(post.content);
    setEditUrl(post.youtube_url || "");
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(post.content);
    setEditUrl(post.youtube_url || "");
  };

  const handleSaveEdit = async () => {
    if (!editContent.trim()) {
      toast.error("Post content cannot be empty");
      return;
    }

    const canEdit = session?.user?.id === post.user_id;
    if (!canEdit) {
      toast.error("You don't have permission to edit this post");
      return;
    }

    const { error } = await supabase
      .from("posts")
      .update({
        content: editContent.trim(),
        youtube_url: editUrl.trim() || null,
      })
      .eq("id", post.id);

    if (error) {
      toast.error("Failed to update post");
      console.error("Error updating post:", error);
      return;
    }

    toast.success("Post updated!");
    setIsEditing(false);
    // Update local post data
    post.content = editContent.trim();
    post.youtube_url = editUrl.trim() || null;
  };

  // Pin functionality removed - is_pinned column not in schema

  const getVideoEmbedInfo = (url: string) => {
    if (!url) return null;

    // YouTube
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
      return {
        type: 'youtube' as const,
        id: youtubeMatch[1],
        embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=0`
      };
    }

    // Vimeo
    const vimeoRegex = /(?:vimeo\.com\/)(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
      return {
        type: 'vimeo' as const,
        id: vimeoMatch[1],
        embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`
      };
    }

    // Not a recognized video URL
    return null;
  };

  const videoInfo = post.youtube_url ? getVideoEmbedInfo(post.youtube_url) : null;
  const isVideoUrl = !!videoInfo;
  const isLinkUrl = post.youtube_url && !isVideoUrl;

  // Debug logging
  if (post.youtube_url) {
    console.log('Post URL:', post.youtube_url);
    console.log('Video info:', videoInfo);
    console.log('Is video URL:', isVideoUrl);
    console.log('Is link URL:', isLinkUrl);
  }

  return (
    <Card className="bg-card/80 backdrop-blur-lg p-4 sm:p-6 border-border">
      <div className="mb-4">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-foreground">{post.display_name}</p>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </p>
          </div>
          {(session?.user?.id === post.user_id || isAdmin) && (
            <div className="flex gap-1 shrink-0">
              {session?.user?.id === post.user_id && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleEdit}
                  className="text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-3 mb-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Content</label>
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="What's on your mind?"
              className="min-h-[100px] bg-background/50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">URL (optional)</label>
            <Textarea
              value={editUrl}
              onChange={(e) => setEditUrl(e.target.value)}
              placeholder="Add a YouTube/Vimeo video or link..."
              className="min-h-[60px] bg-background/50"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSaveEdit} size="sm">
              Save Changes
            </Button>
            <Button onClick={handleCancelEdit} variant="outline" size="sm">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-foreground mb-4 whitespace-pre-wrap break-words">{post.content}</p>

          {/* Media Attachment */}
          {post.media_url && post.media_type && (
            <div className="mb-4 rounded-lg overflow-hidden border-2 border-primary/20">
              {post.media_type === 'video' ? (
                <video
                  src={post.media_url}
                  controls
                  className="w-full max-h-[600px]"
                  preload="metadata"
                />
              ) : (
                <img
                  src={post.media_url}
                  alt={post.media_type === 'gif' ? 'GIF' : 'Post image'}
                  className="w-full max-h-[600px] object-cover"
                  loading="lazy"
                />
              )}
            </div>
          )}

          {/* Video embed for YouTube, Vimeo, etc. */}
          {isVideoUrl && videoInfo && (
            <div className="mb-4 rounded-lg overflow-hidden aspect-video border-2 border-neon-blue/20">
              <iframe
                className="w-full h-full"
                src={videoInfo.embedUrl}
                title={`${videoInfo.type} video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Link preview for non-video URLs */}
          {isLinkUrl && post.youtube_url && (
            <div className="mb-4">
              <LinkPreview url={post.youtube_url} />
            </div>
          )}
        </>
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
          {replies.map((reply) => {
            return (
            <div key={reply.id} className="py-2">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm text-foreground">{reply.display_name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                </p>
              </div>
              <p className="text-sm text-foreground mt-1">{reply.content}</p>
            </div>
            );
          })}

          <div className="flex gap-2 items-start">
            <Textarea
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="min-h-[60px] bg-background/50 flex-1"
            />
            <div className="flex flex-col gap-2 shrink-0">
              <Button size="icon" onClick={handleReply} disabled={!replyContent.trim()}>
                <Send className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant={isAnonymous ? "default" : "outline"}
                onClick={() => setIsAnonymous(!isAnonymous)}
                className="text-xs px-2"
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
