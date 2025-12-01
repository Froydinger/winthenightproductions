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
import { LogIn, Settings, ChevronLeft, ChevronRight } from "lucide-react";

interface Post {
  id: string;
  display_name: string;
  avatar_url: string | null;
  content: string;
  youtube_url: string | null;
  is_anonymous: boolean;
  created_at: string;
  user_id: string | null;
  is_pinned: boolean;
}

const Updates = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [showAuth, setShowAuth] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 4;

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
  }, [currentPage]);

  const fetchPosts = async () => {
    // Get total count
    const { count } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true });

    setTotalPosts(count || 0);

    // Get paginated posts
    const from = (currentPage - 1) * postsPerPage;
    const to = from + postsPerPage - 1;

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (!error && data) {
      setPosts(data);
    }
  };

  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <Header />

      <div className="relative z-10 container mx-auto px-4 py-20 sm:py-24 max-w-2xl">
        <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Updates</h1>
          <div className="flex gap-2 shrink-0">
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

        {/* Pagination Controls */}
        {totalPosts > postsPerPage && (
          <div className="flex items-center justify-center gap-4 mt-8 pb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="border-border hover:bg-accent"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {Math.ceil(totalPosts / postsPerPage)}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(Math.ceil(totalPosts / postsPerPage), prev + 1)
                )
              }
              disabled={currentPage >= Math.ceil(totalPosts / postsPerPage)}
              className="border-border hover:bg-accent"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
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
