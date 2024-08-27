// "use client"

// import Link from "next/link"
// import { useEffect, useState } from 'react'
// import { NavigationMenu, NavigationMenuList, NavigationMenuLink, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu"
// import { Button } from "@/components/ui/button"
// import { FaShoppingCart } from 'react-icons/fa'
// import { GiMountainCave } from 'react-icons/gi'
// import { ModeToggle } from "@/components/ModeToggle"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import { Menu, ChevronDown } from "lucide-react"

// interface Category {
//     id: string
//     name: string
//     description: string
//     products: any[]
// }

// export default function NavBar() {
//     const [bgOpacity, setBgOpacity] = useState(0.1)
//     const [categories, setCategories] = useState<Category[]>([])
//     const [errorMessage, setErrorMessage] = useState<string | null>(null)
//     const [isOpen, setIsOpen] = useState(false)
//     const [isCategoryOpen, setIsCategoryOpen] = useState(false)
//     const [isCartOpen, setIsCartOpen] = useState(false) // State to control cart sidebar visibility

//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollTop = window.scrollY
//             const opacity = Math.min(0.5, scrollTop / 1000)
//             setBgOpacity(opacity)
//         }

//         window.addEventListener('scroll', handleScroll)
//         return () => window.removeEventListener('scroll', handleScroll)
//     }, [])

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`)
//                 const data = await response.json()
//                 if (data.ok) {
//                     setCategories(data.data)
//                 } else {
//                     setErrorMessage(data.error)
//                 }
//             } catch (error) {
//                 console.error('Error fetching categories:', error)
//                 setErrorMessage('حدث خطأ أثناء استرجاع الفئات')
//             }
//         }

//         fetchCategories()
//     }, [])

//     const DesktopNavItems = () => (
//         <>
//             <NavigationMenuLink asChild>
//                 <Link
//                     href="/"
//                     className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
//                     prefetch={false}
//                 >
//                     الرئيسية
//                 </Link>
//             </NavigationMenuLink>
//             <NavigationMenuItem>
//                 <NavigationMenuTrigger>الفئات</NavigationMenuTrigger>
//                 <NavigationMenuContent>
//                     <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
//                         {categories.map((category) => (
//                             <li key={category.id}>
//                                 <NavigationMenuLink asChild>
//                                     <Link
//                                         href={`/categories/${category.id}`}
//                                         className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
//                                         prefetch={false}
//                                     >
//                                         <div className="text-sm font-medium leading-none">{category.name}</div>
//                                         <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                                             {category.description}
//                                         </p>
//                                     </Link>
//                                 </NavigationMenuLink>
//                             </li>
//                         ))}
//                     </ul>
//                 </NavigationMenuContent>
//             </NavigationMenuItem>
//             <NavigationMenuLink asChild>
//                 <Link
//                     href="/products"
//                     className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
//                     prefetch={false}
//                 >
//                     جميع المنتجات
//                 </Link>
//             </NavigationMenuLink>
//             <NavigationMenuLink asChild>
//                 <Link
//                     href="/about"
//                     className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
//                     prefetch={false}
//                 >
//                     من نحن
//                 </Link>
//             </NavigationMenuLink>
//             <NavigationMenuLink asChild>
//                 <Link
//                     href="/contact-us"
//                     className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
//                     prefetch={false}
//                 >
//                     تواصل معنا
//                 </Link>
//             </NavigationMenuLink>
//         </>
//     )

//     const MobileNavItems = () => (
//         <div className="flex flex-col space-y-4">
//             <Link
//                 href="/"
//                 className="text-lg font-medium"
//                 onClick={() => setIsOpen(false)}
//             >
//                 الرئيسية
//             </Link>
//             <div>
//                 <button
//                     onClick={() => setIsCategoryOpen(!isCategoryOpen)}
//                     className="flex items-center justify-between w-full text-lg font-medium"
//                 >
//                     الفئات
//                     <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'transform rotate-180' : ''}`} />
//                 </button>
//                 {isCategoryOpen && (
//                     <ul className="mt-2 space-y-2">
//                         {categories.map((category) => (
//                             <li key={category.id}>
//                                 <Link
//                                     href={`/categories/${category.id}`}
//                                     className="block py-2 text-sm"
//                                     onClick={() => setIsOpen(false)}
//                                 >
//                                     {category.name}
//                                 </Link>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//             <Link
//                 href="/about"
//                 className="text-lg font-medium"
//                 onClick={() => setIsOpen(false)}
//             >
//                 من نحن
//             </Link>
//             <Link
//                 href="/contact-us"
//                 className="text-lg font-medium"
//                 onClick={() => setIsOpen(false)}
//             >
//                 تواصل معنا
//             </Link>
//         </div>
//     )

//     const CartSidebar = () => (
//         <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
//             <SheetTrigger asChild>
//                 <Button variant="ghost" size="icon" className="rounded-full group">
//                     <FaShoppingCart className="h-5 w-5 transition-colors group-hover:text-primary" />
//                     <span className="sr-only">عربة التسوق</span>
//                 </Button>
//             </SheetTrigger>
//             <SheetContent side="right">
//                 <div className="mt-6 w-full">
//                     <h2 className="text-xl font-bold mb-4">عربة التسوق</h2>
//                     {/* Replace the following with your cart items */}
//                     <p>عربة التسوق فارغة</p>
//                     {/* Add total price and checkout button here */}
//                 </div>
//             </SheetContent>
//         </Sheet>
//     )

//     return (
//         <header className={`fixed top-0 z-50 w-full border-b border-muted transition-opacity backdrop-blur-lg bg-background/80`} style={{ backgroundColor: `rgba(255, 255, 255, ${bgOpacity})` }}>
//             <div className="container flex items-center justify-between h-16 px-4 md:px-6">
//                 <Link href="/" className="flex items-center gap-2" prefetch={false}>
//                     <GiMountainCave className="w-6 h-6" />
//                     <span className="font-bold text-lg">سوف لتسوق</span>
//                 </Link>
//                 <nav className="hidden md:flex items-center gap-6">
//                     <NavigationMenu>
//                         <NavigationMenuList>
//                             <DesktopNavItems />
//                         </NavigationMenuList>
//                     </NavigationMenu>
//                 </nav>
//                 <div className="flex items-center gap-4">
//                     <ModeToggle />
//                     <CartSidebar />
//                     <Sheet open={isOpen} onOpenChange={setIsOpen}>
//                         <SheetTrigger asChild>
//                             <Button variant="ghost" size="icon" className="md:hidden">
//                                 <Menu className="h-5 w-5" />
//                                 <span className="sr-only">Toggle Menu</span>
//                             </Button>
//                         </SheetTrigger>
//                         <SheetContent side="right">
//                             <MobileNavItems />
//                         </SheetContent>
//                     </Sheet>
//                 </div>
//             </div>
//         </header>
//     )
// }

// "use client"

// import Link from "next/link";
// import { useEffect, useState } from 'react';
// import { NavigationMenu, NavigationMenuList, NavigationMenuLink, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
// import { Button } from "@/components/ui/button";
// import { FaShoppingCart } from 'react-icons/fa';
// import { GiMountainCave } from 'react-icons/gi';
// import { ModeToggle } from "@/components/ModeToggle";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Menu, ChevronDown } from "lucide-react";
// import { useCartStore } from '@/stores/useCartStore'; // Import your cart store
// import Image from "next/image";
// import { Product } from "@prisma/client";

// interface Category {
//     id: string;
//     name: string;
//     description: string;
//     products: any[]; // Adjust type if needed
// }

// export default function NavBar() {
//     const [bgOpacity, setBgOpacity] = useState(0.1);
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [errorMessage, setErrorMessage] = useState<string | null>(null);
//     const [isOpen, setIsOpen] = useState(false);
//     const [isCategoryOpen, setIsCategoryOpen] = useState(false);
//     const [isCartOpen, setIsCartOpen] = useState(false);

//     const { items } = useCartStore(); // Access cart items from Zustand store

//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollTop = window.scrollY;
//             const opacity = Math.min(0.5, scrollTop / 1000);
//             setBgOpacity(opacity);
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
//                 const data = await response.json();
//                 if (data.ok) {
//                     setCategories(data.data);
//                 } else {
//                     setErrorMessage(data.error);
//                 }
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//                 setErrorMessage('حدث خطأ أثناء استرجاع الفئات');
//             }
//         };

//         fetchCategories();
//     }, []);

//     const DesktopNavItems = () => (
//         <>
//             <NavigationMenuLink asChild>
//                 <Link
//                     href="/"
//                     className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
//                     prefetch={false}
//                 >
//                     الرئيسية
//                 </Link>
//             </NavigationMenuLink>
//             <NavigationMenuItem>
//                 <NavigationMenuTrigger>الفئات</NavigationMenuTrigger>
//                 <NavigationMenuContent>
//                     <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
//                         {categories.map((category) => (
//                             <li key={category.id}>
//                                 <NavigationMenuLink asChild>
//                                     <Link
//                                         href={`/categories/${category.id}`}
//                                         className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
//                                         prefetch={false}
//                                     >
//                                         <div className="text-sm font-medium leading-none">{category.name}</div>
//                                         <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                                             {category.description}
//                                         </p>
//                                     </Link>
//                                 </NavigationMenuLink>
//                             </li>
//                         ))}
//                     </ul>
//                 </NavigationMenuContent>
//             </NavigationMenuItem>
//             <NavigationMenuLink asChild>
//                 <Link
//                     href="/products"
//                     className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
//                     prefetch={false}
//                 >
//                     جميع المنتجات
//                 </Link>
//             </NavigationMenuLink>
//             <NavigationMenuLink asChild>
//                 <Link
//                     href="/about"
//                     className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
//                     prefetch={false}
//                 >
//                     من نحن
//                 </Link>
//             </NavigationMenuLink>
//             <NavigationMenuLink asChild>
//                 <Link
//                     href="/contact-us"
//                     className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
//                     prefetch={false}
//                 >
//                     تواصل معنا
//                 </Link>
//             </NavigationMenuLink>
//         </>
//     );

//     const MobileNavItems = () => (
//         <div className="flex flex-col space-y-4">
//             <Link
//                 href="/"
//                 className="text-lg font-medium"
//                 onClick={() => setIsOpen(false)}
//             >
//                 الرئيسية
//             </Link>
//             <div>
//                 <button
//                     onClick={() => setIsCategoryOpen(!isCategoryOpen)}
//                     className="flex items-center justify-between w-full text-lg font-medium"
//                 >
//                     الفئات
//                     <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'transform rotate-180' : ''}`} />
//                 </button>
//                 {isCategoryOpen && (
//                     <ul className="mt-2 space-y-2">
//                         {categories.map((category) => (
//                             <li key={category.id}>
//                                 <Link
//                                     href={`/categories/${category.id}`}
//                                     className="block py-2 text-sm"
//                                     onClick={() => setIsOpen(false)}
//                                 >
//                                     {category.name}
//                                 </Link>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//             <Link
//                 href="/about"
//                 className="text-lg font-medium"
//                 onClick={() => setIsOpen(false)}
//             >
//                 من نحن
//             </Link>
//             <Link
//                 href="/contact-us"
//                 className="text-lg font-medium"
//                 onClick={() => setIsOpen(false)}
//             >
//                 تواصل معنا
//             </Link>
//         </div>
//     );

//     const CartSidebar = () => (
//         <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
//             <SheetTrigger asChild>
//                 <Button variant="ghost" size="icon" className="rounded-full group">
//                     <FaShoppingCart className="h-5 w-5 transition-colors group-hover:text-primary" />
//                     <span className="sr-only">عربة التسوق</span>
//                 </Button>
//             </SheetTrigger>
//             <SheetContent side="right">
//                 <div className="mt-6 w-full">
//                     <h2 className="text-xl font-bold mb-4">عربة التسوق</h2>
//                     {items.length === 0 ? (
//                         <p>عربة التسوق فارغة</p>
//                     ) : (
//                         <ul>
//                             {items.map(item => (
//                                 <li key={item.id} className="flex items-center justify-between py-2">
//                                     <div className="flex items-center gap-2">
//                                         <Image width={48} height={48} src={item.image} alt={item.name} className="w-12 h-12 object-cover" />
//                                         <span>{item.name}</span>
//                                     </div>
//                                     <span>{item.price} دينار</span>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                     {/* Add total price and checkout button here */}
//                 </div>
//             </SheetContent>
//         </Sheet>
//     );

//     return (
//         <header className={`fixed top-0 z-50 w-full border-b border-muted transition-opacity backdrop-blur-lg bg-background/80`} style={{ backgroundColor: `rgba(255, 255, 255, ${bgOpacity})` }}>
//             <div className="container flex items-center justify-between h-16 px-4 md:px-6">
//                 <Link href="/" className="flex items-center gap-2" prefetch={false}>
//                     <GiMountainCave className="w-6 h-6" />
//                     <span className="font-bold text-lg">سوف لتسوق</span>
//                 </Link>
//                 <nav className="hidden md:flex items-center gap-6">
//                     <NavigationMenu>
//                         <NavigationMenuList>
//                             <DesktopNavItems />
//                         </NavigationMenuList>
//                     </NavigationMenu>
//                 </nav>
//                 <div className="flex items-center gap-4">
//                     <ModeToggle />
//                     <CartSidebar />
//                     <Sheet open={isOpen} onOpenChange={setIsOpen}>
//                         <SheetTrigger asChild>
//                             <Button variant="ghost" size="icon" className="md:hidden">
//                                 <Menu className="h-5 w-5" />
//                                 <span className="sr-only">Toggle Menu</span>
//                             </Button>
//                         </SheetTrigger>
//                         <SheetContent side="right">
//                             <MobileNavItems />
//                         </SheetContent>
//                     </Sheet>
//                 </div>
//             </div>
//         </header>
//     );
// }

// "use client";

// import Link from "next/link";
// import { useEffect, useState } from 'react';
// import { NavigationMenu, NavigationMenuList, NavigationMenuLink, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
// import { Button } from "@/components/ui/button";
// import { FaShoppingCart } from 'react-icons/fa';
// import { GiMountainCave } from 'react-icons/gi';
// import { ModeToggle } from "@/components/ModeToggle";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Menu, ChevronDown } from "lucide-react";
// import { useCartStore } from '@/stores/useCartStore'; // Import your cart store
// import Image from "next/image";
// import { Product } from "@prisma/client";

// interface Category {
//     id: string;
//     name: string;
//     description: string;
//     products: any[]; // Adjust type if needed
// }

// export default function NavBar() {
//     const [bgOpacity, setBgOpacity] = useState(0.1);
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [errorMessage, setErrorMessage] = useState<string | null>(null);
//     const [isOpen, setIsOpen] = useState(false);
//     const [isCategoryOpen, setIsCategoryOpen] = useState(false);
//     const [isCartOpen, setIsCartOpen] = useState(false);

//     const { items } = useCartStore(); // Access cart items from Zustand store

//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollTop = window.scrollY;
//             const opacity = Math.min(0.5, scrollTop / 1000);
//             setBgOpacity(opacity);
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
//                 const data = await response.json();
//                 if (data.ok) {
//                     setCategories(data.data);
//                 } else {
//                     setErrorMessage(data.error);
//                 }
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//                 setErrorMessage('حدث خطأ أثناء استرجاع الفئات');
//             }
//         };

//         fetchCategories();
//     }, []);

//     const DesktopNavItems = () => (
//         <NavigationMenuList>
//             <NavigationMenuItem>
//                 <NavigationMenuLink asChild>
//                     <Link
//                         href="/"
//                         className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
//                         prefetch={false}
//                     >
//                         الرئيسية
//                     </Link>
//                 </NavigationMenuLink>
//             </NavigationMenuItem>
//             <NavigationMenuItem>
//                 <NavigationMenuTrigger>الفئات</NavigationMenuTrigger>
//                 <NavigationMenuContent>
//                     <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
//                         {categories.map((category) => (
//                             <li key={category.id}>
//                                 <NavigationMenuLink asChild>
//                                     <Link
//                                         href={`/categories/${category.id}`}
//                                         className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
//                                         prefetch={false}
//                                     >
//                                         <div className="text-sm font-medium leading-none">{category.name}</div>
//                                         <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                                             {category.description}
//                                         </p>
//                                     </Link>
//                                 </NavigationMenuLink>
//                             </li>
//                         ))}
//                     </ul>
//                 </NavigationMenuContent>
//             </NavigationMenuItem>
//             <NavigationMenuItem>
//                 <NavigationMenuLink asChild>
//                     <Link
//                         href="/products"
//                         className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
//                         prefetch={false}
//                     >
//                         جميع المنتجات
//                     </Link>
//                 </NavigationMenuLink>
//             </NavigationMenuItem>
//             <NavigationMenuItem>
//                 <NavigationMenuLink asChild>
//                     <Link
//                         href="/about"
//                         className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
//                         prefetch={false}
//                     >
//                         من نحن
//                     </Link>
//                 </NavigationMenuLink>
//             </NavigationMenuItem>
//             <NavigationMenuItem>
//                 <NavigationMenuLink asChild>
//                     <Link
//                         href="/contact-us"
//                         className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
//                         prefetch={false}
//                     >
//                         تواصل معنا
//                     </Link>
//                 </NavigationMenuLink>
//             </NavigationMenuItem>
//         </NavigationMenuList>
//     );

//     const MobileNavItems = () => (
//         <div className="flex flex-col space-y-4">
//             <Link
//                 href="/"
//                 className="text-lg font-medium"
//                 onClick={() => setIsOpen(false)}
//             >
//                 الرئيسية
//             </Link>
//             <div>
//                 <button
//                     onClick={() => setIsCategoryOpen(!isCategoryOpen)}
//                     className="flex items-center justify-between w-full text-lg font-medium"
//                 >
//                     الفئات
//                     <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'transform rotate-180' : ''}`} />
//                 </button>
//                 {isCategoryOpen && (
//                     <ul className="mt-2 space-y-2">
//                         {categories.map((category) => (
//                             <li key={category.id}>
//                                 <Link
//                                     href={`/categories/${category.id}`}
//                                     className="block py-2 text-sm"
//                                     onClick={() => setIsOpen(false)}
//                                 >
//                                     {category.name}
//                                 </Link>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//             <Link
//                 href="/about"
//                 className="text-lg font-medium"
//                 onClick={() => setIsOpen(false)}
//             >
//                 من نحن
//             </Link>
//             <Link
//                 href="/contact-us"
//                 className="text-lg font-medium"
//                 onClick={() => setIsOpen(false)}
//             >
//                 تواصل معنا
//             </Link>
//         </div>
//     );

//     const CartSidebar = () => (
//         <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
//             <SheetTrigger asChild>
//                 <Button variant="ghost" size="icon" className="rounded-full group">
//                     <FaShoppingCart className="h-5 w-5 transition-colors group-hover:text-primary" />
//                     <span className="sr-only">عربة التسوق</span>
//                 </Button>
//             </SheetTrigger>
//             <SheetContent side="right">
//                 <div className="mt-6 w-full">
//                     <h2 className="text-xl font-bold mb-4">عربة التسوق</h2>
//                     {items.length === 0 ? (
//                         <p>عربة التسوق فارغة</p>
//                     ) : (
//                         <ul>
//                             {items.map(item => (
//                                 <li key={item.id} className="flex items-center justify-between py-2">
//                                     <div className="flex items-center gap-2">
//                                         <Image width={48} height={48} src={item.image} alt={item.name} className="w-12 h-12 object-cover" />
//                                         <span>{item.name}</span>
//                                     </div>
//                                     <span>{item.price} دينار</span>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                     {/* Add total price and checkout button here */}
//                 </div>
//             </SheetContent>
//         </Sheet>
//     );

//     return (
//         <header className={`fixed top-0 z-50 w-full border-b border-muted transition-opacity backdrop-blur-lg bg-background/80`} style={{ backgroundColor: `rgba(255, 255, 255, ${bgOpacity})` }}>
//             <div className="container flex items-center justify-between h-16 px-4 md:px-6">
//                 <Link href="/" className="flex items-center gap-2" prefetch={false}>
//                     <GiMountainCave className="w-6 h-6" />
//                     <span className="font-bold text-lg">سوف لتسوق</span>
//                 </Link>
//                 <nav className="hidden md:flex items-center gap-6">
//                     <NavigationMenu>
//                         <DesktopNavItems />
//                     </NavigationMenu>
//                 </nav>
//                 <div className="flex items-center gap-4">
//                     <ModeToggle />
//                     <CartSidebar />
//                     <Sheet open={isOpen} onOpenChange={setIsOpen}>
//                         <SheetTrigger asChild>
//                             <Button variant="ghost" size="icon" className="md:hidden">
//                                 <Menu className="h-5 w-5" />
//                                 <span className="sr-only">Toggle Menu</span>
//                             </Button>
//                         </SheetTrigger>
//                         <SheetContent side="right">
//                             <MobileNavItems />
//                         </SheetContent>
//                     </Sheet>
//                 </div>
//             </div>
//         </header>
//     );
// }
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
import { useCartStore } from '@/stores/useCartStore'; // Import your cart store
import Image from "next/image";

interface Category {
    id: string;
    name: string;
    description: string;
    products: any[]; // Adjust type if needed
}

export default function NavBar() {
    const [bgOpacity, setBgOpacity] = useState(0.1);
    const [categories, setCategories] = useState<Category[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const { items, clearCart } = useCartStore();
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

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
                const data = await response.json();
                if (data.ok) {
                    setCategories(data.data);
                } else {
                    setErrorMessage(data.error);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                setErrorMessage('حدث خطأ أثناء استرجاع الفئات');
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const price = items.reduce((total, item) => total + item.price * item.quantity, 0);
        setTotalPrice(price);
    }, [items]);

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
            <NavigationMenuItem>
                <NavigationMenuTrigger>الفئات</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {categories.map((category) => (
                            <li key={category.id}>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href={`/categories/${category.id}`}
                                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                        prefetch={false}
                                    >
                                        <div className="text-sm font-medium leading-none">{category.name}</div>
                                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                            {category.description}
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        ))}
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link
                        href="/products"
                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        prefetch={false}
                    >
                        جميع المنتجات
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
        <div className="flex flex-col space-y-4">
            <Link
                href="/"
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
            >
                الرئيسية
            </Link>
            <div>
                <button
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="w-full text-left text-lg font-medium"
                >
                    الفئات
                    <ChevronDown className={`transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCategoryOpen && (
                    <ul className="mt-2 space-y-2">
                        {categories.map((category) => (
                            <li key={category.id}>
                                <Link
                                    href={`/categories/${category.id}`}
                                    className="block px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Link
                href="/products"
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
            >
                جميع المنتجات
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

    // const CartSidebar = () => (
    //     <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
    //         <SheetTrigger asChild>
    //             <Button variant="ghost" size="icon" className="rounded-full group">
    //                 <FaShoppingCart className="h-5 w-5 transition-colors group-hover:text-primary" />
    //                 <span className="sr-only">عربة التسوق</span>
    //             </Button>
    //         </SheetTrigger>
    //         <SheetContent side="right">
    //             <div className="mt-6 w-full">
    //                 <h2 className="text-xl font-bold mb-4">عربة التسوق</h2>
    //                 {items.length === 0 ? (
    //                     <p>عربة التسوق فارغة</p>
    //                 ) : (
    //                     <ul>
    //                         {items.map(item => (
    //                             <li key={item.id} className="flex items-center justify-between py-2">
    //                                 <div className="flex items-center gap-2">
    //                                     <Image width={48} height={48} src={item.image} alt={item.name} className="w-12 h-12 object-cover" />
    //                                     <span>{item.name}</span>
    //                                 </div>
    //                                 <span>{item.price} دينار</span>
    //                             </li>
    //                         ))}
    //                         <li className="flex items-center justify-between py-2 font-bold">
    //                             <span>الإجمالي:</span>
    //                             <span>{totalPrice} دينار</span>
    //                         </li>
    //                     </ul>
    //                 )}
    //                 {
    //                     !(items.length === 0) && (
    //                         <div className="mt-4 flex gap-2">
    //                             <Button variant="outline" onClick={clearCart} className="flex-1">
    //                                 مسح العربة
    //                             </Button>
    //                             <Link href={`/checkout`}>
    //                                 <Button className="flex-1">
    //                                     متابعة الدفع
    //                                 </Button>
    //                             </Link>
    //                         </div>
    //                     )
    //                 }
    //             </div>
    //         </SheetContent>
    //     </Sheet>
    // );
    const CartSidebar = () => {
        const { items, increaseQuantity, decreaseQuantity, clearCart } = useCartStore();
        const [totalPrice, setTotalPrice] = useState(0);
    
        useEffect(() => {
            const price = items.reduce((total, item) => total + item.price * item.quantity, 0);
            setTotalPrice(price);
        }, [items]);
    
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
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="icon" onClick={() => decreaseQuantity(item.id)}>-</Button>
                                            <span>{item.quantity}</span>
                                            <Button variant="outline" size="icon" onClick={() => increaseQuantity(item.id)}>+</Button>
                                        </div>
                                        <span>{item.price * item.quantity} دينار</span>
                                    </li>
                                ))}
                                <li className="flex items-center justify-between py-2 font-bold">
                                    <span>الإجمالي:</span>
                                    <span>{totalPrice} دينار</span>
                                </li>
                            </ul>
                        )}
                        {
                            !(items.length === 0) && (
                                <div className="mt-4 flex gap-2">
                                    <Button variant="outline" onClick={clearCart} className="flex-1">
                                        مسح العربة
                                    </Button>
                                    <Link href={`/checkout`}>
                                        <Button className="flex-1">
                                            متابعة الدفع
                                        </Button>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </SheetContent>
            </Sheet>
        );
    };
    return (
        <header className={`fixed top-0 z-50 w-full border-b border-muted transition-opacity backdrop-blur-lg bg-background/80`} style={{ backgroundColor: `rgba(255, 255, 255, ${bgOpacity})` }}>
            <div className="container flex items-center justify-between h-16 px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2" prefetch={false}>
                    <SiShopee className="w-6 h-6" />
                    <span className="font-bold text-lg">سوف للتسوّق</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                    <NavigationMenu>
                        <DesktopNavItems />
                    </NavigationMenu>
                </nav>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <CartSidebar />
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
