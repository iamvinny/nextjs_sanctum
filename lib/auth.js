import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';

export const useAuth = ({ middleware = 'auth', redirectIfAuthenticated = '/feed' } = {}) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/user');
                setUser(response.data);
                
                if (middleware === 'guest' && response.data) {
                    router.push(redirectIfAuthenticated);
                }
            } catch (error) {
                setUser(null);
                
                if (middleware === 'auth') {
                    router.push('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [middleware, redirectIfAuthenticated, router]);

    return { user, loading };
};