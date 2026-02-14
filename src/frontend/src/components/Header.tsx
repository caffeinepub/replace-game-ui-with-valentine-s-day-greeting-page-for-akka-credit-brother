import { Heart } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full py-6 px-4 backdrop-blur-md bg-valentine-cream/40 border-b border-valentine-border">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <Heart className="w-8 h-8 text-valentine-accent fill-valentine-accent animate-pulse-glow" />
        <h2 className="text-2xl font-bold text-valentine-text">
          Happy Valentine's Day Akka 💝
        </h2>
        <Heart className="w-8 h-8 text-valentine-accent fill-valentine-accent animate-pulse-glow" />
      </div>
    </header>
  );
}
