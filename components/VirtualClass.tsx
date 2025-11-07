import { useState, useEffect } from 'react';
import { ChessBoard } from './ChessBoard';
import { TrainerBooking } from './TrainerBooking';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Video, Mic, MicOff, VideoOff, MessageSquare, Phone, Calendar } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface VirtualClassProps {
  showBookingForm?: boolean;
  inSession?: boolean;
  onAddToCart?: (booking: any) => void;
  isAuthenticated?: boolean;
}

export function VirtualClass({ showBookingForm, inSession, onAddToCart, isAuthenticated = true }: VirtualClassProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [hasBooking, setHasBooking] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<any>(null);
  const [messages, setMessages] = useState([
    { sender: 'instructor', text: 'Welcome to your chess lesson!', time: '10:00 AM' },
    { sender: 'student', text: 'Thank you! Ready to learn.', time: '10:01 AM' },
  ]);
  const [currentMessage, setCurrentMessage] = useState('');

  // Reset to booking form when showBookingForm prop changes
  useEffect(() => {
    if (showBookingForm === true) {
      setHasBooking(false);
      setCurrentBooking(null);
    }
  }, [showBookingForm]);

  // Start session when inSession prop is true
  useEffect(() => {
    if (inSession === true) {
      setHasBooking(true);
    }
  }, [inSession]);

  const handleBookingComplete = (booking: any) => {
    setCurrentBooking(booking);
    
    // Booking will be added to My Sessions after payment via cart
    // No longer adding directly to avoid unpaid bookings
    
    // Don't show session or add to bookings - user must complete payment first
    setHasBooking(false);
  };

  const handleSendMessage = () => {
    if (currentMessage.trim() === '') return;
    
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    
    setMessages([...messages, {
      sender: 'student',
      text: currentMessage,
      time: time
    }]);
    setCurrentMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleEndSession = () => {
    setHasBooking(false);
    setCurrentBooking(null);
    toast.info('Session ended', {
      description: 'Thank you for your time!'
    });
  };

  // If no booking, show the booking interface
  if (!hasBooking) {
    return (
      <div>
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span className="text-purple-900">Book Your First Session</span>
          </div>
          <p className="text-gray-600">
            Select your training level and choose from our expert trainers
          </p>
        </div>
        <TrainerBooking 
          onBookingComplete={handleBookingComplete} 
          onAddToCart={onAddToCart}
          isAuthenticated={isAuthenticated}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Video Area */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Live Session with GM Alex Petrov</CardTitle>
                <CardDescription>One-on-one Chess Coaching</CardDescription>
              </div>
              <Badge variant="destructive" className="animate-pulse">● LIVE</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Video Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Instructor Video */}
              <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=instructor" />
                  <AvatarFallback>AP</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-3 left-3 text-white text-sm bg-black/50 px-2 py-1 rounded">
                  GM Alex Petrov
                </div>
              </div>
              
              {/* Student Video */}
              <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=student" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-3 left-3 text-white text-sm bg-black/50 px-2 py-1 rounded">
                  You
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-3">
              <Button
                variant={isMuted ? "destructive" : "secondary"}
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="rounded-full h-12 w-12"
              >
                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>
              <Button
                variant={!isVideoOn ? "destructive" : "secondary"}
                size="icon"
                onClick={() => setIsVideoOn(!isVideoOn)}
                className="rounded-full h-12 w-12"
              >
                {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={handleEndSession}
                className="rounded-full h-12 w-12"
              >
                <Phone className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Chess Board */}
        <Card>
          <CardHeader>
            <CardTitle>Interactive Chess Board</CardTitle>
            <CardDescription>Click a piece to select, then click a destination to move</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ChessBoard interactive={true} />
          </CardContent>
        </Card>
      </div>

      {/* Chat Sidebar */}
      <div className="lg:col-span-1">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto mb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'student'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">{message.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
