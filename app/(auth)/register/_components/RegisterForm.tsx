"use client";

import React, { useState, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const { register } = useAuth();
    const router = useRouter();
   
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
      
        try {
            const formData = new FormData(event.currentTarget);
            await register(formData);
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
                <input type="text" name="first_name" placeholder="First Name" className="px-4 py-2 border rounded-md"/>
                <input type="text" name="last_name" placeholder="Last Name" className="px-4 py-2 border rounded-md"/>
                <input type="text" name="email" placeholder="Email" className="px-4 py-2 border rounded-md"/>
                <input type="text" name="phone" placeholder="Phone" className="px-4 py-2 border rounded-md"/>
                <input type="password" name="password" placeholder="Password" className="px-4 py-2 border rounded-md"/>
                <input type="hidden" name="device_name" value="web" />
                <button type="submit" disabled={isLoading} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
                <p className="text-center text-gray-500 my-8">Already have an account? <Link href="/login">Login</Link></p>
            </form>
        </div>
    )
}