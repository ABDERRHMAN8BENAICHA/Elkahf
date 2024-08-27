"use client"

import * as React from "react"
import { MdLightMode, MdDarkMode } from 'react-icons/md'  // أيقونات الوضع الفاتح والوضع الداكن
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <MdLightMode className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MdDarkMode className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">تبديل الوضع</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    الوضع الفاتح
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    الوضع الداكن
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    النظام
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
