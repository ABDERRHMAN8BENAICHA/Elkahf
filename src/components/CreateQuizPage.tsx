"use client"

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { getToken } from "@/app/actions";


const questionSchema = z.object({
    question: z.string().min(1, "يرجى إدخال السؤال."),
    option1: z.string().min(1, "يرجى إدخال الخيار الأول."),
    option2: z.string().min(1, "يرجى إدخال الخيار الثاني."),
    option3: z.string().min(1, "يرجى إدخال الخيار الثالث."),
    answer: z.enum(["1", "2", "3"]).refine((val) => ["1", "2", "3"].includes(val), {
        message: "يرجى اختيار الإجابة الصحيحة.",
    }),
});

type QuestionFormData = z.infer<typeof questionSchema>;

export default function CreateQuizPage() {
    const [questions, setQuestions] = useState<QuestionFormData[]>([]);
    const [currentTab, setCurrentTab] = useState(0);
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        async function fetchToken() {
            try {
                const token = await getToken();
                setToken(token);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        }

        fetchToken();
    }, []);
    const { toast } = useToast();
    const form = useForm<QuestionFormData>({
        resolver: zodResolver(questionSchema),
    });

    const addQuestion = (data: QuestionFormData) => {
        setQuestions([...questions, data]);
        form.reset();
        setCurrentTab(questions.length + 1);
    };

    const onSubmit = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contest/question/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'token': `${token}`,
                },
                body: JSON.stringify(questions),
            });
            const result = await response.json();
            if (!result.ok) {
                toast({ description: result.msg, variant: "destructive" });
            }

            toast({ description: "تم إرسال المسابقة بنجاح!" });
            setQuestions([]);
        } catch (error) {
            toast({ description: "حدث خطأ أثناء إرسال المسابقة.", variant: "destructive" });
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <h2 className="text-xl font-bold text-center">إنشاء مسابقة جديدة</h2>
            </CardHeader>
            <CardContent>
                <Tabs value={String(currentTab)} onValueChange={(val) => setCurrentTab(Number(val))}>
                    <TabsList className="mb-4">
                        {questions.map((_, index) => (
                            <TabsTrigger key={index} value={String(index)}>
                                سؤال {index + 1}
                            </TabsTrigger>
                        ))}
                        <TabsTrigger value={String(questions.length)}>إضافة سؤال</TabsTrigger>
                    </TabsList>

                    {questions.map((question, index) => (
                        <TabsContent key={index} value={String(index)}>
                            <p className="text-lg font-medium mb-2">سؤال {index + 1}</p>
                            <p>{question.question}</p>
                            <p>الخيار 1: {question.option1}</p>
                            <p>الخيار 2: {question.option2}</p>
                            <p>الخيار 3: {question.option3}</p>
                            <p>الإجابة الصحيحة: {question.answer}</p>
                        </TabsContent>
                    ))}

                    <TabsContent value={String(questions.length)}>
                        <form onSubmit={form.handleSubmit(addQuestion)} className="space-y-4">
                            <Controller
                                name="question"
                                control={form.control}
                                render={({ field }) => (
                                    <Input {...field} placeholder="أدخل السؤال" />
                                )}
                            />
                            <Controller
                                name="option1"
                                control={form.control}
                                render={({ field }) => (
                                    <Input {...field} placeholder="الخيار الأول" />
                                )}
                            />
                            <Controller
                                name="option2"
                                control={form.control}
                                render={({ field }) => (
                                    <Input {...field} placeholder="الخيار الثاني" />
                                )}
                            />
                            <Controller
                                name="option3"
                                control={form.control}
                                render={({ field }) => (
                                    <Input {...field} placeholder="الخيار الثالث" />
                                )}
                            />
                            <Controller
                                name="answer"
                                control={form.control}
                                render={({ field }) => (
                                    <Input {...field} placeholder="أدخل رقم الإجابة الصحيحة (1, 2, 3)" />
                                )}
                            />
                            <Button type="submit">إضافة السؤال</Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </CardContent>
            <Button onClick={onSubmit} className="mt-4 w-full">إرسال المسابقة</Button>
        </Card>
    );
}
