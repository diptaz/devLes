// Chess puzzle and quiz data

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

export interface PuzzleData {
  puzzleNumber: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  initialPosition: BoardSquare[][];
  solution: Move[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizData {
  quizNumber: number;
  title: string;
  questions: QuizQuestion[];
}

// Helper to create empty board
const createEmptyBoard = (): BoardSquare[][] => {
  return Array(8).fill(null).map(() => 
    Array(8).fill(null).map(() => ({ piece: null }))
  );
};

// Puzzle 1: Simple checkmate in one
const puzzle1Position = createEmptyBoard();
puzzle1Position[0][4] = { piece: { type: 'k', color: 'b' } };
puzzle1Position[1][7] = { piece: { type: 'q', color: 'w' } };
puzzle1Position[7][0] = { piece: { type: 'r', color: 'w' } };
puzzle1Position[7][4] = { piece: { type: 'k', color: 'w' } };

// Puzzle 2: Fork tactic
const puzzle2Position = createEmptyBoard();
puzzle2Position[0][4] = { piece: { type: 'k', color: 'b' } };
puzzle2Position[3][3] = { piece: { type: 'q', color: 'b' } };
puzzle2Position[5][2] = { piece: { type: 'n', color: 'w' } };
puzzle2Position[7][4] = { piece: { type: 'k', color: 'w' } };

// Puzzle 3: Pin tactic
const puzzle3Position = createEmptyBoard();
puzzle3Position[0][4] = { piece: { type: 'k', color: 'b' } };
puzzle3Position[0][3] = { piece: { type: 'q', color: 'b' } };
puzzle3Position[2][3] = { piece: { type: 'n', color: 'b' } };
puzzle3Position[7][3] = { piece: { type: 'r', color: 'w' } };
puzzle3Position[7][4] = { piece: { type: 'k', color: 'w' } };

export const puzzles: Record<number, PuzzleData> = {
  15: {
    puzzleNumber: 1,
    title: 'Back Rank Mate',
    description: 'White to move and checkmate in one move',
    difficulty: 'Easy',
    initialPosition: puzzle1Position,
    solution: [
      { from: [7, 0], to: [0, 0] }
    ]
  },
  50: {
    puzzleNumber: 2,
    title: 'Knight Fork',
    description: 'Use your knight to attack both the king and queen',
    difficulty: 'Medium',
    initialPosition: puzzle2Position,
    solution: [
      { from: [5, 2], to: [3, 1] }
    ]
  },
  100: {
    puzzleNumber: 3,
    title: 'Pin the Knight',
    description: 'Pin the enemy knight to win material',
    difficulty: 'Medium',
    initialPosition: puzzle3Position,
    solution: [
      { from: [7, 3], to: [0, 3] }
    ]
  }
};

export const quizzes: Record<number, QuizData> = {
  25: {
    quizNumber: 1,
    title: 'Chess Basics',
    questions: [
      {
        id: 1,
        question: 'Which piece can only move diagonally?',
        options: ['Rook', 'Bishop', 'Knight', 'Queen'],
        correctAnswer: 1,
        explanation: 'The bishop moves diagonally any number of squares. It always stays on the same color squares throughout the game.'
      },
      {
        id: 2,
        question: 'What is the objective of chess?',
        options: [
          'Capture all opponent pieces',
          'Checkmate the opponent\'s king',
          'Promote all pawns',
          'Control the center'
        ],
        correctAnswer: 1,
        explanation: 'The objective is to checkmate the opponent\'s king, putting it in a position where it\'s under attack and cannot escape.'
      },
      {
        id: 3,
        question: 'How many squares can a pawn move on its first move?',
        options: ['1 square', '2 squares', '1 or 2 squares', '3 squares'],
        correctAnswer: 2,
        explanation: 'A pawn can move either 1 or 2 squares forward on its first move, but only 1 square on subsequent moves.'
      }
    ]
  },
  75: {
    quizNumber: 2,
    title: 'Opening Principles',
    questions: [
      {
        id: 1,
        question: 'What is the most important area to control in the opening?',
        options: ['The back rank', 'The center', 'The king side', 'The queen side'],
        correctAnswer: 1,
        explanation: 'Controlling the center (d4, d5, e4, e5 squares) is crucial as it gives your pieces more mobility and influence over the board.'
      },
      {
        id: 2,
        question: 'Which piece should generally be developed first?',
        options: ['Queen', 'Knights and Bishops', 'Rooks', 'King'],
        correctAnswer: 1,
        explanation: 'Knights and bishops should be developed early to control key squares and prepare for castling. The queen is usually developed later.'
      },
      {
        id: 3,
        question: 'What does "castling" accomplish?',
        options: [
          'Promotes a pawn',
          'King safety and rook activation',
          'Captures opponent piece',
          'Checks the opponent'
        ],
        correctAnswer: 1,
        explanation: 'Castling serves two purposes: it moves the king to safety and brings the rook toward the center for better activity.'
      },
      {
        id: 4,
        question: 'How many pieces should you develop before moving the same piece twice?',
        options: ['All pieces', 'At least 3-4 pieces', 'Just 1 piece', 'No rule about this'],
        correctAnswer: 1,
        explanation: 'It\'s generally better to develop multiple pieces (3-4) before moving the same piece twice, unless there\'s a tactical reason.'
      }
    ]
  },
  150: {
    quizNumber: 3,
    title: 'Tactical Patterns',
    questions: [
      {
        id: 1,
        question: 'What is a "fork" in chess?',
        options: [
          'A defensive formation',
          'Attacking two pieces at once',
          'A type of opening',
          'Exchanging pieces'
        ],
        correctAnswer: 1,
        explanation: 'A fork is when one piece attacks two or more opponent pieces simultaneously. Knights are especially good at forking.'
      },
      {
        id: 2,
        question: 'What is a "pin"?',
        options: [
          'A piece that cannot move without exposing a more valuable piece',
          'A stalemate position',
          'An opening trap',
          'A pawn structure'
        ],
        correctAnswer: 0,
        explanation: 'A pin occurs when a piece cannot move because doing so would expose a more valuable piece (like the king or queen) to attack.'
      },
      {
        id: 3,
        question: 'What is a "skewer"?',
        options: [
          'The opposite of a pin',
          'A defensive technique',
          'A pawn promotion',
          'A type of checkmate'
        ],
        correctAnswer: 0,
        explanation: 'A skewer is like a reverse pin - a valuable piece is attacked and must move, exposing a less valuable piece behind it.'
      },
      {
        id: 4,
        question: 'What is a "discovered attack"?',
        options: [
          'Finding a hidden tactic',
          'Moving a piece to reveal an attack from another piece',
          'An unexpected move',
          'A counter-attack'
        ],
        correctAnswer: 1,
        explanation: 'A discovered attack happens when moving one piece reveals an attack from another piece that was behind it.'
      },
      {
        id: 5,
        question: 'What makes a "double check" special?',
        options: [
          'It\'s twice as strong as a regular check',
          'The king must move (cannot block or capture)',
          'It always leads to checkmate',
          'It involves two pieces checking simultaneously'
        ],
        correctAnswer: 1,
        explanation: 'In a double check, the king must move because you cannot block or capture both checking pieces. This makes it a very powerful tactic.'
      }
    ]
  }
};

export function getPuzzleForPage(page: number): PuzzleData | null {
  return puzzles[page] || null;
}

export function getQuizForPage(page: number): QuizData | null {
  return quizzes[page] || null;
}

export function hasPuzzleOrQuiz(page: number): { hasPuzzle: boolean; hasQuiz: boolean } {
  return {
    hasPuzzle: !!puzzles[page],
    hasQuiz: !!quizzes[page]
  };
}
