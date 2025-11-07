import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Lock, Crown } from 'lucide-react';

interface PaywallCardProps {
  onUpgrade: () => void;
}

export function PaywallCard({ onUpgrade }: PaywallCardProps) {
  return (
    <Card className="border-2 border-purple-200">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
            <Crown className="w-10 h-10 text-purple-600" />
          </div>
        </div>
        <CardTitle className="text-2xl">AI Trainer</CardTitle>
        <CardDescription>Fitur Premium</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-center">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 space-y-3">
          <Lock className="w-12 h-12 mx-auto text-purple-600" />
          <p className="text-sm text-gray-700">
            Berlatih melawan lawan AI tingkat lanjut hingga 2800 ELO, dapatkan analisis langkah real-time, dan selesaikan puzzle tanpa batas.
          </p>
        </div>

        <div className="space-y-2">
          <h4>Yang akan Anda dapatkan:</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>✓ Lawan AI (800-2800 ELO)</li>
            <li>✓ Analisis langkah real-time</li>
            <li>✓ Puzzle catur tanpa batas</li>
            <li>✓ Lacak kemajuan Anda</li>
          </ul>
        </div>

        <div className="pt-4 space-y-3">
          <Button 
            onClick={onUpgrade}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            size="lg"
          >
            <Crown className="w-5 h-5 mr-2" />
            Upgrade ke Premium
          </Button>
          <p className="text-xs text-gray-500">
            Mulai dari Rp 99.000/bulan • Batal kapan saja
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
