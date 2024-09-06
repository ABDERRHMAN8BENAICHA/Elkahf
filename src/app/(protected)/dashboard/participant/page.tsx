'use client';

import React, { useEffect, useState } from 'react';
import { DataTable, Person } from './data-table';
import { personColumns } from './columns';
import { getToken } from '@/app/actions';

interface ApiResponse<T> {
    ok: boolean;
    data: T;
}

export default function Page() {
    const [data, setData] = useState<Person[]>([]);
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
        async function fetchData() {
            if (!token) return; 
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/participant`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': `${token}`,
                    }
                });

                const result: ApiResponse<Person[]> = await response.json();

                if (result.ok) {
                    setData(result.data);
                } else {
                    setData([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setData([]);
            }
        }

        fetchData();
    }, [token]);

    return (
        <section>
            <div className="container mx-auto py-10">
                <DataTable columns={personColumns} data={data} />
            </div>
        </section>
    );
}
