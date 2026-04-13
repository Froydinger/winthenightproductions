import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import ProfileSettings from "@/components/updates/ProfileSettings";
import AuthDialog from "@/components/updates/AuthDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  Settings,
  Calendar,
  PlayCircle,
  BookOpen,
  MessageCircle,
  Heart,
  ExternalLink,
  Users,
  Mail,
} from "lucide-react";
import { useSubstackFeed } from "@/hooks/use-substack-feed";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

const Dashboard = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [profile, setProfile] = useState<{ display_name: string; avatar_url: string | null } | null>(null);
  const [stats, setStats] = useState({ posts: 0, likes: 0 });
  const navigate = useNavigate();
  const { data: blogPosts } = useSubstackFeed();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session?.user) {
      fetchProfile();
      fetchStats();
    }
  }, [session?.user?.id]);

  const fetchProfile = async () => {
    if (!session?.user) return;
    const { data } = await supabase
      .from("user_profiles")
      .select("display_name, avatar_url")
      .eq("user_id", session.user.id)
      .single();
    if (data) setProfile(data);
    else setProfile({ display_name: session.user.email?.split("@")[0] || "User", avatar_url: null });
  };

  const fetchStats = async () => {
    if (!session?.user) return;
    const [{ count: postCount }, { count: likeCount }] = await Promise.all([
      supabase.from("posts").select("*", { count: "exact", head: true }).eq("user_id", session.user.id),
      supabase.from("post_likes").select("*", { count: "exact", head: true }).eq("user_id", session.user.id),
    ]);
    setStats({ posts: postCount || 0, likes: likeCount || 0 });
  };

  if (!session) {
    return (
      <main className="min-h-screen relative">
        <div className="fixed inset-0 z-0"><AnimatedBackground /></div>
        <Header />
        <div className="relative z-10 container mx-auto px-4 py-24 max-w-lg text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Your Dashboard</h1>
          <p className="text-muted-foreground mb-6">Sign in to access your personal hub.</p>
          <Button onClick={() => setShowAuth(true)} className="bg-primary text-primary-foreground">
            Sign In
          </Button>
        </div>
        <Footer />
        <AuthDialog open={showAuth} onOpenChange={setShowAuth} />
      </main>
    );
  }

  const recentBlogPosts = blogPosts?.slice(0, 3) || [];

  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 z-0"><AnimatedBackground /></div>
      <Header />

      <div className="relative z-10 container mx-auto px-4 py-20 sm:py-24 max-w-4xl">
        {/* Profile Header */}
        <Card className="p-6 bg-card border-border mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-20 w-20 ring-4 ring-primary/30">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                {profile?.display_name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-foreground">{profile?.display_name}</h1>
              <p className="text-sm text-muted-foreground">{session.user.email}</p>
              <div className="flex gap-4 mt-3 justify-center sm:justify-start">
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{stats.posts}</p>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{stats.likes}</p>
                  <p className="text-xs text-muted-foreground">Likes</p>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowSettings(true)}
              className="border-border hover:bg-accent"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-6 border-border hover:border-primary/50 hover:bg-primary/5"
            onClick={() => navigate("/updates")}
          >
            <MessageCircle className="h-6 w-6 text-primary" />
            <span className="text-sm">Community</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-6 border-border hover:border-primary/50 hover:bg-primary/5"
            onClick={() => navigate("/watch")}
          >
            <PlayCircle className="h-6 w-6 text-primary" />
            <span className="text-sm">Watch</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-6 border-border hover:border-primary/50 hover:bg-primary/5"
            onClick={() => navigate("/blog")}
          >
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-sm">Blog</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-6 border-neon-blue/40 hover:border-neon-blue hover:bg-neon-blue/10 animate-pulse"
            onClick={() => setShowCalendly(true)}
          >
            <Calendar className="h-6 w-6 text-neon-blue" />
            <span className="text-sm text-neon-blue font-semibold">Book a Call</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Blog Posts */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Recent Blog Posts
              </h2>
              <Button variant="ghost" size="sm" onClick={() => navigate("/blog")} className="text-primary hover:text-primary/80">
                View All <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <div className="space-y-4">
              {recentBlogPosts.length > 0 ? recentBlogPosts.map((post, i) => (
                <a
                  key={i}
                  href={`/blog/${encodeURIComponent(post.guid || post.link)}`}
                  className="block p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <div className="flex gap-3">
                    {post.thumbnail && (
                      <img src={post.thumbnail} alt="" className="w-16 h-12 rounded object-cover shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-2">{post.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(post.pubDate), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </a>
              )) : (
                <p className="text-sm text-muted-foreground">Loading blog posts...</p>
              )}
            </div>
          </Card>

          {/* Watch & Explore */}
          <Card className="p-6 bg-card border-border">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4">
              <PlayCircle className="h-5 w-5 text-primary" />
              Watch & Explore
            </h2>
            <div className="space-y-3">
              <a
                href="/watch"
                className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                <PlayCircle className="h-8 w-8 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Watch Episodes</p>
                  <p className="text-xs text-muted-foreground">Catch up on the latest Win The Night™ episodes</p>
                </div>
              </a>
              <a
                href="/updates"
                className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                <Users className="h-8 w-8 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Community Timeline</p>
                  <p className="text-xs text-muted-foreground">Join the conversation and share updates</p>
                </div>
              </a>
              <a
                href="/support"
                className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                <Heart className="h-8 w-8 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Support Win The Night™</p>
                  <p className="text-xs text-muted-foreground">Help us keep the conversation going</p>
                </div>
              </a>
            </div>
          </Card>
        </div>
      </div>

      <Footer />

      {/* Cal.com Discovery Call Dialog */}
      <Dialog open={showCalendly} onOpenChange={setShowCalendly}>
        <DialogContent className="max-w-2xl h-[80vh] bg-card border-border p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-foreground">Book a Discovery Call</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden px-4 pb-4">
            <iframe
              src="https://calendly.com/jkrd09/podcast-discovery"
              className="w-full h-full rounded-lg border-0"
              style={{ minHeight: "600px" }}
              title="Schedule a Discovery Call"
            />
          </div>
        </DialogContent>
      </Dialog>

      <ProfileSettings
        open={showSettings}
        onOpenChange={setShowSettings}
        session={session}
        onProfileUpdate={fetchProfile}
      />
      <AuthDialog open={showAuth} onOpenChange={setShowAuth} />
    </main>
  );
};

export default Dashboard;
