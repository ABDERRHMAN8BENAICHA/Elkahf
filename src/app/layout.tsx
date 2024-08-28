import type { Metadata } from "next";
import { Noto_Kufi_Arabic as FontSans } from "next/font/google";
import "@/style/globals.css"
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Analytics } from "@vercel/analytics/react"
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "مكتبة الكهف -  مدرسية أدوات  و تجهيزات رياضية",
  description: "مكتبة الكهف توفر تجهيزات الدخول المدرسي والأدوات الرياضية، بالإضافة إلى خدمات الطباعة وإجراء البحوث. انضم إلى مسابقتنا الأسبوعية للفوز بجائزة قيمتها 2000 دينار جزائري.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body
        dir="rtl"
        className={cn(
          "min-h-screen bg-background font-sans antialiased mt-20",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <main>
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
