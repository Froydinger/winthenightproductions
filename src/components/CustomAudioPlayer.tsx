import React, { useState } from 'react';
import { useAudio } from '@/context/AudioContext';
import { Play, Pause, ChevronDown, X } from 'lucide-react';

const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const CustomAudioPlayer: React.FC = () => {
  const { currentEpisode, isPlaying, currentTime, duration, togglePlay, setCurrentTime, setCurrentEpisode, audioRef } = useAudio();
  const [showScrubber, setShowScrubber] = useState(false);

  if (!currentEpisode) return null;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-gradient-to-r from-neon-blue/10 to-purple-500/10 border border-neon-blue/30 rounded-xl overflow-hidden shadow-lg">
      {/* Compact Player */}
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-neon-blue uppercase tracking-wider mb-1">
              Now Playing
            </p>
            <p className="text-sm font-medium text-foreground line-clamp-2">
              {currentEpisode.title}
            </p>
          </div>
          <button
            onClick={() => setCurrentEpisode(null)}
            className="p-1.5 hover:bg-accent rounded-lg transition-colors flex-shrink-0"
            aria-label="Close player"
          >
            <X className="h-4 w-4 text-muted-foreground hover:text-neon-blue" />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-neon-blue hover:bg-neon-blue/90 text-white flex items-center justify-center transition-all duration-200 shadow-[0_0_15px_rgba(93,204,255,0.3)]"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </button>

          {/* Time Display */}
          <div className="flex-1 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="min-w-fit">{formatTime(currentTime)}</span>
            <div className="flex-1 text-center text-[10px]">/</div>
            <span className="min-w-fit">{formatTime(duration)}</span>
          </div>

          {/* Scrubber Toggle */}
          <button
            onClick={() => setShowScrubber(!showScrubber)}
            className={`p-1.5 rounded-lg transition-all duration-200 ${
              showScrubber
                ? 'bg-neon-blue/20 border border-neon-blue/50'
                : 'hover:bg-accent border border-transparent'
            }`}
            aria-label="Toggle scrubber"
          >
            <ChevronDown className={`h-4 w-4 text-neon-blue transition-transform ${showScrubber ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Progress Bar (Always Visible, clickable) */}
        <div
          onClick={handleProgressClick}
          className="h-1 bg-background/50 rounded-full cursor-pointer hover:bg-background transition-colors group"
        >
          <div
            className="h-full bg-gradient-to-r from-neon-blue to-purple-500 rounded-full transition-all duration-100 group-hover:shadow-[0_0_10px_rgba(93,204,255,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Scrubber View (Expanded) */}
      {showScrubber && (
        <div className="px-4 pb-4 border-t border-neon-blue/20 space-y-3">
          {/* Large Progress Slider */}
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={(e) => {
                const newTime = parseFloat(e.target.value);
                if (audioRef.current) {
                  audioRef.current.currentTime = newTime;
                }
                setCurrentTime(newTime);
              }}
              className="w-full h-2 bg-background/50 rounded-full appearance-none cursor-pointer accent-neon-blue slider"
              style={{
                background: `linear-gradient(to right, #5DCCFF 0%, #5DCCFF ${progress}%, rgba(255,255,255,0.1) ${progress}%, rgba(255,255,255,0.1) 100%)`
              }}
            />
          </div>

          {/* Detailed Time Info */}
          <div className="flex justify-between items-center text-xs text-muted-foreground bg-background/30 rounded-lg p-2">
            <span className="font-medium text-foreground">{formatTime(currentTime)}</span>
            <span className="text-neon-blue font-semibold">{Math.round(progress)}%</span>
            <span className="font-medium text-foreground">{formatTime(duration)}</span>
          </div>

          {/* Episode Info */}
          <div className="text-xs text-muted-foreground space-y-1 bg-background/30 rounded-lg p-3">
            <p className="line-clamp-3">{currentEpisode.description || 'No description available'}</p>
          </div>
        </div>
      )}

      <style>{`
        input[type="range"].slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #5DCCFF;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(93, 204, 255, 0.6);
        }

        input[type="range"].slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #5DCCFF;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 8px rgba(93, 204, 255, 0.6);
        }

        input[type="range"].slider::-webkit-slider-runnable-track {
          appearance: none;
          background: transparent;
        }

        input[type="range"].slider::-moz-range-track {
          background: transparent;
          border: none;
        }
      `}</style>
    </div>
  );
};
