"use client";

import React, { useState, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

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
            router.push('/feed');
        } catch (error: any) {
            setError(error.message);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto my-8">
            {/* Display error if any */}
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <form onSubmit={onSubmit} className="flex flex-col space-y-4">
                <input type="text" name="email" placeholder="Email" className="px-4 py-2 border rounded-md"/>
                <input type="password" name="password" placeholder="Password" className="px-4 py-2 border rounded-md"/>
                <input type="hidden" name="device_name" value="web" />
                <button type="submit" disabled={isLoading} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
            </form>
        </div>
    )
}