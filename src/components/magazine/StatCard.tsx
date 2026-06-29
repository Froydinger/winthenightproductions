import React, { useEffect, useState, useRef } from "react";

interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ value, label, delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    // Check if value is a numeric value (e.g. 1000, 52)
    const isNumeric = /^[0-9]+K?\+?%?$/.test(value);
    if (!isNumeric) {
      setDisplayValue(value);
      return;
    }

    const numericMatch = value.match(/\d+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseInt(numericMatch[0]);
    const suffix = value.replace(/\d+/, "");

    let start = 0;
    const duration = 1500; // ms
    const stepTime = Math.max(Math.floor(duration / targetNum), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(targetNum / 30);
      if (start >= targetNum) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(`${start}${suffix}`);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div
      ref={cardRef}
      className={`bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg p-6 transition-all duration-500 hover:border-[#00d9ff]/30 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="stat-big font-bebas text-5xl text-[#00d9ff] font-bold tracking-wider">{displayValue}</div>
      <div className="text-xs text-muted-foreground font-sans leading-relaxed mt-2">{label}</div>
    </div>
  );
};
