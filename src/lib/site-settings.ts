export type SiteSettings = {
  trailer_visible: boolean;
  trailer_button_text: string;
  trailer_video_id: string;
  main_playlist_id: string;
  editors_pick_video_id: string;
  watch_latest_playlist_id: string;
  watch_latest_button_text: string;
  watch_latest_button_link: string;
  cta_featured_video_id: string;
  about_intro_video_id: string;
  about_featured_video_id: string;
  about_featured_title: string;
  about_featured_description: string;
  about_jake_bio: string;
  about_josh_bio: string;
  chatbot_system_prompt: string;
};

export const defaultSiteSettings: SiteSettings = {
  trailer_visible: false,
  trailer_button_text: "Watch the Trailer",
  trailer_video_id: "765UBZfeylw",
  main_playlist_id: "PL4DJfmhGyz_7B1Qw7Y7GP1vhgtRTi48LD",
  editors_pick_video_id: "TXzfkLNW4e4",
  watch_latest_playlist_id: "PL4DJfmhGyz_5hmXN0HXLxZkktMB1i0eCS",
  watch_latest_button_text: "Jump straight to Chapter 8",
  watch_latest_button_link: "/watch/chapter-8",
  cta_featured_video_id: "765UBZfeylw",
  about_intro_video_id: "cIHJZUOIPco",
  about_featured_video_id: "UL_ayxMAFqM",
  about_featured_title: "Get a Taste of What We Do",
  about_featured_description:
    "If you get some time to throw this on in the background, it's one of our favorite episodes—a conversation between Josh and his friend, Brandon.",
  about_jake_bio: "Runs the socials, Substack, and YouTube channel.",
  about_josh_bio: "Podcast host offering creative and collaborative insights.",
  chatbot_system_prompt: "",
};

export async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    const response = await fetch("/.netlify/functions/site-settings");
    if (!response.ok) return defaultSiteSettings;
    const data = await response.json();
    return { ...defaultSiteSettings, ...(data.settings || {}) };
  } catch {
    return defaultSiteSettings;
  }
}
