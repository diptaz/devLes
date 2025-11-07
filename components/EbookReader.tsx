import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { ChevronLeft, ChevronRight, BookOpen, Download, Bookmark, Target, HelpCircle, Puzzle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChessPuzzle } from './ChessPuzzle';
import { ChessQuiz } from './ChessQuiz';
import { getPuzzleForPage, getQuizForPage, puzzles, quizzes } from './data/puzzlesAndQuizzes';

interface Chapter {
  id: number;
  title: string;
  pages: number;
}

interface EbookReaderProps {
  ebookId: number;
  ebookTitle: string;
  ebookImage: string;
  totalPages: number;
  onBack: () => void;
}

export function EbookReader({ ebookId, ebookTitle, ebookImage, totalPages, onBack }: EbookReaderProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedPages, setBookmarkedPages] = useState<number[]>([]);
  const [completedPuzzles, setCompletedPuzzles] = useState<number[]>([]);
  const [quizScores, setQuizScores] = useState<Record<number, number>>({});

  // Generate chapters
  const chapters: Chapter[] = [
    { id: 1, title: 'Introduction', pages: 20 },
    { id: 2, title: 'Fundamental Concepts', pages: 45 },
    { id: 3, title: 'Opening Theory', pages: 60 },
    { id: 4, title: 'Middle Game Tactics', pages: 80 },
    { id: 5, title: 'Endgame Mastery', pages: 70 },
    { id: 6, title: 'Advanced Strategies', pages: 55 },
    { id: 7, title: 'Practice Puzzles', pages: totalPages },
  ];

  const getCurrentChapter = () => {
    let accumulatedPages = 0;
    for (const chapter of chapters) {
      accumulatedPages += chapter.pages;
      if (currentPage <= accumulatedPages) {
        return chapter;
      }
    }
    return chapters[chapters.length - 1];
  };

  const currentChapter = getCurrentChapter();

  const handleToggleBookmark = () => {
    if (bookmarkedPages.includes(currentPage)) {
      setBookmarkedPages(bookmarkedPages.filter(p => p !== currentPage));
    } else {
      setBookmarkedPages([...bookmarkedPages, currentPage]);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToChapter = (chapterId: number) => {
    let pageNumber = 1;
    for (let i = 0; i < chapterId - 1; i++) {
      pageNumber += chapters[i].pages;
    }
    setCurrentPage(pageNumber);
  };

  const puzzle = getPuzzleForPage(currentPage);
  const quiz = getQuizForPage(currentPage);

  const handlePuzzleComplete = () => {
    if (!completedPuzzles.includes(currentPage)) {
      setCompletedPuzzles([...completedPuzzles, currentPage]);
    }
  };

  const handleQuizComplete = (score: number) => {
    setQuizScores({ ...quizScores, [currentPage]: score });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Library
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{ebookTitle}</h2>
            <p className="text-gray-600">
              Page {currentPage} of {totalPages} • Chapter {currentChapter.id}: {currentChapter.title}
            </p>
          </div>
        </div>
        
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Table of Contents */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Table of Contents</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[700px]">
                <div className="space-y-1 p-4">
                  {chapters.map((chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => goToChapter(chapter.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all hover:bg-gray-100 ${
                        currentChapter.id === chapter.id ? 'bg-blue-50 border-2 border-blue-300' : 'border border-transparent'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <Badge variant="secondary" className="shrink-0">
                          Ch. {chapter.id}
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${
                            currentChapter.id === chapter.id ? 'text-blue-700' : 'text-gray-900'
                          }`}>
                            {chapter.title}
                          </p>
                          <p className="text-xs text-gray-500">{chapter.pages} pages</p>
                        </div>
                      </div>
                    </button>
                  ))}

                  {/* Interactive Content Section */}
                  <div className="pt-4 pb-2 px-3 border-t mt-2">
                    <h4 className="text-sm font-semibold text-gray-700">Interactive Content</h4>
                  </div>
                  {Object.keys(puzzles).map((pageNum) => {
                    const page = parseInt(pageNum);
                    const puzzleData = puzzles[page];
                    const isCompleted = completedPuzzles.includes(page);
                    return (
                      <button
                        key={`puzzle-${page}`}
                        onClick={() => setCurrentPage(page)}
                        className="w-full text-left p-3 rounded-lg transition-all hover:bg-purple-50 border border-transparent hover:border-purple-200"
                      >
                        <div className="flex items-center gap-2">
                          <Target className={`w-4 h-4 ${isCompleted ? 'text-green-600' : 'text-purple-600'}`} />
                          <div className="flex-1">
                            <span className="text-sm font-medium">Puzzle #{puzzleData.puzzleNumber}</span>
                            <p className="text-xs text-gray-500">Page {page}</p>
                          </div>
                          {isCompleted && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">✓</Badge>
                          )}
                        </div>
                      </button>
                    );
                  })}
                  {Object.keys(quizzes).map((pageNum) => {
                    const page = parseInt(pageNum);
                    const quizData = quizzes[page];
                    const score = quizScores[page];
                    return (
                      <button
                        key={`quiz-${page}`}
                        onClick={() => setCurrentPage(page)}
                        className="w-full text-left p-3 rounded-lg transition-all hover:bg-indigo-50 border border-transparent hover:border-indigo-200"
                      >
                        <div className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-indigo-600" />
                          <div className="flex-1">
                            <span className="text-sm font-medium">Quiz #{quizData.quizNumber}</span>
                            <p className="text-xs text-gray-500">Page {page}</p>
                          </div>
                          {score !== undefined && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                              {score}/{quizData.questions.length}
                            </Badge>
                          )}
                        </div>
                      </button>
                    );
                  })}

                  {bookmarkedPages.length > 0 && (
                    <>
                      <div className="pt-4 pb-2 px-3 border-t mt-2">
                        <h4 className="text-sm font-semibold text-gray-700">Bookmarks</h4>
                      </div>
                      {bookmarkedPages.map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className="w-full text-left p-3 rounded-lg transition-all hover:bg-gray-100"
                        >
                          <div className="flex items-center gap-2">
                            <Bookmark className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                            <span className="text-sm">Page {page}</span>
                          </div>
                        </button>
                      ))}
                    </>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Reader */}
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardContent className="p-6">
              {/* Book Page */}
              <div className="bg-white border-2 border-gray-200 rounded-lg shadow-2xl p-8 md:p-12 min-h-[700px] relative">
                {/* Page Header */}
                <div className="flex justify-between items-start mb-6">
                  <Badge variant="outline">Chapter {currentChapter.id}</Badge>
                  <button
                    onClick={handleToggleBookmark}
                    className="hover:scale-110 transition-transform"
                  >
                    <Bookmark 
                      className={`w-6 h-6 ${
                        bookmarkedPages.includes(currentPage) 
                          ? 'text-yellow-600 fill-yellow-600' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </button>
                </div>

                {/* Page Content */}
                <ScrollArea className="h-[550px]">
                  <div className="prose max-w-none">
                    <h1 className="text-3xl font-bold mb-6">{currentChapter.title}</h1>
                    
                    {/* Interactive Puzzle */}
                    {puzzle && (
                      <div className="not-prose my-8">
                        <div className="flex items-center gap-2 mb-4 p-3 bg-purple-50 border-l-4 border-purple-500 rounded">
                          <Target className="w-5 h-5 text-purple-600" />
                          <p className="font-semibold text-purple-800">Interactive Puzzle - Test Your Skills!</p>
                        </div>
                        <ChessPuzzle
                          {...puzzle}
                          onComplete={handlePuzzleComplete}
                        />
                        {completedPuzzles.includes(currentPage) && (
                          <div className="mt-4 p-3 bg-green-50 border border-green-300 rounded-lg text-center">
                            <p className="text-green-800 font-semibold">✓ Puzzle Completed!</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Interactive Quiz */}
                    {quiz && (
                      <div className="not-prose my-8">
                        <div className="flex items-center gap-2 mb-4 p-3 bg-indigo-50 border-l-4 border-indigo-500 rounded">
                          <HelpCircle className="w-5 h-5 text-indigo-600" />
                          <p className="font-semibold text-indigo-800">Knowledge Check - Test Your Understanding!</p>
                        </div>
                        <ChessQuiz
                          {...quiz}
                          onComplete={handleQuizComplete}
                        />
                        {quizScores[currentPage] !== undefined && (
                          <div className="mt-4 p-3 bg-blue-50 border border-blue-300 rounded-lg text-center">
                            <p className="text-blue-800">
                              <span className="font-semibold">Last Score:</span> {quizScores[currentPage]}/{quiz.questions.length}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Regular content when no puzzle/quiz */}
                    {!puzzle && !quiz && (
                      <>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          This is page {currentPage} of your e-book. In a real implementation, this would display the actual content from your PDF or e-book file.
                        </p>

                        <p className="text-gray-700 leading-relaxed mb-4">
                          {getPageContent(ebookId, currentPage)}
                        </p>

                        {currentPage % 10 === 0 && (
                          <div className="my-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded">
                            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                              <BookOpen className="w-5 h-5" />
                              Key Concept
                            </h3>
                            <p className="text-gray-700">
                              Remember to practice the techniques shown in this chapter. Consistent practice is essential for improvement in chess.
                            </p>
                          </div>
                        )}

                        {currentPage % 5 === 0 && currentPage % 10 !== 0 && (
                          <div className="my-6">
                            <ImageWithFallback
                              src={ebookImage}
                              alt="Chess diagram"
                              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                            />
                            <p className="text-center text-sm text-gray-500 mt-2">Figure {Math.floor(currentPage / 5)}: Chess position example</p>
                          </div>
                        )}

                        <p className="text-gray-700 leading-relaxed mb-4">
                          Chess is a game of infinite complexity and beauty. Each position on the board presents unique challenges and opportunities. By studying the principles and patterns in this book, you'll develop a deeper understanding of the game.
                        </p>

                        <p className="text-gray-700 leading-relaxed">
                          Continue practicing, analyzing your games, and learning from your mistakes. The journey to chess mastery is long but rewarding.
                        </p>
                      </>
                    )}
                  </div>
                </ScrollArea>

                {/* Page Footer */}
                <div className="absolute bottom-6 left-0 right-0 px-12">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{ebookTitle}</span>
                    <span>{currentPage}</span>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous Page
                </Button>

                <div className="text-sm text-gray-600">
                  {currentPage} / {totalPages}
                </div>

                <Button
                  variant="outline"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  Next Page
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function getPageContent(ebookId: number, page: number): string {
  const contents = [
    "In chess, every move counts. Understanding the fundamental principles of piece development, center control, and king safety is crucial for success in the opening phase of the game.",
    "The middle game is where creativity meets calculation. Here, you'll learn to recognize tactical patterns, evaluate positions accurately, and formulate effective plans.",
    "Endgame technique separates masters from amateurs. Even with just a few pieces on the board, precise play is essential to convert advantages or hold difficult positions.",
    "Opening preparation is an investment in your chess future. By building a solid repertoire, you'll save time and energy while maintaining the initiative in your games.",
    "Tactics are the building blocks of chess mastery. From simple forks and pins to complex combinations, recognizing these patterns will dramatically improve your results.",
  ];
  
  return contents[(page - 1) % contents.length];
}
