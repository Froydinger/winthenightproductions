import React from "react";

interface WaveformBarProps {
  barCount?: number;
  className?: string;
}

export const WaveformBar: React.FC<WaveformBarProps> = ({ barCount = 40, className = "" }) => {
  return (
    <div className={`flex items-center gap-[3px] h-[36px] ${className}`} aria-hidden="true">
      {Array.from({ length: barCount }).map((_, i) => (
        <div key={i} className="wave-bar-staggered" />
      ))}
    </div>
  );
};
