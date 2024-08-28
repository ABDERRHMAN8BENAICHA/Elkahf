import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IoIosMail } from "react-icons/io";
import { RiMapPin2Fill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";

export default function Page() {
    return (
        <div className="w-full">
            <section className="w-full py-8 md:py-12 lg:py-24 bg-muted">
                <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6 lg:grid-cols-2 lg:text-right">
                    <div className="space-y-3">
                        <h1 className="text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl">تواصل معنا</h1>
                        <p className="mx-auto max-w-[600px] text-muted-foreground text-sm md:text-base lg:text-lg">
                            هل لديك سؤال أو ترغب في العمل معنا؟ املأ النموذج أدناه أو أرسل لنا بريدًا إلكترونيًا.
                        </p>
                    </div>
                    <div className="w-full max-w-md space-y-4">
                        <form className="grid gap-4">
                            <div className="flex flex-col md:flex-row md:space-x-4">
                                <div className="space-y-2 w-full">
                                    <Label htmlFor="name">الاسم</Label>
                                    <Input id="name" placeholder="اسمك" />
                                </div>
                                <div className="space-y-2 w-full mt-4 md:mt-0">
                                    <Label htmlFor="email">البريد الإلكتروني</Label>
                                    <Input id="email" type="email" placeholder="m@example.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">الرسالة</Label>
                                <Textarea id="message" placeholder="كيف يمكننا مساعدتك؟" rows={4} />
                            </div>
                            <Button type="submit" className="w-full">
                                إرسال الرسالة
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
            <section className="w-full py-8 md:py-12 lg:py-24">
                <div className="container grid items-start justify-center gap-8 px-4 md:px-6 lg:grid-cols-2">
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold md:text-2xl">معلومات الاتصال</h2>
                        <div className="grid gap-2">
                            <div className="flex items-center gap-2">
                                <RiMapPin2Fill className="h-5 w-5 text-muted-foreground" />
                                <p>حي 11 ديسمبر 1962</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaPhoneAlt className="h-5 w-5 text-muted-foreground" />
                                <a href="tel:0698111100">0698111100</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <IoIosMail className="h-5 w-5 text-muted-foreground" />
                                <a href="mailto:alkahef39@gmail.com">alkahef39@gmail.com</a>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold md:text-2xl">موقعنا</h2>
                        <div className="rounded-lg overflow-hidden aspect-video">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2387.110094602863!2d6.7984832!3d33.4955427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12591973a2c6e04b%3A0x32fcc9b23ef1dcd5!2z2YXZg9iq2KjYqSDYp9mE2YPZh9mBINmE2YTYqtis2YfZitiy!5e1!3m2!1sar!2sdz!4v1724842117746!5m2!1sar!2sdz"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
