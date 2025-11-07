import { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Trash2, CheckCircle2, Gift, CreditCard, Wallet, Store } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

// Helper function to format price in Rupiah
const formatRupiah = (price: number): string => {
  return `Rp ${price.toLocaleString('id-ID')}`;
};

export interface CartItem {
  id: number | string;
  title: string;
  price: number;
  type: 'video' | 'ebook' | 'ai' | 'booking';
  image: string;
  trainer?: any;
  level?: any;
  date?: Date;
  time?: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: number | string) => void;
  onClearCart: () => void;
}

export function Cart({ isOpen, onClose, items, onRemoveItem, onClearCart }: CartProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ewallet' | 'store'>('card');
  const [processedItems, setProcessedItems] = useState<CartItem[]>([]);
  const [processedPaymentMethod, setProcessedPaymentMethod] = useState<'card' | 'ewallet' | 'store'>('card');
  
  const hasBookings = items.some(item => item.type === 'booking');
  const hasPaidItems = items.some(item => item.price > 0);
  const hasFreeItems = items.some(item => item.price === 0);
  const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

  console.log('[Cart] Current items:', items);
  console.log('[Cart] Has paid items:', hasPaidItems);
  console.log('[Cart] Has free items:', hasFreeItems);
  console.log('[Cart] Total amount:', totalAmount);
  console.log('[Cart] Item breakdown:');
  items.forEach(item => {
    console.log(`  - ${item.title}: Rp ${item.price} (${item.price === 0 ? 'FREE' : 'PAID'})`);
  });

  const handleCheckout = () => {
    console.log(`[Cart] Checkout initiated. Total: ${totalAmount === 0 ? 'FREE' : formatRupiah(totalAmount)}`);
    // If total is 0 (free trial only), skip payment method selection
    if (totalAmount === 0) {
      setShowConfirmDialog(true);
    } else {
      // Show payment method selection first
      setShowPaymentMethod(true);
    }
  };

  const handlePaymentMethodSelected = () => {
    setShowPaymentMethod(false);
    setShowConfirmDialog(true);
  };

  const handleConfirmPayment = async () => {
    setShowConfirmDialog(false);
    setIsProcessing(true);
    
    // Store items and payment method before clearing
    setProcessedItems([...items]);
    setProcessedPaymentMethod(paymentMethod);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsProcessing(false);
    setIsPaid(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setIsPaid(false);
      setPaymentMethod('card'); // Reset payment method
      onClearCart();
      onClose();
    }, 3000);
  };

  if (isPaid) {
    const hadBookings = processedItems.some(item => item.type === 'booking');
    const hadAI = processedItems.some(item => item.type === 'ai');
    const hadCourses = processedItems.some(item => item.type === 'video' || item.type === 'ebook');
    const processedTotal = processedItems.reduce((sum, item) => sum + item.price, 0);
    
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <div className="flex flex-col items-center justify-center h-full space-y-6 relative">
            {/* Confetti effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-br from-green-400 to-blue-400 rounded-full animate-[fall_2s_ease-out_infinite]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    opacity: Math.random() * 0.7 + 0.3
                  }}
                />
              ))}
            </div>
            
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-[scale-in_0.5s_ease-out] relative z-10">
              <CheckCircle2 className="w-16 h-16 text-green-600" />
            </div>
            <div className="text-center space-y-3 relative z-10">
              <h2 className="text-3xl font-bold text-purple-600">Pembayaran Berhasil! 🎉</h2>
              
              {/* Payment method info if paid */}
              {processedTotal > 0 && (
                <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full border-2 border-green-200">
                  {processedPaymentMethod === 'card' && <CreditCard className="w-4 h-4 text-blue-600" />}
                  {processedPaymentMethod === 'ewallet' && <Wallet className="w-4 h-4 text-green-600" />}
                  {processedPaymentMethod === 'store' && <Store className="w-4 h-4 text-orange-600" />}
                  <span className="text-sm font-medium text-gray-700">
                    {processedPaymentMethod === 'card' ? 'Kartu' : 
                     processedPaymentMethod === 'ewallet' ? 'E-Wallet' : 
                     'Indomaret/Alfamart'}
                  </span>
                  <span className="text-sm font-bold text-purple-600">{formatRupiah(processedTotal)}</span>
                </div>
              )}
              
              <div className="space-y-1">
                {hadCourses && <p className="text-gray-600">✅ Kursus ditambahkan ke My Library</p>}
                {hadAI && <p className="text-gray-600">✅ AI Trainer diaktifkan</p>}
                {hadBookings && <p className="text-gray-600">✅ Booking ditambahkan ke My Sessions</p>}
                {!hadCourses && !hadAI && !hadBookings && (
                  <p className="text-gray-600">Semua item berhasil diaktifkan!</p>
                )}
              </div>
              <p className="text-sm text-gray-500">Selamat belajar dan berlatih!</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Keranjang Belanja</SheetTitle>
            <SheetDescription>
              {items.length === 0 ? 'Keranjang Anda kosong' : `${items.length} item dalam keranjang`}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Belum ada item di keranjang</p>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow animate-[slide-up_0.3s_ease-out]"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{item.title}</h4>
                        <div className="flex gap-2 items-center mt-1">
                          <Badge variant="secondary">
                            {item.type === 'video' ? 'Kursus Video' : 
                             item.type === 'ebook' ? 'E-Book' : 
                             item.type === 'ai' ? 'AI Trainer' : 
                             'Virtual Class'}
                          </Badge>
                          {item.type === 'ai' && (
                            <Badge className="bg-purple-600 text-white text-xs">
                              Paket Aktif
                            </Badge>
                          )}
                        </div>
                        {item.type === 'booking' && item.date && item.time && (
                          <p className="text-xs text-gray-600 mt-1">
                            {item.date.toLocaleDateString('id-ID')} • {item.time}
                          </p>
                        )}
                        {item.type === 'ai' && (
                          <p className="text-xs text-purple-600 mt-1">
                            ℹ️ Memilih paket AI lain akan mengganti paket ini
                          </p>
                        )}
                        <div className="mt-1">
                          {item.price > 0 ? (
                            <p className="text-lg font-bold text-purple-600">{formatRupiah(item.price)}</p>
                          ) : (
                            <p className="text-lg font-bold text-green-600">FREE TRIAL</p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveItem(item.id)}
                        className="shrink-0 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Total Summary Banner */}
                <div className="space-y-3 bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg border-2 border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Ringkasan Pesanan</h3>
                      <p className="text-sm text-gray-600">Total {items.length} item</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm pt-2">
                    {items.filter(item => item.price === 0).length > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Free Trial ({items.filter(item => item.price === 0).length} item):</span>
                        <span className="font-medium text-green-600">GRATIS</span>
                      </div>
                    )}
                    {items.filter(item => item.price > 0).length > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Item Berbayar ({items.filter(item => item.price > 0).length} item):</span>
                        <span className="font-medium text-purple-600">
                          {formatRupiah(items.filter(item => item.price > 0).reduce((sum, item) => sum + item.price, 0))}
                        </span>
                      </div>
                    )}
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-bold">Total Pembayaran:</span>
                      <span className="font-bold text-2xl text-purple-600">
                        {totalAmount === 0 ? 'GRATIS' : formatRupiah(totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Confirm Button */}
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Memproses...
                    </div>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      {totalAmount === 0 ? 'Konfirmasi Free Trial' : 'Lanjut ke Pembayaran'}
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Payment Method Selection Dialog */}
      <AlertDialog open={showPaymentMethod} onOpenChange={setShowPaymentMethod}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Pilih Metode Pembayaran</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Total pembayaran: <span className="font-bold text-purple-600 text-lg">{formatRupiah(totalAmount)}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="py-4">
            <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
              <div className="space-y-3">
                {/* Card Payment */}
                <div 
                  className={`relative flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <Badge className="absolute top-2 right-2 bg-green-500 text-white text-xs">Paling Cepat</Badge>
                  <RadioGroupItem value="card" id="card" className="mt-1" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-md">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">Kartu Debit/Kredit</p>
                        <p className="text-sm text-gray-500">Visa, Mastercard, JCB</p>
                      </div>
                    </div>
                  </Label>
                </div>

                {/* E-Wallet Payment */}
                <div 
                  className={`relative flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === 'ewallet' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                  }`}
                  onClick={() => setPaymentMethod('ewallet')}
                >
                  <Badge className="absolute top-2 right-2 bg-blue-500 text-white text-xs">Praktis</Badge>
                  <RadioGroupItem value="ewallet" id="ewallet" className="mt-1" />
                  <Label htmlFor="ewallet" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center shadow-md">
                        <Wallet className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">E-Wallet</p>
                        <p className="text-sm text-gray-500">GoPay, OVO, DANA, ShopeePay</p>
                      </div>
                    </div>
                  </Label>
                </div>

                {/* Store Payment */}
                <div 
                  className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === 'store' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                  }`}
                  onClick={() => setPaymentMethod('store')}
                >
                  <RadioGroupItem value="store" id="store" className="mt-1" />
                  <Label htmlFor="store" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-md">
                        <Store className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">Indomaret / Alfamart</p>
                        <p className="text-sm text-gray-500">Bayar di toko terdekat</p>
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
            
            {/* Payment method instruction */}
            {paymentMethod === 'store' && (
              <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-xs text-orange-800">
                  <strong>ℹ️ Instruksi:</strong> Setelah konfirmasi, Anda akan mendapat kode pembayaran untuk dibayarkan di Indomaret/Alfamart terdekat dalam 24 jam.
                </p>
              </div>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Kembali</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handlePaymentMethodSelected}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Lanjutkan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Pembayaran</AlertDialogTitle>
            <AlertDialogDescription>
              Anda akan melakukan pembayaran untuk {items.length} item
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-3">
            {/* Payment Method Info */}
            {totalAmount > 0 && (
              <div className={`border-2 rounded-lg p-3 ${
                paymentMethod === 'card' ? 'bg-blue-50 border-blue-200' :
                paymentMethod === 'ewallet' ? 'bg-green-50 border-green-200' :
                'bg-orange-50 border-orange-200'
              }`}>
                <p className={`text-sm font-semibold mb-2 ${
                  paymentMethod === 'card' ? 'text-blue-700' :
                  paymentMethod === 'ewallet' ? 'text-green-700' :
                  'text-orange-700'
                }`}>
                  Metode Pembayaran:
                </p>
                <div className="flex items-center gap-2 mb-2">
                  {paymentMethod === 'card' && (
                    <>
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">Kartu Debit/Kredit</span>
                    </>
                  )}
                  {paymentMethod === 'ewallet' && (
                    <>
                      <Wallet className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">E-Wallet</span>
                    </>
                  )}
                  {paymentMethod === 'store' && (
                    <>
                      <Store className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-medium text-gray-700">Indomaret / Alfamart</span>
                    </>
                  )}
                </div>
                {/* Instructions based on payment method */}
                <p className="text-xs text-gray-600 border-t pt-2 mt-2">
                  {paymentMethod === 'card' && '💳 Anda akan diarahkan ke halaman pembayaran kartu yang aman'}
                  {paymentMethod === 'ewallet' && '📱 Pilih e-wallet favorit Anda di halaman selanjutnya'}
                  {paymentMethod === 'store' && '🏪 Kode pembayaran akan dikirim untuk dibayar dalam 24 jam'}
                </p>
              </div>
            )}
            
            {items.filter(item => item.price === 0).length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm font-semibold text-green-700 mb-1">
                  Free Trial ({items.filter(item => item.price === 0).length} item):
                </p>
                <p className="text-sm text-gray-700">
                  ✓ Akses penuh ke semua fitur<br />
                  ✓ Belajar dan berlatih tanpa batas<br />
                  ✓ Tersimpan permanen di library Anda
                </p>
              </div>
            )}
            {items.filter(item => item.price > 0).length > 0 && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <p className="text-sm font-semibold text-purple-700 mb-1">
                  Item Berbayar ({items.filter(item => item.price > 0).length} item):
                </p>
                <div className="text-sm text-gray-700 space-y-1">
                  {items.filter(item => item.price > 0).map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>• {item.title}</span>
                      <span className="font-medium">{formatRupiah(item.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-600 mb-1">Total Pembayaran:</p>
              <p className="text-2xl font-bold text-purple-600">
                {totalAmount === 0 ? 'GRATIS' : formatRupiah(totalAmount)}
              </p>
            </div>
            <p className="text-sm text-gray-600 text-center">
              Apakah Anda ingin melanjutkan pembayaran?
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              // If they cancel and there's a paid amount, go back to payment method selection
              if (totalAmount > 0) {
                setTimeout(() => setShowPaymentMethod(true), 100);
              }
            }}>
              {totalAmount > 0 ? 'Ubah Metode' : 'Batal'}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmPayment}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Ya, Konfirmasi!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
