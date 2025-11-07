import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { motion } from 'motion/react';
import { Sparkles, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface CoachAdvice {
  move: string;
  evaluation: string;
  reason: string;
  alternatives: { move: string; reason: string }[];
  tip: string;
}

const adviceExamples: CoachAdvice[] = [
  {
    move: 'Nf6',
    evaluation: '+0.8',
    reason: 'This knight move develops a piece while putting pressure on the center. It also prepares castling kingside.',
    alternatives: [
      { move: 'e5', reason: 'Aggressive center control' },
      { move: 'd5', reason: 'Solid central pawn structure' },
    ],
    tip: 'Remember: Knights before bishops in the opening!'
  },
  {
    move: 'O-O',
    evaluation: '+0.4',
    reason: 'Castling now protects your king and connects your rooks. This is a critical safety move.',
    alternatives: [
      { move: 'Bg5', reason: 'Pins the knight to the queen' },
      { move: 'd4', reason: 'Opens up the center' },
    ],
    tip: 'Castle early to keep your king safe!'
  },
  {
    move: 'Qd4',
    evaluation: '+1.2',
    reason: 'Excellent centralization! Your queen controls key squares and attacks multiple weaknesses.',
    alternatives: [
      { move: 'Rd1', reason: 'Pressures the d-file' },
      { move: 'Bc4', reason: 'Attacks f7' },
    ],
    tip: 'A centralized queen is a powerful queen!'
  },
];

export function AICoach() {
  const [currentAdvice, setCurrentAdvice] = useState<CoachAdvice>(adviceExamples[0]);
  const [isThinking, setIsThinking] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const getNewAdvice = () => {
    setIsThinking(true);
    setTimeout(() => {
      const randomAdvice = adviceExamples[Math.floor(Math.random() * adviceExamples.length)];
      setCurrentAdvice(randomAdvice);
      setIsThinking(false);
      setShowTip(true);
      setTimeout(() => setShowTip(false), 5000);
    }, 1500);
  };

  const getMoodColor = () => {
    const evalScore = parseFloat(currentAdvice.evaluation);
    if (evalScore > 0.5) return 'from-green-400 to-green-600';
    if (evalScore > 0) return 'from-blue-400 to-blue-600';
    if (evalScore > -0.5) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <Card className="overflow-hidden border-2 border-purple-200">
      <CardHeader className="bg-gradient-to-br from-purple-50 to-blue-50">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          Your AI Coach
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* AI Character Avatar */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: isThinking ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 0.5, repeat: isThinking ? Infinity : 0 }}
        >
          <div className={`relative bg-gradient-to-br ${getMoodColor()} p-1 rounded-full mb-4`}>
            <Avatar className="w-24 h-24 border-4 border-white">
              <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-4xl">
                🧙‍♂️
              </div>
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            {isThinking && (
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-purple-600" />
              </motion.div>
            )}
          </div>
          
          <Badge variant="secondary" className="text-xs">
            Grandmaster Level Analysis
          </Badge>
        </motion.div>

        {/* Speech Bubble with Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white border-2 border-purple-200 rounded-2xl p-4 shadow-lg"
        >
          {/* Speech bubble pointer */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-l-2 border-t-2 border-purple-200 rotate-45"></div>
          
          <div className="space-y-4">
            {/* Best Move Section */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">Best Move</span>
                </div>
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600">
                  {currentAdvice.evaluation}
                </Badge>
              </div>
              <div className="text-3xl mb-2">{currentAdvice.move}</div>
              <p className="text-sm text-gray-700">{currentAdvice.reason}</p>
            </div>

            {/* Alternative Moves */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span>Alternative Moves</span>
              </div>
              {currentAdvice.alternatives.map((alt, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span>{alt.move}</span>
                    <Badge variant="outline" className="text-xs">Option</Badge>
                  </div>
                  <p className="text-xs text-gray-600">{alt.reason}</p>
                </div>
              ))}
            </div>

            {/* Tip Notification */}
            {showTip && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-3"
              >
                <div className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-amber-900">💡 Coach's Tip</div>
                    <p className="text-xs text-amber-800 mt-1">{currentAdvice.tip}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Action Button */}
        <Button
          onClick={getNewAdvice}
          disabled={isThinking}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {isThinking ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Analyze Position
            </>
          )}
        </Button>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl">97%</div>
            <div className="text-xs text-gray-600">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl">2850</div>
            <div className="text-xs text-gray-600">ELO Rating</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
