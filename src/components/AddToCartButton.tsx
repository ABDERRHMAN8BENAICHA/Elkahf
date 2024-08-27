"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/useCartStore";
import { useToast } from "@/components/ui/use-toast";
import { Product } from '../types/Product'; // Adjust the import path as needed

interface AddToCartButtonProps {
    product: Product;
    quantity: number; // Add quantity as a prop
}

export const AddToCartButton = ({ product, quantity }: AddToCartButtonProps) => {
    const { addItem } = useCartStore();
    const { toast } = useToast();

    const handleAddToCart = () => {
        // Add item with the specified quantity
        addItem({ ...product, quantity });
        toast({
            title: "تم إضافة المنتج إلى السلة",
            description: `المنتج ${product.name} تم إضافته إلى السلة بكمية ${quantity}`,
        });
    };

    return (
        <Button className="mt-4" onClick={handleAddToCart}>أضف إلى السلة</Button>
    );
};
