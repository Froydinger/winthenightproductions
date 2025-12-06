import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Shield,
  Users,
  FileText,
  Heart,
  MessageCircle,
  TrendingUp,
  Calendar,
  UserCog
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

const Admin = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<SiteStats | null>(null);
  const [users, setUsers] = useState<UserWithRole[]>([]);

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

    // Check if user is admin in database
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .single();

    // Also check whitelist for bootstrap access
    const whitelistedEmails = ["j@froydinger.com"];
    const userEmail = session.user.email?.toLowerCase();
    const isWhitelisted = userEmail && whitelistedEmails.includes(userEmail);

    if (!roleData && !isWhitelisted) {
      navigate("/");
      toast.error("Access denied. Admin only.");
      return;
    }

    setIsAdmin(true);
    await loadStats();
    await loadUsers();
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
      // Get all users with their profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("user_profiles")
        .select("user_id, display_name, avatar_url, created_at")
        .order("created_at", { ascending: false });

      if (profilesError) {
        console.error("Failed to load profiles:", profilesError);
        toast.error("Failed to load user profiles");
        return;
      }

      if (!profiles) return;

      // Get all user roles
      const { data: roles } = await supabase
        .from("user_roles")
        .select("user_id, role");

      // For client-side, we'll use a workaround to get emails
      // We'll query auth.users through a database function or just show user IDs
      // For now, let's try to get the current user's email and admin status
      const usersWithRoles: UserWithRole[] = [];

      for (const profile of profiles) {
        const userRole = roles?.find(r => r.user_id === profile.user_id);

        // Try to get email from posts (denormalized data)
        const { data: userPost } = await supabase
          .from("posts")
          .select("user_id")
          .eq("user_id", profile.user_id)
          .limit(1)
          .single();

        // For admin panel, we'll need to show a truncated user_id as email fallback
        // In production, you'd want to create a database view or function that safely exposes emails to admins
        usersWithRoles.push({
          id: profile.user_id,
          email: `user_${profile.user_id.substring(0, 8)}`, // Fallback - shows first 8 chars of UUID
          created_at: profile.created_at || new Date().toISOString(),
          display_name: profile.display_name,
          avatar_url: profile.avatar_url,
          role: userRole?.role as 'admin' | 'user' || null,
        });
      }

      setUsers(usersWithRoles);
    } catch (error) {
      console.error("Failed to load users:", error);
      toast.error("Failed to load users");
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'user') => {
    try {
      // Check if user already has a role
      const { data: existingRole } = await supabase
        .from("user_roles")
        .select("id, role")
        .eq("user_id", userId)
        .single();

      if (existingRole) {
        // Update existing role
        await supabase
          .from("user_roles")
          .update({ role: newRole })
          .eq("user_id", userId);
      } else {
        // Insert new role
        await supabase
          .from("user_roles")
          .insert({ user_id: userId, role: newRole });
      }

      toast.success(`User role updated to ${newRole}`);
      await loadUsers(); // Refresh the list
    } catch (error) {
      console.error("Failed to update role:", error);
      toast.error("Failed to update user role");
    }
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

        {/* User Management */}
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
    </main>
  );
};

export default Admin;
