import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeartPuzzleCTAProps {
  onClick: () => void;
  isActive: boolean;
}

export default function HeartPuzzleCTA({ onClick, isActive }: HeartPuzzleCTAProps) {
  return (
    <div className="flex justify-center animate-gentle-float">
      <Button
        onClick={onClick}
        size="lg"
        className="group relative bg-valentine-accent hover:bg-valentine-bright text-white font-semibold px-8 py-6 rounded-full shadow-valentine transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <Heart 
          className={`w-8 h-8 mr-2 transition-all duration-300 ${
            isActive 
              ? 'fill-white animate-pulse-glow' 
              : 'fill-white group-hover:animate-pulse-glow'
          }`} 
        />
        <span className="text-lg">
          {isActive ? 'Hide Puzzle' : 'Play Puzzle Game'}
        </span>
      </Button>
    </div>
  );
}
