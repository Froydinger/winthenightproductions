import { useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import { IGif } from "@giphy/js-types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Giphy API key — must be configured via VITE_GIPHY_API_KEY env var
const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY || "5RSHv2V2OhtEIm8PF5kZNgI2oIWvwVXj";
const giphyFetch = new GiphyFetch(GIPHY_API_KEY);

interface GifPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectGif: (gifUrl: string) => void;
}

const GifPicker = ({ open, onOpenChange, onSelectGif }: GifPickerProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const fetchGifs = (offset: number) => {
    if (searchTerm.trim()) {
      return giphyFetch.search(searchTerm, { offset, limit: 10 });
    }
    return giphyFetch.trending({ offset, limit: 10 });
  };

  const handleGifClick = (gif: IGif, e: React.SyntheticEvent<HTMLElement, Event>) => {
    e.preventDefault();
    // Get the original GIF URL
    const gifUrl = gif.images.original.url;
    onSelectGif(gifUrl);
    onOpenChange(false);
    setSearchTerm("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Choose a GIF</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          <div className="flex gap-2">
            <Input
              placeholder="Search for GIFs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            {searchTerm && (
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear
              </Button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto">
            <Grid
              key={searchTerm} // Re-render grid when search changes
              width={600}
              columns={3}
              gutter={6}
              fetchGifs={fetchGifs}
              onGifClick={handleGifClick}
              noLink={true}
            />
          </div>

          <div className="text-xs text-muted-foreground text-center">Powered by GIPHY</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GifPicker;
