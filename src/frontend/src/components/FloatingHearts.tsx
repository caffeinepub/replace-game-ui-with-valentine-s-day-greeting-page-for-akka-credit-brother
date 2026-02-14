import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: number;
  duration: number;
  delay: number;
  drift: number;
  size: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Generate 15 hearts with random properties
    const generatedHearts: Heart[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 8 + Math.random() * 6, // 8-14 seconds
      delay: Math.random() * 8, // 0-8 seconds delay
      drift: (Math.random() - 0.5) * 100, // -50px to 50px drift
      size: 0.6 + Math.random() * 0.6, // 0.6 to 1.2 scale
    }));
    setHearts(generatedHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <img
          key={heart.id}
          src="/assets/generated/heart-icon-transparent.dim_64x64.png"
          alt=""
          className="absolute animate-float-hearts"
          style={{
            left: `${heart.left}%`,
            width: '32px',
            height: '32px',
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            transform: `scale(${heart.size})`,
            // @ts-ignore - CSS custom property
            '--drift': `${heart.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
