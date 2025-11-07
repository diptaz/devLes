import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Play, CheckCircle2, Lock, ChevronLeft, HelpCircle, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChessQuiz } from './ChessQuiz';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl?: string;
}

interface CourseViewerProps {
  courseId: number;
  courseTitle: string;
  courseImage: string;
  totalLessons: number;
  onBack: () => void;
}

export function CourseViewer({ courseId, courseTitle, courseImage, totalLessons, onBack }: CourseViewerProps) {
  // Generate mock lessons based on total lessons
  const [lessons] = useState<Lesson[]>(
    Array.from({ length: totalLessons }, (_, i) => ({
      id: i + 1,
      title: `Lesson ${i + 1}: ${getLessonTitle(courseId, i + 1)}`,
      duration: `${Math.floor(Math.random() * 20) + 10} min`,
      completed: i === 0, // First lesson completed by default
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Mock video URL
    }))
  );

  const [selectedLesson, setSelectedLesson] = useState<Lesson>(lessons[0]);
  const [completedLessons, setCompletedLessons] = useState<number[]>([1]);
  const [quizScores, setQuizScores] = useState<Record<number, number>>({});

  const progress = (completedLessons.length / lessons.length) * 100;

  const handleQuizComplete = (lessonId: number, score: number) => {
    setQuizScores({ ...quizScores, [lessonId]: score });
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  // Sample quiz for each lesson
  const getLessonQuiz = (lessonId: number) => {
    const quizzes = [
      {
        questions: [
          {
            id: 1,
            question: 'What is the most important principle in the opening?',
            options: ['Attack the king', 'Control the center', 'Develop the queen', 'Castle immediately'],
            correctAnswer: 1,
            explanation: 'Controlling the center gives your pieces maximum mobility and influence over the board.'
          },
          {
            id: 2,
            question: 'Which pieces should you develop first?',
            options: ['Rooks', 'Queen', 'Knights and Bishops', 'Pawns'],
            correctAnswer: 2,
            explanation: 'Knights and bishops should be developed early to prepare for castling and control key squares.'
          }
        ]
      },
      {
        questions: [
          {
            id: 1,
            question: 'What is a fork?',
            options: [
              'A defensive position',
              'Attacking two pieces at once',
              'Exchanging pieces',
              'A checkmate pattern'
            ],
            correctAnswer: 1,
            explanation: 'A fork is when one piece attacks two or more enemy pieces simultaneously.'
          },
          {
            id: 2,
            question: 'Which piece is best at forking?',
            options: ['Rook', 'Bishop', 'Knight', 'Queen'],
            correctAnswer: 2,
            explanation: 'Knights are excellent at forking because of their unique L-shaped movement pattern.'
          }
        ]
      }
    ];
    
    return quizzes[(lessonId - 1) % quizzes.length];
  };

  const handleMarkComplete = () => {
    if (!completedLessons.includes(selectedLesson.id)) {
      setCompletedLessons([...completedLessons, selectedLesson.id]);
    }
    
    // Auto-advance to next lesson
    const currentIndex = lessons.findIndex(l => l.id === selectedLesson.id);
    if (currentIndex < lessons.length - 1) {
      setSelectedLesson(lessons[currentIndex + 1]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Library
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{courseTitle}</h2>
          <p className="text-gray-600">{completedLessons.length} of {lessons.length} lessons completed</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Course Progress</span>
          <span className="text-gray-600">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{selectedLesson.title}</CardTitle>
              <CardDescription>{selectedLesson.duration}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="lesson" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="lesson" className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Lesson
                  </TabsTrigger>
                  <TabsTrigger value="quiz" className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    Quiz
                    {quizScores[selectedLesson.id] !== undefined && (
                      <Badge variant="secondary" className="ml-1 bg-green-100 text-green-700">
                        ✓
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="lesson" className="space-y-4">
                  {/* Video Player Placeholder */}
                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <ImageWithFallback
                      src={courseImage}
                      alt={courseTitle}
                      className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                          <Play className="w-10 h-10 text-gray-900 ml-1" />
                        </div>
                        <p className="text-white text-lg font-semibold">Video Player (Demo)</p>
                        <p className="text-gray-300 text-sm">Click play to start the lesson</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={handleMarkComplete}
                      disabled={completedLessons.includes(selectedLesson.id)}
                      className="flex-1"
                    >
                      {completedLessons.includes(selectedLesson.id) ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        'Mark as Complete'
                      )}
                    </Button>
                    {lessons.findIndex(l => l.id === selectedLesson.id) < lessons.length - 1 && (
                      <Button 
                        variant="outline"
                        onClick={() => {
                          const currentIndex = lessons.findIndex(l => l.id === selectedLesson.id);
                          setSelectedLesson(lessons[currentIndex + 1]);
                        }}
                      >
                        Next Lesson
                      </Button>
                    )}
                  </div>

                  {/* Lesson Description */}
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-base">Lesson Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700">
                        {getLessonDescription(courseId, selectedLesson.id)}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="quiz" className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg">
                    <div className="flex items-start gap-3 mb-4">
                      <Award className="w-6 h-6 text-indigo-600 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-indigo-900">Test Your Knowledge</h3>
                        <p className="text-sm text-indigo-700">
                          Complete this quiz to reinforce what you learned in this lesson
                        </p>
                      </div>
                    </div>
                    <ChessQuiz
                      quizNumber={selectedLesson.id}
                      title={selectedLesson.title}
                      questions={getLessonQuiz(selectedLesson.id).questions}
                      onComplete={(score) => handleQuizComplete(selectedLesson.id, score)}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Lesson List */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>{lessons.length} lessons</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="space-y-1 p-4">
                  {lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lesson)}
                      className={`w-full text-left p-3 rounded-lg transition-all hover:bg-gray-100 ${
                        selectedLesson.id === lesson.id ? 'bg-blue-50 border-2 border-blue-300' : 'border border-transparent'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 mt-1">
                          {completedLessons.includes(lesson.id) ? (
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                          ) : selectedLesson.id === lesson.id ? (
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <Play className="w-3 h-3 text-white" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                              <Lock className="w-3 h-3 text-gray-600" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${
                            selectedLesson.id === lesson.id ? 'text-blue-700' : 'text-gray-900'
                          }`}>
                            {lesson.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-gray-500">{lesson.duration}</p>
                            {quizScores[lesson.id] !== undefined && (
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 text-xs px-1.5 py-0">
                                <HelpCircle className="w-3 h-3 mr-1" />
                                Quiz ✓
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function getLessonTitle(courseId: number, lessonNumber: number): string {
  const lessonTitles: Record<number, string[]> = {
    1: ['Introduction to Chess', 'Understanding the Board', 'How Pieces Move', 'Basic Rules', 'Special Moves'],
    2: ['Tactical Patterns', 'Fork Tactics', 'Pin Tactics', 'Skewer Tactics', 'Discovered Attacks'],
    3: ['Positional Understanding', 'Pawn Structure', 'Piece Coordination', 'Space Advantage', 'Weak Squares'],
  };

  const titles = lessonTitles[courseId] || ['Chess Fundamentals', 'Opening Principles', 'Middle Game Strategy', 'Endgame Basics', 'Tactical Patterns'];
  return titles[(lessonNumber - 1) % titles.length] || `Topic ${lessonNumber}`;
}

function getLessonDescription(courseId: number, lessonId: number): string {
  return `In this lesson, you'll learn essential chess concepts and strategies. We'll cover key principles, practical examples, and exercises to help you improve your game. Pay attention to the patterns and techniques demonstrated in this video.`;
}
