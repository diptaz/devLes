import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Create singleton Supabase client
let supabaseClient: ReturnType<typeof createSupabaseClient> | null = null;

export function createClient() {
  if (supabaseClient) return supabaseClient;
  
  const supabaseUrl = `https://${projectId}.supabase.co`;
  supabaseClient = createSupabaseClient(supabaseUrl, publicAnonKey);
  
  return supabaseClient;
}

// Get current user session
export async function getSession() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Get session error:', error);
    return null;
  }
  
  return data.session;
}

// Sign in with email and password
export async function signIn(email: string, password: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    console.error('Sign in error:', error);
    throw error;
  }
  
  return data;
}

// Sign out
export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

// Get current user
export async function getCurrentUser() {
  try {
    const supabase = createClient();
    
    // First check if session exists
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return null;
    }
    
    // If session exists, get user details
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error('Get user error:', userError);
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}
