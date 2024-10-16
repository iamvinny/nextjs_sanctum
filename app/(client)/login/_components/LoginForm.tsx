"use client";

import React, { useState, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios'
import nookies from 'nookies';

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const { login } = useAuth();
    const router = useRouter();
   
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
      
        try {
          const formData = new FormData(event.currentTarget);
          await login(formData);
          // The login function in AuthContext will handle redirection
        } catch (error: any) {
          setError(error.message);
          console.error(error);
        } finally {
          setIsLoading(false);
        }
    }

    return (
        <div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={onSubmit}>
                <input type="text" name="email" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />
                <input type="hidden" name="device_name" value="web" />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
            </form>
        </div>
    )
}