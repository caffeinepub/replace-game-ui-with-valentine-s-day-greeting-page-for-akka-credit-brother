import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

export default function ValentineMessageReveal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div 
      className={`valentine-card p-8 md:p-12 rounded-2xl space-y-6 shadow-valentine transition-all duration-1000 ${
        isVisible ? 'opacity-100 scale-100 animate-message-reveal' : 'opacity-0 scale-95'
      }`}
    >
      <div className="flex justify-center mb-6">
        <Heart className="w-16 h-16 text-valentine-accent fill-valentine-accent animate-pulse-glow" />
      </div>
      
      <h2 className="text-3xl md:text-4xl font-bold text-valentine-text valentine-text mb-6">
        To my Sister
      </h2>
      
      <div className="space-y-4 text-xl md:text-2xl text-valentine-text leading-relaxed">
        <p className="font-serif">
          Happy Valentine's Day!
        </p>
        
        <p className="font-serif">
          Every day with you is a gift, and Lucky to have you in my life, I cherish our connection.
        </p>
        
        <p className="font-serif font-semibold">
          May our bond continue to grow stronger, forever unbroken💖
        </p>
      </div>
      
      <div className="flex justify-center gap-2 mt-8">
        <Heart className="w-8 h-8 text-valentine-accent fill-valentine-accent animate-pulse-glow" />
        <Heart className="w-8 h-8 text-valentine-bright fill-valentine-bright animate-pulse-glow" />
        <Heart className="w-8 h-8 text-valentine-accent fill-valentine-accent animate-pulse-glow" />
      </div>
    </div>
  );
}
