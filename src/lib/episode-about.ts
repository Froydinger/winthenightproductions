export type EpisodeAbout = { kind: "bio" | "guest" | "notes"; paragraphs: string[] };

const bioHeading = /^(?:about (?:our |the |today['’]s )?guests?|meet (?:our |the |today['’]s )?guests?|(?:our |special )?guests?(?: (?:bio|biography|spotlight))?)(?:\s*[:–—-]\s*(.*))?$/iu;
const chapterHeading = /^(?:chapters?|timestamps?|time stamps?|jump around|episode chapters|time codes?)\s*[:.!]?$/iu;
const timestamp = /^\s*\[?(?:\d{1,2}:)?\d{1,3}:\d{2}\b/u;
const footer = /^(?:subscribe\b|follow\b|find us\b|connect with\b|watch\s+(?:part|the|on|more|next|our|full)\b|listen\s+(?:on|to)\b|(?:please )?like[, &]|let us know\b|edited by\b|credits?\s*:|disclaimer\s*:|this (?:channel|episode|content) is for educational purposes\b|want help making\b|website\s*:|instagram\s*:|facebook\s*:|substack\s*:|(?:more )?links\s*:|#\w|(?:https?:\/\/|www\.)\S)/iu;
// Recognize an actual guest introduction, not a name scraped from an episode title.
const guestName = String.raw`(?:Dr\.\s+)?(?!(?:Josh Lopez|Jake Freudinger|Win The Night)\b)\p{Lu}[\p{L}’'.-]+(?:\s+\p{Lu}[\p{L}’'.-]+){1,3}`;
const namedIntro = new RegExp(
  String.raw`(?:^(?:[^.!?]{0,100}\s)?${guestName}(?:, [^.!?]{2,100},)?\s+(?:joins|sits down with|shares (?:his|her|their) story|talks with us|started|grew up|is (?:a|an)\b)|(?:sits down with|talks with|conversation with|interview with|\bguest)\s+(?:guest\s+)?${guestName}|\b[Jj]oin (?:us (?:as|with) )?(?:[^.!?]{0,60}\s)?${guestName}\s+as\b)`,
  "u"
);
const noGuest = /\b(?:no guest(?:s)? (?:this time|today|this week)|(?:host|co-founder)-only)\b/iu;
const start = /^[\s#*_[\]>*~–—\p{Extended_Pictographic}\uFE0F]+/u;
const words = (line: string) => line.trim().split(/\s+/u).length;
const labelText = (line: string) => line.replace(start, "").replace(/[*_#]+$/gu, "").trim();
const isFooter = (line: string) => footer.test(labelText(line)) || /^#\w/u.test(line);

function asParagraph(lines: string[]) {
  return lines
    .join(" ")
    .replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/giu, "$1")
    .replace(/https?:\/\/\S+/giu, "")
    .replace(/([*_]{1,2})(.+?)\1/gu, "$2")
    .replace(/\s{2,}/gu, " ")
    .trim();
}

function bounded(paragraphs: string[], limit: number) {
  const result: string[] = [];
  for (const text of paragraphs.slice(0, 3)) {
    const remaining = limit - result.join(" ").length - (result.length ? 1 : 0);
    if (text.length <= remaining) {
      result.push(text);
    } else if (remaining >= 80) {
      const excerpt = text.slice(0, remaining - 1);
      result.push(excerpt.slice(0, excerpt.lastIndexOf(" ")).trimEnd() + "…");
      break;
    } else {
      break;
    }
  }
  return result;
}

/** Use the episode publisher's own words. Never generate guest facts from a title or a missing bio. */
export function getEpisodeAbout(description?: string | null): EpisodeAbout | null {
  if (typeof description !== "string" || !description.trim()) return null;
  const lines = description.slice(0, 6000).replace(/\r\n?/gu, "\n").split("\n").map(line => line.trim());

  for (let index = 0; index < lines.length; index++) {
    const match = labelText(lines[index]).match(bioHeading);
    if (!match) continue;
    const inline = match[1]?.replace(/^\*+\s*/u, "").trim();
    // A bare "Guest: Name" is a credit, not a biography.
    if (inline && !/(?:\s[–—-]\s|:\s|,\s|\bis\s+|\bare\s+)/iu.test(inline)) continue;
    const blocks: string[][] = inline ? [[inline]] : [];
    let current: string[] = [];
    let started = Boolean(inline);
    for (const line of lines.slice(index + 1)) {
      const label = labelText(line);
      if (!line) {
        if (current.length) blocks.push(current);
        current = [];
        if (started) break;
        continue;
      }
      if (isFooter(line) || timestamp.test(label) || chapterHeading.test(label) || bioHeading.test(label)) break;
      current.push(line);
      started = true;
    }
    if (current.length) blocks.push(current);
    const paragraphs = bounded(blocks.map(asParagraph).filter(line => words(line) >= 5), 1000);
    if (paragraphs.length) return { kind: "bio", paragraphs };
  }

  const notes: string[] = [];
  let current: string[] = [];
  function finish() {
    const paragraph = asParagraph(current);
    if (words(paragraph) >= 6 && /\p{L}/u.test(paragraph)) notes.push(paragraph);
    current = [];
  }
  for (const line of lines) {
    const label = labelText(line);
    if (chapterHeading.test(label) || timestamp.test(label) || bioHeading.test(label)) break;
    if (!line || isFooter(line)) {
      finish();
      if (notes.length >= 3 || (notes.length && isFooter(line))) break;
      continue;
    }
    current.push(line);
  }
  finish();
  if (!notes.length) return null;
  const introduction = !noGuest.test(notes.join(" ")) && notes.slice(0, 3).find(p => namedIntro.test(p));
  if (introduction) return { kind: "guest", paragraphs: bounded([introduction], 950) };
  return { kind: "notes", paragraphs: bounded(notes, 950) };
}
