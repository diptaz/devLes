# Backend Setup Guide - LesCatur

## 🎯 Quick Start

Backend LesCatur sudah siap digunakan! Ikuti langkah-langkah berikut untuk mengintegrasikan dengan frontend.

---

## 📦 Files Created

### Backend Server
- ✅ `/supabase/functions/server/index.tsx` - Main server dengan semua API routes
- ✅ `/supabase/functions/server/kv_store.tsx` - KV database utilities (protected)

### Frontend Utilities
- ✅ `/utils/supabase/client.ts` - Supabase authentication helpers
- ✅ `/utils/api.ts` - API call wrappers untuk semua endpoints

### Documentation
- ✅ `/BACKEND_API_DOCUMENTATION.md` - Lengkap API reference
- ✅ `/BACKEND_SETUP_GUIDE.md` - Setup guide (file ini)

---

## 🚀 Initial Setup Steps

### Step 1: Seed Trainer Data

Jalankan sekali untuk populate data trainer:

```typescript
import { seedTrainers } from './utils/api';

// Panggil saat app pertama kali load atau dari admin panel
await seedTrainers();
```

Ini akan membuat 3 trainer:
- GM Alexandra Petrov (Grandmaster, Rating 2650)
- IM David Chen (International Master, Rating 2480)
- WGM Sofia Martinez (Woman Grandmaster, Rating 2420)

---

### Step 2: Test Backend Connection

Test endpoint health check:

```typescript
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-84009993/health`
);
const data = await response.json();
console.log(data); // { status: "ok" }
```

---

## 🔐 Authentication Integration

### Replace Mock Auth dengan Real Auth

**Current (Mock)**:
```typescript
const [user, setUser] = useState<User | null>(null);
const [isSignedIn, setIsSignedIn] = useState(false);

// Mock sign in
const handleSignIn = () => {
  setUser(mockUser);
  setIsSignedIn(true);
};
```

**New (Real)**:
```typescript
import { signIn, signOut, getCurrentUser } from './utils/supabase/client';
import * as api from './utils/api';

const [user, setUser] = useState<any>(null);
const [profile, setProfile] = useState<any>(null);

// Check session on mount
useEffect(() => {
  async function checkAuth() {
    const currentUser = await getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      // Get profile from backend
      const { profile } = await api.getProfile();
      setProfile(profile);
    }
  }
  checkAuth();
}, []);

// Real sign in
const handleSignIn = async (email: string, password: string) => {
  try {
    const { session } = await signIn(email, password);
    setUser(session.user);
    
    // Get profile
    const { profile } = await api.getProfile();
    setProfile(profile);
  } catch (error) {
    console.error('Sign in failed:', error);
    alert('Invalid credentials');
  }
};

// Real sign out
const handleSignOut = async () => {
  await signOut();
  setUser(null);
  setProfile(null);
};

// Sign up
const handleSignUp = async (email: string, password: string, name: string) => {
  try {
    await api.signUpUser(email, password, name);
    
    // Auto sign in after signup
    await handleSignIn(email, password);
  } catch (error) {
    console.error('Sign up failed:', error);
    alert('Sign up failed');
  }
};
```

---

## 🛒 Shopping Cart Integration

### Replace Local State dengan Backend

**Current (Local State)**:
```typescript
const [cart, setCart] = useState<Course[]>([]);

const addToCart = (course: Course) => {
  setCart([...cart, course]);
};
```

**New (Backend)**:
```typescript
import * as api from './utils/api';

const [cart, setCart] = useState<any[]>([]);

// Load cart on mount (if user logged in)
useEffect(() => {
  if (user) {
    loadCart();
  }
}, [user]);

const loadCart = async () => {
  try {
    const { cart } = await api.getCart();
    setCart(cart);
  } catch (error) {
    console.error('Failed to load cart:', error);
  }
};

const addToCart = async (course: any) => {
  try {
    const { cart: updatedCart } = await api.addToCart({
      id: course.id,
      title: course.title,
      price: course.price,
      type: course.type,
      thumbnail: course.thumbnail,
      description: course.description,
    });
    setCart(updatedCart);
    toast.success('Added to cart!');
  } catch (error) {
    console.error('Failed to add to cart:', error);
    toast.error('Already in cart or failed to add');
  }
};

const removeFromCart = async (itemId: string) => {
  try {
    const { cart: updatedCart } = await api.removeFromCart(itemId);
    setCart(updatedCart);
    toast.success('Removed from cart');
  } catch (error) {
    console.error('Failed to remove from cart:', error);
  }
};

const handleCheckout = async () => {
  try {
    const { library } = await api.checkout();
    setCart([]);
    setPurchasedCourses(library);
    toast.success('Purchase successful!');
    setActiveTab('library');
  } catch (error) {
    console.error('Checkout failed:', error);
    toast.error('Checkout failed');
  }
};
```

---

## 📚 Library Integration

### Replace Local State

**Current**:
```typescript
const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);
```

**New**:
```typescript
const [purchasedCourses, setPurchasedCourses] = useState<any[]>([]);

// Load library on mount
useEffect(() => {
  if (user) {
    loadLibrary();
  }
}, [user]);

const loadLibrary = async () => {
  try {
    const { library } = await api.getLibrary();
    setPurchasedCourses(library);
  } catch (error) {
    console.error('Failed to load library:', error);
  }
};
```

---

## 🎓 Virtual Classes & Bookings

### Load Trainers

```typescript
const [trainers, setTrainers] = useState<any[]>([]);

useEffect(() => {
  loadTrainers();
}, []);

const loadTrainers = async () => {
  try {
    const { trainers } = await api.getTrainers();
    setTrainers(trainers);
  } catch (error) {
    console.error('Failed to load trainers:', error);
  }
};
```

### Create Booking

```typescript
const handleBooking = async (bookingData: any) => {
  if (!user) {
    toast.error('Please sign in to book a session');
    return;
  }
  
  try {
    const { booking } = await api.createBooking({
      trainerId: selectedTrainer.id,
      trainerName: selectedTrainer.name,
      date: selectedDate,
      time: selectedTime,
      duration: 60,
      level: selectedLevel,
      notes: notes,
    });
    
    toast.success('Booking confirmed!');
    setActiveTab('bookings');
  } catch (error) {
    console.error('Booking failed:', error);
    toast.error('Booking failed');
  }
};
```

### Load User Bookings

```typescript
const [bookings, setBookings] = useState<any[]>([]);

useEffect(() => {
  if (user && activeTab === 'bookings') {
    loadBookings();
  }
}, [user, activeTab]);

const loadBookings = async () => {
  try {
    const { bookings } = await api.getBookings();
    setBookings(bookings);
  } catch (error) {
    console.error('Failed to load bookings:', error);
  }
};

const cancelBooking = async (bookingId: string) => {
  try {
    await api.cancelBooking(bookingId);
    // Reload bookings
    await loadBookings();
    toast.success('Booking cancelled');
  } catch (error) {
    console.error('Cancel booking failed:', error);
    toast.error('Failed to cancel booking');
  }
};
```

---

## 💎 Subscription Management

### Check Subscription Status

```typescript
const [hasAIAccess, setHasAIAccess] = useState(false);

useEffect(() => {
  if (user) {
    checkSubscription();
  }
}, [user]);

const checkSubscription = async () => {
  try {
    const { subscription } = await api.getSubscription();
    setHasAIAccess(subscription.hasAIAccess);
  } catch (error) {
    console.error('Failed to check subscription:', error);
  }
};
```

### Activate Premium

```typescript
const handleSubscribe = async () => {
  try {
    const { subscription } = await api.activateSubscription('premium', 12);
    setHasAIAccess(subscription.hasAIAccess);
    toast.success('Premium activated!');
  } catch (error) {
    console.error('Subscription failed:', error);
    toast.error('Subscription failed');
  }
};
```

---

## 📊 Progress Tracking

### Save Puzzle Progress

```typescript
const handlePuzzleComplete = async (puzzleData: any) => {
  if (!user) return;
  
  try {
    await api.saveProgress('puzzle', {
      puzzleId: puzzleData.id,
      difficulty: puzzleData.difficulty,
      solved: puzzleData.solved,
      timeSeconds: puzzleData.time,
      moves: puzzleData.moves,
    });
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
};
```

### Save Quiz Results

```typescript
const handleQuizComplete = async (quizData: any) => {
  if (!user) return;
  
  try {
    await api.saveProgress('quiz', {
      quizId: quizData.id,
      category: quizData.category,
      score: quizData.score,
      totalQuestions: quizData.total,
      answers: quizData.answers,
    });
  } catch (error) {
    console.error('Failed to save quiz results:', error);
  }
};
```

### View Progress History

```typescript
const [puzzleHistory, setPuzzleHistory] = useState<any[]>([]);

const loadPuzzleHistory = async () => {
  try {
    const { progress } = await api.getProgress('puzzle');
    setPuzzleHistory(progress);
  } catch (error) {
    console.error('Failed to load puzzle history:', error);
  }
};
```

---

## 🎨 UI/UX Improvements

### Loading States

```typescript
const [loading, setLoading] = useState(false);

const loadData = async () => {
  setLoading(true);
  try {
    await api.getLibrary();
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

// In JSX
{loading ? <Spinner /> : <Content />}
```

### Error Handling

```typescript
const [error, setError] = useState<string | null>(null);

try {
  await api.checkout();
} catch (err) {
  setError(err.message);
  toast.error(err.message);
}

// Show error in UI
{error && <Alert variant="destructive">{error}</Alert>}
```

### Success Messages

```typescript
import { toast } from 'sonner';

// Success
toast.success('Purchase successful!');

// Error
toast.error('Failed to process payment');

// Info
toast.info('Session starting in 5 minutes');
```

---

## 🔄 Complete Integration Checklist

### Authentication
- [ ] Replace mock sign in/out with real Supabase auth
- [ ] Load user profile from backend
- [ ] Check session on app mount
- [ ] Add sign up form

### Shopping Cart
- [ ] Load cart from backend
- [ ] Sync addToCart with backend
- [ ] Sync removeFromCart with backend
- [ ] Integrate checkout API

### Library
- [ ] Load purchased items from backend
- [ ] Update library after checkout

### Virtual Classes
- [ ] Load trainers from backend (seed first!)
- [ ] Create booking via API
- [ ] Load user bookings
- [ ] Implement cancel booking

### Subscription
- [ ] Check subscription status
- [ ] Show premium badge for AI tab
- [ ] Integrate payment for subscription

### Progress Tracking
- [ ] Save puzzle completions
- [ ] Save quiz results
- [ ] Show progress history

### UI Polish
- [ ] Add loading states
- [ ] Add error messages
- [ ] Add success toasts
- [ ] Handle offline mode

---

## 🐛 Debugging Tips

### Check Server Logs

Server logs akan muncul di Supabase Dashboard → Edge Functions → Logs.

### Test API Endpoints

Gunakan browser console atau Postman:

```javascript
// Test in browser console
const response = await fetch(
  'https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-84009993/trainers'
);
console.log(await response.json());
```

### Common Issues

**1. Unauthorized Error**
- Pastikan user sudah login
- Check access token valid
- Verify Authorization header sent

**2. Cart Empty After Reload**
- State tidak tersimpan, gunakan backend API
- Load cart dari backend on mount

**3. Booking Not Showing**
- Check `bookings:user:{userId}` key exists
- Verify booking ID format correct

**4. Subscription Not Working**
- Check subscription record exists in KV
- Verify `hasAIAccess` field

---

## 📈 Next Steps

### Phase 1: Basic Integration ✅
- Implement authentication
- Connect cart & library
- Load trainers & bookings

### Phase 2: Enhanced Features
- Add payment gateway (Midtrans/Xendit)
- Email notifications
- Real-time chess board (WebSocket)
- Video conferencing (Jitsi/Daily.co)

### Phase 3: Production Ready
- Add comprehensive error handling
- Implement retry logic
- Add analytics tracking
- Performance optimization
- Security audit

---

## 🤝 Support

Jika ada pertanyaan atau issue:
1. Check API documentation
2. Review server logs
3. Test endpoints manually
4. Check KV store data

---

Last Updated: November 2025  
Version: 1.0
