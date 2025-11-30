import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { getAvatarUrlSync } from "@/lib/avatar-utils";

interface ProfileSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: Session;
}

const ProfileSettings = ({ open, onOpenChange, session }: ProfileSettingsProps) => {
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const avatarUrl = getAvatarUrlSync(session.user.email);

  useEffect(() => {
    if (open) {
      fetchProfile();
    }
  }, [open]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from("user_profiles")
      .select("display_name")
      .eq("user_id", session.user.id)
      .single();

    if (data) {
      setDisplayName(data.display_name);
    } else {
      setDisplayName(session.user.email?.split("@")[0] || "");
    }
  };

  const handleSave = async () => {
    if (!displayName.trim()) {
      toast.error("Display name is required");
      return;
    }

    setLoading(true);

    const { data: existing } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("user_id", session.user.id)
      .single();

    if (existing) {
      await supabase
        .from("user_profiles")
        .update({
          display_name: displayName,
        })
        .eq("user_id", session.user.id);
    } else {
      await supabase.from("user_profiles").insert({
        user_id: session.user.id,
        display_name: displayName,
      });
    }

    setLoading(false);
    toast.success("Profile updated!");
    onOpenChange(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onOpenChange(false);
    toast.success("Signed out");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card/95 backdrop-blur-lg border-border max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarUrl || undefined} />
              <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                {displayName[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                {session.user.email === "j@froydinger.com"
                  ? "Your avatar is the Win The Night logo"
                  : "Your avatar shows your initial"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="display-name">Display Name</Label>
            <Input
              id="display-name"
              type="text"
              placeholder="Your name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="bg-background/50"
            />
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="border-destructive text-destructive hover:bg-destructive/10"
              disabled={loading}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
            <Button
              onClick={handleSave}
              disabled={loading}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSettings;
