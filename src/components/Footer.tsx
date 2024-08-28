import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { SiShopee } from "react-icons/si";
import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="bg-muted/10 py-12 md:py-16 lg:py-20">
            <div className="container grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div className="grid gap-4">
                    <div className="flex items-center gap-2 -mr-10">
                        {/* <SiShopee className="h-6 w-6" />
                        <span className="text-lg font-semibold">سوف للتسوّق</span> */}
                        <Logo />
                    </div>
                    <address className="not-italic text-sm text-muted-foreground">
                        حي 11 ديسمبر 1960
                    </address>
                    <a href="tel:0781921767">0698111100</a>
                    <a href="mailto:alkahef39@gmail.com">alkahef39@gmail.com</a>
                </div>
                <div className="grid gap-4">
                    <h4 className="text-lg font-semibold">روابط سريعة</h4>
                    <nav className="grid gap-2">
                        <Link href="/" className="text-sm hover:underline" prefetch={false}>
                            الرئيسية
                        </Link>
                        <Link href="/quiz" className="text-sm hover:underline" prefetch={false}>
                            المسابقه
                        </Link>
                        <Link href="/about" className="text-sm hover:underline" prefetch={false}>
                            من نحن
                        </Link>
                        <Link href="/contact-us" className="text-sm hover:underline" prefetch={false}>
                            تواصل معنا
                        </Link>
                    </nav>
                </div>
                <div className="grid gap-4">
                    <h4 className="text-lg font-semibold">النشرة الإخبارية</h4>
                    <form className="flex gap-2">
                        <Input type="email" placeholder="أدخل بريدك الإلكتروني" className="flex-1" />
                        <Button type="submit" size="sm">
                            اشتراك
                        </Button>
                    </form>
                    <p className="text-sm text-muted-foreground">
                        اشترك في نشرتنا الإخبارية للبقاء على اطلاع بأحدث العروض.
                    </p>
                </div>
                <div className="grid gap-4">
                    <h4 className="text-lg font-semibold">تابعنا</h4>
                    <div className="flex gap-4">
                        <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                            <FaFacebookF className="h-5 w-5" />
                            <span className="sr-only">Facebook</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                            <FaTwitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                            <FaInstagram className="h-5 w-5" />
                            <span className="sr-only">Instagram</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                            <FaLinkedinIn className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
