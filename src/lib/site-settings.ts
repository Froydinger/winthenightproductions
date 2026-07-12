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
  watch_latest_auto: boolean;
  watch_latest_override_id: string;
  event_cta_enabled: boolean;
  event_cta_pill_text: string;
  event_cta_pill_text_short: string;
  event_cta_title: string;
  event_cta_details: string;
  event_cta_location: string;
  event_cta_start: string;
  event_cta_end: string;
  event_cta_url: string;
  event_cta_button_text: string;
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
  watch_latest_auto: true,
  watch_latest_override_id: "",
  event_cta_enabled: true,
  event_cta_pill_text: "RSVP for our annual Marine Corps event",
  event_cta_pill_text_short: "RSVP · Marine Corps event",
  event_cta_title: "251st Marine Corps Birthday — Chicago",
  event_cta_details: "Sunday, November 8, 2026 · 6:00 PM – Midnight · Port & Park",
  event_cta_location: "Port & Park, Chicago",
  event_cta_start: "2026-11-08T18:00:00-06:00",
  event_cta_end: "2026-11-09T00:00:00-06:00",
  event_cta_url: "https://invite.social/251st-marine-corps-birthday-chicago",
  event_cta_button_text: "RSVP on invite.social",
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
