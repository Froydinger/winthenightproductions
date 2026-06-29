import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Shield, Save, LogOut } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { SiteCard } from "@/components/site/SiteCard";
import { defaultSiteSettings, fetchSiteSettings, type SiteSettings } from "@/lib/site-settings";

const ADMIN_EMAIL = "j@froydinger.com";

const fieldClass = "bg-background/60 border border-neon-blue/20 focus:border-neon-blue focus-visible:ring-neon-blue/30";

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} className={fieldClass} />
    </div>
  );
}

const Admin = () => {
  const [user, setUser] = useState<NetlifyIdentityUser | null>(null);
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL;

  useEffect(() => {
    const identity = window.netlifyIdentity;
    if (!identity) {
      setLoading(false);
      return;
    }

    identity.init();
    setUser(identity.currentUser());

    const handleLogin = (nextUser?: NetlifyIdentityUser) => {
      setUser(nextUser || identity.currentUser());
      identity.close();
    };
    const handleLogout = () => setUser(null);

    identity.on("login", handleLogin);
    identity.on("logout", handleLogout);

    return () => {
      identity.off("login", handleLogin);
      identity.off("logout", handleLogout);
    };
  }, []);

  useEffect(() => {
    fetchSiteSettings().then((nextSettings) => {
      setSettings(nextSettings);
      setLoading(false);
    });
  }, []);

  const update = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const save = async () => {
    if (!isAdmin) return;
    setSaving(true);
    try {
      const token = user?.token?.access_token;
      const response = await fetch("/.netlify/functions/site-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ settings }),
      });

      if (!response.ok) throw new Error("Save failed");
      const data = await response.json();
      setSettings({ ...defaultSiteSettings, ...(data.settings || {}) });
      toast.success("Admin settings saved.");
    } catch {
      toast.error("Could not save settings. Make sure you are signed in as admin.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PageShell>
        <div className="min-h-[60vh] flex items-center justify-center text-foreground/70">Loading admin...</div>
      </PageShell>
    );
  }

  if (!user) {
    return (
      <PageShell>
        <PageHero
          icon={Shield}
          eyebrow="Admin"
          title={<span className="text-neon-blue">Admin Sign In</span>}
          lede="Sign in with Netlify Identity to manage site settings."
        />
        <div className="container mx-auto max-w-xl px-4 pb-20">
          <SiteCard variant="strong" className="text-center">
            <Button onClick={() => window.netlifyIdentity?.open()} className="bg-neon-blue hover:bg-neon-blue/90 text-black font-bold">
              Sign In
            </Button>
          </SiteCard>
        </div>
      </PageShell>
    );
  }

  if (!isAdmin) {
    return (
      <PageShell>
        <PageHero
          icon={Shield}
          eyebrow="Admin"
          title={<span className="text-neon-blue">Access Denied</span>}
          lede={`Signed in as ${user.email || "unknown user"}. Admin access is limited to ${ADMIN_EMAIL}.`}
        />
        <div className="container mx-auto max-w-xl px-4 pb-20">
          <SiteCard variant="strong" className="text-center">
            <Button variant="outline" onClick={() => window.netlifyIdentity?.logout()}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </SiteCard>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHero
        icon={Shield}
        eyebrow="Admin"
        title={
          <>
            Site{" "}
            <span className="text-neon-blue drop-shadow-[0_0_18px_rgba(0,217,255,0.45)]">
              Settings
            </span>
          </>
        }
        lede="Manage the Netlify-hosted settings that replaced the old Supabase admin controls."
      />

      <div className="container mx-auto max-w-5xl px-4 pb-20 space-y-6">
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => window.netlifyIdentity?.logout()}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
          <Button onClick={save} disabled={saving} className="bg-neon-blue hover:bg-neon-blue/90 text-black font-bold">
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>

        <SiteCard variant="strong" className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">Trailer Button</h2>
          <div className="flex items-center justify-between rounded-xl border border-neon-blue/20 bg-background/40 px-4 py-3">
            <Label htmlFor="trailer-visible">Show top-center trailer button</Label>
            <Switch id="trailer-visible" checked={settings.trailer_visible} onCheckedChange={(value) => update("trailer_visible", value)} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <TextField label="Button Text" value={settings.trailer_button_text} onChange={(value) => update("trailer_button_text", value)} />
            <TextField label="Trailer YouTube Video ID" value={settings.trailer_video_id} onChange={(value) => update("trailer_video_id", value)} />
          </div>
        </SiteCard>

        <SiteCard variant="strong" className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">Watch Page</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <TextField label="Main Playlist ID" value={settings.main_playlist_id} onChange={(value) => update("main_playlist_id", value)} />
            <TextField label="Editor's Pick Video ID" value={settings.editors_pick_video_id} onChange={(value) => update("editors_pick_video_id", value)} />
            <TextField label="Watch Latest Playlist ID" value={settings.watch_latest_playlist_id} onChange={(value) => update("watch_latest_playlist_id", value)} />
            <TextField label="Watch Latest Button Text" value={settings.watch_latest_button_text} onChange={(value) => update("watch_latest_button_text", value)} />
            <TextField label="Watch Latest Button Link" value={settings.watch_latest_button_link} onChange={(value) => update("watch_latest_button_link", value)} />
            <TextField label="CTA Featured Video ID" value={settings.cta_featured_video_id} onChange={(value) => update("cta_featured_video_id", value)} />
          </div>
        </SiteCard>

        <SiteCard variant="strong" className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">About Page</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <TextField label="Intro Video ID" value={settings.about_intro_video_id} onChange={(value) => update("about_intro_video_id", value)} />
            <TextField label="Featured Video ID" value={settings.about_featured_video_id} onChange={(value) => update("about_featured_video_id", value)} />
            <TextField label="Featured Title" value={settings.about_featured_title} onChange={(value) => update("about_featured_title", value)} />
          </div>
          <div className="space-y-2">
            <Label>Featured Description</Label>
            <Textarea value={settings.about_featured_description} onChange={(e) => update("about_featured_description", e.target.value)} className={`min-h-[120px] ${fieldClass}`} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Josh Bio</Label>
              <Textarea value={settings.about_josh_bio} onChange={(e) => update("about_josh_bio", e.target.value)} className={`min-h-[120px] ${fieldClass}`} />
            </div>
            <div className="space-y-2">
              <Label>Jake Bio</Label>
              <Textarea value={settings.about_jake_bio} onChange={(e) => update("about_jake_bio", e.target.value)} className={`min-h-[120px] ${fieldClass}`} />
            </div>
          </div>
        </SiteCard>

        <SiteCard variant="strong" className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">Arc Chat</h2>
          <div className="space-y-2">
            <Label>Custom System Prompt</Label>
            <Textarea value={settings.chatbot_system_prompt} onChange={(e) => update("chatbot_system_prompt", e.target.value)} className={`min-h-[180px] ${fieldClass}`} />
          </div>
        </SiteCard>
      </div>
    </PageShell>
  );
};

export default Admin;
