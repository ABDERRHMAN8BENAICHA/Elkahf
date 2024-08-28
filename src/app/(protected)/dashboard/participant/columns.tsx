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

export type Person = {
    id: string
    firstName: string
    lastName: string
    phone: string
    answer: boolean
    createdAt: string
}

export const personColumns: ColumnDef<Person | any>[] = [
    {
        accessorKey: "firstName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    الاسم الأول
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "lastName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    اسم العائلة
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "phone",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    رقم الهاتف
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "answer",
        header: "الإجابة",
        cell: ({ row }) => {
            return (
                <div className="text-center">
                    {row.getValue("answer") ? 'نعم' : 'لا'}
                </div>
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
]

