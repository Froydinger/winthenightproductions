import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar, type AdminSection } from "@/components/admin/AdminSidebar";
import {
  Shield,
  Users,
  FileText,
  Heart,
  MessageCircle,
  TrendingUp,
  Calendar,
  UserCog,
  Trash2,
  ExternalLink,
  Video,
  Save,
  Home,
  Bot,
  Mail,
  Send,
  History,
  Eye,
  Edit,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type UserWithRole = {
  id: string;
  email: string;
  created_at: string;
  display_name?: string;
  avatar_url?: string;
  role: 'admin' | 'user' | null;
};

type SiteStats = {
  totalUsers: number;
  totalPosts: number;
  totalLikes: number;
  totalReplies: number;
  recentUsers: number;
};

type Post = {
  id: string;
  display_name: string;
  content: string;
  is_anonymous: boolean;
  created_at: string;
  user_id: string | null;
};

const Admin = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<SiteStats | null>(null);
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserWithRole | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [deletePostDialogOpen, setDeletePostDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [editorsPickVideoId, setEditorsPickVideoId] = useState("");
  const [savingEditorsPick, setSavingEditorsPick] = useState(false);
  const [mainPlaylistId, setMainPlaylistId] = useState("");
  const [savingMainPlaylist, setSavingMainPlaylist] = useState(false);
  const [watchLatestButtonText, setWatchLatestButtonText] = useState("");
  const [watchLatestButtonLink, setWatchLatestButtonLink] = useState("");
  const [watchLatestPlaylistId, setWatchLatestPlaylistId] = useState("");
  const [savingWatchLatest, setSavingWatchLatest] = useState(false);
  const [trailerVideoId, setTrailerVideoId] = useState("");
  const [trailerButtonText, setTrailerButtonText] = useState("");
  const [trailerVisible, setTrailerVisible] = useState(true);
  const [savingTrailer, setSavingTrailer] = useState(false);
  const [chatbotPrompt, setChatbotPrompt] = useState("");
  const [savingChatbot, setSavingChatbot] = useState(false);

  // About page & CTA settings
  const [aboutIntroVideoId, setAboutIntroVideoId] = useState("");
  const [aboutFeaturedVideoId, setAboutFeaturedVideoId] = useState("");
  const [aboutFeaturedTitle, setAboutFeaturedTitle] = useState("");
  const [aboutFeaturedDescription, setAboutFeaturedDescription] = useState("");
  const [aboutJakeBio, setAboutJakeBio] = useState("");
  const [aboutJoshBio, setAboutJoshBio] = useState("");
  const [ctaFeaturedVideoId, setCtaFeaturedVideoId] = useState("");
  const [savingAboutSettings, setSavingAboutSettings] = useState(false);
  const [savingCtaSettings, setSavingCtaSettings] = useState(false);

  // Newsletter broadcast state
  const [broadcastSubject, setBroadcastSubject] = useState("");
  const [broadcastBody, setBroadcastBody] = useState("");
  const [sendingBroadcast, setSendingBroadcast] = useState(false);
  const [broadcastProgress, setBroadcastProgress] = useState("");
  const [sentEmails, setSentEmails] = useState<any[]>([]);
  const [expandedEmailId, setExpandedEmailId] = useState<string | null>(null);
  const [subscriberCount, setSubscriberCount] = useState(0);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      navigate("/updates");
      return;
    }

    setSession(session);

    // Check if user is admin in database only - no client-side whitelist
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .single();

    if (!roleData) {
      navigate("/");
      toast.error("Access denied. Admin only.");
      return;
    }

    setIsAdmin(true);
    await loadStats();
    await loadUsers();
    await loadPosts();
    await loadEditorsPick();
    await loadMainPlaylist();
    await loadWatchLatestSettings();
    await loadTrailerSettings();
    await loadChatbotPrompt();
    await loadAboutSettings();
    await loadCtaSettings();
    await loadSentEmails();
    await loadSubscriberCount();
    setLoading(false);
  };

  const loadStats = async () => {
    try {
      // Get total users
      const { count: totalUsers } = await supabase
        .from("user_profiles")
        .select("*", { count: "exact", head: true });

      // Get total posts
      const { count: totalPosts } = await supabase
        .from("posts")
        .select("*", { count: "exact", head: true });

      // Get total likes
      const { count: totalLikes } = await supabase
        .from("post_likes")
        .select("*", { count: "exact", head: true });

      // Get total replies
      const { count: totalReplies } = await supabase
        .from("post_replies")
        .select("*", { count: "exact", head: true });

      // Get recent users (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const { count: recentUsers } = await supabase
        .from("user_profiles")
        .select("*", { count: "exact", head: true })
        .gte("created_at", sevenDaysAgo.toISOString());

      setStats({
        totalUsers: totalUsers || 0,
        totalPosts: totalPosts || 0,
        totalLikes: totalLikes || 0,
        totalReplies: totalReplies || 0,
        recentUsers: recentUsers || 0,
      });
    } catch (error) {
      console.error("Failed to load stats:", error);
      toast.error("Failed to load statistics");
    }
  };

  const loadUsers = async () => {
    try {
      // Use edge function to get users with emails (requires admin auth)
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        console.error("No session for loading users");
        return;
      }

      const { data, error } = await supabase.functions.invoke("admin-users", {
        body: { action: "list" }
      });

      if (error) {
        console.error("Failed to fetch users via edge function:", error);
        toast.error("Failed to load users");
        return;
      }

      if (data?.users) {
        console.log("Loaded users:", data.users);
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Failed to load users:", error);
      toast.error("Failed to load users");
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'user') => {
    try {
      // Use edge function to set role (bypasses RLS with service role)
      const { data, error } = await supabase.functions.invoke("admin-users", {
        body: { action: "setRole", userId, role: newRole }
      });

      if (error) {
        console.error("Failed to set role:", error);
        toast.error(`Failed to update role: ${error.message}`);
        return;
      }

      if (data?.error) {
        toast.error(`Failed to update role: ${data.error}`);
        return;
      }

      toast.success(`User role updated to ${newRole}`);
      await loadUsers(); // Refresh the list
    } catch (error) {
      console.error("Failed to update role:", error);
      toast.error("Failed to update user role");
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      const { data, error } = await supabase.functions.invoke("admin-users", {
        body: { action: "deleteUser", userId: userToDelete.id }
      });

      if (error) {
        console.error("Failed to delete user:", error);
        toast.error(`Failed to delete user: ${error.message}`);
        return;
      }

      if (data?.error) {
        toast.error(`Failed to delete user: ${data.error}`);
        return;
      }

      toast.success("User deleted successfully");
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      await loadUsers(); // Refresh the list
      await loadStats(); // Refresh stats
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user");
    }
  };

  const confirmDeleteUser = (user: UserWithRole) => {
    if (user.role === 'admin') {
      toast.error("Cannot delete admin users");
      return;
    }
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const loadEditorsPick = async () => {
    try {
      const { data, error } = await supabase
        .from("watch_settings")
        .select("editors_pick_video_id")
        .eq("id", 1)
        .maybeSingle();

      if (error) {
        console.error("Failed to load editor's pick:", error);
        return;
      }

      if (data?.editors_pick_video_id) {
        setEditorsPickVideoId(data.editors_pick_video_id);
      }
    } catch (error) {
      console.error("Failed to load editor's pick:", error);
    }
  };

  const saveEditorsPick = async () => {
    if (!editorsPickVideoId.trim()) {
      toast.error("Please enter a video ID");
      return;
    }

    setSavingEditorsPick(true);
    try {
      const { error } = await supabase
        .from("watch_settings")
        .update({ editors_pick_video_id: editorsPickVideoId.trim() })
        .eq("id", 1);

      if (error) {
        console.error("Failed to save editor's pick:", error);
        toast.error("Failed to save editor's pick");
        return;
      }

      toast.success("Editor's pick updated!");
    } catch (error) {
      console.error("Failed to save editor's pick:", error);
      toast.error("Failed to save editor's pick");
    } finally {
      setSavingEditorsPick(false);
    }
  };

  const loadMainPlaylist = async () => {
    try {
      const { data, error } = await supabase
        .from("watch_settings")
        .select("main_playlist_id")
        .eq("id", 1)
        .maybeSingle();

      if (error) {
        console.error("Failed to load main playlist:", error);
        return;
      }

      if (data?.main_playlist_id) {
        setMainPlaylistId(data.main_playlist_id);
      }
    } catch (error) {
      console.error("Failed to load main playlist:", error);
    }
  };

  const saveMainPlaylist = async () => {
    if (!mainPlaylistId.trim()) {
      toast.error("Please enter a playlist ID");
      return;
    }

    setSavingMainPlaylist(true);
    try {
      const { error } = await supabase
        .from("watch_settings")
        .update({ main_playlist_id: mainPlaylistId.trim() })
        .eq("id", 1);

      if (error) {
        console.error("Failed to save main playlist:", error);
        toast.error("Failed to save main playlist");
        return;
      }

      toast.success("Main playlist updated!");
    } catch (error) {
      console.error("Failed to save main playlist:", error);
      toast.error("Failed to save main playlist");
    } finally {
      setSavingMainPlaylist(false);
    }
  };

  const loadWatchLatestSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("watch_settings")
        .select("watch_latest_button_text, watch_latest_button_link, watch_latest_playlist_id")
        .eq("id", 1)
        .maybeSingle();

      if (error) {
        console.error("Failed to load watch latest settings:", error);
        return;
      }

      if (data) {
        if (data.watch_latest_button_text) setWatchLatestButtonText(data.watch_latest_button_text);
        if (data.watch_latest_button_link) setWatchLatestButtonLink(data.watch_latest_button_link);
        if (data.watch_latest_playlist_id) setWatchLatestPlaylistId(data.watch_latest_playlist_id);
      }
    } catch (error) {
      console.error("Failed to load watch latest settings:", error);
    }
  };

  const saveWatchLatestSettings = async () => {
    setSavingWatchLatest(true);
    try {
      const { error } = await supabase
        .from("watch_settings")
        .update({
          watch_latest_button_text: watchLatestButtonText.trim(),
          watch_latest_button_link: watchLatestButtonLink.trim(),
          watch_latest_playlist_id: watchLatestPlaylistId.trim(),
        })
        .eq("id", 1);

      if (error) {
        console.error("Failed to save watch latest settings:", error);
        toast.error("Failed to save watch latest settings");
        return;
      }

      toast.success("Watch latest settings updated!");
    } catch (error) {
      console.error("Failed to save watch latest settings:", error);
      toast.error("Failed to save watch latest settings");
    } finally {
      setSavingWatchLatest(false);
    }
  };

  const loadTrailerSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("watch_settings")
        .select("trailer_video_id, trailer_button_text, trailer_visible")
        .eq("id", 1)
        .maybeSingle();

      if (error) {
        console.error("Failed to load trailer settings:", error);
        return;
      }

      if (data) {
        if (data.trailer_video_id) setTrailerVideoId(data.trailer_video_id);
        if (data.trailer_button_text) setTrailerButtonText(data.trailer_button_text);
        if (data.trailer_visible !== null) setTrailerVisible(data.trailer_visible);
      }
    } catch (error) {
      console.error("Failed to load trailer settings:", error);
    }
  };

  const saveTrailerSettings = async () => {
    setSavingTrailer(true);
    try {
      const { error } = await supabase
        .from("watch_settings")
        .update({
          trailer_video_id: trailerVideoId.trim(),
          trailer_button_text: trailerButtonText.trim(),
          trailer_visible: trailerVisible,
        })
        .eq("id", 1);

      if (error) {
        console.error("Failed to save trailer settings:", error);
        toast.error("Failed to save trailer settings");
        return;
      }

      toast.success("Trailer settings updated!");
    } catch (error) {
      console.error("Failed to save trailer settings:", error);
      toast.error("Failed to save trailer settings");
    } finally {
      setSavingTrailer(false);
    }
  };

  const loadChatbotPrompt = async () => {
    try {
      const { data, error } = await supabase
        .from("system_settings")
        .select("value")
        .eq("key", "chatbot_system_prompt")
        .maybeSingle();

      if (error) {
        console.error("Failed to load chatbot prompt:", error);
        return;
      }

      if (data?.value) {
        setChatbotPrompt(data.value);
      }
    } catch (error) {
      console.error("Failed to load chatbot prompt:", error);
    }
  };

  const saveChatbotPrompt = async () => {
    setSavingChatbot(true);
    try {
      const { error } = await supabase
        .from("system_settings")
        .update({ value: chatbotPrompt.trim(), updated_at: new Date().toISOString() })
        .eq("key", "chatbot_system_prompt");

      if (error) {
        console.error("Failed to save chatbot prompt:", error);
        toast.error("Failed to save chatbot prompt");
        return;
      }

      toast.success("Chatbot prompt updated!");
    } catch (error) {
      console.error("Failed to save chatbot prompt:", error);
      toast.error("Failed to save chatbot prompt");
    } finally {
      setSavingChatbot(false);
    }
  };

  const loadAboutSettings = async () => {
    try {
      const { data } = await supabase
        .from("watch_settings")
        .select("about_intro_video_id, about_featured_video_id, about_featured_title, about_featured_description, about_jake_bio, about_josh_bio")
        .eq("id", 1)
        .maybeSingle();
      if (data) {
        if (data.about_intro_video_id) setAboutIntroVideoId(data.about_intro_video_id);
        if (data.about_featured_video_id) setAboutFeaturedVideoId(data.about_featured_video_id);
        if (data.about_featured_title) setAboutFeaturedTitle(data.about_featured_title);
        if (data.about_featured_description) setAboutFeaturedDescription(data.about_featured_description);
        if (data.about_jake_bio) setAboutJakeBio(data.about_jake_bio);
        if (data.about_josh_bio) setAboutJoshBio(data.about_josh_bio);
      }
    } catch (error) {
      console.error("Failed to load about settings:", error);
    }
  };

  const saveAboutSettings = async () => {
    setSavingAboutSettings(true);
    try {
      const { error } = await supabase
        .from("watch_settings")
        .update({
          about_intro_video_id: aboutIntroVideoId.trim(),
          about_featured_video_id: aboutFeaturedVideoId.trim(),
          about_featured_title: aboutFeaturedTitle.trim(),
          about_featured_description: aboutFeaturedDescription.trim(),
          about_jake_bio: aboutJakeBio.trim(),
          about_josh_bio: aboutJoshBio.trim(),
        })
        .eq("id", 1);
      if (error) {
        toast.error("Failed to save about page settings");
        return;
      }
      toast.success("About page settings updated!");
    } catch (error) {
      toast.error("Failed to save about page settings");
    } finally {
      setSavingAboutSettings(false);
    }
  };

  const loadCtaSettings = async () => {
    try {
      const { data } = await supabase
        .from("watch_settings")
        .select("cta_featured_video_id")
        .eq("id", 1)
        .maybeSingle();
      if (data?.cta_featured_video_id) setCtaFeaturedVideoId(data.cta_featured_video_id);
    } catch (error) {
      console.error("Failed to load CTA settings:", error);
    }
  };

  const saveCtaSettings = async () => {
    setSavingCtaSettings(true);
    try {
      const { error } = await supabase
        .from("watch_settings")
        .update({ cta_featured_video_id: ctaFeaturedVideoId.trim() })
        .eq("id", 1);
      if (error) {
        toast.error("Failed to save CTA settings");
        return;
      }
      toast.success("CTA featured video updated!");
    } catch (error) {
      toast.error("Failed to save CTA settings");
    } finally {
      setSavingCtaSettings(false);
    }
  };

  const loadSubscriberCount = async () => {
    try {
      const { count } = await supabase
        .from("newsletter_subscribers")
        .select("*", { count: "exact", head: true })
        .eq("active", true);
      setSubscriberCount(count || 0);
    } catch (error) {
      console.error("Failed to load subscriber count:", error);
    }
  };

  const loadSentEmails = async () => {
    try {
      const { data, error } = await supabase
        .from("broadcast_emails")
        .select("*")
        .order("sent_at", { ascending: false })
        .limit(50);

      if (error) {
        console.error("Failed to load sent emails:", error);
        return;
      }
      setSentEmails(data || []);
    } catch (error) {
      console.error("Failed to load sent emails:", error);
    }
  };

  const sendBroadcast = async () => {
    if (!broadcastSubject.trim() || !broadcastBody.trim()) {
      toast.error("Please enter a subject and message body");
      return;
    }

    setSendingBroadcast(true);
    setBroadcastProgress("Fetching subscribers...");

    try {
      // Fetch all active subscribers
      const { data: subscribers, error: subError } = await supabase
        .from("newsletter_subscribers")
        .select("email")
        .eq("active", true);

      if (subError) throw subError;
      if (!subscribers || subscribers.length === 0) {
        toast.error("No active subscribers found");
        setSendingBroadcast(false);
        setBroadcastProgress("");
        return;
      }

      const total = subscribers.length;
      let sent = 0;

      // Send to each subscriber
      for (const sub of subscribers) {
        setBroadcastProgress(`Sending ${sent + 1} of ${total}...`);
        const idKey = `broadcast-${Date.now()}-${sub.email}`;
        await supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "broadcast-update",
            recipientEmail: sub.email,
            idempotencyKey: idKey,
            templateData: {
              subject: broadcastSubject.trim(),
              bodyHtml: broadcastBody.trim(),
            },
          },
        });
        sent++;
      }

      // Save broadcast record
      await supabase.from("broadcast_emails").insert({
        subject: broadcastSubject.trim(),
        body_html: broadcastBody.trim(),
        recipient_count: sent,
        sent_by: session?.user?.id || null,
      });

      toast.success(`Broadcast sent to ${sent} subscribers!`);
      setBroadcastSubject("");
      setBroadcastBody("");
      await loadSentEmails();
    } catch (error) {
      console.error("Broadcast error:", error);
      toast.error("Failed to send broadcast");
    } finally {
      setSendingBroadcast(false);
      setBroadcastProgress("");
    }
  };

  const prefillFromSent = (email: any) => {
    setBroadcastSubject(email.subject);
    setBroadcastBody(email.body_html);
    toast.info("Loaded into composer — edit and resend!");
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("id, display_name, content, is_anonymous, created_at, user_id")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) {
        console.error("Failed to load posts:", error);
        toast.error("Failed to load posts");
        return;
      }

      setPosts(data || []);
    } catch (error) {
      console.error("Failed to load posts:", error);
      toast.error("Failed to load posts");
    }
  };

  const handleDeletePost = async () => {
    if (!postToDelete) return;

    try {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postToDelete.id);

      if (error) {
        console.error("Failed to delete post:", error);
        toast.error("Failed to delete post");
        return;
      }

      toast.success("Post deleted successfully");
      setDeletePostDialogOpen(false);
      setPostToDelete(null);
      await loadPosts();
      await loadStats();
    } catch (error) {
      console.error("Failed to delete post:", error);
      toast.error("Failed to delete post");
    }
  };

  const confirmDeletePost = (post: Post) => {
    setPostToDelete(post);
    setDeletePostDialogOpen(true);
  };

  if (loading) {
    return (
      <main className="min-h-screen relative flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-center">
          <Shield className="h-12 w-12 text-neon-blue mx-auto mb-4 animate-pulse" />
          <p className="text-foreground">Verifying access...</p>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <Header />

      <div className="relative z-10 container mx-auto px-4 py-20 sm:py-24 max-w-7xl">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-neon-blue" />
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Admin Dashboard</h1>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-neon-blue/20">
                  <Users className="h-6 w-6 text-neon-blue" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalUsers}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/20">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Posts</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalPosts}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-pink-500/20">
                  <Heart className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Likes</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalLikes}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-500/20">
                  <MessageCircle className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Replies</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalReplies}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-yellow-500/20">
                  <TrendingUp className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">New (7 days)</p>
                  <p className="text-2xl font-bold text-foreground">{stats.recentUsers}</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Trailer Button Settings */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Video className="h-6 w-6 text-neon-blue" />
            <h2 className="text-2xl font-bold text-foreground">Trailer Button</h2>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Controls the small "Watch the Trailer" button that appears at the top of every page.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-foreground">Visible</label>
              <button
                onClick={() => setTrailerVisible(!trailerVisible)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  trailerVisible ? "bg-neon-blue" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    trailerVisible ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Button Text</label>
              <Input
                value={trailerButtonText}
                onChange={(e) => setTrailerButtonText(e.target.value)}
                placeholder="Watch the Trailer"
                className="max-w-md bg-background/50 border-border"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">YouTube Video ID</label>
              <p className="text-xs text-muted-foreground mb-3">
                e.g. "765UBZfeylw" from youtu.be/765UBZfeylw
              </p>
              <Input
                value={trailerVideoId}
                onChange={(e) => setTrailerVideoId(e.target.value)}
                placeholder="765UBZfeylw"
                className="max-w-md bg-background/50 border-border"
              />
            </div>

            <Button
              onClick={saveTrailerSettings}
              disabled={savingTrailer}
              className="bg-neon-blue hover:bg-neon-blue/90 text-black"
            >
              <Save className="h-4 w-4 mr-2" />
              {savingTrailer ? "Saving..." : "Save Trailer Settings"}
            </Button>
          </div>
        </Card>

        {/* Watch Page Settings */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Video className="h-6 w-6 text-neon-blue" />
            <h2 className="text-2xl font-bold text-foreground">Watch Page Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Editor's Pick Video ID
              </label>
              <p className="text-xs text-muted-foreground mb-3">
                Enter the YouTube video ID (e.g., "dQw4w9WgXcQ" from youtube.com/watch?v=dQw4w9WgXcQ)
              </p>
              <div className="flex gap-3">
                <Input
                  value={editorsPickVideoId}
                  onChange={(e) => setEditorsPickVideoId(e.target.value)}
                  placeholder="Enter YouTube video ID"
                  className="max-w-md bg-background/50 border-border"
                />
                <Button
                  onClick={saveEditorsPick}
                  disabled={savingEditorsPick}
                  className="bg-neon-blue hover:bg-neon-blue/90 text-black"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {savingEditorsPick ? "Saving..." : "Save"}
                </Button>
              </div>
              {editorsPickVideoId && (
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                  <div className="aspect-video max-w-sm rounded-lg overflow-hidden border border-border/50">
                    <iframe
                      src={`https://www.youtube.com/embed/${editorsPickVideoId}`}
                      title="Editor's Pick Preview"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Main Playlist */}
            <div className="border-t border-border/30 pt-4">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Main Watch Page Playlist ID
              </label>
              <p className="text-xs text-muted-foreground mb-3">
                Enter the YouTube playlist ID (e.g., "PL4DJfmhGyz_7B1Qw7Y7GP1vhgtRTi48LD")
              </p>
              <div className="flex gap-3">
                <Input
                  value={mainPlaylistId}
                  onChange={(e) => setMainPlaylistId(e.target.value)}
                  placeholder="Enter YouTube playlist ID"
                  className="max-w-md bg-background/50 border-border"
                />
                <Button
                  onClick={saveMainPlaylist}
                  disabled={savingMainPlaylist}
                  className="bg-neon-blue hover:bg-neon-blue/90 text-black"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {savingMainPlaylist ? "Saving..." : "Save"}
                </Button>
              </div>
              {mainPlaylistId && (
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                  <div className="aspect-video max-w-sm rounded-lg overflow-hidden border border-border/50">
                    <iframe
                      src={`https://www.youtube.com/embed/videoseries?list=${mainPlaylistId}`}
                      title="Main Playlist Preview"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Home Page "Watch Latest" Tile Settings */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Home className="h-6 w-6 text-neon-blue" />
            <h2 className="text-2xl font-bold text-foreground">Home Page – Watch Latest Tile</h2>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Controls the playlist/video embedded on the home page tile, along with the callout button text and link.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Playlist / Video ID
              </label>
              <p className="text-xs text-muted-foreground mb-3">
                YouTube playlist ID (e.g. "PL4DJfmhGyz_5hmXN0HXLxZkktMB1i0eCS") or video ID
              </p>
              <Input
                value={watchLatestPlaylistId}
                onChange={(e) => setWatchLatestPlaylistId(e.target.value)}
                placeholder="PL4DJfmhGyz_5hmXN0HXLxZkktMB1i0eCS"
                className="max-w-md bg-background/50 border-border"
              />
              {watchLatestPlaylistId && (
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                  <div className="aspect-video max-w-sm rounded-lg overflow-hidden border border-border/50">
                    <iframe
                      src={`https://www.youtube.com/embed/videoseries?list=${watchLatestPlaylistId}`}
                      title="Watch Latest Preview"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Button Text
              </label>
              <p className="text-xs text-muted-foreground mb-3">
                e.g. "Jump straight to Chapter 8"
              </p>
              <Input
                value={watchLatestButtonText}
                onChange={(e) => setWatchLatestButtonText(e.target.value)}
                placeholder="Jump straight to Chapter 7"
                className="max-w-md bg-background/50 border-border"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Button Link
              </label>
              <p className="text-xs text-muted-foreground mb-3">
                e.g. "/watch/chapter-8" — the app route the button navigates to
              </p>
              <Input
                value={watchLatestButtonLink}
                onChange={(e) => setWatchLatestButtonLink(e.target.value)}
                placeholder="/watch/chapter-7"
                className="max-w-md bg-background/50 border-border"
              />
            </div>

            <Button
              onClick={saveWatchLatestSettings}
              disabled={savingWatchLatest}
              className="bg-neon-blue hover:bg-neon-blue/90 text-black"
            >
              <Save className="h-4 w-4 mr-2" />
              {savingWatchLatest ? "Saving..." : "Save Watch Latest Settings"}
            </Button>
          </div>
        </Card>

        {/* About Page Settings */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Video className="h-6 w-6 text-neon-blue" />
            <h2 className="text-2xl font-bold text-foreground">About Page Content</h2>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Controls the two videos and the featured episode title/description on the About page.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Intro Video ID</label>
              <p className="text-xs text-muted-foreground mb-2">The "Heart of Our Mission" video at the top</p>
              <Input
                value={aboutIntroVideoId}
                onChange={(e) => setAboutIntroVideoId(e.target.value)}
                placeholder="cIHJZUOIPco"
                className="max-w-md bg-background/50 border-border"
              />
              {aboutIntroVideoId && (
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                  <div className="aspect-video max-w-sm rounded-lg overflow-hidden border border-border/50">
                    <iframe
                      src={`https://www.youtube.com/embed/${aboutIntroVideoId}`}
                      title="About Intro Preview"
                      className="w-full h-full"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border/30 pt-4">
              <label className="text-sm font-medium text-foreground mb-2 block">Featured Episode Title</label>
              <Input
                value={aboutFeaturedTitle}
                onChange={(e) => setAboutFeaturedTitle(e.target.value)}
                placeholder="Get a Taste of What We Do"
                className="max-w-md bg-background/50 border-border"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Featured Episode Description</label>
              <textarea
                value={aboutFeaturedDescription}
                onChange={(e) => setAboutFeaturedDescription(e.target.value)}
                className="w-full max-w-md min-h-[80px] rounded-md border border-border bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="If you get some time to throw this on..."
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Featured Episode Video ID</label>
              <Input
                value={aboutFeaturedVideoId}
                onChange={(e) => setAboutFeaturedVideoId(e.target.value)}
                placeholder="UL_ayxMAFqM"
                className="max-w-md bg-background/50 border-border"
              />
              {aboutFeaturedVideoId && (
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                  <div className="aspect-video max-w-sm rounded-lg overflow-hidden border border-border/50">
                    <iframe
                      src={`https://www.youtube.com/embed/${aboutFeaturedVideoId}`}
                      title="About Featured Preview"
                      className="w-full h-full"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Jake Freudinger – Bio</label>
              <textarea
                value={aboutJakeBio}
                onChange={(e) => setAboutJakeBio(e.target.value)}
                className="w-full max-w-md min-h-[80px] rounded-md border border-border bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Runs the socials, Substack, and YouTube channel."
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Josh Lopez – Bio</label>
              <textarea
                value={aboutJoshBio}
                onChange={(e) => setAboutJoshBio(e.target.value)}
                className="w-full max-w-md min-h-[80px] rounded-md border border-border bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Podcast host offering creative and collaborative insights."
              />
            </div>

            <Button
              onClick={saveAboutSettings}
              disabled={savingAboutSettings}
              className="bg-neon-blue hover:bg-neon-blue/90 text-black"
            >
              <Save className="h-4 w-4 mr-2" />
              {savingAboutSettings ? "Saving..." : "Save About Page Settings"}
            </Button>
          </div>
        </Card>

        {/* Homepage CTA Video */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Home className="h-6 w-6 text-neon-blue" />
            <h2 className="text-2xl font-bold text-foreground">Home Page – CTA Featured Video</h2>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Controls the featured video thumbnail shown in the bottom CTA section of the home page.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">YouTube Video ID</label>
              <Input
                value={ctaFeaturedVideoId}
                onChange={(e) => setCtaFeaturedVideoId(e.target.value)}
                placeholder="765UBZfeylw"
                className="max-w-md bg-background/50 border-border"
              />
              {ctaFeaturedVideoId && (
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                  <img
                    src={`https://img.youtube.com/vi/${ctaFeaturedVideoId}/hqdefault.jpg`}
                    alt="CTA video thumbnail"
                    className="max-w-sm rounded-lg border border-border/50"
                  />
                </div>
              )}
            </div>

            <Button
              onClick={saveCtaSettings}
              disabled={savingCtaSettings}
              className="bg-neon-blue hover:bg-neon-blue/90 text-black"
            >
              <Save className="h-4 w-4 mr-2" />
              {savingCtaSettings ? "Saving..." : "Save CTA Video"}
            </Button>
          </div>
        </Card>


        <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Bot className="h-6 w-6 text-neon-blue" />
            <h2 className="text-2xl font-bold text-foreground">Arc Chatbot</h2>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Defines the chatbot's personality and behavior. It also receives live site context automatically.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">System Prompt</label>
              <textarea
                value={chatbotPrompt}
                onChange={(e) => setChatbotPrompt(e.target.value)}
                className="w-full min-h-[300px] rounded-md border border-border bg-background/50 px-3 py-2 text-sm font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Enter system prompt..."
              />
            </div>

            <Button
              onClick={saveChatbotPrompt}
              disabled={savingChatbot}
              className="bg-neon-blue hover:bg-neon-blue/90 text-black"
            >
              <Save className="h-4 w-4 mr-2" />
              {savingChatbot ? "Saving..." : "Save Chatbot Prompt"}
            </Button>
          </div>
        </Card>

        {/* Newsletter Broadcast Composer */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Send className="h-6 w-6 text-neon-blue" />
            <h2 className="text-2xl font-bold text-foreground">Broadcast Email</h2>
            <span className="ml-auto text-sm text-muted-foreground">
              {subscriberCount} active subscriber{subscriberCount !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Subject Line</label>
              <Input
                value={broadcastSubject}
                onChange={(e) => setBroadcastSubject(e.target.value)}
                placeholder="e.g. New Episode Drop! 🎙️"
                className="bg-background/50 border-border"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Message Body (HTML supported)
              </label>
              <textarea
                value={broadcastBody}
                onChange={(e) => setBroadcastBody(e.target.value)}
                className="w-full min-h-[200px] rounded-md border border-border bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder='<p>Hey fam! We just dropped a new episode...</p>'
              />
            </div>

            {broadcastBody && (
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Preview</label>
                <div
                  className="rounded-lg border border-border bg-white p-4 text-black text-sm"
                  dangerouslySetInnerHTML={{ __html: broadcastBody }}
                />
              </div>
            )}

            {broadcastProgress && (
              <div className="flex items-center gap-2 text-sm text-neon-blue">
                <Loader2 className="w-4 h-4 animate-spin" />
                {broadcastProgress}
              </div>
            )}

            <Button
              onClick={sendBroadcast}
              disabled={sendingBroadcast || !broadcastSubject.trim() || !broadcastBody.trim()}
              className="bg-neon-blue hover:bg-neon-blue/90 text-black"
            >
              <Send className="h-4 w-4 mr-2" />
              {sendingBroadcast ? "Sending..." : `Send to ${subscriberCount} Subscribers`}
            </Button>
          </div>
        </Card>

        {/* Sent Emails History */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <History className="h-6 w-6 text-neon-blue" />
            <h2 className="text-2xl font-bold text-foreground">Sent Emails</h2>
          </div>

          {sentEmails.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No broadcasts sent yet</p>
          ) : (
            <div className="space-y-3">
              {sentEmails.map((email) => (
                <div
                  key={email.id}
                  className="border border-border/50 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedEmailId(expandedEmailId === email.id ? null : email.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-card/50 transition-colors text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{email.subject}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(email.sent_at).toLocaleString()} · {email.recipient_count} recipients
                      </p>
                    </div>
                    {expandedEmailId === email.id ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground ml-2 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground ml-2 flex-shrink-0" />
                    )}
                  </button>

                  {expandedEmailId === email.id && (
                    <div className="border-t border-border/50 p-4 space-y-4">
                      <div
                        className="rounded-lg bg-white p-4 text-black text-sm"
                        dangerouslySetInnerHTML={{ __html: email.body_html }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => prefillFromSent(email)}
                        className="border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10"
                      >
                        <Edit className="w-3 h-3 mr-2" />
                        Edit & Resend
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
          <div className="flex items-center gap-3 mb-6">
            <UserCog className="h-6 w-6 text-neon-blue" />
            <h2 className="text-2xl font-bold text-foreground">User Management</h2>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">User</TableHead>
                  <TableHead className="text-muted-foreground">Email</TableHead>
                  <TableHead className="text-muted-foreground">Role</TableHead>
                  <TableHead className="text-muted-foreground">Joined</TableHead>
                  <TableHead className="text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="border-border">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar_url || undefined} />
                          <AvatarFallback className="bg-primary/20 text-primary text-xs">
                            {user.display_name?.[0]?.toUpperCase() || user.email[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-foreground font-medium">
                          {user.display_name || user.email.split('@')[0]}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">{user.email}</TableCell>
                    <TableCell>
                      {user.role ? (
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                      ) : (
                        <Badge variant="outline">No role</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Select
                          value={user.role || 'none'}
                          onValueChange={(value) => {
                            if (value !== 'none' && value !== user.role) {
                              handleRoleChange(user.id, value as 'admin' | 'user');
                            }
                          }}
                        >
                          <SelectTrigger className="w-[120px] bg-background/50 border-border">
                            <SelectValue placeholder="Set role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No role</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => confirmDeleteUser(user)}
                          disabled={user.role === 'admin'}
                          className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10 disabled:opacity-50 disabled:cursor-not-allowed"
                          title={user.role === 'admin' ? "Cannot delete admin users" : "Delete user"}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {users.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No users found
            </div>
          )}
        </Card>

        {/* Posts Management */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 mt-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-6 w-6 text-neon-blue" />
            <h2 className="text-2xl font-bold text-foreground">Posts Management</h2>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Author</TableHead>
                  <TableHead className="text-muted-foreground">Content</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Posted</TableHead>
                  <TableHead className="text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id} className="border-border">
                    <TableCell>
                      <span className="text-foreground font-medium">
                        {post.is_anonymous ? "Anonymous" : post.display_name}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-foreground line-clamp-2">
                        {post.content}
                      </p>
                    </TableCell>
                    <TableCell>
                      {post.is_anonymous ? (
                        <Badge variant="outline">Anonymous</Badge>
                      ) : (
                        <Badge variant="secondary">Public</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => window.open("/updates", "_blank")}
                          className="h-9 w-9 hover:bg-primary/10 hover:text-primary"
                          title="View in updates"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => confirmDeletePost(post)}
                          className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10"
                          title="Delete post"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {posts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No posts found
            </div>
          )}
        </Card>

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/updates")}
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back to Updates
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-12">
          <Footer />
        </div>
      </div>

      {/* Delete User Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-card/95 backdrop-blur-xl border-2 border-destructive/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              Delete User
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {userToDelete?.display_name || userToDelete?.email}
              </span>
              ? This action cannot be undone and will permanently remove the user and all their data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-background/50 border-border hover:bg-background/70">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Post Confirmation Dialog */}
      <AlertDialog open={deletePostDialogOpen} onOpenChange={setDeletePostDialogOpen}>
        <AlertDialogContent className="bg-card/95 backdrop-blur-xl border-2 border-destructive/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              Delete Post
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to delete this post by{" "}
              <span className="font-semibold text-foreground">
                {postToDelete?.is_anonymous ? "Anonymous" : postToDelete?.display_name}
              </span>
              ? This action cannot be undone and will permanently remove the post and all its replies.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-background/50 border-border hover:bg-background/70">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePost}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Delete Post
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default Admin;
