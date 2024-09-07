"use client"
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import confetti from 'canvas-confetti';
import { FaUser, FaPhone } from 'react-icons/fa';
import { getToken } from '@/app/actions';

interface WinnerData {
    firstName: string;
    lastName: string;
    phone: string;
}

interface ApiResponse<T> {
    ok: boolean;
    data: T;
}

export default function WinnerAnnouncement() {
    const [winnerData, setWinnerData] = useState<WinnerData | null>(null);
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        async function fetchToken() {
            try {
                const token = await getToken();
                setToken(token);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        }

        fetchToken();
    }, []);

    useEffect(() => {
        async function fetchWinnerData() {
            if (!token) return;
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/participant/winner/get`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': `${token}`,
                    }
                });

                const result: ApiResponse<WinnerData> = await response.json();

                if (result.ok) {
                    setWinnerData(result.data);
                } else {
                    setWinnerData(null);
                }
            } catch (error) {
                console.error('Error fetching winner data:', error);
                setWinnerData(null);
            }
        }

        fetchWinnerData();
    }, [token]);

    useEffect(() => {
        const celebrate = () => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        };

        if (winnerData) {
            celebrate();
            const intervalId = setInterval(celebrate, 3000);
            return () => clearInterval(intervalId);
        }
    }, [winnerData]);

    if (!winnerData) {
        return (
            <main className="flex items-center justify-center min-h-screen">
                <div className="loader"></div>
            </main>
        )
    }

    return (
        <div className="p-10 flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">تهانينا للفائز!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-center space-y-2">
                        <div className="flex items-center justify-center space-x-2">
                            <FaUser className="h-5 w-5 text-blue-500 m-2" />
                            <span className="font-semibold text-lg">{`${winnerData.firstName} ${winnerData.lastName}`}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <FaPhone className="h-5 w-5 text-green-500 m-2" />
                            <span>{winnerData.phone}</span>
                        </div>
                    </div>
                    <div className="text-center animate-pulse">
                        <span className="text-xl font-bold text-yellow-500">🎉 جاري الاحتفال! 🎉</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
