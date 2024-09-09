'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '../actions';

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    // const router = useRouter();
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     async function checkAuth() {
    //         try {
    //             const token = await getToken();
    //             if (!token) {
    //                 router.push('/login');
    //             } else {
    //                 setLoading(false);
    //             }
    //         } catch (error) {
    //             console.error('Error checking authentication:', error);
    //             router.push('/login');
    //         }
    //     }

    //     checkAuth();
    // }, [router]);

    // if (loading) {
    //     return (
    //         <main className="flex items-center justify-center h-screen">
    //             <div className="loader"></div>
    //         </main>
    //     );
    // }

    return (
        <div>
            {children}
        </div>
    );
}
