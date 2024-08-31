// 'use server';

// import { cookies } from 'next/headers';

// export async function storeToken(data: string): Promise<void> {
//     try {
//         // Ensure `data` is a string. If `data` is an object, stringify it.
//         const tokenString = typeof data === 'object' ? JSON.stringify(data) : data;

//         // Define cookie expiration (24 hours)
//         const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

//         // Store token in cookies with a max age
//         cookies().set('token', tokenString, { maxAge: oneDay });
//         console.log('Token stored successfully.');
//     } catch (error) {
//         console.error('Error storing the token:', error);
//     }
// }



// export function getToken() {
//     const cookieStore = cookies()
//     const token = cookieStore.get('token')
//     return token
// }