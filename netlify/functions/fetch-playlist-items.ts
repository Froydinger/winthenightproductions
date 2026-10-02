import type { Handler } from "@netlify/functions";
import { fetchPlaylist } from "../lib/youtube.ts";
const headers = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "content-type", "Content-Type": "application/json" };
export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers, body: "" };
  if (event.httpMethod !== "GET") return { statusCode: 405, headers, body: "Method not allowed" };
  const playlistId = event.queryStringParameters?.playlistId;
  if (!playlistId || !/^[A-Za-z0-9_-]{10,100}$/.test(playlistId)) return { statusCode: 400, headers, body: JSON.stringify({ error: "A valid playlistId is required" }) };
  try {
    return { statusCode: 200, headers, body: JSON.stringify({ items: await fetchPlaylist(playlistId) }) };
  } catch {
    return { statusCode: 502, headers, body: JSON.stringify({ error: "Playlist temporarily unavailable" }) };
  }
};
