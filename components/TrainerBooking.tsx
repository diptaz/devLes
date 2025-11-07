import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Calendar } from './ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Star, Trophy, Clock, Video, CheckCircle, ShoppingCart, Lock } from 'lucide-react';

// Helper function to format price in Rupiah
const formatRupiah = (price: number): string => {
  return `Rp ${price.toLocaleString('id-ID')}`;
};

interface Trainer {
  id: number;
  name: string;
  title: string;
  rating: number;
  specialties: string[];
  languages: string[];
  experience: string;
  hourlyRate: number;
  image: string;
  availability: string[];
}

const trainers: Trainer[] = [
  {
    id: 1,
    name: 'Grandmaster Daniel Wijaya',
    title: 'Founder & Head Coach',
    rating: 2650,
    specialties: ['Opening Theory', 'Endgame', 'Tournament Prep'],
    languages: ['Indonesian', 'English'],
    experience: '3 years teaching',
    hourlyRate: 150000,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=daniel',
    availability: ['Mon', 'Wed', 'Fri', 'Sat']
  },
  {
    id: 2,
    name: 'Dipta Pariandika',
    title: 'Youth Program Lead',
    rating: 2450,
    specialties: ['Opening Theory', 'Tactics', 'Youth Training'],
    languages: ['Indonesian', 'English'],
    experience: '1 year teaching',
    hourlyRate: 120000,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dipta',
    availability: ['Tue', 'Thu', 'Sat', 'Sun']
  },
  {
    id: 3,
    name: 'Muhamad Arsyah Albasam',
    title: 'Youth Program Lead',
    rating: 2420,
    specialties: ['Endgame', 'Youth Training', 'Strategy'],
    languages: ['Indonesian', 'English'],
    experience: '1 year teaching',
    hourlyRate: 110000,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arsyah',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  },
  {
    id: 4,
    name: 'Jason Nicholas Winata',
    title: 'Youth Program Lead',
    rating: 2380,
    specialties: ['Beginner Basics', 'Youth Training', 'Tactics'],
    languages: ['Indonesian', 'English'],
    experience: '1 year teaching',
    hourlyRate: 100000,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jason',
    availability: ['Mon', 'Wed', 'Fri', 'Sat']
  },
  {
    id: 5,
    name: 'Angelina Salim',
    title: 'Youth Program Lead',
    rating: 2400,
    specialties: ['Beginner Basics', 'Youth Training', 'Positional Play'],
    languages: ['Indonesian', 'English'],
    experience: '1 year teaching',
    hourlyRate: 105000,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=angelina',
    availability: ['Tue', 'Thu', 'Sat', 'Sun']
  },
];

const trainingLevels = [
  {
    id: 'beginner-intermediate',
    name: 'Beginner to Intermediate',
    description: 'Build a strong foundation and improve fundamental skills',
    focus: ['Basic Opening', 'Solid Moves', 'Visualization', 'Basic Ending'],
    rating: '100-1000 ELO'
  },
  {
    id: 'intermediate-advanced',
    name: 'Intermediate to Advanced',
    description: 'Refine your technique and develop strategic thinking',
    focus: ['Middlegame plan', 'Gambit Opening', 'Counter attack', 'Prophylaxis'],
    rating: '1000-1800 ELO'
  },
  {
    id: 'advanced-competition',
    name: 'Advanced to International Competition',
    description: 'Master-level training for serious competitive players',
    focus: ['Piece Rotation', 'Chess Pattern', 'Opening Repertoire', 'Advanced Tactics'],
    rating: '1800-2000+ ELO'
  }
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
];

interface TrainerBookingProps {
  onBookingComplete: (booking: any) => void;
  onAddToCart?: (booking: { 
    id: string; 
    title: string; 
    price: number; 
    type: 'booking'; 
    image: string;
    trainer: Trainer;
    level: any;
    date?: Date;
    time: string;
  }) => void;
  isAuthenticated?: boolean;
}

export function TrainerBooking({ onBookingComplete, onAddToCart, isAuthenticated = true }: TrainerBookingProps) {
  const [step, setStep] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');

  const handleAddToCart = () => {
    if (!selectedTrainer) return;
    
    const bookingId = `booking-${selectedTrainer.id}-${Date.now()}`;
    const levelData = trainingLevels.find(l => l.id === selectedLevel);
    
    const booking = {
      id: bookingId,
      title: `1 Jam dengan ${selectedTrainer.name}`,
      price: selectedTrainer.hourlyRate,
      type: 'booking' as const,
      image: selectedTrainer.image,
      trainer: selectedTrainer,
      level: levelData,
      date: selectedDate,
      time: selectedTime
    };
    
    // Add to cart (will show toast in App.tsx)
    onAddToCart?.(booking);
    
    // Notify parent (VirtualClass) that booking form is complete
    onBookingComplete(booking);
    
    // Reset form to step 1 for next booking
    setStep(1);
    setSelectedLevel('');
    setSelectedTrainer(null);
    setSelectedDate(new Date());
    setSelectedTime('');
  };

  const filteredTrainers = selectedLevel 
    ? trainers.filter(trainer => {
        if (selectedLevel === 'beginner-intermediate') return trainer.rating < 2500;
        if (selectedLevel === 'intermediate-advanced') return trainer.rating >= 2400;
        return trainer.rating >= 2600;
      })
    : trainers;

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= s
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step > s ? <CheckCircle className="w-5 h-5" /> : s}
            </div>
            {s < 4 && (
              <div
                className={`w-16 h-1 ${
                  step > s ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Training Level */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Your Training Level</CardTitle>
            <CardDescription>Choose the program that matches your current skill level</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedLevel} onValueChange={setSelectedLevel}>
              <div className="space-y-4">
                {trainingLevels.map((level) => (
                  <div
                    key={level.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedLevel === level.id
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setSelectedLevel(level.id)}
                  >
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value={level.id} id={level.id} />
                      <div className="flex-1">
                        <Label htmlFor={level.id} className="cursor-pointer">
                          <div className="flex items-center gap-2 mb-2">
                            <h4>{level.name}</h4>
                            <Badge variant="outline">{level.rating}</Badge>
                          </div>
                        </Label>
                        <p className="text-sm text-gray-600 mb-3">{level.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {level.focus.map((item, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
            <div className="flex justify-end mt-6">
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedLevel}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                Next: Choose Trainer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Select Trainer */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Choose Your Trainer</CardTitle>
            <CardDescription>Select from our expert trainers based on your level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {filteredTrainers.map((trainer) => (
                <div
                  key={trainer.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedTrainer?.id === trainer.id
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => setSelectedTrainer(trainer)}
                >
                  <div className="flex gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={trainer.image} />
                      <AvatarFallback>{trainer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4>{trainer.name}</h4>
                      <p className="text-sm text-gray-600">{trainer.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Trophy className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm">{trainer.rating} ELO</span>
                        <Star className="w-4 h-4 text-yellow-600 ml-2" />
                        <span className="text-sm">4.9</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {trainer.specialties.map((spec, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-gray-600">{trainer.experience}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Languages: {trainer.languages.join(', ')}</span>
                      <span className="text-lg font-semibold text-purple-600">{formatRupiah(trainer.hourlyRate)}/jam</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!selectedTrainer}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                Next: Select Date & Time
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Select Date and Time */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Schedule Your Session</CardTitle>
            <CardDescription>Pick a date and time that works for you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="mb-3">Select Date</h4>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  disabled={(date: number) => date < new Date()}
                />
              </div>
              <div>
                <h4 className="mb-3">Select Time</h4>
                <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? 'default' : 'outline'}
                      className={`${
                        selectedTime === time
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                          : ''
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      {time}
                    </Button>
                  ))}
                </div>
                {selectedTrainer && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-900">
                      Available days: {selectedTrainer.availability.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                onClick={() => setStep(4)}
                disabled={!selectedDate || !selectedTime}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                Next: Review & Confirm
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && selectedTrainer && (
        <Card>
          <CardHeader>
            <CardTitle>Confirm Your Booking</CardTitle>
            <CardDescription>Review your session details before confirming</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Booking Summary */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={selectedTrainer.image} />
                    <AvatarFallback>{selectedTrainer.name.split(' ').map((n: any[]) => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3>{selectedTrainer.name}</h3>
                    <p className="text-sm text-gray-600">{selectedTrainer.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Trophy className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm">{selectedTrainer.rating} ELO</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Training Level:</span>
                    <span>{trainingLevels.find(l => l.id === selectedLevel)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span>{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span>1 jam</span>
                  </div>
                  <div className="flex justify-between border-t pt-3 text-lg">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-purple-600">{formatRupiah(selectedTrainer.hourlyRate)}</span>
                  </div>
                </div>
              </div>

              {/* Session Details */}
              <div className="space-y-3">
                <h4>What to Expect:</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Video className="w-5 h-5 text-purple-600 mt-0.5" />
                    <p className="text-sm text-gray-600">Live video session with screen sharing</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <p className="text-sm text-gray-600">Interactive chess board for real-time analysis</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <p className="text-sm text-gray-600">Personalized feedback and game review</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <p className="text-sm text-gray-600">Training materials and homework</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>
                  Back
                </Button>
                <Button
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition-all"
                  size="lg"
                  disabled={!isAuthenticated}
                >
                  {!isAuthenticated && <Lock className="w-4 h-4 mr-2" />}
                  {!isAuthenticated ? (
                    'Sign in to Book'
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Tambah ke Keranjang
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
