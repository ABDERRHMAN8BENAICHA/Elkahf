"use client";
import Link from 'next/link';
import React from 'react';
import {
    FaHome as HomeIcon,
    FaUsers as UsersIcon,
    FaQuestionCircle as QuestionIcon,
    FaClock as DateQuizIcon
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FiLogOut } from 'react-icons/fi';
import { ChevronRightIcon } from 'lucide-react';
import { deleteToken } from '@/app/actions';
import { GiPodiumWinner } from "react-icons/gi";

const data = [
    { title: 'الرئيسية', icon: <HomeIcon />, link: '/' },
    { title: 'المستخدمون', icon: <UsersIcon />, link: '/participant' },
    { title: 'الأسئلة', icon: <QuestionIcon />, link: '/question' },
    { title: 'تاريخ المسابقة', icon: <DateQuizIcon />, link: '/date-quiz' },
    { title: 'اعلان الفائز', icon: <GiPodiumWinner />, link: '/winner' },
];

export default function Page() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await deleteToken();
            router.push('/login');
            window.location.href = '/login';
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    };
    return (
        <div className="flex flex-col rtl">
            <main className="flex-1 p-4">
                <div className="grid gap-4 md:gap-8 lg:gap-12">
                    <div className="space-y-2 text-right">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">مرحباً بك، المشرف</h1>
                        <p className="text-gray-500 dark:text-gray-400">لديك إمكانية الوصول الكامل.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {data.map((item, index) => (
                            <Link
                                key={index}
                                href={`/dashboard${item.link}`}
                                className="flex items-center p-4 rounded-lg border shadow-sm gap-2"
                            >
                                {item.icon}
                                <span className="ml-2">{item.title}</span>
                                <ChevronRightIcon className="ml-auto w-4 h-4 opacity-70" />
                            </Link>
                        ))}
                        <Button
                            onClick={handleLogout}
                            variant="destructive"
                            className="flex items-center py-8 rounded-lg border shadow-sm gap-2"
                        >
                            <span className="ml-2">تسجيل الخروج</span>
                            <FiLogOut className="ml-auto w-4 h-4 opacity-70" />
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
