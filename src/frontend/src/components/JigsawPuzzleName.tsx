import { useState, useEffect, useRef } from 'react';

interface PuzzlePiece {
  id: number;
  currentIndex: number;
  correctIndex: number;
  x: number;
  y: number;
  isDragging: boolean;
}

interface JigsawPuzzleNameProps {
  onComplete: () => void;
}

const PUZZLE_TEXT = 'Love you akka 💖';

export default function JigsawPuzzleName({ onComplete }: JigsawPuzzleNameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isCompleted, setIsCompleted] = useState(false);
  const [textureLoaded, setTextureLoaded] = useState(false);
  const completionTriggeredRef = useRef(false);
  
  const COLS = 4;
  const ROWS = 2;
  const PIECE_WIDTH = 120;
  const PIECE_HEIGHT = 80;
  const CANVAS_WIDTH = COLS * PIECE_WIDTH;
  const CANVAS_HEIGHT = ROWS * PIECE_HEIGHT + 200; // Extra space for shuffled pieces

  useEffect(() => {
    // Load texture
    const img = new Image();
    img.src = '/assets/generated/jigsaw-texture-tile.dim_512x512.png';
    img.onload = () => setTextureLoaded(true);
  }, []);

  useEffect(() => {
    // Initialize puzzle pieces
    const initialPieces: PuzzlePiece[] = [];
    for (let i = 0; i < COLS * ROWS; i++) {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      initialPieces.push({
        id: i,
        currentIndex: i,
        correctIndex: i,
        x: col * PIECE_WIDTH + Math.random() * 100 - 50,
        y: (ROWS * PIECE_HEIGHT + 50) + Math.random() * 100,
        isDragging: false,
      });
    }
    
    // Shuffle pieces
    for (let i = initialPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [initialPieces[i].x, initialPieces[j].x] = [initialPieces[j].x, initialPieces[i].x];
      [initialPieces[i].y, initialPieces[j].y] = [initialPieces[j].y, initialPieces[i].y];
    }
    
    setPieces(initialPieces);
  }, []);

  useEffect(() => {
    if (!textureLoaded) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw target area outline
    ctx.strokeStyle = 'oklch(0.70 0.20 355 / 0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(0, 0, CANVAS_WIDTH, ROWS * PIECE_HEIGHT);
    ctx.setLineDash([]);

    // Create text for puzzle
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = CANVAS_WIDTH;
    tempCanvas.height = ROWS * PIECE_HEIGHT;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    // Load and draw texture
    const textureImg = new Image();
    textureImg.src = '/assets/generated/jigsaw-texture-tile.dim_512x512.png';
    
    textureImg.onload = () => {
      // Fill with texture pattern
      const pattern = tempCtx.createPattern(textureImg, 'repeat');
      if (pattern) {
        tempCtx.fillStyle = pattern;
        tempCtx.fillRect(0, 0, CANVAS_WIDTH, ROWS * PIECE_HEIGHT);
      }

      // Draw text on top
      tempCtx.font = 'bold 64px Georgia, serif';
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';
      
      // Create gradient for text
      const gradient = tempCtx.createLinearGradient(0, 0, CANVAS_WIDTH, 0);
      gradient.addColorStop(0, 'oklch(0.65 0.22 355)');
      gradient.addColorStop(0.5, 'oklch(0.75 0.24 350)');
      gradient.addColorStop(1, 'oklch(0.65 0.22 355)');
      
      tempCtx.fillStyle = gradient;
      tempCtx.fillText(PUZZLE_TEXT, CANVAS_WIDTH / 2, ROWS * PIECE_HEIGHT / 2);
      
      // Add text stroke
      tempCtx.strokeStyle = 'oklch(0.95 0.02 15)';
      tempCtx.lineWidth = 3;
      tempCtx.strokeText(PUZZLE_TEXT, CANVAS_WIDTH / 2, ROWS * PIECE_HEIGHT / 2);

      // Draw pieces
      pieces.forEach((piece) => {
        const col = piece.correctIndex % COLS;
        const row = Math.floor(piece.correctIndex / COLS);
        
        ctx.save();
        
        // Draw piece shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        // Draw piece background
        ctx.fillStyle = 'oklch(0.92 0.04 30)';
        ctx.fillRect(piece.x, piece.y, PIECE_WIDTH - 4, PIECE_HEIGHT - 4);
        
        // Draw piece content from temp canvas
        ctx.drawImage(
          tempCanvas,
          col * PIECE_WIDTH,
          row * PIECE_HEIGHT,
          PIECE_WIDTH,
          PIECE_HEIGHT,
          piece.x,
          piece.y,
          PIECE_WIDTH - 4,
          PIECE_HEIGHT - 4
        );
        
        // Draw piece border
        ctx.strokeStyle = piece.isDragging 
          ? 'oklch(0.75 0.24 350)' 
          : 'oklch(0.70 0.20 355 / 0.5)';
        ctx.lineWidth = piece.isDragging ? 3 : 2;
        ctx.strokeRect(piece.x, piece.y, PIECE_WIDTH - 4, PIECE_HEIGHT - 4);
        
        ctx.restore();
      });
    };
  }, [pieces, textureLoaded]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Capture pointer to ensure we receive all events even if pointer leaves canvas
    canvas.setPointerCapture(e.pointerId);

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find clicked piece (check in reverse order to get top piece)
    for (let i = pieces.length - 1; i >= 0; i--) {
      const piece = pieces[i];
      if (
        x >= piece.x &&
        x <= piece.x + PIECE_WIDTH - 4 &&
        y >= piece.y &&
        y <= piece.y + PIECE_HEIGHT - 4
      ) {
        setDraggedPiece(i);
        setOffset({ x: x - piece.x, y: y - piece.y });
        setPieces(prev => prev.map((p, idx) => 
          idx === i ? { ...p, isDragging: true } : p
        ));
        break;
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (draggedPiece === null) return;

    e.preventDefault(); // Prevent scrolling during drag

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPieces(prev => prev.map((piece, idx) => 
      idx === draggedPiece 
        ? { ...piece, x: x - offset.x, y: y - offset.y }
        : piece
    ));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (draggedPiece === null) return;

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.releasePointerCapture(e.pointerId);
    }

    setPieces(prev => {
      const newPieces = prev.map((piece, idx) => {
        if (idx !== draggedPiece) return piece;

        const col = piece.correctIndex % COLS;
        const row = Math.floor(piece.correctIndex / COLS);
        const targetX = col * PIECE_WIDTH;
        const targetY = row * PIECE_HEIGHT;

        // Snap to position if close enough
        const SNAP_DISTANCE = 40;
        if (
          Math.abs(piece.x - targetX) < SNAP_DISTANCE &&
          Math.abs(piece.y - targetY) < SNAP_DISTANCE
        ) {
          return { ...piece, x: targetX, y: targetY, isDragging: false };
        }

        return { ...piece, isDragging: false };
      });

      // Check if puzzle is complete
      const complete = newPieces.every(piece => {
        const col = piece.correctIndex % COLS;
        const row = Math.floor(piece.correctIndex / COLS);
        return piece.x === col * PIECE_WIDTH && piece.y === row * PIECE_HEIGHT;
      });

      if (complete && !isCompleted && !completionTriggeredRef.current) {
        completionTriggeredRef.current = true;
        setIsCompleted(true);
        setTimeout(() => onComplete(), 500);
      }

      return newPieces;
    });

    setDraggedPiece(null);
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // Handle pointer cancel (e.g., when pointer is interrupted)
    if (draggedPiece !== null) {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.releasePointerCapture(e.pointerId);
      }
      
      setPieces(prev => prev.map((piece, idx) => 
        idx === draggedPiece ? { ...piece, isDragging: false } : piece
      ));
      
      setDraggedPiece(null);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative inline-block">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          className="border-2 border-valentine-border rounded-lg shadow-valentine cursor-move bg-valentine-cream/30"
          style={{ touchAction: 'none' }}
        />
        {isCompleted && (
          <div className="absolute inset-0 flex items-center justify-center bg-valentine-accent/20 rounded-lg animate-fade-in pointer-events-none">
            <div className="text-4xl font-bold text-valentine-bright animate-bounce">
              ✨ Complete! ✨
            </div>
          </div>
        )}
      </div>
      <p className="text-sm text-valentine-light italic">
        Drag and drop the pieces to complete the puzzle
      </p>
    </div>
  );
}
