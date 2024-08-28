import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MdCheck } from "react-icons/md";
import image from "/public/about.jpg";

export default function Page() {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                            <div className="space-y-4">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                                    من نحن
                                </div>
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    إحياء مكتبة &#34;الكهف&#34; بالتجهيزات والتعاون
                                </h1>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    في مكتبة &#34;الكهف&#34;، نحن ملتزمون بتزويد المجتمع بكافة مستلزمات تجهيز الدخول المدرسي والأدوات الرياضية. كما نقدم خدمات الطباعة وإجراء البحوث. هدفنا هو توفير بيئة دعم كاملة لتلبية احتياجات الطلاب والباحثين.
                                </p>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    انضم إلينا كل يوم خميس في مسابقة الأجوبة، حيث يمكنك المشاركة بالإجابة على الأسئلة المثيرة. الفائز سيحصل على قسيمة بقيمة 2000 دينار جزائري، بالإضافة إلى فرصة للتفاعل والمشاركة في مجتمعنا النشط.
                                </p>
                            </div>
                            <Image
                                src={image}
                                width={550}
                                height={310}
                                alt="من نحن"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                            />
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                            <div className="space-y-4">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                                    مهمتنا
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    تعزيز بيئة الدعم في &#34;الكهف&#34;
                                </h2>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    مهمتنا هي تعزيز بيئة الدعم في مكتبة &#34;الكهف&#34; من خلال توفير تجهيزات متكاملة وخدمات ذات جودة. نهدف إلى توفير جميع الأدوات التي يحتاجها الطلاب والباحثون، مما يسهم في تحقيق أهدافهم الدراسية والبحثية.
                                </p>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    نركز على تشجيع المشاركة المجتمعية والعمل الجماعي لتحسين مكتبتنا وتعزيز دورها كمركز دعم تعليمي ورياضى.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                                    قيمنا
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    المبادئ التي توجه جهودنا في &#34;الكهف&#34;
                                </h2>
                                <ul className="grid gap-4 text-muted-foreground">
                                    <li className="flex items-start gap-4">
                                        <MdCheck className="h-6 w-6 text-primary" />
                                        <div>
                                            <h3 className="text-xl font-bold">التعاون</h3>
                                            <p>
                                                نؤمن بقوة العمل الجماعي ونشجع الجميع على المشاركة في تعزيز بيئة نظيفة ومنظمة.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <MdCheck className="h-6 w-6 text-primary" />
                                        <div>
                                            <h3 className="text-xl font-bold">التفاني</h3>
                                            <p>
                                                نحن ملتزمون بتقديم خدمات عالية الجودة تعكس تفانينا في دعم الطلاب والباحثين.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <MdCheck className="h-6 w-6 text-primary" />
                                        <div>
                                            <h3 className="text-xl font-bold">الاستدامة</h3>
                                            <p>
                                                نحرص على تطبيق ممارسات مستدامة تساهم في الحفاظ على مكتبة &#34;الكهف&#34; كمورد دائم للمعرفة والموارد.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="space-y-4">
                            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                                فريقنا
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                تعرف على فريق &#34;الكهف&#34; المتميز
                            </h2>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                فريقنا المتفاني يعمل بلا كلل لضمان أن تكون مكتبة &#34;الكهف&#34; مكانًا نظيفًا ومنظمًا. تعرف على الأفراد الذين يسهمون في نجاح هذه المبادرة.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                            <Card className="p-6 flex flex-col items-center text-center">
                                <Avatar className="mb-4">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <h3 className="text-xl font-bold">علي بن أحمد</h3>
                                <p className="text-muted-foreground">المنسق العام</p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    علي هو العقل المدبر وراء تنظيم فعاليات التنظيف الأسبوعية، وهو ملتزم بتوفير بيئة تعليمية نظيفة ومريحة للجميع.
                                </p>
                            </Card>
                            <Card className="p-6 flex flex-col items-center text-center">
                                <Avatar className="mb-4">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>SA</AvatarFallback>
                                </Avatar>
                                <h3 className="text-xl font-bold">سارة الهادي</h3>
                                <p className="text-muted-foreground">مسؤولة التواصل</p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    سارة تتولى مهمة التواصل مع المجتمع وإشراكهم في فعالياتنا، مع التركيز على تعزيز روح العمل الجماعي.
                                </p>
                            </Card>
                            <Card className="p-6 flex flex-col items-center text-center">
                                <Avatar className="mb-4">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>MR</AvatarFallback>
                                </Avatar>
                                <h3 className="text-xl font-bold">محمد رشيد</h3>
                                <p className="text-muted-foreground">مدير الفعاليات</p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    محمد يتأكد من تنظيم جميع الفعاليات بأعلى مستويات الدقة والكفاءة، مما يضمن تجربة ممتعة ومثمرة لجميع المشاركين.
                                </p>
                            </Card>
                        </div>
                    </div>
                </section> */}
            </main>
        </div>
    );
}
