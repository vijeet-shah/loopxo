// app/login/page.tsx
"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Lock, Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  // No debug info needed anymore

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    setError('');
    
    try {
      // Attempt login with provided credentials
      
      // Try direct credential check first 
      if (email === process.env.NEXT_PUBLIC_ADMIN_USERNAME && 
          password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
        

        
        // Set admin cookie
        Cookies.set('adminToken', 'true', { 
          expires: 1, // 1 day
          secure: process.env.NODE_ENV === 'production', // Secure in production
          sameSite: 'strict'
        });
        
        router.push('/admin/dashboard');
        return;
      }
      
      // Then try NextAuth
      // Fallback to NextAuth if direct check fails
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      
      if (!result?.error) {
        router.push('/admin/dashboard');
        return;
      }
      
      setError('Invalid credentials');
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-amber-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-amber-300 dark:bg-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-80 h-80 bg-amber-400 dark:bg-amber-600 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-96 border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-600 dark:to-amber-500 p-6 flex justify-center">
          <div className="relative w-20 h-20">
            <div className="absolute -inset-1 bg-amber-200 rounded-full blur opacity-30 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full overflow-hidden shadow-lg bg-white/90 dark:bg-gray-800 flex items-center justify-center">
              <div className="text-2xl font-extrabold">
                <span className="text-amber-700 dark:text-amber-400">Admin</span>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="pt-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-amber-700 dark:text-amber-400">Admin Login</h1>
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}



          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 border-gray-300 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-400"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 border-gray-300 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-gray-900 text-white shadow-lg hover:shadow-amber-200/50 dark:hover:shadow-amber-500/30 transition-all hover:-translate-y-0.5"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}