import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import PostCard from "@/components/updates/PostCard";
import CreatePost from "@/components/updates/CreatePost";
import ProfileSettings from "@/components/updates/ProfileSettings";
import AuthDialog from "@/components/updates/AuthDialog";
import { Button } from "@/components/ui/button";
import { LogIn, Settings } from "lucide-react";

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

const Updates = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [showAuth, setShowAuth] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .single();
    
    setIsAdmin(!!data);
  };

  useEffect(() => {
    fetchPosts();

    const channel = supabase
      .channel("posts")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
        },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
  };

  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <div className="fixed top-0 left-0 right-0 h-[20vh] z-30 pointer-events-none">
        <div
          className="absolute inset-0 backdrop-blur-md"
          style={{
            opacity: 0.6,
            maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          }}
        />
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-[20vh] z-30 pointer-events-none">
        <div
          className="absolute inset-0 backdrop-blur-md"
          style={{
            opacity: 0.6,
            maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          }}
        />
      </div>

      <Header />

      <div className="relative z-10 container mx-auto px-4 py-24 max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-foreground">Updates</h1>
          <div className="flex gap-2">
            {session ? (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowSettings(true)}
                className="border-border hover:bg-accent"
              >
                <Settings className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setShowAuth(true)}
                className="border-border hover:bg-accent"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>

        <CreatePost
          session={session}
          onPostCreated={fetchPosts}
          onSignInClick={() => setShowAuth(true)}
          isAdmin={isAdmin}
        />

        <div className="space-y-6 mt-8">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              session={session}
              onDelete={fetchPosts}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      </div>

      <Footer />

      <AuthDialog open={showAuth} onOpenChange={setShowAuth} />
      {session && (
        <ProfileSettings
          open={showSettings}
          onOpenChange={setShowSettings}
          session={session}
        />
      )}
    </main>
  );
};

export default Updates;
