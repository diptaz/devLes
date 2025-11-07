import { useState, useEffect } from 'react';
import { ChessBoard } from './ChessBoard';
import { AICoach } from './AICoach';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Brain, Zap, Target, TrendingUp, Lightbulb, ShoppingCart, Lock, Sparkles } from 'lucide-react';

// Helper function to format price in Rupiah
const formatRupiah = (price: number): string => {
  return `Rp ${price.toLocaleString('id-ID')}`;
};

// AI Trainer Packages
const aiPackages = [
  {
    id: 'ai-trial',
    title: 'AI Trainer - Free Trial',
    description: '7 hari akses gratis',
    price: 0,
    originalPrice: 110000,
    features: ['7 hari full access', '50 AI games', 'Basic analysis', 'Difficulty up to 2000 ELO'],
    badge: 'Free Trial',
    badgeColor: 'bg-green-600'
  },
  {
    id: 'ai-basic',
    title: 'AI Trainer - Basic',
    description: '30 hari akses penuh',
    price: 110000,
    features: ['30 hari full access', '500 AI games', 'Advanced analysis', 'Difficulty up to 2200 ELO'],
    badge: 'Populer',
    badgeColor: 'bg-blue-600'
  },
  {
    id: 'ai-premium',
    title: 'AI Trainer - Premium',
    description: '90 hari unlimited access',
    price: 145000,
    features: ['90 hari unlimited', 'Unlimited AI games', 'Expert analysis', 'All difficulty levels', 'Personalized hints', 'Priority support'],
    badge: 'Best Value',
    badgeColor: 'bg-purple-600'
  }
];

interface AITrainerProps {
  onAddToCart?: (item: { id: string | number; title: string; price: number; type: 'video' | 'ebook' | 'ai'; image: string }) => void;
  isAuthenticated?: boolean;
  hasPremiumAccess?: boolean;
  activePackage?: string | null;
}

export function AITrainer({ onAddToCart, isAuthenticated = true, hasPremiumAccess = false, activePackage = null }: AITrainerProps) {
  const [difficulty, setDifficulty] = useState([1500]);
  const [gameMode, setGameMode] = useState<'practice' | 'analysis' | 'puzzle'>('practice');

  const difficultyLabel = () => {
    const elo = difficulty[0];
    if (elo < 1200) return 'Beginner';
    if (elo < 1600) return 'Intermediate';
    if (elo < 2000) return 'Advanced';
    return 'Master';
  };

  // ALWAYS show packages if no premium access (paywall)
  if (!hasPremiumAccess) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-4 border border-purple-200">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-purple-900">🚀 Pilih Paket AI Trainer</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            3 Paket AI Trainer Tersedia
          </h2>
          <p className="text-gray-600 mb-2">
            Pilih paket yang sesuai dengan kebutuhan Anda - mulai dari <strong className="text-green-600">Free Trial GRATIS</strong>!
          </p>
          <div className="flex items-center justify-center gap-4 text-sm mt-3">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
              ✓ Free Trial - Rp 0
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
              ✓ Basic - Rp 110.000
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">
              ✓ Premium - Rp 145.000
            </Badge>
          </div>
          <p className="text-sm text-purple-600 mt-4 font-semibold">
            ℹ️ Anda hanya bisa memilih satu paket AI pada satu waktu
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {aiPackages.map((pkg) => (
            <Card key={pkg.id} className={`overflow-hidden hover:shadow-xl transition-all relative ${
              pkg.id === 'ai-basic' ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-200' : ''
            }`}>
              {/* Badge */}
              <div className={`absolute top-4 right-4 ${pkg.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-md`}>
                {pkg.badge}
              </div>

              <div className={`bg-gradient-to-br p-6 ${
                pkg.id === 'ai-trial' ? 'from-green-100 to-emerald-100' :
                pkg.id === 'ai-basic' ? 'from-blue-100 to-cyan-100' :
                'from-purple-100 to-pink-100'
              }`}>
                <Brain className={`w-12 h-12 mb-4 ${
                  pkg.id === 'ai-trial' ? 'text-green-600' :
                  pkg.id === 'ai-basic' ? 'text-blue-600' :
                  'text-purple-600'
                }`} />
                <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                <p className="text-gray-600 text-sm">{pkg.description}</p>
              </div>
              <CardContent className="p-6 space-y-4">
                <ul className="space-y-2 min-h-[160px]">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        pkg.id === 'ai-trial' ? 'bg-green-600' :
                        pkg.id === 'ai-basic' ? 'bg-blue-600' :
                        'bg-purple-600'
                      }`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t">
                  <div className="flex flex-col mb-4">
                    {pkg.price === 0 ? (
                      <>
                        <span className="text-3xl font-bold text-green-600">GRATIS</span>
                        <span className="text-xs text-gray-500">Free Trial 7 Hari</span>
                      </>
                    ) : (
                      <>
                        <span className={`text-3xl font-bold ${
                          pkg.id === 'ai-basic' ? 'text-blue-600' : 'text-purple-600'
                        }`}>{formatRupiah(pkg.price)}</span>
                        <span className="text-xs text-gray-500">
                          Sekali bayar {pkg.id === 'ai-basic' && '• Paling Populer'}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <Button 
                    onClick={() => {
                      if (!isAuthenticated) {
                        console.log('[AITrainer] User not authenticated - cannot add to cart');
                        return;
                      }
                      console.log(`[AITrainer] Adding to cart: ${pkg.id} - ${pkg.title}`);
                      if (onAddToCart) {
                        onAddToCart({ 
                          id: pkg.id, 
                          title: pkg.title, 
                          price: pkg.price, 
                          type: 'ai',
                          image: 'https://images.unsplash.com/photo-1611195974226-ef4c0ca524f7?w=400'
                        });
                        console.log(`[AITrainer] ✅ ${pkg.id} added to cart successfully`);
                      } else {
                        console.warn('[AITrainer] ⚠️ onAddToCart is not defined');
                      }
                    }}
                    disabled={!isAuthenticated}
                    className={`w-full transition-all hover:scale-105 group font-semibold ${
                      pkg.price === 0 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : pkg.id === 'ai-basic'
                          ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-300/50'
                          : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                  >
                    {!isAuthenticated && <Lock className="w-4 h-4 mr-2" />}
                    {!isAuthenticated ? (
                      'Sign In untuk Lanjut'
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2 group-hover:animate-[bounce_0.6s_ease-in-out]" />
                        {pkg.price === 0 ? 'Ambil Free Trial' : 'Tambah ke Cart'}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No back button - user must purchase to access AI content */}
      </div>
    );
  }

  // Only show AI content if user has premium access
  if (!hasPremiumAccess) {
    return null; // This should never happen due to the check above, but just in case
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chess Board Section */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-6 h-6 text-purple-600" />
                  AI Chess Trainer
                  {hasPremiumAccess && activePackage && (
                    <Badge className={
                      activePackage === 'Free Trial' ? 'bg-green-600' :
                      activePackage === 'Basic' ? 'bg-blue-600' :
                      activePackage === 'Premium' ? 'bg-purple-600' :
                      'bg-green-600'
                    }>
                      {activePackage} Active
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>Practice against AI and improve your skills</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {!hasPremiumAccess && (
                  <Button
                    size="sm"
                    onClick={() => setShowPackages(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Lihat Paket AI
                  </Button>
                )}
                <Badge variant="secondary">{difficultyLabel()} - {difficulty[0]} ELO</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Game Mode Tabs */}
            <div className="flex gap-2">
              <Button
                variant={gameMode === 'practice' ? 'default' : 'outline'}
                onClick={() => setGameMode('practice')}
                className="flex-1"
              >
                <Target className="w-4 h-4 mr-2" />
                Practice
              </Button>
              <Button
                variant={gameMode === 'analysis' ? 'default' : 'outline'}
                onClick={() => setGameMode('analysis')}
                className="flex-1"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Analysis
              </Button>
              <Button
                variant={gameMode === 'puzzle' ? 'default' : 'outline'}
                onClick={() => setGameMode('puzzle')}
                className="flex-1"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Puzzles
              </Button>
            </div>

            {/* Chess Board */}
            <div className="flex justify-center">
              <ChessBoard interactive={true} />
            </div>

            {/* AI Difficulty Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm">AI Difficulty</label>
                <span className="text-sm text-gray-600">{difficulty[0]} ELO</span>
              </div>
              <Slider
                value={difficulty}
                onValueChange={setDifficulty}
                min={800}
                max={2800}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Advanced</span>
                <span>Master</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                className="flex-1"
                disabled={!hasPremiumAccess}
              >
                <Zap className="w-4 h-4 mr-2" />
                New Game
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                disabled={!hasPremiumAccess}
              >
                Request Hint
              </Button>
            </div>

            {/* Premium access is required to see this content - no paywall here */}
          </CardContent>
        </Card>
      </div>

      {/* AI Coach Sidebar */}
      <div className="lg:col-span-1 space-y-4">
        {/* AI Coach Character */}
        <AICoach />

        {/* Your Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Your Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Games Played</span>
              <span>127</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Win Rate</span>
              <span className="text-green-600">58%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Current Rating</span>
              <span>1642 ELO</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Puzzles Solved</span>
              <span>342</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
