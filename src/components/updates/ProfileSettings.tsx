import { useState, useEffect, useRef } from "react";
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
import { LogOut, Camera, Loader2, Trash2 } from "lucide-react";

interface ProfileSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: Session;
}

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

const ProfileSettings = ({ open, onOpenChange, session }: ProfileSettingsProps) => {
  const [displayName, setDisplayName] = useState("");
  const [customAvatarUrl, setCustomAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      fetchProfile();
    }
  }, [open]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from("user_profiles")
      .select("display_name, avatar_url")
      .eq("user_id", session.user.id)
      .single();

    if (data) {
      setDisplayName(data.display_name);
      setCustomAvatarUrl(data.avatar_url);
    } else {
      setDisplayName(session.user.email?.split("@")[0] || "");
      setCustomAvatarUrl(null);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Please use JPG, PNG, or WebP format");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image too large. Max size is 2MB");
      return;
    }

    setUploading(true);

    try {
      // Delete old avatar if exists
      if (customAvatarUrl) {
        const oldPath = customAvatarUrl.split('/avatars/')[1];
        if (oldPath) {
          await supabase.storage.from('avatars').remove([oldPath]);
        }
      }

      // Upload new avatar
      const fileExt = file.name.split('.').pop();
      const fileName = `${session.user.id}/${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.error('Avatar upload error:', error);
        toast.error('Failed to upload avatar');
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(data.path);

      setCustomAvatarUrl(publicUrl);
      toast.success('Avatar uploaded! Click Save to apply.');
    } catch (error) {
      console.error('Avatar upload error:', error);
      toast.error('Failed to upload avatar');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemoveAvatar = async () => {
    if (!customAvatarUrl) return;

    setUploading(true);
    try {
      const oldPath = customAvatarUrl.split('/avatars/')[1];
      if (oldPath) {
        await supabase.storage.from('avatars').remove([oldPath]);
      }
      setCustomAvatarUrl(null);
      toast.success('Avatar removed! Click Save to apply.');
    } catch (error) {
      console.error('Error removing avatar:', error);
      toast.error('Failed to remove avatar');
    } finally {
      setUploading(false);
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

    const profileData = {
      display_name: displayName,
      avatar_url: customAvatarUrl,
    };

    if (existing) {
      await supabase
        .from("user_profiles")
        .update(profileData)
        .eq("user_id", session.user.id);
    } else {
      await supabase.from("user_profiles").insert({
        user_id: session.user.id,
        ...profileData,
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
      <DialogContent className="bg-card/95 backdrop-blur-lg border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Profile Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <Avatar className="h-24 w-24 ring-4 ring-primary/30">
                <AvatarImage src={customAvatarUrl || undefined} />
                <AvatarFallback className="bg-primary/20 text-primary text-3xl">
                  {displayName[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              
              {/* Upload overlay */}
              <div 
                className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {uploading ? (
                  <Loader2 className="h-8 w-8 text-white animate-spin" />
                ) : (
                  <Camera className="h-8 w-8 text-white" />
                )}
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept={ALLOWED_IMAGE_TYPES.join(',')}
              onChange={handleAvatarUpload}
              className="hidden"
            />

            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="border-primary/30 hover:border-primary"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  {customAvatarUrl ? 'Change' : 'Upload'} Avatar
                </Button>
                {customAvatarUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveAvatar}
                    disabled={uploading}
                    className="border-destructive/30 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or WebP. Max 2MB.
              </p>
            </div>
          </div>

          {/* Display Name */}
          <div className="space-y-2">
            <Label htmlFor="display-name">Display Name</Label>
            <Input
              id="display-name"
              type="text"
              placeholder="Your name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="bg-background/50 border-primary/20 focus:border-primary"
            />
          </div>

          {/* Email Display */}
          <div className="space-y-2">
            <Label className="text-muted-foreground">Email</Label>
            <p className="text-sm text-foreground/70 bg-background/30 px-3 py-2 rounded-md">
              {session.user.email}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t border-border">
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
              disabled={loading || uploading}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSettings;
