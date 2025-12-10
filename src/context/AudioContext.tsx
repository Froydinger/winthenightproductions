import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

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
        setCurrentEpisode(state.episode);
        setCurrentTime(state.currentTime || 0);
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
        })
      );
    }
  }, [currentEpisode, currentTime]);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.error('Failed to play audio:', err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Update current time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Restore playback time when episode changes
  useEffect(() => {
    if (!audioRef.current || !currentEpisode) return;
    audioRef.current.currentTime = currentTime;
  }, [currentEpisode, currentTime]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

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
      <audio
        ref={audioRef}
        src={currentEpisode?.audioUrl}
        crossOrigin="anonymous"
      />
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
