"use client";

import { usePathname, useRouter } from "next/navigation";
import Footer from "@/components/client/Footer";
import Navbar from "@/components/client/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function GuestLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, loading } = useAuth();
    
    // Redirect to feed if user is logged in
    useEffect(() => {
        if (!loading && user && pathname === '/login' || pathname === '/register') {
            router.push('/feed');
        }
    }, [loading, user, router]);
  
    if (loading) { return <div>Loading...</div>; }

    return (
        <div>
            <Navbar user={user} />
                {children}
            <Footer />
        </div>
    );

}