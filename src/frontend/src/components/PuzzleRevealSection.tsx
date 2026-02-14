import { useEffect, useState, useRef } from 'react';
import JigsawPuzzleName from './JigsawPuzzleName';
import ValentineMessageReveal from './ValentineMessageReveal';
import CelebrationSparkles from './CelebrationSparkles';

interface PuzzleRevealSectionProps {
  isVisible: boolean;
  onComplete: () => void;
  isCompleted: boolean;
}

export default function PuzzleRevealSection({ 
  isVisible, 
  onComplete, 
  isCompleted 
}: PuzzleRevealSectionProps) {
  const [showCelebration, setShowCelebration] = useState(false);
  const completionHandledRef = useRef(false);

  const handlePuzzleComplete = () => {
    // Guard against duplicate completion triggers
    if (completionHandledRef.current) return;
    completionHandledRef.current = true;
    
    setShowCelebration(true);
    onComplete();
    
    // Hide celebration after 5 seconds
    setTimeout(() => {
      setShowCelebration(false);
    }, 5000);
  };

  useEffect(() => {
    if (!isVisible) {
      setShowCelebration(false);
      completionHandledRef.current = false;
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="puzzle-reveal-container animate-puzzle-reveal">
      {!isCompleted && (
        <div className="space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-valentine-text">
            Complete the Puzzle to Reveal Your Message! 🧩
          </h3>
          <JigsawPuzzleName onComplete={handlePuzzleComplete} />
        </div>
      )}
      
      {isCompleted && (
        <ValentineMessageReveal />
      )}
      
      {showCelebration && <CelebrationSparkles />}
    </div>
  );
}
