"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from '@/stores/useCartStore'; // Ensure this path is correct
import Image from "next/image";
import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaShoppingCart } from 'react-icons/fa';

const CartSidebar = () => {
    const { items, clearCart } = useCartStore();
    const [totalPrice, setTotalPrice] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const price = items.reduce((total, item) => total + item.price * item.quantity, 0);
        setTotalPrice(price);
    }, [items]);

    const handleCheckout = () => {
        window.location.href = '/checkout';
    };

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full group">
                    <FaShoppingCart className="h-5 w-5 transition-colors group-hover:text-primary" />
                    <span className="sr-only">عربة التسوق</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <div className="mt-6 w-full">
                    <h2 className="text-xl font-bold mb-4">عربة التسوق</h2>
                    {items.length === 0 ? (
                        <p>عربة التسوق فارغة</p>
                    ) : (
                        <ul>
                            {items.map(item => (
                                <li key={item.id} className="flex items-center justify-between py-2">
                                    <div className="flex items-center gap-2">
                                        <Image width={48} height={48} src={item.image} alt={item.name} className="w-12 h-12 object-cover" />
                                        <span>{item.name}</span>
                                    </div>
                                    <span>{item.price.toFixed(2)} دينار</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    {items.length > 0 && (
                        <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold">الإجمالي:</span>
                                <span className="font-semibold">{totalPrice.toFixed(2)} دينار</span>
                            </div>
                            <Button onClick={handleCheckout} className="w-full mt-2">إتمام الشراء</Button>
                            <Button onClick={clearCart} className="w-full mt-2">مسح السلة</Button>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default CartSidebar;
