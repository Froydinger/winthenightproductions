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

// Local type for the watch_settings row,
// since it is not in your generated Supabase types.
type WatchSettingsRow = {
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

    // Check if user is admin (j@froydinger.com)
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
    await loadSettings();
    setLoading(false);
  };

  const loadSettings = async () => {
    const { data, error } = (await (supabase as any)
      .from("watch_settings")
      .select("id, cta_video_id")
      .maybeSingle()) as {
      data: WatchSettingsRow | null;
      error: any;
    };

    if (error) {
      console.error("Failed to load watch settings", error);
      return;
    }

    if (data) {
      setCtaVideoId(data.cta_video_id || "");
    }
  };

  const handleSave = async () => {
    if (!ctaVideoId.trim()) {
      toast.error("Please enter a video ID");
      return;
    }

    setSaving(true);

    const { error } = (await (supabase as any).from("watch_settings").upsert({
      id: 1, // Single row for settings
      cta_video_id: ctaVideoId.trim(),
    })) as { error: any };

    if (error) {
      toast.error("Failed to save settings");
      console.error(error);
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
