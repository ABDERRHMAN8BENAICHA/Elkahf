'use client';

import React, { useEffect, useState } from 'react';
import { Category, categoryColumns } from './columns'; // Ensure this file exports categoryColumns
import { DataTable } from './data-table';

type Props = {};

export default function Page({ }: Props) {
  const [data, setData] = useState<Category[]>([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
        const result = await response.json();
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
        <DataTable columns={categoryColumns} data={data} />
      </div>
    </section>
  );
}
