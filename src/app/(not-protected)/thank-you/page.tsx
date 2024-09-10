"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FaFacebookF, FaInstagram } from 'react-icons/fa'; 
import Link from 'next/link';

export default function ThankYouPage() {
    const { push } = useRouter();

    return (
        <div className="container flex flex-col justify-center items-center w-full p-4" dir="rtl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">شكراً لك!</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="mb-4">تمت إضافة معلوماتك بنجاح.</p>
                    <p className="mb-4">سوف نعلن عن الفائز في أقرب وقت. تابعونا على مواقع التواصل الاجتماعي</p>
                    <div className="flex justify-center space-x-8 mb-4">
                        <Link href="https://www.facebook.com/profile.php?id=100048092779407&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF className="w-6 h-6 text-blue-600" />
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
