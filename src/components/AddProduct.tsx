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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from 'next/image';

type Category = {
    id: string;
    name: string;
};

export default function AddProduct() {
    const [file, setFile] = useState<File>();
    const [imageUrl, setImageUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [progress, setProgress] = useState(0);
    const [isToastShown, setIsToastShown] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const { edgestore } = useEdgeStore();
    const { push } = useRouter();

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
                const data = await res.json();
                setCategories(data.data);
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "خطأ في جلب البيانات",
                    description: "حدث خطأ أثناء جلب الفئات.",
                });
            }
        }
        fetchCategories();
    }, []);

    const FormSchema = z.object({
        name: z
            .string()
            .min(3, {
                message: "يجب أن يكون الاسم مكونًا من 3 أحرف على الأقل."
            })
            .max(250, {
                message: "يجب ألا يتجاوز الاسم 250 حرفًا."
            }),
        description: z
            .coerce
            .string()
            .optional(),
        features: z
            .coerce
            .string()
            .optional(),
        price: z
            .coerce
            .number()
            .min(0, { message: "يجب أن تكون القيمة أكبر من أو تساوي 0." })
            .optional(),
        quantity: z
            .coerce
            .number()
            .min(0, { message: "يجب أن تكون الكمية أكبر من أو تساوي 0." })
            .optional(),
        categoryId: z
            .string()
            .nonempty({ message: "الفئة مطلوبة." }),
        imageUrl: z
            .string()
            .optional(),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            description: "",
            features: "",
            price: 0,
            quantity: 0,
            categoryId: "",
            imageUrl: "",
        },
    });

    if (progress === 100 && !isToastShown) {
        toast({
            variant: "default",
            description: "اكتمل الرفع!",
        });
        setIsToastShown(true);
    }

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
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                    image: imageUrl,
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
                    <TabsTrigger value="product">المنتج</TabsTrigger>
                    <TabsTrigger value="image">رفع الصورة</TabsTrigger>
                </TabsList>
                <TabsContent value="product">
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-center'>إضافة منتج</CardTitle>
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
                                                        placeholder="اسم المنتج"
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
                                                        placeholder="وصف المنتج"
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
                                        name="features"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>الميزات</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="ميزات المنتج"
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
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>السعر</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="سعر المنتج"
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
                                        name="quantity"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>الكمية</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="كمية المنتج"
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
                                        name="categoryId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>الفئة</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        value={field.value}
                                                        onValueChange={(value) => {
                                                            field.onChange(value);
                                                            setSelectedCategoryId(value);
                                                        }}
                                                        disabled={loading}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="اختر فئة" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {categories.map((category) => (
                                                                <SelectItem key={category.id} value={category.id}>
                                                                    {category.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
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
                            {/* <CardDescription className='text-center'>
                                Change your password here. After saving, youll be logged out.
                            </CardDescription> */}
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {/* start select image */}
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
                                            setImageUrl(res.url)
                                        }
                                    }}
                                >
                                    <h1>رفع الصورة</h1>
                                    <IoMdCloudUpload className='w-5 h-5' />
                                </Button>
                            </div>
                            {/* end select image */}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
