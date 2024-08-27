"use client";
import React, { useState, useEffect } from 'react';
import { MdOutlinePostAdd } from 'react-icons/md';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
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
import { Progress } from '@/components/progress';
import { useEdgeStore } from '@/lib/edgestore';
import { SingleImageDropzone } from '@/components/SingleImageDropzone';
import { IoMdCloudUpload } from 'react-icons/io';
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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { LucideSend } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AddSlide() {
    const [file, setFile] = useState<File>();
    const [imageUrl, setImageUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState(0);
    const [isToastShown, setIsToastShown] = useState<boolean>(false);
    const { edgestore } = useEdgeStore();
    const { push } = useRouter();

    // Form Schema
    const FormSchema = z.object({
        title: z
            .string()
            .min(3, {
                message: "يجب أن يكون العنوان مكونًا من 3 أحرف على الأقل."
            })
            .max(250, {
                message: "يجب ألا يتجاوز العنوان 250 حرفًا."
            }),
        description: z
            .coerce
            .string()
            .optional(),
        altText: z
            .string()
            .optional(),
        imgSrc: z
            .string()
            .optional(),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            description: "",
            altText: "",
            imgSrc: "",
        },
    });

    useEffect(() => {
        if (progress === 100 && !isToastShown) {
            toast({
                variant: "default",
                description: "اكتمل الرفع!",
            });
            setIsToastShown(true);
        }
    }, [progress, isToastShown]);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (imageUrl === "") {
            toast({
                variant: "destructive",
                title: "خطأ في النشر",
                description: "يرجى رفع صورة قبل الإرسال.",
            });
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/slides`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                    imgSrc: imageUrl,
                }),
            });

            const newData = await res.json();
            if (newData.ok) {
                toast({
                    variant: "default",
                    description: "تم النشر بنجاح",
                });
                setLoading(false);
                push("/dashboard");
            } else {
                toast({
                    variant: "destructive",
                    title: "خطأ في النشر",
                    description: "حدث خطأ في النشر. يرجى المحاولة مرة أخرى.",
                });
                setLoading(false);
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "خطأ في النشر",
                description: "حدث خطأ أثناء محاولة نشر المحتوى. يرجى المحاولة لاحقًا.",
            });
            setLoading(false);
        }
    }

    return (
        <div className='container flex justify-center items-center w-full'>
            <Tabs defaultValue="product" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="product">الشرائح</TabsTrigger>
                    <TabsTrigger value="image">رفع الصورة</TabsTrigger>
                </TabsList>
                <TabsContent value="product">
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-center'>إضافة شريحة</CardTitle>
                        </CardHeader>
                        <div className="px-4">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>العنوان</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="عنوان الشريحة"
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
                                                        placeholder="وصف الشريحة"
                                                        className="resize-none w-full h-40"
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
                                        name="altText"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>نص بديل للصورة</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="نص بديل للصورة"
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
                </TabsContent>
                <TabsContent value="image">
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-center'>رفع الصورة</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="w-full justify-center items-center space-y-6">
                                <SingleImageDropzone
                                    value={file}
                                    className='w-full -ml-4'
                                    onChange={(file) => {
                                        setFile(file);
                                    }}
                                />
                                <Progress value={progress} />
                                <Button
                                    variant="default"
                                    className="flex justify-center items-center space-x-4 w-full"
                                    onClick={async () => {
                                        if (file) {
                                            const res = await edgestore.publicFiles.upload({
                                                file,
                                                onProgressChange: (progress) => {
                                                    setProgress(progress);
                                                },
                                            });
                                            console.log(res);
                                            setImageUrl(res.url);
                                        }
                                    }}
                                >
                                    <h1>رفع الصورة</h1>
                                    <IoMdCloudUpload className='w-5 h-5' />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
