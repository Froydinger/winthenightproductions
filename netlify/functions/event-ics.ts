import type { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { defaultSiteSettings, type SiteSettings } from "../../src/lib/site-settings";

const SETTINGS_KEY = "site-settings";

const toIcsDate = (ms: number) =>
  new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

const escapeIcsText = (value: string) => value.replace(/\\/g, "\\\\").replace(/([,;])/g, "\\$1");

export const handler: Handler = async () => {
  let settings = defaultSiteSettings;
  try {
    const store = getStore("wtn-admin");
    const stored = await store.get(SETTINGS_KEY, { type: "json" });
    settings = { ...defaultSiteSettings, ...((stored || {}) as Partial<SiteSettings>) };
  } catch {
    // fall back to defaults if the blob store is unavailable
  }

  const start = Date.parse(settings.event_cta_start);
  const parsedEnd = Date.parse(settings.event_cta_end);
  const end = !Number.isNaN(parsedEnd) ? parsedEnd : start + 6 * 3600000;

  if (Number.isNaN(start)) {
    return { statusCode: 302, headers: { Location: settings.event_cta_url }, body: "" };
  }

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Win The Night//Event//EN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:event-${start}@winthenight.org`,
    `DTSTAMP:${toIcsDate(Date.now())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${escapeIcsText(settings.event_cta_title)}`,
    `DESCRIPTION:RSVP: ${settings.event_cta_url}`,
    `LOCATION:${escapeIcsText(settings.event_cta_location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="event.ics"',
      "Cache-Control": "no-cache",
    },
    body: ics,
  };
};
