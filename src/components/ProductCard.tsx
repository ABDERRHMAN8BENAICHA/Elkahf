import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Product } from '@prisma/client';
import Link from 'next/link';



export default function ProductCard({ product }: { product: Product }) {
    return (
        <div key={product.id} className="border border-gray-300 rounded-lg p-4">
            <div className="relative w-full h-48">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                />
            </div>
            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className="text-gray-500 mt-1">{product.description}</p>
            <div className="text-gray-500 mt-2">
                {product.features.map((feature, index) => (
                    <p key={index} className="text-sm">{feature}</p>
                ))}
            </div>
            <p className="text-2xl font-bold mt-4">{product.price.toFixed(2)} دينارا</p>
            <Link href={`/products/${product.id}`}>
                <Button variant="default" className="mt-4">عرض التفاصيل</Button>
            </Link>
        </div>
    );
}
