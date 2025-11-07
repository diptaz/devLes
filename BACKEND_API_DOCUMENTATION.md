# LesCatur Backend API Documentation

## Overview

Backend LesCatur menggunakan **Supabase Edge Functions** dengan Hono web framework dan KV Store untuk penyimpanan data.

**Base URL**: `https://{projectId}.supabase.co/functions/v1/make-server-84009993`

## Architecture

```
Frontend (React) 
    ↓
API Utils (/utils/api.ts)
    ↓
Supabase Edge Functions (/supabase/functions/server/index.tsx)
    ↓
KV Store (Key-Value Database)
```

## Authentication

Semua routes yang memerlukan autentikasi harus mengirim **Authorization header**:

```
Authorization: Bearer {access_token}
```

Access token didapat dari:
1. Sign in response
2. `getSession()` dari Supabase client
3. `getCurrentUser()` utility function

## API Endpoints

### 🔐 Authentication

#### 1. Sign Up
**POST** `/auth/signup`

Create new user account.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "strongpassword123",
  "name": "John Doe"
}
```

**Response**:
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    ...
  },
  "message": "User created successfully"
}
```

**Side Effects**:
- Creates user profile in KV: `user:{userId}`
- Initializes empty library: `library:{userId}`
- Initializes empty cart: `cart:{userId}`
- Sets free subscription: `subscription:{userId}`

**Frontend Usage**:
```typescript
import { signUpUser } from './utils/api';

const result = await signUpUser(email, password, name);
```

---

#### 2. Get Session
**GET** `/auth/session`

Check current user session.

**Headers**: `Authorization: Bearer {token}`

**Response**:
```json
{
  "session": {
    "user": { ... },
    "profile": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "avatar": null,
      "createdAt": "2025-11-06T..."
    }
  }
}
```

**Frontend Usage**:
```typescript
import { checkSession } from './utils/api';

const { session } = await checkSession();
```

---

### 👤 User Profile

#### 3. Get Profile
**GET** `/profile`

Get current user's profile.

**Headers**: `Authorization: Bearer {token}` ✅ Required

**Response**:
```json
{
  "profile": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": "https://...",
    "createdAt": "2025-11-06T..."
  }
}
```

---

#### 4. Update Profile
**PUT** `/profile`

Update user profile information.

**Headers**: `Authorization: Bearer {token}` ✅ Required

**Request Body**:
```json
{
  "name": "Jane Doe",
  "avatar": "https://..."
}
```

**Note**: `id` and `email` cannot be modified.

**Response**:
```json
{
  "profile": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "Jane Doe",
    "avatar": "https://...",
    ...
  }
}
```

---

### 💎 Subscription

#### 5. Get Subscription
**GET** `/subscription`

Get user's subscription status.

**Headers**: `Authorization: Bearer {token}` ✅ Required

**Response**:
```json
{
  "subscription": {
    "plan": "premium",
    "hasAIAccess": true,
    "activatedAt": "2025-11-06T...",
    "expiresAt": "2026-11-06T..."
  }
}
```

Plans:
- `free` - Default, no AI access
- `premium` - AI Trainer access

---

#### 6. Activate Subscription
**POST** `/subscription/activate`

Activate premium subscription.

**Headers**: `Authorization: Bearer {token}` ✅ Required

**Request Body**:
```json
{
  "plan": "premium",
  "durationMonths": 12
}
```

**Response**:
```json
{
  "subscription": {
    "plan": "premium",
    "hasAIAccess": true,
    "activatedAt": "2025-11-06T...",
    "expiresAt": "2026-11-06T..."
  }
}
```

**Frontend Usage**:
```typescript
import { activateSubscription } from './utils/api';

// Activate 1 year premium
const result = await activateSubscription('premium', 12);
```

---

### 🛒 Shopping Cart

#### 7. Get Cart
**GET** `/cart`

Get user's shopping cart.

**Headers**: `Authorization: Bearer {token}` ✅ Required

**Response**:
```json
{
  "cart": [
    {
      "id": "course-1",
      "title": "Chess Openings Masterclass",
      "price": 299000,
      "type": "course",
      "addedAt": "2025-11-06T..."
    }
  ]
}
```

---

#### 8. Add to Cart
**POST** `/cart/add`

Add item to cart.

**Headers**: `Authorization: Bearer {token}` ✅ Required

**Request Body**:
```json
{
  "id": "course-1",
  "title": "Chess Openings Masterclass",
  "price": 299000,
  "type": "course",
  "thumbnail": "https://...",
  "description": "..."
}
```

**Response**:
```json
{
  "cart": [ ... ]
}
```

**Frontend Usage**:
```typescript
import { addToCart } from './utils/api';

await addToCart({
  id: course.id,
  title: course.title,
  price: course.price,
  type: 'course'
});
```

---

#### 9. Remove from Cart
**DELETE** `/cart/{itemId}`

Remove specific item from cart.

**Headers**: `Authorization: Bearer {token}` ✅ Required

**Response**:
```json
{
  "cart": [ ... ]
}
```

---

#### 10. Clear Cart
**DELETE** `/cart`

Remove all items from cart.

**Headers**: `Authorization: Bearer {token}` ✅ Required

**Response**:
```json
{
  "cart": []
}
```

---

### 💰 Purchase & Library

#### 11. Checkout
**POST** `/checkout`

Purchase all items in cart and add to library.

**Headers**: `Authorization: Bearer {token}` ✅ Required

**Request Body**: None (uses cart contents)

**Response**:
```json
{
  "library": [ ... ],
  "message": "Purchase successful"
}
```

**Side Effects**:
- Moves cart items to library
- Creates purchase record: `purchase:{userId}:{timestamp}`
- Clears cart

**Frontend Usage**:
```typescript
import { checkout } from './utils/api';

const { library } = await checkout();
```

---

#### 12. Get Library
**GET** `/library`

Get user's purchased items.

**Headers**: `Authorization: Bearer {token}` ✅ Required

**Response**:
```json
{
  "library": [
    {
      "id": "course-1",
      "title": "Chess Openings Masterclass",
      "price": 299000,
      "type": "course",
      "purchasedAt": "2025-11-06T..."
    }
  ]
}
```

---

### 🎓 Virtual Class Bookings

#### 13. Get Trainers
**GET** `/trainers`

Get all available trainers.

**Headers**: `Authorization: Bearer {token}` (optional)

**Response**:
```json
{
  "trainers": [
    {
      "id": "trainer:1",
      "name": "GM Alexandra Petrov",
      "title": "Grandmaster",
      "rating": 2650,
      "specialties": ["Opening Theory", "Endgame"],
      "levels": ["intermediate", "advanced", "competition"],
      "hourlyRate": 150000,
      "avatar": "https://...",
      "bio": "...",
      "availability": ["Monday", "Wednesday", "Friday"]
    }
  ]
}
```

---

#### 14. Create Booking
**POST** `/bookings`

Book a virtual class session.

**Headers**: `Authorization: Bearer {token}` ✅ Required

**Request Body**:
```json
{
  "trainerId": "trainer:1",
  "trainerName": "GM Alexandra Petrov",
  "date": "2025-11-15",
  "time": "14:00",
  "duration": 60,
  "level": "intermediate",
  "notes": "Focus on Sicilian Defense"
}
```

**Response**:
```json
{
  "booking": {
    "id": "booking:1699...:uuid",
    "userId": "uuid",
    "trainerId": "trainer:1",
    "trainerName": "GM Alexandra Petrov",
    "date": "2025-11-15",
    "time": "14:00",
    "duration": 60,
    "level": "intermediate",
    "notes": "Focus on Sicilian Defense",
    "status": "confirmed",
    "createdAt": "2025-11-06T..."
  }
}
```

**Side Effects**:
- Creates booking: `booking:{timestamp}:{userId}`
- Adds to user's bookings index: `bookings:user:{userId}`

---

#### 15. Get Bookings
**GET** `/bookings`

Get user's all bookings.

**Headers**: `Authorization: Bearer {token}` ✅ Required

**Response**:
```json
{
  "bookings": [
    {
      "id": "booking:...",
      "trainerId": "trainer:1",
      "date": "2025-11-15",
      "status": "confirmed",
      ...
    }
  ]
}
```

---

#### 16. Cancel Booking
**DELETE** `/bookings/{bookingId}`

Cancel a booking.

**Headers**: `Authorization: Bearer {token}` ✅ Required

**Response**:
```json
{
  "booking": {
    "id": "booking:...",
    "status": "cancelled",
    "cancelledAt": "2025-11-06T...",
    ...
  }
}
```

**Note**: Only the user who created the booking can cancel it.

---

### 📊 Progress Tracking

#### 17. Save Progress
**POST** `/progress/{type}`

Save puzzle or quiz completion progress.

**Path Params**:
- `type`: `puzzle` or `quiz`

**Headers**: `Authorization: Bearer {token}` ✅ Required

**Request Body** (Puzzle):
```json
{
  "puzzleId": "puzzle-123",
  "difficulty": "intermediate",
  "solved": true,
  "timeSeconds": 45,
  "moves": ["e4", "e5", "Nf3"]
}
```

**Request Body** (Quiz):
```json
{
  "quizId": "quiz-456",
  "category": "tactics",
  "score": 8,
  "totalQuestions": 10,
  "answers": [ ... ]
}
```

**Response**:
```json
{
  "progress": [ ... ]
}
```

**KV Key**: `progress:{userId}:{type}`

---

#### 18. Get Progress
**GET** `/progress/{type}`

Get user's progress history.

**Path Params**:
- `type`: `puzzle` or `quiz`

**Headers**: `Authorization: Bearer {token}` ✅ Required

**Response**:
```json
{
  "progress": [
    {
      "puzzleId": "puzzle-123",
      "difficulty": "intermediate",
      "solved": true,
      "completedAt": "2025-11-06T..."
    }
  ]
}
```

---

### 🌱 Development

#### 19. Seed Trainers
**POST** `/seed-trainers`

Seed initial trainer data (development only).

**Headers**: `Authorization: Bearer {token}` (optional)

**Response**:
```json
{
  "message": "Trainers seeded successfully",
  "count": 3
}
```

**Seeds**:
- GM Alexandra Petrov (Grandmaster)
- IM David Chen (International Master)
- WGM Sofia Martinez (Woman Grandmaster)

**Frontend Usage**:
```typescript
import { seedTrainers } from './utils/api';

// Run once on first load
await seedTrainers();
```

---

## KV Store Schema

### Key Patterns

| Prefix | Example | Description |
|--------|---------|-------------|
| `user:{userId}` | `user:abc123` | User profile |
| `subscription:{userId}` | `subscription:abc123` | Subscription status |
| `cart:{userId}` | `cart:abc123` | Shopping cart items |
| `library:{userId}` | `library:abc123` | Purchased items |
| `purchase:{userId}:{ts}` | `purchase:abc123:1699...` | Purchase record |
| `trainer:{id}` | `trainer:1` | Trainer profile |
| `booking:{ts}:{userId}` | `booking:1699...:abc` | Booking record |
| `bookings:user:{userId}` | `bookings:user:abc123` | User's booking IDs |
| `progress:{userId}:{type}` | `progress:abc123:puzzle` | Progress tracking |

---

## Error Handling

All errors return JSON with `error` field:

```json
{
  "error": "Error message here"
}
```

**HTTP Status Codes**:
- `200` - Success
- `400` - Bad Request (invalid data)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (not allowed)
- `404` - Not Found
- `500` - Internal Server Error

**Frontend Error Handling**:
```typescript
try {
  const result = await getLibrary();
} catch (error) {
  console.error('API Error:', error.message);
  // Show error toast to user
}
```

---

## Frontend Integration

### 1. Setup

Import utilities:
```typescript
import { signIn, signOut, getCurrentUser } from './utils/supabase/client';
import * as api from './utils/api';
```

### 2. Authentication Flow

```typescript
// Sign up
const result = await api.signUpUser(email, password, name);

// Sign in
const { session } = await signIn(email, password);

// Check session
const user = await getCurrentUser();

// Sign out
await signOut();
```

### 3. Using API

All API calls automatically include auth token:

```typescript
// Get user data
const { profile } = await api.getProfile();
const { subscription } = await api.getSubscription();
const { library } = await api.getLibrary();
const { cart } = await api.getCart();

// Make purchase
await api.addToCart(courseItem);
await api.checkout();

// Book session
const { trainers } = await api.getTrainers();
await api.createBooking(bookingData);
```

---

## Security Notes

1. **Authentication**: Required for all user-specific operations
2. **Authorization**: Users can only access their own data
3. **Email Confirmation**: Auto-confirmed (no email server configured)
4. **Service Role Key**: Never exposed to frontend
5. **CORS**: Enabled for all origins (development mode)

---

## Performance

- **KV Store**: Fast key-value operations
- **Batch Operations**: Use `mget` for multiple keys
- **Caching**: Consider frontend caching for trainer list
- **Pagination**: Not implemented (add if needed for large datasets)

---

## Future Enhancements

- [ ] Real-time chess board synchronization (WebSocket)
- [ ] Video conferencing integration (Jitsi/Daily.co)
- [ ] Payment gateway integration (Midtrans/Xendit)
- [ ] Email notifications (Resend/SendGrid)
- [ ] Push notifications
- [ ] Admin dashboard
- [ ] Trainer availability calendar
- [ ] Booking reminders
- [ ] Review & rating system

---

Last Updated: November 2025  
Version: 1.0
