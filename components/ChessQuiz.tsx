import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ChessQuizProps {
  quizNumber: number;
  title: string;
  questions: QuizQuestion[];
  onComplete?: (score: number) => void;
}

export function ChessQuiz({ quizNumber, title, questions, onComplete }: ChessQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setShowExplanation(true);
    
    if (!answeredQuestions.includes(currentQuestionIndex)) {
      setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
      if (isCorrect) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      const finalScore = isCorrect && !answeredQuestions.includes(currentQuestionIndex) 
        ? score + 1 
        : score;
      onComplete?.(finalScore);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const getScorePercentage = () => {
    return Math.round((score / questions.length) * 100);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle>Quiz #{quizNumber}: {title}</CardTitle>
            <CardDescription>
              Question {currentQuestionIndex + 1} of {questions.length}
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
            Score: {score}/{questions.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{currentQuestion.question}</h3>

          {/* Answer Options */}
          <RadioGroup 
            value={selectedAnswer?.toString()} 
            onValueChange={(value) => !showExplanation && setSelectedAnswer(parseInt(value))}
          >
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === currentQuestion.correctAnswer;
                const showCorrect = showExplanation && isCorrectAnswer;
                const showIncorrect = showExplanation && isSelected && !isCorrectAnswer;

                return (
                  <div
                    key={index}
                    className={`
                      flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all
                      ${showCorrect ? 'bg-green-50 border-green-500' : ''}
                      ${showIncorrect ? 'bg-red-50 border-red-500' : ''}
                      ${!showExplanation && isSelected ? 'bg-blue-50 border-blue-500' : ''}
                      ${!showExplanation && !isSelected ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50' : ''}
                      ${showExplanation ? 'cursor-default' : ''}
                    `}
                  >
                    <RadioGroupItem 
                      value={index.toString()} 
                      id={`option-${index}`}
                      disabled={showExplanation}
                    />
                    <Label 
                      htmlFor={`option-${index}`}
                      className={`flex-1 cursor-pointer ${showExplanation ? 'cursor-default' : ''}`}
                    >
                      {option}
                    </Label>
                    {showCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    )}
                    {showIncorrect && (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                );
              })}
            </div>
          </RadioGroup>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`
            border-2 rounded-lg p-4 animate-[slide-up_0.3s_ease-out]
            ${isCorrect 
              ? 'bg-green-50 border-green-300' 
              : 'bg-blue-50 border-blue-300'
            }
          `}>
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-1" />
              ) : (
                <XCircle className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
              )}
              <div>
                <p className={`font-semibold mb-2 ${isCorrect ? 'text-green-800' : 'text-blue-800'}`}>
                  {isCorrect ? 'Correct! 🎉' : 'Not quite!'}
                </p>
                <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-blue-700'}`}>
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {!showExplanation ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="flex-1"
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="flex-1"
            >
              {isLastQuestion ? 'View Results' : 'Next Question'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>

        {/* Quiz Complete */}
        {isLastQuestion && showExplanation && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300 rounded-lg p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quiz Complete!</h3>
              <p className="text-3xl font-bold text-purple-600 mb-2">
                {score}/{questions.length}
              </p>
              <p className="text-gray-600">
                {getScorePercentage()}% - {
                  getScorePercentage() >= 80 ? 'Excellent work! 🌟' :
                  getScorePercentage() >= 60 ? 'Good job! 👍' :
                  'Keep practicing! 💪'
                }
              </p>
            </div>
            <Button variant="outline" onClick={resetQuiz}>
              Retake Quiz
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
