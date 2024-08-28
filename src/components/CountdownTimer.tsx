"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    const router = useRouter()

    useEffect(() => {
        const getNextThursday = () => {
            const now = new Date()
            const dayOfWeek = now.getDay()
            const daysUntilThursday = (4 - dayOfWeek + 7) % 7
            const nextThursday = new Date(now)
            nextThursday.setDate(now.getDate() + daysUntilThursday)
            nextThursday.setHours(17, 0, 0, 0) // Set to 5:00 PM

            // If it's already past 5:00 PM on Thursday, get the next week's Thursday
            if (now > nextThursday) {
                nextThursday.setDate(nextThursday.getDate() + 7)
            }

            return nextThursday.getTime()
        }

        const competitionStart = getNextThursday()

        const timer = setInterval(() => {
            const now = new Date().getTime()
            const difference = competitionStart - now

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                })
            } else {
                clearInterval(timer)
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
                router.push('/quiz') // Redirect to /quiz when the countdown ends
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [router])

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-center text-2xl font-bold">العد التنازلي للمسابقة</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                        <div className="text-5xl font-bold">{timeLeft.seconds}</div>
                        <div className="text-sm">ثواني</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold">{timeLeft.minutes}</div>
                        <div className="text-sm">دقائق</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold">{timeLeft.hours}</div>
                        <div className="text-sm">ساعات</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold">{timeLeft.days}</div>
                        <div className="text-sm">أيام</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
