"use client";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuLink, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from 'react-icons/fa';
import { SiShopee } from "react-icons/si";
import { ModeToggle } from "@/components/ModeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import Image from "next/image";
import Logo from "./Logo";


export default function NavBar() {
    const [bgOpacity, setBgOpacity] = useState(0.1);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const opacity = Math.min(0.5, scrollTop / 1000);
            setBgOpacity(opacity);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    const DesktopNavItems = () => (
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link
                        href="/"
                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        prefetch={false}
                    >
                        الرئيسية
                    </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            {/* <NavigationMenuItem>
                <NavigationMenuTrigger>الفئات</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <li key={"key"}>
                            <NavigationMenuLink asChild>
                                <Link
                                    href={`/categories/${"id"}`}
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    prefetch={false}
                                >
                                    <div className="text-sm font-medium leading-none">{"name"}</div>
                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                        {"description"}
                                    </p>
                                </Link>
                            </NavigationMenuLink>
                        </li>
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem> */}
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link
                        href="/quiz"
                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        prefetch={false}
                    >
                        المسابقه
                    </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link
                        href="/about"
                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        prefetch={false}
                    >
                        من نحن
                    </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link
                        href="/contact-us"
                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        prefetch={false}
                    >
                        تواصل معنا
                    </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    );

    const MobileNavItems = () => (
        <div className="flex flex-col space-y-4 p-4">
            <Link
                href="/"
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
            >
                الرئيسية
            </Link>
            {/* <div>
                <button
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="w-full text-left text-lg font-medium"
                >
                    الفئات
                    <ChevronDown className={`transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCategoryOpen && (
                    <ul className="mt-2 space-y-2">

                        <li key={"key"}>
                            <Link
                                href={`/categories/${"id"}`}
                                className="block px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                                onClick={() => setIsOpen(false)}
                            >
                                {"name"}
                            </Link>
                        </li>
                    </ul>
                )}
            </div> */}
            <Link
                href="/quiz"
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
            >
                المسابقه
            </Link>
            <Link
                href="/about"
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
            >
                من نحن
            </Link>
            <Link
                href="/contact-us"
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
            >
                تواصل معنا
            </Link>
        </div>
    );

    return (
        <header className={`fixed top-0 z-50 w-full border-b border-muted transition-opacity backdrop-blur-lg bg-background/80`} style={{ backgroundColor: `rgba(255, 255, 255, ${bgOpacity})` }}>
            <div className="container flex items-center justify-between h-20 px-4 md:px-6">
                <Logo />
                <nav className="hidden md:flex items-center gap-6">
                    <NavigationMenu>
                        <DesktopNavItems />
                    </NavigationMenu>
                </nav>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <MobileNavItems />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
