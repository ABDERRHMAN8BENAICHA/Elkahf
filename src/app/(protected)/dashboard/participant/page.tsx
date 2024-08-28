// page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { DataTable, Person } from './data-table';
import { personColumns } from './columns';

export default function Page() {
    const [data, setData] = useState<Person[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/participant`);
                const result = await response.json();
                console.log(result);
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
    }, []); // Empty dependency array ensures this runs only once after the initial render

    return (
        <section>
            <div className="container mx-auto py-10">
                <DataTable columns={personColumns} data={data} />
            </div>
        </section>
    );
}
