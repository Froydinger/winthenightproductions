import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Info, Shield, Save, LogOut } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { SiteCard } from "@/components/site/SiteCard";
import { defaultSiteSettings, fetchSiteSettings, type SiteSettings } from "@/lib/site-settings";

const ADMIN_EMAIL = "jake@winthenight.info";

const fieldClass = "bg-background/60 border border-neon-blue/20 focus:border-neon-blue focus-visible:ring-neon-blue/30";
const sectionNoteClass = "text-sm text-muted-foreground leading-relaxed";

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
        lede="Manage the live site settings for the current Win The Night layout."
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
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Header Trailer</h2>
            <p className={sectionNoteClass}>Controls the optional trailer button in the site header.</p>
          </div>
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
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Event RSVP Pop-up</h2>
            <p className={sectionNoteClass}>
              Site-wide RSVP pill with a live countdown and a pop-up (countdown, RSVP link, add-to-calendar). Reuse it for any future event: update the fields, flip the toggle on. It hides itself automatically once the event end time passes, and reappears for everyone when you change the event.
            </p>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-neon-blue/20 bg-background/40 px-4 py-3">
            <Label htmlFor="event-cta-enabled">Show event RSVP pill</Label>
            <Switch id="event-cta-enabled" checked={settings.event_cta_enabled} onCheckedChange={(value) => update("event_cta_enabled", value)} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <TextField label="Pill Text (desktop)" value={settings.event_cta_pill_text} onChange={(value) => update("event_cta_pill_text", value)} />
            <TextField label="Pill Text (mobile, keep it short)" value={settings.event_cta_pill_text_short} onChange={(value) => update("event_cta_pill_text_short", value)} />
            <TextField label="Event Title" value={settings.event_cta_title} onChange={(value) => update("event_cta_title", value)} />
            <TextField label="Event Details Line (date · time · venue)" value={settings.event_cta_details} onChange={(value) => update("event_cta_details", value)} />
            <TextField label="Location (for calendar invites)" value={settings.event_cta_location} onChange={(value) => update("event_cta_location", value)} />
            <TextField label="RSVP / Invite Link" value={settings.event_cta_url} onChange={(value) => update("event_cta_url", value)} />
            <TextField label="RSVP Button Text" value={settings.event_cta_button_text} onChange={(value) => update("event_cta_button_text", value)} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <TextField label="Event Start" value={settings.event_cta_start} onChange={(value) => update("event_cta_start", value)} />
            <TextField label="Event End (pill disappears after this)" value={settings.event_cta_end} onChange={(value) => update("event_cta_end", value)} />
          </div>
          <div className="flex gap-3 rounded-xl border border-neon-blue/20 bg-neon-blue/10 px-4 py-3 text-sm text-foreground">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-neon-blue" />
            <div>
              <p className="font-semibold">Start/End format: 2026-11-08T18:00:00-06:00</p>
              <p className="text-muted-foreground">That's date T time, then the timezone offset (-06:00 is Chicago in November, -05:00 in summer). The countdown and calendar button both use these.</p>
            </div>
          </div>
        </SiteCard>

        <SiteCard variant="strong" className="space-y-5">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Watch Page</h2>
            <p className={sectionNoteClass}>
              The big hero video is automatic and always uses the first item in the Win The Night podcast playlist. These settings only control the supporting video areas.
            </p>
          </div>
          <div className="flex gap-3 rounded-xl border border-neon-blue/20 bg-neon-blue/10 px-4 py-3 text-sm text-foreground">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-neon-blue" />
            <div>
              <p className="font-semibold">Top Watch video is not admin-overridable.</p>
              <p className="text-muted-foreground">It reads the podcast playlist directly, so keeping that playlist sorted keeps the site current.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <TextField label="Editor's Pick Video ID" value={settings.editors_pick_video_id} onChange={(value) => update("editors_pick_video_id", value)} />
            <TextField label="CTA Featured Video ID" value={settings.cta_featured_video_id} onChange={(value) => update("cta_featured_video_id", value)} />
          </div>
        </SiteCard>

        <SiteCard variant="strong" className="space-y-5">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Home Latest Section</h2>
            <p className={sectionNoteClass}>Controls the embedded playlist and button in the latest-watch area outside the Watch page hero.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <TextField label="Watch Latest Playlist ID" value={settings.watch_latest_playlist_id} onChange={(value) => update("watch_latest_playlist_id", value)} />
            <TextField label="Watch Latest Button Text" value={settings.watch_latest_button_text} onChange={(value) => update("watch_latest_button_text", value)} />
            <TextField label="Watch Latest Button Link" value={settings.watch_latest_button_link} onChange={(value) => update("watch_latest_button_link", value)} />
            <TextField label="Main Playlist ID" value={settings.main_playlist_id} onChange={(value) => update("main_playlist_id", value)} />
            <TextField label="Manual Latest Video ID" value={settings.watch_latest_override_id} onChange={(value) => update("watch_latest_override_id", value)} />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-neon-blue/20 bg-background/40 px-4 py-3">
            <div>
              <Label htmlFor="watch-latest-auto">Auto-select latest video where supported</Label>
              <p className="text-xs text-muted-foreground">Leave this on unless you need a manual override in components that support it.</p>
            </div>
            <Switch id="watch-latest-auto" checked={settings.watch_latest_auto} onCheckedChange={(value) => update("watch_latest_auto", value)} />
          </div>
        </SiteCard>

        <SiteCard variant="strong" className="space-y-5">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">About Page</h2>
            <p className={sectionNoteClass}>Controls the intro video, featured episode, and team bios on the About page.</p>
          </div>
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
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Arc Chat</h2>
            <p className={sectionNoteClass}>Controls the system prompt used by the site chat helper.</p>
          </div>
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
