"use client";

import { useAuth } from "../lib/auth";

export default function GuestLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth({ middleware: 'guest' });
    if (loading || user) { return <div>Loading...</div>; }
    
    return (
        <div>
            {children}
        </div>
    );

}