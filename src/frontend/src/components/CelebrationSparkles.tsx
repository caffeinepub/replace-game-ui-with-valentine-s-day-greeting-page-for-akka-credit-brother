import { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function CelebrationSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Generate sparkles
    const newSparkles: Sparkle[] = [];
    for (let i = 0; i < 30; i++) {
      newSparkles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 20,
        duration: Math.random() * 2 + 2,
        delay: Math.random() * 0.5,
      });
    }
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {sparkles.map((sparkle) => (
        <img
          key={sparkle.id}
          src="/assets/generated/sparkle-particle-transparent.dim_64x64.png"
          alt=""
          className="absolute animate-sparkle-burst"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDuration: `${sparkle.duration}s`,
            animationDelay: `${sparkle.delay}s`,
          }}
        />
      ))}
      
      {/* Heart confetti */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`heart-${i}`}
          className="absolute text-valentine-accent animate-heart-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-50px',
            fontSize: `${Math.random() * 20 + 20}px`,
            animationDuration: `${Math.random() * 2 + 2}s`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        >
          💖
        </div>
      ))}
    </div>
  );
}
