import { useState, useEffect } from 'react';
import { CourseCard } from './components/CourseCard';
import { VirtualClass } from './components/VirtualClass';
import { MyBookings } from './components/MyBookings';
import { AITrainer } from './components/AITrainer';
import { AuthDialog } from './components/AuthDialog';
import { PricingDialog } from './components/PricingDialog';
import { PaywallCard } from './components/PaywallCard';
import { Cart, CartItem } from './components/Cart';
import { MyLibrary, PurchasedCourse } from './components/MyLibrary';
import { CourseViewer } from './components/CourseViewer';
import { EbookReader } from './components/EbookReader';
import { AboutUs } from './components/AboutUs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { ShoppingCart, GraduationCap, Video, Brain, User, LogOut, Crown, Calendar, BookOpen, Info } from 'lucide-react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Avatar, AvatarFallback } from './components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './components/ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';
import './components/MobileResponsive.css';

const courses = [
  {
    id: 1,
    title: 'Complete Chess Beginner Course',
    description: 'Master the fundamentals of chess from opening to endgame',
    price: 120000,
    duration: '12 hours',
    lessons: 48,
    type: 'video' as const,
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1612117229486-78abff6d84c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHZpZGVvfGVufDF8fHx8MTc2MTI2NjQxNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    title: 'Advanced Chess Tactics',
    description: 'Learn powerful tactical patterns and combinations',
    price: 150000,
    duration: '18 hours',
    lessons: 64,
    type: 'video' as const,
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1523875194681-bedd468c58bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVzcyUyMHN0cmF0ZWd5fGVufDF8fHx8MTc2MTI3MTA1MHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    title: 'Chess Strategy Masterclass',
    description: 'Deep dive into positional play and strategic concepts',
    price: 145000,
    duration: '20 hours',
    lessons: 72,
    type: 'video' as const,
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1653510640359-cbc4c1f3a90f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVzcyUyMGJvYXJkJTIwZ2FtZXxlbnwxfHx8fDE3NjEyMDUzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    title: 'Opening Repertoire E-Book',
    description: 'Complete guide to building your opening repertoire',
    price: 100000,
    duration: '350 pages',
    lessons: 25,
    type: 'ebook' as const,
    level: 'All Levels',
    image: 'https://images.unsplash.com/photo-1523875194681-bedd468c58bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVzcyUyMHN0cmF0ZWd5fGVufDF8fHx8MTc2MTI3MTA1MHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 5,
    title: 'Endgame Mastery E-Book',
    description: 'Essential endgame positions every player must know',
    price: 110000,
    duration: '420 pages',
    lessons: 30,
    type: 'ebook' as const,
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1653510640359-cbc4c1f3a90f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVzcyUyMGJvYXJkJTIwZ2FtZXxlbnwxfHx8fDE3NjEyMDUzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 6,
    title: 'Chess Puzzle Collection',
    description: '1000+ puzzles to sharpen your tactical vision',
    price: 105000,
    duration: '280 pages',
    lessons: 1000,
    type: 'ebook' as const,
    level: 'All Levels',
    image: 'https://images.unsplash.com/photo-1612117229486-78abff6d84c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHZpZGVvfGVufDF8fHx8MTc2MTI2NjQxNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

interface User {
  email: string;
  name: string;
  subscription: 'none' | 'basic' | 'premium';
}

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

export default function App() {
  const [activeTab, setActiveTab] = useState('courses');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showPricingDialog, setShowPricingDialog] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [inSession, setInSession] = useState(false);
  const [cartButtonAnimation, setCartButtonAnimation] = useState(false);
  const [purchasedCourses, setPurchasedCourses] = useState<PurchasedCourse[]>([]);
  const [viewingCourse, setViewingCourse] = useState<{ id: number; type: 'video' | 'ebook' } | null>(null);
  const [initializing, setInitializing] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      const { getCurrentUser } = await import('./utils/supabase/client');
      const { getProfile, getSubscription } = await import('./utils/api');
      
      const currentUser = await getCurrentUser();
      
      if (currentUser) {
        // User is logged in, get profile and subscription
        try {
          const [profileResult, subscriptionResult] = await Promise.all([
            getProfile().catch((err) => {
              console.log('Profile not found, might be a new user:', err);
              return null;
            }),
            getSubscription().catch((err) => {
              console.log('Subscription not found, might be a new user:', err);
              return null;
            })
          ]);
          
          if (profileResult && profileResult.profile) {
            const { profile } = profileResult;
            const { subscription } = subscriptionResult || { subscription: { hasAIAccess: false } };
            
            setUser({
              email: profile.email,
              name: profile.name,
              subscription: subscription.hasAIAccess ? 'premium' : 'none'
            });
          } else {
            // Profile doesn't exist yet, use basic info from currentUser
            setUser({
              email: currentUser.email || 'user@email.com',
              name: currentUser.user_metadata?.name || currentUser.email?.split('@')[0] || 'User',
              subscription: 'none'
            });
          }
        } catch (err) {
          console.log('Error loading user data:', err);
          // Still set basic user info from auth
          setUser({
            email: currentUser.email || 'user@email.com',
            name: currentUser.user_metadata?.name || currentUser.email?.split('@')[0] || 'User',
            subscription: 'none'
          });
        }
      }
    } catch (error) {
      // Silently handle session check errors (user simply not logged in)
      console.log('No active session found');
    } finally {
      setInitializing(false);
    }
  };

  const handleLogin = (email: string, name: string) => {
    setUser({
      email,
      name,
      subscription: 'none'
    });
    // After login, refresh data
    checkExistingSession();
  };

  const handleLogout = async () => {
    try {
      const { signOut } = await import('./utils/supabase/client');
      await signOut();
      
      setUser(null);
      setActiveTab('courses');
      setCartItems([]);
      setPurchasedCourses([]);
      setBookings([]);
      
      toast.info('Signed out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to sign out');
    }
  };

  const handleSubscribe = (plan: 'basic' | 'premium') => {
    if (user) {
      setUser({
        ...user,
        subscription: plan
      });
    }
  };

  const handleTabChange = (value: string) => {
    // Library requires login
    if (value === 'library' && !user) {
      toast.error('Please sign in to access your library', {
        description: 'Create an account to save your courses'
      });
      setShowAuthDialog(true);
      return;
    }

    // Virtual Classes only require login (free access)
    if (value === 'virtual' && !user) {
      setShowAuthDialog(true);
      return;
    }
    
    // AI Trainer requires login only - packages will be shown in the tab
    if (value === 'ai' && !user) {
      setShowAuthDialog(true);
      return;
    }
    
    // Don't block AI tab - let AITrainer component handle package display
    // if (value === 'ai' && user && user.subscription === 'none') {
    //   setShowPricingDialog(true);
    //   return;
    // }
    
    setActiveTab(value);
    
    // Scroll to top when changing tabs
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpgradeClick = () => {
    if (!user) {
      setShowAuthDialog(true);
    } else {
      setShowPricingDialog(true);
    }
  };

  const hasAIAccess = user && (user.subscription !== 'none' || purchasedCourses.some(c => (c.id as string)?.toString().startsWith('ai-')));
  const hasVirtualAccess = user !== null; // Virtual classes only need login
  
  // Detect which AI package is active
  const activeAIPackage = purchasedCourses.find(c => (c.id as string)?.toString().startsWith('ai-'));
  const aiPackageType = activeAIPackage ? 
    (activeAIPackage.id === 'ai-trial' ? 'Free Trial' : 
     activeAIPackage.id === 'ai-basic' ? 'Basic' : 
     activeAIPackage.id === 'ai-premium' ? 'Premium' : 'Active') : null;

  const handleNewBooking = () => {
    setActiveTab('virtual');
    setShowBookingForm(true);
    setInSession(false);
  };

  const handleJoinSession = (bookingId: number) => {
    setInSession(true);
    setShowBookingForm(false);
    setActiveTab('virtual');
    toast.success('Joining your session...', {
      description: 'Connecting to your virtual classroom'
    });
  };

  const handleCancelBooking = (bookingId: number) => {
    setBookings(bookings.filter(b => b.id !== bookingId));
    toast.success('Booking cancelled successfully');
  };

  const handleAddToCart = (course: CartItem) => {
    console.log(`[Cart] Adding to cart:`, course);
    console.log(`[Cart] Item details - Title: "${course.title}", Price: ${course.price}, Type: ${course.type}`);
    
    // Check if user is logged in
    if (!user) {
      toast.error('Silakan login untuk melanjutkan', {
        description: course.type === 'booking' ? 'Buat akun untuk booking trainer' : 'Buat akun untuk mendapatkan kursus gratis'
      });
      setShowAuthDialog(true);
      return;
    }

    // Check if already purchased (only for courses, not bookings)
    if (course.type !== 'booking' && purchasedCourses.find(item => item.id === course.id)) {
      toast.info('Anda sudah memiliki kursus ini! Cek My Library.');
      return;
    }

    // Check if item already in cart
    if (cartItems.find(item => item.id === course.id)) {
      toast.error('Item ini sudah ada di keranjang Anda!');
      return;
    }

    // Special handling for AI packages: Only one AI package allowed at a time
    let isAIReplacement = false;
    if (course.type === 'ai') {
      const existingAI = cartItems.find(item => item.type === 'ai');
      if (existingAI) {
        console.log(`[Cart] 🔄 Replacing AI package: "${existingAI.title}" → "${course.title}"`);
        // Remove existing AI package and add new one
        const updatedCart = cartItems.filter(item => item.type !== 'ai');
        setCartItems([...updatedCart, course]);
        isAIReplacement = true;
        
        toast.info(`Paket AI diganti! 🔄`, {
          description: `"${existingAI.title}" → "${course.title}"`
        });
      } else {
        console.log(`[Cart] ✅ Adding first AI package: "${course.title}"`);
        setCartItems([...cartItems, course]);
      }
    } else {
      setCartItems([...cartItems, course]);
    }
    
    // Trigger animation
    setCartButtonAnimation(true);
    setTimeout(() => setCartButtonAnimation(false), 600);
    
    // Different success message for bookings, AI, and courses (skip if AI replacement)
    if (!isAIReplacement) {
      if (course.type === 'booking') {
        toast.success(`${course.title} ditambahkan ke keranjang! 🎓`, {
          description: 'Lanjutkan ke pembayaran untuk konfirmasi booking'
        });
      } else if (course.type === 'ai') {
        if (course.price === 0) {
          toast.success(`${course.title} ditambahkan ke keranjang! 🤖`, {
            description: 'Free trial 7 hari - Dapatkan gratis sekarang!'
          });
        } else {
          toast.success(`${course.title} ditambahkan ke keranjang! 🤖`, {
            description: `Total: Rp ${course.price.toLocaleString('id-ID')} - Lanjut ke pembayaran`
          });
        }
      } else {
        // For video/ebook courses
        if (course.price === 0) {
          toast.success(`${course.title} ditambahkan ke keranjang! 🎁`, {
            description: 'Free trial - Dapatkan gratis sekarang!'
          });
        } else {
          toast.success(`${course.title} ditambahkan ke keranjang! 🎁`, {
            description: `Total: Rp ${course.price.toLocaleString('id-ID')} - Lanjut ke pembayaran`
          });
        }
      }
    }
  };

  const handleRemoveFromCart = (id: number | string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast.success('Item dihapus dari keranjang');
  };

  const handleClearCart = () => {
    console.log('[Checkout] Processing cart items:', cartItems);
    
    // Separate booking items from course items
    const bookingItems = cartItems.filter(item => item.type === 'booking');
    const courseItems = cartItems.filter(item => item.type !== 'booking');
    
    console.log('[Checkout] Course items (including AI):', courseItems);
    console.log('[Checkout] Booking items:', bookingItems);
    
    // Add purchased courses to library
    const newPurchases: PurchasedCourse[] = courseItems.map(item => {
      const courseData = courses.find(c => c.id === item.id);
      return {
        ...item,
        description: courseData?.description || '',
        duration: courseData?.duration || '',
        lessons: courseData?.lessons || 0,
        level: courseData?.level || 'All Levels',
        progress: 0
      };
    });
    
    console.log('[Checkout] New purchases to add:', newPurchases);
    
    // Add bookings to My Sessions
    const newBookings: Booking[] = bookingItems.map(item => ({
      id: Date.now() + Math.random(), // Ensure unique ID
      trainer: {
        name: item.trainer?.name || 'Unknown Trainer',
        title: item.trainer?.title || 'Chess Instructor',
        rating: item.trainer?.rating || 2400,
        image: item.image
      },
      level: {
        name: item.level?.name || 'Beginner to Intermediate'
      },
      date: item.date || new Date(),
      time: item.time || '10:00 AM',
      status: 'upcoming' as const
    }));
    
    const updatedPurchasedCourses = [...purchasedCourses, ...newPurchases];
    setPurchasedCourses(updatedPurchasedCourses);
    setBookings([...bookings, ...newBookings]);
    setCartItems([]);
    
    console.log('[Checkout] ✅ Purchase complete! Updated library:', updatedPurchasedCourses);
    
    // Check if AI access is now granted
    const hasAIPackage = updatedPurchasedCourses.some(c => (c.id as string)?.toString().startsWith('ai-'));
    if (hasAIPackage) {
      const aiPackage = updatedPurchasedCourses.find(c => (c.id as string)?.toString().startsWith('ai-'));
      console.log('[Checkout] 🤖 AI Access GRANTED! Package:', aiPackage?.title);
    }
    
    // Show success message - This is handled by Cart component now
    // setTimeout(() => {
    //   toast.success('🎉 Kursus ditambahkan ke library Anda!', {
    //     description: 'Akses dari tab My Library'
    //   });
    // }, 100);
  };

  const handleOpenCourse = (courseId: number, type: 'video' | 'ebook') => {
    setViewingCourse({ id: courseId, type });
  };

  const handleBackToLibrary = () => {
    setViewingCourse(null);
    setActiveTab('library');
  };

  // Show loading screen while checking session
  if (initializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 animate-pulse">
            <ImageWithFallback
              src="https://i.ibb.co.com/prPHQSTS/logo-Les-Catur.jpg"
              alt="LesCatur Logo"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <h2 className="text-xl mb-2 text-gray-800">Loading LesCatur...</h2>
          <p className="text-sm text-gray-600">Checking your session</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10">
                <ImageWithFallback
                  src="https://i.ibb.co.com/prPHQSTS/logo-Les-Catur.jpg"
                  alt="LesCatur Logo"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl">LesCatur</h1>
                <p className="text-xs text-gray-600 hidden sm:block">Two Steps Ahead, Crown on Your Head</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <Button 
                variant="outline" 
                className={`relative transition-all ${cartButtonAnimation ? 'animate-[bounce_0.6s_ease-in-out]' : ''}`}
                onClick={() => {
                  if (!user && cartItems.length > 0) {
                    toast.error('Silakan login untuk melanjutkan', {
                      description: 'Buat akun untuk mendapatkan free trial'
                    });
                    setShowAuthDialog(true);
                    return;
                  }
                  setShowCart(true);
                }}
              >
                <ShoppingCart className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="header-text">Cart</span>
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 animate-[pulse_1s_ease-in-out_infinite]">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="header-text">{user.name}</span>
                      {user.subscription !== 'none' && (
                        <Crown className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div>
                        <p>{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab('library')}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      My Library
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab('bookings')}>
                      <Calendar className="mr-2 h-4 w-4" />
                      My Sessions
                    </DropdownMenuItem>
                    {user.subscription !== 'none' && (
                      <DropdownMenuItem>
                        <Crown className="mr-2 h-4 w-4" />
                        Subscription: {user.subscription}
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => setShowAuthDialog(true)}>
                  <User className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="header-text">Sign In</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl">
                Master Chess with Expert Guidance
              </h2>
              <p className="text-lg text-blue-100">
                Learn from grandmasters, practice with AI, and improve your game with our comprehensive courses and one-on-one coaching.
              </p>
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-blue-900 border-white hover:bg-white/10"
                  onClick={() => setActiveTab('courses')}
                >
                  Browse Courses
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-blue-900 border-white hover:bg-white/10"
                  onClick={() => handleTabChange('virtual')}
                >
                  Book a Lesson
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1653510640359-cbc4c1f3a90f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVzcyUyMGJvYXJkJTIwZ2FtZXxlbnwxfHx8fDE3NjEyMDUzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Chess Board"
                className="rounded-2xl shadow-2xl max-w-md w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Sign-in banner for non-authenticated users */}
        {!user && activeTab === 'courses' && (
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 shadow-lg animate-[slide-in_0.5s_ease-out]">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Sign in to unlock full access</h3>
                  <p className="text-sm text-gray-600">
                    Create an account to purchase courses, track your progress, and access your library
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => setShowAuthDialog(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Sign In / Sign Up
              </Button>
            </div>
          </div>
        )}

        {/* Show course viewer if viewing a course */}
        {viewingCourse ? (
          viewingCourse.type === 'video' ? (
            <CourseViewer
              courseId={viewingCourse.id}
              courseTitle={purchasedCourses.find(c => c.id === viewingCourse.id)?.title || ''}
              courseImage={purchasedCourses.find(c => c.id === viewingCourse.id)?.image || ''}
              totalLessons={purchasedCourses.find(c => c.id === viewingCourse.id)?.lessons || 0}
              onBack={handleBackToLibrary}
            />
          ) : (
            <EbookReader
              ebookId={viewingCourse.id}
              ebookTitle={purchasedCourses.find(c => c.id === viewingCourse.id)?.title || ''}
              ebookImage={purchasedCourses.find(c => c.id === viewingCourse.id)?.image || ''}
              totalPages={parseInt(purchasedCourses.find(c => c.id === viewingCourse.id)?.duration.replace(' pages', '') || '0')}
              onBack={handleBackToLibrary}
            />
          )
        ) : (
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className={`grid w-full ${hasVirtualAccess ? 'grid-cols-6' : 'grid-cols-5'} mb-8 md:gap-2`}>
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <Video className="w-4 h-4 flex-shrink-0" />
                <span className="tab-text-full">Video Courses</span>
                <span className="tab-text-short">Courses</span>
              </TabsTrigger>
              <TabsTrigger value="library" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 flex-shrink-0" />
                <span className="tab-text-full">My Library</span>
                <span className="tab-text-short">Library</span>
                {purchasedCourses.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs flex-shrink-0">
                    {purchasedCourses.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="virtual" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 flex-shrink-0" />
                <span className="tab-text-full">Virtual Classes</span>
                <span className="tab-text-short">Tutor</span>
              </TabsTrigger>
              {hasVirtualAccess && (
                <TabsTrigger value="bookings" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span className="tab-text-full">My Sessions</span>
                  <span className="tab-text-short">Sessions</span>
                </TabsTrigger>
              )}
              <TabsTrigger value="ai" className="flex items-center gap-2">
                <Brain className="w-4 h-4 flex-shrink-0" />
                <span className="tab-text-full">AI Trainer</span>
                <span className="tab-text-short">AI</span>
                {hasAIAccess && <Crown className="w-3 h-3 text-yellow-600 flex-shrink-0" />}
              </TabsTrigger>
              <TabsTrigger value="about" className="flex items-center gap-2">
                <Info className="w-4 h-4 flex-shrink-0" />
                <span className="tab-text-full">About Us</span>
                <span className="tab-text-short">About</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-8">
              <div>
                <h3 className="text-2xl mb-2">Video Courses</h3>
                <p className="text-gray-600 mb-6">Comprehensive video lessons from expert instructors</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.filter(c => c.type === 'video').map((course) => {
                    const isPurchased = purchasedCourses.some(p => p.id === course.id);
                    return (
                      <CourseCard 
                        key={course.id} 
                        {...course} 
                        isPurchased={isPurchased}
                        isAuthenticated={!!user}
                        onAddToCart={handleAddToCart}
                        onView={() => handleOpenCourse(course.id, 'video')}
                      />
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-2xl mb-2">E-Books</h3>
                <p className="text-gray-600 mb-6">In-depth written guides and puzzle collections</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.filter(c => c.type === 'ebook').map((course) => {
                    const isPurchased = purchasedCourses.some(p => p.id === course.id);
                    return (
                      <CourseCard 
                        key={course.id} 
                        {...course} 
                        isPurchased={isPurchased}
                        isAuthenticated={!!user}
                        onAddToCart={handleAddToCart}
                        onView={() => handleOpenCourse(course.id, 'ebook')}
                      />
                    );
                  })}
              </div>
            </div>
          </TabsContent>

            <TabsContent value="library">
              <MyLibrary 
                courses={purchasedCourses}
                onOpenCourse={handleOpenCourse}
              />
            </TabsContent>

            <TabsContent value="virtual">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl mb-2">One-on-One Virtual Chess Classes</h3>
                <p className="text-gray-600 mb-6">
                  Learn from grandmasters in live, interactive sessions with a shared chess board
                </p>
              </div>
              <VirtualClass 
                showBookingForm={showBookingForm}
                inSession={inSession}
                onAddToCart={handleAddToCart}
                isAuthenticated={!!user}
              />
            </div>
          </TabsContent>

          {hasVirtualAccess && (
            <TabsContent value="bookings">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl mb-2">My Training Sessions</h3>
                  <p className="text-gray-600 mb-6">
                    Manage your booked sessions and join upcoming classes
                  </p>
                </div>
                <MyBookings
                  bookings={bookings}
                  onJoinSession={handleJoinSession}
                  onCancelBooking={handleCancelBooking}
                  onNewBooking={handleNewBooking}
                />
              </div>
            </TabsContent>
          )}

          <TabsContent value="ai">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl mb-2">AI Chess Trainer</h3>
                <p className="text-gray-600 mb-6">
                  Practice against AI opponents, solve puzzles, and get real-time analysis of your games
                </p>
                
                {/* Info banner for non-premium users */}
                {user && !hasAIAccess && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-6 animate-[slide-in_0.5s_ease-out]">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shrink-0">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">🎁 Pilih Paket untuk Akses AI Trainer!</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Pilih paket di bawah, tambahkan ke cart, dan checkout untuk mengaktifkan akses AI Trainer Anda. Mulai dari Free Trial 7 hari GRATIS!
                        </p>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <Badge className="bg-green-600">✓ Free Trial - Rp 0 (7 hari)</Badge>
                          <Badge className="bg-blue-600">✓ Basic - Rp 110.000 (30 hari)</Badge>
                          <Badge className="bg-purple-600">✓ Premium - Rp 145.000 (90 hari)</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <AITrainer 
                onAddToCart={handleAddToCart}
                isAuthenticated={!!user}
                hasPremiumAccess={hasAIAccess}
                activePackage={aiPackageType}
              />
            </div>
          </TabsContent>

          <TabsContent value="about">
            <AboutUs />
          </TabsContent>
          </Tabs>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="mb-4">About</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <button 
                    onClick={() => setActiveTab('about')} 
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>Our Mission</li>
                <li>Our Team</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Courses</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <button 
                    onClick={() => setActiveTab('courses')} 
                    className="hover:text-white transition-colors"
                  >
                    Video Courses
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('courses')} 
                    className="hover:text-white transition-colors"
                  >
                    E-Books
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleTabChange('virtual')} 
                    className="hover:text-white transition-colors"
                  >
                    Live Classes
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleTabChange('ai')} 
                    className="hover:text-white transition-colors"
                  >
                    AI Training
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Help Center</li>
                <li>
                  <button 
                    onClick={() => setActiveTab('about')} 
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </button>
                </li>
                <li>FAQs</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Twitter</li>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 LesCatur. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Dialogs */}
      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog}
        onLogin={handleLogin}
      />
      <PricingDialog
        open={showPricingDialog}
        onOpenChange={setShowPricingDialog}
        onSubscribe={handleSubscribe}
        feature="ai"
      />
      
      {/* Cart */}
      <Cart
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
