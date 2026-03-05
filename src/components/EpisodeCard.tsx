import { format } from "date-fns";
import { Play } from "lucide-react";
import type { PlaylistItem } from "@/hooks/use-playlist-items";

interface EpisodeCardProps {
  item: PlaylistItem;
  isActive: boolean;
  onClick: () => void;
}

const EpisodeCard = ({ item, isActive, onClick }: EpisodeCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`group relative rounded-xl overflow-hidden border transition-all duration-300 text-left w-full ${
        isActive
          ? "border-primary ring-2 ring-primary/30 shadow-lg shadow-primary/20"
          : "border-border/50 hover:border-primary/50 hover:shadow-md"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Play overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isActive
              ? "bg-primary/20 opacity-100"
              : "bg-background/0 opacity-0 group-hover:bg-background/40 group-hover:opacity-100"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              isActive
                ? "bg-primary text-primary-foreground scale-100"
                : "bg-primary/80 text-primary-foreground scale-90 group-hover:scale-100"
            }`}
          >
            <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
          </div>
        </div>
        {/* Now playing badge */}
        {isActive && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-primary text-primary-foreground text-xs font-bold">
            Now Playing
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 bg-card">
        <h3
          className={`text-sm font-semibold line-clamp-2 leading-snug mb-1 transition-colors ${
            isActive ? "text-primary" : "text-foreground group-hover:text-primary"
          }`}
        >
          {item.title}
        </h3>
        <p className="text-xs text-muted-foreground">
          {format(new Date(item.publishedAt), "MMM d, yyyy")}
        </p>
      </div>
    </button>
  );
};

export default EpisodeCard;
