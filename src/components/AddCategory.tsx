"use client";
import React, { useState } from 'react';
import { MdOutlinePostAdd } from 'react-icons/md';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideSend } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {};

export default function AddCategory({ }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const { push } = useRouter();

    const FormSchema = z.object({
        name: z
            .string()
            .min(3, {
                message: "الاسم يجب أن يتكون من 3 أحرف على الأقل."
            })
            .max(250, {
                message: "الاسم يجب ألا يتجاوز 250 حرفًا."
            }),
        description: z
            .string()
            .optional(),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    description: data.description,
                }),
            });

            const newData = await res.json();
            setLoading(false);
            push("/dashboard");
        } catch (error) {
            toast({
                variant: "destructive",
                title: "خطأ في الإضافة",
                description: "حدث خطأ أثناء محاولة إضافة المحتوى. يرجى المحاولة لاحقًا.",
            });
            setLoading(false);
        }
    }

    return (
        <div className='container flex justify-center items-center w-full p-4' dir="rtl">
            <Card>
                <CardHeader>
                    <CardTitle className='text-center'>إضافة فئة</CardTitle>
                </CardHeader>
                <div className="px-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>الاسم</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="اسم الفئة"
                                                {...field}
                                                disabled={loading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>الوصف</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="وصف الفئة"
                                                className="resize-none w-full h-40"
                                                {...field}
                                                disabled={loading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <CardFooter>
                                <Button disabled={loading} type='submit' className='flex justify-center items-center space-x-2 w-full'>
                                    <h1>إرسال</h1>
                                    <LucideSend className='w-5 h-5' />
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </div>
            </Card>
        </div>
    );
}
