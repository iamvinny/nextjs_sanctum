"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import nookies from 'nookies';
import axios from '@/lib/axios';

type User = {
  first_name: string;
  last_name: string;
  // Add other user properties as needed
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (formData: any) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      console.log('Fetching user...');
      const response = await axios.get('/api/user');
      console.log('User data:', response.data); // Add this line
      setUser(response.data);
    } catch (error) {
      console.error('Fetch user error:', error); // Add this line
      setUser(null);
      // Removed router.push('/login'); to prevent global redirect
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

      // No need to redirect here; handle redirection in the page
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    await axios.post('/api/logout');
    setUser(null);
    // Handle redirection after logout in the component
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
