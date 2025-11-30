import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ExternalLink, Link as LinkIcon } from "lucide-react";

interface LinkPreviewProps {
  url: string;
}

interface LinkMetadata {
  title: string;
  description: string;
  image: string;
  domain: string;
}

const LinkPreview = ({ url }: LinkPreviewProps) => {
  const [metadata, setMetadata] = useState<LinkMetadata | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetadata();
  }, [url]);

  const fetchMetadata = async () => {
    try {
      // Extract domain for display
      const urlObj = new URL(url);
      const domain = urlObj.hostname.replace('www.', '');

      // Use a link preview API service (you can replace with your own endpoint)
      // For now, we'll create a beautiful fallback with just the domain
      setMetadata({
        title: domain,
        description: url,
        image: "",
        domain: domain
      });

      setLoading(false);
    } catch (error) {
      console.error("Error parsing URL:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-lg border border-border bg-card/40 p-4 animate-pulse">
        <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-muted rounded w-1/2"></div>
      </div>
    );
  }

  if (!metadata) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <Card className="overflow-hidden border-2 border-neon-blue/20 hover:border-neon-blue transition-all duration-300 hover:shadow-neon bg-card/60 backdrop-blur-sm">
        <div className="relative">
          {/* Gradient background as fallback */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 via-primary/10 to-transparent" />

          <div className="relative p-6 flex items-center gap-4">
            {/* Icon */}
            <div className="w-16 h-16 rounded-xl bg-neon-blue/20 flex items-center justify-center flex-shrink-0 group-hover:bg-neon-blue/30 transition-all duration-300 group-hover:scale-110">
              <LinkIcon className="w-8 h-8 text-neon-blue" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground text-lg mb-1 truncate group-hover:text-neon-blue transition-colors">
                    {metadata.title}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate mb-2">
                    {metadata.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-neon-blue">
                    <span className="font-medium">{metadata.domain}</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-neon-blue/10 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-full" />
        </div>
      </Card>
    </a>
  );
};

export default LinkPreview;
