"use client";

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard'; // Adjust the import path as necessary
import { Input } from './ui/input';
import { Button } from './ui/button';
import { BiSearchAlt2 } from 'react-icons/bi';
import { Product } from '@prisma/client';



export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
                const data = await response.json();
                if (data.ok) {
                    // Transform the data to match the expected type
                    const transformedProducts = data.data.map((product: any) => ({
                        ...product,
                        createdAt: new Date(product.createdAt).toISOString(),
                        updatedAt: new Date(product.updatedAt).toISOString()
                    }));
                    setProducts(transformedProducts);
                } else {
                    setError(data.error);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('حدث خطأ أثناء استرجاع المنتجات');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const filteredProducts = products.filter(product => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
            product.status === 'AVAILABLE' && // Ensure only products with status 'AVAILABLE' are included
            (
                product.name.toLowerCase().includes(lowerCaseQuery) ||
                product.description.toLowerCase().includes(lowerCaseQuery) ||
                product.features.some(feature => feature.toLowerCase().includes(lowerCaseQuery))
            )
        );
    });

    if (loading) return <p>تحميل...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4">
            <div className='m-auto w-full mt-8 flex gap-2 px-10 mb-10'>
                <Input
                    type="text"
                    placeholder="ابحث"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <Button>
                    <BiSearchAlt2 size={20} />
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.length === 0 ? (
                    <p>لا توجد منتجات لعرضها</p>
                ) : (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>
        </div>
    );
}
