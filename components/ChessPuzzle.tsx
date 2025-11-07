import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle2, XCircle, Lightbulb, RotateCcw } from 'lucide-react';

type PieceType = 'k' | 'q' | 'r' | 'b' | 'n' | 'p' | null;
type PieceColor = 'w' | 'b';

interface Piece {
  type: PieceType;
  color: PieceColor;
}

interface BoardSquare {
  piece: Piece | null;
}

interface Move {
  from: [number, number];
  to: [number, number];
}

interface ChessPuzzleProps {
  puzzleNumber: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  initialPosition: BoardSquare[][];
  solution: Move[];
  onComplete?: () => void;
}

const pieceSymbols: Record<string, string> = {
  'k': '♔', 'q': '♕', 'r': '♖', 'b': '♗', 'n': '♘', 'p': '♙',
};

const pieceSymbolsBlack: Record<string, string> = {
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟',
};

export function ChessPuzzle({ 
  puzzleNumber, 
  title, 
  description, 
  difficulty,
  initialPosition, 
  solution,
  onComplete 
}: ChessPuzzleProps) {
  const [board, setBoard] = useState<BoardSquare[][]>(initialPosition);
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);
  const [movesMade, setMovesMade] = useState<Move[]>([]);
  const [status, setStatus] = useState<'solving' | 'correct' | 'incorrect'>('solving');
  const [showHint, setShowHint] = useState(false);

  const handleSquareClick = (row: number, col: number) => {
    if (status !== 'solving') return;

    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare;
      
      // Make the move
      const newBoard = board.map(r => r.map(s => ({ ...s })));
      newBoard[row][col].piece = newBoard[selectedRow][selectedCol].piece;
      newBoard[selectedRow][selectedCol].piece = null;
      
      const newMove: Move = {
        from: [selectedRow, selectedCol],
        to: [row, col]
      };
      
      const newMovesMade = [...movesMade, newMove];
      setMovesMade(newMovesMade);
      setBoard(newBoard);
      setSelectedSquare(null);
      
      // Check if move matches solution
      checkSolution(newMovesMade);
    } else if (board[row][col].piece) {
      setSelectedSquare([row, col]);
    }
  };

  const checkSolution = (moves: Move[]) => {
    if (moves.length > solution.length) {
      setStatus('incorrect');
      return;
    }

    const currentMove = moves[moves.length - 1];
    const expectedMove = solution[moves.length - 1];

    if (
      currentMove.from[0] !== expectedMove.from[0] ||
      currentMove.from[1] !== expectedMove.from[1] ||
      currentMove.to[0] !== expectedMove.to[0] ||
      currentMove.to[1] !== expectedMove.to[1]
    ) {
      setStatus('incorrect');
      return;
    }

    if (moves.length === solution.length) {
      setStatus('correct');
      onComplete?.();
    }
  };

  const resetPuzzle = () => {
    setBoard(initialPosition);
    setSelectedSquare(null);
    setMovesMade([]);
    setStatus('solving');
    setShowHint(false);
  };

  const getHint = () => {
    if (movesMade.length < solution.length) {
      setShowHint(true);
    }
  };

  const getSquareNotation = (row: number, col: number) => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return `${files[col]}${8 - row}`;
  };

  const difficultyColor = {
    'Easy': 'bg-green-100 text-green-700 border-green-300',
    'Medium': 'bg-yellow-100 text-yellow-700 border-yellow-300',
    'Hard': 'bg-red-100 text-red-700 border-red-300',
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-2">
              Puzzle #{puzzleNumber}: {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge variant="outline" className={difficultyColor[difficulty]}>
            {difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Chess Board */}
        <div className="flex justify-center">
          <div className="inline-grid grid-cols-8 border-4 border-gray-800 shadow-2xl">
            {board.map((row, rowIndex) =>
              row.map((square, colIndex) => {
                const isLight = (rowIndex + colIndex) % 2 === 0;
                const isSelected = selectedSquare?.[0] === rowIndex && selectedSquare?.[1] === colIndex;
                const isHinted = showHint && 
                  movesMade.length < solution.length &&
                  solution[movesMade.length].from[0] === rowIndex &&
                  solution[movesMade.length].from[1] === colIndex;
                
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`
                      w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center cursor-pointer relative
                      ${isLight ? 'bg-amber-100' : 'bg-amber-700'}
                      ${isSelected ? 'ring-4 ring-blue-500' : ''}
                      ${isHinted ? 'ring-4 ring-green-400 animate-pulse' : ''}
                      ${status === 'solving' ? 'hover:opacity-80' : ''}
                      transition-all
                    `}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                  >
                    {square.piece && (
                      <span className={`text-3xl sm:text-4xl ${square.piece.color === 'w' ? 'text-white drop-shadow-lg' : 'text-gray-900'}`}>
                        {square.piece.color === 'w' 
                          ? pieceSymbols[square.piece.type] 
                          : pieceSymbolsBlack[square.piece.type]}
                      </span>
                    )}
                    {/* Coordinate labels */}
                    {colIndex === 0 && (
                      <span className="absolute left-1 top-1 text-xs opacity-50">
                        {8 - rowIndex}
                      </span>
                    )}
                    {rowIndex === 7 && (
                      <span className="absolute right-1 bottom-1 text-xs opacity-50">
                        {String.fromCharCode(97 + colIndex)}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Status */}
        {status === 'correct' && (
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 flex items-center gap-3 animate-[scale-in_0.3s_ease-out]">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">Puzzle Solved! 🎉</p>
              <p className="text-sm text-green-700">You found the correct solution in {movesMade.length} move{movesMade.length !== 1 ? 's' : ''}!</p>
            </div>
          </div>
        )}

        {status === 'incorrect' && (
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-center gap-3">
            <XCircle className="w-6 h-6 text-red-600" />
            <div className="flex-1">
              <p className="font-semibold text-red-800">Not quite right</p>
              <p className="text-sm text-red-700">Try again or use a hint!</p>
            </div>
          </div>
        )}

        {/* Hint */}
        {showHint && status === 'solving' && movesMade.length < solution.length && (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-blue-600" />
            <div>
              <p className="font-semibold text-blue-800">Hint</p>
              <p className="text-sm text-blue-700">
                Look for a move starting from {getSquareNotation(solution[movesMade.length].from[0], solution[movesMade.length].from[1])}
              </p>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={resetPuzzle}
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          {status === 'solving' && (
            <Button
              variant="outline"
              onClick={getHint}
              disabled={showHint}
              className="flex-1"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Show Hint
            </Button>
          )}
        </div>

        {/* Move counter */}
        <div className="text-center text-sm text-gray-600">
          Moves: {movesMade.length} / {solution.length}
        </div>
      </CardContent>
    </Card>
  );
}
