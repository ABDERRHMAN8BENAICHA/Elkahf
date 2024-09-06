'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '../actions';

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            try {
                const token = await getToken();
                if (token) {
                    router.push('/dashboard');
                } else {
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, [router]);

    if (loading) {
        return (
            <main className="flex items-center justify-center min-h-screen">
                <div className="loader"></div>
            </main>
        );
    }

    return (
        <div>
            {children}
        </div>
    );
}
