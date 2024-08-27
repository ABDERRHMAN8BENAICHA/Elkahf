"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LucideSend } from 'lucide-react';

type Category = {
    id: string;
    name: string;
    description?: string;
};

type Props = {
    id: string;
};

export default function UpdateCategory({ id }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [category, setCategory] = useState<Category | null>(null);
    const { push } = useRouter();

    useEffect(() => {
        async function fetchCategory() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${id}`);
                const data = await res.json();
                if (data.ok) {
                    setCategory(data.data);
                } else {
                    toast({
                        variant: "destructive",
                        title: "خطأ في جلب الفئة",
                        description: "حدث خطأ أثناء جلب بيانات الفئة.",
                    });
                }
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "خطأ في جلب الفئة",
                    description: "حدث خطأ أثناء محاولة جلب البيانات. يرجى المحاولة لاحقًا.",
                });
            }
        }

        fetchCategory();
    }, [id]);

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
            name: category?.name || "",
            description: category?.description || "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    description: data.description,
                }),
            });

            const newData = await res.json();
            if (newData.ok) {
                toast({
                    variant: "default",
                    description: "تم تحديث الفئة بنجاح",
                });
                push("/dashboard"); // Redirect on success
            } else {
                toast({
                    variant: "destructive",
                    title: "خطأ في التحديث",
                    description: "حدث خطأ أثناء محاولة تحديث الفئة. يرجى المحاولة لاحقًا.",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "خطأ في التحديث",
                description: "حدث خطأ أثناء محاولة تحديث الفئة. يرجى المحاولة لاحقًا.",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='container flex justify-center items-center w-full p-4' dir="rtl">
            <Card>
                <CardHeader>
                    <CardTitle className='text-center'>تحديث فئة</CardTitle>
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
                                    <h1>تحديث</h1>
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
