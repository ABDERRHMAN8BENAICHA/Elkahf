
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export type Category = {
    id: string
    name: string
    description: string
    createdAt: string
    updatedAt: string
    products: any[] // Adjust type if you have a specific Product type
}

export const categoryColumns: ColumnDef<Category | any>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    الاسم
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    الوصف
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    تاريخ الانشاء
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const createdAt = new Date(row.getValue("createdAt"))

            const day = createdAt.getDate()
            const month = createdAt.toLocaleString("en-US", { month: "short" })
            const year = createdAt.getFullYear()
            const time = createdAt.toLocaleTimeString("en-US")

            const formattedDate = `${day}, ${month}, ${year}, ${time}`

            return <div className="text-right font-medium m-4" dir="rtl">{formattedDate}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const category = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(category.id)}
                        >
                            نسخ معرف الفئة
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem>
                            <Link href={`/category-products?categoryId=${category.id}`}>المنتجات</Link>
                        </DropdownMenuItem> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={`./categories/updete/${category.id}`}>تعديل</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            deleteCategory(category.id)
                        }}>مسح</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export async function deleteCategory(categoryId: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${categoryId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete category');
        }

        // Optionally, refresh the data or provide feedback
        console.log('Category deleted successfully');
        // You might want to trigger a re-fetch of the category data or update local state here

    } catch (error) {
        console.error('Error deleting category:', error);
        // Handle error appropriately, e.g., show an alert to the user
    }
}
