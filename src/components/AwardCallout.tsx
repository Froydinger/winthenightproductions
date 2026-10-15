import { ArrowUpRight, Award } from "lucide-react";

// DRAFT ONLY: deliberately not imported by any public route.
// After public announcement clearance, place below the hero CTAs in Lander.tsx.
// Removing the single status word below is the requested post-confirmation edit.
const award = {
  status: "Nominee",
  title: "Media Innovator Awards 2026",
  issuer: "Corporate Vision",
  url: "https://www.corporatevision-news.com/awards/media-innovator-awards/",
};

const AwardCallout = () => {
  return (
    <aside aria-label="Award recognition" className="mx-auto max-w-xl rounded-2xl border border-amber-300/25 bg-amber-300/5 p-5 text-left sm:p-6">
      <div className="flex items-start gap-4">
        <Award aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-amber-300" />
        <div className="min-w-0 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-200">{award.status}</p>
          <h2 className="text-lg font-semibold text-white">{award.title}</h2>
          <p className="text-sm text-muted-foreground">From {award.issuer}.</p>
          <a href={award.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-amber-200 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200">
            About the awards <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default AwardCallout;
