import type { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { defaultSiteSettings, type SiteSettings } from "../../src/lib/site-settings";

const ADMIN_EMAILS = new Set(["jake@winthenight.info"]);
const SETTINGS_KEY = "site-settings";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
};

function getUserEmail(event: Parameters<Handler>[0]) {
  const user = event.clientContext?.user as { email?: string } | undefined;
  return user?.email?.toLowerCase() || "";
}

function sanitizeBoolean(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

function sanitizeString(value: unknown, fallback: string) {
  return typeof value === "string" ? value.trim() : fallback;
}

function sanitizeSettings(input: Partial<SiteSettings>): SiteSettings {
  return {
    trailer_visible: sanitizeBoolean(input.trailer_visible, defaultSiteSettings.trailer_visible),
    trailer_button_text: sanitizeString(input.trailer_button_text, defaultSiteSettings.trailer_button_text),
    trailer_video_id: sanitizeString(input.trailer_video_id, defaultSiteSettings.trailer_video_id),
    main_playlist_id: sanitizeString(input.main_playlist_id, defaultSiteSettings.main_playlist_id),
    editors_pick_video_id: sanitizeString(input.editors_pick_video_id, defaultSiteSettings.editors_pick_video_id),
    watch_latest_playlist_id: sanitizeString(input.watch_latest_playlist_id, defaultSiteSettings.watch_latest_playlist_id),
    watch_latest_button_text: sanitizeString(input.watch_latest_button_text, defaultSiteSettings.watch_latest_button_text),
    watch_latest_button_link: sanitizeString(input.watch_latest_button_link, defaultSiteSettings.watch_latest_button_link),
    cta_featured_video_id: sanitizeString(input.cta_featured_video_id, defaultSiteSettings.cta_featured_video_id),
    about_intro_video_id: sanitizeString(input.about_intro_video_id, defaultSiteSettings.about_intro_video_id),
    about_featured_video_id: sanitizeString(input.about_featured_video_id, defaultSiteSettings.about_featured_video_id),
    about_featured_title: sanitizeString(input.about_featured_title, defaultSiteSettings.about_featured_title),
    about_featured_description: sanitizeString(input.about_featured_description, defaultSiteSettings.about_featured_description),
    about_jake_bio: sanitizeString(input.about_jake_bio, defaultSiteSettings.about_jake_bio),
    about_josh_bio: sanitizeString(input.about_josh_bio, defaultSiteSettings.about_josh_bio),
    chatbot_system_prompt: sanitizeString(input.chatbot_system_prompt, defaultSiteSettings.chatbot_system_prompt),
    watch_latest_auto: sanitizeBoolean(input.watch_latest_auto, defaultSiteSettings.watch_latest_auto),
    watch_latest_override_id: sanitizeString(input.watch_latest_override_id, defaultSiteSettings.watch_latest_override_id),
  };
}

async function readSettings() {
  const store = getStore("wtn-admin");
  const stored = await store.get(SETTINGS_KEY, { type: "json" });
  return { ...defaultSiteSettings, ...((stored || {}) as Partial<SiteSettings>) };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod === "GET") {
    const settings = await readSettings();
    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ settings }),
    };
  }

  if (event.httpMethod !== "PUT") {
    return { statusCode: 405, headers: corsHeaders, body: "Method not allowed" };
  }

  const email = getUserEmail(event);
  if (!ADMIN_EMAILS.has(email)) {
    return {
      statusCode: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Admin access required" }),
    };
  }

  const body = JSON.parse(event.body || "{}") as { settings?: Partial<SiteSettings> };
  const settings = sanitizeSettings(body.settings || {});
  const store = getStore("wtn-admin");
  await store.setJSON(SETTINGS_KEY, settings);

  return {
    statusCode: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    body: JSON.stringify({ settings }),
  };
};
