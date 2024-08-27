import { cookies } from 'next/headers';
import React from 'react';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { redirect } from 'next/navigation';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export default function Layout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    let mytoken: JwtPayload | null = null;

    if (token) {
        try {
            mytoken = jwt.verify(token, SECRET_KEY) as JwtPayload; // Assert the type here
        } catch (error) {
            console.error('Invalid token', error);
        }
    }

    if (mytoken === null || mytoken.role !== 'ADMIN') {
        redirect('/login');
    }

    return <main>{children}</main>;
}
