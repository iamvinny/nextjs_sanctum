"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import nookies from 'nookies';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';

type User = {
  first_name: string;
  last_name: string;
  // Add other user properties as needed
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (FormData: any) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/user');
      setUser(response.data);
    } catch {
      setUser(null);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (formData: FormData) => {
    try {
      const response = await axios.post('/api/login', formData);
      const { token } = response.data;
  
      // Set the token in the cookie
      nookies.set(null, 'auth_token', token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      });
  
      // Fetch user data
      await fetchUser();
  
      // Redirect after successful login and user data fetch
      router.push('/feed');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    await axios.post('/api/logout');
    setUser(null);
    router.push('/login'); // Redirect after logout
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}