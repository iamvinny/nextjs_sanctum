"use client";

import { useAuth } from "@/context/AuthContext";

export default function GuestLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    if (loading || user) { return <div>Loading...</div>; }
    
    return (
        <div>
            {children}
        </div>
    );

}