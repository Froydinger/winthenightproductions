import logo from "@/assets/win-the-night-productions-logo.png";

/**
 * Get the avatar URL for a user
 * - j@froydinger.com gets the app logo
 * - Everyone else gets null (will show initials)
 */
export const getAvatarUrl = async (userId: string | null, userEmail?: string): Promise<string | null> => {
  // If email is provided and it's the admin, return logo
  if (userEmail === "j@froydinger.com") {
    return logo;
  }

  // If we have a userId but no email, fetch the email to check
  if (userId && !userEmail) {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data } = await supabase.auth.getUser();

    if (data.user?.email === "j@froydinger.com") {
      return logo;
    }
  }

  // Everyone else gets null (will display initials)
  return null;
};

/**
 * Get avatar URL for display - synchronous version when you already have the email
 */
export const getAvatarUrlSync = (userEmail?: string | null): string | null => {
  if (userEmail === "j@froydinger.com") {
    return logo;
  }
  return null;
};
