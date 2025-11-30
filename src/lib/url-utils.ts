/**
 * Normalize a URL by adding https:// if no protocol is specified
 */
export const normalizeUrl = (url: string): string => {
  if (!url) return url;

  const trimmed = url.trim();

  // If already has protocol, return as is
  if (trimmed.match(/^https?:\/\//i)) {
    return trimmed;
  }

  // Add https:// prefix
  return `https://${trimmed}`;
};
