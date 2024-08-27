import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MdCheck } from "react-icons/md";
import image from "/public/about.jpeg"
export default function page() {
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
                                    بناء تجارب تجارة إلكترونية استثنائية
                                </h1>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    في Acme Inc، نحن متحمسون لإنشاء منصات تجارة إلكترونية جميلة وعملية تمكن الشركات من الازدهار في البيئة الرقمية. يجمع فريقنا من الخبراء بين أحدث التقنيات وفهم عميق لتجربة المستخدم لتقديم حلول تساهم في زيادة المشاركة، التحويلات، والنجاح على المدى الطويل.
                                </p>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    نحن شركة متخصصة في بيع المنتجات بالجملة أو بالتجزئة، نسعى لتوفير أفضل المنتجات بأسعار تنافسية. من خلال منصتنا الرقمية، نقدم لعملائنا تجربة تسوق متميزة تجمع بين السهولة والراحة. سواء كنت تبحث عن منتجات للاستخدام الشخصي أو للاستخدام التجاري، نحن هنا لتلبية احتياجاتك بأعلى مستويات الجودة.
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
                                    تمكين الشركات من النجاح عبر الإنترنت
                                </h2>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    مهمتنا هي تمكين الشركات من جميع الأحجام لتحقيق النجاح في البيئة الرقمية. نحن نؤمن بأن التجارب الاستثنائية في التجارة الإلكترونية هي المفتاح لزيادة تفاعل العملاء، الولاء، والنمو. من خلال حلولنا المبتكرة والتزامنا المستمر بالتميز، نسعى لمساعدة عملائنا على الوصول إلى آفاق جديدة من النجاح.
                                </p>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    نحن ندرك أن البيع بالجملة والتجزئة يتطلب استراتيجيات مختلفة. لذلك، نقدم حلولًا مخصصة تناسب احتياجاتك، سواء كنت ترغب في زيادة حجم مبيعاتك أو توسيع نطاق عملك إلى أسواق جديدة.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                                    قيمنا
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    المبادئ التي توجهنا نحو النجاح
                                </h2>
                                <ul className="grid gap-4 text-muted-foreground">
                                    <li className="flex items-start gap-4">
                                        <MdCheck className="h-6 w-6 text-primary" />
                                        <div>
                                            <h3 className="text-xl font-bold">الابتكار</h3>
                                            <p>
                                                نحن نتبنى أحدث التقنيات والاتجاهات الصناعية لتقديم حلول مبتكرة تحقق النتائج.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <MdCheck className="h-6 w-6 text-primary" />
                                        <div>
                                            <h3 className="text-xl font-bold">التعاون</h3>
                                            <p>
                                                نعمل عن كثب مع عملائنا لفهم احتياجاتهم وأهدافهم الفريدة، مما يخلق شراكة تعاونية لتحقيق النجاح.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <MdCheck className="h-6 w-6 text-primary" />
                                        <div>
                                            <h3 className="text-xl font-bold">النزاهة</h3>
                                            <p>
                                                نحن ملتزمون بأعلى معايير المهنية والأخلاق والشفافية في جميع تعاملاتنا.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="space-y-4">
                            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                                فريقنا
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                تعرف على الخبراء وراء Acme Inc
                            </h2>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                فريقنا الموهوب من محترفي التجارة الإلكترونية مكرس لتقديم نتائج استثنائية لعملائنا. تعرف على الأفراد الذين يجعلون Acme Inc رائدة في الصناعة.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                            <Card className="p-6 flex flex-col items-center text-center">
                                <Avatar className="mb-4">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <h3 className="text-xl font-bold">جون دو</h3>
                                <p className="text-muted-foreground">المدير التنفيذي</p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    جون هو القائد الرؤيوي وراء Acme Inc، مع أكثر من 15 عامًا من الخبرة في صناعة التجارة الإلكترونية. إنه متحمس لقيادة الابتكار وتمكين الشركات من النجاح عبر الإنترنت.
                                </p>
                            </Card>
                            <Card className="p-6 flex flex-col items-center text-center">
                                <Avatar className="mb-4">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>SA</AvatarFallback>
                                </Avatar>
                                <h3 className="text-xl font-bold">سارة أندرسون</h3>
                                <p className="text-muted-foreground">المدير الفني</p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    سارة هي العقل المدبر التقني لدينا، تقود تطوير حلول التجارة الإلكترونية المبتكرة. بفضل عينها الحادة للتفاصيل وشغفها بحل المشكلات، تضمن أن تكون منصاتنا مبتكرة وسهلة الاستخدام.
                                </p>
                            </Card>
                            <Card className="p-6 flex flex-col items-center text-center">
                                <Avatar className="mb-4">
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>MR</AvatarFallback>
                                </Avatar>
                                <h3 className="text-xl font-bold">مايكل روبرتس</h3>
                                <p className="text-muted-foreground">رئيس قسم التصميم</p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    مايكل هو القوة الإبداعية وراء تصاميم التجارة الإلكترونية المذهلة لدينا. بفضل فهمه العميق لتجربة المستخدم وذوقه العالي، يضمن أن تكون منصاتنا ليست جميلة فحسب، بل أيضًا تعزز التفاعل والتحويلات.
                                </p>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
