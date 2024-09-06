'use server';

import { cookies } from 'next/headers';

export async function storeToken(data: string): Promise<void> {
    try {
        const tokenString = typeof data === 'object' ? JSON.stringify(data) : data;

        const oneDay = 24 * 60 * 60; 

        cookies().set('token', tokenString, { maxAge: oneDay });
    } catch (error) {
        console.error('Error storing the token:', error);
    }
}

export async function getToken(): Promise<string | undefined> {
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    return token?.value;
}

export async function deleteToken(): Promise<void> {
    try {
        cookies().set('token', '', { expires: new Date(0) });
    } catch (error) {
        console.error('Error deleting the token:', error);
    }
}