import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase clients
const getSupabaseAdmin = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
};

const getSupabaseClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  );
};

// Helper to verify user from access token
async function verifyUser(authHeader: string | null) {
  if (!authHeader) return null;
  
  const token = authHeader.split(' ')[1];
  if (!token) return null;
  
  const supabase = getSupabaseAdmin();
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) return null;
  return user;
}

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-84009993/health", (c) => {
  return c.json({ status: "ok" });
});

// ============================================
// AUTHENTICATION ROUTES
// ============================================

// Sign up new user
app.post("/make-server-84009993/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password || !name) {
      return c.json({ error: "Email, password, and name are required" }, 400);
    }
    
    const supabase = getSupabaseAdmin();
    
    // Create user with auto-confirmed email
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm since email server not configured
      email_confirm: true
    });
    
    if (error) {
      console.log(`Signup error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }
    
    // Initialize user profile in KV store
    const userId = data.user.id;
    await kv.set(`user:${userId}`, {
      id: userId,
      email,
      name,
      avatar: null,
      createdAt: new Date().toISOString(),
    });
    
    // Initialize empty library
    await kv.set(`library:${userId}`, []);
    
    // Initialize empty cart
    await kv.set(`cart:${userId}`, []);
    
    // Initialize subscription (free tier)
    await kv.set(`subscription:${userId}`, {
      plan: 'free',
      hasAIAccess: false,
      expiresAt: null
    });
    
    return c.json({ 
      user: data.user,
      message: "User created successfully" 
    });
    
  } catch (error) {
    console.log(`Signup exception: ${error}`);
    return c.json({ error: "Signup failed" }, 500);
  }
});

// Get current session
app.get("/make-server-84009993/auth/session", async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'));
    
    if (!user) {
      return c.json({ session: null }, 401);
    }
    
    // Get user profile
    const profile = await kv.get(`user:${user.id}`);
    
    return c.json({ 
      session: {
        user,
        profile
      }
    });
    
  } catch (error) {
    console.log(`Session check error: ${error}`);
    return c.json({ error: "Session check failed" }, 500);
  }
});

// ============================================
// USER PROFILE ROUTES
// ============================================

// Get user profile
app.get("/make-server-84009993/profile", async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const profile = await kv.get(`user:${user.id}`);
    
    if (!profile) {
      return c.json({ error: "Profile not found" }, 404);
    }
    
    return c.json({ profile });
    
  } catch (error) {
    console.log(`Get profile error: ${error}`);
    return c.json({ error: "Failed to get profile" }, 500);
  }
});

// Update user profile
app.put("/make-server-84009993/profile", async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const updates = await c.req.json();
    const profile = await kv.get(`user:${user.id}`);
    
    if (!profile) {
      return c.json({ error: "Profile not found" }, 404);
    }
    
    const updatedProfile = {
      ...profile,
      ...updates,
      id: user.id, // Prevent ID modification
      email: user.email, // Prevent email modification via this route
    };
    
    await kv.set(`user:${user.id}`, updatedProfile);
    
    return c.json({ profile: updatedProfile });
    
  } catch (error) {
    console.log(`Update profile error: ${error}`);
    return c.json({ error: "Failed to update profile" }, 500);
  }
});

// ============================================
// SUBSCRIPTION ROUTES
// ============================================

// Get subscription status
app.get("/make-server-84009993/subscription", async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const subscription = await kv.get(`subscription:${user.id}`);
    
    return c.json({ 
      subscription: subscription || { 
        plan: 'free', 
        hasAIAccess: false, 
        expiresAt: null 
      } 
    });
    
  } catch (error) {
    console.log(`Get subscription error: ${error}`);
    return c.json({ error: "Failed to get subscription" }, 500);
  }
});

// Activate premium subscription
app.post("/make-server-84009993/subscription/activate", async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const { plan, durationMonths } = await c.req.json();
    
    if (!plan || !durationMonths) {
      return c.json({ error: "Plan and duration required" }, 400);
    }
    
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + durationMonths);
    
    const subscription = {
      plan,
      hasAIAccess: plan === 'premium',
      activatedAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
    };
    
    await kv.set(`subscription:${user.id}`, subscription);
    
    return c.json({ subscription });
    
  } catch (error) {
    console.log(`Activate subscription error: ${error}`);
    return c.json({ error: "Failed to activate subscription" }, 500);
  }
});

// ============================================
// SHOPPING CART ROUTES
// ============================================

// Get cart
app.get("/make-server-84009993/cart", async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const cart = await kv.get(`cart:${user.id}`) || [];
    
    return c.json({ cart });
    
  } catch (error) {
    console.log(`Get cart error: ${error}`);
    return c.json({ error: "Failed to get cart" }, 500);
  }
});

// Add to cart
app.post("/make-server-84009993/cart/add", async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const item = await c.req.json();
    const cart = await kv.get(`cart:${user.id}`) || [];
    
    // Check if item already in cart
    const existingIndex = cart.findIndex((i: any) => i.id === item.id);
    
    if (existingIndex >= 0) {
      return c.json({ error: "Item already in cart" }, 400);
    }
    
    cart.push({
      ...item,
      addedAt: new Date().toISOString()
    });
    
    await kv.set(`cart:${user.id}`, cart);
    
    return c.json({ cart });
    
  } catch (error) {
    console.log(`Add to cart error: ${error}`);
    return c.json({ error: "Failed to add to cart" }, 500);
  }
});

// Remove from cart
app.delete("/make-server-84009993/cart/:itemId", async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const itemId = c.req.param('itemId');
    const cart = await kv.get(`cart:${user.id}`) || [];
    
    const updatedCart = cart.filter((item: any) => item.id !== itemId);
    
    await kv.set(`cart:${user.id}`, updatedCart);
    
    return c.json({ cart: updatedCart });
    
  } catch (error) {
    console.log(`Remove from cart error: ${error}`);
    return c.json({ error: "Failed to remove from cart" }, 500);
  }
});

// Clear cart
app.delete("/make-server-84009993/cart", async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    await kv.set(`cart:${user.id}`, []);
    
    return c.json({ cart: [] });
    
  } catch (error) {
    console.log(`Clear cart error: ${error}`);
    return c.json({ error: "Failed to clear cart" }, 500);
  }
});

// ============================================
// PURCHASE & LIBRARY ROUTES
// ============================================

// Process checkout (purchase cart items)
app.post("/make-server-84009993/checkout", async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const cart = await kv.get(`cart:${user.id}`) || [];
    
    if (cart.length === 0) {
      return c.json({ error: "Cart is empty" }, 400);
    }
    
    const library = await kv.get(`library:${user.id}`) || [];
    
    // Add cart items to library
    const purchaseDate = new Date().toISOString();
    const newPurchases = cart.map((item: any) => ({
      ...item,
      purchasedAt: purchaseDate
    }));
    
    const updatedLibrary = [...library, ...newPurchases];
    
    // Save purchase record
    const purchaseId = `purchase:${user.id}:${Date.now()}`;
    await kv.set(purchaseId, {
      id: purchaseId,
      userId: user.id,
      items: newPurchases,
      total: cart.reduce((sum: number, item: any) => sum + item.price, 0),
      purchasedAt: purchaseDate,
    });
    
    // Update library and clear cart
    await kv.set(`library:${user.id}`, updatedLibrary);
    await kv.set(`cart:${user.id}`, []);
    
    return c.json({ 
      library: updatedLibrary,
      message: "Purchase successful" 
    });
    
  } catch (error) {
    console.log(`Checkout error: ${error}`);
    return c.json({ error: "Failed to process checkout" }, 500);
  }
});

// Get user's library
app.get("/make-server-84009993/library", async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const library = await kv.get(`library:${user.id}`) || [];
    
    return c.json({ library });
    
  } catch (error) {
    console.log(`Get library error: ${error}`);
    return c.json({ error: "Failed to get library" }, 500);
  }
});

// ============================================
// VIRTUAL CLASS BOOKING ROUTES
// ============================================

// Get all available trainers
app.get("/make-server-84009993/trainers", async (c) => {
  try {
    // Get all trainer profiles
    const trainers = await kv.getByPrefix('trainer:') || [];
    
    return c.json({ trainers });
    
  } catch (error) {
    console.log(`Get trainers error: ${error}`);
    return c.json({ error: "Failed to get trainers" }, 500);
  }
});

// Create a booking
app.post("/make-server-84009993/bookings", async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const bookingData = await c.req.json();
    
    const bookingId = `booking:${Date.now()}:${user.id}`;
    const booking = {
      id: bookingId,
      userId: user.id,
      ...bookingData,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    
    // Save booking
    await kv.set(bookingId, booking);
    
    // Add to user's bookings index
    const userBookingsKey = `bookings:user:${user.id}`;
    const userBookings = await kv.get(userBookingsKey) || [];
    userBookings.push(bookingId);
    await kv.set(userBookingsKey, userBookings);
    
    return c.json({ booking });
    
  } catch (error) {
    console.log(`Create booking error: ${error}`);
    return c.json({ error: "Failed to create booking" }, 500);
  }
});

// Get user's bookings
app.get("/make-server-84009993/bookings", async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const userBookingsKey = `bookings:user:${user.id}`;
    const bookingIds = await kv.get(userBookingsKey) || [];
    
    // Get all booking details
    const bookings = await kv.mget(bookingIds);
    
    return c.json({ bookings });
    
  } catch (error) {
    console.log(`Get bookings error: ${error}`);
    return c.json({ error: "Failed to get bookings" }, 500);
  }
});

// Cancel a booking
app.delete("/make-server-84009993/bookings/:bookingId", async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const bookingId = c.req.param('bookingId');
    const booking = await kv.get(bookingId);
    
    if (!booking) {
      return c.json({ error: "Booking not found" }, 404);
    }
    
    if (booking.userId !== user.id) {
      return c.json({ error: "Unauthorized" }, 403);
    }
    
    // Update booking status
    booking.status = 'cancelled';
    booking.cancelledAt = new Date().toISOString();
    await kv.set(bookingId, booking);
    
    return c.json({ booking });
    
  } catch (error) {
    console.log(`Cancel booking error: ${error}`);
    return c.json({ error: "Failed to cancel booking" }, 500);
  }
});

// ============================================
// PROGRESS TRACKING ROUTES
// ============================================

// Save puzzle/quiz progress
app.post("/make-server-84009993/progress/:type", async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const type = c.req.param('type'); // 'puzzle' or 'quiz'
    const progressData = await c.req.json();
    
    const progressKey = `progress:${user.id}:${type}`;
    const currentProgress = await kv.get(progressKey) || [];
    
    currentProgress.push({
      ...progressData,
      completedAt: new Date().toISOString()
    });
    
    await kv.set(progressKey, currentProgress);
    
    return c.json({ progress: currentProgress });
    
  } catch (error) {
    console.log(`Save progress error: ${error}`);
    return c.json({ error: "Failed to save progress" }, 500);
  }
});

// Get user progress
app.get("/make-server-84009993/progress/:type", async (c) => {
  try {
    const user = await verifyUser(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const type = c.req.param('type');
    const progressKey = `progress:${user.id}:${type}`;
    const progress = await kv.get(progressKey) || [];
    
    return c.json({ progress });
    
  } catch (error) {
    console.log(`Get progress error: ${error}`);
    return c.json({ error: "Failed to get progress" }, 500);
  }
});

// ============================================
// SEED DATA ROUTE (Development only)
// ============================================

// Seed initial trainers data
app.post("/make-server-84009993/seed-trainers", async (c) => {
  try {
    const trainers = [
      {
        id: 'trainer:1',
        name: 'GM Alexandra Petrov',
        title: 'Grandmaster',
        rating: 2650,
        specialties: ['Opening Theory', 'Endgame', 'Competition Prep'],
        levels: ['intermediate', 'advanced', 'competition'],
        hourlyRate: 150000,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        bio: 'Grandmaster with 15+ years of coaching experience.',
        availability: ['Monday', 'Wednesday', 'Friday']
      },
      {
        id: 'trainer:2',
        name: 'IM David Chen',
        title: 'International Master',
        rating: 2480,
        specialties: ['Tactics', 'Strategy', 'Youth Training'],
        levels: ['beginner', 'intermediate', 'advanced'],
        hourlyRate: 100000,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        bio: 'Specialized in teaching fundamentals and tactical patterns.',
        availability: ['Tuesday', 'Thursday', 'Saturday']
      },
      {
        id: 'trainer:3',
        name: 'WGM Sofia Martinez',
        title: 'Woman Grandmaster',
        rating: 2420,
        specialties: ['Positional Play', 'Beginner Friendly', 'Puzzle Training'],
        levels: ['beginner', 'intermediate'],
        hourlyRate: 80000,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        bio: 'Patient instructor focused on building strong chess foundations.',
        availability: ['Monday', 'Tuesday', 'Thursday', 'Sunday']
      }
    ];
    
    for (const trainer of trainers) {
      await kv.set(trainer.id, trainer);
    }
    
    return c.json({ 
      message: "Trainers seeded successfully",
      count: trainers.length 
    });
    
  } catch (error) {
    console.log(`Seed trainers error: ${error}`);
    return c.json({ error: "Failed to seed trainers" }, 500);
  }
});

Deno.serve(app.fetch);
