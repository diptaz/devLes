import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Calendar, Clock, Video, Trash2, Trophy } from 'lucide-react';

interface Booking {
  id: number;
  trainer: {
    name: string;
    title: string;
    rating: number;
    image: string;
  };
  level: {
    name: string;
  };
  date: Date;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface MyBookingsProps {
  bookings: Booking[];
  onJoinSession: (bookingId: number) => void;
  onCancelBooking: (bookingId: number) => void;
  onNewBooking: () => void;
}

export function MyBookings({ bookings, onJoinSession, onCancelBooking, onNewBooking }: MyBookingsProps) {
  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const pastBookings = bookings.filter(b => b.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Upcoming Sessions */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Your scheduled training sessions</CardDescription>
            </div>
            <Button onClick={onNewBooking} className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Calendar className="w-4 h-4 mr-2" />
              Book New Session
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {upcomingBookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 mb-4">No upcoming sessions</p>
              <Button onClick={onNewBooking} variant="outline">
                Book Your First Session
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border-2 border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={booking.trainer.image} />
                      <AvatarFallback>
                        {booking.trainer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4>{booking.trainer.name}</h4>
                          <p className="text-sm text-gray-600">{booking.trainer.title}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          Upcoming
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm">{booking.trainer.rating} ELO</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {booking.date.toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {booking.time}
                        </div>
                      </div>
                      
                      <Badge variant="outline" className="mb-3">
                        {booking.level.name}
                      </Badge>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => onJoinSession(booking.id)}
                          className="bg-gradient-to-r from-purple-600 to-blue-600"
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Join Session
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => onCancelBooking(booking.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Past Sessions */}
      {pastBookings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Past Sessions</CardTitle>
            <CardDescription>Your completed training sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pastBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={booking.trainer.image} />
                      <AvatarFallback>
                        {booking.trainer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="text-sm">{booking.trainer.name}</h5>
                          <p className="text-xs text-gray-600">
                            {booking.date.toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })} at {booking.time}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Completed
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
