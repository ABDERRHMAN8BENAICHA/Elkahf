"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { LucideSend } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
const questions = [
    {
        question: "السؤال الأول",
        description: "اختر الإجابة الصحيحة",
        answers: ["الإجابة 1", "الإجابة 2", "الإجابة 3"],
    },
    {
        question: "السؤال الثاني",
        description: "اختر الإجابة الأنسب",
        answers: ["الإجابة 1", "الإجابة 2", "الإجابة 3"],
    },
    {
        question: "السؤال الثالث",
        description: "حدد الخيار الصحيح",
        answers: ["الإجابة 1", "الإجابة 2", "الإجابة 3"],
    },
];

const personalInfoSchema = z.object({
    firstName: z
        .string()
        .min(1, { message: "الاسم الأول مطلوب" })
        .max(100, { message: "الاسم الأول يجب ألا يتجاوز 100 حرف" }),
    lastName: z
        .string()
        .min(1, { message: "اسم العائلة مطلوب" })
        .max(100, { message: "اسم العائلة يجب ألا يتجاوز 100 حرف" }),
    phone: z
        .string()
        .min(10, { message: "رقم الهاتف يجب أن يحتوي على 10 أرقام على الأقل" })
        .max(15, { message: "رقم الهاتف يجب ألا يتجاوز 15 رقم" })
        .regex(/^\d+$/, { message: "رقم الهاتف يجب أن يحتوي على أرقام فقط" }),
});

export default function QuizComponent() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [showPersonalInfo, setShowPersonalInfo] = useState(false);
    const [answers, setAnswers] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [personalInfo, setPersonalInfo] = useState({
        firstName: '',
        lastName: '',
        phone: '',
    });

    const { push } = useRouter();

    const form = useForm<z.infer<typeof personalInfoSchema>>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            phone: '',
        },
    });

    const handleAnswerSelect = (index: number) => {
        setSelectedAnswer(index);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer !== null) {
            setAnswers([...answers, (selectedAnswer + 1).toString()]);
        }
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        } else {
            setQuizCompleted(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setQuizCompleted(false);
        setShowPersonalInfo(false);
        setAnswers([]);
        setPersonalInfo({ firstName: '', lastName: '', phone: '' });
    };


    

    async function onSubmit(data: z.infer<typeof personalInfoSchema>) {
        console.log({ ...data, answers });
        // setLoading(true);
        // try {
        //     const res = await fetch('/api/personal-info', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             ...data,
        //             answers: ["2","3","1"]
        //         }),
        //     });

        //     if (!res.ok) throw new Error('Network response was not ok');

        //     const newData = await res.json();
        //     setLoading(false);
        //     if (newData.ok) {
        //         toast({
        //             variant: 'default',
        //             title: 'تمت إضافة المعلومات بنجاح',
        //             description: 'تم حفظ معلوماتك الشخصية بنجاح.',
        //         });
        //         push('/thank-you');  // Redirect to a thank you page or similar
        //     } else {
        //         toast({
        //             variant: 'destructive',
        //             title: 'فشل في إضافة المعلومات',
        //             description: 'حدث خطأ أثناء محاولة حفظ المعلومات الشخصية. يرجى المحاولة لاحقًا.',
        //         });
        //     }
        // } catch (error) {
        //     toast({
        //         variant: 'destructive',
        //         title: 'خطأ في الإضافة',
        //         description: 'حدث خطأ أثناء محاولة إضافة المعلومات الشخصية. يرجى المحاولة لاحقًا.',
        //     });
        //     setLoading(false);
        // }
    }

    const progress = ((currentQuestionIndex) / questions.length) * 100;

    if (showPersonalInfo) {
        return (
            <div className="container flex justify-center items-center w-full p-4" dir="rtl">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">إدخال المعلومات الشخصية</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>الاسم الأول</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="أدخل اسمك الأول"
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
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>اسم العائلة</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="أدخل اسم العائلة"
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
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>رقم الهاتف</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="tel"
                                                    placeholder="أدخل رقم الهاتف"
                                                    {...field}
                                                    disabled={loading}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <CardFooter>
                                    <Button disabled={loading} type="submit" className="flex justify-center items-center space-x-2 w-full">
                                        <h1>إرسال</h1>
                                        <LucideSend className="w-5 h-5" />
                                    </Button>
                                </CardFooter>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (quizCompleted) {
        return (
            <div className="container flex justify-center items-center w-full p-4" dir="rtl">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">انتهى الاختبار</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-lg mb-6">لقد أكملت جميع الأسئلة. شكرًا لمشاركتك!</p>
                        <Button onClick={() => setShowPersonalInfo(true)} className="w-full mb-4">
                            إدخال المعلومات الشخصية
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="container flex justify-center items-center w-full p-4" dir="rtl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl text-primary">{currentQuestion.question}</CardTitle>
                    <CardDescription>{currentQuestion.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Progress value={progress} className="mb-4" />
                    <p className="text-sm text-muted-foreground mb-4 text-left">
                        السؤال {currentQuestionIndex + 1} من {questions.length}
                    </p>
                    <RadioGroup
                        value={selectedAnswer?.toString()}
                        onValueChange={(value: any) => handleAnswerSelect(parseInt(value))}
                        className="space-y-4"
                    >
                        {currentQuestion.answers.map((answer, index) => (
                            <div key={index} className="flex items-center space-x-2 space-x-reverse">
                                <RadioGroupItem value={index.toString()} id={`answer-${index}`} />
                                <Label htmlFor={`answer-${index}`} className="flex-grow cursor-pointer p-2 hover:bg-secondary rounded-md transition-colors">
                                    {answer}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                    <Button onClick={handleNextQuestion} disabled={selectedAnswer === null} className="w-full mt-4">
                        {currentQuestionIndex < questions.length - 1 ? 'التالي' : 'إنهاء'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
