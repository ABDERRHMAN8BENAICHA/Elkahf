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
        const checkCompetitionTime = () => {
            const competitionStartTime = localStorage.getItem('competitionDateTime');
            if (!competitionStartTime) {
                router.push('/some-page'); 
                return;
            }

            const startTime = new Date(competitionStartTime).getTime();
            const now = new Date().getTime();

            if (now < startTime) {
                router.push('/'); 
            } else {
                setLoading(false);
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

    return (
        <div>{children}</div>
    );
}
