import { useState } from 'react';

type PieceType = 'k' | 'q' | 'r' | 'b' | 'n' | 'p' | null;
type PieceColor = 'w' | 'b';

interface Piece {
  type: PieceType;
  color: PieceColor;
}

interface BoardSquare {
  piece: Piece | null;
}

const initialBoard: BoardSquare[][] = [
  [
    { piece: { type: 'r', color: 'b' } },
    { piece: { type: 'n', color: 'b' } },
    { piece: { type: 'b', color: 'b' } },
    { piece: { type: 'q', color: 'b' } },
    { piece: { type: 'k', color: 'b' } },
    { piece: { type: 'b', color: 'b' } },
    { piece: { type: 'n', color: 'b' } },
    { piece: { type: 'r', color: 'b' } },
  ],
  Array(8).fill(null).map(() => ({ piece: { type: 'p', color: 'b' } })),
  Array(8).fill(null).map(() => ({ piece: null })),
  Array(8).fill(null).map(() => ({ piece: null })),
  Array(8).fill(null).map(() => ({ piece: null })),
  Array(8).fill(null).map(() => ({ piece: null })),
  Array(8).fill(null).map(() => ({ piece: { type: 'p', color: 'w' } })),
  [
    { piece: { type: 'r', color: 'w' } },
    { piece: { type: 'n', color: 'w' } },
    { piece: { type: 'b', color: 'w' } },
    { piece: { type: 'q', color: 'w' } },
    { piece: { type: 'k', color: 'w' } },
    { piece: { type: 'b', color: 'w' } },
    { piece: { type: 'n', color: 'w' } },
    { piece: { type: 'r', color: 'w' } },
  ],
];

const pieceSymbols: Record<string, string> = {
  'k': '♔',
  'q': '♕',
  'r': '♖',
  'b': '♗',
  'n': '♘',
  'p': '♙',
};

const pieceSymbolsBlack: Record<string, string> = {
  'k': '♚',
  'q': '♛',
  'r': '♜',
  'b': '♝',
  'n': '♞',
  'p': '♟',
};

interface ChessBoardProps {
  interactive?: boolean;
}

export function ChessBoard({ interactive = true }: ChessBoardProps) {
  const [board, setBoard] = useState<BoardSquare[][]>(initialBoard);
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);

  const handleSquareClick = (row: number, col: number) => {
    if (!interactive) return;

    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare;
      const newBoard = board.map(r => r.map(s => ({ ...s })));
      
      newBoard[row][col].piece = newBoard[selectedRow][selectedCol].piece;
      newBoard[selectedRow][selectedCol].piece = null;
      
      setBoard(newBoard);
      setSelectedSquare(null);
    } else if (board[row][col].piece) {
      setSelectedSquare([row, col]);
    }
  };

  const resetBoard = () => {
    setBoard(initialBoard);
    setSelectedSquare(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="inline-grid grid-cols-8 border-4 border-gray-800 shadow-2xl">
        {board.map((row, rowIndex) =>
          row.map((square, colIndex) => {
            const isLight = (rowIndex + colIndex) % 2 === 0;
            const isSelected = selectedSquare?.[0] === rowIndex && selectedSquare?.[1] === colIndex;
            
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center cursor-pointer
                  ${isLight ? 'bg-amber-100' : 'bg-amber-700'}
                  ${isSelected ? 'ring-4 ring-blue-500' : ''}
                  ${interactive ? 'hover:opacity-80' : ''}
                  transition-all
                `}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              >
                {square.piece && (
                  <span className={`text-3xl sm:text-5xl ${square.piece.color === 'w' ? 'text-white drop-shadow-lg' : 'text-gray-900'}`}>
                    {square.piece.color === 'w' 
                      ? pieceSymbols[square.piece.type] 
                      : pieceSymbolsBlack[square.piece.type]}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
      {interactive && (
        <button
          onClick={resetBoard}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Reset Board
        </button>
      )}
    </div>
  );
}
