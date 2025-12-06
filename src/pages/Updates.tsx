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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LogIn, Settings, ChevronLeft, ChevronRight } from "lucide-react";

import { Tables } from "@/integrations/supabase/types";

type Post = Tables<'posts'>;

const Updates = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<Post[]>([]);
  const [showAuth, setShowAuth] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [likedPage, setLikedPage] = useState(1);
  const [totalLikedPosts, setTotalLikedPosts] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
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
    if (activeTab === "all") {
      fetchPosts();
    } else if (activeTab === "liked") {
      fetchLikedPosts();
    }

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
          if (activeTab === "all") {
            fetchPosts();
          } else if (activeTab === "liked") {
            fetchLikedPosts();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentPage, likedPage, activeTab]);

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
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } else if (data) {
      // Fetch current avatars from user_profiles for non-anonymous posts
      // Only authenticated users can access user_profiles
      const userIds = data
        .filter(post => post.user_id && !post.is_anonymous)
        .map(post => post.user_id)
        .filter((id, index, self) => id && self.indexOf(id) === index); // unique IDs

      let avatarMap: Record<string, string | null> = {};

      if (session && userIds.length > 0) {
        const { data: profiles } = await supabase
          .from("user_profiles")
          .select("user_id, avatar_url")
          .in("user_id", userIds);

        if (profiles) {
          avatarMap = profiles.reduce((acc, profile) => {
            acc[profile.user_id!] = profile.avatar_url;
            return acc;
          }, {} as Record<string, string | null>);
        }
      }

      // Update posts with current avatars
      const postsWithCurrentAvatars = data.map(post => ({
        ...post,
        avatar_url: post.user_id && !post.is_anonymous && avatarMap[post.user_id] !== undefined
          ? avatarMap[post.user_id]
          : post.avatar_url
      }));

      setPosts(postsWithCurrentAvatars);
    }
  };

  const fetchLikedPosts = async () => {
    if (!session?.user) {
      setLikedPosts([]);
      setTotalLikedPosts(0);
      return;
    }

    // Get total count of liked posts
    const { count } = await supabase
      .from("post_likes")
      .select("*", { count: "exact", head: true })
      .eq("user_id", session.user.id);

    setTotalLikedPosts(count || 0);

    // Get paginated liked posts
    const from = (likedPage - 1) * postsPerPage;
    const to = from + postsPerPage - 1;

    const { data: likes, error } = await supabase
      .from("post_likes")
      .select("post_id")
      .eq("user_id", session.user.id)
      .range(from, to);

    if (!error && likes) {
      const postIds = likes.map((like) => like.post_id);

      if (postIds.length > 0) {
        const { data: postsData } = await supabase
          .from("posts")
          .select("*")
          .in("id", postIds)
          .order("created_at", { ascending: false });

        if (postsData) {
          // Fetch current avatars from user_profiles for non-anonymous posts
          const userIds = postsData
            .filter(post => post.user_id && !post.is_anonymous)
            .map(post => post.user_id)
            .filter((id, index, self) => id && self.indexOf(id) === index); // unique IDs

          let avatarMap: Record<string, string | null> = {};

          if (userIds.length > 0) {
            const { data: profiles } = await supabase
              .from("user_profiles")
              .select("user_id, avatar_url")
              .in("user_id", userIds);

            if (profiles) {
              avatarMap = profiles.reduce((acc, profile) => {
                acc[profile.user_id!] = profile.avatar_url;
                return acc;
              }, {} as Record<string, string | null>);
            }
          }

          // Update posts with current avatars
          const postsWithCurrentAvatars = postsData.map(post => ({
            ...post,
            avatar_url: post.user_id && !post.is_anonymous && avatarMap[post.user_id] !== undefined
              ? avatarMap[post.user_id]
              : post.avatar_url
          }));

          setLikedPosts(postsWithCurrentAvatars);
        }
      } else {
        setLikedPosts([]);
      }
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
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Timeline</h1>
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
                className="border-border hover:bg-accent animate-glow"
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="liked" disabled={!session}>
              Liked Posts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                session={session}
                onDelete={fetchPosts}
                isAdmin={isAdmin}
              />
            ))}

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
          </TabsContent>

          <TabsContent value="liked" className="space-y-6">
            {likedPosts.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>You haven't liked any posts yet.</p>
              </div>
            ) : (
              <>
                {likedPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    session={session}
                    onDelete={fetchLikedPosts}
                    isAdmin={isAdmin}
                  />
                ))}

                {/* Pagination Controls for Liked Posts */}
                {totalLikedPosts > postsPerPage && (
                  <div className="flex items-center justify-center gap-4 mt-8 pb-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLikedPage((prev) => Math.max(1, prev - 1))}
                      disabled={likedPage === 1}
                      className="border-border hover:bg-accent"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Page {likedPage} of {Math.ceil(totalLikedPosts / postsPerPage)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setLikedPage((prev) =>
                          Math.min(Math.ceil(totalLikedPosts / postsPerPage), prev + 1)
                        )
                      }
                      disabled={likedPage >= Math.ceil(totalLikedPosts / postsPerPage)}
                      className="border-border hover:bg-accent"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
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
