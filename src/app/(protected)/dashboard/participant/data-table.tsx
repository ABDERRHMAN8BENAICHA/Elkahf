"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    VisibilityState,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import Link from "next/link";
import { MdOutlinePostAdd } from "react-icons/md";

// Define the data structure
export type Person = {
    firstName: string;
    lastName: string;
    phone: string;
    answer: boolean;
    createdAt: string;
};

// Example data
const exampleData: Person[] = [
    {
        firstName: "person 2",
        lastName: "person 2",
        phone: "0774042229",
        answer: true,
        createdAt: "2024-08-27T17:19:26.274Z",
    },
    // Add more entries here if needed
];

// Define columns for the table
const personColumns: ColumnDef<Person>[] = [
    {
        accessorKey: "firstName",
        header: "First Name",
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "answer",
        header: "Answer",
        cell: ({ row }) => (row.getValue("answer") ? "Yes" : "No"),
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const createdAt = new Date(row.getValue("createdAt"));
            const formattedDate = createdAt.toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
            return formattedDate;
        },
    },
];

// DataTable component
interface DataTableProps<TData> {
    columns: ColumnDef<TData, any>[];
    data: TData[];
}

export function DataTable<TData>({
    columns,
    data,
}: DataTableProps<TData>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    });

    return (
        <div dir="rtl">
            <Button variant="default">
                <Link href={`./categories/create`} className='flex w-full justify-between items-center space-x-2'>
                    <div>
                        <h1>إضافة فئة</h1>
                    </div>
                    <div>
                        <MdOutlinePostAdd className='w-6 h-6' />
                    </div>
                </Link>
            </Button>
            <div className="flex flex-col md:flex-row justify-between items-center space-x-2 p-2">
                <div className="flex items-center py-4">
                    <Input
                        placeholder="تصفية الاسم..."
                        value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("firstName")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm w-[400px] md:w-[600px]"
                    />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            الأعمدة
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={table.getHeaderGroups()[0].headers.length} className="h-24 text-center">
                                    لم يتم العثور على نتائج
                                </TableCell>
                            </TableRow>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}