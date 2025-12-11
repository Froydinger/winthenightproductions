import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

export interface AudioEpisode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  pubDate: string;
}

interface AudioContextType {
  currentEpisode: AudioEpisode | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  setCurrentEpisode: (episode: AudioEpisode | null) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  togglePlay: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentEpisode, setCurrentEpisode] = useState<AudioEpisode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Load persisted state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('audio-player-state');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        if (state.episode && state.episode.audioUrl) {
          setCurrentEpisode(state.episode);
          setCurrentTime(state.currentTime || 0);
          // Restore the playing state if it was playing before
          if (state.isPlaying) {
            setIsPlaying(true);
          }
        }
      } catch (e) {
        console.error('Failed to restore audio state:', e);
      }
    }
  }, []);

  // Persist state to localStorage
  useEffect(() => {
    if (currentEpisode) {
      localStorage.setItem(
        'audio-player-state',
        JSON.stringify({
          episode: currentEpisode,
          currentTime,
          isPlaying,
        })
      );
    }
  }, [currentEpisode, currentTime, isPlaying]);

  // Note: Audio playback is handled by native <audio> elements in components
  // This context only tracks the global playing state for UI indicators (like menu glow)

  const togglePlay = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  return (
    <AudioContext.Provider
      value={{
        currentEpisode,
        isPlaying,
        currentTime,
        duration,
        setCurrentEpisode,
        setIsPlaying,
        setCurrentTime,
        setDuration,
        togglePlay,
        audioRef,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};
