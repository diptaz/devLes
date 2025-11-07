import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Check, Crown, Sparkles } from 'lucide-react';

interface PricingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubscribe: (plan: 'basic' | 'premium') => void;
  feature: 'ai';
}

export function PricingDialog({ open, onOpenChange, onSubscribe }: PricingDialogProps) {
  const featureName = 'AI Trainer';
  
  const handleSubscribe = (plan: 'basic' | 'premium') => {
    onSubscribe(plan);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Buka Akses {featureName}</DialogTitle>
          <DialogDescription>
            Pilih paket berlangganan untuk mengakses fitur premium
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          {/* Basic Plan */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>Sempurna untuk pemula</CardDescription>
                </div>
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-3xl">Rp 99.000</div>
                <p className="text-sm text-gray-600">per bulan</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">AI Trainer access (up to 1800 ELO)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Basic game analysis</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">100 puzzles per month</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Email support</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSubscribe('basic')}
                className="w-full"
                variant="outline"
              >
                Pilih Basic
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="border-2 border-purple-300 relative overflow-hidden">
            <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600">
              Populer
            </Badge>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Premium</CardTitle>
                  <CardDescription>Untuk pemain serius</CardDescription>
                </div>
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-3xl">Rp 199.000</div>
                <p className="text-sm text-gray-600">per bulan</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">AI Trainer access (up to 2800 ELO)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Advanced game analysis</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Unlimited puzzles</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Priority support</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Download game history</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Personalized training plans</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSubscribe('premium')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Pilih Premium
              </Button>
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
