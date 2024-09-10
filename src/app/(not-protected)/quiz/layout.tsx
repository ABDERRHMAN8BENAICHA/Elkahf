'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkCompetitionTime = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/time/`);

                const data = await response.json();

                if (!data.ok) {
                    throw new Error('Failed to fetch competition time');
                }

                const competitionStartTime = new Date(data.data).getTime();
                const now = new Date().getTime();

                if (now < competitionStartTime) {
                    router.push('/');
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error checking competition time:', error);
                router.push('/');
            }
        };

        checkCompetitionTime();
    }, [router]);

    if (loading) {
        return (
            <main className="flex items-center justify-center min-h-screen">
                <div className="loader"></div>
            </main>
        );
    }

    return <div>{children}</div>;
}
