"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast"; // Adjust the path as needed

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";



// Define the schema for validation using zod
const formSchema = z.object({
    username: z.string().min(1, {
        message: "يرجى إدخال اسم المستخدم.",
    }).min(6, {
        message: "اسم المستخدم يجب أن يكون على الأقل 6 أحرف.",
    }),
    password: z.string().min(1, {
        message: "يرجى إدخال كلمة المرور.",
    }).min(6, {
        message: "كلمة المرور يجب أن تكون على الأقل 6 أحرف.",
    }),
});

// Define types for form data
type FormData = z.infer<typeof formSchema>;

export default function Login() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: FormData) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            // storeToken(data.data)
            console.log(data);
            
            if (!data.ok) {
                setError(data.error || 'حدث خطأ أثناء تسجيل الدخول.');
                toast({
                    description: data.error || 'حدث خطأ أثناء تسجيل الدخول.',
                    variant: "destructive",
                });
                return;
            }

            toast({ description: 'تم تسجيل الدخول بنجاح!' });
            router.push('/dashboard');
        } catch (error) {
            setError('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقاً.');
            toast({
                description: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقاً.',
                variant: "destructive",
            });
            console.log(error);
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">تسجيل دخول المسؤول</CardTitle>
                    <CardDescription>أدخل بيانات الاعتماد الخاصة بك للوصول إلى لوحة التحكم.</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>اسم المستخدم</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="أدخل اسم المستخدم" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>كلمة المرور</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="أدخل كلمة المرور الخاصة بك" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">
                                تسجيل الدخول
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
