import React, { useState } from 'react';
import { useAudio } from '@/context/AudioContext';
import { Play, Pause } from 'lucide-react';
import { CustomAudioPlayer } from './CustomAudioPlayer';

export const FloatingAudioButton: React.FC = () => {
  const { currentEpisode, isPlaying, togglePlay } = useAudio();
  const [showPlayer, setShowPlayer] = useState(false);

  if (!currentEpisode) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setShowPlayer(true)}
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-neon-blue to-purple-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(93,204,255,0.4)] hover:shadow-[0_0_40px_rgba(93,204,255,0.6)] transition-all duration-300 hover:scale-110 group"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="absolute inset-0 flex items-center justify-center rounded-full group-hover:bg-black/10 transition-colors"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 ml-0.5" />
          )}
        </button>
      </button>

      {/* Modal Player */}
      {showPlayer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end">
          <div className="w-full bg-background/95 backdrop-blur-xl border-t border-neon-blue/30 rounded-t-3xl shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            {/* Drag Handle */}
            <div className="flex justify-center pt-3">
              <div className="w-12 h-1 bg-neon-blue/40 rounded-full" />
            </div>

            {/* Close Button */}
            <div className="px-4 pt-4 pb-2 flex justify-end">
              <button
                onClick={() => setShowPlayer(false)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Done
              </button>
            </div>

            {/* Player */}
            <div className="px-4 pb-8">
              <CustomAudioPlayer />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
