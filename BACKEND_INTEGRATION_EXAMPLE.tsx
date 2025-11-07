/**
 * BACKEND INTEGRATION EXAMPLE
 * 
 * File ini menunjukkan bagaimana mengintegrasikan backend API ke dalam App.tsx
 * Ini adalah contoh kode yang dapat Anda copy-paste dan sesuaikan.
 */

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { signIn, signOut, getCurrentUser } from './utils/supabase/client';
import * as api from './utils/api';

// ============================================
// 1. STATE MANAGEMENT
// ============================================

function App() {
  // Auth state
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Shopping cart state
  const [cart, setCart] = useState<any[]>([]);
  
  // Library state
  const [purchasedCourses, setPurchasedCourses] = useState<any[]>([]);
  
  // Subscription state
  const [hasAIAccess, setHasAIAccess] = useState(false);
  
  // Virtual classes state
  const [trainers, setTrainers] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  
  // UI state
  const [activeTab, setActiveTab] = useState('courses');
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showCartSidebar, setShowCartSidebar] = useState(false);

  // ============================================
  // 2. INITIALIZE DATA ON MOUNT
  // ============================================
  
  useEffect(() => {
    initializeApp();
  }, []);
  
  async function initializeApp() {
    setLoading(true);
    
    try {
      // Check if user is already logged in
      const currentUser = await getCurrentUser();
      
      if (currentUser) {
        setUser(currentUser);
        
        // Load user data
        await Promise.all([
          loadProfile(),
          loadCart(),
          loadLibrary(),
          checkSubscription(),
        ]);
      }
      
      // Load public data (trainers)
      await loadTrainers();
      
      // Seed trainers if none exist (first time setup)
      const { trainers } = await api.getTrainers();
      if (!trainers || trainers.length === 0) {
        await api.seedTrainers();
        await loadTrainers();
      }
      
    } catch (error) {
      console.error('Initialization error:', error);
    } finally {
      setLoading(false);
    }
  }
  
  // ============================================
  // 3. DATA LOADING FUNCTIONS
  // ============================================
  
  async function loadProfile() {
    try {
      const { profile } = await api.getProfile();
      setProfile(profile);
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  }
  
  async function loadCart() {
    try {
      const { cart } = await api.getCart();
      setCart(cart);
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  }
  
  async function loadLibrary() {
    try {
      const { library } = await api.getLibrary();
      setPurchasedCourses(library);
    } catch (error) {
      console.error('Failed to load library:', error);
    }
  }
  
  async function checkSubscription() {
    try {
      const { subscription } = await api.getSubscription();
      setHasAIAccess(subscription.hasAIAccess || false);
    } catch (error) {
      console.error('Failed to check subscription:', error);
    }
  }
  
  async function loadTrainers() {
    try {
      const { trainers } = await api.getTrainers();
      setTrainers(trainers);
    } catch (error) {
      console.error('Failed to load trainers:', error);
    }
  }
  
  async function loadBookings() {
    try {
      const { bookings } = await api.getBookings();
      setBookings(bookings);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    }
  }
  
  // ============================================
  // 4. AUTHENTICATION HANDLERS
  // ============================================
  
  async function handleSignIn(email: string, password: string) {
    try {
      setLoading(true);
      
      const { session } = await signIn(email, password);
      setUser(session.user);
      
      // Load user data after sign in
      await Promise.all([
        loadProfile(),
        loadCart(),
        loadLibrary(),
        checkSubscription(),
      ]);
      
      setShowAuthDialog(false);
      toast.success('Welcome back!');
      
    } catch (error: any) {
      console.error('Sign in failed:', error);
      toast.error(error.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  }
  
  async function handleSignUp(email: string, password: string, name: string) {
    try {
      setLoading(true);
      
      // Create account
      await api.signUpUser(email, password, name);
      
      // Auto sign in after signup
      await handleSignIn(email, password);
      
      toast.success('Account created successfully!');
      
    } catch (error: any) {
      console.error('Sign up failed:', error);
      toast.error(error.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  }
  
  async function handleSignOut() {
    try {
      await signOut();
      
      // Clear all user state
      setUser(null);
      setProfile(null);
      setCart([]);
      setPurchasedCourses([]);
      setBookings([]);
      setHasAIAccess(false);
      
      setActiveTab('courses');
      toast.success('Signed out successfully');
      
    } catch (error) {
      console.error('Sign out failed:', error);
      toast.error('Failed to sign out');
    }
  }
  
  // ============================================
  // 5. SHOPPING CART HANDLERS
  // ============================================
  
  async function handleAddToCart(course: any) {
    // Require login
    if (!user) {
      toast.error('Please sign in to add items to cart');
      setShowAuthDialog(true);
      return;
    }
    
    try {
      const { cart: updatedCart } = await api.addToCart({
        id: course.id,
        title: course.title,
        price: course.price,
        type: course.type,
        thumbnail: course.thumbnail,
        description: course.description,
        instructor: course.instructor,
      });
      
      setCart(updatedCart);
      toast.success('Added to cart!');
      
    } catch (error: any) {
      console.error('Failed to add to cart:', error);
      
      if (error.message.includes('already in cart')) {
        toast.error('Item already in cart');
      } else {
        toast.error('Failed to add to cart');
      }
    }
  }
  
  async function handleRemoveFromCart(itemId: string) {
    try {
      const { cart: updatedCart } = await api.removeFromCart(itemId);
      setCart(updatedCart);
      toast.success('Removed from cart');
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      toast.error('Failed to remove item');
    }
  }
  
  async function handleCheckout() {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    
    try {
      setLoading(true);
      
      const { library } = await api.checkout();
      
      // Update state
      setCart([]);
      setPurchasedCourses(library);
      setShowCartSidebar(false);
      setActiveTab('library');
      
      toast.success('Purchase successful! Items added to your library.');
      
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  
  // ============================================
  // 6. BOOKING HANDLERS
  // ============================================
  
  async function handleCreateBooking(bookingData: {
    trainerId: string;
    trainerName: string;
    date: string;
    time: string;
    duration: number;
    level: string;
    notes?: string;
  }) {
    // Require login
    if (!user) {
      toast.error('Please sign in to book a session');
      setShowAuthDialog(true);
      return;
    }
    
    try {
      setLoading(true);
      
      const { booking } = await api.createBooking(bookingData);
      
      toast.success('Booking confirmed! Check "My Sessions" tab.');
      setActiveTab('bookings');
      
      // Reload bookings
      await loadBookings();
      
    } catch (error) {
      console.error('Booking failed:', error);
      toast.error('Failed to create booking');
    } finally {
      setLoading(false);
    }
  }
  
  async function handleCancelBooking(bookingId: string) {
    try {
      setLoading(true);
      
      await api.cancelBooking(bookingId);
      
      toast.success('Booking cancelled');
      
      // Reload bookings
      await loadBookings();
      
    } catch (error) {
      console.error('Cancel booking failed:', error);
      toast.error('Failed to cancel booking');
    } finally {
      setLoading(false);
    }
  }
  
  // ============================================
  // 7. SUBSCRIPTION HANDLERS
  // ============================================
  
  async function handleSubscribePremium() {
    if (!user) {
      toast.error('Please sign in to subscribe');
      setShowAuthDialog(true);
      return;
    }
    
    try {
      setLoading(true);
      
      // Activate 1 year premium subscription
      const { subscription } = await api.activateSubscription('premium', 12);
      
      setHasAIAccess(subscription.hasAIAccess);
      
      toast.success('Premium activated! Enjoy AI Trainer.');
      setActiveTab('ai');
      
    } catch (error) {
      console.error('Subscription failed:', error);
      toast.error('Failed to activate premium');
    } finally {
      setLoading(false);
    }
  }
  
  // ============================================
  // 8. PROGRESS TRACKING HANDLERS
  // ============================================
  
  async function handlePuzzleComplete(puzzleData: {
    id: string;
    difficulty: string;
    solved: boolean;
    timeSeconds: number;
    moves: string[];
  }) {
    if (!user) return;
    
    try {
      await api.saveProgress('puzzle', {
        puzzleId: puzzleData.id,
        difficulty: puzzleData.difficulty,
        solved: puzzleData.solved,
        timeSeconds: puzzleData.timeSeconds,
        moves: puzzleData.moves,
      });
      
      if (puzzleData.solved) {
        toast.success('Puzzle solved! Progress saved.');
      }
      
    } catch (error) {
      console.error('Failed to save puzzle progress:', error);
    }
  }
  
  async function handleQuizComplete(quizData: {
    id: string;
    category: string;
    score: number;
    totalQuestions: number;
    answers: any[];
  }) {
    if (!user) return;
    
    try {
      await api.saveProgress('quiz', {
        quizId: quizData.id,
        category: quizData.category,
        score: quizData.score,
        totalQuestions: quizData.totalQuestions,
        answers: quizData.answers,
      });
      
      toast.success(`Quiz completed! Score: ${quizData.score}/${quizData.totalQuestions}`);
      
    } catch (error) {
      console.error('Failed to save quiz results:', error);
    }
  }
  
  // ============================================
  // 9. EXAMPLE JSX USAGE
  // ============================================
  
  // Loading screen while initializing
  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading LesCatur...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header with Cart and Auth buttons */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">LesCatur</h1>
          
          <div className="flex gap-2">
            {/* Cart button */}
            <button
              onClick={() => setShowCartSidebar(true)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              🛒 Cart ({cart.length})
            </button>
            
            {/* Auth buttons */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm">👋 {profile?.name || user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthDialog(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="mb-6">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 ${activeTab === 'courses' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Courses
          </button>
          
          {user && (
            <>
              <button
                onClick={() => setActiveTab('library')}
                className={`px-4 py-2 ${activeTab === 'library' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                My Library ({purchasedCourses.length})
              </button>
              
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-4 py-2 ${activeTab === 'bookings' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                My Sessions
              </button>
            </>
          )}
          
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 ${activeTab === 'ai' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            AI Trainer {hasAIAccess && '👑'}
          </button>
        </div>
        
        {/* Tab content */}
        {activeTab === 'courses' && (
          <div>
            <h2>Video Courses</h2>
            {/* Course cards with handleAddToCart */}
          </div>
        )}
        
        {activeTab === 'library' && user && (
          <div>
            <h2>My Library ({purchasedCourses.length})</h2>
            {/* Show purchased courses */}
          </div>
        )}
        
        {activeTab === 'bookings' && user && (
          <div>
            <h2>My Sessions</h2>
            {/* Show bookings with handleCancelBooking */}
          </div>
        )}
        
        {activeTab === 'ai' && (
          <div>
            {hasAIAccess ? (
              <div>AI Trainer Content</div>
            ) : (
              <div>
                <p>Premium feature - Subscribe to access AI Trainer</p>
                <button onClick={handleSubscribePremium}>
                  Subscribe Now
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

// ============================================
// 10. NOTES & TIPS
// ============================================

/**
 * IMPORTANT NOTES:
 * 
 * 1. Always check if user is logged in before accessing protected features
 * 2. Use try-catch for all API calls
 * 3. Show loading states during async operations
 * 4. Display user-friendly error messages with toast
 * 5. Reload data after mutations (create, update, delete)
 * 
 * COMMON PATTERNS:
 * 
 * - Check auth: if (!user) { show sign in dialog }
 * - Loading: setLoading(true) → API call → setLoading(false)
 * - Success: Update state + Show toast + Navigate
 * - Error: Log error + Show toast
 * 
 * OPTIMIZATION:
 * 
 * - Use Promise.all() for parallel data loading
 * - Cache trainer list (doesn't change often)
 * - Only load bookings when tab is active
 * - Debounce search/filter operations
 */
