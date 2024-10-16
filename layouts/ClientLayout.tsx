"use client";

import Navbar from "@/components/client/Navbar";
import Footer from "@/components/client/Footer";
import useRequireAuth from "@/lib/useRequireAuth";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useRequireAuth();
    if (loading || !user) { return <div>Loading...</div>; }

    return (
        <div>
            <Navbar user={user} />
                {children}
            <Footer />
        </div>
    );
}