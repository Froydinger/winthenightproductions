// src/pages/Admin.tsx
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Shield, Save, Eye } from "lucide-react";

/**
 * Explicit table typing fixes "never" and union-with-error issues.
 * Adjust this to match your actual Supabase schema if different.
 */
type UserRole = { user_id: string; role: string };

// Assumes watch_settings has a single row keyed by id.
type WatchSettings = {
  id: number;
  cta_video_id: string | null;
};

const Admin = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [ctaVideoId, setCtaVideoId] = useState("");

  useEffect(() => {
    // Fire and forget; internal function handles navigation.
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error(sessionError);
      toast.error("Failed to get session");
      navigate("/updates");
      return;
    }

    if (!session) {
      navigate("/updates");
      return;
    }

    setSession(session);

    // Check if user is admin
    const { data: roleData, error: roleError } = await supabase
      .from<UserRole>("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (roleError) {
      console.error(roleError);
      toast.error("Failed to verify role");
      navigate("/");
      return;
    }

    if (!roleData) {
      navigate("/");
      toast.error("Access denied. Admin only.");
      return;
    }

    setIsAdmin(true);
    await loadSettings();
    setLoading(false);
  };

  const loadSettings = async () => {
    // Use typed table to ensure cta_video_id is recognized.
    const { data, error } = await supabase
      .from<WatchSettings>("watch_settings")
      .select("id, cta_video_id")
      .eq("id", 1)
      .maybeSingle();

    if (error) {
      console.error(error);
      toast.error("Failed to load settings");
      return;
    }

    if (data) {
      setCtaVideoId(data.cta_video_id ?? "");
    }
  };

  const handleSave = async () => {
    const trimmed = ctaVideoId.trim();
    if (!trimmed) {
      toast.error("Please enter a video ID");
      return;
    }

    setSaving(true);

    // Ensure payload matches schema exactly.
    const { error } = await supabase.from<WatchSettings>("watch_settings").upsert(
      {
        id: 1,
        cta_video_id: trimmed,
      },
      {
        onConflict: "id", // ensure single-row behavior when id is PK/unique
        ignoreDuplicates: false,
      },
    );

    if (error) {
      console.error(error);
      toast.error("Failed to save settings");
    } else {
      toast.success("Watch page CTA updated successfully!");
    }

    setSaving(false);
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

      <div className="relative z-10 container mx-auto px-4 py-20 sm:py-24 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-neon-blue" />
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Admin Dashboard</h1>
        </div>

        <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Watch Page CTA</h2>
              <p className="text-muted-foreground mb-6">Manage the hero video on the /watch page</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="videoId" className="text-foreground mb-2 block">
                  YouTube Video ID
                </Label>
                <Input
                  id="videoId"
                  value={ctaVideoId}
                  onChange={(e) => setCtaVideoId(e.target.value)}
                  placeholder="e.g., dQw4w9WgXcQ"
                  className="bg-background/50 border-border"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Enter the YouTube video ID (the part after "v=" in the URL)
                </p>
              </div>

              {ctaVideoId && (
                <div className="space-y-2">
                  <Label className="text-foreground">Preview</Label>
                  <div className="aspect-video rounded-xl overflow-hidden bg-card border border-border/50">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${ctaVideoId}`}
                      title="Video Preview"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-neon-blue hover:bg-neon-blue/90 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>

                {ctaVideoId && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(`https://youtu.be/${ctaVideoId}`, "_blank")}
                    className="border-border hover:bg-accent"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View on YouTube
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/watch")}
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back to Watch Page
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Admin;
