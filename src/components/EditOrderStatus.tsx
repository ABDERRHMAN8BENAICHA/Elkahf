"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Define the form schema with Zod
const formSchema = z.object({
    status: z.enum(["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"], {
        required_error: "يجب اختيار حالة الطلب",
    }),
});

interface Props {
    id: string;
}

const EditOrderStatus: React.FC<Props> = ({ id }) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            status: "",
        },
    });

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`/api/orders/${id}`);
                const data = await response.json();
                form.setValue("status", data.status);
                setLoading(false);
            } catch (err) {
                setError("فشل في جلب الطلب");
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id, form]);

    const onSubmit = async (values: { status: string }) => {
        setLoading(true);

        try {
            const response = await fetch(`/api/orders/${id}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                router.push("/dashboard/orders");
            } else {
                const result = await response.json();
                setError(result.error || "فشل في تحديث الحالة");
            }
        } catch (err) {
            setError("حدث خطأ");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>جارٍ التحميل...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>حالة الطلب</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="اختر الحالة" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PENDING">قيد الانتظار</SelectItem>
                                        <SelectItem value="CONFIRMED">مؤكد</SelectItem>
                                        <SelectItem value="SHIPPED">مُشحن</SelectItem>
                                        <SelectItem value="DELIVERED">تم التسليم</SelectItem>
                                        <SelectItem value="CANCELLED">ملغى</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? "جاري الحفظ..." : "حفظ"}
                </Button>
            </form>
        </Form>
    );
};

export default EditOrderStatus;
