import type { Metadata } from "next";
import { Noto_Kufi_Arabic as FontSans } from "next/font/google";
import "@/style/globals.css"
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { EdgeStoreProvider } from "@/lib/edgestore";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "سوف للتسوّق - أفضل تجربة تسوق",
  description: "اكتشف أحدث المنتجات والعروض في سوف لتسوق. تسوق الآن للحصول على أفضل الأسعار والعروض.",
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
          <EdgeStoreProvider>
            <NavBar />
            <main>
              {children}
            </main>
            <Footer />
            <Toaster />
          </EdgeStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
