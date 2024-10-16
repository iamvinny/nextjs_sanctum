"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GuestLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, loading } = useAuth();
    
    // Redirect to feed if user is logged in
    useEffect(() => {
        if (!loading && user) {
            router.push('/feed');
        }
    }, [loading, user, router]);
  
    if (loading) { return <div>Loading...</div>; }

    return (
        <div>
            {children}
        </div>
    );

}