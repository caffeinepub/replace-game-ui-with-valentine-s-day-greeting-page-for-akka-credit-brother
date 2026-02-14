import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingHearts from './components/FloatingHearts';
import HeartPuzzleCTA from './components/HeartPuzzleCTA';
import PuzzleRevealSection from './components/PuzzleRevealSection';
import { Heart } from 'lucide-react';

function App() {
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [puzzleCompleted, setPuzzleCompleted] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'url(/assets/generated/valentine-pattern-bg.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Floating hearts overlay */}
      <FloatingHearts />
      
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="max-w-3xl w-full text-center space-y-12">
          {/* Heart CTA above main title */}
          <HeartPuzzleCTA 
            onClick={() => setShowPuzzle(!showPuzzle)} 
            isActive={showPuzzle}
          />
          
          {/* Main greeting */}
          <div className="space-y-6">
            <div className="flex justify-center animate-gentle-float">
              <Heart className="w-24 h-24 text-valentine-accent fill-valentine-accent animate-pulse-glow" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-valentine-text valentine-text">
              Happy Valentine's Day Akka 💝
            </h1>
            
            {!puzzleCompleted && (
              <div className="valentine-card p-8 md:p-12 rounded-2xl space-y-6 shadow-valentine">
                <p className="text-2xl md:text-4xl font-serif text-valentine-text leading-relaxed">
                  I am lucky to have you in my life.
                </p>
                
                <div className="flex justify-center gap-2">
                  <Heart className="w-6 h-6 text-valentine-accent fill-valentine-accent" />
                  <Heart className="w-6 h-6 text-valentine-bright fill-valentine-bright" />
                  <Heart className="w-6 h-6 text-valentine-accent fill-valentine-accent" />
                </div>
                
                <p className="text-xl md:text-2xl text-valentine-light font-medium">
                  Happy Valentine's Day! 💕
                </p>
              </div>
            )}
          </div>
          
          {/* Puzzle reveal section */}
          <PuzzleRevealSection 
            isVisible={showPuzzle}
            onComplete={() => setPuzzleCompleted(true)}
            isCompleted={puzzleCompleted}
          />
          
          {/* Decorative message - only show if puzzle not completed */}
          {!puzzleCompleted && (
            <div className="space-y-4">
              <p className="text-lg text-valentine-light italic">
                Wishing you a day filled with love and happiness
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
