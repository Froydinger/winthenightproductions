import { ChevronDown } from "lucide-react";
import { getEpisodeAbout } from "@/lib/episode-about";

type Props = { episode?: { videoId: string; description?: string | null }; className?: string };

export default function EpisodeAbout({ episode, className = "" }: Props) {
  if (!episode || !/^[\w-]{11}$/.test(episode.videoId)) return null;
  const about = getEpisodeAbout(episode.description);
  if (!about) return null;

  const label = about.kind === "bio" ? "Guest bio" : about.kind === "guest" ? "About the guest" : "About this episode";

  return (
    <details key={episode.videoId} className={`group rounded-lg border border-[#252525] bg-[#0d0d0d] text-left ${className}`}>
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-lg px-4 py-3 text-sm font-semibold text-white hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00d9ff] sm:px-5 [&::-webkit-details-marker]:hidden">
        {label}
        <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-[#00d9ff] motion-safe:transition-transform group-open:rotate-180" />
      </summary>
      <div className="space-y-3 border-t border-[#252525] px-4 py-4 sm:px-5">
        {about.paragraphs.map((paragraph, i) => (
          <p key={i} className="max-w-prose break-words text-sm leading-relaxed text-neutral-200 sm:text-base">{paragraph}</p>
        ))}
        <a
          href={`https://www.youtube.com/watch?v=${episode.videoId}`}
          className="inline-block text-sm font-medium text-[#00d9ff] underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00d9ff]"
        >
          Full description on YouTube
        </a>
      </div>
    </details>
  );
}
