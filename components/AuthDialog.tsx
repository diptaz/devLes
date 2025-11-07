import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Lock, Mail, User, Loader2 } from 'lucide-react';
import { signIn } from '../utils/supabase/client';
import * as api from '../utils/api';
import { toast } from 'sonner@2.0.3';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (email: string, name: string) => void;
}

export function AuthDialog({ open, onOpenChange, onLogin }: AuthDialogProps) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Real authentication with Supabase
      const { session } = await signIn(loginEmail, loginPassword);
      
      if (!session || !session.user) {
        throw new Error('Invalid credentials');
      }
      
      // Try to get user profile from backend
      let profileName = session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User';
      let profileEmail = session.user.email || loginEmail;
      
      try {
        const { profile } = await api.getProfile();
        if (profile) {
          profileName = profile.name;
          profileEmail = profile.email;
        }
      } catch (profileErr) {
        console.log('Profile not found, using auth data:', profileErr);
        // Profile might not exist yet, use data from auth
      }
      
      toast.success('Welcome back!');
      onLogin(profileEmail, profileName);
      onOpenChange(false);
      
      // Clear form
      setLoginEmail('');
      setLoginPassword('');
      
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password');
      toast.error('Login failed', {
        description: err.message || 'Invalid email or password'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Validate password length
      if (signupPassword.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Create account in backend
      await api.signUpUser(signupEmail, signupPassword, signupName);
      
      // Auto sign in after successful signup
      const { session } = await signIn(signupEmail, signupPassword);
      
      if (!session) {
        throw new Error('Account created but login failed. Please try logging in.');
      }
      
      toast.success('Account created successfully!');
      onLogin(signupEmail, signupName);
      onOpenChange(false);
      
      // Clear form
      setSignupName('');
      setSignupEmail('');
      setSignupPassword('');
      
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to create account');
      toast.error('Sign up failed', {
        description: err.message || 'Failed to create account'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Selamat Datang di LesCatur</DialogTitle>
          <DialogDescription>
            Sign in to access premium features and track your progress
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 pt-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
              
              <p className="text-xs text-center text-gray-600">
                Don't have an account? Switch to Sign Up tab
              </p>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4 pt-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Min. 6 characters"
                    className="pl-10"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    disabled={loading}
                    required
                    minLength={6}
                  />
                </div>
                <p className="text-xs text-gray-500">Password must be at least 6 characters</p>
              </div>
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
